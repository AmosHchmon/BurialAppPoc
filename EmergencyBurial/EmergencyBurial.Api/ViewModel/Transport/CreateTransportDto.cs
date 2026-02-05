using System;
using System.Collections.Generic;
using Core.Helpers;

namespace EmergencyBurial.Api.ViewModel;

public class CreateTransportDto
{
    public List<string> BagNumbers { get; set; } = new();
    
    public DateTime StartDateTime { get; set; }

    public OrganizationType StartLocationType { get; set; }
    
    public int? StartStationId { get; set; }

    public string StartLocationNameFreeText { get; set; }
    
    public TransportPurpose Purpose { get; set; }
    
    public TransportPurpose Destination { get; set; }
    
    public string Organization { get; set; }
    
    public string VehicleType { get; set; }
    
    public string LicensePlate { get; set; }
    
    public string DriverFirstName { get; set; }
    
    public string DriverLastName { get; set; }
    
    public string DriverIdentityNumber { get; set; }
    
    public string DriverPhone { get; set; }
}