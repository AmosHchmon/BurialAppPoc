using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;
using DataModel.Abstract;

namespace DataModel.Entities;

public class Deceased: BaseUpdatedEntity
{
    [Key]
    public Guid Id { get; set; }

    public string? IdentityNumber { get; set; }
    
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? FatherName { get; set; }
    
    public string? Gender { get; set; }
    
    public string? Nationality { get; set; }
    
    public string? HomeCity { get; set; }
    
    public string? PeleNumber { get; set; }
    
    public string? HomeAddress { get; set; }
    
    public string? Notes { get; set; }
    
    public ProcessStatus ProcessStatus { get; set; }
    
    public Guid EventId { get; set; }
    
    [ForeignKey(nameof(EventId))]
    public virtual Event Event { get; set; }
    
    public virtual ICollection<DeceasedStatusHistory> StatusHistory { get; set; }

    public virtual ICollection<DeceasedBag> DeceasedBags { get; set; }
    
    public virtual DeceasedBurialProcessStatus DeceasedBurialProcessStatus { get; set; }
    
    public virtual DeceasedBurialDetails DeceasedBurialDetails { get; set; }
    
    public virtual DeceasedTaharahDetails DeceasedTaharahDetails { get; set; }
    
    public virtual DeceasedBurialCoordination DeceasedBurialCoordination { get; set; }
}