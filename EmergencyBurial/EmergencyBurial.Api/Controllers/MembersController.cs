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
[Authorize(Roles = nameof(OrganizationType.DatServices), Policy = nameof(RoleAccessType.View))]

public class MembersController(MemberService memberService, IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<MemberDto>>> GetMembers()
    {
        var list = await memberService.GetMembers();

        return Ok(mapper.Map<List<MemberDto>>(list));
    }

    [HttpPost]
    public async Task<ActionResult<MemberDto>> CreateMember([FromBody] MemberDto memberDto)
    {
        if (memberDto == null)
        {
            return BadRequest();
        }

        var member = mapper.Map<Member>(memberDto);

        await memberService.AddMember(member);

        return Ok();
    }

    [HttpPut]
    public async Task<ActionResult<MemberDto>> UpdateMember([FromBody] MemberDto memberDto)
    {
        if (memberDto == null)
        {
            return BadRequest();
        }

        var member = mapper.Map<Member>(memberDto);

        await memberService.UpdateMember(member);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMember(string id)
    {
        if (!Guid.TryParse(id, out Guid idValue))
        {
            return BadRequest();
        }

        await memberService.DeleteMember(idValue);

        return Ok();
    }
}