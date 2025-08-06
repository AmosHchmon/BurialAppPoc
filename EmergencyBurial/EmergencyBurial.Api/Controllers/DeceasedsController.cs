using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DataModel.Entities;
using EmergencyBurial.Api.ViewModel;
using EmergencyBurial.Services.DbServices;
using EmergencyBurial.Services.RealTime;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[ApiController]
[Authorize]
public class DeceasedsController(
    DeceasedService deceasedService,
    NotificationService notificationService,
    IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<DeceasedDto>>> GetDeceaseds()
    {
        var res = await deceasedService.GetDeceaseds();

        return Ok(mapper.Map<List<DeceasedDto>>(res));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DeceasedDto>> GetDeceased(string id)
    {
        var res = await deceasedService.GetDeceased(id);

        if (res == null)
            return NotFound();

        return Ok(mapper.Map<DeceasedDto>(res));
    }

    [HttpPost("send-test-deceased")]
    public async Task<ActionResult<string>> SendTestDeceased([FromBody] DeceasedDto deceasedDto)
    {
        var deceased = mapper.Map<Deceased>(deceasedDto);

        await notificationService.SendDeceasedNotificationAsync(deceased);

        return Ok("ok");
    }
}