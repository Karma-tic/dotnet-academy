namespace Karmatix.Academy.Capstones.ProductionApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add health check services
        builder.Services.AddHealthChecks();
        builder.Services.AddEndpointsApiExplorer();

        var app = builder.Build();

        // Health check probe endpoints for Kubernetes / Azure Container Apps
        app.MapHealthChecks("/healthz"); // Liveness probe
        app.MapGet("/ready", () => Results.Ok(new { status = "Ready", timestamp = DateTime.UtcNow })); // Readiness probe

        // Core business endpoints
        app.MapGet("/api/v1/info", () => Results.Ok(new
        {
            app = "Karmatix Enterprise Production API",
            version = "1.0.0",
            framework = ".NET 10 LTS",
            csharp = "C# 14",
            environment = app.Environment.EnvironmentName,
            status = "Healthy & Observable"
        }));

        if (args.Length == 0 || args[0] != "--no-run")
        {
            Console.WriteLine("Capstone 7: Production Observable API Configured.");
        }
    }
}
