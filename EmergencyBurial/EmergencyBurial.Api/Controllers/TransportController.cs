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
[Authorize(Roles = nameof(OrganizationType.Moked) + "," + nameof(OrganizationType.DatServices), Policy = nameof(RoleAccessType.Edit))]
public class TransportController(TransportService transportService, IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<TransportListDto>>> GetAll([FromQuery] int? purpose)
    {
        TransportPurpose? filter = purpose.HasValue ? (TransportPurpose)purpose.Value : null;

        var entities = await transportService.GetTransportsList(filter);

        var result = mapper.Map<List<TransportListDto>>(entities);

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UpdateTransportDto>> GetTransport(string id)
    {
        if (!int.TryParse(id, out int idValue))
        {
            return BadRequest();
        }

        var transport = await transportService.GetTransport(idValue);
        
        return Ok(mapper.Map<UpdateTransportDto>(transport));
    }

    [HttpPost]
    public async Task<ActionResult> Create(CreateTransportDto dto)
    {
        if (dto == null)
            return BadRequest();

        var transport = mapper.Map<Transport>(dto);
        
        transport.UpdateBy = new Guid(User.ClaimValue(ClaimHelper.UserId));

        await transportService.CreateTransport(transport, dto.BagNumbers, dto.DeceasedIds);

        return Ok();
    }

    [HttpPut("update-transport")]
    public async Task<ActionResult> UpdateTransport(UpdateTransportDto dto)
    {
        if (dto == null)
            return BadRequest();

        var transport = await transportService.GetTransport(dto.Id);

        mapper.Map(dto, transport);

        transport.UpdateBy = new Guid(User.ClaimValue(ClaimHelper.UserId));
        transport.UpdateOn = DateTime.Now;

        transportService.UpdateTransport(transport);

        return Ok();
    }

    [HttpPut("end/{id}")]
    public async Task<ActionResult> EndTransport(string id)
    {
        if (!int.TryParse(id, out int idValue))
        {
            return BadRequest();
        }

        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));

        await transportService.EndTransport(idValue, userId);

        return Ok();
    }

    [HttpGet("available-bags/{stationId}")]
    public async Task<ActionResult<List<BagSelectItemDto>>> GetAvailableBags(string stationId)
    {
        if (!int.TryParse(stationId, out int stationIdValue))
        {
            return BadRequest();
        }
        
        var results = await transportService.GetAvailableBagsForTarah(stationIdValue);
        
        return Ok(mapper.Map<List<BagSelectItemDto>>(results));
    }
    
    [HttpGet("available-deceaseds/{stationId}")]
    public async Task<ActionResult<List<DeceasedSelectItemDto>>> GetAvailableDeceased(string stationId)
    {
        if (!int.TryParse(stationId, out int stationIdValue))
        {
            return BadRequest();
        }
 
        var results = await transportService.GetAvailableDeceasedsForTaharah(stationIdValue);
        
        return Ok(mapper.Map<List<DeceasedSelectItemDto>>(results));
    }
}