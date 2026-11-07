# Stage 1: Build & Compile
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["Capstone7_ProductionApi.csproj", "./"]
RUN dotnet restore "Capstone7_ProductionApi.csproj"

COPY . .
RUN dotnet publish "Capstone7_ProductionApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Lean, Secure Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

# Run as non-root standard user for container security
USER $APP_UID

COPY --from=build /app/publish .

ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "Capstone7_ProductionApi.dll"]

