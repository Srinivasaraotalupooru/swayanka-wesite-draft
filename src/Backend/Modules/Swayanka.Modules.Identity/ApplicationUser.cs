using Swayanka.Shared.Kernel;

namespace Swayanka.Modules.Identity
{
    public class ApplicationUser : Entity
    {
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string GoogleSubjectId { get; set; } = string.Empty;
        public string PictureUrl { get; set; } = string.Empty;
    }
}
