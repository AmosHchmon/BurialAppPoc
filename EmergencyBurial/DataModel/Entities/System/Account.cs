using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DataModel.Entities
{
    public class Account
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public Guid? Id { get; set; }

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
        public string PhoneNumber { get; set; }

        /*[MaxLength(6)]
        public string OtpNumber { get; set; }

        public DateTime? OtpExpired { get; set; }

        public bool IsActive { get; set; }

        [Required]
        public int? MemberTypeId { get; set; }

        [Required]
        public int? CouncilId { get; set; }

        [ForeignKey(nameof(MemberTypeId))]
        public virtual ListItem MemberType { get; set; }*/
    }
}