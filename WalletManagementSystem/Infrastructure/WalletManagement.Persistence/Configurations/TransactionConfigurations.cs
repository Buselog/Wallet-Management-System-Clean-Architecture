using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Domain.Entities.Concretes;

namespace WalletManagement.Persistence.Configurations
{
    public class TransactionConfigurations : IEntityTypeConfiguration<WalletTransaction>
    {
        public void Configure(EntityTypeBuilder<WalletTransaction> builder)
        {
            builder.HasIndex(t => t.ReferenceId).IsUnique();

            builder.Property(t => t.Amount).HasPrecision(18, 2);
        }
    }
}
