namespace EmergencyBurial.Api.ViewModel;

public class UpdateTransportDetailsDto
{
    public int TransportId { get; set; }
    
    public string DriverDetails { get; set; }
    
    public string VehicleType { get; set; }
    
    public string LicensePlate { get; set; }
    
    public string Organization { get; set; }
}