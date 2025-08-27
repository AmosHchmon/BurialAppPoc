using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataModel.Entities;

public class Deceased
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string HalalNumber { get; set; }

    public string? IdentityNumber { get; set; }
    
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? FatherName { get; set; }
    
    public string? Gender { get; set; }
    
    public string? Nationality { get; set; }
    
    public string? HomeCity { get; set; }
    
    public string? PoliceCaseNumber { get; set; }
    
    public string? HomeAddress { get; set; }
    
    public string? Notes { get; set; }
    
    public DateTime? CreatedOn { get; set; }

    public virtual DeceasedBagDetails BagDetails { get; set; }
    
    public virtual DeceasedOperational OperationalDetails { get; set; }
    
    public virtual DeceasedBurial BurialDetails { get; set; }
    
    public virtual DeceasedBurialCoordination BurialCoordination { get; set; }
    
    public virtual IEnumerable<Transport> Transports { get; set; }
}