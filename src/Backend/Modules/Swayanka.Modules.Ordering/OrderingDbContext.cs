using Microsoft.EntityFrameworkCore;

namespace Swayanka.Modules.Ordering
{
    public class OrderingDbContext : DbContext
    {
        public OrderingDbContext(DbContextOptions<OrderingDbContext> options) : base(options) { }

        public DbSet<Cart> Carts { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Cart>().OwnsMany(c => c.Items);
            modelBuilder.Entity<Order>().OwnsMany(o => o.Items);
            modelBuilder.Entity<Order>().Property(o => o.TotalAmount).HasColumnType("decimal(18,2)");
        }
    }
}
