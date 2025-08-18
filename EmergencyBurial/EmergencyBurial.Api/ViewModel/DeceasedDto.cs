using System;

namespace EmergencyBurial.Api.ViewModel;

public class DeceasedDto
{
    public int Id { get; set; }
    
    public string HalalNumber { get; set; }

    public string IdentityNumber { get; set; }
    
    public string FirstName { get; set; }
    
    public string LastName { get; set; }

    public string? FatherName { get; set; }

    public string? Gender { get; set; }

    public string? Nationality { get; set; }

    public string? HomeCity { get; set; }

    public string? HomeAddress { get; set; }

    public int CurrentStatusId { get; set; }

    public int CurrentLocationId { get; set; }
    public string IsLinkedToOtherCasesValue { get; set; }

    public string BurialCity { get; set; }

    public string IsCivilBurialValue { get; set; }

    public DateTime? CreatedOn { get; set; }
    
    public string? Notes { get; set; }
}