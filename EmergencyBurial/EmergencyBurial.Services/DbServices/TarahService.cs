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
    public async Task<List<Deceased>> GetPendingList(int? stationId = null)
    {
        int? targetStation = stationId.HasValue ? stationId.Value : null;
    
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Where(d => d.DeceasedProcessStatus == DeceasedProcessStatus.PoliceIntake)
            .Where(d => targetStation == null || d.DeceasedTarahDetails.StationId == targetStation)
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();
    }

    public async Task<List<Deceased>> GetActiveList(int? stationId = null)
    {
        int? targetStation = stationId.HasValue ? stationId.Value : null;
    
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTarahDetails)
            .Where(d => d.DeceasedProcessStatus == DeceasedProcessStatus.ReceptionAtTarah)
            .Where(d => targetStation == null || d.DeceasedTarahDetails.StationId == targetStation)
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();
    }

    public async Task<List<Deceased>> GetReleasedList(int? stationId = null)
    {
        int? targetStation = stationId.HasValue ? stationId.Value : null;
        
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTarahDetails)
            .Where(d => d.DeceasedProcessStatus == DeceasedProcessStatus.ReleaseFromTarah)
            .Where(d => targetStation == null || d.DeceasedTarahDetails.StationId == targetStation)
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();
    }

    public async Task ReceiveToTarah(Guid deceasedId, int stationId, Guid? userId)
    {
        var deceased = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTarahDetails)
            .AsTracking()
            .FirstOrDefaultAsync(d => d.Id == deceasedId);
        
        deceased.DeceasedProcessStatus = DeceasedProcessStatus.ReceptionAtTarah;
        deceased.UpdateBy = userId;
        deceased.UpdateOn = DateTime.Now;
        
        deceased.DeceasedTarahDetails.ReceptionDate = DateTime.Now;
        deceased.DeceasedTarahDetails.ReceivedBy = userId;
        
        foreach (var bag in deceased.DeceasedBags)
        {
            if (bag.BagTarahProcessStatus == BagTarahProcessStatus.PoliceIntake)
            {
                bag.BagTarahProcessStatus = BagTarahProcessStatus.InStorage;
                bag.ReceivingStation = (TarahStations)stationId;
                bag.ArrivalDateTime = DateTime.Now;
            }
        }

        deceased.DeceasedTarahDetails.StationId = stationId;
        
        await ctx.SaveChangesAsync();
    }

    public async Task UpdateFullDeceased()
    {
        await ctx.SaveChangesAsync();
    }

    public async Task<Deceased> GetDeceasedForEdit(Guid? deceasedId)
    {
        return await ctx.Deceaseds
            .AsTracking()
            .Include(d => d.DeceasedTarahDetails)
            .Include(d => d.DeceasedBurialDetails)
            .Include(d => d.DeceasedBags)
            .ThenInclude(b => b.TransportHistory)
            .ThenInclude(th => th.Transport)
            .FirstOrDefaultAsync(d => d.Id == deceasedId);
    }

    public async Task ReleaseFromTarah(Guid deceasedId, int stationId, Guid userId)
    {
        var deceased = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTarahDetails)
            .AsTracking()
            .FirstOrDefaultAsync(d => d.Id == deceasedId);
        
        deceased.UpdateBy = userId;
        deceased.UpdateOn = DateTime.Now;
        deceased.DeceasedProcessStatus = DeceasedProcessStatus.ReleaseFromTarah;
        deceased.DeceasedTarahDetails.IsPendingExit = false;
        
        foreach (var bag in deceased.DeceasedBags)
        {
            if (bag.BagTarahProcessStatus == BagTarahProcessStatus.InStorage)
            {
                bag.BagTarahProcessStatus = BagTarahProcessStatus.Released;
                bag.ReceivingStation = (TarahStations)stationId;
                bag.ArrivalDateTime = DateTime.Now;
            }
        }
    
        await ctx.SaveChangesAsync();
    }
}