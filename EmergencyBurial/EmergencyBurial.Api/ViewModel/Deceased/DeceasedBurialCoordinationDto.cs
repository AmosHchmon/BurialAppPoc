using System;

namespace EmergencyBurial.Api.ViewModel;

public class DeceasedBurialCoordinationDto
{
    public Guid? DeceasedId { get; set; }

    public string? BurialCity { get; set; }
    
    public DateTime? PlannedBurialTime { get; set; }
    
    public bool? IsCoordinatedWithHevratKadisha { get; set; }
    
    public string? FamilyContactName { get; set; }
    
    public string? FamilyContactPhone { get; set; }
    
    public bool? IsFamilyForumCalled { get; set; }
    
    public string? SocialWorkerName { get; set; }
    
    public string? SocialWorkerPhone { get; set; }
    
    public DateTime? BadMessageDeliveredDateTime { get; set; }
}