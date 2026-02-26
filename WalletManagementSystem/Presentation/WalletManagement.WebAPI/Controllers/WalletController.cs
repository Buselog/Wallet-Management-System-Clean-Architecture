using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WalletManagement.Application.Dtos;
using WalletManagement.Application.Managers;
using WalletManagement.Domain.Entities.Concretes;

namespace WalletManagement.WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WalletController : ControllerBase
    {
        private readonly IWalletManager _walletManager;
        private readonly ITransactionManager _transactionManager;

        public WalletController(IWalletManager walletManager, ITransactionManager transactionManager)
        {
            _walletManager = walletManager;
            _transactionManager = transactionManager;
        }

        [HttpGet("balance/{userId}")]
        public async Task<IActionResult> GetBalance(int userId)
        {
            var balance = await _walletManager.GetBalanceAsync(userId);
            return Ok(new { UserId = userId, Balance = balance });
        }

        [HttpGet("my-wallets/{userId}")]
        public async Task<IActionResult> GetMyWallets(int userId)
        {
            var wallets = await _walletManager.GetWalletsByUserIdAsync(userId);
            return Ok(wallets);
        }

        [HttpPost("createWallet")]
        public async Task<IActionResult> CreateWallet([FromBody] int userId)
        {
            var wallet = await _walletManager.CreateNewWalletAsync(userId);

            return Ok(new { Message = "Cüzdan başarıyla oluşturuldu.", WalletId = wallet.Id });
        }

        [HttpDelete("{walletId}/{userId}")] 
        public async Task<IActionResult> Delete(int walletId, int userId)
        {
            await _walletManager.DeleteWalletAsync(walletId, userId);

            return Ok(new { Message = "Cüzdan başarıyla silindi." });
        }

        [HttpPost("deposit")]
        public async Task<IActionResult> Deposit(CreateTransactionDto dto)
        {
            var result = await _walletManager.ProcessTransactionAsync(dto, "deposit");

            return Ok(new { Message = result });
        }

        [HttpPost("withdraw")]
        public async Task<IActionResult> Withdraw(CreateTransactionDto dto)
        {

            var result = await _walletManager.ProcessTransactionAsync(dto, "withdraw");

            return Ok(new { Message = result });
        }

        [HttpGet("history/{walletId}")]
        public async Task<IActionResult> GetHistory(int walletId, [FromQuery] DateTime? start, [FromQuery] DateTime? end, [FromQuery] int page = 1, [FromQuery] int size = 10)
        {
            var (items, total) = await _transactionManager.GetHistoryAsync(walletId, start, end, page, size);
            return Ok(new { Items = items, TotalCount = total });
        }
    }
}

