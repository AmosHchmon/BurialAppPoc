using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Common.Helpers;
using Core.Config;
using Core.Helpers;
using Core.Resources;
using DataModel;
using DataModel.Entities;
using DataModel.Entities.System;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace EmergencyBurial.Services.DbServices;

public class AccountService(
    EmergencyBurialContext ctx,
    AuthConfiguration authConfig,
    EmailConfiguration emailConfig,
    SmsConfiguration smsConfig,
    EmailHandler emailHandler,
    SmsHandler smsHandler)
{
    public Member VerifyMember(Member member)
    {
        return ctx.Members.SingleOrDefault(x =>
                x.OtpNumber == member.OtpNumber &&
                x.OtpExpired > DateTime.Now.AddMinutes(-20) &&
                x.IsActive &&
                x.Mail.Trim().ToLower() == member.Mail.Trim().ToLower());
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
            new Claim(ClaimHelper.StationId, member.StationId.ToString()),
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

    public async Task<Member> CreateOtp(UserOtp userOtp)
    {
        try
        {
            var member = await ctx.Members.FirstOrDefaultAsync(x =>
                x.UserName.Trim().ToLower() == userOtp.UserName.Trim().ToLower().PadLeft(9, '0') && x.IsActive);

            if (member == null)
                throw new ApplicationException(UserMessage.UserNotExist);

            member = await ctx.Members.FirstOrDefaultAsync(x =>
                x.UserName.Trim().ToLower() == userOtp.UserName.Trim().ToLower().PadLeft(9, '0') &&
                (x.PhoneNumber == userOtp.PhoneNumber || x.Mail == userOtp.Mail) && x.IsActive);

            if (member == null)
                throw new ApplicationException(UserMessage.CerdError);

            member.OtpNumber = new Random().Next(111111, 999999).ToString();

            member.OtpExpired = DateTime.Now.AddMinutes(20);

            if (userOtp.IsSmsMethod)
            {
                if (member.PhoneNumber == null)
                    throw new ApplicationException(UserMessage.PhoneNumberNotExists);

                if (member.PhoneNumber != userOtp.PhoneNumber)
                    throw new ApplicationException(UserMessage.CerdError);

                string content = string.Format(smsConfig.SmsOtpMessage.Content, member.FullName, member.OtpNumber);

                string url = string.Format(smsConfig.SmsConfig.Url,
                    smsConfig.SmsConfig.Username,
                    smsConfig.SmsConfig.Token,
                    smsConfig.SmsConfig.SenderCellNumber,
                    member.PhoneNumber,
                    content,
                    smsConfig.SmsConfig.IgnoreUnsubscribeCheck);

                // TODO: Remove the comment when sms will be available
                //await smsHandler.SendSms(url);
            }
            else
            {
                if (member == null || member.Mail.Trim().ToLower() != userOtp.Mail.Trim().ToLower())
                    throw new ApplicationException(UserMessage.CerdError);

                string subject = emailConfig.UserOtp.Subject;
                string body = string.Format(emailConfig.UserOtp.Body, member.OtpNumber);

                emailHandler.SendEmail(userOtp.Mail, subject, body);
            }

            ctx.Members.Update(member);

            ctx.SaveChanges();

            return member;
        }
        catch (ApplicationException)
        {
            throw;
        }
        catch (Exception ex)
        {
            throw new ApplicationException(UserMessage.ErrorAuth, ex);
        }
    }

    public Member VerifyMemberWithPassword(Member memberInput)
    {
        var member = ctx.Members.SingleOrDefault(x => 
            x.UserName == memberInput.UserName && 
            x.Mail == memberInput.Mail && 
            x.IsActive);
        
        if (member == null)
            throw new ApplicationException(UserMessage.CerdError);
        
        if (string.IsNullOrEmpty(member.Password))
            return null;

        var isValid = PasswordHelper.VerifyPassword(memberInput.Password, member.Password);
        
        return !isValid ? null : member;
    }
}