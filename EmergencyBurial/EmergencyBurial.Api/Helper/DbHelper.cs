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
        if (db.Deceaseds.Any())
        {
            return;
        }

        var deceased1Id = Guid.NewGuid();
        var bag1Id = Guid.NewGuid();
        var bag1PartId = Guid.NewGuid();

        var deceased1 = new Deceased
        {
            Id = deceased1Id,
            IdentityNumber = "123456789",
            FirstName = "ישראל",
            LastName = "ישראלי",
            FatherName = "אברהם",
            Gender = "זכר",
            HomeCity = "ירושלים",
            PeleNumber = "PL-789123",
            ProcessStatus = ProcessStatus.EndTransportBurialPreparation,

            DeceasedBags = new List<DeceasedBag>
            {
                new DeceasedBag
                {
                    Id = bag1Id,
                    DeceasedId = deceased1Id,
                    BagNumber = "C-1001",
                    Affiliation = Affiliation.Civilian,
                    ReceivingStation = TarahStations.Shura,
                    BroughtBy = BurialBody.AbuKabir,
                    CanBeIdentifiedByAcquaintance = true,
                    RelatedBagNumbers = 5,
                    ArrivalDateTime = DateTime.Now.AddDays(-2)
                },
                new DeceasedBag
                {
                    Id = bag1PartId,
                    DeceasedId = deceased1Id,
                    BagNumber = "C-1001-B",
                    Affiliation = Affiliation.Civilian,
                    BroughtBy = BurialBody.AbuKabir,
                    PartDescription = "חלק גוף תחתון",
                    ReceivingStation = TarahStations.Shura,
                    ArrivalDateTime = DateTime.Now.AddDays(-2).AddHours(2)
                }
            },

            StatusHistory = new List<DeceasedStatusHistory>
            {
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased1Id,
                    Status = ProcessStatus.ReceptionAtTarah,
                    CreatedOn = DateTime.Now.AddDays(-2),
                    CreatedBy = "System"
                },
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased1Id,
                    Status = ProcessStatus.ReleasedFromBurialPreparation,
                    CreatedOn = DateTime.Now.AddDays(-1),
                    CreatedBy = "System"
                },
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased1Id,
                    Status = ProcessStatus.TransportToBurialEntity,
                    CreatedOn = DateTime.Now.AddHours(-5),
                    CreatedBy = "System"
                }
            },
            DeceasedBurialProcessStatus = new DeceasedBurialProcessStatus
            {
                DeceasedId = deceased1Id,
                IdentificationStatus = IdentificationStatus.Identified,
                IsReleasedFromTarah = false,
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
                TaharahStatus = TaharahStatus.Pending
            },
            DeceasedBurialCoordination = new DeceasedBurialCoordination
            {
                DeceasedId = deceased1Id,
                BurialCity = "ירושלים",
                IsCoordinatedWithHevratKadisha = true,
                FamilyContactName = "משה ישראלי",
                FamilyContactPhone = "050-1234567"
            }
        };

        var deceased2Id = Guid.NewGuid();
        var bag2Id = Guid.NewGuid();

        var deceased2 = new Deceased
        {
            Id = deceased2Id,
            IdentityNumber = "987654321",
            FirstName = "יעל",
            LastName = "כהן",
            FatherName = "משה",
            Gender = "נקבה",
            HomeCity = "תל אביב",
            ProcessStatus = ProcessStatus.ReceivedForBurialPreparation,

            DeceasedBags = new List<DeceasedBag>
            {
                new DeceasedBag
                {
                    Id = bag2Id,
                    DeceasedId = deceased2Id,
                    BagNumber = "C-1002",
                    Affiliation = Affiliation.SecurityForces,
                    ReceivingStation = TarahStations.Tziporit,
                    BroughtBy = BurialBody.AbuKabir,
                    ArrivalDateTime = DateTime.Now.AddDays(-1)
                }
            },
            StatusHistory = new List<DeceasedStatusHistory>
            {
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased2Id,
                    Status = ProcessStatus.ReceptionAtTarah,
                    CreatedOn = DateTime.Now.AddDays(-1),
                    CreatedBy = "System"
                },
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased2Id,
                    Status = ProcessStatus.EndTransportBurialEntity,
                    CreatedOn = DateTime.Now.AddHours(-2),
                    CreatedBy = "Driver"
                }
            },
            DeceasedBurialProcessStatus = new DeceasedBurialProcessStatus
            {
                DeceasedId = deceased2Id,
                IdentificationStatus = IdentificationStatus.NotIdentified,
                IsReleasedFromTarah = true,
                ReleasedFromTarahDate = DateTime.Now.AddHours(-3)
            },
            DeceasedBurialDetails = new DeceasedBurialDetails
            {
                DeceasedId = deceased2Id,
                BurialType = BurialType.Final,
            },
            DeceasedTaharahDetails = new DeceasedTaharahDetails
            {
                DeceasedId = deceased2Id,
                TaharahStatus = TaharahStatus.InProgress,
                TaharahReceptionDate = DateTime.Now
            },
            DeceasedBurialCoordination = new DeceasedBurialCoordination
            {
                DeceasedId = deceased2Id,
                IsCoordinatedWithHevratKadisha = false
            }
        };

        var deceased3Id = Guid.NewGuid();
        var bag3Id = Guid.NewGuid();

        var deceased3 = new Deceased
        {
            Id = deceased3Id,
            IdentityNumber = "111222333",
            FirstName = "דוד",
            LastName = "המלך",
            Gender = "זכר",
            FatherName = "ישי",
            ProcessStatus = ProcessStatus.ReceivedForBurialPreparation,

            DeceasedBags = new List<DeceasedBag>
            {
                new DeceasedBag
                {
                    Id = bag3Id,
                    DeceasedId = deceased3Id,
                    BagNumber = "C-1003",
                    Affiliation = Affiliation.Civilian,
                    BroughtBy = BurialBody.AbuKabir,
                    ReceivingStation = TarahStations.Shura,
                    ArrivalDateTime = DateTime.Now.AddDays(-5)
                }
            },
            StatusHistory = new List<DeceasedStatusHistory>
            {
                new DeceasedStatusHistory
                {
                    DeceasedId = deceased3Id, Status = ProcessStatus.Burial, CreatedOn = DateTime.Now.AddDays(-1),
                    CreatedBy = "System"
                }
            },
            DeceasedBurialProcessStatus = new DeceasedBurialProcessStatus
            {
                DeceasedId = deceased3Id,
                IsReleasedFromTarah = true,
                IsBuried = true,
                BurialDate = DateTime.Now.AddDays(-1)
            },
            DeceasedBurialDetails = new DeceasedBurialDetails
            {
                DeceasedId = deceased3Id,
                BurialType = BurialType.Final,
            },
            DeceasedTaharahDetails = new DeceasedTaharahDetails
            {
                DeceasedId = deceased3Id,
                TaharahStatus = TaharahStatus.Completed,
                TaharahReceptionStaff = "אבי",
                TaharahLocation = BurialPreparation.RishonLezion,
                TaharahReceptionDate = DateTime.Now.AddDays(-30),
                TaharahClosingDate = DateTime.Now.AddDays(-15),
                TaharahProcessStartDate = DateTime.Now.AddDays(-25),
                HasTachrichim = false,
                IsTaharahPerformed = true,
                InCoffin = false
            },
            DeceasedBurialCoordination = new DeceasedBurialCoordination
            {
                DeceasedId = deceased3Id,
            }
        };

        db.Deceaseds.AddRange(deceased1, deceased2, deceased3);
        db.SaveChanges();
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
        var list = new List<Member>
        {
            new()
            {
                FullName = "עוז שורקי",
                UserName = "308015205",
                Mail = "OzS@dat.gov.il",
                RoleAccessTypeId = RoleAccessType.Admin,
                OrganizationTypeId = (int)OrganizationType.Tarah,
                StationTypeId = (int)StationType.TarahStations,
                StationId = (int)TarahStations.Shura,
                IsActive = true,
            },
            new()
            {
                FullName = "עמוס חכמון",
                UserName = "038869715",
                Mail = "amosh@dat.gov.il",
                RoleAccessTypeId = RoleAccessType.Admin,
                OrganizationTypeId = (int)OrganizationType.Tarah,
                StationTypeId = (int)StationType.TarahStations,
                StationId = (int)TarahStations.Shura,
                IsActive = true,
            },
            new()
            {
                FullName = "ישראל ישראלי",
                UserName = "000000018",
                Mail = "amosh@dat.gov.il",
                RoleAccessTypeId = RoleAccessType.Edit,
                OrganizationTypeId = (int)OrganizationType.Tarah,
                StationTypeId = (int)StationType.BurialPreparation,
                StationId = (int)BurialPreparation.TelRegev,
                IsActive = true,
            }
        };

        db.Members.AddRange(list);

        db.SaveChanges();
    }

    #endregion
}