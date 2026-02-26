using Microsoft.Extensions.Configuration;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Application.Dtos;
using WalletManagement.Contract.Repositories;
using WalletManagement.Domain.Entities.Concretes;
using WalletManagement.Domain.Exceptions;
using WalletManagement.InnerInfrastructure.Managers;
using WalletManagement.InnerInfrastructure.Security;

namespace WalletManagement.Tests
{
    public class AuthManagerTests
    {
        private readonly Mock<IUserRepository> _mockUserRepo;
        private readonly Mock<IConfiguration> _mockConfig;
        private readonly AuthManager _sut;

        public AuthManagerTests()
        {
            _mockUserRepo = new Mock<IUserRepository>();
            _mockConfig = new Mock<IConfiguration>();
            _sut = new AuthManager(_mockUserRepo.Object, _mockConfig.Object);
        }


        [Fact]
        public async Task RegisterAsync_ShouldThrowBaseBusinessException_WhenUsernameAlreadyExists()
        {
            var registerDto = new UserRegisterDto { Username = "existingUser", Email = "test@test.com", Password = "123" };
            var existingUser = new User { Username = "existingUser" };

            _mockUserRepo.Setup(x => x.GetByUsernameAsync(registerDto.Username))
                .ReturnsAsync(existingUser);

            await Assert.ThrowsAsync<BaseBusinessException>(() => _sut.RegisterAsync(registerDto));
        }

        [Fact]
        public async Task LoginAsync_ShouldThrowUnauthorizedAccessException_WhenPasswordIsWrong()
        {
            var loginDto = new UserLoginDto { Username = "sultan", Password = "wrong_password" };
            var fakeUser = new User
            {
                Username = "sultan",
                PasswordHash = PasswordHasher.HashPassword("123456")
            };

            _mockUserRepo.Setup(x => x.GetByUsernameAsync(loginDto.Username))
                .ReturnsAsync(fakeUser);

            await Assert.ThrowsAsync<UnauthorizedAccessException>(() => _sut.LoginAsync(loginDto));
        }

        [Fact]
        public async Task LoginAsync_ShouldThrowUnauthorizedAccessException_WhenUserDoesNotExist()
        {
            var loginDto = new UserLoginDto { Username = "nonexistent_user", Password = "any_password" };

            _mockUserRepo.Setup(x => x.GetByUsernameAsync(loginDto.Username))
                .ReturnsAsync((User)null!);

            await Assert.ThrowsAsync<UnauthorizedAccessException>(() => _sut.LoginAsync(loginDto));
        }
    }
}
