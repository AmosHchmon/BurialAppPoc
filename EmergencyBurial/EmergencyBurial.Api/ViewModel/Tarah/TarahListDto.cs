using System;
using System.Collections.Generic;

namespace EmergencyBurial.Api.ViewModel;

public class TarahListDto
{
    public Guid? Id { get; set; }

    public string IdentityNumber { get; set; }

    public string FullName { get; set; }

    public string FatherName { get; set; }
    
    public bool IsIdentified { get; set; }

    public string DeceasedProcessStatusDesc { get; set; }

    public string BagNumbersDisplay { get; set; }

    public int RelatedBagNumbers { get; set; }
}