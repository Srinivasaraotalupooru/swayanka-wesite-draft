using Microsoft.EntityFrameworkCore;

namespace Swayanka.Modules.Catalog
{
    public class CatalogDbContext : DbContext
    {
        public CatalogDbContext(DbContextOptions<CatalogDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().Property(p => p.Price).HasColumnType("decimal(18,2)");
            
            // Seed Data
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = Guid.NewGuid(), Name = "The Daily Cotton", Gender = "Men", Fabric = "Cotton", Category = "t-shirt", ColorName = "Canvas White", ColorHex = "#ffffff", Price = 1299, Description = "Breathable organic cotton. Your daily armor." },
                new Product { Id = Guid.NewGuid(), Name = "The Daily Cotton", Gender = "Men", Fabric = "Cotton", Category = "t-shirt", ColorName = "Midnight Black", ColorHex = "#111111", Price = 1299, Description = "Breathable organic cotton. Stealth mode engaged." },
                new Product { Id = Guid.NewGuid(), Name = "Kashmiri Luxe", Gender = "Men", Fabric = "Kashmiri", Category = "t-shirt", ColorName = "Snow White", ColorHex = "#ffffff", Price = 2999, Description = "Hand-sourced Kashmiri blends. Unmatched softness." },
                new Product { Id = Guid.NewGuid(), Name = "Kashmiri Luxe", Gender = "Men", Fabric = "Kashmiri", Category = "t-shirt", ColorName = "Onyx Black", ColorHex = "#000000", Price = 2999, Description = "Hand-sourced Kashmiri blends. Darker than night." },
                new Product { Id = Guid.NewGuid(), Name = "The Essential Tee", Gender = "Women", Fabric = "Cotton", Category = "t-shirt", ColorName = "Pure White", ColorHex = "#ffffff", Price = 1299, Description = "A relaxed cut for effortless elegance. 100% Organic." },
                new Product { Id = Guid.NewGuid(), Name = "The Essential Tee", Gender = "Women", Fabric = "Cotton", Category = "t-shirt", ColorName = "Jet Black", ColorHex = "#111111", Price = 1299, Description = "A relaxed cut. The Little Black Tee you need." },
                new Product { Id = Guid.NewGuid(), Name = "Kashmiri Silk-Blend", Gender = "Women", Fabric = "Kashmiri", Category = "t-shirt", ColorName = "Ivory White", ColorHex = "#fafafa", Price = 3299, Description = "Woven in the valleys. A fabric that drapes like water." },
                new Product { Id = Guid.NewGuid(), Name = "Kashmiri Silk-Blend", Gender = "Women", Fabric = "Kashmiri", Category = "t-shirt", ColorName = "Obsidian", ColorHex = "#080808", Price = 3299, Description = "Woven in the valleys. Luxury you can feel." }
            );
        }
    }
}
