using System.Net.NetworkInformation;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace jatt_api.Functions;

public class PingFunctions(ILogger<Ping> logger)
{
  [Function("Ping")]
  public IResult Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
  {
    logger.LogInformation("C# HTTP trigger function processed a request.");
    return Results.Ok("Welcome to Azure Functions!");
  }
}
