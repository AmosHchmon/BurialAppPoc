using System;

namespace EmergencyBurial.Api.ViewModel;

public class TarahBagListDto
{
    public Guid Id { get; set; }
    
    public Guid DeceasedId { get; set; }

    public string Gender { get; set; }

    public int? Affiliation { get; set; }

    public string BagNumber { get; set; }
    
    public int BagProcessStatus { get; set; }
    
    public string BagProcessStatusDesc { get; set; }
    
    public string PartDescription { get; set; }

    public string ProcessStatusDesc { get; set; }
    
    public int? TarahStatus { get; set; }
    
    public string TarahStatusDesc { get; set; }
}
