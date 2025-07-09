using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Helpers;
using DataModel;
using EmergencyBurial.Api.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[ApiController]
public class DbContextController : ControllerBase
{
    private readonly EmergencyBurialContext db;
    private readonly ILogger logger;
    
    [HttpPost]
    //[ApiExplorerSettings(IgnoreApi = true)]
    public async Task<IActionResult> CreateDbSchema()
    {
        try
        {
            await db.Database.EnsureDeletedAsync();
            await db.Database.EnsureCreatedAsync();
        }
        catch (Exception)
        {
            throw;
        }

        return Ok();
    }

    [HttpPut]
    //[ApiExplorerSettings(IgnoreApi = true)]
    public IActionResult InitDbData()
    {
        try
        {
            new DbHelper(db).InitDB();
        }
        catch (Exception)
        {
            throw;
        }

        return Ok();
    }

    [HttpGet("status")]
    public IActionResult Status()
    {
        return Ok();
    }

    [HttpGet("log")]
    public IActionResult Log()
    {
        logger.LogError($"Exception information:test logging");

        return Ok();
    }

    [HttpGet("status-db")]
    public IActionResult StatusDB()
    {
        var result = db.ListItems.FirstOrDefault().Text;

        return Ok(result);
    }

    [HttpGet("enum-values")]
    public IActionResult GetEnumsValues()
    {
        var list = EnumHelper.EnumNamedValues<EntityType>();

        return Ok(list);
    }
}