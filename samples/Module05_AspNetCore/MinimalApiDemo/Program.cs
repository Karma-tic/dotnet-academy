using System.ComponentModel.DataAnnotations;

namespace Karmatix.Academy.Module05;

// DTO with DataAnnotations Validation
public record CreateLessonRequest(
    [Required, StringLength(100, MinimumLength = 3)] string Title,
    [Range(1, 180)] int DurationMinutes,
    [Required] string Module
);

public record LessonResponse(Guid Id, string Title, int DurationMinutes, string Module, DateTime CreatedAt);

// Dependency Injection Service Contract
public interface ILessonService
{
    LessonResponse Create(CreateLessonRequest req);
    IEnumerable<LessonResponse> GetAll();
}

public class InMemoryLessonService : ILessonService
{
    private readonly List<LessonResponse> _lessons = [];

    public LessonResponse Create(CreateLessonRequest req)
    {
        var lesson = new LessonResponse(Guid.NewGuid(), req.Title, req.DurationMinutes, req.Module, DateTime.UtcNow);
        _lessons.Add(lesson);
        return lesson;
    }

    public IEnumerable<LessonResponse> GetAll() => _lessons.AsReadOnly();
}

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // 1. Register Services with appropriate lifetimes
        builder.Services.AddSingleton<ILessonService, InMemoryLessonService>();
        builder.Services.AddEndpointsApiExplorer();

        var app = builder.Build();

        // 2. Custom Pipeline Middleware (Timing & Logging)
        app.Use(async (context, next) =>
        {
            var startTime = DateTime.UtcNow;
            await next();
            var duration = (DateTime.UtcNow - startTime).TotalMilliseconds;
            context.Response.Headers.Append("X-Server-Execution-Ms", duration.ToString("F2"));
        });

        // 3. Minimal API Endpoints
        app.MapGet("/", () => Results.Ok(new
        {
            platform = "Karmatix .NET Academy Minimal API",
            status = "Online",
            verifiedOn = ".NET 10 LTS"
        }));

        app.MapGet("/api/lessons", (ILessonService service) =>
        {
            return Results.Ok(service.GetAll());
        });

        app.MapPost("/api/lessons", (CreateLessonRequest req, ILessonService service) =>
        {
            var validationResults = new List<ValidationResult>();
            var context = new ValidationContext(req);
            if (!Validator.TryValidateObject(req, context, validationResults, true))
            {
                var errors = validationResults.ToDictionary(
                    r => r.MemberNames.FirstOrDefault() ?? "Error",
                    r => new[] { r.ErrorMessage ?? "Invalid input" }
                );
                return Results.ValidationProblem(errors);
            }

            var created = service.Create(req);
            return Results.Created($"/api/lessons/{created.Id}", created);
        });

        // If run directly, run server; in tests, WebApplicationFactory can invoke
        if (args.Length == 0 || args[0] != "--no-run")
        {
            Console.WriteLine("ASP.NET Core Minimal API configured cleanly.");
        }
    }
}
