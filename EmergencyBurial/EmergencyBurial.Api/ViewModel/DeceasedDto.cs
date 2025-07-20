using System.ComponentModel.DataAnnotations;

namespace EmergencyBurial.Api.ViewModel;

public class DeceasedDto
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string HalalNumber { get; set; }

    public string IdentityNumber { get; set; }

    [Required]
    public string FirstName { get; set; }

    [Required]
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
        
    [MaxLength(1000)]
    public string? Notes { get; set; }
}