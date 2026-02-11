using System;
using System.Collections.Generic;
using Core.Helpers;

namespace EmergencyBurial.Api.ViewModel;

public class UpdateTransportDto
{
    public int Id { get; set; }

    public DateTime StartDateTime { get; set; }

    public StationType StartLocationType { get; set; }

    public int? StartStationId { get; set; }

    public string StartLocationNameFreeText { get; set; }

    public TransportPurpose Purpose { get; set; }

    public int? EndStationId { get; set; }

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