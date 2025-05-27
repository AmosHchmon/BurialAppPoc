using System.ComponentModel.DataAnnotations;

namespace DataModel.Abstract
{
    public abstract class BaseDescriptionEntity
    {
        [Required]
        public string Text { get; set; }

        public string Description { get; set; }

        public short Order { get; set; }
    }
}
