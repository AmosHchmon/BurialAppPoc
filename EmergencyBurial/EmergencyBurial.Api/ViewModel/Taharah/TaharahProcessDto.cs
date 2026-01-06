using System;
using System.Collections.Generic;

namespace EmergencyBurial.Api.ViewModel;

public class TaharahProcessDto
{
    public Guid? DeceasedId { get; set; }

    // שדות ReadOnly לתצוגה בדיאלוג
    public string FullName { get; set; }

    public string IdentityNumber { get; set; }

    public string FatherName { get; set; }

    public string Gender { get; set; }
    
    public List<string> BagNumbers { get; set; }

    // שדות לעריכה
    
    public string TaharahTeamManager { get; set; }
    
    public string IntermediateStorage { get; set; }
    
    public bool IsPendingExit { get; set; }
    
    public string PendingExitReason { get; set; }
    
    public bool IsTaharahPerformed { get; set; }
    
    public bool HasTachrichim { get; set; }
    public bool InCoffin { get; set; }
    public string CoffinReason { get; set; }
}