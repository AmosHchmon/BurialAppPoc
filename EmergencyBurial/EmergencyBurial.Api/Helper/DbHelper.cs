using System;
using System.Collections.Generic;
using Core.Helpers;
using DataModel;
using DataModel.Entities;

namespace EmergencyBurial.Api.Helper;

public class DbHelper
{
    private readonly EmergencyBurialContext db;
    
    public DbHelper(EmergencyBurialContext db)
        {
            this.db = db;
        }

        public void InitDB()
        {
            using (var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    //InitListType();

                    //InitListItems();

                    InitAccounts();

                    //InitFormsMenu();

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }


        #region [private methods]

        private void InitListType()
        {
            foreach (EntityType type in (EntityType[])Enum.GetValues(typeof(EntityType)))
            {
                var obj = new ListType()
                {
                    Id = (int)type,
                    Text = type.GetEnumDescription()
                };

                db.ListTypes.Add(obj);
            }

            db.SaveChanges();
        }

        private void InitListItems()
        {
            var count = 1;
            foreach (MemberType type in (MemberType[])Enum.GetValues(typeof(MemberType)))
            {
                var obj = new ListItem()
                {
                    Key = (int)EntityType.MemberType + count++,
                    ListTypeId = (int)EntityType.MemberType,
                    Text = type.GetEnumDescription()
                };

                db.ListItems.Add(obj);
            }

            db.SaveChanges();
        }

        private void InitAccounts()
        {
            var list = new List<Member>
            {
                new Member
                {
                    FullName = "עוז שורקי", UserName = "308015205", Mail = "OzS@dat.gov.il",
                }
            };

            db.Users.AddRange(list);

            db.SaveChanges();
        }

        #endregion
}