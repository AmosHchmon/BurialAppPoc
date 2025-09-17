using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Core.Config;
using Core.Helpers;
using Core.Resources;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace EmergencyBurial.Services.DbServices;

public class AccountService(AuthConfiguration authConfig, EmergencyBurialContext ctx)
{
    public async Task<List<Member>> GetMembers()
    {
        var members = await ctx.Members.ToListAsync();

        return members;
    }

    public async Task<Member> AddMember(Member member)
    {
        try
        {
            await ctx.Members.AddAsync(member);

            await ctx.SaveChangesAsync();

            return member;
        }
        catch (Exception ex)
        {
            throw new ApplicationException(UserMessage.ErrorSave, ex);
        }
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

    public Member VerifyMember(Member member)
    {
        if (member.UserName == "test" && member.Mail.ToLower() == "ozs@dat.gov.il")
        {
            return new Member
            {
                Id = Guid.NewGuid(),
                UserName = "test",
                FullName = "Test User",
                Mail = "ozs@dat.gov.il",
                PhoneNumber = "0501234567",
            };
        }

        return null;
    }

    public string CreateToken(Member member)
    {
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authConfig.SecurityKey));

        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(ClaimHelper.UserId, member.Id.ToString()),
            new Claim(ClaimTypes.Name, member.UserName),
            new Claim(ClaimTypes.Email, member.Mail),
            new Claim(ClaimTypes.Role, "Admin"),
        };

        var tokeOptions = new JwtSecurityToken(
            issuer: authConfig.Issuer,
            audience: authConfig.Audience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(authConfig.Expires),
            signingCredentials: signinCredentials
        );

        var Jwtoken = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

        return Jwtoken;
    }
}