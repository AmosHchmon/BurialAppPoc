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
    public async Task<List<Member>> GetMembers()
    {
        var members = await ctx.Members.ToListAsync();

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
        ctx.Members.Update(member);

        await ctx.SaveChangesAsync();

        return member;
    }

    public async Task DeleteMember(Guid id)
    {
        await ctx.Members.Where(x => x.Id == id).ExecuteDeleteAsync();
    }
}