using System;

namespace EmergencyBurial.Api.ViewModel;

public class BurialDetailsDto
{
    public Guid? DeceasedId { get; set; }

    public string? BurialType { get; set; }
    
    public string? IsCivilBurial { get; set; }
    
    public string? BurialLicenseNumber { get; set; }
    
    public string? BurialLicenseScanned { get; set; }
    
    public string? TaharahStatus { get; set; }
    
    public string? TaharahLocation { get; set; }
    
    public DateTime? TaharahReceptionDate { get; set; }
    
    public string? InCoffin { get; set; }
    
    public string? BodyConditionNotes { get; set; }
    
    public string? Block { get; set; }
    
    public string? Plot { get; set; }
    
    public string? Row { get; set; }
    
    public string? Grave { get; set; }
}