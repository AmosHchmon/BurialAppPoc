using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModel.Entities;

public class DeceasedBurialCoordination
{
    [Required]
    [Key]
    public Guid DeceasedId { get; set; }

    public string? BurialCity { get; set; }
    
    public DateTime? PlannedBurialTime { get; set; }
    
    public bool IsCoordinatedWithHevratKadisha { get; set; }
    
    public string? FamilyContactName { get; set; }
    
    public string? FamilyContactPhone { get; set; }
    
    public bool IsFamilyForumCalled { get; set; }
    
    public string? SocialWorkerName { get; set; }
    
    public string? SocialWorkerPhone { get; set; }
    
    public DateTime? BadMessageDeliveredDateTime { get; set; }

    [ForeignKey(nameof(DeceasedId))]
    public virtual Deceased Deceased { get; set; }

}