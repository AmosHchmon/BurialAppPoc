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
            .Include(d => d.DeceasedTaharahDetails)
            .Where(d => d.ProcessStatus == ProcessStatus.EndTransportBurialPreparation &&
                        d.DeceasedTaharahDetails.TaharahStatus == TaharahStatus.Pending)
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();
    }

    public async Task<List<Deceased>> GetActiveDeceasedInTaharah(int? month, int? year)
    {
        var list = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTaharahDetails)
            .Where(d => d.ProcessStatus == ProcessStatus.ReceivedForBurialPreparation &&
                        d.DeceasedTaharahDetails.TaharahStatus == TaharahStatus.InProgress)
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();

        /*if (month > 0 && year > 0)
        {
            query = query.Where(d => d.CreatedOn.HasValue &&
                                     d.CreatedOn.Value.Month == month &&
                                     d.CreatedOn.Value.Year == year);
        }*/

        return list;
    }

    public async Task<List<Deceased>> GetReleasedFromTaharah(int? month, int? year)
    {
        var list = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTaharahDetails)
            .Where(d => d.ProcessStatus == ProcessStatus.ReceivedForBurialPreparation &&
                        d.DeceasedTaharahDetails.TaharahStatus == TaharahStatus.Completed)
            .OrderByDescending(d => d.DeceasedTaharahDetails.TaharahClosingDate)
            .ToListAsync();

        /*if (month > 0 && year > 0)
        {
            query = query.Where(d => d.DeceasedTaharahDetails.TaharahClosingDate.HasValue &&
                                     d.DeceasedTaharahDetails.TaharahClosingDate.Value.Month == month &&
                                     d.DeceasedTaharahDetails.TaharahClosingDate.Value.Year == year);
        }*/

        return list;
    }

    public async Task ReceiveDeceasedToTaharah(DeceasedTaharahDetails details)
    {
        var deceased = await ctx.Deceaseds
            .Include(d => d.DeceasedTaharahDetails)
            .AsTracking()
            .FirstOrDefaultAsync(d => d.Id == details.DeceasedId);

        if (deceased == null)
        {
            throw new ApplicationException(UserMessage.DeceasedNotExists);
        }

        deceased.DeceasedTaharahDetails ??= new DeceasedTaharahDetails { DeceasedId = deceased.Id };

        deceased.ProcessStatus = ProcessStatus.ReceivedForBurialPreparation;
        deceased.DeceasedTaharahDetails.TaharahStatus = TaharahStatus.InProgress;
        deceased.DeceasedTaharahDetails.TaharahReceptionStaff = details.TaharahReceptionStaff;

        deceased.DeceasedTaharahDetails.TaharahProcessStartDate = details.TaharahProcessStartDate ?? DateTime.Now;
        deceased.DeceasedTaharahDetails.TaharahReceptionDate = details.TaharahReceptionDate ?? DateTime.Now;

        await ctx.SaveChangesAsync();
    }

    public async Task UpdateTaharahDetails(DeceasedTaharahDetails details)
    {
        ctx.DeceasedTaharahDetails
            .Update(details);

        await ctx.SaveChangesAsync();
    }

    public async Task<Deceased> GetDeceasedForEdit(Guid id)
    {
        return await ctx.Deceaseds
            .Include(d => d.DeceasedTaharahDetails)
            .Include(d => d.DeceasedBags)
            .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task ReleaseFromTaharah(DeceasedTaharahDetails taharahDetails)
    {
        var details = await ctx.DeceasedTaharahDetails
            .FirstOrDefaultAsync(d => d.DeceasedId == taharahDetails.DeceasedId);

        details.TaharahStatus = TaharahStatus.Completed;
        details.TaharahClosingDate = DateTime.Now;

        await UpdateTaharahDetails(taharahDetails);
    }
}