using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Resources;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmergencyBurial.Services.DbServices
{
    public class MemberService
    {
        private readonly EmergencyBurialContext ctx;

        public MemberService(EmergencyBurialContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task<Member> GetMemberById(Guid? id)
        {
            return await ctx.Members.FindAsync(id);
        }

        public async Task<Member> CreateMember(Member member)
        {
            try
            {
                await ctx.Members.AddAsync(member);

                await ctx.SaveChangesAsync();

                return member;
            }
            catch (Exception ex)
            {
                throw new ApplicationException(UserMessage.ErrorSave, ex);
            }
        }

        public async Task UpdateMember(Member member)
        {
            try
            {
                ctx.Members.Update(member);

                await ctx.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException(UserMessage.ErrorSave, ex);
            }
        }

        public async Task RemoveMember(Guid id)
        {
            try
            {
                await this.ctx.Members
                    .Where(item => item.Id == id)
                    .ExecuteDeleteAsync();

                await ctx.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException(UserMessage.ErrorDelete, ex);
            }
        }
    }
}