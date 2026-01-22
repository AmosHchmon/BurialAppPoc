using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using Core.Model;

namespace Core.Helpers
{
    public static class EnumHelper
    {
        public static string GetEnumDescription(this Enum e)
        {

            if (e == null)
                return string.Empty;
            
            FieldInfo fieldInfo = e.GetType().GetField(e.ToString());
            DescriptionAttribute[] enumAttributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);

            if (enumAttributes.Length > 0)
            {
                return enumAttributes[0].Description;
            }

            return e.ToString();

        }

        public static List<OptionItem> EnumNamedValues<T>() where T : Enum
        {
            var list = new List<OptionItem>();
            var values = (T[])Enum.GetValues(typeof(T));


            foreach (T item in values)
            {
                var obj = new OptionItem()
                {
                    Value = Convert.ToInt32(item),
                    Text = item.GetEnumDescription()
                };

                list.Add(obj);
            }

            return list;
        }

    }

    #region [data model]
    public enum EntityType
    {
        [Description("סוג ארגון")]
        OrganizationType = 1000,
        [Description("סוג תחנה")]
        StationType = 2000,
        [Description("תר'ח")]
        TarahStations = 3000,
        [Description("הכנה לקבורה")]
        BurialPreparation = 4000,
        [Description("גוף קבורה")]
        BurialBody = 5000
    }

    #endregion

    #region [list item]
    
    public enum OrganizationType
    {
        [Description("משרד שירותי הדת")] 
        DatServices = 1001, 
        [Description("חמ'ל")]
        Hamal = 1002,
        [Description("תר'ח")]
        Tarah = 1003,
        [Description("הכנה לקבורה")]
        BurialPreparation = 1004,
        [Description("גוף קבורה")]
        BetAlmin = 1005,
    }
    
    public enum StationType
    {
        [Description("תר'ח")]
        TarahStations = 2001,
        [Description("הכנה לקבורה")]
        BurialPreparation = 2002,
        [Description("גוף קבורה")]
        BetAlmin = 2003,
    }
    
    public enum TarahStations
    {
        [Description("שורה")]
        Shura = 3001,
        [Description("ציפורית")]
        Tziporit = 3002,
        [Description("שדה תימן")]
        SdeTeiman = 3003
    }

    public enum BurialPreparation
    {
        [Description("תל רגב")]
        TelRegev = 4001,
        [Description("ראשון לציון")]
        RishonLezion = 4002
    }

    public enum BurialBody
    {
        [Description("ראשון לציון")]
        RishonLezion = 5001,
        [Description("עמק חפר")]
        EmekHefer = 5002,
        [Description("אילת")]
        Eilat = 5003,
        [Description("אבו כביר")]
        AbuKabir = 5004,
        [Description("חולון")]
        Holon = 5005,
        [Description("תל אביב")]
        TelAviv = 5006,
        [Description("פתח תקווה")]
        PetahTikva = 5007,
    }

    #endregion

    #region [events && status && type]

    public enum Status
    {
        [Description("טיוטה")]
        Draft = 100,
        [Description("הוגש")]
        Submit,
        [Description("נמחק")]
        Deleted,
    }
    
    public enum BurialStatus
    {
        [Description("נקבר")]
        Buried = 0,
        [Description("נמצא בחברה הקוברת")]
        AtBurialCompany = 1
    }

    public enum IdentificationStatus
    {
        [Description("לא זוהה")]
        NotIdentified = 0,
        [Description("זוהה")]
        Identified = 1
    }
    
    public enum TaharahStatus
    {
        [Description("ממתין לקבלה")]
        Pending = 0,
        [Description("בתהליך טהרה")]
        InProgress = 1,
        [Description("שוחרר מטהרה")]
        Completed = 2
    }

    public enum TarahStatus
    {
        [Description("ממתין לקבלה")]
        Pending = 0,
        [Description("בתהליך תר'ח")]
        InProgress = 1,
        [Description("שוחרר מתר'ח")]
        Completed = 2
    }

    public enum BadMessageProcessStatus
    {
        [Description("הודעה לא נמסרה")]
        NotDelivered = 0,
        [Description("הודעה נמסרה")]
        Delivered = 1
    }
    
    public enum CollectionStatus
    {
        [Description("לא נאסף")]
        NotCollected = 0,
        [Description("נאסף")]
        Collected = 1
    }
    
    public enum BurialType
    {
        [Description("זמני")]
        Temporary = 0,
        [Description("קבוע")]
        Final = 1
    }
    
    public enum Affiliation
    {
        [Description("אזרחי")]
        Civilian = 0,
        [Description("כוחות ביטחון")]
        SecurityForces = 1
    }
    
    public enum RoleAccessType
    {
        [Description("מנהל")]
        Admin = 1,
        [Description("עורך")]
        Edit = 2,
        [Description("צופה")]
        View = 3
    }

    public enum ProcessStatus 
    {
        [Description("קליטה בתר\"ח")]
        ReceptionAtTarah = 1,
        [Description("שחרור תר\"ח")]
        ReleaseFromTarah = 2,
        [Description("שינוע למכון רפואה משפטית")]
        TransportToForensicInstitute = 3,
        [Description("חזרה משינוע מכון רפואה משפטית")]
        ReturnFromForensicInstitute = 4,
        [Description("שינוע להכנה לקבורה")]
        TransportToBurialPreparation = 5,
        [Description("סיום שינוע הכנה לקבורה")]
        EndTransportBurialPreparation = 6,
        [Description("נקלט להכנה לקבורה")]
        ReceivedForBurialPreparation = 7,
        [Description("שוחרר מהכנה לקבורה")]
        ReleasedFromBurialPreparation = 8,
        [Description("שינוע לגוף קבורה")]
        TransportToBurialEntity = 9,
        [Description("סיום שינוע גוף קבורה")]
        EndTransportBurialEntity = 10,
        [Description("קבורה")]
        Burial = 11,
        [Description("ארכיב")]
        Archive = 12
    }

    public enum GatewaySource
    {
        [Description("משטרה - פלא")]
        Police = 1,
        [Description("פיקוד העורף - אומץ")]
        IDF = 2,
        [Description("רווחה")]
        Welfare = 3,
        [Description("בריאות")]
        Health = 4
    }

    #endregion

    #region [communication]

    public enum MailType
    {
        UserSend,
        UserFix,
        SupplierApprove,
        SupplierReject,
        SupplierCancel,
    }

    #endregion

}
