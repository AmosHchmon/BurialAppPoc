using System;
using System.Collections.Generic;
using Core.Helpers;
using DataModel;
using DataModel.Entities;
using Microsoft.AspNetCore.Hosting;
using System.Linq;
using Microsoft.AspNetCore.Identity;

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

                var exerciseEventId = InitEvents();

                InitMembers();

                InitDeceasedTestData(exerciseEventId);

                InitTransportTestData();

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
        foreach (TarahStations type in (TarahStations[])Enum.GetValues(typeof(TarahStations)))
        {
            var obj = new ListItem()
            {
                Key = (int)EntityType.TarahStations + count++,
                ListTypeId = (int)EntityType.TarahStations,
                Text = type.GetEnumDescription(),
                ListItemDepId = (int)OrganizationType.Tarah
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
                ListItemDepId = (int)OrganizationType.BurialPreparation
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
                ListItemDepId = (int)OrganizationType.BetAlmin
            };

            db.ListItems.Add(obj);
        }

        db.SaveChanges();
    }

    private void InitDeceasedTestData(Guid eventId)
    {
        if (db.Deceaseds.Any())
        {
            return;
        }

        var deceased1Id = Guid.NewGuid();

        var deceased1 = new Deceased
        {
            Id = deceased1Id,
            IdentityNumber = "2222222",
            FirstName = "טאיפ",
            LastName = "ארדואן",
            FatherName = "זבל גדול",
            Nationality = "כלב",
            Gender = "זכר",
            HomeCity = "גיהנום",
            PeleNumber = "PL-789123",
            Affiliation = Affiliation.Civilian,
            ProcessStatus = ProcessStatus.EndTransportBurialPreparation,
            EventId = eventId,

            DeceasedBags = new List<DeceasedBag>
            {
                new DeceasedBag
                {
                    Id = Guid.NewGuid(),
                    DeceasedId = deceased1Id,
                    BagNumber = "C-1001",
                    ReceivingStation = TarahStations.Shura,
                    BroughtBy = BurialBody.AbuKabir,
                    CanBeIdentifiedByAcquaintance = true,
                    RelatedBagNumbers = 5,
                    ArrivalDateTime = DateTime.Now.AddDays(-2),
                    PartDescription = "חלק גוף תחתון",
                    BagTarahProcessStatus = BagTarahProcessStatus.Released
                },
                new DeceasedBag
                {
                    Id = Guid.NewGuid(),
                    DeceasedId = deceased1Id,
                    BagNumber = "C-1001-B",
                    BroughtBy = BurialBody.AbuKabir,
                    PartDescription = "חלק גוף עליון",
                    ReceivingStation = TarahStations.Shura,
                    ArrivalDateTime = DateTime.Now.AddDays(-2).AddHours(2),
                    BagTarahProcessStatus = BagTarahProcessStatus.Released
                },
                new DeceasedBag
                {
                    Id = Guid.NewGuid(),
                    DeceasedId = deceased1Id,
                    BagNumber = "C-1001-C",
                    BroughtBy = BurialBody.AbuKabir,
                    PartDescription = "ראש",
                    ReceivingStation = TarahStations.Shura,
                    ArrivalDateTime = DateTime.Now.AddDays(-2).AddHours(2),
                    BagTarahProcessStatus = BagTarahProcessStatus.Released
                }
            },

            StatusHistory = new List<DeceasedStatusHistory>
            {
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased1Id,
                    OldStatus = ProcessStatus.ReceptionAtTarah,
                    CurrentStatus = ProcessStatus.ReleaseFromTarah,
                    CreatedOn = DateTime.Now.AddDays(-7),
                    CreatedBy = deceased1Id
                },
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased1Id,
                    OldStatus = ProcessStatus.ReleaseFromTarah,
                    CurrentStatus = ProcessStatus.TransportToBurialPreparation,
                    CreatedOn = DateTime.Now.AddDays(-6),
                    CreatedBy = deceased1Id
                },
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased1Id,
                    CurrentStatus = ProcessStatus.EndTransportBurialPreparation,
                    OldStatus = ProcessStatus.ReceivedForBurialPreparation,
                    CreatedOn = DateTime.Now.AddHours(-6),
                    CreatedBy = deceased1Id
                }
            },
            DeceasedBurialProcessStatus = new DeceasedBurialProcessStatus
            {
                DeceasedId = deceased1Id,
                IdentificationStatus = IdentificationStatus.Identified,
                IsReleasedFromTarah = true,
                IsBuried = false
            },
            DeceasedBurialDetails = new DeceasedBurialDetails
            {
                DeceasedId = deceased1Id,
                BurialType = BurialType.Final,
                IsCivilBurial = false,
            },
            DeceasedTaharahDetails = new DeceasedTaharahDetails
            {
                DeceasedId = deceased1Id,
                TaharahStation = (int)BurialPreparation.RishonLezion,
                TaharahStatus = TaharahStatus.Pending,
                IsTaharahPerformed = false
            },
            DeceasedBurialCoordination = new DeceasedBurialCoordination
            {
                DeceasedId = deceased1Id,
                BurialCity = "ירושלים",
                IsCoordinatedWithHevratKadisha = false,
                FamilyContactName = "משה ישראלי",
                FamilyContactPhone = "050-1234567"
            }
        };

        var deceased2Id = Guid.NewGuid();

        var deceased2 = new Deceased
        {
            Id = deceased2Id,
            IdentityNumber = "1111111",
            FirstName = "דואה",
            LastName = "ליפה",
            Nationality = "כלבה",
            FatherName = "טינופת",
            Gender = "נקבה",
            HomeCity = "בית לחם",
            ProcessStatus = ProcessStatus.EndTransportBurialPreparation,
            EventId = eventId,

            DeceasedBags = new List<DeceasedBag>
            {
                new DeceasedBag
                {
                    Id = Guid.NewGuid(),
                    DeceasedId = deceased2Id,
                    BagNumber = "C-1002",
                    ReceivingStation = TarahStations.Tziporit,
                    BroughtBy = BurialBody.AbuKabir,
                    ArrivalDateTime = DateTime.Now.AddDays(-1),
                    PartDescription = "ראש",
                    BagTarahProcessStatus = BagTarahProcessStatus.Released
                },
                new DeceasedBag
                {
                    Id = Guid.NewGuid(),
                    DeceasedId = deceased2Id,
                    BagNumber = "C-1002-B",
                    ReceivingStation = TarahStations.Tziporit,
                    BroughtBy = BurialBody.AbuKabir,
                    PartDescription = "חלק גוף עליון",
                    ArrivalDateTime = DateTime.Now.AddDays(-1),
                    BagTarahProcessStatus = BagTarahProcessStatus.Released
                }
            },
            StatusHistory = new List<DeceasedStatusHistory>
            {
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased2Id,
                    CurrentStatus = ProcessStatus.ReceptionAtTarah,
                    CreatedOn = DateTime.Now.AddDays(-5),
                    CreatedBy = deceased2Id
                },
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased2Id,
                    OldStatus = ProcessStatus.ReceptionAtTarah,
                    CurrentStatus = ProcessStatus.ReleaseFromTarah,
                    CreatedOn = DateTime.Now.AddDays(-4),
                    CreatedBy = deceased2Id
                },
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased2Id,
                    CurrentStatus = ProcessStatus.TransportToBurialPreparation,
                    OldStatus = ProcessStatus.ReceivedForBurialPreparation,
                    CreatedOn = DateTime.Now.AddDays(-3),
                    CreatedBy = deceased2Id
                },
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased2Id,
                    CurrentStatus = ProcessStatus.EndTransportBurialPreparation,
                    OldStatus = ProcessStatus.TransportToBurialPreparation,
                    CreatedOn = DateTime.Now.AddDays(-3),
                    CreatedBy = deceased2Id
                }
            },
            DeceasedBurialProcessStatus = new DeceasedBurialProcessStatus
            {
                DeceasedId = deceased2Id,
                IdentificationStatus = IdentificationStatus.Identified,
                IsReleasedFromTarah = true,
                ReleasedFromTarahDate = DateTime.Now.AddDays(-4)
            },
            DeceasedBurialDetails = new DeceasedBurialDetails
            {
                DeceasedId = deceased2Id,
                BurialType = BurialType.Final,
            },
            DeceasedTaharahDetails = new DeceasedTaharahDetails
            {
                DeceasedId = deceased2Id,
                TaharahStation = (int)BurialPreparation.RishonLezion,
                TaharahStatus = TaharahStatus.Pending,
                IsTaharahPerformed = false
            },
            DeceasedBurialCoordination = new DeceasedBurialCoordination
            {
                DeceasedId = deceased2Id,
                IsCoordinatedWithHevratKadisha = false
            }
        };

        var deceased3Id = Guid.NewGuid();

        var deceased3 = new Deceased
        {
            Id = deceased3Id,
            IdentityNumber = "000000",
            FirstName = "מל",
            LastName = "גיבסון",
            Nationality = "כלב",
            Gender = "זכר",
            HomeCity = "שכם",
            FatherName = "זבל",
            ProcessStatus = ProcessStatus.EndTransportBurialPreparation,
            EventId = eventId,

            DeceasedBags = new List<DeceasedBag>
            {
                new DeceasedBag
                {
                    Id = Guid.NewGuid(),
                    DeceasedId = deceased3Id,
                    BagNumber = "C-1003",
                    BroughtBy = BurialBody.AbuKabir,
                    ReceivingStation = TarahStations.Shura,
                    ArrivalDateTime = DateTime.Now.AddDays(-5),
                    BagTarahProcessStatus = BagTarahProcessStatus.Released
                }
            },
            StatusHistory = new List<DeceasedStatusHistory>
            {
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased3Id,
                    CurrentStatus = ProcessStatus.ReceptionAtTarah,
                    CreatedOn = DateTime.Now.AddDays(-5),
                    CreatedBy = deceased3Id
                },
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased3Id,
                    OldStatus = ProcessStatus.ReceptionAtTarah,
                    CurrentStatus = ProcessStatus.ReleaseFromTarah,
                    CreatedOn = DateTime.Now.AddHours(-3),
                    CreatedBy = deceased3Id
                },
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased3Id,
                    OldStatus = ProcessStatus.ReleaseFromTarah,
                    CurrentStatus = ProcessStatus.TransportToBurialPreparation,
                    CreatedOn = DateTime.Now.AddHours(-3),
                    CreatedBy = deceased3Id
                },
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased3Id,
                    OldStatus = ProcessStatus.TransportToBurialPreparation,
                    CurrentStatus = ProcessStatus.EndTransportBurialPreparation,
                    CreatedOn = DateTime.Now.AddHours(-3),
                    CreatedBy = deceased3Id
                }
            },
            DeceasedBurialProcessStatus = new DeceasedBurialProcessStatus
            {
                DeceasedId = deceased3Id,
                IsReleasedFromTarah = true,
                IsBuried = false,
            },
            DeceasedBurialDetails = new DeceasedBurialDetails
            {
                DeceasedId = deceased3Id,
                BurialType = BurialType.Final,
            },
            DeceasedTaharahDetails = new DeceasedTaharahDetails
            {
                DeceasedId = deceased3Id,
                TaharahStation = (int)BurialPreparation.TelRegev,
                TaharahStatus = TaharahStatus.Pending,
                IsTaharahPerformed = false,
            },
            DeceasedBurialCoordination = new DeceasedBurialCoordination
            {
                DeceasedId = deceased3Id,
            }
        };

        var deceased4Id = Guid.NewGuid();
        var deceased4 = new Deceased
        {
            Id = deceased4Id,
            IdentityNumber = "222333444",
            FirstName = "מוחמד",
            LastName = "מחמוד",
            Gender = "זכר",
            Affiliation = Affiliation.Civilian,
            ProcessStatus = ProcessStatus.ReceptionAtTarah,
            EventId = eventId,
            DeceasedBags = new List<DeceasedBag>
            {
                new DeceasedBag
                {
                    Id = Guid.NewGuid(),
                    DeceasedId = deceased4Id,
                    BagNumber = "T-4001",
                    BagTarahProcessStatus = BagTarahProcessStatus.PoliceIntake,
                    ReceivingStation = TarahStations.Shura,
                    ArrivalDateTime = DateTime.Now.AddHours(-2)
                },
                new DeceasedBag
                {
                    Id = Guid.NewGuid(),
                    DeceasedId = deceased4Id,
                    BagNumber = "T-4002",
                    BagTarahProcessStatus = BagTarahProcessStatus.Transport,
                    ReceivingStation = TarahStations.Shura,
                    ArrivalDateTime = DateTime.Now.AddHours(-2)
                }
            },
            DeceasedTarahDetails = new DeceasedTarahDetails
            {
                DeceasedId = deceased4Id,
                TarahStation = (int)TarahStations.Shura,
                TarahStatus = TarahStatus.Pending
            }
        };

        var deceased5Id = Guid.NewGuid();
        var deceased5 = new Deceased
        {
            Id = deceased5Id,
            IdentityNumber = "555666777",
            FirstName = "סמיר",
            LastName = "פאטם",
            Gender = "זכר",
            Affiliation = Affiliation.SecurityForces,
            ProcessStatus = ProcessStatus.ReceptionAtTarah,
            EventId = eventId,
            DeceasedBags = new List<DeceasedBag>
            {
                new DeceasedBag
                {
                    Id = Guid.NewGuid(),
                    DeceasedId = deceased5Id,
                    BagNumber = "T-5001",
                    ReceivingStation = TarahStations.Tziporit,
                    ArrivalDateTime = DateTime.Now.AddHours(-5),
                    BagTarahProcessStatus = BagTarahProcessStatus.Released
                }
            },
            DeceasedTarahDetails = new DeceasedTarahDetails
            {
                DeceasedId = deceased5Id,
                TarahStation = (int)TarahStations.Tziporit,
                TarahStatus = TarahStatus.InProgress,
                TarahTeamManager = "צוות א' - תר\"ח"
            }
        };

        var deceased6Id = Guid.NewGuid();
        var deceased6 = new Deceased
        {
            Id = deceased6Id,
            IdentityNumber = "888999000",
            FirstName = "פאטמה",
            LastName = "לילה",
            Gender = "זכר",
            Affiliation = Affiliation.Civilian,
            ProcessStatus = ProcessStatus.ReleaseFromTarah,
            EventId = eventId,
            DeceasedBags = new List<DeceasedBag>
            {
                new DeceasedBag
                {
                    Id = Guid.NewGuid(),
                    DeceasedId = deceased6Id,
                    BagNumber = "T-6001",
                    ReceivingStation = TarahStations.SdeTeiman,
                    ArrivalDateTime = DateTime.Now.AddDays(-1),
                    BagTarahProcessStatus = BagTarahProcessStatus.Released
                }
            },
            DeceasedTarahDetails = new DeceasedTarahDetails
            {
                DeceasedId = deceased6Id,
                TarahStation = (int)TarahStations.SdeTeiman,
                TarahStatus = TarahStatus.Completed,
            }
        };

        var deceased7Id = Guid.NewGuid();
        var deceased7 = new Deceased
        {
            Id = deceased7Id,
            Affiliation = Affiliation.Civilian,
            ProcessStatus = ProcessStatus.ReceptionAtTarah,
            EventId = eventId,
            DeceasedBags = new List<DeceasedBag>
            {
                new DeceasedBag
                {
                    Id = Guid.NewGuid(),
                    DeceasedId = deceased7Id,
                    BagTarahProcessStatus = BagTarahProcessStatus.PoliceIntake,
                    BagNumber = "T-7001",
                    ReceivingStation = TarahStations.Shura,
                    ArrivalDateTime = DateTime.Now.AddHours(-1)
                }
            },
            DeceasedTarahDetails = new DeceasedTarahDetails
            {
                DeceasedId = deceased7Id,
                TarahStation = (int)TarahStations.Shura,
                TarahStatus = TarahStatus.Pending
            }
        };

        db.Deceaseds.AddRange(deceased1, deceased2, deceased3, deceased4, deceased5, deceased6, deceased7);
        db.SaveChanges();
    }

    private Guid InitEvents()
    {
        if (db.Events.Any()) return db.Events.First().Id;

        var exerciseEvent = new Event
        {
            Id = Constants.eventId,
            Name = "תרגיל אר'ן ארצי",
            IsExercise = true,
            CreatedOn = DateTime.Now,
        };

        db.Events.Add(exerciseEvent);
        db.SaveChanges();
        return exerciseEvent.Id;
    }

    private void InitTransportTestData()
    {
        if (db.Transports.Any())
        {
            return;
        }

        var bagDetail = db.DeceasedBag.FirstOrDefault(b => b.BagNumber == "C-1001");

        if (bagDetail == null)
        {
            return;
        }

        var list = new List<Transport>
        {
            new Transport
            {
                DeceasedBagId = bagDetail.Id,
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
                DeceasedBagId = bagDetail.Id,
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
                DeceasedBagId = bagDetail.Id,
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
        var hasher = new PasswordHasher<Member>();

        var list = new List<Member>
        {
            new()
            {
                FullName = "עוז שורקי",
                UserName = "308015205",
                Mail = "OzS@dat.gov.il",
                PhoneNumber = "0545416161",
                Password = "123456",
                RoleAccessTypeId = RoleAccessType.Edit,
                OrganizationTypeId = (int)OrganizationType.DatServices,
                IsActive = true,
            },
            new()
            {
                FullName = "עמוס חכמון",
                UserName = "038869715",
                Mail = "amosh@dat.gov.il",
                Password = "123456",
                RoleAccessTypeId = RoleAccessType.Edit,
                OrganizationTypeId = (int)OrganizationType.Hamal,
                StationId = (int)TarahStations.Shura,
                IsActive = true,
            },
            new()
            {
                FullName = "ישראל ישראלי",
                UserName = "000000018",
                Mail = "is@dat.gov.il",
                Password = "123456",
                RoleAccessTypeId = RoleAccessType.Edit,
                OrganizationTypeId = (int)OrganizationType.BurialPreparation,
                StationId = (int)BurialPreparation.TelRegev,
                IsActive = true,
            }
        };

        list.ForEach(m =>
        {
            m.Password = hasher.HashPassword(m, m.Password);
        });

        db.Members.AddRange(list);

        db.SaveChanges();
    }

    #endregion
}