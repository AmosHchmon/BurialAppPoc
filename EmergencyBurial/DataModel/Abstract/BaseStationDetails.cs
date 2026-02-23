using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataModel.Entities;

namespace DataModel.Abstract;

public abstract class BaseStationDetails
{
    [Required]
    [Key]
    public Guid DeceasedId { get; set; }

    public int? StationId { get; set; }

    [Description("שם מנהל הצוות")]
    public string? TeamManager { get; set; }

    [Description("תאריך קליטת החלל בתחנה")]
    public DateTime? ReceptionDate { get; set; }

    [Description("תאריך שחרור החלל מהתחנה")]
    public DateTime? ReleaseDate { get; set; }

    [Description("נקלט על ידי")]
    public Guid? ReceivedBy { get; set; }

    [Description("פרטי אחסון ביניים")]
    public string? IntermediateStorage { get; set; }

    [Description("האם ממתין ליציאה")]
    public bool IsPendingExit { get; set; }

    [Description("סיבת המתנה ליציאה")]
    public string? PendingExitReason { get; set; }

    [ForeignKey(nameof(DeceasedId))]
    public virtual Deceased Deceased { get; set; }

    [ForeignKey(nameof(ReceivedBy))]
    public virtual Member ReceivedByMember { get; set; }
}