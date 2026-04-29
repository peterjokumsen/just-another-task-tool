using System.Security.Claims;
using jatt_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;

namespace jatt_api.Function;

[Authorize]
public class TaskFunctions(CosmosClient cosmosClient, ILogger<TaskFunctions> logger)
{
  [Function("GetTasks")]
  public async Task<IResult> GetTasks(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "tasks")] HttpRequest req
  )
  {
    var userId =
      req.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
      ?? req.HttpContext.User.FindFirst("oid")?.Value;

    if (string.IsNullOrEmpty(userId))
    {
      logger.LogWarning("GetTasks called without authenticated user ID");
      return Results.Unauthorized();
    }

    var container = cosmosClient.GetContainer("JattDb", "Tasks");
    var sql = "SELECT * FROM c WHERE c.userId = @userId";
    var q = new QueryDefinition(sql).WithParameter("@userId", userId);

    if (logger.IsEnabled(LogLevel.Information))
      logger.LogInformation("Querying tasks for userId={UserId}", userId);

    var iterator = container.GetItemQueryIterator<TaskRecord>(q);
    var tasks = new List<TaskRecord>();
    while (iterator.HasMoreResults)
    {
      var response = await iterator.ReadNextAsync();
      tasks.AddRange(response);
      if (logger.IsEnabled(LogLevel.Information))
        logger.LogInformation("Fetched {Count} items from Cosmos DB", response.Count);
    }

    if (logger.IsEnabled(LogLevel.Information))
      logger.LogInformation("Retrieved tasks for user. {TaskCount}", tasks.Count);

    return Results.Ok(tasks);
  }

  [Function("CreateTask")]
  public async Task<CreateTaskResponse> CreateTask(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "tasks")] HttpRequest req, CreateTaskRequest body
  )
  {
    if (logger.IsEnabled(LogLevel.Information))
      logger.LogInformation("Creating task with title: {Title}", body.Title);

    var userId =
      req.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
      ?? req.HttpContext.User.FindFirst("oid")?.Value;

    if (string.IsNullOrEmpty(userId))
    {
      return new CreateTaskResponse { HttpResponse = Results.Unauthorized() };
    }

    var newTask = new TaskRecord
    {
      Id = Guid.NewGuid().ToString(),
      CreatedAt = DateTime.UtcNow,
      Title = body.Title,
      Description = body.Description,
      Priority = body.Priority,
      Tags = body.Tags,
      DueDate = body.DueDate,
      UserId = userId,
    };

    return new CreateTaskResponse
    {
      Task = newTask,
      HttpResponse = Results.Created($"/api/tasks/{newTask.Id}", newTask),
    };
  }
}
