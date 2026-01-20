using System;
using System.Collections.Generic;

namespace EmergencyBurial.Api.ViewModel;

public class DeceasedDto
{
    public Guid? Id { get; set; }

    public string? IdentityNumber { get; set; }
    
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? FullName { get; set;}
    
    public string? FatherName { get; set; }
    
    public string? Gender { get; set; }
    
    public string? Nationality { get; set; }
    
    public string? HomeCity { get; set; }
    
    public string? HomeAddress { get; set; }
    
    public string? PeleNumber { get; set; }
    
    public string? Notes { get; set; }
    
    public string? BagNumbersDisplay { get; set; }
    
    public int? RelatedBagNumbers { get; set; }
    
    public int? ProcessStatus { get; set; }
    
    public string? ProcessStatusDesc { get; set; }
    
    public DateTime? CreatedOn { get; set; }

    public List<DeceasedBagDto> DeceasedBags { get; set; }
    
    public DeceasedBurialProcessStatusDto? DeceasedBurialProcessStatus { get; set; }
    
    public DeceasedBurialDetailsDto? DeceasedBurialDetails { get; set; }
    
    public DeceasedBurialCoordinationDto? DeceasedBurialCoordination { get; set; }
}