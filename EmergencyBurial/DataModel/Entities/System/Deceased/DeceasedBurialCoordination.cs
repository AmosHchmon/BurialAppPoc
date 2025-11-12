using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities;

public class DeceasedBurialCoordination
{
    [Required]
    [Key]
    public Guid DeceasedId { get; set; }

    public string? BurialCity { get; set; }
    
    [Description("האם בוצע תיאום מול חברה קדישא")]
    public bool IsCoordinatedWithHevratKadisha { get; set; }
    
    public string? FamilyContactName { get; set; }
    
    public string? FamilyContactPhone { get; set; }
    
    [Description("האם מוקד הפורום המשפחתי התקשר")]
    public bool IsFamilyForumCalled { get; set; }
    
    public string? SocialWorkerName { get; set; }
    
    public string? SocialWorkerPhone { get; set; }
    
    public string? CoordinationNotes { get; set; }
    
    [Description("זמן קבורה")]
    public DateTime? BurialTime { get; set; }
    
    [Description("תאריך ושעת מסירת ההודעה המרה")]
    public DateTime? BadMessageDeliveredDateTime { get; set; }
    
    [Description("גוף קבורה (בית עלמין)")]
    public BurialBody? BurialBody { get; set; }

    [ForeignKey(nameof(DeceasedId))]
    public virtual Deceased Deceased { get; set; }

}