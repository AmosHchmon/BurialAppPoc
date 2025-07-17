using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Config;
using Core.Helpers;
using DataModel.Entities;
using Microsoft.IdentityModel.Tokens;

namespace EmergencyBurial.Services.DbServices;

public class AccountService
{
    private readonly AuthConfiguration authConfig;
    
    public AccountService(AuthConfiguration authConfig)
    {
        this.authConfig = authConfig;
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
            new Claim(ClaimTypes.Email, member.Mail)
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