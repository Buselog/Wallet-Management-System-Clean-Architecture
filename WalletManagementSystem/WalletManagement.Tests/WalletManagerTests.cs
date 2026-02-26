using AutoMapper;
using Moq;
using WalletManagement.Application.Dtos;
using WalletManagement.Contract.Repositories;
using WalletManagement.Domain.Entities.Concretes;
using WalletManagement.Domain.Exceptions;
using WalletManagement.InnerInfrastructure.Managers;

namespace WalletManagement.Tests
{
    public class WalletManagerTests
    {
        private readonly Mock<IWalletRepository> _mockWalletRepo;
        private readonly Mock<ITransactionRepository> _mockTransactionRepo;
        private readonly Mock<IMapper> _mockMapper; 
        private readonly WalletManager _sut;

        public WalletManagerTests()
        {
            _mockWalletRepo = new Mock<IWalletRepository>();
            _mockTransactionRepo = new Mock<ITransactionRepository>();
            _mockMapper = new Mock<IMapper>();

            _sut = new WalletManager(
                _mockWalletRepo.Object,
                _mockMapper.Object,
                _mockTransactionRepo.Object);
        }

        [Fact]
        public async Task GetBalanceAsync_ShouldThrowKeyNotFoundException_WhenWalletIsNull()
        {
            int userId = 1;

            _mockWalletRepo
                .Setup(repo => repo.GetByUserIdAsync(userId))
                .ReturnsAsync((Wallet)null!);
          
            var exception = await Assert.ThrowsAsync<KeyNotFoundException>(() =>
                _sut.GetBalanceAsync(userId)
            );

            Assert.Equal("Cüzdan bulunamadý.", exception.Message);
        }

        [Fact]
        public async Task ProcessTransactionAsync_ShouldThrowInsufficientBalanceException_WhenBalanceIsLowerThanAmount()
        {
            var transactionDto = new CreateTransactionDto
            {
                WalletId = 1,
                Amount = 200, 
                ReferenceId = "ref123"
            };
            string type = "withdraw";

            var fakeWallet = new Wallet { Id = 1, Balance = 100 };

            _mockTransactionRepo.Setup(x => x.ReferenceIdExistsAsync(transactionDto.ReferenceId))
                .ReturnsAsync(false);

            _mockWalletRepo.Setup(x => x.GetByIdAsync(transactionDto.WalletId))
                .ReturnsAsync(fakeWallet);

            await Assert.ThrowsAsync<InsufficientBalanceException>(() =>
                _sut.ProcessTransactionAsync(transactionDto, type)
            );
        }

        [Fact]
        public async Task ProcessTransactionAsync_ShouldThrowReferenceAlreadyExistsException_WhenReferenceIdAlreadyUsed()
        {
            var transactionDto = new CreateTransactionDto
            {
                WalletId = 1,
                Amount = 50,
                ReferenceId = "duplicate_ref_123"
            };

            _mockTransactionRepo
                .Setup(x => x.ReferenceIdExistsAsync(transactionDto.ReferenceId))
                .ReturnsAsync(true);

            await Assert.ThrowsAsync<ReferenceAlreadyExistsException>(() =>
                _sut.ProcessTransactionAsync(transactionDto, "deposit")
            );
        }

        [Fact]
        public async Task ProcessTransactionAsync_ShouldThrowConcurrencyException_WhenConflictOccurs()
        {
            var transactionDto = new CreateTransactionDto
            {
                WalletId = 1,
                Amount = 100,
                ReferenceId = "ref_conflict"
            };
            var fakeWallet = new Wallet { Id = 1, Balance = 500 };

            _mockTransactionRepo.Setup(x => x.ReferenceIdExistsAsync(transactionDto.ReferenceId))
                                .ReturnsAsync(false);

            _mockWalletRepo.Setup(x => x.GetByIdAsync(transactionDto.WalletId))
                           .ReturnsAsync(fakeWallet);

            _mockWalletRepo.Setup(x => x.ExecuteMoneyTransactionWithSPAsync(
                It.IsAny<int>(), It.IsAny<decimal>(), It.IsAny<string>(), It.IsAny<string>()))
                .ThrowsAsync(new Exception("Concurrency Conflict")); 
          
            await Assert.ThrowsAsync<ConcurrencyException>(() =>
                _sut.ProcessTransactionAsync(transactionDto, "deposit")
            );
        }

        [Fact]
        public async Task ProcessTransactionAsync_ShouldReturnSuccessMessage_WhenAllConditionsAreMet()
        {
            var transactionDto = new CreateTransactionDto
            {
                WalletId = 1,
                Amount = 100,
                ReferenceId = "unique_ref_999"
            };
            var fakeWallet = new Wallet { Id = 1, Balance = 500 };

            _mockTransactionRepo.Setup(x => x.ReferenceIdExistsAsync(transactionDto.ReferenceId))
                .ReturnsAsync(false);

            _mockWalletRepo.Setup(x => x.GetByIdAsync(transactionDto.WalletId))
                .ReturnsAsync(fakeWallet);

            _mockWalletRepo.Setup(x => x.ExecuteMoneyTransactionWithSPAsync(
                It.IsAny<int>(), It.IsAny<decimal>(), It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(true);

            var result = await _sut.ProcessTransactionAsync(transactionDto, "withdraw");

            Assert.Equal("Ýþlem baþarýyla tamamlandý.", result);
        }

        [Fact]
        public async Task GetBalanceAsync_ShouldThrowWalletDeletedException_WhenWalletIsDeleted()
        {
            int userId = 1;
            var deletedWallet = new Wallet { Id = 1, UserId = userId, IsDeleted = true };

            _mockWalletRepo
                .Setup(repo => repo.GetByUserIdAsync(userId))
                .ReturnsAsync(deletedWallet);

            var exception = await Assert.ThrowsAsync<WalletDeletedException>(() =>
                _sut.GetBalanceAsync(userId)
            );

            Assert.Equal("Bu cüzdan silindiði için iþlem yapýlamaz.", exception.Message);
        }
    }
}

