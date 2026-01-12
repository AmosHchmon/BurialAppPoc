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
[Authorize(Roles = nameof(OrganizationType.Tarah) + "," + nameof(OrganizationType.Hamal), Policy = nameof(RoleAccessType.View))]
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

        var deceased = mapper.Map<Deceased>(deceasedDto);
        
        deceased.UpdateBy = new Guid(User.ClaimValue(ClaimHelper.UserId));
        deceased.UpdateOn = DateTime.Now;

        await deceasedService.CreateDeceased(deceased);

        return Ok();
    }

    [HttpPut]
    public async Task<ActionResult<DeceasedDto>> UpdateDeceased(DeceasedDto deceasedDto)
    {
        if (deceasedDto == null)
        {
            return BadRequest();
        }

        var deceased = mapper.Map<Deceased>(deceasedDto);
        
        deceased.UpdateBy = new Guid(User.ClaimValue(ClaimHelper.UserId));
        deceased.UpdateOn = DateTime.Now;

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

    [HttpGet("burial-coordination/{id}")]
    public async Task<ActionResult<DeceasedBurialCoordinationDto>> GetBurialCoordination(string id)
    {
        if (!Guid.TryParse(id, out Guid deceasedId))
        {
            return BadRequest();
        }

        var burialCoordination = await deceasedService.GetBurialCoordination(deceasedId);

        return Ok(mapper.Map<DeceasedBurialCoordinationDto>(burialCoordination));
    }

    [HttpPut("burial-coordination")]
    public async Task<ActionResult<DeceasedBurialCoordinationDto>> UpdateBurialCoordination(
        [FromBody] DeceasedBurialCoordinationDto deceasedBurialCoordinationDto)
    {
        if (deceasedBurialCoordinationDto == null)
        {
            return BadRequest();
        }

        var burialCoordination = mapper.Map<DeceasedBurialCoordination>(deceasedBurialCoordinationDto);

        var result = await deceasedService.UpdateBurialCoordination(burialCoordination);

        return Ok(mapper.Map<DeceasedBurialCoordinationDto>(result));
    }

    [HttpGet("burial-process/{id}")]
    public async Task<ActionResult<DeceasedBurialCoordinationDto>> GetBurialProcess(string id)
    {
        if (!Guid.TryParse(id, out Guid deceasedId))
        {
            return BadRequest();
        }
        
        var burialProcess = await deceasedService.GetBurialProcess(deceasedId);

        return Ok(mapper.Map<DeceasedBurialProcessStatusDto>(burialProcess));
    }
    
    [HttpPut("burial-process")]
    public async Task<ActionResult<DeceasedBurialProcessStatusDto>> UpdateBurialProcessStatus(
        [FromBody] DeceasedBurialProcessStatusDto deceasedBurialProcessStatusDto)
    {
        if (deceasedBurialProcessStatusDto == null)
        {
            return BadRequest();
        }

        var burialProcessStatus = mapper.Map<DeceasedBurialProcessStatus>(deceasedBurialProcessStatusDto);

        var result = await deceasedService.UpdateBurialProcessStatus(burialProcessStatus);

        return Ok(mapper.Map<DeceasedBurialProcessStatusDto>(result));
    }
    
    [HttpGet("burial-details/{id}")]
    public async Task<ActionResult<DeceasedBurialDetailsDto>> GetBurialDetails(string id)
    {
        if (!Guid.TryParse(id, out Guid deceasedId))
        {
            return BadRequest();
        }

        var burialDetails = await deceasedService.GetBurialDetails(deceasedId);
        
        return Ok(mapper.Map<DeceasedBurialDetailsDto>(burialDetails));
    }
}