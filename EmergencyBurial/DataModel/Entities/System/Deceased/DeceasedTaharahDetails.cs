using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities
{
    public class DeceasedTaharahDetails
    {
        [Required]
        [Key]
        public Guid DeceasedId { get; set; }

        public TaharahStatus? TaharahStatus { get; set; }

        public int? TaharahStation { get; set; }

        [Description("תאריך קליטת החלל במכון הטהרה")]
        public DateTime? TaharahReceptionDate { get; set; }

        [Description("תאריך שחרור החלל ממכון טהרה")]
        public DateTime? TaharahReleaseDate { get; set; }
        
        [Description("נקלט על ידי")]
        public Guid? ReceivedBy { get; set; }
        
        [Description("שם מבצע הטהרה/מנהל הצוות")]
        public string? TaharahTeamManager { get; set; }

        [Description("פרטי אחסון ביניים (מכולה)")]
        public string? IntermediateStorage { get; set; }

        [Description("האם ממתין ליציאה")]
        public bool IsPendingExit { get; set; }

        [Description("סיבת המתנה ליציאה")]
        public string? PendingExitReason { get; set; }

        [Description("האם בוצעה טהרה")]
        public bool? IsTaharahPerformed { get; set; }

        [Description("האם יש תכריכי פשתן")]
        public bool HasTachrichim { get; set; }

        [Description("האם נקבר בארון")]
        public bool InCoffin { get; set; }

        [Description("סיבת הכנסה לארון")]
        public string? CoffinReason { get; set; }
        
        [ForeignKey(nameof(ReceivedBy))]
        public virtual Member ReceivedByMember { get; set; }
        
        [ForeignKey(nameof(DeceasedId))]
        public virtual Deceased Deceased { get; set; }
    }
}