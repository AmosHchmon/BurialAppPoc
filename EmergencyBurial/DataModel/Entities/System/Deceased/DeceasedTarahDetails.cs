using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities
{
    public class DeceasedTarahDetails
    {
        [Required]
        [Key]
        public Guid DeceasedId { get; set; }

        public TarahStatus? TarahStatus { get; set; }

        public int? TarahStation { get; set; }

        [Description("תאריך קליטת החלל בתר\"ח")]
        public DateTime? TarahReceptionDate { get; set; }

        [Description("תאריך שחרור החלל מתר\"ח")]
        public DateTime? TarahReleaseDate { get; set; }
        
        [Description("נקלט על ידי")]
        public Guid? ReceivedBy { get; set; }
        
        [Description("שם מנהל הצוות בתר\"ח")]
        public string? TarahTeamManager { get; set; }

        [Description("פרטי אחסון ביניים")]
        public string? IntermediateStorage { get; set; }

        [Description("האם ממתין ליציאה")]
        public bool IsPendingExit { get; set; }

        [Description("סיבת המתנה ליציאה")]
        public string? PendingExitReason { get; set; }

        [ForeignKey(nameof(ReceivedBy))]
        public virtual Member ReceivedByMember { get; set; }
        
        [ForeignKey(nameof(DeceasedId))]
        public virtual Deceased Deceased { get; set; }
    }
}
