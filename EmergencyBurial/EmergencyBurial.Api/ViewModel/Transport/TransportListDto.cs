using System;
using Core.Helpers;

namespace EmergencyBurial.Api.ViewModel;

public class TransportListDto
{
    public int Id { get; set; }
    
    public DateTime StartDateTime { get; set; }
    
    public string SourceLocation { get; set; }
    
    public TransportPurpose DestinationLocationType { get; set; }
    
    public string DestinationLocation { get; set; }
    
    public bool IsCompleted { get; set; }
    
    public string BagNumbers { get; set; }
}