using System;
using System.Threading.Tasks;
using AutoMapper;
using Core.Helpers;
using Core.Model;
using DataModel.Entities;
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
    public async Task<ActionResult> ReceivePoliceData(ExternalDeceasedDto deceasedDto)
    {
        return await ProcessGatewayData(deceasedDto, GatewaySource.Police);
    }

    [HttpPost("idf")]
    public async Task<ActionResult> ReceiveIdfData(ExternalDeceasedDto deceasedDto)
    {
        return await ProcessGatewayData(deceasedDto, GatewaySource.IDF);
    }

    [HttpPost("welfare")]
    public async Task<ActionResult> ReceiveWelfareData(ExternalDeceasedDto deceasedDto)
    {
        return await ProcessGatewayData(deceasedDto, GatewaySource.Welfare);
    }

    [HttpPost("health")]
    public async Task<ActionResult> ReceiveHealthData(ExternalDeceasedDto deceasedDto)
    {
        return await ProcessGatewayData(deceasedDto, GatewaySource.Health);
    }

    private async Task<ActionResult> ProcessGatewayData(ExternalDeceasedDto obj, GatewaySource source)
    {
        if (obj == null)
        {
            return BadRequest();
        }

        Deceased existingDeceased = null;

        if (!string.IsNullOrEmpty(obj.HalalNumber))
        {
            existingDeceased = await deceasedService.GetDeceasedByBagNumber(obj.HalalNumber);
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
                obj.HalalNumber = $"{source.GetEnumDescription()}-{DateTime.Now.Ticks}";
            }

            var newDeceased = mapper.Map<Deceased>(obj);

            await deceasedService.CreateDeceased(newDeceased);

            resultDto = mapper.Map<ExternalDeceasedDto>(newDeceased);

            await notificationService.NotifyDeceasedCreatedAsync(resultDto);
        }

        return Ok(resultDto);
    }
}