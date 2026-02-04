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
        [Description("מכון לרפואה משפטית")]
        ForensicInstituteStations = 3000,
        [Description("תר'ח")]
        TarahStations = 4000,
        [Description("הכנה לקבורה")]
        BurialPreparation = 5000,
        [Description("גוף קבורה")]
        BurialBody = 6000
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
        [Description("מכון רפואי")]
        Medical = 1006
    }
    
    public enum StationType
    {
        [Description("תר'ח")]
        TarahStations = 2001,
        [Description("מכון לרפואה משפטית")]
        ForensicInstitute = 2002,
        [Description("הכנה לקבורה")]
        BurialPreparation = 2003,
        [Description("גוף קבורה")]
        BetAlmin = 2004,
    }

    public enum ForensicInstituteStations
    {
        [Description("מכון רפואי")]
        Medical = 3001
    }
    
    public enum TarahStations
    {
        [Description("שורה")]
        Shura = 4001,
        [Description("ציפורית")]
        Tziporit = 4002,
        [Description("שדה תימן")]
        SdeTeiman = 4003
    }

    public enum BurialPreparation
    {
        [Description("תל רגב")]
        TelRegev = 5001,
        [Description("ראשון לציון")]
        RishonLezion = 5002
    }

    public enum BurialBody
    {
        [Description("ראשון לציון")]
        RishonLezion = 6001,
        [Description("עמק חפר")]
        EmekHefer = 6002,
        [Description("אילת")]
        Eilat = 6003,
        [Description("אבו כביר")]
        AbuKabir = 6004,
        [Description("חולון")]
        Holon = 6005,
        [Description("תל אביב")]
        TelAviv = 6006,
        [Description("פתח תקווה")]
        PetahTikva = 6007,
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
        [Description("שדר מהמשטרה")]
        PoliceIntake = 1,
        [Description("קליטה בתר\"ח")]
        ReceptionAtTarah = 2,
        [Description("שחרור תר\"ח")]
        ReleaseFromTarah = 3,
        [Description("שינוע למכון רפואה משפטית")]
        TransportToForensicInstitute = 4,
        [Description("חזרה משינוע מכון רפואה משפטית")]
        ReturnFromForensicInstitute = 5,
        [Description("שינוע להכנה לקבורה")]
        TransportToBurialPreparation = 6,
        [Description("סיום שינוע הכנה לקבורה")]
        EndTransportBurialPreparation = 7,
        [Description("נקלט להכנה לקבורה")]
        ReceivedForBurialPreparation = 8,
        [Description("שוחרר מהכנה לקבורה")]
        ReleasedFromBurialPreparation = 9,
        [Description("שינוע לגוף קבורה")]
        TransportToBurialEntity = 10,
        [Description("סיום שינוע גוף קבורה")]
        EndTransportBurialEntity = 11,
        [Description("קבורה")]
        Burial = 12,
        [Description("ארכיב")]
        Archive = 13
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

    public enum BagTarahProcessStatus
    {
        [Description("קליטה משטרה")]
        PoliceIntake = 0,
        [Description("שינוע - חזרה משינוע מכון רפואה משפטית")]
        Transport = 1,
        [Description("מאוחסן בתר\"ח")]
        InStorage = 2,
        [Description("שוחרר מתר\"ח")]
        Released = 3
    }
    
    public enum TransportPurpose
    {
        [Description("שינוע למכון לרפואה משפטית")]
        ToForensicInstitute = 1,
        
        [Description("שינוע לתר'ח")]
        ToTarah = 2,
        
        [Description("שינוע להכנה לקבורה")]
        ToBurialPreparation = 3,
    
        [Description("שינוע לגוף קבורה")]
        ToBurialBody = 4
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
