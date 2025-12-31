using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DataModel.Entities;
using EmergencyBurial.Api.ViewModel;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[ApiController]
/*
[Authorize(Roles = nameof(OrganizationType.BurialPreparation), Policy = nameof(RoleAccessType.Admin))]
*/
public class TaharahsController(TaharahService taharahService, DeceasedService deceasedService, IMapper mapper) : ControllerBase
{
    [HttpGet("pending")]
    public async Task<ActionResult<List<DeceasedDto>>> GetPending()
    {
        var result = await taharahService.GetPendingDeceaseds();

        return Ok(mapper.Map<List<DeceasedDto>>(result));
    }

    [HttpGet("active/{month}/{year}")]
    public async Task<ActionResult<List<DeceasedDto>>> GetActive(string month, string year)
    {
        if (!int.TryParse(month, out int monthValue) || !int.TryParse(year, out int yearValue))
        {
            return BadRequest();
        }

        var result = await taharahService.GetActiveDeceasedInTaharah(monthValue, yearValue);

        return Ok(mapper.Map<List<DeceasedDto>>(result));
    }

    [HttpPut("update-details")]
    public async Task<ActionResult> UpdateDetails(DeceasedBurialDetailsDto deceasedBurialDetailsDto)
    {
        if (deceasedBurialDetailsDto == null)
        {
            return BadRequest();
        }
        
        var burialDetails = mapper.Map<DeceasedBurialDetails>(deceasedBurialDetailsDto);

        await deceasedService.UpdateDetails(burialDetails);

        return Ok();
    }
    
    [HttpPut("receive")]
    public async Task<ActionResult> ReceiveDeceased(DeceasedBurialDetailsDto deceasedBurialDetailsDto)
    {
        if (deceasedBurialDetailsDto == null)
        {
            return BadRequest();
        }

        var burialDetails = mapper.Map<DeceasedBurialDetails>(deceasedBurialDetailsDto);
        
        await taharahService.ReceiveDeceasedToTaharah(burialDetails);

        return Ok();
    }
}