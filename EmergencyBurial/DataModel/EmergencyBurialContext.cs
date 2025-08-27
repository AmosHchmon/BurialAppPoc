using System.Linq;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataModel;

public partial class EmergencyBurialContext : DbContext
{
    public virtual DbSet<ListItem> ListItems { get; set; }
    public virtual DbSet<ListType> ListTypes { get; set; }
    public virtual DbSet<AppFile> Files { get; set; }
    public virtual DbSet<Member> Members { get; set; }
    public virtual DbSet<Deceased> Deceaseds { get; set; }
    public virtual DbSet<DeceasedBagDetails> DeceasedBagDetails { get; set; }
    public virtual DbSet<DeceasedOperational> DeceasedOperationals { get; set; }
    public virtual DbSet<DeceasedBurial> DeceasedBurials { get; set; }
    public virtual DbSet<DeceasedBurialCoordination> DeceasedBurialCoordinations { get; set; }

    public virtual DbSet<Transport> Transports { get; set; }

    public EmergencyBurialContext(DbContextOptions<EmergencyBurialContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Member>().HasIndex(m => m.UserName).IsUnique(true);
        modelBuilder.Entity<ListType>().HasIndex(u => u.Text);

        var deceasedEntity = modelBuilder.Entity<Deceased>();

        deceasedEntity.HasIndex(d => d.HalalNumber).IsUnique(true);

        deceasedEntity
            .HasOne(d => d.BagDetails)
            .WithOne(bd => bd.Deceased)
            .HasForeignKey<DeceasedBagDetails>(bd => bd.DeceasedId);

        deceasedEntity
            .HasOne(d => d.OperationalDetails)
            .WithOne(od => od.Deceased)
            .HasForeignKey<DeceasedOperational>(od => od.DeceasedId);

        deceasedEntity
            .HasOne(d => d.BurialDetails)
            .WithOne(b => b.Deceased)
            .HasForeignKey<DeceasedBurial>(b => b.DeceasedId);

        deceasedEntity
            .HasOne(d => d.BurialCoordination)
            .WithOne(bc => bc.Deceased)
            .HasForeignKey<DeceasedBurialCoordination>(bc => bc.DeceasedId);

        deceasedEntity
            .HasMany(d => d.Transports)
            .WithOne(t => t.Deceased)
            .HasForeignKey(t => t.DeceasedId);
        
        modelBuilder.Entity<Transport>().HasIndex(d => d.Id).IsUnique(true);

        foreach (var relationship in modelBuilder.Model.GetEntityTypes()
                     .SelectMany(e => e.GetForeignKeys())
                     .Where(fk => fk.DeleteBehavior == DeleteBehavior.Cascade))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
}