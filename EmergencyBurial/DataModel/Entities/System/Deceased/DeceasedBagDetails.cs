using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities;

public class DeceasedBagDetails
{
    [Required]
    [Key]
    public Guid DeceasedId { get; set; }

    public Affiliation? Affiliation { get; set; }

    public TarahStations ReceivingStation { get; set; }

    public string? LastKnownLocation { get; set; }

    public string? PartDescription { get; set; }

    public int? RelatedBagNumbers { get; set; }

    public bool CanBeIdentifiedByAcquaintance { get; set; }

    public string? ReceivingNotes { get; set; }
    
    public string? FillerName { get; set; }
    
    public DateTime? ArrivalDateTime { get; set; }
    
    public BurialBody? BroughtBy { get; set; }
    
    public string? BroughtFrom { get; set; }
    
    [ForeignKey(nameof(DeceasedId))]
    public virtual Deceased Deceased { get; set; }
}