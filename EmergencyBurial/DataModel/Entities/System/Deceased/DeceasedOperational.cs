using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities;

public class DeceasedOperational
{
    [Required]
    [Key, ForeignKey("Deceased")]
    public Guid DeceasedId { get; set; }

    public IdentificationStatus IdentificationStatus { get; set; }
    
    public string? NotificationProcessStatus { get; set; } // TODO: Convert to Enum later
    
    public string? CollectionStatus { get; set; } // TODO: Convert to Enum later
    
    public DateTime? NotificationStartDate { get; set; }
    
    public BurialProcessStatus? BurialProcessStatus { get; set; }
    
    public virtual Deceased Deceased { get; set; }

}