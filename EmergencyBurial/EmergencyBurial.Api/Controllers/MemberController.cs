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
[Authorize(Roles = nameof(OrganizationType.Hamal), Policy = nameof(RoleAccessType.Edit))]

public class MemberController(MemberService memberService, IMapper mapper) : ControllerBase
{
    #region [NotAnonymous]
    
    [HttpGet("member")]
    [AllowAnonymous]
    public async Task<ActionResult<MemberDto>> GetMember()
    {
        var memberId = new Guid(User.ClaimValue(ClaimHelper.UserId));

        var member = await memberService.GetMemberById(memberId);

        return Ok(mapper.Map<MemberDto>(member));
    }
    
    [HttpPut]
    [AllowAnonymous]
    public async Task<ActionResult<MemberDto>> UpdateMember(MemberDto memberDto)
    {
        if (memberDto == null)
        {
            return BadRequest();
        }
        
        var entity = await memberService.GetMemberById(memberDto.Id);

        mapper.Map(memberDto, entity);

        var res = await memberService.UpdateMember(entity);

        return Ok(mapper.Map<MemberDto>(res));
    }
    
    #endregion

    #region [Anonymous]
    
    [HttpGet]
    public async Task<ActionResult<List<MemberDto>>> GetMembers()
    {
        var list = await memberService.GetMembers();

        return Ok(mapper.Map<List<MemberDto>>(list));
    }

    [HttpPost]
    public async Task<ActionResult<MemberDto>> CreateMember(MemberDto memberDto)
    {
        if (memberDto == null)
        {
            return BadRequest();
        }

        var member = mapper.Map<Member>(memberDto);

        await memberService.AddMember(member);

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
    
    #endregion
    
}