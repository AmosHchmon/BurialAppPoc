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
    public async Task<IEnumerable<Transport>> GetTransportsByDeceasedId(int? deceasedId)
    {
        return await ctx.Transports
            .Where(t => t.DeceasedId == deceasedId)
            .Include(t => t.Deceased)
            .OrderByDescending(t => t.StartDateTime)
            .ToListAsync();
    }

    public async Task<Transport> CreateTransport(Transport transport)
    {
        try
        {
            ctx.Transports.Add(transport);

            await ctx.SaveChangesAsync();

            return transport;
        }
        catch (Exception ex)
        {
            throw new ApplicationException(UserMessage.ErrorSave, ex);
        }
    }
}