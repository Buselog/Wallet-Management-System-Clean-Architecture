using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Application.Managers;
using WalletManagement.InnerInfrastructure.Managers;

namespace WalletManagement.InnerInfrastructure.DependencyResolvers
{
    public static class ManagerInjection
    {
        public static void AddManagerServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthManager, AuthManager>();
            services.AddScoped<IWalletManager, WalletManager>();
            services.AddScoped<ITransactionManager, TransactionManager>();
        }
    }
}
