using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataModel.Entities.System;

namespace DataModel.Entities;

public class DeceasedBag
{
    
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    public Guid DeceasedId { get; set; }
    
    [Required]
    [Description("מספר שק")]
    public string BagNumber { get; set; }
    
    [Description("תיאור חלק (במקרה של חלל חלקי)")]
    public string? PartDescription { get; set; }
    
    [Description("האם נמצא בשינוע")]
    public bool IsInTransport { get; set; }
    
    [Description("מזהה שינוע נוכחי")]
    public int? CurrentTransportId { get; set; }
    
    [ForeignKey(nameof(DeceasedId))]
    public virtual Deceased Deceased { get; set; }
    
    [ForeignKey(nameof(CurrentTransportId))]
    public virtual Transport CurrentTransport { get; set; }
    
    public virtual ICollection<RelDeceasedTransport> TransportHistory { get; set; } = new List<RelDeceasedTransport>();
}