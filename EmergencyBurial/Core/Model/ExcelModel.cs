using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Helpers;

namespace Core.Model
{
    #region [Plan]

    public class PlanSubSectionExcel
    {
        [Display]
        [Column("מספר סעיף")]
        public double SectionId { get; set; }
        [Display]
        [Column("תיאור סעיף")]
        public string SectionName { get; set; }
        [Display]
        [Column("תיאור תת סעיף")]
        public string SubsectionName { get; set; }
        [Column("מספר תת סעיף")]
        public double SubsectionId { get; set; }
        [Display]
        [Column("מספר חשבון בממשק")]
        public string SubsectionNumber { get; set; }
        [Column("סכום")]
        public double Value { get; set; }
    }

    #endregion
}
