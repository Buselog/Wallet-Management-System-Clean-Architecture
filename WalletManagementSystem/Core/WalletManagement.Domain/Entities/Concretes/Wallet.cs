using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Domain.Entities.Abstracts;

namespace WalletManagement.Domain.Entities.Concretes
{
    public class Wallet : BaseEntity
    {
        public int UserId { get; set; }
        public decimal Balance { get; set; } 
        public string Currency { get; set; } = "TRY";
        public bool IsDeleted { get; set; } = false;
        public User User { get; set; } = null!;

        [Timestamp]
        public byte[] RowVersion { get; set; }
        public ICollection<WalletTransaction> Transactions { get; set; } = new List<WalletTransaction>();
    }
}
