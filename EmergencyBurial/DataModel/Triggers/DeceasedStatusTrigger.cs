using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataModel.Entities;
using EntityFrameworkCore.Triggered;

namespace DataModel.Triggers;

public class DeceasedStatusTrigger() : IAfterSaveTrigger<Deceased>
{
    public Task AfterSave(ITriggerContext<Deceased> context, CancellationToken cancellationToken)
    {
        if (context.ChangeType == ChangeType.Modified || context.ChangeType == ChangeType.Added)
        {
            var newStatus = context.Entity.ProcessStatus;
            var oldStatus = newStatus;
            if (context.ChangeType == ChangeType.Modified)
            {
                oldStatus = context.UnmodifiedEntity.ProcessStatus;

                if (oldStatus == newStatus)
                    return Task.CompletedTask;
            }

            if (context.Entity.StatusHistory == null)
            {
                context.Entity.StatusHistory = new List<DeceasedStatusHistory>();
            }

            context.Entity.StatusHistory.Add(new DeceasedStatusHistory
            {
                OldStatus = oldStatus,
                CurrentStatus = newStatus,
                CreatedOn = DateTime.Now,
                CreatedBy = context.Entity.UpdateBy ?? Guid.Empty
            });
        }

        return Task.CompletedTask;
    }
}