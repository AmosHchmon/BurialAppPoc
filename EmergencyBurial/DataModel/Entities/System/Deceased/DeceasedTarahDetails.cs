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

        public int? TarahStation { get; set; }
        
        [Description("שם מנהל הצוות בתר\"ח")]
        public string? TarahTeamManager { get; set; }

        [Description("פרטי אחסון ביניים")]
        public string? IntermediateStorage { get; set; }

        [Description("האם ממתין ליציאה")]
        public bool IsPendingExit { get; set; }

        [Description("סיבת המתנה ליציאה")]
        public string? PendingExitReason { get; set; }
        
        [ForeignKey(nameof(DeceasedId))]
        public virtual Deceased Deceased { get; set; }
    }
}
