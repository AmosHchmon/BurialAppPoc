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
            .Include(b => b.Deceased)
            .ThenInclude(d => d.DeceasedTaharahDetails)
            .Include(b => b.Deceased)
            .ThenInclude(d => d.DeceasedBurialCoordination)
            .Where(b => bagNumbers.Contains(b.BagNumber) || deceasedIds.Contains(b.DeceasedId))
            .ToListAsync();
        
        if (deceasedIds.Count > 2)
            throw new ApplicationException(UserMessage.LimitDeceasedsInTransport);

        var busyBags = allBags.Where(b => b.IsInTransport).Select(b => b.BagNumber).ToList();
        
        if (busyBags.Count > 0)
        {
            var busyBagsString = string.Join(", ", busyBags);
            throw new ApplicationException(string.Format(UserMessage.ActiveTransport, busyBagsString));
        }

        transport.IsCompleted = false;
        transport.UpdateOn = DateTime.Now;
        transport.StartDateTime = DateTime.Now;

        ctx.Transports.Add(transport);

        await ctx.SaveChangesAsync();
        
        var newStatus = GetProcessStatusByPurpose(transport.DestinationLocationType);

        foreach (var bag in allBags)
        {
            bag.IsInTransport = true;
            bag.Deceased.DeceasedProcessStatus = newStatus;

            switch (transport.DestinationLocationType)
            {
                case TransportPurpose.ToBurialPreparation:
                    bag.Deceased.DeceasedTaharahDetails.StationId = transport.DestinationStationId;
                    break;
                
                case TransportPurpose.ToBurialBody:
                    bag.Deceased.DeceasedBurialCoordination.BurialBody = (BurialBody)transport.DestinationStationId!;
                    break;
            }

            var relDeceasedTransport = new RelDeceasedTransport()
            {
                TransportId = transport.Id,
                DeceasedId = bag.DeceasedId,
                DeceasedBagId = bag.Id,
                TransportPurpose = transport.DestinationLocationType
            };

            ctx.RelDeceasedTransports.Add(relDeceasedTransport);
        }

        await ctx.SaveChangesAsync();
    }

    public async Task<Transport> GetTransportForEdit(int id)
    {
        return await ctx.Transports
            .AsTracking()
            .Include(t => t.RelDeceasedTransports)
            .ThenInclude(r => r.Deceased)
            .Include(t => t.RelDeceasedTransports)
            .ThenInclude(r => r.DeceasedBag)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task UpdateTransport()
    {
        await ctx.SaveChangesAsync();
    }

    public async Task EndTransport(int transportId, Guid userId)
    {
        var transport = await ctx.Transports
            .AsTracking()
            .Include(t => t.RelDeceasedTransports)
            .ThenInclude(rel => rel.DeceasedBag)
            .Include(t => t.RelDeceasedTransports)
            .ThenInclude(rel => rel.Deceased)
            .FirstOrDefaultAsync(t => t.Id == transportId);
        
        if (transport.IsCompleted)
            throw new ApplicationException(UserMessage.TransportIsComplete);
        
        var arrivalStatus = GetArrivalStatusByPurpose(transport.DestinationLocationType);
        
        transport.IsCompleted = true;
        transport.UpdateBy = userId;
        transport.UpdateOn = DateTime.Now;
        transport.ArrivalDateTime = DateTime.Now;
        
        foreach (var rel in transport.RelDeceasedTransports)
        {
            if (rel.DeceasedBag != null)
            {
                rel.DeceasedBag.IsInTransport = false;
            }
            
            if (rel.Deceased != null)
            {
                rel.Deceased.DeceasedProcessStatus = arrivalStatus;
            }
        }

        await ctx.SaveChangesAsync();
    }

    public async Task<List<Transport>> GetTransportsList(TransportPurpose? filterPurpose)
    {
        var query = ctx.Transports
            .Include(t => t.RelDeceasedTransports)
            .ThenInclude(rel => rel.Deceased)
            .Include(t => t.RelDeceasedTransports)
            .ThenInclude(rel => rel.DeceasedBag)
            .AsQueryable();

        if (filterPurpose.HasValue)
        {
            query = query.Where(t => t.DestinationLocationType == filterPurpose.Value);
        }

        return await query
            .OrderByDescending(t => t.StartDateTime)
            .ToListAsync();
    }

    public async Task<List<DeceasedBag>> GetAvailableBagsForTarah(int? stationId)
    {
        return await ctx.DeceasedBag
            .Include(b => b.Deceased)
            .ThenInclude(d => d.DeceasedTarahDetails)
            .Where(b => !b.IsInTransport &&
                        b.Deceased.DeceasedProcessStatus == DeceasedProcessStatus.ReleaseFromTarah)
            .Where(d => d.Deceased.DeceasedTarahDetails.StationId == stationId)
            .OrderBy(b => b.Deceased.IdentityNumber)
            .ThenBy(b => b.BagNumber)
            .ToListAsync();
    }
    
    public async Task<List<Deceased>> GetAvailableDeceasedsForTaharah(int? stationId)
    {
        var list = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .Include(d => d.DeceasedTaharahDetails)
            .Where(d => d.DeceasedProcessStatus == DeceasedProcessStatus.ReleasedFromBurialPreparation)
            .Where(d =>  d.DeceasedTaharahDetails.StationId == stationId)
            .ToListAsync();

        return list;
    }
    
    private DeceasedProcessStatus GetProcessStatusByPurpose(TransportPurpose purpose)
    {
        return purpose switch
        {
            TransportPurpose.ToBurialPreparation => DeceasedProcessStatus.TransportToBurialPreparation,
            TransportPurpose.ToBurialBody => DeceasedProcessStatus.TransportToBurialEntity,
            _ => throw new ApplicationException(UserMessage.UnknownTransportDestination)
        };
    }
    
    private DeceasedProcessStatus GetArrivalStatusByPurpose(TransportPurpose purpose)
    {
        return purpose switch
        {
            TransportPurpose.ToBurialPreparation => DeceasedProcessStatus.EndTransportBurialPreparation,
            TransportPurpose.ToBurialBody => DeceasedProcessStatus.EndTransportBurialEntity,
            _ => throw new ApplicationException(UserMessage.UnknownTransportDestination)
        };
    }
}