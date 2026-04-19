using jatt_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace jatt_api.Function;

public class TaskFunctions(CosmosClient cosmosClient, ILogger<TaskFunctions> logger)
{
  [Function("GetTasks")]
  public async Task<IResult> GetTasks(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "tasks")]
    [AsParameters]
      GetTaskQuery query
  )
  {
    var container = cosmosClient.GetContainer("JattDb", "Tasks");
    var sql = "SELECT * FROM c WHERE c.userId = @userId";
    var q = new QueryDefinition(sql).WithParameter("@userId", query.UserId);

    if (logger.IsEnabled(LogLevel.Information))
      logger.LogInformation("Querying tasks for userId={UserId}", query.UserId);

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
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "tasks")] CreateTaskRequest req
  )
  {
    if (logger.IsEnabled(LogLevel.Information))
      logger.LogInformation("Creating task with title: {Title}", req.Title);

    var newTask = new TaskRecord
    {
      Id = Guid.NewGuid().ToString(),
      CreatedAt = DateTime.UtcNow,
      Title = req.Title,
      Description = req.Description,
      Priority = req.Priority,
      Tags = req.Tags,
      DueDate = req.DueDate,
      UserId = req.UserId,
    };

    return new CreateTaskResponse
    {
      Task = newTask,
      HttpResponse = Results.Created($"/api/tasks/{newTask.Id}", newTask),
    };
  }
}
