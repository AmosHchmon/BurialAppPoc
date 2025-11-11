using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities;

public class BagDetails
{
    [Required]
    [Key]
    public Guid DeceasedId { get; set; }

    [Description("שיוך ארגוני")]
    public Affiliation? Affiliation { get; set; }

    public TarahStations ReceivingStation { get; set; }

    public string? LastKnownLocation { get; set; }
    
    [Description("תיאור חלק (במקרה של חלל חלקי)")]
    public string? PartDescription { get; set; }

    public int? RelatedBagNumbers { get; set; }

    [Description("האם ניתן לזהות את החלל בהיכרות אישית")]
    public bool CanBeIdentifiedByAcquaintance { get; set; }

    public string? ReceivingNotes { get; set; }
    
    public string? FillerName { get; set; }
    
    public DateTime? ArrivalDateTime { get; set; }
    
    [Description("הגורם שהביא את השק")]
    public BurialBody? BroughtBy { get; set; }
    
    [Description("המיקום ממנו הובא השק")]
    public string? BroughtFrom { get; set; }
    
    public string? ObjectsOnDeceased { get; set; }
    
    [ForeignKey(nameof(DeceasedId))]
    public virtual Deceased Deceased { get; set; }
}