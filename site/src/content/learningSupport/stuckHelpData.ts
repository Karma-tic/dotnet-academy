export interface HelpCommunity {
  name: string;
  platform: 'Stack Overflow' | 'Reddit' | 'Discord' | 'GitHub Discussions' | 'Official';
  url: string;
  bestFor: string;
  responseSpeed: 'Within minutes' | 'Within hours' | '1–2 days';
  postingRules: string;
  badgeText: string;
}

export interface CommonErrorDiagnosis {
  code: string;
  title: string;
  errorType: 'Compiler Error' | 'Runtime Exception' | 'EF Core / Database Error';
  symptom: string;
  cause: string;
  badCode: string;
  goodCode: string;
  preventionTip: string;
}

export const helpCommunitiesData: HelpCommunity[] = [
  {
    name: 'Stack Overflow [c#] & [.net] Tags',
    platform: 'Stack Overflow',
    url: 'https://stackoverflow.com/questions/tagged/c%23',
    bestFor: 'Specific code-level bugs, unexpected compiler diagnostics, and library behavior.',
    responseSpeed: 'Within minutes',
    postingRules: 'Strictly requires a Minimal Reproducible Example (MCVE). Search before posting to avoid duplicate closures.',
    badgeText: 'Highest Technical Rigor'
  },
  {
    name: 'r/dotnet Subreddit',
    platform: 'Reddit',
    url: 'https://www.reddit.com/r/dotnet/',
    bestFor: 'Architecture decisions, career questions, ecosystem news, and project feedback.',
    responseSpeed: 'Within hours',
    postingRules: 'Read subreddit sidebar rules. Tag posts with appropriate flair (e.g. Question, Discussion).',
    badgeText: 'Active Community'
  },
  {
    name: 'r/csharp Subreddit',
    platform: 'Reddit',
    url: 'https://www.reddit.com/r/csharp/',
    bestFor: 'C# language syntax, object-oriented design questions, and beginner learning hurdles.',
    responseSpeed: 'Within hours',
    postingRules: 'No low-effort posts. Format code blocks using markdown indentation or triple backticks.',
    badgeText: 'Beginner Friendly'
  },
  {
    name: 'C# Discord Community',
    platform: 'Discord',
    url: 'https://discord.gg/csharp',
    bestFor: 'Real-time collaborative debugging, quick sanity checks, and pair discussions with engineers.',
    responseSpeed: 'Within minutes',
    postingRules: 'Post in the designated #csharp-help or #aspnet-help channels. Paste code using pastebin or codeblocks.',
    badgeText: 'Real-time Chat'
  },
  {
    name: 'dotnet/aspnetcore GitHub Discussions',
    platform: 'GitHub Discussions',
    url: 'https://github.com/dotnet/aspnetcore/discussions',
    bestFor: 'Framework-level inquiries, preview features, and architectural questions directly with Microsoft teams.',
    responseSpeed: '1–2 days',
    postingRules: 'Keep general coding questions on Stack Overflow; use discussions for framework design and patterns.',
    badgeText: 'Official Microsoft Team'
  }
];

export const commonErrorDiagnoses: CommonErrorDiagnosis[] = [
  {
    code: 'CS0103',
    title: "The name 'xyz' does not exist in the current context",
    errorType: 'Compiler Error',
    symptom: 'The compiler refuses to build because an identifier (variable, method, or class) cannot be found.',
    cause: '1) Typo in variable name (C# is strictly case-sensitive: count != Count).\n2) Variable was declared inside an if/loop block and is out of scope.\n3) Missing using directive at top of file.',
    badCode: `// Bad: Variable declared inside block is not accessible outside
if (isValid)
{
    int studentId = 42;
}
Console.WriteLine(studentId); // error CS0103`,
    goodCode: `// Good: Declare variable in the outer scope
int studentId = 0;
if (isValid)
{
    studentId = 42;
}
Console.WriteLine(studentId);`,
    preventionTip: 'Remember variable scope is bound to the closest enclosing pair of curly braces { }.'
  },
  {
    code: 'CS0246',
    title: "The type or namespace name 'xyz' could not be found",
    errorType: 'Compiler Error',
    symptom: 'The compiler does not recognize a class, interface, or record type (e.g., DbContext, JsonSerializer, HttpClient).',
    cause: '1) Missing using directive (e.g. using Microsoft.EntityFrameworkCore;).\n2) The required NuGet package is not installed in the .csproj file.\n3) Missing project reference in a multi-project solution.',
    badCode: `// Bad: Missing using System.Text.Json;
var json = JsonSerializer.Serialize(user); // error CS0246`,
    goodCode: `// Good: Add using directive or install NuGet package
using System.Text.Json;

var json = JsonSerializer.Serialize(user); // Compiles cleanly`,
    preventionTip: 'In VS Code, press Ctrl+. (or Cmd+.) on the red squiggly to have Roslyn automatically insert the missing using statement or suggest the NuGet package.'
  },
  {
    code: 'CS8602 / CS8600',
    title: 'Dereference of a possibly null reference',
    errorType: 'Compiler Error',
    symptom: 'Compiler warning or error indicating code may trigger a NullReferenceException at runtime.',
    cause: 'Nullable Reference Types (NRT) is enabled in .NET 10. You are accessing a property or method on a variable typed as string? or object? without first verifying that it is not null.',
    badCode: `string? name = GetUserName();
// Bad: name might be null!
int length = name.Length; // warning CS8602`,
    goodCode: `string? name = GetUserName();
// Good: Null-conditional operator or pattern matching
int length = name?.Length ?? 0;

// Or explicit null check:
if (name is not null)
{
    Console.WriteLine(name.ToUpper());
}`,
    preventionTip: 'Treat nullable compiler warnings as errors. Use the null-coalescing operator (??) and null-conditional operator (?.) to eliminate null crashes.'
  },
  {
    code: 'NullReferenceException',
    title: 'Object reference not set to an instance of an object',
    errorType: 'Runtime Exception',
    symptom: 'Application crashes at runtime with a yellow screen or unhandled console exception.',
    cause: 'You attempted to access a member (method, property, indexer) on a variable holding null. Very common when forgetting to initialize a collection property (like new List<T>()) or when Dependency Injection failed to resolve a service.',
    badCode: `public class Customer
{
    public List<Order> Orders { get; set; } // Null by default!
}

var c = new Customer();
c.Orders.Add(new Order()); // Throws NullReferenceException!`,
    goodCode: `public class Customer
{
    // Good: Always initialize collections to empty, never null
    public List<Order> Orders { get; set; } = [];
}

var c = new Customer();
c.Orders.Add(new Order()); // Works reliably`,
    preventionTip: 'Always initialize collection properties with default empty expressions (`= [];` or `= new();`). Never return null collections; return Array.Empty<T>() or an empty list.'
  },
  {
    code: 'InvalidOperationException',
    title: 'Sequence contains no elements (from .First() or .Single())',
    errorType: 'Runtime Exception',
    symptom: 'LINQ query throws InvalidOperationException when querying a list or database table.',
    cause: 'You invoked .First() or .Single() on a collection where no elements matched the predicate. .First() assumes at least one item MUST exist.',
    badCode: `// Bad: Throws if student with ID 99 doesn't exist
var student = context.Students.First(s => s.Id == 99);`,
    goodCode: `// Good: Use FirstOrDefault and handle null gracefully
var student = await context.Students.FirstOrDefaultAsync(s => s.Id == 99);
if (student is null)
{
    return Results.NotFound(new { message = "Student not found" });
}`,
    preventionTip: 'Always use .FirstOrDefaultAsync() for lookups where the resource may not exist (e.g., user input IDs in web APIs).'
  },
  {
    code: 'EF_CONCURRENCY',
    title: 'A second operation was started on this context instance before a previous operation completed',
    errorType: 'EF Core / Database Error',
    symptom: 'Web API crashes when handling multiple simultaneous requests or executing asynchronous DB calls.',
    cause: '1) Forgot to `await` an asynchronous EF Core call (like `context.Users.ToListAsync()`), causing two queries to run on the same DbContext instance concurrently.\n2) Registered DbContext as Singleton instead of Scoped.\n3) Sharing a single DbContext across parallel Task.Run or background threads.',
    badCode: `// Bad: Forgot await! The method returns while query is still executing
public Task<List<Student>> GetStudents()
{
    context.Students.ToListAsync(); // Missing await!
    return Task.FromResult(new List<Student>());
}`,
    goodCode: `// Good: Always await EF Core operations before the DbContext is reused
public async Task<List<Student>> GetStudentsAsync(CancellationToken ct)
{
    return await context.Students
        .AsNoTracking()
        .ToListAsync(ct);
}`,
    preventionTip: 'DbContext is NOT thread-safe. Always register it as Scoped (default in AddDbContext) and ensure every single async query has `await`.'
  },
  {
    code: 'HTTP_REFUSED',
    title: 'HttpRequestException: Connection refused (127.0.0.1:xxxx)',
    errorType: 'Runtime Exception',
    symptom: 'HttpClient or integration test fails when calling a local or remote REST service.',
    cause: '1) The target API service is not running.\n2) Port mismatch between launchSettings.json (e.g. API is running on port 5124, but client called 5000).\n3) Inside a Docker container, calling localhost instead of host.docker.internal or service name.',
    badCode: `// Inside Docker container:
var client = new HttpClient { BaseAddress = new Uri("http://localhost:5000") }; // Fails inside container`,
    goodCode: `// Inside Docker container, call the container network DNS or host bridge:
var client = new HttpClient { BaseAddress = new Uri("http://host.docker.internal:5000") };`,
    preventionTip: 'Check terminal output for the exact URL your server is listening on: `Now listening on: http://localhost:5124`.'
  },
  {
    code: 'DI_LIFETIME',
    title: 'Cannot consume scoped service from singleton',
    errorType: 'Runtime Exception',
    symptom: 'Application crashes during startup when building the dependency injection service provider.',
    cause: 'A Singleton service (lives for the life of the app) injected a Scoped service (like DbContext, which is intended to live for one HTTP request). This causes "captive dependencies", leading to memory leaks and cross-request state contamination.',
    badCode: `// Bad: Singleton caching a scoped DbContext
builder.Services.AddSingleton<ReportGenerator>(); // Depends on AppDbContext!
builder.Services.AddScoped<AppDbContext>();`,
    goodCode: `// Good: Use IServiceScopeFactory in Singletons, or make ReportGenerator Scoped
builder.Services.AddScoped<ReportGenerator>();
builder.Services.AddScoped<AppDbContext>();

// Or if it must be a singleton background worker:
public class ReportWorker(IServiceScopeFactory scopeFactory) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        using var scope = scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        // use db safely
    }
}`,
    preventionTip: 'Never inject a Scoped service into a Singleton. Use `IServiceScopeFactory` to create an explicit scope when background services need database access.'
  }
];
