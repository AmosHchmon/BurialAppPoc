using System;
using Core.Helpers;

namespace EmergencyBurial.Api.ViewModel;

public class DeceasedTaharahDetailsDto
{
    public Guid DeceasedId { get; set; }

    public BurialPreparation? TaharahLocation { get; set; }

    public DateTime? TaharahReceptionDate { get; set; }

    public string? TaharahReceptionStaff { get; set; }

    public DateTime? TaharahProcessStartDate { get; set; }

    public DateTime? TaharahClosingDate { get; set; }

    public bool? IsTaharahPerformed { get; set; }

    public string? ExitTransportBy { get; set; }

    public bool HasTachrichim { get; set; }

    public bool InCoffin { get; set; }

    public string? CoffinReason { get; set; }
}