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
[Authorize(Roles = nameof(OrganizationType.Tarah) + "," + nameof(OrganizationType.DatServices),
    Policy = nameof(RoleAccessType.Edit))]
public class TarahController(TarahService tarahService, IMapper mapper) : ControllerBase
{
    [HttpGet("pending")]
    public async Task<ActionResult<List<TarahBagListDto>>> GetPending()
    {
        int? stationId = null;

        if (!User.IsInRole(nameof(OrganizationType.DatServices)))
        {
            stationId = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));
        }

        var entities = await tarahService.GetPendingList(stationId);

        return Ok(mapper.Map<List<TarahBagListDto>>(entities));
    }

    [HttpGet("active")]
    public async Task<ActionResult<List<TarahBagListDto>>> GetActive()
    {
        int? stationId = null;

        if (!User.IsInRole(nameof(OrganizationType.DatServices)))
        {
            stationId = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));
        }

        var entities = await tarahService.GetActiveList(stationId);

        return Ok(mapper.Map<List<TarahBagListDto>>(entities));
    }

    [HttpGet("released")]
    public async Task<ActionResult<List<TarahBagListDto>>> GetReleased()
    {
        int? stationId = null;
        
        if (!User.IsInRole(nameof(OrganizationType.DatServices)))
        {
            stationId = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));
        }

        var entities = await tarahService.GetReleasedList(stationId);

        return Ok(mapper.Map<List<TarahBagListDto>>(entities));
    }

    [HttpPut("receive")]
    public async Task<ActionResult> ReceiveDeceased(TarahIntakeDto dto)
    {
        if (dto == null)
        {
            return BadRequest();
        }

        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));
        var stationId = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));
        
        await tarahService.ReceiveBagToTarah(dto.BagNumber, stationId, userId);

        return Ok();
    }

    [HttpGet("details/{id}")]
    public async Task<ActionResult<TarahProcessDto>> GetDetails(string id)
    {
        var entity = await tarahService.GetBagForEdit(id);

        var res = mapper.Map<TarahProcessDto>(entity);

        return Ok(res);
    }

    [HttpPut("update-details")]
    public async Task<ActionResult> UpdateDetails(TarahProcessDto dto)
    {
        if (dto == null)
            return BadRequest();

        var bag = await tarahService.GetBagForEdit(dto.BagNumber);

        mapper.Map(dto, bag.Deceased);

        await tarahService.UpdateFullDeceased();

        return Ok();
    }

    [HttpPut("release/{bagNumber}")]
    public async Task<ActionResult> ReleaseFromTarah(string bagNumber)
    {
        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));
        
        await tarahService.ReleaseFromTarah(bagNumber, userId);

        return Ok();
    }
}