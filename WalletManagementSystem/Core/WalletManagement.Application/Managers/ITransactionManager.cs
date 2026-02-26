using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Application.Dtos;
using WalletManagement.Domain.Entities.Concretes;

namespace WalletManagement.Application.Managers
{
    public interface ITransactionManager : IBaseManager<WalletTransaction, TransactionDto>
    {
        Task<(List<TransactionDto> Items, int TotalCount)> GetHistoryAsync(
            int walletId,
            DateTime? startDate,
            DateTime? endDate,
            int pageNumber,
            int pageSize);
    }
}
