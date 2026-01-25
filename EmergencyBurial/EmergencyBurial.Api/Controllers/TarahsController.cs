using System;
using System.Collections.Generic;
using System.Linq;
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
[Authorize(Roles = nameof(OrganizationType.Tarah) + "," + nameof(OrganizationType.DatServices),
    Policy = nameof(RoleAccessType.Edit))]
public class TarahsController(TarahService tarahService, IMapper mapper) : ControllerBase
{
    [HttpGet("pending")]
    public async Task<ActionResult<List<TarahListDto>>> GetPending()
    {
        int? stationId = null;

        if (User.IsInRole(nameof(OrganizationType.Tarah)))
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

        if (User.IsInRole(nameof(OrganizationType.Tarah)))
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

        if (User.IsInRole(nameof(OrganizationType.Tarah)))
        {
            stationId = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));
        }

        var result = await tarahService.GetReleasedList(stationId);

        return Ok(mapper.Map<List<TarahListDto>>(result));
    }

    [HttpPut("receive")]
    public async Task<ActionResult> ReceiveDeceased(TarahIntakeDto dto)
    {
        if (dto == null)
        {
            return BadRequest();
        }

        var entity = await tarahService.GetTarahDetailsById(dto.DeceasedId);

        if (entity == null)
        {
            entity = new DeceasedTarahDetails { DeceasedId = dto.DeceasedId.Value };
        }

        mapper.Map(dto, entity);

        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));

        entity.ReceivedBy = userId;
        entity.TarahStation = Convert.ToInt32(User.ClaimValue(ClaimHelper.StationId));

        entity.TarahStatus = TarahStatus.InProgress;
        entity.TarahReceptionDate = DateTime.Now;

        await tarahService.ReceiveDeceasedToTarah(entity, userId);

        return Ok();
    }

    [HttpGet("details/{id}")]
    public async Task<ActionResult<TarahProcessDto>> GetDetails(string id)
    {
        if (!Guid.TryParse(id, out Guid idValue))
        {
            return BadRequest();
        }

        var entity = await tarahService.GetDeceasedForEdit(idValue);

        var res = mapper.Map<TarahProcessDto>(entity);

        return Ok(res);
    }

    [HttpPut("update-details")]
    public async Task<ActionResult> UpdateDetails(TarahProcessDto dto)
    {
        if (dto == null) 
            return BadRequest();
        
        var deceased = await tarahService.GetDeceasedForEdit(dto.DeceasedId);
        
        mapper.Map(dto, deceased);

        if (dto.Bags != null)
        {
            foreach (var bagDto in dto.Bags)
            {
                var existingBag = deceased.DeceasedBags.FirstOrDefault(b => b.Id == bagDto.Id);
                mapper.Map(bagDto, existingBag);
            }
        }
        
        await tarahService.UpdateFullDeceased();

        return Ok();
    }

    /*[HttpPut("release")]
    public async Task<ActionResult> ReleaseFromTarah(TarahProcessDto dto)
    {
        if (dto == null || !dto.DeceasedId.HasValue)
        {
            return BadRequest();
        }

        var deceased = await tarahService.GetDeceasedForEdit(dto.DeceasedId.Value);
        if (deceased == null) return NotFound();

        // Sync data before release using the same pattern
        var burialDetails = new DeceasedBurialDetails
        {
            DeceasedId = deceased.Id,
            BurialLicenseScanned = dto.BurialLicenseScanned
        };
        await tarahService.UpdateBurialDetails(burialDetails);

        if (dto.Bags != null)
        {
            foreach (var bagDto in dto.Bags)
            {
                var bagUpdate = mapper.Map<DeceasedBag>(bagDto);
                bagUpdate.DeceasedId = deceased.Id;
                await tarahService.UpdateBagDetails(bagUpdate);
            }
        }

        var tarahDetails = mapper.Map<DeceasedTarahDetails>(dto);
        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));

        tarahDetails.TarahStatus = TarahStatus.Completed;
        tarahDetails.TarahReleaseDate = DateTime.Now;
        tarahDetails.IsPendingExit = false;

        await tarahService.ReleaseFromTarah(tarahDetails, userId);

        return Ok();
    }*/
}