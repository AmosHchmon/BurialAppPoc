using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Resources;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmergencyBurial.Services.DbServices;

public class MemberService(EmergencyBurialContext ctx)
{
    public async Task<Member> GetMemberById(Guid? id)
    {
        return await ctx.Members.FirstOrDefaultAsync(m => m.Id == id);
    }
    
    public async Task<List<Member>> GetMembers()
    {
        var members = await ctx.Members
            .Include(m => m.Station)
            .ToListAsync();

        return members;
    }

    public async Task<Member> AddMember(Member member)
    {
        await ctx.Members.AddAsync(member);

        await ctx.SaveChangesAsync();

        return member;
    }

    public async Task<Member> UpdateMember(Member member)
    {
        try
        {
            ctx.Members.Update(member);

            await ctx.SaveChangesAsync();

            return member;
        }
        catch (Exception ex)
        {
            throw new ApplicationException(UserMessage.ErrorSave, ex);
        }
        
    }

    public async Task DeleteMember(Guid id)
    {
        await ctx.Members.Where(x => x.Id == id).ExecuteDeleteAsync();
    }
}