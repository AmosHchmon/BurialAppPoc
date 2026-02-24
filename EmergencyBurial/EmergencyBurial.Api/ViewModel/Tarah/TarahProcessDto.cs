using System;
using System.Collections.Generic;

namespace EmergencyBurial.Api.ViewModel;

public class TarahProcessDto
{
    public Guid? DeceasedId { get; set; }
    
    public string FullName { get; set; }

    public string IdentityNumber { get; set; }

    public string FatherName { get; set; }
    
    public bool IsIdentified { get; set; }

    public string Gender { get; set; }

    public int? Affiliation { get; set; }

    public bool BurialLicenseScanned { get; set; }
    
    public bool CanBeIdentifiedByAcquaintance { get; set; }

    public string TeamManager { get; set; }

    public string IntermediateStorage { get; set; }

    public bool IsPendingExit { get; set; }

    public string PendingExitReason { get; set; }

    public bool IsPopulationRegistryUpdated { get; set; }
    
    public List<TarahBagDto> Bags { get; set; } = new();
}