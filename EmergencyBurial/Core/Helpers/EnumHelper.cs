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
        [Description("סוג משתמש")]
        MemberType = 1000,
    }

    public enum BringingEntity
    {
        [Description("אבו כביר")]
        AbuKabir = 0,
        [Description("א.חולון")]
        Holon = 1,
        [Description("ח'ק ראשל'צ")]
        Rishon = 2,
        [Description("ח'ק ת'א")]
        TelAviv = 3,
        [Description("ח'ק פ'ת")]
        PetahTikva = 4,
    }
    public enum BurialProcessStatus
    {
        [Description("נקבר")]
        Buried = 0,
        [Description("נמצא בחברה הקוברת")]
        AtBurialCompany = 1
    }

    public enum CoffinType
    {
        [Description("כן")]
        Yes = 0,
        [Description("לא")]
        No = 1
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
        [Description("ממתין")]
        Pending = 0,
        [Description("בתהליך")]
        InProgress = 1,
        [Description("הושלם")]
        Completed = 2
    }
    
    public enum BurialType
    {
        [Description("זמני")]
        Temporary = 0,
        [Description("קבוע")]
        Final = 1
    }
    
    // Will be converted to management table
    public enum Affiliation
    {
        [Description("אזרחי")]
        Civilian = 0,
        [Description("כוחות ביטחון")]
        SecurityForces = 1
    }
    
    // Will be converted to management table
    public enum ReceivingStation
    {
        [Description("שורה")]
        Shura = 0,
        [Description("ציפורית")]
        Tziporit = 1,
        [Description("שדה תימן")]
        SdeTeiman = 2
    }

    #endregion

    #region [list item]
    public enum MemberType
    {
        [Description("מנהל מערכת")]
        SystemManager = 1001,

        [Description("צופה")]
        Visitor = 1002,
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
