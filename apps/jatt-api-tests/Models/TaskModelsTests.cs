using System.Data.Common;
using jatt_api.Configuration;
using jatt_api.Models;

namespace jatt_api_tests.Models;

public class TaskModelTests
{
  [Fact]
  public void TaskRecord_ShouldSerializeCorrectly()
  {
    var task = new TaskRecord
    {
      Id = "1",
      Title = "Title",
      Description = "Description",
      IsCompleted = false,
      Priority = TaskPriority.High,
      Tags = ["tag1", "tag2"],
      DueDate = new DateTime(2024, 12, 31),
      UserId = "user1",
      CreatedAt = new DateTime(2024, 1, 1),
    };

    var json = System.Text.Json.JsonSerializer.Serialize(task, JsonConfiguration.SerializerOptions);

    Assert.Contains("\"title\":\"Title\"", json);
    Assert.Contains("\"priority\":\"high\"", json);
  }
}
