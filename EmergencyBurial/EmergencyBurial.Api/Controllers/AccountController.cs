using System;
using AutoMapper;
using Core.Helpers;
using DataModel.Entities;
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
    #region [Anonymous]

    [HttpPut("login")]
    [AllowAnonymous]
    public ActionResult<AuthUserDto> Login([FromBody] MemberDto memberDto)
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
            Policy = (RoleAccessType)result.RoleAccessTypeId
        };

        return Ok(user);
    }

    /*[HttpPut("otp")]
    [AllowAnonymous]
    public async Task<ActionResult> CreateOtp([FromBody] UserOtpDto userOtp)
    {

        if (userOtp == null)
        {
            return BadRequest();
        }

        var userOtpObj = mapper.Map<UserOtp>(userOtp);

        var member = await authService.CreateOtp(userOtpObj);

        if (member == null)
            return Unauthorized();

        return Ok();
    }*/

    #endregion
}