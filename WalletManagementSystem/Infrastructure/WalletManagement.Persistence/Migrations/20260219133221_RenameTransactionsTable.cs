using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WalletManagement.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RenameTransactionsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Wallets_WalletId",
                table: "Transactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Transactions",
                table: "Transactions");

            migrationBuilder.RenameTable(
                name: "Transactions",
                newName: "WalletTransactions");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_WalletId",
                table: "WalletTransactions",
                newName: "IX_WalletTransactions_WalletId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_ReferenceId",
                table: "WalletTransactions",
                newName: "IX_WalletTransactions_ReferenceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WalletTransactions",
                table: "WalletTransactions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WalletTransactions_Wallets_WalletId",
                table: "WalletTransactions",
                column: "WalletId",
                principalTable: "Wallets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WalletTransactions_Wallets_WalletId",
                table: "WalletTransactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WalletTransactions",
                table: "WalletTransactions");

            migrationBuilder.RenameTable(
                name: "WalletTransactions",
                newName: "Transactions");

            migrationBuilder.RenameIndex(
                name: "IX_WalletTransactions_WalletId",
                table: "Transactions",
                newName: "IX_Transactions_WalletId");

            migrationBuilder.RenameIndex(
                name: "IX_WalletTransactions_ReferenceId",
                table: "Transactions",
                newName: "IX_Transactions_ReferenceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Transactions",
                table: "Transactions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Wallets_WalletId",
                table: "Transactions",
                column: "WalletId",
                principalTable: "Wallets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
