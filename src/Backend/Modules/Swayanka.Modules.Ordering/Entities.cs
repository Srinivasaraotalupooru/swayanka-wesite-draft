using Swayanka.Shared.Kernel;
using System.Collections.Generic;

namespace Swayanka.Modules.Ordering
{
    public class Cart : Entity
    {
        public string UserId { get; set; } = string.Empty; // For now, just a string ID (from Auth)
        public List<CartItem> Items { get; set; } = new();
    }

    public class CartItem : Entity
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; } = string.Empty;
        public string ColorHex { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }

    public class Order : Entity
    {
        public string UserId { get; set; } = string.Empty;
        public string OrderNumber { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "Processing";
        public List<OrderItem> Items { get; set; } = new();
    }

    public class OrderItem : Entity
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; } = string.Empty;
        public string ColorHex { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }
}
