using System.Threading.Tasks;
using Coravel.Invocable;
using DataModel;
using DataModel.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using AutoMapper;
using Core.Helpers;
using Core.Model;
using EmergencyBurial.Services.RealTime;

namespace EmergencyBurial.Api.Jobs
{
    public class TaskCreateCasualtyJob(
        EmergencyBurialContext context,
        ILogger<TaskCreateCasualtyJob> logger,
        IMapper mapper,
        NotificationService notificationService) : IInvocable
    {
        // The Invoke method remains the same
        public async Task Invoke()
        {
            try
            {
                logger.LogInformation("CreateCasualtyJob (Coravel) is running.");

                var randomId = new Random().Next(1000, 9999);
                var bagNumber = $"C-{DateTime.Now.Ticks}";
                
                var newCasualty = new Deceased
                {
                    FirstName = "ישראל",
                    LastName = "ישראלי",
                    IdentityNumber = randomId.ToString(),
                    FatherName = "ישראלוף",
                    Gender = "לא ידוע",
                    Nationality = "ישראלי",
                    HomeCity = "תל אביב",
                    DeceasedBags = new List<DeceasedBag>
                    {
                        new DeceasedBag
                        {
                            Id = Guid.NewGuid(),
                            BagNumber = bagNumber,
                            ReceivingStation = TarahStations.Shura,
                            BagTarahProcessStatus = BagTarahProcessStatus.PoliceIntake,
                            ArrivalDateTime = DateTime.Now
                        }
                    }
                };

                /*context.Deceaseds.Add(newCasualty);
                await context.SaveChangesAsync();

                logger.LogInformation("Successfully created a new casualty with bagNumber: {bagNumber}",
                    bagNumber);*/

                var res = mapper.Map<ExternalDeceasedDto>(newCasualty);

                await notificationService.NotifyDeceasedCreatedAsync(res);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred in CreateCasualtyJob.");
            }
        }
    }
}