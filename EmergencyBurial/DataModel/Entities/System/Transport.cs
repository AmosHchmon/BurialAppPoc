using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DataModel.Abstract;
using Core.Helpers;
using DataModel.Entities.System;

namespace DataModel.Entities;

public class Transport : BaseUpdatedEntity
{
    [Key] 
    public int Id { get; set; }
    
    [Required]
    public StationType SourceLocationType { get; set; }

    public int? SourceStationId { get; set; }
    
    public string? StartLocationNameFreeText { get; set; }
    
    [Required] 
    public TransportPurpose DestinationLocationType { get; set; }

    [Required] 
    public int? DestinationStationId { get; set; }

    [Required] 
    public string Organization { get; set; }

    [Required] 
    public string VehicleType { get; set; }

    [Required] 
    public string LicensePlate { get; set; }
    
    public string? DriverFirstName { get; set; }
    
    public string? DriverLastName { get; set; }
    
    public string? DriverIdentityNumber { get; set; }
    
    public string? DriverPhone { get; set; }
    
    public bool IsCompleted { get; set; }
    
    [Required] 
    public DateTime StartDateTime { get; set; }
    
    public DateTime? ArrivalDateTime{ get; set; }
    
    public virtual ICollection<RelDeceasedTransport> RelDeceasedTransports { get; set; } = new List<RelDeceasedTransport>();
}