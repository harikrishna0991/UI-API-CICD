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
    var html = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>UI API CI/CD Platform</title>

        <style>
            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
                font-family: "Segoe UI", Arial, sans-serif;
                background: #f4f7fb;
                color: #1f2937;
            }

            .header {
                background: #0f172a;
                color: white;
                padding: 22px 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .brand {
                font-size: 21px;
                font-weight: 600;
            }

            .environment {
                font-size: 13px;
                color: #cbd5e1;
            }

            .container {
                max-width: 1000px;
                margin: 60px auto;
                padding: 0 25px;
            }

            .card {
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 10px;
                padding: 42px;
                box-shadow: 0 8px 25px rgba(15, 23, 42, 0.08);
            }

            .title {
                margin: 0;
                font-size: 34px;
                font-weight: 600;
                color: #0f172a;
            }

            .description {
                margin-top: 12px;
                color: #64748b;
                font-size: 16px;
            }

            .status {
                margin-top: 30px;
                padding: 16px 20px;
                background: #f0fdf4;
                border: 1px solid #bbf7d0;
                border-radius: 8px;
                color: #166534;
                font-weight: 600;
            }

            .status span {
                margin-right: 8px;
            }

            .section {
                margin-top: 35px;
            }

            .section-title {
                font-size: 18px;
                font-weight: 600;
                color: #0f172a;
                margin-bottom: 15px;
            }

            .endpoint {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 18px 20px;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                background: #f8fafc;
            }

            .endpoint-name {
                font-weight: 600;
                color: #334155;
            }

            .endpoint-link {
                color: #2563eb;
                text-decoration: none;
                font-weight: 600;
            }

            .endpoint-link:hover {
                text-decoration: underline;
            }

            .details {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
                margin-top: 20px;
            }

            .detail {
                padding: 18px;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
            }

            .label {
                font-size: 12px;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .value {
                margin-top: 6px;
                font-weight: 600;
                color: #1e293b;
            }

            .footer {
                text-align: center;
                margin-top: 30px;
                color: #94a3b8;
                font-size: 13px;
            }

            @media (max-width: 700px) {
                .header {
                    padding: 20px;
                }

                .container {
                    margin: 30px auto;
                }

                .card {
                    padding: 25px;
                }

                .details {
                    grid-template-columns: 1fr;
                }

                .endpoint {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                }
            }
        </style>
    </head>

    <body>

        <header class="header">
            <div class="brand">
                UI API CI/CD Platform
            </div>

            <div class="environment">
                Production Environment
            </div>
        </header>

        <main class="container">

            <div class="card">

                <h1 class="title">
                    API Service
                </h1>

                <p class="description">
                    Application programming interface for the UI API CI/CD platform.
                </p>

                <div class="status">
                    <span>●</span>
                    Service is operational - CI/CD Deployment Updated
                </div>

                <div class="section">

                    <div class="section-title">
                        Available Endpoint
                    </div>

                    <div class="endpoint">

                        <div class="endpoint-name">
                            Weather Forecast
                        </div>

                        <a
                            class="endpoint-link"
                            href="/weatherforecast"
                        >
                            View Forecast
                        </a>

                    </div>

                </div>

                <div class="section">

                    <div class="section-title">
                        Service Information
                    </div>

                    <div class="details">

                        <div class="detail">
                            <div class="label">
                                Framework
                            </div>

                            <div class="value">
                                .NET 8
                            </div>
                        </div>

                        <div class="detail">
                            <div class="label">
                                Hosting
                            </div>

                            <div class="value">
                                Azure App Service
                            </div>
                        </div>

                        <div class="detail">
                            <div class="label">
                                Deployment
                            </div>

                            <div class="value">
                                GitHub Actions
                            </div>
                        </div>

                    </div>

                </div>

                <div class="footer">
                    Infrastructure provisioned using Terraform
                </div>

            </div>

        </main>

    </body>
    </html>
    """;

    return Results.Content(html, "text/html");
});

app.MapGet("/api/status", () =>
{
    return Results.Ok(new
    {
        status = "Healthy",
        service = "API",
        version = "3.0",
        deployment = "GitHub Actions",
        infrastructure = "Terraform",
        message = "CI/CD deployment updated successfully",
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

app.MapGet("/api/deployment", () =>
{
    return Results.Ok(new
    {
        status = "Deployed",
        version = "3.0",
        pipeline = "GitHub Actions",
        infrastructure = "Terraform",
        platform = "Microsoft Azure",
        message = "API deployment validation successful",
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
    }).ToArray();

    return Results.Ok(forecast);
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}