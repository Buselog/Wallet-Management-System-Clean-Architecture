using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Application.Dtos;
using WalletManagement.Application.Managers;
using WalletManagement.Contract.Repositories;
using WalletManagement.Domain.Entities.Concretes;
using WalletManagement.Domain.Exceptions;
using WalletManagement.InnerInfrastructure.Security;


namespace WalletManagement.InnerInfrastructure.Managers
{
    public class AuthManager : IAuthManager
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthManager(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<string> RegisterAsync(UserRegisterDto registerDto)
        {
            var isExist = await _userRepository.GetByUsernameAsync(registerDto.Username);
            if (isExist != null) throw new BaseBusinessException("Bu kullanıcı adı zaten alınmış.");

            var passwordHash = PasswordHasher.HashPassword(registerDto.Password);

            var newUser = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = passwordHash,
                CreatedDate = DateTime.Now
            };

            await _userRepository.AddAsync(newUser);
            await _userRepository.SaveChangesAsync();

            return "Kayıt işlemi başarılı.";

        }

        public async Task<LoginResponseDto> LoginAsync(UserLoginDto loginDto)
        {
            var user = await _userRepository.GetByUsernameAsync(loginDto.Username);

            if (user == null || !PasswordHasher.VerifyPassword(loginDto.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Kullanıcı adı veya şifre hatalı.");
            }

            var token = GenerateJwtToken(user);

            return new LoginResponseDto
            {
                Token = token,
                UserId = user.Id,
                Username = user.Username
            };
        }

        private string GenerateJwtToken(User user)
        {
           
            var claims = new[]
            {
              new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
              new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(3), 
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
