using System.Threading.Tasks;
using Coravel.Invocable;
using DataModel;
using DataModel.Entities;
using Microsoft.Extensions.Logging;
using System;

namespace EmergencyBurial.Api.Jobs
{
    public class CreateCasualtyJob : IInvocable
    {
        private readonly EmergencyBurialContext context;
        private readonly ILogger<CreateCasualtyJob> logger;

        public CreateCasualtyJob(EmergencyBurialContext context, ILogger<CreateCasualtyJob> logger)
        {
            this.context = context;
            this.logger = logger;
        }

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
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred in CreateCasualtyJob.");
            }
        }
    }
}