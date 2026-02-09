using System;

namespace EmergencyBurial.Api.ViewModel;

public class DeceasedSelectItemDto
{
    public Guid? Id { get; set; }
    
    public string IdentityNumber { get; set; }
    
    public string FullName { get; set; }
    
    public string BagNumbersDisplay { get; set; }

    public int RelatedBagNumbers { get; set; }
}