using System;

namespace EmergencyBurial.Api.ViewModel;

public class BurialProcessStatusDto
{
    public Guid? DeceasedId { get; set; }

    public int? IdentificationStatus { get; set; }
    
    public int? BadMessageProcessStatus { get; set; }
    
    public int? CollectionStatus { get; set; }
    
    public int? BurialStatus { get; set; }
    
    public bool IsBadMessageReceived { get; set; }
    
    public DateTime? BadMessageStartDate { get; set; }
    
}