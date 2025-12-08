using System;
using System.Threading.Tasks;
using AutoMapper;
using Core.Model;
using DataModel.Entities;
using EmergencyBurial.Api.ViewModel;
using EmergencyBurial.Services.DbServices;
using EmergencyBurial.Services.RealTime;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[ApiController]
public class GatewayController(DeceasedService deceasedService, NotificationService notificationService, IMapper mapper)
    : ControllerBase
{
    [HttpPost("police")]
    public async Task<ActionResult> ReceivePoliceData([FromBody] ExternalDeceasedDto deceasedDto)
    {
        return await ProcessGatewayData(deceasedDto, "Police");
    }

    [HttpPost("ometz")]
    public async Task<ActionResult> ReceiveOmetzData([FromBody] ExternalDeceasedDto deceasedDto)
    {
        return await ProcessGatewayData(deceasedDto, "Ometz");
    }

    [HttpPost("welfare")]
    public async Task<ActionResult> ReceiveWelfareData([FromBody] ExternalDeceasedDto deceasedDto)
    {
        return await ProcessGatewayData(deceasedDto, "Welfare");
    }

    [HttpPost("health")]
    public async Task<ActionResult> ReceiveHealthData([FromBody] ExternalDeceasedDto deceasedDto)
    {
        return await ProcessGatewayData(deceasedDto, "Health");
    }

    private async Task<ActionResult> ProcessGatewayData(ExternalDeceasedDto obj, string source)
    {
        if (obj == null)
        {
            return BadRequest();
        }

        Deceased existingDeceased = null;

        if (!string.IsNullOrEmpty(obj.HalalNumber))
        {
            existingDeceased = await deceasedService.GetDeceasedByHalalNumber(obj.HalalNumber);
        }

        ExternalDeceasedDto resultDto = null;

        if (existingDeceased != null)
        {
            mapper.Map(obj, existingDeceased);

            await deceasedService.UpdateDeceased(existingDeceased);

            var res = mapper.Map<ExternalDeceasedDto>(existingDeceased);

            await notificationService.NotifyDeceasedUpdatedAsync(res);
        }
        else
        {
            if (string.IsNullOrEmpty(obj.HalalNumber))
            {
                obj.HalalNumber = $"{source}-{DateTime.Now.Ticks}";
            }

            var newDeceased = mapper.Map<Deceased>(obj);

            await deceasedService.CreateDeceased(newDeceased);

            resultDto = mapper.Map<ExternalDeceasedDto>(newDeceased);

            await notificationService.NotifyDeceasedCreatedAsync(resultDto);
        }

        return Ok(resultDto);
    }
}