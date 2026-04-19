using System.Text.Json;
using System.Text.Json.Serialization;

namespace jatt_api.Configuration;

public class JsonConfiguration
{
  public static JsonSerializerOptions SerializerOptions { get; } =
    new JsonSerializerOptions
    {
      DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
      PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
      Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) },
    };

  public static Action<Microsoft.AspNetCore.Http.Json.JsonOptions> PrepareOptions { get; } =
    opt =>
    {
      opt.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
      opt.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
      opt.SerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
    };
}
