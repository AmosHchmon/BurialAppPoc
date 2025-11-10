using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities;

public class BurialProcessStatus
{
    [Required]
    [Key]
    public Guid DeceasedId { get; set; }

    [Description("סטטוס הזיהוי")]
    public IdentificationStatus IdentificationStatus { get; set; }
    
    [Description("סטטוס תהליך ההודעה המרה")]
    public BadMessageProcessStatus? BadMessageProcessStatus { get; set; }
    
    [Description("סטטוס איסוף החלל")]
    public CollectionStatus? CollectionStatus { get; set; }
    
    public BurialStatus? BurialStatus { get; set; }
    
    public bool IsBadMessageReceived { get; set; }
    
    public DateTime? BadMessageStartDate { get; set; }
    
    [ForeignKey(nameof(DeceasedId))]
    public virtual Deceased Deceased { get; set; }

}