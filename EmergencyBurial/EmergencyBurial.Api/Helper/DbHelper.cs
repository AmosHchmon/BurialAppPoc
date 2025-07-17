using System;
using System.Collections.Generic;
using Core.Helpers;
using DataModel;
using DataModel.Entities;
using Microsoft.AspNetCore.Hosting;
using System.Linq;

namespace EmergencyBurial.Api.Helper;

public class DbHelper
{
    private readonly EmergencyBurialContext db;
    private readonly IWebHostEnvironment env;

    public DbHelper(EmergencyBurialContext db)
        {
            this.db = db;
        }

        public void InitDB()
        {
            using (var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    //InitListType();

                    //InitListItems();

                    InitMembers();

                InitDeceasedTestData();

                //InitFormsMenu();

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }


        #region [private methods]

        private void InitListType()
        {
            foreach (EntityType type in (EntityType[])Enum.GetValues(typeof(EntityType)))
            {
                var obj = new ListType()
                {
                    Id = (int)type,
                    Text = type.GetEnumDescription()
                };

                db.ListTypes.Add(obj);
            }

            db.SaveChanges();
        }

        private void InitListItems()
        {
            var count = 1;
            foreach (MemberType type in (MemberType[])Enum.GetValues(typeof(MemberType)))
            {
                var obj = new ListItem()
                {
                    Key = (int)EntityType.MemberType + count++,
                    ListTypeId = (int)EntityType.MemberType,
                    Text = type.GetEnumDescription()
                };

                db.ListItems.Add(obj);
            }

        db.SaveChanges();
    }
    
    private void InitDeceasedTestData()
    {
        // Check if there is already data to prevent duplicates on multiple runs
        if (db.Deceaseds.Any())
        {
            return;
        }

        var list = new List<Deceased>
        {
            new Deceased
            {
                HalalNumber = "C-1001",
                IdentityNumber = "123456789",
                FirstName = "ישראל",
                LastName = "ישראלי",
                FatherName = "אברהם",
                Gender = "זכר",
                Nationality = "ישראלי",
                HomeCity = "ירושלים",
                CurrentStatusId = 1, // Example Status ID
                CurrentLocationId = 1, // Example Location ID
                IsLinkedToOtherCases = false,
                IsCivilBurial = false,
                Notes = "נפטר ראשון במערכת לצורכי בדיקה."
            },
            new Deceased
            {
                HalalNumber = "C-1002",
                IdentityNumber = "987654321",
                FirstName = "יעל",
                LastName = "כהן",
                FatherName = "משה",
                Gender = "נקבה",
                Nationality = "ישראלי",
                HomeCity = "תל אביב",
                CurrentStatusId = 2, // Example Status ID
                CurrentLocationId = 1, // Example Location ID
                IsLinkedToOtherCases = false,
                IsCivilBurial = true,
                Notes = "בדיקת קבורה אזרחית."
            }
        };

        db.Deceaseds.AddRange(list);
        db.SaveChanges();
    }

    private void InitMembers()
    {
        var list = new List<Member>
        {
            new Member
            {
                FullName = "עוז שורקי", UserName = "308015205", Mail = "OzS@dat.gov.il",
            }
        };

        db.Members.AddRange(list);

        db.SaveChanges();
    }

    #endregion
}