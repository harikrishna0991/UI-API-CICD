var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing",
    "Cold",
    "Mild",
    "Warm",
    "Hot",
    "Very Hot"
};

app.MapGet("/", () =>
{
    return Results.Ok(new
    {
        application = "UI API CI/CD Platform",
        status = "Running",
        message = "Welcome to the API",
        version = "2.0",
        deployment = "GitHub Actions",
        infrastructure = "Terraform",
        cloud = "Microsoft Azure",
        timestamp = DateTime.UtcNow
    });
});

app.MapGet("/api/status", () =>
{
    return Results.Ok(new
    {
        status = "Healthy",
        service = "API",
        version = "2.0",
        deployment = "GitHub Actions",
        infrastructure = "Terraform",
        timestamp = DateTime.UtcNow
    });
});

app.MapGet("/api/info", () =>
{
    return Results.Ok(new
    {
        application = "UI API CI/CD Platform",
        framework = ".NET 8",
        cloud = "Microsoft Azure",
        hosting = "Azure App Service",
        deployment = "GitHub Actions",
        infrastructure = "Terraform"
    });
});

app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "Healthy",
        service = "UI API CI/CD",
        timestamp = DateTime.UtcNow
    });
});

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
    {
        var temperatureC = Random.Shared.Next(-20, 55);

        return new WeatherForecast(
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            temperatureC,
            summaries[Random.Shared.Next(summaries.Length)]
        );
    })
    .ToArray();

    return Results.Ok(forecast);
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
