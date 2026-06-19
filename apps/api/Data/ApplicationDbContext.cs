using Microsoft.EntityFrameworkCore;
using SharedWallet.Api.Models;

namespace SharedWallet.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}

    public DbSet<Transaction> Transactions {get; set;}
    public DbSet<Category> Categories {get; set;}
    public DbSet<Wallet> Wallets {get; set;}
    public DbSet<WalletMember> WalletMembers {get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<WalletMember>()
            .Property(m => m.Role)
            .HasConversion<string>();

        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Kitchen", Icon = "🍎" },
            new Category { Id = 2, Name = "Rent & Bills", Icon = "🏠" },
            new Category { Id = 3, Name = "Entertainment", Icon = "🎬" },
            new Category { Id = 4, Name = "Transportation", Icon = "🚗" }
        );
    }

    public DbSet<User> Users {get; set;}

    public override int SaveChanges()
    {
        ApplyAuditInfo();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        ApplyAuditInfo();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void ApplyAuditInfo()
    {
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = DateTime.UtcNow;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = DateTime.UtcNow;
            }
        }
    }
}