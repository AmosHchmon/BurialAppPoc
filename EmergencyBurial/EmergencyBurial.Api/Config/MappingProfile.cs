using System.Linq;
using AutoMapper;
using Core.Helpers;
using Core.Model;
using DataModel.Entities;
using DataModel.Entities.System;
using EmergencyBurial.Api.ViewModel;

namespace EmergencyBurial.Api.Config;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Member, MemberDto>()
            .ForMember(dest => dest.Password, src => src.Ignore())
            .ForMember(dest => dest.OrganizationDesc,
                opt => opt.MapFrom(src => ((OrganizationType)src.OrganizationTypeId).GetEnumDescription()))
            .ForMember(dest => dest.StationDesc, opt => opt.MapFrom(src => src.Station.Text))
            .ForMember(dest => dest.RoleDesc,
                opt => opt.MapFrom(src => ((RoleAccessType)src.RoleAccessTypeId).GetEnumDescription()))
            .ReverseMap()
            .ForMember(dest => dest.Station, opt => opt.Ignore())
            .ForMember(dest => dest.Password, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Password)));

        #region Deceased

        CreateMap<Deceased, DeceasedDto>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
            .ForMember(dest => dest.IdentityNumber, opt => opt.MapFrom(src => src.IdentityNumber ?? "חלל אינו מזוהה"))
            .ForMember(dest => dest.Affiliation,
                opt => opt.MapFrom(src => src.Affiliation.HasValue ? src.Affiliation.GetEnumDescription() : null))
            .ForMember(dest => dest.RelatedBagNumbers, opt => opt.MapFrom(src => src.DeceasedBags.Count))
            .ForMember(dest => dest.BagNumbersDisplay, opt =>
                opt.MapFrom(src => string.Join(" | ", src.DeceasedBags.Select(b => b.BagNumber))))
            .ForMember(dest => dest.ProcessStatusDesc,
                opt => opt.MapFrom(src => src.DeceasedProcessStatus.GetEnumDescription()))
            .ReverseMap();
        CreateMap<Deceased, ExternalDeceasedDto>()
            .ReverseMap();

        CreateMap<DeceasedBag, DeceasedBagDto>()
            .ForMember(dest => dest.ReceivingStation,
                opt => opt.MapFrom(src =>
                    src.ReceivingStation.HasValue ? src.ReceivingStation.GetEnumDescription() : null))
            .ForMember(dest => dest.BroughtBy,
                opt => opt.MapFrom(src => src.BroughtBy.HasValue ? src.BroughtBy.GetEnumDescription() : null))
            .ForMember(dest => dest.CanBeIdentifiedByAcquaintance,
                opt => opt.MapFrom(src => src.CanBeIdentifiedByAcquaintance ? "כן" : "לא"))
            .ReverseMap()
            .ForMember(dest => dest.ReceivingStation, opt => opt.Ignore())
            .ForMember(dest => dest.BroughtBy, opt => opt.Ignore())
            .ForMember(dest => dest.CanBeIdentifiedByAcquaintance, opt => opt.Ignore());

        CreateMap<Deceased, DeceasedSelectItemDto>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
            .ForMember(dest => dest.RelatedBagNumbers, opt => opt.MapFrom(src => src.DeceasedBags.Count))
            .ForMember(dest => dest.BagNumbersDisplay, opt =>
                opt.MapFrom(src => string.Join(" | ", src.DeceasedBags.Select(b => b.BagNumber))));
        
        CreateMap<DeceasedBag, BagSelectItemDto>()
            .ForMember(dest => dest.IdentityNumber, opt => opt.MapFrom(src => src.Deceased.IdentityNumber));

        CreateMap<DeceasedBurialProcessStatus, DeceasedBurialProcessStatusDto>()
            .ReverseMap();

        CreateMap<DeceasedBurialDetails, DeceasedBurialDetailsDto>()
            .ForMember(dest => dest.BurialType, opt => opt.MapFrom(src => src.BurialType.GetEnumDescription()))
            .ForMember(dest => dest.IsCivilBurial, opt => opt.MapFrom(src => src.IsCivilBurial ? "כן" : "לא"))
            .ForMember(dest => dest.BurialLicenseScanned,
                opt => opt.MapFrom(src => src.BurialLicenseScanned ? "כן" : "לא"))
            .ForMember(dest => dest.TaharahReceptionDate,
                opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.TaharahReceptionDate))
            .ForMember(dest => dest.TaharahReceptionDate,
                opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.TaharahReceptionDate))
            .ForMember(dest => dest.TaharahReleaseDate,
                opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.TaharahReleaseDate))
            .ForMember(dest => dest.IsTaharahPerformed,
                opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.IsTaharahPerformed))
            .ForMember(dest => dest.HasTachrichim,
                opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.HasTachrichim))
            .ForMember(dest => dest.InCoffin,
                opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.InCoffin ? "כן" : "לא"))
            .ForMember(dest => dest.CoffinReason,
                opt => opt.MapFrom(src => src.Deceased.DeceasedTaharahDetails.CoffinReason))
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
            .ForMember(dest => dest.DeceasedProcessStatusDesc,
                opt => opt.MapFrom(src => src.DeceasedProcessStatus.GetEnumDescription()))
            .ForMember(dest => dest.RelatedBagNumbers, opt => opt.MapFrom(src => src.DeceasedBags.Count))
            .ForMember(dest => dest.BagNumbersDisplay, opt =>
                opt.MapFrom(src => string.Join(" | ", src.DeceasedBags.Select(b => b.BagNumber))));

        CreateMap<DeceasedTaharahDetails, TaharahIntakeDto>()
            .ReverseMap();

        CreateMap<Deceased, TaharahProcessDto>()
            .ForMember(dest => dest.DeceasedId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
            .ForMember(dest => dest.BagNumbers,
                opt => opt.MapFrom(src => src.DeceasedBags.Select(b => b.BagNumber).ToList()))
            .ForMember(dest => dest.TaharahTeamManager,
                opt => opt.MapFrom(src => src.DeceasedTaharahDetails.TaharahTeamManager))
            .ForMember(dest => dest.IntermediateStorage,
                opt => opt.MapFrom(src => src.DeceasedTaharahDetails.IntermediateStorage))
            .ForMember(dest => dest.IsPendingExit, opt => opt.MapFrom(src => src.DeceasedTaharahDetails.IsPendingExit))
            .ForMember(dest => dest.PendingExitReason,
                opt => opt.MapFrom(src => src.DeceasedTaharahDetails.PendingExitReason))
            .ForMember(dest => dest.IsTaharahPerformed,
                opt => opt.MapFrom(src => src.DeceasedTaharahDetails.IsTaharahPerformed))
            .ForMember(dest => dest.HasTachrichim, opt => opt.MapFrom(src => src.DeceasedTaharahDetails.HasTachrichim))
            .ForMember(dest => dest.InCoffin, opt => opt.MapFrom(src => src.DeceasedTaharahDetails.InCoffin))
            .ForMember(dest => dest.CoffinReason, opt => opt.MapFrom(src => src.DeceasedTaharahDetails.CoffinReason));

        CreateMap<DeceasedTaharahDetails, TaharahProcessDto>()
            .ReverseMap();

        #endregion

        #region Tarah
        
        CreateMap<Deceased, TarahListDto>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
            .ForMember(dest => dest.IdentityNumber, opt => opt.MapFrom(src => src.IdentityNumber ?? "חלל אינו מזוהה"))
            .ForMember(dest => dest.FatherName, opt => opt.MapFrom(src => src.FatherName))
            .ForMember(dest => dest.IsIdentified, opt => opt.MapFrom(src => !string.IsNullOrWhiteSpace(src.IdentityNumber)))         
            .ForMember(dest => dest.ProcessStatusDesc, opt => opt.MapFrom(src => src.DeceasedProcessStatus.GetEnumDescription()))
            .ForMember(dest => dest.RelatedBagNumbers, opt => opt.MapFrom(src => src.DeceasedBags.Count))
            .ForMember(dest => dest.BagNumbersDisplay, opt =>
                opt.MapFrom(src => string.Join(" | ", src.DeceasedBags.Select(b => b.BagNumber))))
            .ForMember(dest => dest.TarahStatus, opt => opt.MapFrom(src => src.DeceasedTarahDetails.TarahStatus))
            .ForMember(dest => dest.TarahStatusDesc, opt =>
                opt.MapFrom(src => src.DeceasedTarahDetails != null
                    ? src.DeceasedTarahDetails.TarahStatus.GetEnumDescription()
                    : "טרם הוגדר"));
        
        CreateMap<Deceased, TarahProcessDto>()
            .ForMember(dest => dest.DeceasedId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.FullName,
                opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
            .ForMember(dest => dest.IsIdentified, opt => opt.MapFrom(src => !string.IsNullOrWhiteSpace(src.IdentityNumber)))
            .ForMember(dest => dest.BurialLicenseScanned,
                opt => opt.MapFrom(src => src.DeceasedBurialDetails.BurialLicenseScanned))
            .ForMember(dest => dest.TarahTeamManager,
                opt => opt.MapFrom(src => src.DeceasedTarahDetails.TarahTeamManager))
            .ForMember(dest => dest.IntermediateStorage,
                opt => opt.MapFrom(src => src.DeceasedTarahDetails.IntermediateStorage))
            .ForMember(dest => dest.IsPendingExit,
                opt => opt.MapFrom(src => src.DeceasedTarahDetails.IsPendingExit))
            .ForMember(dest => dest.PendingExitReason,
                opt => opt.MapFrom(src => src.DeceasedTarahDetails.PendingExitReason))
            .ForMember(dest => dest.Bags, opt => opt.MapFrom(src => src.DeceasedBags))
            .ReverseMap()
            .ForMember(dest => dest.DeceasedBags, opt => opt.Ignore());
        
        CreateMap<TarahProcessDto, DeceasedTarahDetails>()
            .ReverseMap();
        
        CreateMap<DeceasedBag, TarahBagDto>()
            .ForMember(dest => dest.BagProcessStatusDesc, opt => opt.MapFrom(src => src.BagTarahProcessStatus.GetEnumDescription()))
            .ReverseMap()
            .ForAllMembers(dest => dest.Ignore());
        
        CreateMap<TransportHistory, TarahBagHistoryDto>()
            .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.Transport.StartDateTime))
            .ForMember(dest => dest.Destination, opt => opt.MapFrom(src => src.Transport.Purpose.GetEnumDescription()))
            .ForMember(dest => dest.IsCompleted, opt => opt.MapFrom(src => src.Transport.IsCompleted));

        CreateMap<DeceasedTarahDetails, TarahIntakeDto>()
            .ReverseMap();
        
        #endregion

        #region Transport

        CreateMap<CreateTransportDto, Transport>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.IsCompleted, opt => opt.Ignore())
            .ForMember(dest => dest.ArrivalDateTime, opt => opt.Ignore())
            .ReverseMap()
            .ForMember(dest => dest.BagNumbers,
                opt => opt.MapFrom(src => src.DeceasedBags.Select(b => b.BagNumber).ToList()))
            .ForMember(dest => dest.DeceasedIds, 
                opt => opt.MapFrom(src => src.Deceaseds.Select(d => d.Id).ToList()));

        CreateMap<UpdateTransportDto, Transport>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.StartDateTime, opt => opt.Ignore())
            .ForMember(dest => dest.DeceasedBags, opt => opt.Ignore())
            .ForMember(dest => dest.Deceaseds, opt => opt.Ignore())
            .ForMember(dest => dest.IsCompleted, opt => opt.Ignore())
            .ReverseMap()
            .ForMember(dest => dest.BagNumbers,
                opt => opt.MapFrom(src => src.DeceasedBags.Select(b => b.BagNumber).ToList()))
            .ForMember(dest => dest.DeceasedIds, 
                opt => opt.MapFrom(src => src.DeceasedBags.Select(d => d.Deceased.Id).ToList()));;

        CreateMap<Transport, TransportListDto>()
            .ForMember(dest => dest.TotalBags, opt => opt.MapFrom(src => src.DeceasedBags.Count))
            .ForMember(dest => dest.BagNumbers, opt => opt.MapFrom(src =>
                src.DeceasedBags.Select(h => h.BagNumber).ToList()))
            .ForMember(dest => dest.PurposeDesc, opt => opt.MapFrom(src => src.Purpose.GetEnumDescription()))
            .ForMember(dest => dest.StartLocation, opt => opt.MapFrom(src =>
                !string.IsNullOrEmpty(src.StartLocationNameFreeText)
                    ? src.StartLocationNameFreeText
                    : src.StartLocationType.GetEnumDescription()));

        #endregion

        CreateMap<Event, EventDto>()
            .ReverseMap();

        #region common

        CreateMap<ListType, ListTypeDto>()
            .ReverseMap();

        CreateMap<ListItem, ListItemDto>()
            .ReverseMap();

        CreateMap<UserOtp, UserOtpDto>()
            .ReverseMap();

        #endregion
    }
}