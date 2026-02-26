using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Application.Dtos;

namespace WalletManagement.Application.Validators
{
    public class CreateTransactionDtoValidator : AbstractValidator<CreateTransactionDto>
    {
        public CreateTransactionDtoValidator()
        {
            RuleFor(x => x.Amount)
                .GreaterThan(0).WithMessage("İşlem tutarı 0'dan büyük olmalıdır.");

            RuleFor(x => x.WalletId)
                .NotEmpty().WithMessage("Cüzdan bilgisi gereklidir.");

            RuleFor(x => x.ReferenceId)
                .NotEmpty().WithMessage("Referans numarası (ReferenceId) boş bırakılamaz.")
                .MinimumLength(5).WithMessage("Referans numarası en az 5 karakter olmalıdır.");
        }
    }
}
