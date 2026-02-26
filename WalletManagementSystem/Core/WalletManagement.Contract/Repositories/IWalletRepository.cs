using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Domain.Entities.Concretes;

namespace WalletManagement.Contract.Repositories
{
    public interface IWalletRepository : IBaseRepository<Wallet>
    {
        // ilgili cüzdanın bakiyesini getirme:
        Task<Wallet?> GetByUserIdAsync(int userId);

        // kullanıcının tüm cüzdanlarını listeleme:
        Task<List<Wallet>> GetWalletsByUserIdAsync(int userId);

        Task<Wallet> CreateNewWalletAsync(Wallet newWallet);

        // Cüzdan silme:
        Task<bool> SoftDeleteWalletWithSPAsync(int walletId, int userId);

        // deposit, withdraw işlemleri için stored proc. çalıştıran metod: 
        Task<bool> ExecuteMoneyTransactionWithSPAsync(int walletId, decimal amount, string type, string referenceId);
    }
}
