using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WalletManagement.Domain.Entities.Abstracts
{
    public interface IEntity
    {
        int Id { get; set; }
        DateTime CreatedDate { get; set; }
    }
}
