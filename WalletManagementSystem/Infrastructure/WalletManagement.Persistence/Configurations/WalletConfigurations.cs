using Microsoft.EntityFrameworkCore;
using WalletManagement.Domain.Entities.Concretes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace WalletManagement.Persistence.Configurations
{
    public class WalletConfigurations : IEntityTypeConfiguration<Wallet>
    {
        public void Configure(EntityTypeBuilder<Wallet> builder)
        {
            builder.Property(w => w.RowVersion).IsRowVersion();

            builder.Property(w => w.Balance).HasPrecision(18, 2);

            builder.HasOne(w => w.User)
                   .WithMany(u => u.Wallets)
                   .HasForeignKey(w => w.UserId);
        }
    }
}
