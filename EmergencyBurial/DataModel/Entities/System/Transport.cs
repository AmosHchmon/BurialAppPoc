using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DataModel.Abstract;
using Core.Helpers;

namespace DataModel.Entities;

public class Transport : BaseUpdatedEntity
{
    [Key] 
    public int Id { get; set; }
    
    [Required]
    public StationType StartLocationType { get; set; }

    public int? StartStationId { get; set; }
    
    public string? StartLocationNameFreeText { get; set; }
    
    [Required] 
    public TransportPurpose Purpose { get; set; }

    [Required] 
    public int? EndStationId { get; set; }

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
    
    public virtual ICollection<DeceasedBag> DeceasedBags { get; set; }
    
    public virtual ICollection<Deceased> Deceaseds { get; set; }
}