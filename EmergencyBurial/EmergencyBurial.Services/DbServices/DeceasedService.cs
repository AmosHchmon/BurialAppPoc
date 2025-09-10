using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmergencyBurial.Services.DbServices;

public class DeceasedService(EmergencyBurialContext ctx)
{
    public async Task<List<Deceased>> GetDeceaseds()
    {
        var deceaseds = await ctx.Deceaseds
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();

        return deceaseds;
    }

    public async Task<Deceased> GetDeceased(Guid? id)
    {
        var deceased = await ctx.Deceaseds
            .Include(d => d.BagDetails)
            .Include(d => d.OperationalDetails)
            .Include(d => d.BurialDetails)
            .Include(d => d.BurialCoordination)
            .Include(d => d.Transports)
            .FirstOrDefaultAsync(d => d.Id == id);
        
        return deceased;
    }

    public async Task<bool> DeceasedExistsAsync(Guid? id)
    {
        return await ctx.Deceaseds.AnyAsync(d => d.Id == id);
    }
}