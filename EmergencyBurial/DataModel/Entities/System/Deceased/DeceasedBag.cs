using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

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

    [Description("סטטוס תהליך שק")]
    public BagTarahProcessStatus BagTarahProcessStatus { get; set; }

    [Description("קובץ רישיון קבורה")]
    public Guid? BurialLicenseFileId { get; set; }

    public TarahStations? ReceivingStation { get; set; }

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
    
    [Description("חפצים שנמצאו על החלל")]
    public string? ObjectsOnDeceased { get; set; }
    
    [ForeignKey(nameof(DeceasedId))]
    public virtual Deceased Deceased { get; set; }
    
    public virtual IEnumerable<Transport> Transports { get; set; }
}