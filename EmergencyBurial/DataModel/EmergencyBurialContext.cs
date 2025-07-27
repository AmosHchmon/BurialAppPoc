using System.Linq;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataModel
{
    public partial class EmergencyBurialContext : DbContext
    {
        public virtual DbSet<ListItem> ListItems { get; set; }
        public virtual DbSet<ListType> ListTypes { get; set; }
        public virtual DbSet<AppFile> Files { get; set; }
        public virtual DbSet<Member> Members { get; set; }
        public virtual DbSet<Deceased> Deceaseds { get; set; }
        public EmergencyBurialContext(DbContextOptions<EmergencyBurialContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Member>().HasIndex(m => m.UserName).IsUnique(true);

            modelBuilder.Entity<ListType>().HasIndex(u => u.Text);

            modelBuilder.Entity<Deceased>().HasIndex(d => d.HalalNumber).IsUnique(true);


            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()).Where(fk => fk.DeleteBehavior == DeleteBehavior.Cascade))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}