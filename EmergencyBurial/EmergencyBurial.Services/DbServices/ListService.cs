using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Helpers;
using Core.Resources;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmergencyBurial.Services.DbServices
{
    public class ListService(EmergencyBurialContext ctx)
    {
        #region [ListItem Methods]

        public async Task<List<ListItem>> GetListItems()
        {
            return await ctx.ListItems.OrderBy(x => x.Text).ToListAsync();
        }

        public async Task<ListItem> AddListItem(ListItem item)
        {
            try
            {
                await ctx.ListItems.AddAsync(item);

                await ctx.SaveChangesAsync();

                return item;
            }
            catch (Exception ex)
            {
                throw new ApplicationException(UserMessage.ErrorSave, ex);
            }
        }

        public async Task<ListItem> UpdateListItem(ListItem item)
        {
            ctx.ListItems.Update(item);

            await ctx.SaveChangesAsync();

            return item;
        }

        public async Task DeleteListItem(int id)
        {
            await ctx.ListItems.Where(x => x.Key == id).ExecuteDeleteAsync();
        }

        #endregion

        #region [listType Methods]

        public async Task<List<ListType>> GetListTypes()
        {
            return await ctx.ListTypes.ToListAsync();
        }

        public async Task<ListType> AddListType(ListType item)
        {
            try
            {
                var lastListType = ctx.ListTypes.Max(x => x.Id);

                item.Id = lastListType == null ? 1000 : lastListType + 1000;

                ctx.ListTypes.Add(item);

                await ctx.SaveChangesAsync();

                return item;
            }
            catch (Exception ex)
            {
                throw new ApplicationException(UserMessage.ErrorSave, ex);
            }
        }

        public async Task<ListType> UpdateListType(ListType item)
        {
            ctx.ListTypes.Update(item);

            await ctx.SaveChangesAsync();

            return item;
        }

        public async Task DeleteListType(int id)
        {
            ctx.ListTypes.Where(x => x.Id == id).ExecuteDelete();

            await ctx.SaveChangesAsync();
        }

        #endregion
    }
}