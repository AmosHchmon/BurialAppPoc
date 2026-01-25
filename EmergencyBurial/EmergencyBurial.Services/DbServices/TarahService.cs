using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Helpers;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmergencyBurial.Services.DbServices;

public class TarahService(EmergencyBurialContext ctx)
{
    public async Task<DeceasedTarahDetails> GetTarahDetailsById(Guid? id)
    {
        return await ctx.DeceasedTarahDetails
            .FirstOrDefaultAsync(d => d.DeceasedId == id);
    }

    public async Task<List<Deceased>> GetPendingList(int? stationId = null)
    {
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTarahDetails)
            .Where(d => d.ProcessStatus <= ProcessStatus.ReceptionAtTarah &&
                        (d.DeceasedTarahDetails == null || d.DeceasedTarahDetails.TarahStatus == TarahStatus.Pending) &&
                        (stationId == null || d.DeceasedTarahDetails.TarahStation == stationId))
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();
    }

    public async Task<List<Deceased>> GetActiveList(int? stationId = null)
    {
        var list = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTarahDetails)
            .Where(d => d.ProcessStatus == ProcessStatus.ReceptionAtTarah &&
                        d.DeceasedTarahDetails.TarahStatus == TarahStatus.InProgress &&
                        (stationId == null || d.DeceasedTarahDetails.TarahStation == stationId))
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();

        return list;
    }

    public async Task<List<Deceased>> GetReleasedList(int? stationId = null)
    {
        var list = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTarahDetails)
            .Where(d => d.ProcessStatus >= ProcessStatus.ReleaseFromTarah &&
                        (stationId == null || d.DeceasedTarahDetails.TarahStation == stationId))
            .OrderByDescending(d => d.DeceasedTarahDetails.TarahReleaseDate)
            .ToListAsync();

        return list;
    }

    public async Task ReceiveDeceasedToTarah(DeceasedTarahDetails details, Guid? updateBy)
    {
        var deceased = await ctx.Deceaseds
            .Include(d => d.DeceasedTarahDetails)
            .AsTracking()
            .FirstOrDefaultAsync(d => d.Id == details.DeceasedId);

        deceased.ProcessStatus = ProcessStatus.ReceptionAtTarah;
        deceased.UpdateBy = updateBy;
        deceased.UpdateOn = DateTime.Now;
        
        if (deceased.DeceasedTarahDetails == null)
        {
            deceased.DeceasedTarahDetails = details;
        }
        else
        {
            ctx.Entry(deceased.DeceasedTarahDetails).CurrentValues.SetValues(details);
        }

        await ctx.SaveChangesAsync();
    }

    public async Task UpdateFullDeceased()
    {
        await ctx.SaveChangesAsync();
    }

    public async Task<Deceased> GetDeceasedForEdit(Guid? id)
    {
        return await ctx.Deceaseds
            .AsTracking()
            .Include(d => d.DeceasedTarahDetails)
            .Include(d => d.DeceasedBurialDetails)
            .Include(d => d.DeceasedBags)
            .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task ReleaseFromTarah(DeceasedTarahDetails TarahDetails, Guid? updateBy)
    {
        var deceased = await ctx.Deceaseds
            .Include(d => d.DeceasedTarahDetails)
            .AsTracking()
            .FirstOrDefaultAsync(d => d.Id == TarahDetails.DeceasedId);

        deceased.ProcessStatus = ProcessStatus.ReleaseFromTarah;
        deceased.UpdateBy = updateBy;
        deceased.UpdateOn = DateTime.Now;
        ctx.Entry(deceased.DeceasedTarahDetails).CurrentValues.SetValues(TarahDetails);

        await ctx.SaveChangesAsync();
    }
}
