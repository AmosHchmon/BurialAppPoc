using System;
using System.Collections.Generic;

namespace EmergencyBurial.Api.ViewModel;

public class DeceasedBagDto
{
    public Guid Id { get; set; }
    
    public Guid? DeceasedId { get; set; }
    
    public string BagNumber { get; set; }

    public string? PartDescription { get; set; }
}