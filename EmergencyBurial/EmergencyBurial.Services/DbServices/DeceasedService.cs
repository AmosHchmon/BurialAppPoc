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
            .Include(d => d.DeceasedBagDetails)
            .Include(d => d.DeceasedBurialProcessStatus)
            .Include(d => d.DeceasedBurialDetails)
            .Include(d => d.DeceasedBurialCoordination)
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

    public async Task UpdateDeceased(Deceased deceased)
    {
        try
        {
            ctx.Deceaseds.Update(deceased);

            await ctx.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new ApplicationException(UserMessage.ErrorSave, ex);
        }
    }

    public async Task DeleteDeceased(Guid id)
    {
        await ctx.Deceaseds.Where(x => x.Id == id).ExecuteDeleteAsync();
    }

    public async Task<bool> DeceasedExistsAsync(Guid? id)
    {
        return await ctx.Deceaseds.AnyAsync(d => d.Id == id);
    }

    public async Task<DeceasedBurialCoordination> UpdateBurialCoordination(DeceasedBurialCoordination deceasedBurialCoordination)
    {
        try
        {
            ctx.DeceasedBurialCoordination.Update(deceasedBurialCoordination);

            await ctx.SaveChangesAsync();

            return deceasedBurialCoordination;
        }
        catch (Exception ex)
        {
            throw new ApplicationException(UserMessage.ErrorSave, ex);
        }
    }

    public async Task<DeceasedBurialProcessStatus> UpdateBurialProcessStatus(DeceasedBurialProcessStatus deceasedBurialProcessStatus)
    {
        try
        {
            ctx.DeceasedBurialProcessStatus.Update(deceasedBurialProcessStatus);

            await ctx.SaveChangesAsync();

            return deceasedBurialProcessStatus;
        }
        catch (Exception ex)
        {
            throw new ApplicationException(UserMessage.ErrorSave, ex);
        }
    }
}