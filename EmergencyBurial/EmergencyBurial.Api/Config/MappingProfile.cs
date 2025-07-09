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
                .ForMember(x => x.MemberTypeDescription,
                    opt => opt.MapFrom(x => x.MemberType == null ? string.Empty : x.MemberType.Text))
                .ReverseMap()
                .ForMember(x => x.MemberType, opt => opt.Ignore());
        }
    }
}