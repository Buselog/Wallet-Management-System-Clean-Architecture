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

namespace WalletManagement.InnerInfrastructure.Managers
{
    public class TransactionManager : BaseManager<WalletTransaction, TransactionDto>, ITransactionManager
    {
        private readonly ITransactionRepository _transactionRepository;

        public TransactionManager(ITransactionRepository transactionRepository, IMapper mapper) : base(transactionRepository, mapper)
        {
            _transactionRepository = transactionRepository;
        }

        public async Task<(List<TransactionDto> Items, int TotalCount)> GetHistoryAsync(
            int walletId, DateTime? startDate, DateTime? endDate, int pageNumber, int pageSize)
        {
            var (entities, totalCount) = await _transactionRepository.GetFilteredHistoryAsync(
                walletId, startDate, endDate, pageNumber, pageSize);

            var dtos = _mapper.Map<List<TransactionDto>>(entities);

            return (dtos, totalCount);
        }
    }
}
