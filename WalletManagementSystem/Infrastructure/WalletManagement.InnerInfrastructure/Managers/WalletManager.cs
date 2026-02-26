using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Application.Dtos;
using WalletManagement.Application.Managers;
using WalletManagement.Contract.Repositories;
using WalletManagement.Domain.Entities.Concretes;
using WalletManagement.Domain.Exceptions;

namespace WalletManagement.InnerInfrastructure.Managers
{
    public class WalletManager : BaseManager<Wallet, WalletDto>, IWalletManager
    {
        private readonly IWalletRepository _walletRepository;
        private readonly ITransactionRepository _transactionRepository;

        public WalletManager(IWalletRepository walletRepository, IMapper mapper, ITransactionRepository transactionRepository) : base(walletRepository, mapper)
        {
            _walletRepository = walletRepository;
            _transactionRepository = transactionRepository;
        }

        public async Task<decimal> GetBalanceAsync(int userId)
        {
            var wallet = await _walletRepository.GetByUserIdAsync(userId);  
            if (wallet == null) throw new KeyNotFoundException("Cüzdan bulunamadı.");
            if (wallet.IsDeleted) throw new WalletDeletedException();

            return wallet.Balance;
        }

        public async Task<List<WalletDto>> GetWalletsByUserIdAsync(int userId)
        {
            var wallets = await _walletRepository.GetWalletsByUserIdAsync(userId);

            var walletDtos = wallets.Select(wallet => new WalletDto
            {
                Id = wallet.Id,
                Balance = wallet.Balance,
                CreatedDate = wallet.CreatedDate,
                LastTransactionDate = wallet.Transactions
                                            .OrderByDescending(t => t.CreatedDate)
                                            .Select(t => t.CreatedDate)
                                            .FirstOrDefault(),
                                            Transactions = _mapper.Map<List<TransactionDto>>(wallet.Transactions)
            }).ToList();

            return walletDtos;
        }

        public async Task<WalletDto> CreateNewWalletAsync(int userId)
        {
            var newWallet = new Wallet
            {
                UserId = userId,
                Balance = 0,
                CreatedDate = DateTime.Now
            };

            var createdWallet = await _walletRepository.CreateNewWalletAsync(newWallet);

            return _mapper.Map<WalletDto>(createdWallet);
        }

        public async Task DeleteWalletAsync(int walletId, int userId)
        {
            var wallet = await _walletRepository.GetByIdAsync(walletId);
            if (wallet == null || wallet.UserId != userId || wallet.IsDeleted)
                throw new KeyNotFoundException("Silinmek istenen cüzdan bulunamadı.");

            if (wallet.Balance > 0)
                throw new WalletBalanceNotEmptyException();

            var success = await _walletRepository.SoftDeleteWalletWithSPAsync(walletId, userId);

            if (!success)
                throw new BaseBusinessException("Cüzdan silinirken beklenmedik bir hata oluştu.");
        }

        public async Task<string> ProcessTransactionAsync(CreateTransactionDto transactionDto, string type)
        {
            var exists = await _transactionRepository.ReferenceIdExistsAsync(transactionDto.ReferenceId);
            if (exists) throw new ReferenceAlreadyExistsException();

            var wallet = await _walletRepository.GetByIdAsync(transactionDto.WalletId);
            if (wallet == null) throw new KeyNotFoundException("İşlem yapılmak istenen cüzdan bulunamadı.");
            if (wallet.IsDeleted) throw new WalletDeletedException();

            if (type.ToLower() == "withdraw" && wallet.Balance < transactionDto.Amount)
            {
                throw new InsufficientBalanceException();
            }
            try
            {
                var result = await _walletRepository.ExecuteMoneyTransactionWithSPAsync(
               transactionDto.WalletId,
               transactionDto.Amount,
               type,
               transactionDto.ReferenceId);

                if (!result)
                    throw new Exception("Veritabanı seviyesinde işlem gerçekleştirilemedi.");
            }
            catch
            {
                throw new ConcurrencyException();
            }
           
            return "İşlem başarıyla tamamlandı.";
        }

    }
}
