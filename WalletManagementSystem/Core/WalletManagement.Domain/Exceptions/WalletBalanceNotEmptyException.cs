using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WalletManagement.Domain.Exceptions
{
    public class WalletBalanceNotEmptyException : BaseBusinessException
    {
        public WalletBalanceNotEmptyException()
            : base("Bakiyesi bulunan bir cüzdan silinemez. Lütfen önce bakiyeyi başka bir cüzdana transfer edin veya nakit olarak çekin.") {

        }
    }
}
