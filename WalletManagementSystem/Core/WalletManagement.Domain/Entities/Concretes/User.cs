using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Domain.Entities.Abstracts;

namespace WalletManagement.Domain.Entities.Concretes
{
    public class User : BaseEntity
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public ICollection<Wallet> Wallets { get; set; } = new List<Wallet>();
    }
}
