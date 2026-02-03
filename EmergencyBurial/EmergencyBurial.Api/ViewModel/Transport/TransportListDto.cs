using System;
using System.Collections.Generic;

namespace EmergencyBurial.Api.ViewModel;

public class TransportListDto
{
    public int Id { get; set; }
    
    public DateTime StartDateTime { get; set; }
    
    public DateTime? ArrivalDateTime { get; set; }
    
    public string StartLocation { get; set; }
    
    public string PurposeDesc { get; set; }
    
    public bool IsCompleted { get; set; }
    
    public List<string> BagNumbers { get; set; }
    
    public int TotalBags { get; set; }
}