using System;
using System.ComponentModel.DataAnnotations;

namespace DataModel.Entities
{
    public class AppFile
    {
        [Key]
        [Required]
        public Guid? Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(100)]
        public string FileName { get; set; }
    }


}
