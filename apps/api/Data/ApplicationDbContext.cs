using Microsoft.EntityFrameworkCore;
using SharedWallet.Api.Models;

namespace SharedWallet.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}

    public DbSet<Transaction> Transactions {get; set;}
    public DbSet<Category> Categories {get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Kitchen", Icon = "🍎" },
            new Category { Id = 2, Name = "Rent & Bills", Icon = "🏠" },
            new Category { Id = 3, Name = "Entertainment", Icon = "🎬" },
            new Category { Id = 4, Name = "Transportation", Icon = "🚗" }
        );
    }
}