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
    public async Task CreateTransport(Transport transport, List<string> bagNumbers)
    {
        if (bagNumbers.Count > 3)
            throw new ApplicationException(UserMessage.LimitBagsInTransport);

        var bags = await ctx.DeceasedBag
            .AsTracking()
            .Where(b => bagNumbers.Contains(b.BagNumber))
            .ToListAsync();

        var bagsInActiveTransport = bags
            .Where(b => b.IsInTransport)
            .Select(b => b.BagNumber)
            .ToList();

        if (bagsInActiveTransport.Count > 0)
        {
            var busyBagsString = string.Join(", ", bagsInActiveTransport);
            
            throw new ApplicationException(string.Format(UserMessage.ActiveTransport, busyBagsString));
        }

        transport.IsCompleted = false;
        transport.UpdateOn = DateTime.Now;

        ctx.Transports.Add(transport);

        await ctx.SaveChangesAsync();

        foreach (var bag in bags)
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
            .AsQueryable();
        
        if (filterPurpose.HasValue)
        {
            query = query.Where(t => t.Purpose == filterPurpose.Value);
        }

        return await query
            .OrderByDescending(t => t.StartDateTime)
            .ToListAsync();
    }

    public async Task<List<string>> SearchAvailableBags(string query)
    {
        return await ctx.DeceasedBag
            .Where(b => !b.IsInTransport && b.BagNumber.Contains(query))
            .Select(b => b.BagNumber)
            .ToListAsync();
    }
}