using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace DataModel.Entities
{
    public class DeceasedStatusHistory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid DeceasedId { get; set; }

        [Required]
        public ProcessStatus Status { get; set; }

        public DateTime CreatedOn { get; set; }

        // TODO: Change to Guid later
        public string CreatedBy { get; set; } 
        
        [ForeignKey(nameof(DeceasedId))]
        public virtual Deceased Deceased { get; set; }
    }
}