using System;

namespace EmergencyBurial.Api.ViewModel;

public class DeceasedBurialDetailsDto
{
    public Guid? DeceasedId { get; set; }

    public string? BurialType { get; set; }
    
    public string? IsCivilBurial { get; set; }
    
    public string? BurialLicenseNumber { get; set; }
    
    public string? BurialLicenseScanned { get; set; }
    
    public string? TaharahLocation { get; set; }
    
    public DateTime? TaharahReceptionDate { get; set; }
    
    public DateTime? TaharahReleaseDate { get; set; }
    
    public string? TaharahReceptionStaff { get; set; }
    
    public bool? IsTaharahPerformed { get; set; }
    
    public string? ExitTransportBy { get; set; }
    
    public bool HasTachrichim { get; set; }
    
    public string? InCoffin { get; set; }
    
    public string? CoffinReason { get; set; }
    
    public string? BodyConditionNotes { get; set; }
    
    public string? Block { get; set; }
    
    public string? Plot { get; set; }
    
    public string? Row { get; set; }
    
    public string? Grave { get; set; }
}