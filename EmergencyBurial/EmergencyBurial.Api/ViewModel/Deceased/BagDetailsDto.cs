using System;

namespace EmergencyBurial.Api.ViewModel;

public class BagDetailsDto
{
    public Guid? DeceasedId { get; set; }

    public string? Affiliation { get; set; }

    public string? ReceivingStation { get; set; }

    public string? LastKnownLocation { get; set; }

    public string? PartDescription { get; set; }

    public int? RelatedBagNumbers { get; set; }

    public string? CanBeIdentifiedByAcquaintance { get; set; }

    public string? ReceivingNotes { get; set; }
    
    public string? FillerName { get; set; }
    
    public DateTime? ArrivalDateTime { get; set; }
    
    public string? BroughtBy { get; set; }
    
    public string? BroughtFrom { get; set; }
    
    public string? ObjectsOnDeceased { get; set; }
}