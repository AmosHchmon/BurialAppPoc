using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModel.Entities
{
    public class Transport
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid DeceasedId { get; set; }

        [Required]
        public string StartLocation { get; set; }

        [Required]
        public string Purpose { get; set; }

        [Required]
        public string Organization { get; set; }

        [Required]
        public string Destination { get; set; }

        [Required]
        public DateTime StartDateTime { get; set; }

        [Required]
        public string VehicleType { get; set; }

        [Required]
        public string LicensePlate { get; set; }
        
        public string? DriverDetails { get; set; }
        
        public DateTime? ExitDateTime { get; set; }
        
        [ForeignKey(nameof(DeceasedId))]
        public virtual Deceased Deceased { get; set; }
    }
}