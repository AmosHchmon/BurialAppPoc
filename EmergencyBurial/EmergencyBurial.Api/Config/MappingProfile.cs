using System.Linq;
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
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
            .ForMember(dest => dest.RelatedBagNumbers, opt => opt.MapFrom(src => src.DeceasedBags.Count))
            .ForMember(dest => dest.BagNumbersDisplay, opt => 
                opt.MapFrom(src => string.Join(" | ", src.DeceasedBags.Select(b => b.BagNumber))))
            .ReverseMap();
        
        CreateMap<Deceased, ExternalDeceasedDto>()
            .ReverseMap();

        CreateMap<DeceasedBag, DeceasedBagDto>()
            .ForMember(dest => dest.Affiliation, opt => opt.MapFrom(src => src.Affiliation.GetEnumDescription()))
            .ForMember(dest => dest.ReceivingStation, opt => opt.MapFrom(src => src.ReceivingStation.GetEnumDescription()))
            .ForMember(dest => dest.BroughtBy, opt => opt.MapFrom(src => src.BroughtBy.GetEnumDescription()))
            .ForMember(dest => dest.CanBeIdentifiedByAcquaintance, opt => opt.MapFrom(src => src.CanBeIdentifiedByAcquaintance ? "כן" : "לא"))
            .ReverseMap();

        CreateMap<DeceasedBurialProcessStatus, DeceasedBurialProcessStatusDto>()
            .ReverseMap();

        CreateMap<DeceasedBurialDetails, DeceasedBurialDetailsDto>()
            .ForMember(dest => dest.BurialType, opt => opt.MapFrom(src => src.BurialType.GetEnumDescription()))
            .ForMember(dest => dest.IsCivilBurial, opt => opt.MapFrom(src => src.IsCivilBurial ? "כן" : "לא"))
            .ForMember(dest => dest.BurialLicenseScanned, opt => opt.MapFrom(src => src.BurialLicenseScanned ? "כן" : "לא"))
            .ForMember(dest => dest.InCoffin, opt => opt.MapFrom(src => src.InCoffin ? "כן" : "לא"))
            .ForMember(dest => dest.TaharahStatus, opt => opt.MapFrom(src => src.TaharahStatus.GetEnumDescription()))
            .ReverseMap();

        CreateMap<DeceasedBurialCoordination, DeceasedBurialCoordinationDto>()
            .ReverseMap();

        #endregion

        CreateMap<Transport, TransportDto>()
            .ForMember(dest => dest.BagNumber, opt => opt.MapFrom(src => src.DeceasedBag.BagNumber))
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.DeceasedBag.Deceased.FirstName))
            .ReverseMap()
            .ForMember(dest => dest.DeceasedBag, opt => opt.Ignore());
        
        #region common

        CreateMap<ListType, ListTypeDto>()
            .ReverseMap();
        
        CreateMap<ListItem, ListItemDto>()
            .ReverseMap();

        #endregion
    }
}