using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Domain.Entities.Abstracts;

namespace WalletManagement.Domain.Entities.Concretes
{
    public class WalletTransaction : BaseEntity
    {
        public int WalletId { get; set; }
        public decimal Amount { get; set; }
        public string TransactionType { get; set; } = string.Empty; // deposit veya withdraw
        public string ReferenceId { get; set; } = string.Empty;
        public Wallet Wallet { get; set; } = null!;
    }
}
