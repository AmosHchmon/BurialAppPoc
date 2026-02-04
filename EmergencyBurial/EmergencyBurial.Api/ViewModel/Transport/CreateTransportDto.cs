using System;
using System.Collections.Generic;
using Core.Helpers;

namespace EmergencyBurial.Api.ViewModel;

public class CreateTransportDto
{
    // שקים
    public List<string> BagNumbers { get; set; } = new();

    // זמן התחלה
    public DateTime StartDateTime { get; set; }

    // מיקום התחלה (Cascading)
    public OrganizationType StartLocationType { get; set; }
    public int? StartStationId { get; set; } // המזהה של התחנה שנבחרה
    public string StartLocationNameFreeText { get; set; } // למקרה שזה לא מתוך רשימה

    // פרטי שינוע
    public TransportPurpose Purpose { get; set; }
    public TransportPurpose Destination { get; set; }
    public string Organization { get; set; }

    // רכב
    public string VehicleType { get; set; }
    public string LicensePlate { get; set; }

    // נהג - מפוצל
    public string DriverFirstName { get; set; }
    public string DriverLastName { get; set; }
    public string DriverIdentityNumber { get; set; }
    public string DriverPhone { get; set; }
}