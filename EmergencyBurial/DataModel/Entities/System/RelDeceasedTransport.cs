using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities.System;

public class RelDeceasedTransport
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int TransportId { get; set; }

    [Required]
    public Guid DeceasedId { get; set; }
    
    public Guid DeceasedBagId { get; set; }

    [Required]
    public TransportPurpose TransportPurpose { get; set; }

    [ForeignKey(nameof(TransportId))]
    public virtual Transport Transport { get; set; }

    [ForeignKey(nameof(DeceasedId))]
    public virtual Deceased Deceased { get; set; }

    [ForeignKey(nameof(DeceasedBagId))]
    public virtual DeceasedBag DeceasedBag { get; set; }
}