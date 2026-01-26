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
    public async Task<DeceasedBag> GetBagByNumber(string bagNumber)
    {
        return await ctx.DeceasedBag
            .Include(d => d.Deceased)
            .ThenInclude(d => d.DeceasedTarahDetails)
            .FirstAsync(d => d.BagNumber == bagNumber);
    }

    public async Task<DeceasedTarahDetails> GetTarahDetailsById(Guid? id)
    {
        return await ctx.DeceasedTarahDetails
            .FirstOrDefaultAsync(d => d.DeceasedId == id);
    }

    public async Task<List<DeceasedBag>> GetPendingList(int? stationId = null)
    {
        return await ctx.DeceasedBag
            .Include(d => d.Deceased)
            .Where(d =>
                (d.BagTarahProcessStatus == BagTarahProcessStatus.PoliceIntake ||
                 d.BagTarahProcessStatus == BagTarahProcessStatus.Transport) &&
                (stationId == null || d.ReceivingStation == (TarahStations)stationId))
            .OrderByDescending(d => d.ArrivalDateTime)
            .ToListAsync();
    }

    public async Task<List<DeceasedBag>> GetActiveList(int? stationId = null)
    {
        return await ctx.DeceasedBag
            .Include(d => d.Deceased)
            .Where(d =>
                d.BagTarahProcessStatus == BagTarahProcessStatus.InStorage &&
                (stationId == null || d.ReceivingStation == (TarahStations)stationId))
            .OrderByDescending(d => d.ArrivalDateTime)
            .ToListAsync();
    }

    public async Task<List<DeceasedBag>> GetReleasedList(int? stationId = null)
    {
        return await ctx.DeceasedBag
            .Include(d => d.Deceased)
            .Where(d =>
                d.BagTarahProcessStatus == BagTarahProcessStatus.Released &&
                (stationId == null || d.Deceased.DeceasedTarahDetails.TarahStation == stationId))
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
        bag.ReceivedInTarahBy = updateBy;

        var tarahDetails = bag.Deceased.DeceasedTarahDetails;

        // עדכון תיק התר"ח (אם זו כניסה ראשונה)
        if (tarahDetails.TarahStatus == TarahStatus.Pending || tarahDetails.TarahStatus == null)
        {
            tarahDetails.TarahStatus = TarahStatus.InProgress;
            tarahDetails.TarahReceptionDate = DateTime.Now;
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

    public async Task<DeceasedBag> GetBagForEdit(string id)
    {
        return await ctx.DeceasedBag
            .AsTracking()
            .Include(d => d.Deceased)
            .ThenInclude(d => d.DeceasedTarahDetails)
            .Include(d => d.Deceased)
            .ThenInclude(d => d.DeceasedBurialDetails)
            .Include(d => d.Deceased)
            .ThenInclude(d => d.DeceasedBags)
            .FirstOrDefaultAsync(d => d.BagNumber == id);
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