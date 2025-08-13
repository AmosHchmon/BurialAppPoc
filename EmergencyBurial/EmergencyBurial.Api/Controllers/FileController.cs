using System;
using System.Collections.Generic;
using Core.Helpers;
using EmergencyBurial.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers;

[Produces("application/json")]
[Route("[controller]")]
[Authorize]
[ApiController]
public class FileController(FileService fileService) : ControllerBase
{
    [HttpPost("upload")]
    public ActionResult Upload(List<IFormFile> files)
    {
        if (files.Count == 0)
        {
            return BadRequest();
        }

        var result = fileService.UploadFiles(files);

        return Ok(result);
    }

    [HttpGet("download/{fileId}")]
    public ActionResult DownloadDocument(string fileId)
    {
        if (!Guid.TryParse(fileId, out Guid fileIdGuid))
        {
            return BadRequest();
        }

        var fileResult = fileService.DownloadFile(fileIdGuid);

        return File(fileResult.Content, FileHelper.GetContentType(fileResult.Name));
    }
}