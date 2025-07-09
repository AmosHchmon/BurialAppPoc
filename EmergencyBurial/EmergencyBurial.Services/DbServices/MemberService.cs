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

        /*public async Task<User> GetMemberById(Guid? id)
        {
            return await ctx.Members.FindAsync(id);
        }

        public async Task<User> CreateMember(User user)
        {
            try
            {
                await ctx.Members.AddAsync(user);

                await ctx.SaveChangesAsync();

                return user;
            }
            catch (Exception ex)
            {
                throw new ApplicationException(UserMessage.ErrorSave, ex);
            }
        }

        public async Task UpdateMember(User user)
        {
            try
            {
                ctx.Members.Update(user);

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
        }*/
    }
}