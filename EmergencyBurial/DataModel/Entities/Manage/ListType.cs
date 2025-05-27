using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModel.Entities
{
    public class ListType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Required]
        public int? Id { get; set; }

        [Required]
        public string Text { get; set; }

        public bool IsValid { get; set; } = true;

    }
}
