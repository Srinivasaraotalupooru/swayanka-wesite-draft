using Microsoft.EntityFrameworkCore;
using Swayanka.Modules.Catalog;
using Swayanka.Modules.Ordering;

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

// Database Contexts
builder.Services.AddDbContext<CatalogDbContext>(options =>
    options.UseSqlite("Data Source=catalog.db"));

builder.Services.AddDbContext<OrderingDbContext>(options =>
    options.UseSqlite("Data Source=ordering.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

// Ensure Databases are created and seeded
using (var scope = app.Services.CreateScope())
{
    var catalogContext = scope.ServiceProvider.GetRequiredService<CatalogDbContext>();
    catalogContext.Database.EnsureCreated();
    
    var orderingContext = scope.ServiceProvider.GetRequiredService<OrderingDbContext>();
    orderingContext.Database.EnsureCreated();
}

app.Run();
