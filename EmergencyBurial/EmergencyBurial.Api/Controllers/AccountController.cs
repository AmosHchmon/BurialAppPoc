using System;
using AutoMapper;
using DataModel.Entities;
using EmergencyBurial.Api.ViewModel;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
    public ActionResult Login([FromBody]MemberDto memberDto)
    {
        if (memberDto == null)
        {
            return BadRequest();
        }

        var userObj = mapper.Map<Member>(memberDto);

        var user = accountService.VerifyUser(userObj);

        if (user == null)
            return Unauthorized();

        var token = accountService.CreateToken(user);
        
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTimeOffset.UtcNow.AddDays(7)
        };
        
        Response.Cookies.Append("user_token", token, cookieOptions);

        return Ok();
    }
    
    [HttpGet("protected-data")]
    public ActionResult GetProtectedData()
    {
        var userName = User.Identity.IsAuthenticated ? User.Identity.Name : "Unknown";
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var role = User.FindFirst(ClaimTypes.Role)?.Value;

        return Ok(new
        {
            Message = $"Hello, {userName}! You successfully accessed protected data.",
            UserId = userId,
            Role = role,
            Timestamp = DateTime.UtcNow
        });
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