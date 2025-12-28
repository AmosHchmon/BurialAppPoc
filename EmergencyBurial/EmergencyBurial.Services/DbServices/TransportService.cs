using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Resources;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmergencyBurial.Services.DbServices;

public class TransportService(EmergencyBurialContext ctx)
{
    public async Task<List<Transport>> GetTransportsByBagDetailsId(Guid? deceasedBagId)
    {
        return await ctx.Transports
            .Where(t => t.DeceasedBagId == deceasedBagId)
            .Include(t => t.DeceasedBag)
            .ThenInclude(b => b.Deceased)
            .OrderByDescending(t => t.StartDateTime)
            .ToListAsync();
    }

    public async Task<Transport> CreateTransport(Transport transport)
    {
        ctx.Transports.Add(transport);

        await ctx.SaveChangesAsync();

        return transport;
    }
}