using System;

namespace EmergencyBurial.Api.ViewModel;

public class TarahBagListDto
{
    public Guid Id { get; set; }
    
    public Guid DeceasedId { get; set; }

    public string BagNumber { get; set; }
    
    public bool IsIdentified { get; set; }
    
    public int? BagTarahProcessStatus { get; set; }
    
    public string BagProcessStatusDesc { get; set; }
}
