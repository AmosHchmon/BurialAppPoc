using System;
using System.Collections.Generic;

namespace EmergencyBurial.Api.ViewModel;

public class TarahListDto
{
    public Guid? Id { get; set; }

    public string IdentityNumber { get; set; }

    public string FullName { get; set; }

    public string FatherName { get; set; }

    public string ProcessStatusDesc { get; set; }

    public string BagNumbersDisplay { get; set; }

    public int RelatedBagNumbers { get; set; }

    public int? TarahStatus { get; set; }

    public string TarahStatusDesc { get; set; }

    public List<TarahBagHistoryDto> Bags { get; set; } = new();
}

public class TarahBagHistoryDto
{
    public int? CurrentTransportId { get; set; }
    
    public string BagNumber { get; set; }

    public List<TransportHistoryDto> Transports { get; set; } = new();
}

public class TransportHistoryDto
{
    public int TransportId { get; set; }

    public DateTime StartDate { get; set; }

    public string Destination { get; set; }

    public bool IsCompleted { get; set; }
}