using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Core.Helpers;
using EmergencyBurial.Api.ViewModel;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[ApiController]
[Authorize(Roles = nameof(OrganizationType.Tarah) + "," +
                   nameof(OrganizationType.DatServices) + "," +
                   nameof(OrganizationType.Moked),
    Policy = nameof(RoleAccessType.Edit))]
public class TarahController(TarahService tarahService, IMapper mapper) : ControllerBase
{
    [HttpGet("pending")]
    public async Task<ActionResult<List<TarahListDto>>> GetPending()
    {
        int? stationId = null;

        if (!User.IsInRole(nameof(OrganizationType.DatServices)))
        {
            stationId = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));
        }

        var entities = await tarahService.GetPendingList(stationId);

        return Ok(mapper.Map<List<TarahListDto>>(entities));
    }

    [HttpGet("active")]
    public async Task<ActionResult<List<TarahListDto>>> GetActive()
    {
        int? stationId = null;

        if (!User.IsInRole(nameof(OrganizationType.DatServices)))
        {
            stationId = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));
        }

        var entities = await tarahService.GetActiveList(stationId);

        return Ok(mapper.Map<List<TarahListDto>>(entities));
    }

    [HttpGet("released")]
    public async Task<ActionResult<List<TarahListDto>>> GetReleased()
    {
        int? stationId = null;
        
        if (!User.IsInRole(nameof(OrganizationType.DatServices)))
        {
            stationId = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));
        }

        var entities = await tarahService.GetReleasedList(stationId);

        return Ok(mapper.Map<List<TarahListDto>>(entities));
    }

    [HttpPut("receive/{deceasedId}")]
    public async Task<ActionResult> ReceiveDeceasedToTarah(string deceasedId)
    {
        if (!Guid.TryParse(deceasedId, out Guid idValue))
        {
            return BadRequest();
        }

        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));
        var stationId = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));
        
        await tarahService.ReceiveDeceasedToTarah(idValue, stationId, userId);

        return Ok();
    }

    [HttpGet("details/{deceasedId}")]
    public async Task<ActionResult<TarahProcessDto>> GetDetails(string deceasedId)
    {
        if (!Guid.TryParse(deceasedId, out Guid idValue))
        {
            return BadRequest();
        }
        
        var entity = await tarahService.GetDeceasedForEdit(idValue);

        return Ok(mapper.Map<TarahProcessDto>(entity));
    }

    [HttpPut("update-details")]
    public async Task<ActionResult> UpdateDetails(TarahProcessDto dto)
    {
        if (dto == null)
            return BadRequest();

        var deceased = await tarahService.GetDeceasedForEdit(dto.DeceasedId);

        mapper.Map(dto, deceased);

        await tarahService.UpdateFullDeceased();

        return Ok();
    }

    [HttpPut("release/{deceasedId}")]
    public async Task<ActionResult> ReleaseFromTarah(string deceasedId)
    {
        if (!Guid.TryParse(deceasedId, out Guid idValue))
        {
            return BadRequest();
        }
        
        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));
        
        //await tarahService.ReleaseFromTarah(idValue, userId);

        return Ok();
    }
}