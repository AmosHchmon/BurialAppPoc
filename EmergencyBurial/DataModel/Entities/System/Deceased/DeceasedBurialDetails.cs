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
    
    public TaharahStatus? TaharahStatus { get; set; }
    
    public BurialPreparation? TaharahLocation { get; set; }
    
    [Description("תאריך קליטת החלל במכון הטהרה")]
    public DateTime? TaharahReceptionDate { get; set; }
    
    [Description("שם העובד שקלט את החלל לטהרה")]
    public string? TaharahReceptionStaff { get; set; }

    [Description("תאריך ושעה תחילת תהליך הטהרה")]
    public DateTime? TaharahProcessStartDate { get; set; }

    [Description("תאריך ושעה סגירת הכנה לקבורה")]
    public DateTime? TaharahClosingDate { get; set; }
    
    [Description("האם בוצעה טהרה")]
    public bool? IsTaharahPerformed { get; set; }

    [Description("שם הגורם המבצע את שינוע היציאה לקבורה")]
    public string? ExitTransportBy { get; set; }

    [Description("האם יש תכריכי פשתן")]
    public bool HasTachrichim { get; set; }
    
    [Description("האם נקבר בארון")]
    public bool InCoffin { get; set; }
    
    [Description("סיבת הכנסה לארון")]
    public string? CoffinReason { get; set; }

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