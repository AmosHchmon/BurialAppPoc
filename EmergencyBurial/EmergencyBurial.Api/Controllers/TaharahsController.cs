using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DataModel.Entities;
using EmergencyBurial.Api.ViewModel;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[ApiController]
public class TaharahsController(TaharahService taharahService, IMapper mapper) : ControllerBase
{
    [HttpGet("pending")]
    public async Task<ActionResult<List<TaharahListDto>>> GetPending()
    {
        var entities = await taharahService.GetPendingDeceaseds();
        
        return Ok(mapper.Map<List<TaharahListDto>>(entities));
    }

    [HttpGet("active/{month}/{year}")]
    public async Task<ActionResult<List<TaharahListDto>>> GetActive(int month, int year)
    {
        var entities = await taharahService.GetActiveDeceasedInTaharah(month, year);
        
        return Ok(mapper.Map<List<TaharahListDto>>(entities));
    }
    
    [HttpGet("released/{month}/{year}")]
    public async Task<ActionResult<List<TaharahListDto>>> GetReleased(int month, int year)
    {
        var result = await taharahService.GetReleasedFromTaharah(month, year);
        
        return Ok(mapper.Map<List<TaharahListDto>>(result));
    }

    [HttpPut("receive")]
    public async Task<ActionResult> ReceiveDeceased(TaharahIntakeDto dto)
    {
        if (dto == null)
        {
            return BadRequest();
        }

        var entity = mapper.Map<DeceasedTaharahDetails>(dto);
        
        await taharahService.ReceiveDeceasedToTaharah(entity);

        return Ok();
    }

    [HttpGet("details/{id}")]
    public async Task<ActionResult<TaharahProcessDto>> GetDetails(string id)
    {
        if (!Guid.TryParse(id, out Guid idValue))
        {
            return BadRequest();
        }
        
        var entity = await taharahService.GetDeceasedForEdit(idValue);

        var res = mapper.Map<TaharahProcessDto>(entity);

        return Ok(res);
    }

    [HttpPut("update-details")]
    public async Task<ActionResult> UpdateDetails(TaharahProcessDto dto)
    {
        if (dto == null)
        {
            return BadRequest();
        }
        
        var entity = mapper.Map<DeceasedTaharahDetails>(dto);

        // TODO: Insert location by user
        // entity.TaharahLocation = UserLocation...
        
        await taharahService.UpdateTaharahDetails(entity);

        return Ok();
    }
    
    [HttpPost("release")]
    public async Task<ActionResult> ReleaseFromTaharah(TaharahProcessDto dto)
    {
        if (dto == null)
        {
            return BadRequest();
        }
        
        var entity = mapper.Map<DeceasedTaharahDetails>(dto);
        
        await taharahService.ReleaseFromTaharah(entity);
        
        return Ok();
    }
}