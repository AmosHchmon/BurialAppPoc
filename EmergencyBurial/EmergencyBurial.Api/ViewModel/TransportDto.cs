using System;

namespace EmergencyBurial.Api.ViewModel;

public class TransportDto
{
    public int? Id { get; set; }
    
    public int? DeceasedId { get; set; }
    
    public string StartLocation { get; set; }
    
    public string Purpose { get; set; }

    public string Organization { get; set; }

    public string Destination { get; set; }

    public DateTime? StartDateTime { get; set; }

    public string VehicleType { get; set; }

    public string LicensePlate { get; set; }
    
    public string HalalNumber { get; set; }
    
    public string FirstName { get; set; }
}