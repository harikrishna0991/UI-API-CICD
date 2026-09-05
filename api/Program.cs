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

// ---------------------------------------------------------
// Root
// ---------------------------------------------------------

app.MapGet("/", () =>
{
    return Results.Ok(new
    {
        service = "Enterprise Cloud API",
        status = "Operational",
        version = "5.0",
        release = "API-Release-5",
        environment = "Production",
        platform = "Microsoft Azure",
        pipeline = "GitHub Actions"
    });
});

// ---------------------------------------------------------
// Status
// ---------------------------------------------------------

app.MapGet("/api/status", () =>
{
    return Results.Ok(new
    {
        status = "Operational",
        version = "5.0",
        release = "API-Release-5",
        environment = "Production",
        pipeline = "GitHub Actions",
        infrastructure = "Terraform",
        platform = "Microsoft Azure",
        region = "Central India",
        uptime = "99.98%"
    });
});

// ---------------------------------------------------------
// Health
// ---------------------------------------------------------

app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "Healthy",
        version = "5.0",
        release = "API-Release-5",
        timestamp = DateTime.UtcNow
    });
});

// ---------------------------------------------------------
// Deployment
// ---------------------------------------------------------

app.MapGet("/api/deployment", () =>
{
    return Results.Ok(new
    {
        status = "Deployed",
        version = "5.0",
        release = "API-Release-5",
        pipeline = "GitHub Actions",
        infrastructure = "Terraform",
        platform = "Microsoft Azure",
        environment = "Production",
        message = "Deployment validation successful",
        timestamp = DateTime.UtcNow
    });
});

// ---------------------------------------------------------
// Dashboard Metrics
// ---------------------------------------------------------

app.MapGet("/api/dashboard", () =>
{
    return Results.Ok(new
    {
        resources = 24,
        healthyResources = 21,
        warnings = 2,
        critical = 1,
        deployments = 18,
        successfulDeployments = 17,
        failedDeployments = 1,
        uptime = 99.98,
        monthlyCost = 284.65
    });
});

// ---------------------------------------------------------
// Services
// ---------------------------------------------------------

app.MapGet("/api/services", () =>
{
    var services = new[]
    {
        new
        {
            name = "Frontend Application",
            type = "Static Web App",
            status = "Healthy",
            region = "Central India",
            endpoint = "https://sttfstate84729.z13.web.core.windows.net/"
        },
        new
        {
            name = "Backend API",
            type = "Azure App Service",
            status = "Healthy",
            region = "Central India",
            endpoint = "https://app-api-cicd.azurewebsites.net"
        },
        new
        {
            name = "Terraform Infrastructure",
            type = "Infrastructure as Code",
            status = "Healthy",
            region = "Azure",
            endpoint = "Terraform State"
        },
        new
        {
            name = "CI/CD Pipeline",
            type = "GitHub Actions",
            status = "Healthy",
            region = "Cloud Region",
            endpoint = "GitHub"
        }
    };

    return Results.Ok(services);
});

// ---------------------------------------------------------
// Recent Deployments
// ---------------------------------------------------------

app.MapGet("/api/deployments", () =>
{
    var deployments = new[]
    {
        new
        {
            version = "dev-1.0.2",
            component = "UI + API",
            status = "Succeeded",
            environment = "Production",
            timestamp = DateTime.UtcNow.AddMinutes(-18)
        },
        new
        {
            version = "dev-1.0.1",
            component = "UI",
            status = "Succeeded",
            environment = "Production",
            timestamp = DateTime.UtcNow.AddHours(-4)
        },
        new
        {
            version = "dev-1.0.0",
            component = "UI + API",
            status = "Succeeded",
            environment = "Production",
            timestamp = DateTime.UtcNow.AddDays(-1)
        },
        new
        {
            version = "dev-0.9.9",
            component = "API",
            status = "Failed",
            environment = "Production",
            timestamp = DateTime.UtcNow.AddDays(-2)
        }
    };

    return Results.Ok(deployments);
});

// ---------------------------------------------------------
// Weather
// ---------------------------------------------------------

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
            Date = DateOnly.FromDateTime(
                DateTime.Now.AddDays(index)
            ),
            TemperatureC = Random.Shared.Next(18, 38),
            Summary = summaries[
                Random.Shared.Next(summaries.Length)
            ]
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