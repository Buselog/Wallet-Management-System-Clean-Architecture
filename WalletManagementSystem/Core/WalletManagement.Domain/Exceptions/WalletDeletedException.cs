using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WalletManagement.Domain.Exceptions
{
    public class WalletDeletedException : BaseBusinessException
    {
        public WalletDeletedException() : base("Bu cüzdan silindiği için işlem yapılamaz.") { 
        
        }
    }
}
