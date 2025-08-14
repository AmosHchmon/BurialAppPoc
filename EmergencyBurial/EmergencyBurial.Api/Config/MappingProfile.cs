using AutoMapper;
using DataModel.Entities;
using EmergencyBurial.Api.ViewModel;

namespace EmergencyBurial.Api.Config
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Member, MemberDto>()
                .ReverseMap();

            CreateMap<Deceased, DeceasedDto>()
                .ForMember(dest => dest.IsLinkedToOtherCasesValue, opt => opt.MapFrom(src => src.IsLinkedToOtherCases ? "כן" : "לא"))
                .ForMember(dest => dest.IsCivilBurialValue, opt => opt.MapFrom(src => src.IsCivilBurial ? "כן" : "לא"))
                .ReverseMap();
            
            CreateMap<Transport, TransportDto>()
                .ForMember(dest => dest.HalalNumber, opt => opt.MapFrom(src => src.Deceased.HalalNumber))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.Deceased.FirstName))
                .ReverseMap();
        }
    }
}