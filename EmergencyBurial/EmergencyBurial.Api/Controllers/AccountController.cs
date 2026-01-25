using System;
using System.Threading.Tasks;
using AutoMapper;
using Core.Helpers;
using DataModel.Entities;
using DataModel.Entities.System;
using EmergencyBurial.Api.ViewModel;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[ApiController]
[Authorize]
public class AccountController(AccountService accountService, IMapper mapper) : ControllerBase
{
    #region [NotAnonymous]
    
    [HttpPost("logout")]
    public ActionResult<bool> Logout()
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None
        };
        
        Response.Cookies.Delete("user_token", cookieOptions);

        return Ok(true);
    }
    
    #endregion
    
    #region [Anonymous]

    [HttpPut("login")]
    [AllowAnonymous]
    public ActionResult<AuthUserDto> Login(MemberDto memberDto)
    {
        if (memberDto == null)
        {
            return BadRequest();
        }

        var member = mapper.Map<Member>(memberDto);

        var result = accountService.VerifyMember(member);

        if (result == null)
            return Unauthorized();

        var token = accountService.CreateToken(result);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTimeOffset.UtcNow.AddDays(1)
        };

        Response.Cookies.Append("user_token", token, cookieOptions);
        
        var user = new AuthUserDto()
        {
            FullName = result.FullName,
            OUnit = (OrganizationType)result.OrganizationTypeId,
            Policy = (RoleAccessType)result.RoleAccessTypeId,
            OrganizationDesc = ((OrganizationType)result.OrganizationTypeId).GetEnumDescription(),
            StationDesc = result.Station?.Text ?? string.Empty
        };

        return Ok(user);
    }
    
    [HttpPut("login-with-password")]
    [AllowAnonymous]
    public ActionResult<AuthUserDto> LoginWithPassword(MemberDto memberDto)
    {
        if (memberDto == null)
        {
            return BadRequest();
        }

        var member = mapper.Map<Member>(memberDto);

        var result = accountService.VerifyMemberWithPassword(member);

        if (result == null)
            return Unauthorized();

        var token = accountService.CreateToken(result);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTimeOffset.UtcNow.AddDays(1)
        };

        Response.Cookies.Append("user_token", token, cookieOptions);

        var user = new AuthUserDto()
        {
            FullName = result.FullName,
            OUnit = (OrganizationType)result.OrganizationTypeId,
            Policy = (RoleAccessType)result.RoleAccessTypeId,
            OrganizationDesc = ((OrganizationType)result.OrganizationTypeId).GetEnumDescription(),
            StationDesc = result.Station?.Text ?? string.Empty
        };

        return Ok(user);
    }

    [HttpPut("otp")]
    [AllowAnonymous]
    public async Task<ActionResult> CreateOtp(UserOtpDto userOtp)
    {
        if (userOtp == null)
        {
            return BadRequest();
        }

        var userOtpObj = mapper.Map<UserOtp>(userOtp);

        var member = await accountService.CreateOtp(userOtpObj);

        if (member == null)
            return Unauthorized();

        return Ok();
    }

    #endregion
}