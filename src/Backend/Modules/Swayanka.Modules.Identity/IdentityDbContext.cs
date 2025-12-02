using Microsoft.EntityFrameworkCore;

namespace Swayanka.Modules.Identity
{
    public class IdentityDbContext : DbContext
    {
        public IdentityDbContext(DbContextOptions<IdentityDbContext> options) : base(options) { }

        public DbSet<ApplicationUser> Users { get; set; }
    }
}
