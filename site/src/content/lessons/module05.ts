import { LessonContent } from '../../components/LessonView';

export const module05Lessons: LessonContent[] = [
  {
    slug: 'aspnet-request-pipeline-and-middleware',
    title: 'How the Web Works: The ASP.NET Core Pipeline and Middleware',
    module: 5,
    moduleTitle: 'ASP.NET Core Web Development',
    order: 1,
    duration: 16,
    difficulty: 'Beginner',
    prerequisites: ['what-is-dotnet-and-csharp'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Understand HTTP methods, status codes, Kestrel, and how ASP.NET Core processes requests through a bidirectional pipeline of middleware components.',
    goal: 'Build custom middleware components and understand how request and response execution flows through the ASP.NET Core pipeline.',
    explanation: `
### What is Middleware?
In ASP.NET Core, **Middleware** is a sequence of delegate software components arranged in a pipeline. When an incoming HTTP request hits the Kestrel server:
1. It passes through each middleware component in the order they were registered in \`Program.cs\`.
2. Each middleware can inspect or modify the \`HttpContext\`, execute logic, and call \`next()\` to pass control to the subsequent component.
3. A middleware can also **short-circuit** the pipeline (for instance, returning a 401 Unauthorized or serving a static file directly without invoking your endpoints).
4. As the response returns, each middleware executes reverse post-processing logic (e.g. adding performance headers or logging response times).

### Standard Middleware Order Matters!
Order in \`Program.cs\` is strictly sequential:
1. \`app.UseExceptionHandler()\` (Catches unhandled errors across entire pipeline)
2. \`app.UseHttpsRedirection()\`
3. \`app.UseRouting()\`
4. \`app.UseCors()\`
5. \`app.UseAuthentication()\` (Who are you?)
6. \`app.UseAuthorization()\` (Are you allowed here?)
7. \`app.MapEndpoints()\` (Minimal APIs / Controllers)
    `,
    analogy: {
      realWorldScenario: 'An airport security and boarding tunnel.',
      techMapping: 'Passengers (requests) first pass the metal detector (security middleware), then passport control (authentication), then boarding gate verification (authorization), before boarding their aircraft seat (the API endpoint). On the way out, duty-free bags are verified (response middleware).'
    },
    codeSnippet: {
      code: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Custom Middleware: Global Request Timing Header
app.Use(async (context, next) =>
{
    var timer = System.Diagnostics.Stopwatch.StartNew();

    // Call the next middleware component in the pipeline
    await next();

    timer.Stop();
    // Append execution time header to outgoing response
    context.Response.Headers["X-Response-Time-Ms"] = timer.ElapsedMilliseconds.ToString();
});

// Minimal API Endpoint
app.MapGet("/api/status", () => Results.Ok(new
{
    status = "Healthy",
    timestamp = DateTime.UtcNow
}));

app.Run();
`,
      language: 'csharp',
      filename: 'MiddlewarePipelineDemo.cs',
      samplePath: 'Module05_AspNetCore/MinimalApiDemo'
    },
    walkthrough: [
      { step: 'WebApplicationBuilder', detail: 'Configures configuration, logging, and dependency injection services.' },
      { step: 'app.Use', detail: 'Registers an inline custom middleware delegate accepting HttpContext and next Func<Task>.' },
      { step: 'await next()', detail: 'Passes execution down to downstream middleware and the target endpoint.' },
      { step: 'Post-Execution Header', detail: 'Appends timing diagnostics to the outgoing HTTP response headers.' }
    ],
    commonMistakes: [
      {
        mistake: 'Placing app.UseAuthorization() before app.UseAuthentication().',
        whyItFails: 'Authorization checks require an authenticated ClaimsPrincipal; checking permissions before authenticating fails or causes false 401s.',
        fix: 'Always place UseAuthentication() immediately BEFORE UseAuthorization().'
      }
    ],
    practiceTask: {
      title: 'Create an API Key Middleware',
      task: 'Write a middleware component that checks for an "X-API-KEY" header on incoming requests, returning Results.Unauthorized() if missing or incorrect.',
      hints: ['Inspect context.Request.Headers["X-API-KEY"]', 'Return context.Response.StatusCode = 401 and omit await next()'],
      solutionCode: `app.Use(async (context, next) =>
{
    if (!context.Request.Headers.TryGetValue("X-API-KEY", out var key) || key != "SecretKey123")
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsync("Invalid or missing API key.");
        return; // Short-circuit pipeline
    }
    await next();
});`
    },
    quiz: [
      {
        question: 'What happens when a middleware does not call "await next()"?',
        options: ['The computer restarts', 'The request pipeline is short-circuited and downstream middleware and endpoints are not executed', 'The compiler throws a warning', 'The request times out after 60 seconds'],
        correctIndex: 1,
        explanation: 'Omitting await next() short-circuits the pipeline, returning the current response directly to the client.'
      }
    ]
  },
  {
    slug: 'dependency-injection-lifetimes',
    title: 'Dependency Injection Lifetimes & Captive Dependencies',
    module: 5,
    moduleTitle: 'ASP.NET Core Web Development',
    order: 2,
    duration: 18,
    difficulty: 'Intermediate',
    prerequisites: ['aspnet-request-pipeline-and-middleware'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Master the three built-in service lifetimes (Transient, Scoped, Singleton) in ASP.NET Core, and learn how to diagnose and prevent the dangerous Captive Dependency defect.',
    goal: 'Configure service registrations correctly and eliminate captive dependency bugs in production APIs.',
    explanation: `
### The 3 Built-in Service Lifetimes
1. **Transient (\`AddTransient\`)**:
   - Created **every single time** requested.
   - Ideal for lightweight, stateless services with zero shared state.
2. **Scoped (\`AddScoped\`)**:
   - Created **once per client HTTP request**. All classes resolving the service within that same HTTP request share the identical instance.
   - Ideal for **DbContext**, Unit of Work, and per-request user context services.
3. **Singleton (\`AddSingleton\`)**:
   - Created **once upon first request** and lives for the entire application process lifetime.
   - Ideal for memory caches, background workers, and thread-safe calculation engines.

### The "Captive Dependency" Bug (Interview Favorite!)
A **Captive Dependency** occurs when a service with a longer lifetime consumes a service with a shorter lifetime.
- Example: **Injecting a Scoped service (like DbContext) into a Singleton service.**
- **Why it breaks**: The Scoped DbContext is held in the Singleton's memory forever. It never gets disposed, accumulating tracked entities (memory leak) and crashing on concurrent requests with \`InvalidOperationException: A second operation was started on this context instance\`.
    `,
    analogy: {
      realWorldScenario: 'Hotel amenities and guest room keys.',
      techMapping: 'Transient is a disposable paper napkin (used once, thrown away). Scoped is your hotel room electronic keycard (active for the duration of your stay/request, revoked on checkout). Singleton is the main hotel lobby building (stands permanently for years for all visitors).'
    },
    codeSnippet: {
      code: `var builder = WebApplication.CreateBuilder(args);

// 1. Transient: New instance every resolution
builder.Services.AddTransient<IEmailValidator, EmailValidator>();

// 2. Scoped: Same instance per HTTP request (standard for DbContext)
builder.Services.AddScoped<IOrderService, OrderService>();

// 3. Singleton: Single instance for entire application lifetime
builder.Services.AddSingleton<ICacheManager, MemoryCacheManager>();

// Safe pattern: If a Singleton background worker needs a Scoped DbContext,
// use IServiceScopeFactory to create an explicit scope:
public class BackgroundReportingWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public BackgroundReportingWorker(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var scope = _scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AcademyDbContext>();
        // db is safely scoped and disposed when the scope ends!
    }
}
`,
      language: 'csharp',
      filename: 'DependencyInjectionLifetimes.cs',
      samplePath: 'Module05_AspNetCore/MinimalApiDemo'
    },
    walkthrough: [
      { step: 'AddTransient', detail: 'Registers lightweight stateless components.' },
      { step: 'AddScoped', detail: 'Registers database and business services bound to single HTTP request scopes.' },
      { step: 'AddSingleton', detail: 'Registers shared state and background queue workers.' },
      { step: 'IServiceScopeFactory', detail: 'Provides the safe mechanism for long-lived singletons to create short-lived scopes on demand.' }
    ],
    commonMistakes: [
      {
        mistake: 'Injecting a Scoped DbContext directly into a Singleton service.',
        whyItFails: 'Causes captive dependencies: concurrency collisions, multithreading exceptions, and memory leaks.',
        fix: 'Inject IServiceScopeFactory into the Singleton and call CreateScope() to resolve the DbContext inside a using block.'
      }
    ],
    practiceTask: {
      title: 'Detect Captive Dependency',
      task: 'Review a service registration where a Singleton CacheWarmer injects a Scoped UserDbContext. Refactor it using IServiceScopeFactory.',
      hints: ['Replace UserDbContext in constructor with IServiceScopeFactory', 'Use using var scope = _factory.CreateScope()'],
      solutionCode: `public class CacheWarmer
{
    private readonly IServiceScopeFactory _scopeFactory;
    public CacheWarmer(IServiceScopeFactory scopeFactory) => _scopeFactory = scopeFactory;

    public async Task WarmAsync()
    {
        using var scope = _scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<UserDbContext>();
        await db.Users.ToListAsync();
    }
}`
    },
    quiz: [
      {
        question: 'What is a "Captive Dependency" in ASP.NET Core?',
        options: ['A missing NuGet package', 'A shorter-lived service (such as Scoped) injected into and trapped by a longer-lived service (such as Singleton)', 'A circular dependency between two classes', 'A dependency that blocks thread execution'],
        correctIndex: 1,
        explanation: 'A captive dependency occurs when a singleton holds a reference to a scoped instance, keeping it alive beyond its intended request lifecycle.'
      }
    ]
  },
  {
    slug: 'minimal-apis-validation-and-errors',
    title: 'Minimal APIs, DTOs, and RFC ProblemDetails Error Handling',
    module: 5,
    moduleTitle: 'ASP.NET Core Web Development',
    order: 3,
    duration: 20,
    difficulty: 'Intermediate',
    prerequisites: ['dependency-injection-lifetimes'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Build high-performance Minimal APIs, enforce input validation with DataAnnotations and FluentValidation, and return RFC 7807 / 9457 ProblemDetails responses.',
    goal: 'Create clean, secure API endpoints with input validation and standardized error contracts.',
    explanation: `
### Minimal APIs vs MVC Controllers
Minimal APIs eliminate boilerplate controller classes and action filters, mapping HTTP endpoints directly to route handlers using lambdas. They offer faster cold starts and lower memory overhead.

### Why DTOs Are Non-Negotiable
Never expose internal database entities directly in API endpoints:
- **Mass Assignment Vulnerability (Over-Posting)**: An attacker sends \`{ "isAdmin": true }\` in request JSON. If you bind directly to an entity, EF Core persists the malicious admin role!
- **Schema Decoupling**: Database schema changes should never break public client JSON contracts.

### RFC ProblemDetails (RFC 7807 / 9457)
Modern HTTP APIs return standardized machine-readable errors with \`type\`, \`title\`, \`status\`, and \`detail\`, rather than random error formats or leaking internal stack traces.
    `,
    analogy: {
      realWorldScenario: 'Standard medical lab results.',
      techMapping: 'If every doctor wrote blood test results in a different custom handwriting format, hospitals would suffer chaotic errors. RFC ProblemDetails is the standardized lab report format that all client machines understand uniformly.'
    },
    codeSnippet: {
      code: `using System.ComponentModel.DataAnnotations;

// 1. Immutable Input DTO with Validation Attributes
public record CreateCourseDto(
    [Required, StringLength(100, MinimumLength = 3)] string Title,
    [Range(1, 100)] int MaxStudents,
    [Required] string Category
);

public record CourseResponseDto(Guid Id, string Title, int MaxStudents, string Category);

// 2. Minimal API with Validation and Typed Results
app.MapPost("/api/courses", (CreateCourseDto dto) =>
{
    // Model validation
    var validationResults = new List<ValidationResult>();
    if (!Validator.TryValidateObject(dto, new ValidationContext(dto), validationResults, true))
    {
        var errors = validationResults.ToDictionary(
            v => v.MemberNames.FirstOrDefault() ?? "Input",
            v => new[] { v.ErrorMessage ?? "Invalid value" }
        );
        return Results.ValidationProblem(errors); // Returns RFC standard 400 Validation Problem Details
    }

    var created = new CourseResponseDto(Guid.NewGuid(), dto.Title, dto.MaxStudents, dto.Category);
    return Results.Created($"/api/courses/{created.Id}", created); // Returns 201 Created with Location
});
`,
      language: 'csharp',
      filename: 'MinimalApiValidationDemo.cs',
      samplePath: 'Module05_AspNetCore/MinimalApiDemo'
    },
    walkthrough: [
      { step: 'Input DTO', detail: 'Defines strict boundaries on acceptable input parameters using DataAnnotations.' },
      { step: 'TryValidateObject', detail: 'Validates DTO rules before any business or database execution takes place.' },
      { step: 'Results.ValidationProblem', detail: 'Generates standard RFC 7807 JSON error responses with field-level defect messages.' },
      { step: 'Results.Created', detail: 'Returns HTTP 201 with Location header pointing to the created resource.' }
    ],
    commonMistakes: [
      {
        mistake: 'Returning HTTP 200 with an internal JSON error message like { "success": false, "error": "Not found" }.',
        whyItFails: 'Violates HTTP standards, breaks HTTP caching proxies, and prevents client libraries from detecting failures via status codes.',
        fix: 'Return proper HTTP status codes: 400 Bad Request, 404 Not Found, 409 Conflict, and ProblemDetails.'
      }
    ],
    practiceTask: {
      title: 'Create a Validated User Registration Endpoint',
      task: 'Create a Minimal API POST endpoint "/api/register" that takes a RegisterUserDto (Username, Email, Age). Return 400 ValidationProblem if Age < 18 or Email is invalid, and 201 Created on success.',
      hints: ['Use [EmailAddress] and [Range(18, 120)]', 'Return Results.ValidationProblem or Results.Created'],
      solutionCode: `app.MapPost("/api/register", (RegisterUserDto dto) =>
{
    if (dto.Age < 18)
    {
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            ["Age"] = ["You must be at least 18 years old."]
        });
    }
    return Results.Created("/api/users/1", new { id = 1, username = dto.Username });
});`
    },
    quiz: [
      {
        question: 'What is the primary security danger of binding API requests directly to Entity Framework entity models (Over-Posting)?',
        options: ['It slows down network transfer', 'Attackers can supply unexpected properties (like IsAdmin = true) that get saved into the database', 'It causes database deadlocks', 'It crashes the Kestrel web server'],
        correctIndex: 1,
        explanation: 'Over-posting allows malicious callers to bind sensitive properties not intended for public modification unless isolated by DTOs.'
      }
    ]
  }
];

