using System;
using System.Collections.Generic;
using Core.Helpers;

namespace EmergencyBurial.Api.ViewModel;

public class CreateTransportDto
{
    public List<string> BagNumbers { get; set; } = new();
    
    public OrganizationType StartLocationType { get; set; }
    
    public int? StartStationId { get; set; }
    
    public TransportPurpose Purpose { get; set; }
    
    public string Destination { get; set; }
    
    public string Organization { get; set; }
    
    public string VehicleType { get; set; }
    
    public string LicensePlate { get; set; }
    
    public string DriverDetails { get; set; }
    
    public DateTime StartDateTime { get; set; }
}