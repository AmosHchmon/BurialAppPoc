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
    public async Task<List<Transport>> GetTransportsByDeceasedId(Guid? deceasedId)
    {
        return await ctx.Transports
            .Where(t => t.DeceasedId == deceasedId)
            .Include(t => t.Deceased)
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