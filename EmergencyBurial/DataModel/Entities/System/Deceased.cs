using System.ComponentModel.DataAnnotations;

namespace DataModel.Entities
{
    public class Deceased
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

        public bool IsLinkedToOtherCases { get; set; }

        public string? BurialCity { get; set; }
        
        public bool IsCivilBurial { get; set; }
        
        [MaxLength(1000)]
        public string? Notes { get; set; }
    }
}