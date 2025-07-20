using System.Threading.Tasks;
using DataModel;
using DataModel.Entities;
using Microsoft.Extensions.Logging;
using System;

namespace EmergencyBurial.Api.Jobs
{
    public class CreateCasualtyJob(EmergencyBurialContext ctx, ILogger<CreateCasualtyJob> logger)
    {
        public async Task Invoke()
        {
            try
            {
                /*logger.LogInformation("CreateCasualtyJob is running.");

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
                    Notes = $"נוצר אוטומטית על ידי משימה מתוזמנת ב-{DateTime.Now}"
                };

                ctx.Deceaseds.Add(newCasualty);
                await ctx.SaveChangesAsync();

                logger.LogInformation("Successfully created a new casualty with HalalNumber: {halalNumber}", newCasualty.HalalNumber);*/
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred in CreateCasualtyJob.");
            }
        }
    }
}