using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WalletManagement.Domain.Exceptions
{
    public class InsufficientBalanceException : BaseBusinessException
    {
        public InsufficientBalanceException() : base("Cüzdan bakiyesi bu işlem için yetersiz.") {
        
        }
    }
}
