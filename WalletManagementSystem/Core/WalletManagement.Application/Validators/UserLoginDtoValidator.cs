using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Application.Dtos;

namespace WalletManagement.Application.Validators
{
    public class UserLoginDtoValidator : AbstractValidator<UserLoginDto>
    {
        public UserLoginDtoValidator()
        {
            RuleFor(x => x.Username)
                .NotEmpty().WithMessage("Kullanıcı adı girilmelidir.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Şifre girilmelidir.");
        }
    }
}
