using AutoMapper;
using Core.Helpers;
using Core.Model;
using DataModel.Entities;
using EmergencyBurial.Api.ViewModel;

namespace EmergencyBurial.Api.Config;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Member, MemberDto>()
            .ForMember(dest => dest.OrganizationDesc, opt => opt.MapFrom(src => ((OrganizationType)src.OrganizationTypeId).GetEnumDescription()))
            .ForMember(dest => dest.RoleDesc, opt => opt.MapFrom(src => ((RoleAccessType)src.RoleAccessTypeId).GetEnumDescription()))
            .ReverseMap();

        #region Deceased

        CreateMap<Deceased, DeceasedDto>()
            .ReverseMap();

        CreateMap<DeceasedBagDetails, DeceasedBagDetailsDto>()
            .ForMember(dest => dest.Affiliation, opt => opt.MapFrom(src => src.Affiliation.GetEnumDescription()))
            .ForMember(dest => dest.ReceivingStation, opt => opt.MapFrom(src => src.ReceivingStation.GetEnumDescription()))
            .ForMember(dest => dest.BroughtBy, opt => opt.MapFrom(src => src.BroughtBy.GetEnumDescription()))
            .ForMember(dest => dest.CanBeIdentifiedByAcquaintance, opt => opt.MapFrom(src => src.CanBeIdentifiedByAcquaintance ? "כן" : "לא"))
            .ReverseMap();

        CreateMap<DeceasedOperational, DeceasedOperationalDto>()
            .ForMember(dest => dest.IdentificationStatus, opt => opt.MapFrom(src => src.IdentificationStatus.GetEnumDescription()))
            .ForMember(dest => dest.BurialProcessStatus, opt => opt.MapFrom(src => src.BurialProcessStatus.GetEnumDescription()))
            .ForMember(dest => dest.BadMessageStartDate, opt => opt.MapFrom(src => src.BadMessageStartDate.ToString("dd/MM/yyyy")))
            .ReverseMap();

        CreateMap<DeceasedBurial, DeceasedBurialDto>()
            .ForMember(dest => dest.BurialType, opt => opt.MapFrom(src => src.BurialType.GetEnumDescription()))
            .ForMember(dest => dest.IsCivilBurial, opt => opt.MapFrom(src => src.IsCivilBurial ? "כן" : "לא"))
            .ForMember(dest => dest.BurialLicenseScanned, opt => opt.MapFrom(src => src.BurialLicenseScanned ? "כן" : "לא"))
            .ForMember(dest => dest.TaharahStatus, opt => opt.MapFrom(src => src.TaharahStatus.GetEnumDescription()))
            .ForMember(dest => dest.InCoffin, opt => opt.MapFrom(src => src.InCoffin ? "כן" : "לא"))
            .ReverseMap();

        CreateMap<DeceasedBurialCoordination, DeceasedBurialCoordinationDto>()
            .ReverseMap();

        #endregion

        CreateMap<Transport, TransportDto>()
            .ForMember(dest => dest.HalalNumber, opt => opt.MapFrom(src => src.Deceased.HalalNumber))
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.Deceased.FirstName))
            .ReverseMap()
            .ForMember(dest => dest.Deceased, opt => opt.Ignore());

        #region common

        CreateMap<ListType, ListTypeDto>()
            .ReverseMap();
        
        CreateMap<ListItem, ListItemDto>()
            .ReverseMap();

        #endregion
    }
}