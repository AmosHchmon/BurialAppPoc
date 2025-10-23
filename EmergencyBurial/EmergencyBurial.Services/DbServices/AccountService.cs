using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Core.Config;
using Core.Helpers;
using DataModel;
using DataModel.Entities;
using Microsoft.IdentityModel.Tokens;

namespace EmergencyBurial.Services.DbServices;

public class AccountService(AuthConfiguration authConfig, EmergencyBurialContext ctx)
{
    public Member VerifyMember(Member member)
    {
        return ctx.Members.SingleOrDefault(x => x.UserName == member.UserName && x.Mail == member.Mail && x.IsActive);
    }

    public string CreateToken(Member member)
    {
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authConfig.SecurityKey));

        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        var OU = (OrganizationType)member.OrganizationTypeId;
        var permission = (RoleAccessType)member.RoleAccessTypeId;

        var claims = new List<Claim>
        {
            new Claim(ClaimHelper.UserId, member.Id.ToString()),
            new Claim(ClaimTypes.Name, member.UserName),
            new Claim(ClaimTypes.Email, member.Mail),
            new Claim(ClaimTypes.Role, OU.ToString()),
            new Claim(ClaimHelper.Permission, permission.ToString()),
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