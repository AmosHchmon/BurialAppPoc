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
    
    public DateTime? TaharahReceptionDate { get; set; }
    
    public CoffinType CoffinType { get; set; }
    
    public virtual Deceased Deceased { get; set; }

}