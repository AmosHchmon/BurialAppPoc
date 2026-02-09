using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Helpers;
using Core.Resources;
using DataModel;
using DataModel.Entities;
using DataModel.Entities.System;
using Microsoft.EntityFrameworkCore;

namespace EmergencyBurial.Services.DbServices;

public class TransportService(EmergencyBurialContext ctx)
{
    public async Task CreateTransport(Transport transport, List<string> bagNumbers, List<Guid> deceasedIds)
    {
        var allBags = await ctx.DeceasedBag
            .AsTracking()
            .Where(b => bagNumbers.Contains(b.BagNumber) || deceasedIds.Contains(b.DeceasedId))
            .ToListAsync();
        
        if (bagNumbers.Count > 3)
            throw new ApplicationException(UserMessage.LimitBagsInTransport);

        var busyBags = allBags.Where(b => b.IsInTransport).Select(b => b.BagNumber).ToList();
        
        if (busyBags.Count > 0)
        {
            var busyBagsString = string.Join(", ", busyBags);
            throw new ApplicationException(string.Format(UserMessage.ActiveTransport, busyBagsString));
        }

        transport.IsCompleted = false;
        transport.UpdateOn = DateTime.Now;

        ctx.Transports.Add(transport);

        await ctx.SaveChangesAsync();

        foreach (var bag in allBags)
        {
            bag.IsInTransport = true;
            bag.CurrentTransportId = transport.Id;

            var historyItem = new TransportHistory
            {
                TransportId = transport.Id,
                DeceasedBagId = bag.Id,
                CreatedOn = DateTime.Now
            };

            ctx.TransportHistory.Add(historyItem);
        }

        await ctx.SaveChangesAsync();
    }

    public async Task<Transport> GetTransportForEdit(int id)
    {
        var transport = await ctx.Transports
            .AsTracking()
            .Include(t => t.DeceasedBags)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (transport == null)
        {
            throw new ApplicationException(UserMessage.ErrorLoadData);
        }

        return transport;
    }

    public async Task UpdateTransport()
    {
        await ctx.SaveChangesAsync();
    }

    public async Task EndTransport(int transportId, Guid userId)
    {
        var transport = await ctx.Transports
            .AsTracking()
            .Include(t => t.DeceasedBags)
            .FirstOrDefaultAsync(t => t.Id == transportId);

        if (transport.IsCompleted)
            throw new ApplicationException(UserMessage.TransportIsComplete);

        transport.IsCompleted = true;
        transport.UpdateBy = userId;
        transport.UpdateOn = DateTime.Now;
        transport.ArrivalDateTime = DateTime.Now;


        foreach (var bag in transport.DeceasedBags)
        {
            bag.IsInTransport = false;
            bag.CurrentTransportId = null;
        }

        await ctx.SaveChangesAsync();
    }

    public async Task<List<Transport>> GetTransportsList(TransportPurpose? filterPurpose)
    {
        var query = ctx.Transports
            .Include(t => t.DeceasedBags)
            .AsQueryable();

        if (filterPurpose.HasValue)
        {
            query = query.Where(t => t.Purpose == filterPurpose.Value);
        }

        return await query
            .OrderByDescending(t => t.StartDateTime)
            .ToListAsync();
    }

    public async Task<List<DeceasedBag>> GetAvailableBagsForTarah(int? stationId)
    {
        return await ctx.DeceasedBag
            .Include(b => b.Deceased)
            .Where(b => !b.IsInTransport && b.BagTarahProcessStatus == BagTarahProcessStatus.Released)
            .Where(d => (int)d.ReceivingStation == stationId)
            .OrderBy(b => b.Deceased.IdentityNumber)
            .ThenBy(b => b.BagNumber)
            .ToListAsync();
    }
    
    public async Task<List<Deceased>> GetAvailableDeceasedsForTaharah(int? stationId)
    {
        var list = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTaharahDetails)
            .Where(d => d.ProcessStatus == ProcessStatus.ReleasedFromBurialPreparation)
            .Where(d =>  d.DeceasedTaharahDetails.TaharahStation == stationId)
            .ToListAsync();

        return list;
    }
}