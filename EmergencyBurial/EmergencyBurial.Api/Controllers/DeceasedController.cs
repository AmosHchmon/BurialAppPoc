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
[Authorize(Roles = nameof(OrganizationType.Tarah) + ","
                                                  + nameof(OrganizationType.Hamal) + ","
                                                  + nameof(OrganizationType.DatServices),
    Policy = nameof(RoleAccessType.Edit))]
public class DeceasedController(DeceasedService deceasedService, IMapper mapper) : ControllerBase
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