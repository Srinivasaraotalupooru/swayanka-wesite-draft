using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swayanka.Modules.Ordering;

namespace Swayanka.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly OrderingDbContext _context;

        public OrdersController(OrderingDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders(string userId)
        {
            return await _context.Orders.Where(o => o.UserId == userId).OrderByDescending(o => o.CreatedAt).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(Order order)
        {
            order.CreatedAt = DateTime.UtcNow;
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetOrders), new { userId = order.UserId }, order);
        }
    }
}
