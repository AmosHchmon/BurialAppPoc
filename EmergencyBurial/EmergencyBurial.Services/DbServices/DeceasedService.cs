using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Resources;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EmergencyBurial.Services.DbServices;

public class DeceasedService(EmergencyBurialContext ctx, ILogger<DeceasedService> logger)
{
    public async Task<List<Deceased>> GetDeceaseds()
    {
        var deceaseds = await ctx.Deceaseds
            .OrderByDescending(d => d.CreatedOn)
            .ToListAsync();

        return deceaseds;
    }

    public async Task<Deceased> GetDeceased(int? id)
    {
        var deceased = await ctx.Deceaseds
            .FirstOrDefaultAsync(d => d.Id == id);

        if (deceased == null)
        {
            throw new ApplicationException(UserMessage.ErrorLoadData);
        }

        return deceased;
    }

    public async Task<bool> DeceasedExistsAsync(int? id)
    {
        return await ctx.Deceaseds.AnyAsync(d => d.Id == id);
    }
}