using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
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
    public ActionResult Login([FromBody] MemberDto memberDto)
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

        return Ok(memberDto);
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

    [HttpGet("members")]
    public async Task<ActionResult<List<MemberDto>>> GetMembers()
    {
        var list = await accountService.GetMembers();

        return Ok(mapper.Map<List<MemberDto>>(list));
    }

    [HttpPost]
    public async Task<ActionResult<MemberDto>> CreateMember([FromBody] MemberDto memberDto)
    {
        if (memberDto == null)
        {
            return BadRequest();
        }

        var member = mapper.Map<Member>(memberDto);

        await accountService.AddMember(member);

        return Ok();
    }

    [HttpPut]
    public async Task<ActionResult<MemberDto>> UpdateMember([FromBody] MemberDto memberDto)
    {
        if (memberDto == null)
        {
            return BadRequest();
        }

        var member = mapper.Map<Member>(memberDto);

        await accountService.UpdateMember(member);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMember(string id)
    {
        if (!Guid.TryParse(id, out Guid idValue))
        {
            return BadRequest();
        }
        
        await accountService.DeleteMember(idValue);

        return Ok();
    
    }
}