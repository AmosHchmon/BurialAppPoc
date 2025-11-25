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
            .FirstOrDefaultAsync(d => d.Id == id);

        return deceased;
    }

    public async Task<Deceased> CreateDeceased(Deceased deceased)
    {
        throw new Exception("Booo! Database exploded.");
        
        await ctx.Deceaseds.AddAsync(deceased);

        await ctx.SaveChangesAsync();

        return deceased;
    }

    public async Task UpdateDeceased(Deceased deceased)
    {
        ctx.Deceaseds.Update(deceased);

        await ctx.SaveChangesAsync();
    }

    public async Task DeleteDeceased(Guid id)
    {
        await ctx.Deceaseds.Where(x => x.Id == id).ExecuteDeleteAsync();
    }

    public async Task<bool> DeceasedExistsAsync(Guid? id)
    {
        return await ctx.Deceaseds.AnyAsync(d => d.Id == id);
    }

    public async Task<DeceasedBurialCoordination> UpdateBurialCoordination(
        DeceasedBurialCoordination deceasedBurialCoordination)
    {
        ctx.DeceasedBurialCoordination.Update(deceasedBurialCoordination);

        await ctx.SaveChangesAsync();

        return deceasedBurialCoordination;
    }

    public async Task<DeceasedBurialCoordination> GetBurialCoordination(Guid? deceasedId)
    {
        var burialCoordination = await ctx.DeceasedBurialCoordination
            .FirstOrDefaultAsync(d => d.DeceasedId == deceasedId);

        return burialCoordination;
    }

    public async Task<DeceasedBurialProcessStatus> GetBurialProcess(Guid? deceasedId)
    {
        var burialProcessStatus = await ctx.DeceasedBurialProcessStatus
            .FirstOrDefaultAsync(d => d.DeceasedId == deceasedId);

        return burialProcessStatus;
    }

    public async Task<DeceasedBurialDetails> GetBurialDetails(Guid? deceasedId)
    {
        var burialDetails = await ctx.DeceasedBurialDetails
            .FirstOrDefaultAsync(d => d.DeceasedId == deceasedId);

        return burialDetails;
    }


    public async Task<DeceasedBurialProcessStatus> UpdateBurialProcessStatus(
        DeceasedBurialProcessStatus deceasedBurialProcessStatus)
    {
        ctx.DeceasedBurialProcessStatus.Update(deceasedBurialProcessStatus);

        await ctx.SaveChangesAsync();

        return deceasedBurialProcessStatus;
    }
}