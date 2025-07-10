using AutoMapper;
using DataModel.Entities;
using EmergencyBurial.Api.ViewModel;

namespace EmergencyBurial.Api.Config
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>()
                .ReverseMap();
        }
    }
}