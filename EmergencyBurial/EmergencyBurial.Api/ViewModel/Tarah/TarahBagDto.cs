using System;
using System.Collections.Generic;

namespace EmergencyBurial.Api.ViewModel;

public class TarahBagDto
{
    public string BagNumber { get; set; }
    
    public int? CurrentTransportId { get; set; }

    public string PartDescription { get; set; }

    public int BagProcessStatus { get; set; }
    
    public string BagProcessStatusDesc { get; set; }

    public Guid? BurialLicenseFileId { get; set; }

    public List<TarahBagHistoryDto> TransportHistory { get; set; } = new();
}

public class TarahBagHistoryDto
{
    public int TransportId { get; set; }

    public DateTime StartDate { get; set; }

    public string Destination { get; set; }

    public bool IsCompleted { get; set; }
}