using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Contract.Repositories;
using WalletManagement.Domain.Entities.Concretes;
using WalletManagement.Persistence.Context;

namespace WalletManagement.Persistence.Repositories
{
    public class WalletRepository : BaseRepository<Wallet>, IWalletRepository
    {
        public WalletRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<Wallet?> GetByUserIdAsync(int userId)
        {
            return await _context.Wallets.FirstOrDefaultAsync(x => x.UserId == userId && !x.IsDeleted);
        }

        public async Task<List<Wallet>> GetWalletsByUserIdAsync(int userId)
        {
            return await _context.Wallets
                       .Include(x => x.Transactions) 
                       .Where(x => x.UserId == userId && !x.IsDeleted)
                       .ToListAsync();
        }

        public async Task<Wallet> CreateNewWalletAsync(Wallet wallet)
        {
            await _context.Wallets.AddAsync(wallet);
            await SaveChangesAsync();

            return wallet;
        }

        public async Task<bool> SoftDeleteWalletWithSPAsync(int walletId, int userId)
        {
            var WalletId = new SqlParameter("@WalletId", walletId);
            var UserId = new SqlParameter("@UserId", userId);

            var result = await _context.Database.ExecuteSqlRawAsync(
                "EXEC DeleteWalletSP @WalletId, @UserId",
                WalletId, UserId);

            return result > 0;
        }

        public async Task<bool> ExecuteMoneyTransactionWithSPAsync(int walletId, decimal amount, string type, string referenceId)
        {
            var WalletId = new SqlParameter("@WalletId", walletId);
            var Amount = new SqlParameter("@Amount", amount);
            var Type = new SqlParameter("@Type", type);
            var RefId = new SqlParameter("@ReferenceId", referenceId);

            var result = await _context.Database.ExecuteSqlRawAsync(
                "EXEC WalletTransactionSP @WalletId, @Amount, @Type, @ReferenceId",
                WalletId, Amount, Type, RefId);

            return result != 0;
        }
    }
}
