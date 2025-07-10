using AutoMapper;
using DataModel.Entities;
using EmergencyBurial.Api.ViewModel;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[ApiController]
[Authorize]
public class AuthController : ControllerBase
{
    private readonly AuthService authService;
    private readonly IMapper mapper;

    public AuthController(AuthService authService, IMapper mapper)
    {
        this.authService = authService;
        this.mapper = mapper;
    }

    #region [Anonymous]

    [HttpPut("login")]
    [AllowAnonymous]
    public ActionResult Login([FromBody]UserDto userDto)
    {
        if (userDto == null)
        {
            return BadRequest();
        }

        var userObj = mapper.Map<User>(userDto);

        var user = authService.VerifyUser(userObj);

        if (user == null)
            return Unauthorized();

        var token = authService.CreateToken(user);

        return Ok(new
        {
            Token = token
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