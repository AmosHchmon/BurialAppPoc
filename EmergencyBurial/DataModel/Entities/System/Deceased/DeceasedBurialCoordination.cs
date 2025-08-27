using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModel.Entities;

public class DeceasedBurialCoordination
{
    [Required]
    [Key, ForeignKey("Deceased")]
    public Guid DeceasedId { get; set; }

    public string? BurialCity { get; set; }
    
    public DateTime? PlannedBurialDate { get; set; }
    
    public TimeSpan? PlannedBurialTime { get; set; }
    
    public bool IsCoordinatedWithHevratKadisha { get; set; }
    
    public string? FamilyContactName { get; set; }
    
    public string? FamilyContactPhone { get; set; }
    
    public bool IsForumCalled { get; set; }
    
    public string? EstimatedFuneralTime { get; set; }

    public virtual Deceased Deceased { get; set; }

}