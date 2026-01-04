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

    public async Task<List<Deceased>> GetActiveDeceasedInTaharah()
    {
        var list = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTaharahDetails)
            .Where(d => d.ProcessStatus == ProcessStatus.ReceivedForBurialPreparation &&
                        d.DeceasedTaharahDetails.TaharahStatus == TaharahStatus.InProgress)
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();

        return list;
    }

    public async Task<List<Deceased>> GetReleasedFromTaharah()
    {
        var list = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTaharahDetails)
            .Where(d => d.ProcessStatus == ProcessStatus.ReleasedFromBurialPreparation)
            .OrderByDescending(d => d.DeceasedTaharahDetails.TaharahReleaseDate)
            .ToListAsync();

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

        deceased.ProcessStatus = ProcessStatus.ReceivedForBurialPreparation;
        
        deceased.DeceasedTaharahDetails.TaharahStatus = TaharahStatus.InProgress;
        deceased.DeceasedTaharahDetails.TaharahReceptionStaff = details.TaharahReceptionStaff;
        deceased.DeceasedTaharahDetails.TaharahReceptionDate = details.TaharahReceptionDate ?? DateTime.Now;

        await ctx.SaveChangesAsync();
    }

    public async Task UpdateTaharahDetails(DeceasedTaharahDetails taharahDetails)
    {
        ctx.DeceasedTaharahDetails
            .Update(taharahDetails);

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
        var deceased = await ctx.Deceaseds
            .AsTracking()
            .Include(d => d.DeceasedTaharahDetails)
            .FirstOrDefaultAsync(d => d.Id == taharahDetails.DeceasedId);
        
        deceased.ProcessStatus = ProcessStatus.ReleasedFromBurialPreparation;
        
        deceased.DeceasedTaharahDetails.TaharahStatus = TaharahStatus.Completed;
        deceased.DeceasedTaharahDetails.IsPendingExit = false;
        deceased.DeceasedTaharahDetails.TaharahReleaseDate = DateTime.Now;

        await ctx.SaveChangesAsync();
    }
}