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

public class AuthService
{
    private readonly AuthConfiguration authConfig;
    
    public AuthService(AuthConfiguration authConfig)
    {
        this.authConfig = authConfig;
    }

    public User VerifyUser(User user)
    {
        if (user.UserName == "testuser" && user.Mail == "password123")
        {
            return new User
            {
                Id = Guid.NewGuid(),
                UserName = "testuser",
                FullName = "Test User",
                Mail = "test@example.com",
                PhoneNumber = "0501234567",
                OtpNumber = null,
                OtpExpired = null,
                IsActive = true,
                MemberTypeId = 1,
                CouncilId = 1
            };
        }

        return null;
    }

    public string CreateToken(User user)
    {
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authConfig.SecurityKey));

        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(ClaimHelper.UserId, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Mail)
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