using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataModel.Entities;

namespace DataModel.Abstract
{
    public abstract class BaseUpdatedEntity
    {
        [Required]
        [Column(Order = 100)]
        public Guid? UpdateBy { get; set; }

        [ForeignKey(nameof(UpdateBy))]
        public virtual Member UpdateMember { get; set; }

        [ForeignKey(nameof(CreatedBy))]
        public virtual Member CreateMember { get; set; }

        [Column(Order = 101)]
        public DateTime? UpdateOn { get; set; }

        [Required]
        [Column(Order = 102)]
        public DateTime? CreatedOn { get; set; }

        [Required]
        [Column(Order = 103)]
        public Guid? CreatedBy { get; set; }


    }
}