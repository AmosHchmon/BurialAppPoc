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

    [HttpPost("add-deceased")]
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

    [HttpPut("update-deceased")]
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

    [HttpDelete("delete-deceased/{id}")]
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

    [HttpPost("add-bag")]
    public async Task<ActionResult<DeceasedBagDto>> AddBag(DeceasedBagDto bagDto)
    {
        if (bagDto == null)
        {
            return BadRequest();
        }

        var bag = mapper.Map<DeceasedBag>(bagDto);

        var res = await deceasedService.AddBag(bag);

        return Ok(mapper.Map<DeceasedBagDto>(res));
    }

    [HttpPut("update-bag")]
    public async Task<ActionResult> UpdateBag(DeceasedBagDto bagDto)
    {
        if (bagDto == null)
        {
            return BadRequest();
        }

        var bag = await deceasedService.GetBagForUpdate(bagDto.BagNumber);

        mapper.Map(bagDto, bag);

        await deceasedService.UpdateBag();

        return Ok();
    }
}