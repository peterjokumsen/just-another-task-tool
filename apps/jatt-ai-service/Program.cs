using Azure;
using Azure.AI.TextAnalytics;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add configuration
builder.Configuration.AddEnvironmentVariables();

// Add services to the container.
builder.Services.AddOpenApi();

// Register Text Analytics Client
var aiEndpoint = builder.Configuration["AI_SERVICES_ENDPOINT"];
var aiKey = builder.Configuration["AI_SERVICES_KEY"];

if (!string.IsNullOrEmpty(aiEndpoint) && !string.IsNullOrEmpty(aiKey))
{
  builder.Services.AddSingleton(
    new TextAnalyticsClient(new Uri(aiEndpoint), new AzureKeyCredential(aiKey))
  );
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/health", () => Results.Ok(new { status = "Healthy", netVersion = "10.0" }));

app.MapPost(
    "/ai/sentiment",
    async ([FromBody] SentimentRequest request, TextAnalyticsClient client) =>
    {
      if (client == null)
        return Results.Problem("AI Service not configured.");

      try
      {
        DocumentSentiment response = await client.AnalyzeSentimentAsync(request.Text);
        return Results.Ok(
          new
          {
            sentiment = response.Sentiment.ToString(),
            confidenceScores = response.ConfidenceScores,
          }
        );
      }
      catch (Exception ex)
      {
        return Results.Problem(ex.Message);
      }
    }
  )
  .WithName("AnalyzeSentiment");

app.MapGet(
    "/weatherforecast",
    () =>
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
        "Sweltering",
        "Scorching",
      };
      var forecast = Enumerable
        .Range(1, 5)
        .Select(index => new WeatherForecast(
          DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
          Random.Shared.Next(-20, 55),
          summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
      return forecast;
    }
  )
  .WithName("GetWeatherForecast");

app.Run();

record SentimentRequest(string Text);

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
  public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
