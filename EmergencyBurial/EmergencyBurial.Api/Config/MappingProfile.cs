using AutoMapper;
using DataModel.Entities;
using EmergencyBurial.Api.ViewModel;

namespace EmergencyBurial.Api.Config;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Member, MemberDto>()
            .ReverseMap();

        #region Deceased

        CreateMap<Deceased, DeceasedDto>()
            .ReverseMap();

        CreateMap<DeceasedBagDetails, DeceasedBagDetailsDto>()
            .ReverseMap();

        CreateMap<DeceasedOperational, DeceasedOperationalDto>()
            .ReverseMap();

        CreateMap<DeceasedBurial, DeceasedBurialDto>()
            .ReverseMap();

        CreateMap<DeceasedBurialCoordination, DeceasedBurialCoordinationDto>()
            .ReverseMap();

        #endregion

        CreateMap<Transport, TransportDto>()
            .ForMember(dest => dest.HalalNumber, opt => opt.MapFrom(src => src.Deceased.HalalNumber))
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.Deceased.FirstName))
            .ReverseMap()
            .ForMember(dest => dest.Deceased, opt => opt.Ignore());
    }
}