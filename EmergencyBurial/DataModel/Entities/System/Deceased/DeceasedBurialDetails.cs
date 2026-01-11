using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities;

public class DeceasedBurialDetails
{
    [Required]
    [Key]
    public Guid DeceasedId { get; set; }

    public BurialType? BurialType { get; set; }
    
    public bool IsCivilBurial { get; set; }
    
    public string? BurialLicenseNumber { get; set; }
    
    [Description("האם רישיון הקבורה נסרק למערכת")]
    public bool BurialLicenseScanned { get; set; }
    
    [Description("הערות על מצב הגופה")]
    public string? BodyConditionNotes { get; set; }
    
    [Description("גוש")]
    public string? Block { get; set; }
    
    [Description("חלקה")]
    public string? Plot { get; set; }
    
    public string? Row { get; set; }
    
    public string? Grave { get; set; }
    
    [ForeignKey(nameof(DeceasedId))]
    public virtual Deceased Deceased { get; set; }

}