using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModel.Entities;

    public class Member
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public Guid Id { get; set; }

        [MaxLength(50)]
        [Required]
        public string UserName { get; set; }

        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }

        [Required]
        [MaxLength(50)]
        public string Mail { get; set; }

        [MaxLength(10)]
        public string? PhoneNumber { get; set; }
        
        [Required]
        public int? OrganizationTypeId { get; set; }

        [Required]
        public int? RoleTypeId { get; set; }

        public int? StationTypeId { get; set; }
        
        public int? StationId { get; set; }

        [MaxLength(6)]
        public string? OtpNumber { get; set; }

        public DateTime? OtpExpired { get; set; }

        public bool IsActive { get; set; }

        [ForeignKey(nameof(OrganizationTypeId))]
        public virtual ListItem OrganizationType { get; set; }
        
        [ForeignKey(nameof(StationTypeId))]
        public virtual ListItem StationType { get; set; }
        
        [ForeignKey(nameof(StationId))]
        public virtual ListItem Station { get; set; }
    }
