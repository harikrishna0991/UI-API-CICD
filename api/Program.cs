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


app.MapGet("/api/deployment", () =>
{
    return Results.Ok(new
    {
        status = "Deployed",
        version = "4.0.0",
        release = "API-Release-4",
        pipeline = "GitHub Actions",
        infrastructure = "Terraform",
        platform = "Microsoft Azure",
        message = "API Release 4 deployment validation successful",
        timestamp = DateTime.UtcNow
    });
});


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


app.Run();