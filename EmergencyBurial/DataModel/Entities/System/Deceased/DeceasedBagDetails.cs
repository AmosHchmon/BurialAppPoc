using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities;

public class DeceasedBagDetails
{
    [Required]
    [Key, ForeignKey("Deceased")]
    public Guid DeceasedId { get; set; }

    public Affiliation Affiliation { get; set; }

    public ReceivingStation ReceivingStation { get; set; }

    public string? LastKnownLocation { get; set; }

    public string? PartDescription { get; set; }

    public string? RelatedBagNumbers { get; set; }

    public bool CanBeIdentifiedByAcquaintance { get; set; }

    public string? ReceivingNotes { get; set; }
    
    public string? FillerName { get; set; }
    
    public DateTime? ArrivalDateTime { get; set; }
    
    public BringingEntity? BroughtBy { get; set; }
    
    public string? BroughtFrom { get; set; }
    
    public virtual Deceased Deceased { get; set; }
}