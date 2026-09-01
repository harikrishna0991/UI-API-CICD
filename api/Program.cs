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

    return forecast;
})
.WithName("GetWeatherForecast");

app.MapGet("/api/status", () =>
{
    return new
    {
        status = "Running",
        message = "API deployed through GitHub Actions",
        version = "2.0"
    };
})
.WithName("GetApiStatus");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
