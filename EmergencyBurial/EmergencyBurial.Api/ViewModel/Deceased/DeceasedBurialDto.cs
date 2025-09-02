using System;
using Core.Helpers;

namespace EmergencyBurial.Api.ViewModel;

public class DeceasedBurialDto
{
    public Guid? DeceasedId { get; set; }

    public BurialType? BurialType { get; set; }
    
    public bool? IsCivilBurial { get; set; }
    
    public bool? BurialLicenseScanned { get; set; }
    
    public TaharahStatus? TaharahStatus { get; set; }
    
    public string? TaharahLocation { get; set; }
    
    public DateTime? TaharahReceptionDate { get; set; }
    
    public bool? InCoffin { get; set; }
}