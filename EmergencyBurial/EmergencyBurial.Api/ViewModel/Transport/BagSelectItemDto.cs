using System;

namespace EmergencyBurial.Api.ViewModel;

public class BagSelectItemDto
{
    public Guid? Id { get; set; }
    
    public string BagNumber { get; set; }
    
    public string IdentityNumber { get; set; }
}