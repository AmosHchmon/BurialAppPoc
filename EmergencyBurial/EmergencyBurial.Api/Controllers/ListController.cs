using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Core.Helpers;
using Core.Model;
using DataModel.Entities;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[ApiController]
[Authorize(Roles = nameof(OrganizationType.Hamal), Policy = nameof(RoleAccessType.Edit))]
public class ListController(ListService listService, IMapper mapper) : ControllerBase
{
    [HttpGet("list-type")]
    public async Task<ActionResult<List<ListTypeDto>>> GetListTypes()
    {
        var list = await listService.GetListTypes();

        return Ok(mapper.Map<List<ListTypeDto>>(list));
    }

    [HttpPost("list-type")]
    public async Task<ActionResult<ListTypeDto>> CreateListType(ListTypeDto listTypeDto)
    {
        if (listTypeDto == null)
        {
            BadRequest();
        }

        var listType = mapper.Map<ListType>(listTypeDto);

        await listService.AddListType(listType);

        return Ok();
    }

    [HttpPut("list-type")]
    public async Task<ActionResult<ListTypeDto>> UpdateListType([FromBody] ListTypeDto listTypeDto)
    {
        if (listTypeDto == null)
        {
            BadRequest();
        }

        var listType = mapper.Map<ListType>(listTypeDto);

        await listService.UpdateListType(listType);

        return Ok();
    }

    [HttpDelete("list-type/{id}")]
    public async Task<ActionResult> DeleteListType(string id)
    {
        if (!int.TryParse(id, out int idValue))
        {
            return BadRequest();
        }

        await listService.DeleteListType(idValue);

        return Ok();
    }

    [HttpGet("list-item")]
    public async Task<ActionResult<List<ListItemDto>>> GetListItems()
    {
        var list = await listService.GetListItems();

        return Ok(mapper.Map<List<ListItemDto>>(list));
    }

    [HttpPost("list-item")]
    public async Task<ActionResult<ListItemDto>> CreateListItem([FromBody] ListItemDto listItemDto)
    {
        if (listItemDto == null)
        {
            return BadRequest();
        }

        var listItem = mapper.Map<ListItem>(listItemDto);

        await listService.AddListItem(listItem);

        return Ok();
    }

    [HttpPut("list-item")]
    public async Task<ActionResult<ListItemDto>> UpdateListItem([FromBody] ListItemDto listItemDto)
    {
        if (listItemDto == null)
        {
            return BadRequest();
        }

        var listItem = mapper.Map<ListItem>(listItemDto);

        await listService.UpdateListItem(listItem);

        return Ok();
    }

    [HttpDelete("list-item/{id}")]
    public async Task<ActionResult> DeleteListItem(string id)
    {
        if (!int.TryParse(id, out int idValue))
        {
            return BadRequest();
        }

        await listService.DeleteListItem(idValue);

        return Ok();
    }

    [HttpGet("burial-body")]
    public ActionResult<List<OptionItem>> GetBurialBodyEnumsValues()
    {
        var list = EnumHelper.EnumNamedValues<BurialBody>();

        return Ok(list);
    }

    [HttpGet("burial-type")]
    public ActionResult<List<OptionItem>> GetBurialTypeEnumsValues()
    {
        var list = EnumHelper.EnumNamedValues<BurialType>();

        return Ok(list);
    }
    
    [HttpGet("burial-status")]
    public ActionResult<List<OptionItem>> GetBurialStatus()
    {
        var list = EnumHelper.EnumNamedValues<BurialStatus>();

        return Ok(list);
    }

    [HttpGet("role-access-type")]
    public ActionResult<List<OptionItem>> GetRoleAccessTypeEnumsValues()
    {
        var list = EnumHelper.EnumNamedValues<RoleAccessType>();

        return Ok(list);
    }
}