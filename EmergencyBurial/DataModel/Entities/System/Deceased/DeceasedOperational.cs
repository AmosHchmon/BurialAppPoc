using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities;

public class DeceasedOperational
{
    [Required]
    [Key]
    public Guid DeceasedId { get; set; }

    [Description("סטטוס הזיהוי")]
    public IdentificationStatus IdentificationStatus { get; set; }
    
    [Description("סטטוס תהליך ההודעה המרה")]
    public string? BadMessageProcessStatus { get; set; } // TODO: Convert to Enum later
    
    [Description("סטטוס איסוף החלל")]
    public string? CollectionStatus { get; set; } // TODO: Convert to Enum later
    
    public DateTime BadMessageStartDate { get; set; }
    
    public BurialProcessStatus? BurialProcessStatus { get; set; }
    
    [ForeignKey(nameof(DeceasedId))]
    public virtual Deceased Deceased { get; set; }

}