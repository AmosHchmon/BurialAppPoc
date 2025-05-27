using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModel.Entities
{
    public class ListItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Required]
        public int Key { get; set; }

        [Required]
        [MaxLength(10)]
        public int? ListTypeId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Text { get; set; }

        [MaxLength(250)]
        public string Description { get; set; }

        [MaxLength(250)]
        public string value { get; set; }

        public short Order { get; set; }

        [ForeignKey(nameof(ListTypeId))]
        public virtual ListType ListType { get; set; }

    }
}
