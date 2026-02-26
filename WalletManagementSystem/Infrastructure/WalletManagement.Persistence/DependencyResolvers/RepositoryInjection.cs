using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Contract.Repositories;
using WalletManagement.Persistence.Repositories;

namespace WalletManagement.Persistence.DependencyResolvers
{
    public static class RepositoryInjection
    {
        public static void AddRepositoryServices(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IWalletRepository, WalletRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();
        }
    }
}
