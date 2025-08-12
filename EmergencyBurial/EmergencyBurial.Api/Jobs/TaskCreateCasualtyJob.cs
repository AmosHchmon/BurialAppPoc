using System.Threading.Tasks;
using Coravel.Invocable;
using DataModel;
using DataModel.Entities;
using Microsoft.Extensions.Logging;
using System;
using EmergencyBurial.Services.RealTime;

namespace EmergencyBurial.Api.Jobs
{
    public class TaskCreateCasualtyJob(EmergencyBurialContext context, ILogger<TaskCreateCasualtyJob> logger, NotificationService notificationService) : IInvocable
    {

        // The Invoke method remains the same
        public async Task Invoke()
        {
            try
            {
                logger.LogInformation("CreateCasualtyJob (Coravel) is running.");

                var randomId = new Random().Next(1000, 9999);
                var newCasualty = new Deceased
                {
                    HalalNumber = $"C-{DateTime.Now.Ticks}",
                    FirstName = "חלל אוטומטי",
                    LastName = $"מס' {randomId}",
                    IdentityNumber = randomId.ToString(),
                    Gender = "לא ידוע",
                    CurrentStatusId = 1,
                    CurrentLocationId = 1,
                    IsCivilBurial = false,
                    IsLinkedToOtherCases = false,
                    CreatedOn = DateTime.Now,
                    Notes = $"נוצר אוטומטית על ידי משימת Coravel ב-{DateTime.Now}"
                };

                context.Deceaseds.Add(newCasualty);
                await context.SaveChangesAsync();

                logger.LogInformation("Successfully created a new casualty with HalalNumber: {halalNumber}",
                    newCasualty.HalalNumber);
                
                await notificationService.SendDeceasedNotificationAsync(newCasualty);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred in CreateCasualtyJob.");
            }
        }
    }
}