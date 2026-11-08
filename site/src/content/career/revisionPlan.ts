export interface RevisionDay {
  day: number;
  title: string;
  theme: string;
  mustKnows: string[];
  trapQuestion: {
    question: string;
    trap: string;
    correctAnswer: string;
  };
  cheatCode: string;
}

export const revisionPlan: RevisionDay[] = [
  {
    day: 1,
    title: 'Day 1: .NET Architecture & Memory Mechanics',
    theme: 'Foundations: CLR, JIT Compiler, Stack vs Heap, Boxing/Unboxing, Garbage Collection Generations (0, 1, 2).',
    mustKnows: [
      'Roslyn compiles C# source into CIL (.dll). The CLR JIT compiler converts IL into native CPU instructions at runtime.',
      'Value types (structs, int, bool) live on the execution stack. Reference types (classes, strings) live on the managed heap.',
      'Boxing is allocating a value type onto the heap as an object. Avoid it by using generic collections (`List<int>`) instead of non-generic (`ArrayList`).',
      '.NET GC has 3 generations: Gen 0 (short-lived temporary objects), Gen 1 (buffer/medium), Gen 2 (long-lived static singletons).',
    ],
    trapQuestion: {
      question: 'Is a string in C# a value type or reference type?',
      trap: 'Candidates assume it is a value type because strings compare by value equality (`s1 == s2`).',
      correctAnswer: 'String is an immutable reference type stored on the managed heap. Equality operators are overloaded for value semantics.',
    },
    cheatCode: `// Zero-allocation string inspection via ReadOnlySpan<char>
ReadOnlySpan<char> span = "Karmatix .NET".AsSpan();
bool startsWith = span.StartsWith("Karmatix");`,
  },
  {
    day: 2,
    title: 'Day 2: C# 14 Language Constructs & OOP',
    theme: 'Object-Oriented Design: Records, Structs, Pattern Matching, Interfaces, Nullable Reference Types.',
    mustKnows: [
      '`record` types provide built-in value equality and non-destructive mutation (`with { }`). Essential for DTOs.',
      'Interfaces define contracts with no state. Classes can implement multiple interfaces, but only inherit from one base class.',
      'Pattern matching (`switch (shape) { Circle c => ..., Square s => ... }`) replaces complex `is` / `as` casting.',
      'Nullable Reference Types (`string?`) allow the C# compiler to detect potential NullReferenceExceptions at build time.',
    ],
    trapQuestion: {
      question: 'What is the difference between `is` operator and `as` operator in C#?',
      trap: 'Thinking both throw exceptions if casting fails.',
      correctAnswer: '`is` returns a boolean (or binds a pattern variable). `as` attempts a safe cast, returning `null` on failure without throwing an InvalidCastException.',
    },
    cheatCode: `public record StudentDto(int Id, string FullName, double Gpa);
// Non-destructive mutation:
var updated = student with { Gpa = 3.95 };`,
  },
  {
    day: 3,
    title: 'Day 3: LINQ & Modern Collections',
    theme: 'Query Mastery: IEnumerable vs IQueryable, Deferred Execution, Dictionary vs List performance.',
    mustKnows: [
      'Deferred Execution: LINQ queries do NOT execute when defined. They execute only when enumerated with `foreach`, `.ToList()`, or `.First()`.',
      '`IEnumerable` filters records in application RAM. `IQueryable` translates expression trees into database SQL queries via EF Core.',
      '`Dictionary<TKey, TValue>` and `HashSet<T>` provide O(1) constant time lookups using hash buckets.',
      'Avoid multiple enumeration: calling `.Count()` and then iterating over an `IEnumerable` queries the database twice.',
    ],
    trapQuestion: {
      question: 'What will happen if you query `students.Where(s => s.Active);` without calling `.ToList()`?',
      trap: 'Thinking the database has already been queried.',
      correctAnswer: 'Nothing! It creates a query definition (deferred execution). The SQL is only dispatched when you iterate through the results.',
    },
    cheatCode: `var topScores = students
    .Where(s => s.Score >= 80)
    .OrderByDescending(s => s.Score)
    .Select(s => new { s.Name, s.Score })
    .ToList();`,
  },
  {
    day: 4,
    title: 'Day 4: Asynchronous & High-Performance C#',
    theme: 'Concurrency: async/await, Task, Thread Pool, CancellationToken, ValueTasks.',
    mustKnows: [
      '`async` and `await` do not create new threads; they release the current thread back to the thread pool while awaiting I/O.',
      'Never block with `.Result` or `.Wait()`. Under heavy production load, this causes thread pool starvation and deadlocks.',
      'Always pass `CancellationToken` to all asynchronous database and HTTP calls so canceled browser requests abort server work.',
      'Use `Task.WhenAll` to run independent asynchronous operations concurrently instead of awaiting them in a slow sequential loop.',
    ],
    trapQuestion: {
      question: 'Why should you avoid `async void` except in UI event handlers?',
      trap: 'Believing `async void` is fine for background fire-and-forget tasks.',
      correctAnswer: '`async void` methods cannot be awaited, and unhandled exceptions crash the entire operating system process immediately.',
    },
    cheatCode: `public async Task<WeatherReport> GetReportAsync(CancellationToken ct)
{
    var forecastTask = _api.GetForecastAsync(ct);
    var alertTask = _api.GetAlertsAsync(ct);
    await Task.WhenAll(forecastTask, alertTask);
    return new WeatherReport(await forecastTask, await alertTask);
}`,
  },
  {
    day: 5,
    title: 'Day 5: ASP.NET Core Web APIs & Middleware',
    theme: 'Backend Infrastructure: Request Pipeline, Dependency Injection Lifetimes, Minimal APIs, Validation.',
    mustKnows: [
      'Middleware executes in strict order like an onion: incoming request flows down through middleware 1, 2, 3, and response flows back out 3, 2, 1.',
      'Transient: created fresh every time requested. Scoped: created once per incoming HTTP request. Singleton: created once for application lifetime.',
      'Never inject a Scoped service (like `DbContext`) into a Singleton! It locks the DbContext instance, causing memory leaks and threading collisions.',
      'Minimal APIs map routes directly using `app.MapGet()` and `app.MapPost()` without the heavy controller overhead.',
    ],
    trapQuestion: {
      question: 'What happens if you inject `DbContext` (Scoped) into a Singleton background worker?',
      trap: 'Thinking the dependency injection container will create a new DbContext each time automatically.',
      correctAnswer: 'It causes a captive dependency error. The Singleton holds that single DbContext forever, leading to concurrency exceptions and stale cached entities.',
    },
    cheatCode: `var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IOrderService, OrderService>();
var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
app.MapGet("/api/health", () => Results.Ok(new { status = "Healthy" }));
app.Run();`,
  },
  {
    day: 6,
    title: 'Day 6: Entity Framework Core & Database Optimization',
    theme: 'Data Persistence: DbContext, Migrations, Eager vs Lazy Loading, The N+1 Problem, AsNoTracking.',
    mustKnows: [
      'The N+1 Problem occurs when fetching parent records and loading child items inside a loop (1 query for parents + N queries for children). Fix with `.Include()`.',
      'Use `.AsNoTracking()` for all read-only GET queries to bypass change tracking memory overhead and speed up queries by 2x.',
      'EF Core Migrations version database schemas in C# files (`dotnet ef migrations add`, `dotnet ef database update`).',
      'Always use parameterized LINQ queries. EF Core automatically parameterizes queries, preventing SQL Injection.',
    ],
    trapQuestion: {
      question: 'How do you fix an N+1 query problem when loading Books and their Authors in EF Core?',
      trap: 'Running a second `foreach` query to find authors.',
      correctAnswer: 'Use eager loading with `_context.Books.Include(b => b.Author).ToListAsync()` to generate a single efficient SQL JOIN.',
    },
    cheatCode: `// Fast read-only query with eager loading:
var books = await _db.Books
    .AsNoTracking()
    .Include(b => b.Author)
    .Where(b => b.PublishedYear >= 2020)
    .ToListAsync();`,
  },
  {
    day: 7,
    title: 'Day 7: Mock Test Blitz, Docker & Placement Final Check',
    theme: 'Final Polish: xUnit automated tests, Docker multi-stage builds, HTTP status codes, placement mock test review.',
    mustKnows: [
      'HTTP Status Codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error.',
      'Unit tests in xUnit use `[Fact]` for single tests and `[Theory]` with `[InlineData]` for parameterized inputs.',
      'Docker multi-stage builds compile with the heavy SDK image, and copy only the compiled binaries to the tiny runtime image (reducing image size from 800MB to 100MB).',
      'Take at least 2 full timed 25-minute mock tests to train your clock management and eliminate hesitation on standard syntax questions.',
    ],
    trapQuestion: {
      question: 'What is the difference between 401 Unauthorized and 403 Forbidden?',
      trap: 'Thinking they are interchangeable.',
      correctAnswer: '401 means "Who are you? (Unauthenticated / invalid credentials)". 403 means "We know who you are, but you lack permission to access this resource (Forbidden)".',
    },
    cheatCode: `[Theory]
[InlineData(10, true)]
[InlineData(-5, false)]
public void AgeValidation_ReturnsExpected(int age, bool expected)
{
    var validator = new AgeValidator();
    Assert.Equal(expected, validator.IsValid(age));
}`,
  },
];

