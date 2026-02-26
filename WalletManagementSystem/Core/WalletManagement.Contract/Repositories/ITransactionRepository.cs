using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Domain.Entities.Abstracts;
using WalletManagement.Domain.Entities.Concretes;

namespace WalletManagement.Contract.Repositories
{
    public interface ITransactionRepository : IBaseRepository<WalletTransaction>
    {
        // paging ve filtering 
        Task<(IEnumerable<WalletTransaction> Items, int TotalCount)> GetFilteredHistoryAsync(
            int walletId,
            DateTime? startDate,
            DateTime? endDate,
            int pageNumber,
            int pageSize);

        Task<bool> ReferenceIdExistsAsync(string referenceId);
    }
}
