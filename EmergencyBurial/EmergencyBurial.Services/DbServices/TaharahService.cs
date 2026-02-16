using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Helpers;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmergencyBurial.Services.DbServices;

public class TaharahService(EmergencyBurialContext ctx)
{
    public async Task<DeceasedTaharahDetails> GetTaharahDetailsById(Guid? id)
    {
        return await ctx.DeceasedTaharahDetails
            .FirstOrDefaultAsync(d => d.DeceasedId == id);
    }

    public async Task<List<Deceased>> GetPendingList(int? stationId = null)
    {
        int? targetStation = stationId.HasValue ? stationId.Value : null;
        
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTaharahDetails)
            .Where(d => d.DeceasedProcessStatus == DeceasedProcessStatus.EndTransportBurialPreparation)
            .Where(d => targetStation == null || d.DeceasedTaharahDetails.TaharahStation == targetStation)
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();
    }

    public async Task<List<Deceased>> GetActiveList(int? stationId = null)
    {
        int? targetStation = stationId.HasValue ? stationId.Value : null;        
        
        var list = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTaharahDetails)
            .Where(d => d.DeceasedProcessStatus == DeceasedProcessStatus.ReceivedForBurialPreparation)
            .Where(d => targetStation == null || d.DeceasedTaharahDetails.TaharahStation == targetStation)
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();

        return list;
    }

    public async Task<List<Deceased>> GetReleasedList(int? stationId = null)
    {
        int? targetStation = stationId.HasValue ? stationId.Value : null;
        
        var list = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTaharahDetails)
            .Where(d => d.DeceasedProcessStatus >= DeceasedProcessStatus.ReleasedFromBurialPreparation)
            .Where(d => targetStation == null || d.DeceasedTaharahDetails.TaharahStation == targetStation)
            .OrderByDescending(d => d.DeceasedTaharahDetails.TaharahReleaseDate)
            .ToListAsync();

        return list;
    }

    public async Task ReceiveDeceasedToTaharah(DeceasedTaharahDetails details, Guid? updateBy)
    {
        var deceased = await ctx.Deceaseds
            .Include(d => d.DeceasedTaharahDetails)
            .AsTracking()
            .FirstOrDefaultAsync(d => d.Id == details.DeceasedId);

        deceased.DeceasedProcessStatus = DeceasedProcessStatus.ReceivedForBurialPreparation;
        deceased.UpdateBy = updateBy;
        deceased.UpdateOn = DateTime.Now;
        ctx.Entry(deceased.DeceasedTaharahDetails).CurrentValues.SetValues(details);

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

    public async Task ReleaseFromTaharah(DeceasedTaharahDetails taharahDetails, Guid? updateBy)
    {
        var deceased = await ctx.Deceaseds
            .Include(d => d.DeceasedTaharahDetails)
            .AsTracking()
            .FirstOrDefaultAsync(d => d.Id == taharahDetails.DeceasedId);

        deceased.DeceasedProcessStatus = DeceasedProcessStatus.ReleasedFromBurialPreparation;
        deceased.UpdateBy = updateBy;
        deceased.UpdateOn = DateTime.Now;
        ctx.Entry(deceased.DeceasedTaharahDetails).CurrentValues.SetValues(taharahDetails);

        await ctx.SaveChangesAsync();
    }
}