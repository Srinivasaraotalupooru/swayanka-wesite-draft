using Swayanka.Shared.Kernel;

namespace Swayanka.Modules.Catalog
{
    public class Product : Entity
    {
        public string Name { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Fabric { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string ColorName { get; set; } = string.Empty;
        public string ColorHex { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty; // Placeholder for SVG logic or actual image
    }
}
