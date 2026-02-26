using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WalletManagement.Domain.Exceptions
{
    public class ReferenceAlreadyExistsException : BaseBusinessException
    {
        public ReferenceAlreadyExistsException() : base("Bu referans numarası ile daha önce işlem yapılmış.") {
        
        }
    }
}
