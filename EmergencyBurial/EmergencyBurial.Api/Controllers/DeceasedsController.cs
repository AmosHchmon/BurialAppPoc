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
[Authorize(Roles = nameof(OrganizationType.Tarah), Policy = nameof(RoleAccessType.View))]
public class DeceasedsController(DeceasedService deceasedService, IMapper mapper) : ControllerBase
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
        if (!Guid.TryParse(id, out Guid deceasedId))
        {
            return BadRequest();
        }

        var deceased = await deceasedService.GetDeceased(deceasedId);

        return Ok(mapper.Map<DeceasedDto>(deceased));
    }

    [HttpPost]
    public async Task<ActionResult<DeceasedDto>> CreateDeceased(DeceasedDto deceasedDto)
    {
        if (deceasedDto == null)
        {
            return BadRequest();
        }

        deceasedDto.HalalNumber = $"C-{DateTime.Now.Ticks}";

        var deceased = mapper.Map<Deceased>(deceasedDto);

        await deceasedService.CreateDeceased(deceased);

        return Ok();
    }

    [HttpPut]
    public async Task<ActionResult<DeceasedDto>> UpdateDeceased([FromBody] DeceasedDto deceasedDto)
    {
        if (deceasedDto == null)
        {
            return BadRequest();
        }

        var deceased = mapper.Map<Deceased>(deceasedDto);

        await deceasedService.UpdateDeceased(deceased);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteDeceased(string id)
    {
        if (!Guid.TryParse(id, out Guid idValue))
        {
            return BadRequest();
        }

        await deceasedService.DeleteDeceased(idValue);

        return Ok();
    }

    [HttpPut("burial-coordination")]
    public async Task<ActionResult> UpdateBurialCoordination([FromBody] BurialCoordinationDto burialCoordinationDto)
    {
        if (burialCoordinationDto == null)
        {
            return BadRequest();
        }

        var burialCoordination = mapper.Map<BurialCoordination>(burialCoordinationDto);

        var result = await deceasedService.UpdateBurialCoordination(burialCoordination);

        return Ok(mapper.Map<BurialCoordinationDto>(result));
    }
}