using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using WalletManagement.Application.Validators;

namespace WalletManagement.Application.DependencyResolvers
{
    public static class ValidatorServiceInjection
    {
        public static void AddValidatorServices(this IServiceCollection services)
        {
            services.AddValidatorsFromAssemblyContaining<CreateTransactionDtoValidator>();
        }
    }
}
