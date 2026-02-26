using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Application.Dtos;
using WalletManagement.Domain.Entities.Concretes;

namespace WalletManagement.Application.Managers
{
    public interface IUserManager : IBaseManager<User, UserDto>
    {
        // User özelinde yazılacak metot imzaları
    }
}
