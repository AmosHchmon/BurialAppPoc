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
[Authorize(Roles = nameof(OrganizationType.Hamal) + "," + nameof(OrganizationType.DatServices), Policy = nameof(RoleAccessType.Edit))]
public class EventController(EventService eventService, IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<EventDto>>> GetEvents()
    {
        var list = await eventService.GetEvents();

        return Ok(mapper.Map<List<EventDto>>(list));
    }

    [HttpPost]
    public async Task<ActionResult<EventDto>> CreateEvent(EventDto eventDto)
    {
        if (eventDto == null)
            return BadRequest();

        var entity = mapper.Map<Event>(eventDto);

        var userId = new Guid(User.ClaimValue(ClaimHelper.UserId));

        var res = await eventService.AddEvent(entity, userId);

        return Ok(mapper.Map<EventDto>(res));
    }

    [HttpPut]
    public async Task<ActionResult<EventDto>> UpdateEvent(EventDto eventDto)
    {
        if (eventDto == null)
            return BadRequest();

        var entity = await eventService.GetEventById(eventDto.Id);

        mapper.Map(eventDto, entity);

        await eventService.UpdateEvent(entity);

        return Ok();
    }
}