using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DataModel.Entities;
using EmergencyBurial.Api.ViewModel;
using EmergencyBurial.Services.DbServices;
using Microsoft.AspNetCore.Mvc;

namespace EmergencyBurial.Api.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly MemberService memberService;
        private readonly ListService listService;
        private readonly IMapper mapper;

        public MemberController(MemberService memberService, ListService listService, IMapper mapper)
        {
            this.memberService = memberService;
            this.listService = listService;
            this.mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetMember(string id)
        {
            var memberId = new Guid(id);

            var result = await memberService.GetMemberById(memberId);

            return Ok(mapper.Map<UserDto>(result));
        }

        [HttpPost]
        public async Task<ActionResult> CreateMember([FromBody] UserDto item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var member = mapper.Map<Member>(item);

            await memberService.CreateMember(member);

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember([FromBody] UserDto item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var member = mapper.Map<Member>(item);

            await memberService.UpdateMember(member);

            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMember(string id)
        {
            var memberId = new Guid(id);

            await memberService.RemoveMember(memberId);

            return Ok();
        }

    }
}
