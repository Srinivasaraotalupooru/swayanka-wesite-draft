using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swayanka.Modules.Ordering;

namespace Swayanka.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly OrderingDbContext _context;

        public CartController(OrderingDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<Cart>> GetCart(string userId)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }
            return cart;
        }

        [HttpPost("{userId}/items")]
        public async Task<ActionResult> AddItem(string userId, CartItem item)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Carts.Add(cart);
            }

            cart.Items.Add(item);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{userId}/items/{index}")]
        public async Task<ActionResult> RemoveItem(string userId, int index)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart != null && index >= 0 && index < cart.Items.Count)
            {
                cart.Items.RemoveAt(index); // Simple index based removal for now
                await _context.SaveChangesAsync();
            }
            return Ok();
        }
        
        [HttpDelete("{userId}")]
        public async Task<ActionResult> ClearCart(string userId)
        {
             var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
             if (cart != null)
             {
                 cart.Items.Clear();
                 await _context.SaveChangesAsync();
             }
             return Ok();
        }
    }
}
