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
                    InitListType();

                    InitListItems();

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
            foreach (OrganizationType type in (OrganizationType[])Enum.GetValues(typeof(OrganizationType)))
            {
                var obj = new ListItem()
                {
                    Key = (int)EntityType.OrganizationType + count++,
                    ListTypeId = (int)EntityType.OrganizationType,
                    Text = type.GetEnumDescription()
                };

                db.ListItems.Add(obj);
            }

           count = 1;
            foreach (StationType type in (StationType[])Enum.GetValues(typeof(StationType)))
            {
                var obj = new ListItem()
                {
                    Key = (int)EntityType.StationType + count++,
                    ListTypeId = (int)EntityType.StationType,
                    Text = type.GetEnumDescription()
                };

                db.ListItems.Add(obj);
            }
            
            count = 1;
            foreach (TarahStations type in (TarahStations[])Enum.GetValues(typeof(TarahStations)))
            {
                var obj = new ListItem()
                {
                    Key = (int)EntityType.TarahStations + count++,
                    ListTypeId = (int)EntityType.TarahStations,
                    Text = type.GetEnumDescription(),
                    ListItemDepId = (int)StationType.TarahStations
                };

                db.ListItems.Add(obj);
            }
            
            count = 1;
            foreach (BurialPreparation type in (BurialPreparation[])Enum.GetValues(typeof(BurialPreparation)))
            {
                var obj = new ListItem()
                {
                    Key = (int)EntityType.BurialPreparation + count++,
                    ListTypeId = (int)EntityType.BurialPreparation,
                    Text = type.GetEnumDescription(),
                    ListItemDepId = (int)StationType.BurialPreparation
                };

                db.ListItems.Add(obj);
            }
            
            count = 1;
            foreach (BurialBody type in (BurialBody[])Enum.GetValues(typeof(BurialBody)))
            {
                var obj = new ListItem()
                {
                    Key = (int)EntityType.BurialBody + count++,
                    ListTypeId = (int)EntityType.BurialBody,
                    Text = type.GetEnumDescription(),
                    ListItemDepId = (int)StationType.BetAlmin
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
        
        var deceased1Id = Guid.NewGuid();
            var deceased1 = new Deceased
            {
                Id = deceased1Id,
                HalalNumber = "C-1001",
                IdentityNumber = "123456789",
                FirstName = "ישראל",
                LastName = "ישראלי",
                FatherName = "אברהם",
                Gender = "זכר",
                HomeCity = "ירושלים",
                PoliceCaseNumber = "PL-789123",
                // יצירת ישויות הבן עם אותו מזהה
                BagDetails = new DeceasedBagDetails
                {
                    DeceasedId = deceased1Id,
                    Affiliation = Affiliation.Civilian,
                    ReceivingStation = TarahStations.Shura,
                    CanBeIdentifiedByAcquaintance = true,
                    RelatedBagNumbers = "C-1003"
                },
                OperationalDetails = new DeceasedOperational
                {
                    DeceasedId = deceased1Id,
                    IdentificationStatus = IdentificationStatus.Identified,
                    BadMessageProcessStatus = "הודעה נמסרה",
                    BadMessageStartDate = DateTime.Now.AddDays(-1)
                },
                BurialDetails = new DeceasedBurial
                {
                    DeceasedId = deceased1Id,
                    BurialType = BurialType.Final,
                    IsCivilBurial = false,
                    TaharahStatus = TaharahStatus.Completed,
                    TaharahLocation = "מכון טהרה גבעת שאול"
                },
                BurialCoordination = new DeceasedBurialCoordination
                {
                    DeceasedId = deceased1Id,
                    BurialCity = "ירושלים",
                    PlannedBurialDate = DateTime.Now.Date,
                    PlannedBurialTime = new TimeSpan(15, 30, 0),
                    IsCoordinatedWithHevratKadisha = true,
                    FamilyContactName = "משה ישראלי",
                    FamilyContactPhone = "050-1234567"
                }
            };

            var deceased2Id = Guid.NewGuid();
            var deceased2 = new Deceased
            {
                Id = deceased2Id,
                HalalNumber = "C-1002",
                IdentityNumber = "987654321",
                FirstName = "יעל",
                LastName = "כהן",
                FatherName = "משה",
                Gender = "נקבה",
                HomeCity = "תל אביב",
                PoliceCaseNumber = "PL-456789",
                BagDetails = new DeceasedBagDetails
                {
                    DeceasedId = deceased2Id,
                    Affiliation = Affiliation.SecurityForces,
                    ReceivingStation = TarahStations.Tziporit,
                    CanBeIdentifiedByAcquaintance = false
                },
                OperationalDetails = new DeceasedOperational
                {
                    DeceasedId = deceased2Id,
                    IdentificationStatus = IdentificationStatus.NotIdentified,
                    BadMessageProcessStatus = "ממתין לזיהוי"
                },
                BurialDetails = new DeceasedBurial
                {
                    DeceasedId = deceased2Id,
                    BurialType = BurialType.Temporary,
                    IsCivilBurial = true,
                    TaharahStatus = TaharahStatus.Pending
                },
                BurialCoordination = new DeceasedBurialCoordination
                {
                    DeceasedId = deceased2Id,
                    IsCoordinatedWithHevratKadisha = false
                }
            };
        

        db.Deceaseds.AddRange(deceased1, deceased2);
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
                FullName = "עוז שורקי",
                UserName = "308015205",
                Mail = "OzS@dat.gov.il",
                MemberTypeId = (int)OrganizationType.Hamal
            }
        };

        db.Members.AddRange(list);

        db.SaveChanges();
    }

    #endregion
}