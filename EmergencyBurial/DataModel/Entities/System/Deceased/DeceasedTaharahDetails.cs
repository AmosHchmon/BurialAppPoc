using System.ComponentModel;
using DataModel.Abstract;

namespace DataModel.Entities
{
    public class DeceasedTaharahDetails: BaseStationDetails
    {
        [Description("האם בוצעה טהרה")]
        public bool? IsTaharahPerformed { get; set; }

        [Description("האם יש תכריכי פשתן")]
        public bool HasTachrichim { get; set; }

        [Description("האם נקבר בארון")]
        public bool InCoffin { get; set; }

        [Description("סיבת הכנסה לארון")]
        public string? CoffinReason { get; set; }
    }
}