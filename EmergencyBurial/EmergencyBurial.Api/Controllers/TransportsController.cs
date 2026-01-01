using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
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
public class TransportsController(TransportService transportService, DeceasedService deceasedService, IMapper mapper)
    : ControllerBase
{
    [HttpGet("bag-number/{id}")]
    public async Task<ActionResult<IEnumerable<Transport>>> GetTransportsByDeceased(string id)
    {
        if (!Guid.TryParse(id, out Guid idValue))
        {
            return BadRequest();
        }

        await deceasedService.DeceasedBagExists(idValue);

        var transports = await transportService.GetTransportsByBagDetailsId(idValue);

        var res = mapper.Map<List<TransportDto>>(transports);

        return Ok(res);
    }

    [HttpPost]
    public async Task<ActionResult<TransportDto>> CreateTransport(TransportDto transportDto)
    {
        if (transportDto == null)
        {
            BadRequest();
        }

        var transport = mapper.Map<Transport>(transportDto);

        var res = await transportService.CreateTransport(transport);

        return Ok(mapper.Map<TransportDto>(res));
    }
}