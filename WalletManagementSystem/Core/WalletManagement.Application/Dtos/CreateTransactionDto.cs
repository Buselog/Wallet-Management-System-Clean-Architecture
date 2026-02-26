using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WalletManagement.Application.Dtos
{
    public class CreateTransactionDto
    {
        public int WalletId { get; set; } // yeni işlem isteği hangi cüzdan için
        public decimal Amount { get; set; } // ne kadarlık işlem
        public string ReferenceId { get; set; } = string.Empty; 
    }
}
