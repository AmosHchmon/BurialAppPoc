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

    #region Deceased

    public async Task<List<Deceased>> GetDeceaseds()
    {
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();
    }
    
    
    public async Task<Deceased> GetDeceased(Guid? id)
    {
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task<Deceased> GetDeceasedForUpdate(Guid? id)
    {
        return await ctx.Deceaseds
            .AsTracking()
            .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task<Deceased> CreateDeceased(Deceased deceased, Guid? userId = null, Guid? eventId = null)
    {
        deceased.UpdateBy = userId;
        deceased.EventId = eventId;
        deceased.CreatedOn = DateTime.Now;
        deceased.ProcessStatus = ProcessStatus.PoliceIntake;
        
        if (deceased.DeceasedBags != null)
        {
            GenerateBagNumber(deceased);
        }
        
        await ctx.Deceaseds.AddAsync(deceased);

        await ctx.SaveChangesAsync();

        return deceased;
    }

    public async Task UpdateDeceased(Deceased deceased, Guid? userId = null)
    {
        deceased.UpdateBy = userId;
        deceased.UpdateOn = DateTime.Now;
        
        if (deceased.DeceasedBags != null)
        {
            GenerateBagNumber(deceased);
        }
        
        await ctx.SaveChangesAsync();
    }
    
    public async Task ArchiveDeceased(Deceased deceased, Guid? userId)
    {
        deceased.UpdateBy = userId;
        deceased.UpdateOn = DateTime.Now;
        deceased.ProcessStatus = ProcessStatus.Archive;

        await ctx.SaveChangesAsync();
    }
    
    public async Task<Deceased> GetDeceasedByBagNumber(string bagNumber)
    {
        return await ctx.Deceaseds
            .Include(d => d.DeceasedBags)
            .FirstOrDefaultAsync(d => d.DeceasedBags.Any(b => b.BagNumber == bagNumber));
    }
    
    #endregion
    
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

    private void GenerateBagNumber(Deceased deceased)
    {
        foreach (var bag in deceased.DeceasedBags)
        {
            bag.BagNumber ??= $"C-{DateTime.Now.Ticks}";
        }
    }
}