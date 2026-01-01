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
            .ForMember(dest => dest.ProcessStatusDesc, opt => opt.MapFrom(src => src.ProcessStatus.GetEnumDescription()))
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
            .ForMember(dest => dest.BurialLicenseScanned,
                opt => opt.MapFrom(src => src.BurialLicenseScanned ? "כן" : "לא"))
            .ForMember(dest => dest.TaharahLocation, opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.TaharahLocation))
            .ForMember(dest => dest.TaharahStatus, opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.TaharahStatus.GetEnumDescription()))
            .ForMember(dest => dest.TaharahReceptionDate, opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.TaharahReceptionDate))
            .ForMember(dest => dest.TaharahReceptionStaff, opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.TaharahReceptionStaff))
            .ForMember(dest => dest.TaharahProcessStartDate, opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.TaharahProcessStartDate))
            .ForMember(dest => dest.TaharahClosingDate, opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.TaharahClosingDate))
            .ForMember(dest => dest.IsTaharahPerformed, opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.IsTaharahPerformed))
            .ForMember(dest => dest.ExitTransportBy, opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.ExitTransportBy))
            .ForMember(dest => dest.HasTachrichim, opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.HasTachrichim))
            .ForMember(dest => dest.InCoffin, opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.InCoffin ? "כן" : "לא"))
            .ForMember(dest => dest.CoffinReason, opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.CoffinReason))
            .ReverseMap()
            .ForMember(dest => dest.BurialType, opt => opt.Ignore())
            .ForMember(dest => dest.IsCivilBurial, opt => opt.Ignore())
            .ForMember(dest => dest.BurialLicenseScanned, opt => opt.Ignore());
          

        CreateMap<DeceasedBurialCoordination, DeceasedBurialCoordinationDto>()
            .ReverseMap();

        #endregion

        #region Taharah

        CreateMap<Deceased, TaharahListDto>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
            .ForMember(dest => dest.ProcessStatusDesc, opt => opt.MapFrom(src => src.ProcessStatus.GetEnumDescription()))
            .ForMember(dest => dest.RelatedBagNumbers, opt => opt.MapFrom(src => src.DeceasedBags.Count))
            .ForMember(dest => dest.BagNumbersDisplay, opt => 
                opt.MapFrom(src => string.Join(" | ", src.DeceasedBags.Select(b => b.BagNumber))))
            .ForMember(dest => dest.TaharahStatus, opt => opt.MapFrom(src => src.DeceasedTaharahDetails.TaharahStatus))
            .ForMember(dest => dest.TaharahStatusDesc, opt => 
                opt.MapFrom(src => src.DeceasedTaharahDetails != null 
                    ? src.DeceasedTaharahDetails.TaharahStatus.GetEnumDescription() : "טרם הוגדר"));
        
        CreateMap<TaharahIntakeDto, DeceasedTaharahDetails>()
            .ReverseMap();
        
        CreateMap<Deceased, TaharahProcessDto>()
            .ForMember(dest => dest.DeceasedId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.IsTaharahPerformed, opt => opt.MapFrom(src => src.DeceasedTaharahDetails.IsTaharahPerformed))
            .ForMember(dest => dest.HasTachrichim, opt => opt.MapFrom(src => src.DeceasedTaharahDetails.HasTachrichim))
            .ForMember(dest => dest.InCoffin, opt => opt.MapFrom(src => src.DeceasedTaharahDetails.InCoffin))
            .ForMember(dest => dest.CoffinReason, opt => opt.MapFrom(src => src.DeceasedTaharahDetails.CoffinReason))
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName));

        CreateMap<DeceasedTaharahDetails, TaharahProcessDto>()
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