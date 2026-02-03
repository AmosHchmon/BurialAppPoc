using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataModel.Abstract;
using Core.Helpers;

namespace DataModel.Entities;

public class Transport : BaseUpdatedEntity
{
    [Key] 
    public int Id { get; set; }
    
    [Required]
    public OrganizationType StartLocationType { get; set; }

    public int? StartStationId { get; set; }
    
    public string? StartLocationNameFreeText { get; set; }
    
    [Required] 
    public TransportPurpose Purpose { get; set; }

    [Required] 
    public string Destination { get; set; }

    [Required] 
    public string Organization { get; set; }

    [Required] 
    public string VehicleType { get; set; }

    [Required] 
    public string LicensePlate { get; set; }

    public string? DriverDetails { get; set; }
    
    public bool IsCompleted { get; set; }
    
    [Required] 
    public DateTime StartDateTime { get; set; }
    
    public DateTime? ArrivalDateTime{ get; set; }
    
    public virtual ICollection<DeceasedBag> DeceasedBags { get; set; }
}