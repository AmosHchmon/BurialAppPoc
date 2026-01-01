using System;

namespace EmergencyBurial.Api.ViewModel;

public class TaharahProcessDto
{
    public Guid DeceasedId { get; set; }

    // שדות ReadOnly לתצוגה בדיאלוג
    public string FullName { get; set; }

    public string IdentityNumber { get; set; }

    public string FatherName { get; set; }

    public string Gender { get; set; }

    // שדות לעריכה
    public int? TaharahLocation { get; set; }

    public DateTime? TaharahProcessStartDate { get; set; }

    public DateTime? TaharahClosingDate { get; set; }

    public string ExitTransportBy { get; set; }
    public bool IsTaharahPerformed { get; set; }
    public bool HasTachrichim { get; set; }
    public bool InCoffin { get; set; }
    public string CoffinReason { get; set; }
}