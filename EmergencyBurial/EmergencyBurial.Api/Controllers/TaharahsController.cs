using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using EmergencyBurial.Api.ViewModel;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[ApiController]
/*
[Authorize(Roles = nameof(OrganizationType.BurialPreparation), Policy = nameof(RoleAccessType.Admin))]
*/
public class TaharahsController(TaharahService taharahService, IMapper mapper) : ControllerBase
{
    [HttpGet("pending")]
    public async Task<ActionResult<List<DeceasedDto>>> GetPending()
    {
        var result = await taharahService.GetPendingDeceaseds();

        return Ok(mapper.Map<List<DeceasedDto>>(result));
    }

    [HttpGet("history/{month}/{year}")]
    public async Task<ActionResult<List<DeceasedDto>>> GetActive(string month, string year)
    {
        if (!int.TryParse(month, out int monthValue) || !int.TryParse(year, out int yearValue))
        {
            return BadRequest();
        }

        var result = await taharahService.GetActiveDeceasedInTaharah(monthValue, yearValue);

        return Ok(mapper.Map<List<DeceasedDto>>(result));
    }

    [HttpPost("receive/{id}")]
    public async Task<ActionResult> ReceiveDeceased(string id)
    {
        if (!Guid.TryParse(id, out Guid idValue))
        {
            return BadRequest();
        }

        await taharahService.ReceiveDeceasedToTaharah(idValue);

        return Ok();
    }
}