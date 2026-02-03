using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModel.Entities.System;

public class TransportHistory
{
    [Key]
    public int Id { get; set; }

    [Required]
    public DateTime CreatedOn { get; set; } = DateTime.Now;
    
    [Required]
    public int TransportId { get; set; }
    
    [Required]
    public Guid DeceasedBagId { get; set; }
    
    [ForeignKey(nameof(TransportId))]
    public virtual Transport Transport { get; set; }
    
    [ForeignKey(nameof(DeceasedBagId))]
    public virtual DeceasedBag DeceasedBag { get; set; }
}