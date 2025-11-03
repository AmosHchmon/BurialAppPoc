using System;

namespace EmergencyBurial.Api.ViewModel;

public class DeceasedProcessStatusDto
{
    public Guid? DeceasedId { get; set; }

    public string? IdentificationStatus { get; set; }
    
    public string? BadMessageProcessStatus { get; set; }
    
    public string? CollectionStatus { get; set; }
    
    public string? BadMessageStartDate { get; set; }
    
    public string? BurialProcessStatus { get; set; }
}