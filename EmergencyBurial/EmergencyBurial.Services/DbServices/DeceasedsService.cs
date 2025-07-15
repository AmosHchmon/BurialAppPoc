using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Resources;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EmergencyBurial.Services.DbServices;

public class DeceasedsService(EmergencyBurialContext ctx, ILogger<DeceasedsService> logger)
{
    public async Task<List<Deceased>> GetDeceaseds()
    {
        var deceaseds = await ctx.Deceaseds.ToListAsync();

        return deceaseds;
    }

    public async Task<Deceased> GetDeceased(int id)
    {
        var deceased = await ctx.Deceaseds
            .FirstOrDefaultAsync(d => d.Id == id);

        if (deceased == null)
        {
            throw new ApplicationException(UserMessage.ErrorLoadData);
        }

        return deceased;
    }
}