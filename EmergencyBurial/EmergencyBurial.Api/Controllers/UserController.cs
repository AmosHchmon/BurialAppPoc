using System;
using System.Threading.Tasks;
using AutoMapper;
using Core.Helpers;
using EmergencyBurial.Api.ViewModel;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

public class UserController : ControllerBase
{
    private readonly UserService userService;
    private readonly IMapper mapper;
    
    public UserController(UserService userService, IMapper mapper)
    {
        this.userService = userService;
        this.mapper = mapper;
    }

    #region [Anonymous]
    [HttpPut("login")]
    [AllowAnonymous]
    public ActionResult Login(UserOtpDto userOtp)
    {

        if(userOtp == null)
        {
            return BadRequest();
        }

        var userOtpObj = this.mapper.Map<UserOtp>(userOtp);

        var member = accountService.VerifyMember(userOtpObj);

        if (member == null)
            return Unauthorized();

        var token = accountService.CreateToken(member);

        return Ok(new
        {
            Token = token
        });
    }

    [HttpPut("otp")]
    [AllowAnonymous]
    public async Task<ActionResult> CreateOtp([FromBody] UserOtpDto userOtp)
    {

        if (userOtp == null)
        {
            return BadRequest();
        }

        var userOtpObj = this.mapper.Map<UserOtp>(userOtp);

        var member = await accountService.CreateOtp(userOtpObj);

        if (member == null)
            return Unauthorized();

        return Ok();
    }

    [HttpGet]
    public ActionResult GetMember()
    { 
        var memberId = new Guid(User.ClaimValue(ClaimHelper.UserId));
            
        var member = memberService.GetMemberById(memberId);
            
        var result = mapper.Map<UserDto>(member);
            
        return Ok(result);
    }

    [HttpPut]
    public async Task<ActionResult<UserDto>> UpdateMember([FromBody] UserDto obj)
    {
        if (obj == null)
        {
            return BadRequest();
        }
            
        var councilId = Convert.ToInt32(User.ClaimValue(ClaimHelper.CouncilId));
            
        var member = mapper.Map<Member>(obj);
            
        var result = await memberService.UpdateMemberProfile(member, councilId);

        return Ok(mapper.Map<UserDto>(result));
    }
        
    #endregion
}