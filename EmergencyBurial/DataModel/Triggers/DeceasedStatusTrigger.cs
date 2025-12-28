using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataModel.Entities;
using EntityFrameworkCore.Triggered;
using Core.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DataModel.Triggers;

public class DeceasedStatusTrigger(EmergencyBurialContext ctx) : IBeforeSaveTrigger<Deceased>
{
    public async Task BeforeSave(ITriggerContext<Deceased> context, CancellationToken cancellationToken)
    {
        if (context.ChangeType == ChangeType.Modified || context.ChangeType == ChangeType.Added)
        {
            var newStatus = context.Entity.ProcessStatus;

            if (context.ChangeType == ChangeType.Modified)
            {
                var oldStatus = context.UnmodifiedEntity.ProcessStatus;

                if (oldStatus == newStatus)
                    return;
            }

            if (context.Entity.StatusHistory == null)
            {
                context.Entity.StatusHistory = new List<DeceasedStatusHistory>();
            }

            context.Entity.StatusHistory.Add(new DeceasedStatusHistory
            {
                Status = newStatus,
                CreatedOn = DateTime.Now,
                CreatedBy = "System" // Todo: Change to Guid
            });

            var processStatusEntity = context.Entity.DeceasedBurialProcessStatus;

            if (processStatusEntity == null)
            {
                processStatusEntity = await ctx.DeceasedBurialProcessStatus
                    .FirstOrDefaultAsync(x => x.DeceasedId == context.Entity.Id, cancellationToken);
            }

            if (processStatusEntity != null)
            {
                //Todo: Add the other status changes
                switch (newStatus)
                {
                    case ProcessStatus.ReleaseFromTarah:

                        processStatusEntity.IsReleasedFromTarah = true;
                        processStatusEntity.ReleasedFromTarahDate ??= DateTime.Now;

                        break;

                    case ProcessStatus.Burial:

                        processStatusEntity.IsBuried = true;
                        processStatusEntity.BurialDate ??= DateTime.Now;

                        break;
                }
            }
        }
    }
}