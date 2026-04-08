FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["jatt-ai-service.csproj", "."]
RUN dotnet restore "jatt-ai-service.csproj"
COPY . .
RUN dotnet build "jatt-ai-service.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "jatt-ai-service.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "jatt-ai-service.dll"]
