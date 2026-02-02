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
[Authorize(Roles = nameof(OrganizationType.DatServices),
    Policy = nameof(RoleAccessType.Edit))]
public class ManageController(DeceasedService deceasedService, IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<DeceasedDto>>> GetDeceaseds()
    {
        var res = await deceasedService.GetDeceaseds();

        return Ok(mapper.Map<List<DeceasedDto>>(res));
    }

    [HttpPost]
    public async Task<ActionResult<DeceasedDto>> CreateDeceased(DeceasedDto deceasedDto)
    {
        if (deceasedDto == null)
        {
            return BadRequest();
        }

        var deceased = mapper.Map<Deceased>(deceasedDto);

        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));
        var eventId = new Guid(User.ClaimValue(ClaimHelper.EventId));

        var res = await deceasedService.CreateDeceased(deceased, userId, eventId);

        return Ok(mapper.Map<DeceasedDto>(res));
    }

    [HttpPut]
    public async Task<ActionResult> UpdateDeceased(DeceasedDto deceasedDto)
    {
        if (deceasedDto == null)
            return BadRequest();

        var existingDeceased = await deceasedService.GetDeceasedForUpdate(deceasedDto.Id);
        
        mapper.Map(deceasedDto, existingDeceased);

        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));

        await deceasedService.UpdateDeceased(existingDeceased, userId);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteDeceased(string id)
    {
        if (!Guid.TryParse(id, out Guid idValue))
        {
            return BadRequest();
        }

        var existingDeceased = await deceasedService.GetDeceasedForUpdate(idValue);

        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));

        await deceasedService.ArchiveDeceased(existingDeceased, userId);

        return Ok();
    }
}