using Microsoft.EntityFrameworkCore;
using Swayanka.Modules.Catalog;
using Swayanka.Modules.Ordering;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Swayanka.Modules.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
// Swagger removed for .NET 10 compatibility
// builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

// ... existing code ...

// Database Contexts
builder.Services.AddDbContext<CatalogDbContext>(options =>
    options.UseSqlite("Data Source=catalog.db"));

builder.Services.AddDbContext<OrderingDbContext>(options =>
    options.UseSqlite("Data Source=ordering.db"));

builder.Services.AddDbContext<IdentityDbContext>(options =>
    options.UseSqlite("Data Source=identity.db"));

// JWT Authentication
var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"] ?? "super_secret_key_for_development_only_12345");
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Ensure Databases are created and seeded
using (var scope = app.Services.CreateScope())
{
    var catalogContext = scope.ServiceProvider.GetRequiredService<CatalogDbContext>();
    catalogContext.Database.EnsureCreated();
    
    var orderingContext = scope.ServiceProvider.GetRequiredService<OrderingDbContext>();
    orderingContext.Database.EnsureCreated();

    var identityContext = scope.ServiceProvider.GetRequiredService<IdentityDbContext>();
    identityContext.Database.EnsureCreated();
}

app.Run();
