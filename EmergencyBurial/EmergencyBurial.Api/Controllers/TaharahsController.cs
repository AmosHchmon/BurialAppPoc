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
[Authorize(Roles = nameof(OrganizationType.BurialPreparation) + "," + nameof(OrganizationType.DatServices), Policy = nameof(RoleAccessType.Edit))]
public class TaharahsController(TaharahService taharahService, IMapper mapper) : ControllerBase
{
    [HttpGet("pending")]
    public async Task<ActionResult<List<TaharahListDto>>> GetPending()
    {
        int? stationId = null;

        if (User.IsInRole(nameof(OrganizationType.BurialPreparation)))
        {
            stationId = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));
        }
        var entities = await taharahService.GetPendingList(stationId);

        return Ok(mapper.Map<List<TaharahListDto>>(entities));
    }

    [HttpGet("active")]
    public async Task<ActionResult<List<TaharahListDto>>> GetActive()
    {
        int? stationId = null;

        if (User.IsInRole(nameof(OrganizationType.BurialPreparation)))
        {
            stationId = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));
        }

        var entities = await taharahService.GetActiveList(stationId);

        return Ok(mapper.Map<List<TaharahListDto>>(entities));
    }

    [HttpGet("released")]
    public async Task<ActionResult<List<TaharahListDto>>> GetReleased()
    {
        int? stationId = null;

        if (User.IsInRole(nameof(OrganizationType.BurialPreparation)))
        {
            stationId = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));
        }

        var result = await taharahService.GetReleasedList(stationId);

        return Ok(mapper.Map<List<TaharahListDto>>(result));
    }

    [HttpPut("receive")]
    public async Task<ActionResult> ReceiveDeceased(TaharahIntakeDto dto)
    {
        if (dto == null)
        {
            return BadRequest();
        }

        var entity = await taharahService.GetTaharahDetailsById(dto.DeceasedId);

        mapper.Map(dto, entity);

        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));
        
        entity.ReceivedBy = userId;

        entity.TaharahStatus = TaharahStatus.InProgress;
        entity.TaharahReceptionDate = DateTime.Now;

        await taharahService.ReceiveDeceasedToTaharah(entity, userId);

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

        var entity = await taharahService.GetTaharahDetailsById(dto.DeceasedId);

        mapper.Map(dto, entity);

        await taharahService.UpdateTaharahDetails(entity);

        return Ok();
    }

    [HttpPut("release")]
    public async Task<ActionResult> ReleaseFromTaharah(TaharahProcessDto dto)
    {
        if (dto == null)
        {
            return BadRequest();
        }

        var entity = await taharahService.GetTaharahDetailsById(dto.DeceasedId);

        mapper.Map(dto, entity);

        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));

        entity.TaharahStatus = TaharahStatus.Completed;
        entity.TaharahReleaseDate = DateTime.Now;
        entity.IsPendingExit = false;

        await taharahService.ReleaseFromTaharah(entity, userId);

        return Ok();
    }
}