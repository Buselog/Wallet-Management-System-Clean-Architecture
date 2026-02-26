using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WalletManagement.Application.Dtos
{
    public class WalletDto
    {
        // cüzdan listeleme ve bakiye görüntüleme işlemleri için yazılan DTO:
        public int Id { get; set; }
        public decimal Balance { get; set; }
        public string Currency { get; set; } = "TRY";
        public DateTime CreatedDate { get; set; }
        public DateTime? LastTransactionDate { get; set; }
        public List<TransactionDto> Transactions { get; set; } = new();
    }
}
