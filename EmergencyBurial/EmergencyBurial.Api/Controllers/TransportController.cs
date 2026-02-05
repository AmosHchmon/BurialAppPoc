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
[Authorize]
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
    
    [HttpPost]
    public async Task<ActionResult> Create(CreateTransportDto dto)
    {
        if (dto == null)
            return BadRequest();

        var transport = mapper.Map<Transport>(dto);

        transport.StartDateTime = DateTime.Now;
        transport.UpdateBy = new Guid(User.ClaimValue(ClaimHelper.UserId));

        await transportService.CreateTransport(transport, dto.BagNumbers);

        return Ok();
    }

    [HttpPut("update-details")]
    public async Task<ActionResult> UpdateDetails(UpdateTransportDetailsDto dto)
    {
        if (dto == null)
            return BadRequest();
        
        var transport = await transportService.GetTransportForEdit(dto.TransportId);
        
        mapper.Map(dto, transport);
        
        transport.UpdateBy = new Guid(User.ClaimValue(ClaimHelper.UserId));
        transport.UpdateOn = DateTime.Now;
        
        await transportService.UpdateTransport();

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

    [HttpGet("available-bags")]
    public async Task<ActionResult<List<BagSelectItemDto>>> GetAvailableBags()
    {
        var results = await transportService.AvailableBags();
        
        return Ok(mapper.Map<List<BagSelectItemDto>>(results));
    }
}