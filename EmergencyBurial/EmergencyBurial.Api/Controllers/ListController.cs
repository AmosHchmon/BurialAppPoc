using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Core.Model;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    [ApiController]
    public class ListController(ListService listService, IMapper mapper) : ControllerBase
    {
        [HttpGet("listitem")]
        public async Task<ActionResult<List<ListItemDto>>> GetListItems()
        {
            var list = await listService.GetListItems();

            return Ok(mapper.Map<List<ListItemDto>>(list));
        }
    }
}
