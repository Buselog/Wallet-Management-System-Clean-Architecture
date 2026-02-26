using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WalletManagement.Domain.Exceptions
{
    public class ConcurrencyException : BaseBusinessException
    {
        public ConcurrencyException() : base("İşlem sırasında bir çakışma oldu, lütfen tekrar deneyin.") {
        
        }
    }
}
