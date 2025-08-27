using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities;

public class DeceasedBurial
{
    [Required]
    [Key, ForeignKey("Deceased")]
    public Guid DeceasedId { get; set; }

    public BurialType BurialType { get; set; }
    
    public bool IsCivilBurial { get; set; }
    
    public bool BurialLicenseScanned { get; set; }
    
    public TaharahStatus TaharahStatus { get; set; }
    
    public string? TaharahLocation { get; set; }
    
    public string? CoffinType { get; set; } // TODO: Convert to Enum later
    
    public virtual Deceased Deceased { get; set; }

}