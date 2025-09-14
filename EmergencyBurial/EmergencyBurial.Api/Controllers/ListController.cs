using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Core.Helpers;
using Core.Model;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[ApiController]
public class ListController(ListService listService, IMapper mapper) : ControllerBase
{
    [HttpGet("list-type")]
    public async Task<ActionResult<List<ListTypeDto>>> GetListTypes()
    {
        var list = await listService.GetListTypes();

        return Ok(mapper.Map<List<ListTypeDto>>(list));
    }
    
    [HttpGet("listitem")]
    public async Task<ActionResult<List<ListItemDto>>> GetListItems()
    {
        var list = await listService.GetListItems();

        return Ok(mapper.Map<List<ListItemDto>>(list));
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
}