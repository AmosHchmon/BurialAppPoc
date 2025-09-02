using System;
using Core.Helpers;

namespace EmergencyBurial.Api.ViewModel;

public class DeceasedOperationalDto
{
    public Guid? DeceasedId { get; set; }

    public IdentificationStatus? IdentificationStatus { get; set; }
    
    public string? BadMessageProcessStatus { get; set; }
    
    public string? CollectionStatus { get; set; }
    
    public DateTime? BadMessageStartDate { get; set; }
    
    public BurialProcessStatus? BurialProcessStatus { get; set; }
}