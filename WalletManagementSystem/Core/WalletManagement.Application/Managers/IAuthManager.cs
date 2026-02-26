using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Application.Dtos;

namespace WalletManagement.Application.Managers
{
    public interface IAuthManager
    {
        Task<string> RegisterAsync(UserRegisterDto registerDto);

        Task<LoginResponseDto> LoginAsync(UserLoginDto loginDto);
    }
}
