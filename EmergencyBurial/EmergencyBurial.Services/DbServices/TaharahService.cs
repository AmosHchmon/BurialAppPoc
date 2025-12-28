using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Helpers;
using Core.Resources;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmergencyBurial.Services.DbServices;

public class TaharahService(EmergencyBurialContext ctx)
{
    public async Task<List<Deceased>> GetPendingDeceaseds()
    {
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedBurialDetails)
            .Where(d => d.ProcessStatus == ProcessStatus.EndTransportBurialPreparation)
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();
    }

    public async Task<List<Deceased>> GetActiveDeceasedInTaharah(int? month, int? year)
    {
        var query = ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedBurialDetails)
            .Include(d => d.DeceasedBurialProcessStatus)
            .Where(d => d.ProcessStatus >= ProcessStatus.TransportToBurialPreparation
                        && d.ProcessStatus < ProcessStatus.Burial);

        if (month > 0 && year > 0)
        {
            query = query.Where(d => d.CreatedOn.HasValue &&
                                     d.CreatedOn.Value.Month == month &&
                                     d.CreatedOn.Value.Year == year);
        }

        var list = await query
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();

        return list;
    }

    public async Task ReceiveDeceasedToTaharah(Guid deceasedId)
    {
        var deceased = await ctx.Deceaseds
            .Include(d => d.DeceasedBurialDetails)
            .AsTracking()
            .FirstOrDefaultAsync(d => d.Id == deceasedId);

        if (deceased == null)
        {
            throw new ApplicationException(UserMessage.DeceasedNotExists);
        }

        deceased.ProcessStatus = ProcessStatus.ReceptionBurialPreparation;
        deceased.DeceasedBurialDetails.TaharahReceptionDate = DateTime.Now;

        await ctx.SaveChangesAsync();
    }
}