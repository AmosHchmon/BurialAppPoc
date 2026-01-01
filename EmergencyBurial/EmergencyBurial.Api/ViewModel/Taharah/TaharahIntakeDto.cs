using System;

namespace EmergencyBurial.Api.ViewModel;

public class TaharahIntakeDto
{
    public Guid DeceasedId { get; set; }

    public string TaharahReceptionStaff { get; set; }

    public DateTime? TaharahReceptionDate { get; set; }
}