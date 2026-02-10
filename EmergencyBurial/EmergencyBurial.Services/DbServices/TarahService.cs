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
        TarahStations? targetStation = stationId.HasValue ? (TarahStations)stationId.Value : null;
    
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Where(d => d.DeceasedBags.Any(bag => 
                bag.BagTarahProcessStatus == BagTarahProcessStatus.PoliceIntake &&
                (targetStation == null || bag.ReceivingStation == targetStation)))
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();
    }

    public async Task<List<Deceased>> GetActiveList(int? stationId = null)
    {
        TarahStations? targetStation = stationId.HasValue ? (TarahStations)stationId.Value : null;
    
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTarahDetails)
            .Where(d => d.DeceasedBags.Any(bag => 
                bag.BagTarahProcessStatus == BagTarahProcessStatus.InStorage &&
                (targetStation == null || bag.ReceivingStation == targetStation)))
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();
    }

    public async Task<List<Deceased>> GetReleasedList(int? stationId = null)
    {
        TarahStations? targetStation = stationId.HasValue ? (TarahStations)stationId.Value : null;
        
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTarahDetails)
            .Where(d => d.DeceasedBags.Any(bag => 
                bag.BagTarahProcessStatus == BagTarahProcessStatus.Released &&
                (targetStation == null || bag.ReceivingStation == targetStation)))
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();
    }

    public async Task ReceiveBagToTarah(string bagNumber, int stationId, Guid? updateBy)
    {
        var bag = await ctx.DeceasedBag
            .AsTracking()
            .Include(d => d.Deceased)
            .ThenInclude(d => d.DeceasedTarahDetails)
            .FirstOrDefaultAsync(d => d.BagNumber == bagNumber);

        bag.BagTarahProcessStatus = BagTarahProcessStatus.InStorage;
        bag.ReceivingStation = (TarahStations)stationId;
        bag.ArrivalDateTime = DateTime.Now;

        var tarahDetails = bag.Deceased.DeceasedTarahDetails;

        // עדכון תיק התר"ח (אם זו כניסה ראשונה)
        if (tarahDetails.TarahStatus == TarahStatus.Pending || tarahDetails.TarahStatus == null)
        {
            tarahDetails.TarahStatus = TarahStatus.InProgress;
            tarahDetails.TarahStation = stationId;

            bag.Deceased.ProcessStatus = ProcessStatus.ReceptionAtTarah;
        }

        bag.Deceased.UpdateBy = updateBy;
        bag.Deceased.UpdateOn = DateTime.Now;

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

    /*public async Task ReleaseFromTarah(Guid? deceasedId, Guid? updateBy)
    {
        var bag = await ctx.DeceasedBag
            .Include(d => d.Deceased)
            .ThenInclude(d => d.DeceasedTarahDetails)
            .AsTracking()
            .FirstOrDefaultAsync(d => d.BagNumber == bagNumber);

        bag.BagTarahProcessStatus = BagTarahProcessStatus.Released;

        bag.Deceased.ProcessStatus = ProcessStatus.ReleaseFromTarah;
        bag.Deceased.UpdateBy = updateBy;
        bag.Deceased.UpdateOn = DateTime.Now;

        if (bag.Deceased.DeceasedTarahDetails != null)
        {
            bag.Deceased.DeceasedTarahDetails.IsPendingExit = false;
            bag.Deceased.DeceasedTarahDetails.TarahStatus = TarahStatus.Completed;
        }

        await ctx.SaveChangesAsync();
    }*/
}