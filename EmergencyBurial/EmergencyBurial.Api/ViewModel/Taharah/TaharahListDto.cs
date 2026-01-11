using System;

namespace EmergencyBurial.Api.ViewModel;

public class TaharahListDto
{
    public Guid? Id { get; set; }

    public string IdentityNumber { get; set; }

    public string FullName { get; set; }

    public string FatherName { get; set; }

    public string ProcessStatusDesc { get; set; }

    public string BagNumbersDisplay { get; set; }

    public int RelatedBagNumbers { get; set; }
    
    public int? TaharahStatus { get; set; }
    
    public string TaharahStatusDesc { get; set; }
}