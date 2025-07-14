using System.Linq;
using DataModel.Entities;
using DocumentFormat.OpenXml.InkML;
using Microsoft.EntityFrameworkCore;

namespace DataModel
{
    public partial class EmergencyBurialContext : DbContext
    {
        public virtual DbSet<ListItem> ListItems { get; set; }
        public virtual DbSet<ListType> ListTypes { get; set; }
        public virtual DbSet<AppFile> Files { get; set; }
        public virtual DbSet<Account> Users { get; set; }
        public EmergencyBurialContext(DbContextOptions<EmergencyBurialContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().HasIndex(m => new { m.UserName, m.CouncilId, m.MemberTypeId }).IsUnique(true);

            //Define primary key
            modelBuilder.Entity<ListType>().HasIndex(u => u.Text);


            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()).Where(fk => fk.DeleteBehavior == DeleteBehavior.Cascade))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}
