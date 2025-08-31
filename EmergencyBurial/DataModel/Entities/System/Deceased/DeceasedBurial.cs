using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities;

public class DeceasedBurial
{
    [Required]
    [Key]
    public Guid DeceasedId { get; set; }

    public BurialType BurialType { get; set; }
    
    public bool IsCivilBurial { get; set; }
    
    public bool BurialLicenseScanned { get; set; }
    
    public TaharahStatus TaharahStatus { get; set; }
    
    public string? TaharahLocation { get; set; }
    
    public DateTime? TaharahReceptionDate { get; set; }
    
    public bool? InCoffin { get; set; }
    
    [ForeignKey(nameof(DeceasedId))]
    public virtual Deceased Deceased { get; set; }

}