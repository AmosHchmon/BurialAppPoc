using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Helpers;
using Core.Resources;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmergencyBurial.Services.DbServices;

public class DeceasedService(EmergencyBurialContext ctx)
{
    public async Task<List<Deceased>> GetDeceaseds()
    {
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();
    }

    public async Task<Deceased> GetDeceased(Guid? id)
    {
        var deceased = await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .FirstOrDefaultAsync(d => d.Id == id);

        return deceased;
    }

    public async Task<Deceased> CreateDeceased(Deceased deceased, Guid? userId = null, Guid? eventId = null)
    {
        deceased.UpdateBy = userId;
        deceased.EventId = eventId;
        deceased.CreatedOn = DateTime.Now;
        deceased.ProcessStatus = ProcessStatus.PoliceIntake;
        
        if (deceased.DeceasedBags != null)
        {
            foreach (var bag in deceased.DeceasedBags)
            {
                bag.BagNumber = new Random().Next(100000, 999999).ToString();
            }
        }
        
        await ctx.Deceaseds.AddAsync(deceased);

        await ctx.SaveChangesAsync();

        return deceased;
    }

    public async Task UpdateDeceased(Deceased deceased, Guid? userId = null)
    {
        deceased.UpdateBy = userId;
        deceased.UpdateOn = DateTime.Now;

        ctx.Deceaseds.Update(deceased);

        await ctx.SaveChangesAsync();
    }

    public async Task DeleteDeceased(Guid id)
    {
        await ctx.Deceaseds.Where(x => x.Id == id).ExecuteDeleteAsync();
    }

    public async Task<DeceasedBurialCoordination> UpdateBurialCoordination(
        DeceasedBurialCoordination deceasedBurialCoordination)
    {
        ctx.DeceasedBurialCoordination.Update(deceasedBurialCoordination);

        await ctx.SaveChangesAsync();

        return deceasedBurialCoordination;
    }

    public async Task UpdateDetails(DeceasedBurialDetails deceasedBurialDetails)
    {
        ctx.DeceasedBurialDetails.Update(deceasedBurialDetails);

        await ctx.SaveChangesAsync();
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
            .Include(d => d.Deceased)
            .ThenInclude(d => d.DeceasedTaharahDetails)
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

    public async Task<Deceased> GetDeceasedByBagNumber(string bagNumber)
    {
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .FirstOrDefaultAsync(d => d.DeceasedBags.Any(b => b.BagNumber == bagNumber));
    }
}