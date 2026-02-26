using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Application.Dtos;
using WalletManagement.Domain.Entities.Concretes;

namespace WalletManagement.Application.Managers
{
    public interface IWalletManager : IBaseManager<Wallet, WalletDto>
    {
        
        Task<decimal> GetBalanceAsync(int userId);

        Task<List<WalletDto>> GetWalletsByUserIdAsync(int userId);
       
        Task<WalletDto> CreateNewWalletAsync(int userId);
        
        Task DeleteWalletAsync(int walletId, int userId);

        Task<string> ProcessTransactionAsync(CreateTransactionDto transactionDto, string type);
    }
}
