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

                InitTransportTestData();

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
                CreatedOn = DateTime.Now,
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
                CreatedOn = DateTime.Now,
                Notes = "בדיקת קבורה אזרחית."
            }
        };

        db.Deceaseds.AddRange(list);
        db.SaveChanges();
    }

    private void InitTransportTestData()
    {
        if (db.Transports.Any())
        {
            return;
        }
        
        var firstDeceased = db.Deceaseds.FirstOrDefault(d => d.HalalNumber == "C-1001");
        
        if (firstDeceased == null)
        {
            return;
        }
        
        var list = new List<Transport>
        {
            new Transport
            {
                DeceasedId = firstDeceased.Id,
                StartLocation = "בית חולים הדסה עין כרם",
                Purpose = "העברה למכון טהרה",
                Organization = "חברה קדישא קהילת ירושלים",
                Destination = "מכון טהרה גבעת שאול",
                StartDateTime = DateTime.Now.AddHours(-12),
                VehicleType = "אמבולנס",
                LicensePlate = "55-123-88"
            },
            new Transport
            {
                DeceasedId = firstDeceased.Id,
                StartLocation = "מכון טהרה גבעת שאול",
                Purpose = "העברה לקירור זמני",
                Organization = "חברה קדישא קהילת ירושלים",
                Destination = "חדר קירור, הר המנוחות",
                StartDateTime = DateTime.Now.AddHours(-8),
                VehicleType = "רכב שינוע",
                LicensePlate = "24-456-77"
            },
            new Transport
            {
                DeceasedId = firstDeceased.Id,
                StartLocation = "חדר קירור, הר המנוחות",
                Purpose = "העברה לקבורה",
                Organization = "מועצה דתית ירושלים",
                Destination = "הר המנוחות, חלקה ג'",
                StartDateTime = DateTime.Now.AddMinutes(-30),
                VehicleType = "רכב ליווי",
                LicensePlate = "99-888-11"
            }
        };
        
        db.Transports.AddRange(list);
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