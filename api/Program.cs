var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Root endpoint
app.MapGet("/", () =>
{
    return Results.Ok(new
    {
        service = "UI-API-CICD API",
        status = "Operational",
        version = "4.0",
        release = "API-Release-4",
        message = "API Release 4 is operational"
    });
});

// Status endpoint
app.MapGet("/api/status", () =>
{
    return Results.Ok(new
    {
        status = "Operational",
        version = "4.0",
        release = "API-Release-4",
        message = "CI/CD API Release 4 deployed successfully",
        pipeline = "GitHub Actions",
        infrastructure = "Terraform",
        platform = "Microsoft Azure"
    });
});

// Deployment endpoint
app.MapGet("/api/deployment", () =>
{
    return Results.Ok(new
    {
        status = "Deployed",
        version = "4.0",
        release = "API-Release-4",
        pipeline = "GitHub Actions",
        infrastructure = "Terraform",
        platform = "Microsoft Azure",
        message = "API Release 4 deployment validation successful",
        timestamp = DateTime.UtcNow
    });
});

// Health endpoint
app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "Healthy",
        version = "4.0",
        release = "API-Release-4",
        timestamp = DateTime.UtcNow
    });
});

// WeatherForecast endpoint
app.MapGet("/weatherforecast", () =>
{
    var summaries = new[]
    {
        "Freezing",
        "Bracing",
        "Chilly",
        "Cool",
        "Mild",
        "Warm",
        "Balmy",
        "Hot",
        "Sweltering"
    };

    var forecast = Enumerable.Range(1, 5)
        .Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = summaries[Random.Shared.Next(summaries.Length)]
        })
        .ToArray();

    return Results.Ok(forecast);
});

app.Run();

public class WeatherForecast
{
    public DateOnly Date { get; set; }

    public int TemperatureC { get; set; }

    public string? Summary { get; set; }

    public int TemperatureF =>
        32 + (int)(TemperatureC / 0.5556);
}