using System;

namespace EmergencyBurial.Api.ViewModel;

public class DeceasedBurialProcessStatusDto
{
    public Guid? DeceasedId { get; set; }

    public int? IdentificationStatus { get; set; }
    
    public int? BadMessageProcessStatus { get; set; }
    
    public int? CollectionStatus { get; set; }
    
    public int? BurialStatus { get; set; }
    
    public bool IsBadMessageReceived { get; set; }
    
    public bool IsReleasedFromTarah { get; set; }
    
    public DateTime? ReleasedFromTarahDate { get; set; }
    
    public bool IsBuried { get; set; }
    
    public DateTime? BurialDate { get; set; }
    
    public DateTime? BadMessageStartDate { get; set; }
}