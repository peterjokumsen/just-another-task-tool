namespace jatt_api.Models;

/**
Any changes here should be reflected in libs/shared-models
*/

public enum TaskPriority
{
  Low,
  Medium,
  High,
}

public record TaskRecord
{
  public string Id { get; init; } = string.Empty;
  public string Title { get; init; } = string.Empty;
  public string Description { get; init; } = string.Empty;
  public bool IsCompleted { get; init; }
  public TaskPriority Priority { get; init; }
  public string[] Tags { get; init; } = [];
  public DateTime? DueDate { get; init; }
  public string UserId { get; init; } = string.Empty;
  public DateTime CreatedAt { get; init; }
}
