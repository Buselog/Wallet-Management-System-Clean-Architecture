using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalletManagement.Application.Dtos;
using WalletManagement.Domain.Entities.Concretes;

namespace WalletManagement.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();

            CreateMap<UserRegisterDto, User>();

            CreateMap<Wallet, WalletDto>().ReverseMap();

            CreateMap<WalletTransaction, TransactionDto>().ReverseMap();

            CreateMap<CreateTransactionDto, WalletTransaction>();

        }
    }
}
