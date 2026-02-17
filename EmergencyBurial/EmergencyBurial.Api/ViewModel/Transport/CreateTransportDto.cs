using System;
using System.Collections.Generic;
using Core.Helpers;

namespace EmergencyBurial.Api.ViewModel;

public class CreateTransportDto
{
    public DateTime StartDateTime { get; set; }

    public StationType SourceLocationType { get; set; }

    public int? SourceStationId { get; set; }

    public string StartLocationNameFreeText { get; set; }

    public TransportPurpose DestinationLocationType { get; set; }

    public int? DestinationStationId { get; set; }

    public string Organization { get; set; }

    public string VehicleType { get; set; }

    public string LicensePlate { get; set; }

    public string DriverFirstName { get; set; }

    public string DriverLastName { get; set; }

    public string DriverIdentityNumber { get; set; }

    public string DriverPhone { get; set; }

    public List<Guid> DeceasedIds { get; set; } = new();

    public List<string> BagNumbers { get; set; } = new();
}