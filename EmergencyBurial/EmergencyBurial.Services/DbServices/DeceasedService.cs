using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Resources;
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

    public async Task<Deceased> CreateDeceased(Deceased deceased)
    {
        try
        {
            await ctx.Deceaseds.AddAsync(deceased);

            await ctx.SaveChangesAsync();

            return deceased;
        }
        catch (Exception ex)
        {
            throw new ApplicationException(UserMessage.ErrorSave, ex);
        }
    }

    public async Task<Deceased> UpdateDeceased(Deceased deceased)
    {
        ctx.Deceaseds.Update(deceased);

        await ctx.SaveChangesAsync();

        return deceased;
    }
    
    public async Task DeleteDeceased(Guid id)
    {
        await ctx.Deceaseds.Where(x => x.Id == id).ExecuteDeleteAsync();
    }

    public async Task<bool> DeceasedExistsAsync(Guid? id)
    {
        return await ctx.Deceaseds.AnyAsync(d => d.Id == id);
    }
}