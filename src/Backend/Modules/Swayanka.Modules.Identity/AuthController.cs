using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Swayanka.Modules.Identity
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IdentityDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(IdentityDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            try
            {
                // Verify Google Token
                // In production, specify your Client ID in the settings
                var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token);

                // Find or Create User
                var user = await _context.Users.FirstOrDefaultAsync(u => u.GoogleSubjectId == payload.Subject);
                if (user == null)
                {
                    user = new ApplicationUser
                    {
                        GoogleSubjectId = payload.Subject,
                        Email = payload.Email,
                        Name = payload.Name,
                        PictureUrl = payload.Picture
                    };
                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                }

                // Generate JWT
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? "super_secret_key_for_development_only_12345");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.Name, user.Name)
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);

                return Ok(new 
                { 
                    Token = tokenHandler.WriteToken(token),
                    User = new { user.Id, user.Name, user.Email, user.PictureUrl }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Invalid Google Token", Error = ex.Message });
            }
        }
    }

    public class GoogleLoginRequest
    {
        public string Token { get; set; } = string.Empty;
    }
}
