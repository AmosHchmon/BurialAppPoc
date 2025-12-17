using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Core.Helpers;
using DataModel.Entities;
using EmergencyBurial.Api.ViewModel;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[ApiController]
/*
[Authorize(Roles = nameof(OrganizationType.BurialPreparation), Policy = nameof(RoleAccessType.Admin))]
*/
public class TaharahsController(DeceasedService deceasedService, IMapper mapper) : ControllerBase
{
    [HttpGet("pending")]
    public async Task<ActionResult<List<DeceasedDto>>> GetPendingList()
    {
        var result = await deceasedService.GetPendingTaharahDeceaseds();

        return Ok(mapper.Map<List<DeceasedDto>>(result));
    }

    [HttpGet("history/{month}/{year}")]
    public async Task<ActionResult<List<DeceasedDto>>> GetHistoryList(string month, string year)
    {
        if (!int.TryParse(month, out int monthValue) || !int.TryParse(year, out int yearValue))
        {
            return BadRequest();
        }

        var result = await deceasedService.GetTaharahHistory(monthValue, yearValue);

        return Ok(mapper.Map<List<DeceasedDto>>(result));
    }

    [HttpPut("update-details")]
    public async Task<ActionResult> UpdateDeceasedDetails(DeceasedDto deceasedDto)
    {
        if (deceasedDto == null)
        {
            return BadRequest();
        }

        var deceased = mapper.Map<Deceased>(deceasedDto);

        await deceasedService.UpdateDeceased(deceased);

        return Ok();
    }

    [HttpPost("mark-as-buried/{id}")]
    public async Task<ActionResult> MarkAsBuried(string id)
    {
        if (!Guid.TryParse(id, out Guid deceasedId))
        {
            return BadRequest();
        }

        var burialDate = DateTime.Now;

        await deceasedService.MarkAsBuried(deceasedId, burialDate);

        return Ok();
    }
}