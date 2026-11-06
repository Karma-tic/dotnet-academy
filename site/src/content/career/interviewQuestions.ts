export interface InterviewQuestion {
  id: string;
  category: 'C# Basics' | 'OOP' | 'LINQ' | 'Async & Threading' | 'EF Core' | 'ASP.NET Core' | 'Dependency Injection' | 'Security' | 'Architecture' | 'SQL & Performance';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  modelAnswer: string;
  keyTakeaway: string;
}

export const interviewQuestions: InterviewQuestion[] = [
  // C# Basics (Beginner to Intermediate)
  {
    id: 'cs-01',
    category: 'C# Basics',
    level: 'Beginner',
    question: 'What is the Common Language Runtime (CLR) and what role does it play in .NET execution?',
    modelAnswer: 'The CLR is the execution engine of .NET. When you compile C#, the Roslyn compiler outputs Common Intermediate Language (CIL/IL) and metadata into an assembly (.dll). At runtime, the CLR uses a Just-In-Time (JIT) compiler to convert IL into native machine instructions for the host CPU/OS. The CLR also manages automatic memory via the Garbage Collector (GC), enforces type safety, handles exceptions, and manages application threads.',
    keyTakeaway: 'Source code -> Roslyn Compiler -> IL (.dll) -> CLR JIT -> Native CPU Machine Code.'
  },
  {
    id: 'cs-02',
    category: 'C# Basics',
    level: 'Beginner',
    question: 'What is the fundamental difference between Value Types and Reference Types in C#?',
    modelAnswer: 'Value types (structs, primitives like int, double, bool, enums) hold their data directly where declared (typically the stack or embedded inside a heap object). Assigning a value type creates an independent copy. Reference types (classes, strings, arrays, delegates, records) store a pointer/reference to data allocated on the managed heap. Assigning a reference type copies only the memory address, so both variables point to the exact same object in memory.',
    keyTakeaway: 'Value types hold values directly (copy by value); Reference types hold heap memory addresses (copy by reference).'
  },
  {
    id: 'cs-03',
    category: 'C# Basics',
    level: 'Beginner',
    question: 'What are Nullable Reference Types (NRT) in modern C# and how do they prevent NullReferenceException?',
    modelAnswer: 'Starting in C# 8 (and enabled by default in modern templates), reference types are non-nullable by default unless annotated with `?` (e.g., `string?`). The Roslyn compiler performs static flow analysis to emit compiler warnings (or errors under TreatWarningsAsErrors) if you attempt to dereference a variable that could be null without a null-check. At runtime, the CLR does not enforce NRTs—they are compile-time safety guards.',
    keyTakeaway: 'NRTs catch null pointer defects at compile-time through static flow analysis.'
  },
  {
    id: 'cs-04',
    category: 'C# Basics',
    level: 'Beginner',
    question: 'What is Boxing and Unboxing, and why should high-performance code avoid them?',
    modelAnswer: 'Boxing is the process of converting a value type into an `object` reference type or interface, which forces a heap allocation and copies the value bytes into the heap. Unboxing extracts the value type back from the heap object. Boxing creates GC memory pressure, heap fragmentation, and CPU overhead. In modern .NET, boxing is avoided by using Generics (e.g., `List<int>` instead of legacy `ArrayList`).',
    keyTakeaway: 'Boxing allocates heap memory for a stack value type; avoid it by using generics and Span<T>.'
  },
  {
    id: 'cs-05',
    category: 'C# Basics',
    level: 'Intermediate',
    question: 'Explain String vs StringBuilder and when each must be used.',
    modelAnswer: 'In C#, `string` is immutable. Every concatenation or modification creates a brand new string object on the heap, discarding the old one. If you concatenate strings in a loop of 1,000 iterations, you create 1,000 temporary string objects, causing heavy GC pressure. `StringBuilder` maintains an internal mutable buffer, resizing dynamically without creating throwaway objects. Rule of thumb: Use string interpolation `$"..."` for 2–4 items; use `StringBuilder` for dynamic loops or large text assembly.',
    keyTakeaway: 'Strings are immutable; use StringBuilder for iterative concatenation in loops.'
  },
  {
    id: 'cs-06',
    category: 'C# Basics',
    level: 'Intermediate',
    question: 'What are records in modern C# and how do they differ from classes and structs?',
    modelAnswer: 'Records (`record class` or `record struct`) are reference or value types that provide built-in value-based equality (`Equals`, `==`, `!=`), non-destructive mutation via the `with` expression, a synthesized `ToString()` that prints property values, and positional constructor deconstruction. Standard classes compare references by default, whereas records compare their properties by value.',
    keyTakeaway: 'Records provide immutable, value-based equality and `with` expressions out of the box.'
  },
  {
    id: 'cs-07',
    category: 'C# Basics',
    level: 'Advanced',
    question: 'What is Span<T> and Memory<T>, and why are they crucial in modern high-throughput .NET applications?',
    modelAnswer: '`Span<T>` is a `ref struct` that represents a contiguous region of arbitrary memory (managed array, stack memory via `stackalloc`, or unmanaged native memory) without heap allocations. Slicing a span (`span.Slice(0, 5)`) does not allocate memory; it simply creates a pointer window. Because it is a `ref struct`, `Span<T>` cannot live on the heap (no async methods across await or fields in classes). `Memory<T>` is the heap-safe counterpart that can be stored in classes and passed across async boundaries.',
    keyTakeaway: 'Span<T> enables zero-allocation memory slicing across arrays, stack, and native buffers.'
  },

  // OOP & Design Patterns
  {
    id: 'oop-01',
    category: 'OOP',
    level: 'Beginner',
    question: 'Explain the four core principles of Object-Oriented Programming with simple real-world analogies.',
    modelAnswer: '1. Encapsulation: Hiding internal state behind public methods/properties (e.g., a car engine is encapsulated under the hood; you use pedals). 2. Inheritance: Reusing structure and behavior from a base class (e.g., an ElectricCar inherits from Vehicle). 3. Polymorphism: Different classes responding to the same method call in their own way (e.g., Dog and Cat both implement `MakeSound()`, but bark and meow). 4. Abstraction: Exposing only the essential interface while hiding complex implementation details (e.g., pressing an ATM button without knowing the banking backend).',
    keyTakeaway: 'Encapsulation protects state; Abstraction simplifies usage; Inheritance reuses code; Polymorphism varies behavior.'
  },
  {
    id: 'oop-02',
    category: 'OOP',
    level: 'Intermediate',
    question: 'What is the difference between an Interface and an Abstract Class, and when would you choose one over the other?',
    modelAnswer: 'An interface defines a pure contract of capabilities ("what an object can do") and supports multiple implementation in C#. An abstract class is an incomplete base class ("what an object is") that can provide shared state (fields), protected constructors, and base implementations, but C# supports single inheritance only. Choose interfaces for decoupled architecture and dependency injection. Choose abstract classes when closely related subclasses share substantial common code and state.',
    keyTakeaway: 'Use interfaces for loose coupling and DI contracts; use abstract classes for code reuse among closely related hierarchical types.'
  },
  {
    id: 'oop-03',
    category: 'OOP',
    level: 'Intermediate',
    question: 'Explain the SOLID principles with a one-sentence enterprise summary for each letter.',
    modelAnswer: 'S - Single Responsibility: A class should have only one reason to change. O - Open/Closed: Software entities should be open for extension, but closed for modification (use interfaces/abstract strategies). L - Liskov Substitution: Derived classes must be substitutable for their base types without altering correctness. I - Interface Segregation: Clients should not be forced to depend on methods they do not use (prefer small, role-specific interfaces). D - Dependency Inversion: High-level modules should depend on abstractions, not concrete implementations.',
    keyTakeaway: 'SOLID builds maintainable, testable, and extensible enterprise systems.'
  },
  {
    id: 'oop-04',
    category: 'OOP',
    level: 'Intermediate',
    question: 'What is the Repository pattern, and why do some developers consider it redundant on top of EF Core?',
    modelAnswer: 'The Repository pattern mediates between the domain and data mapping layers, acting like an in-memory collection of domain objects. Some argue it is redundant with EF Core because `DbContext` is already a Unit of Work and `DbSet<T>` is already a Repository. However, a custom repository is still beneficial when you want to encapsulate complex query logic, enforce business specifications, prevent direct EF leaking into domain services, or simplify unit testing with mocks.',
    keyTakeaway: 'DbSet is an ORM repository; custom repositories encapsulate domain query specifications.'
  },
  {
    id: 'oop-05',
    category: 'OOP',
    level: 'Advanced',
    question: 'Why is the Singleton pattern frequently considered an anti-pattern, and what is the proper way to use it in modern .NET?',
    modelAnswer: 'Classic static Singletons introduce hidden global state, tightly couple classes to a concrete implementation, make unit testing difficult because state leaks between tests, and cause concurrency bugs. In modern .NET, you do not write static Singletons with private constructors. Instead, you register your class as a Singleton in the Dependency Injection container (`builder.Services.AddSingleton<IService, Service>()`). This gives you a single instance with full testability and lifecycle management.',
    keyTakeaway: 'Never write static Singletons; let the DI container manage singleton lifecycles.'
  },

  // LINQ & Collections
  {
    id: 'linq-01',
    category: 'LINQ',
    level: 'Beginner',
    question: 'What is deferred execution in LINQ and why is it important?',
    modelAnswer: 'Deferred execution means the query is not evaluated at the point where it is defined, but rather when the sequence is actually enumerated (e.g., via a `foreach` loop, `ToList()`, `ToArray()`, `Count()`, or `First()`). This allows LINQ queries to be composed dynamically and prevents unnecessary evaluations. However, multiple enumerations will re-execute the query every time unless materialized with `ToList()`.',
    keyTakeaway: 'LINQ queries execute when enumerated, not when declared.'
  },
  {
    id: 'linq-02',
    category: 'LINQ',
    level: 'Intermediate',
    question: 'What is the crucial difference between IEnumerable<T> and IQueryable<T>?',
    modelAnswer: '`IEnumerable<T>` operates in-memory using delegates (`Func<T, bool>`). If used with a database query, it fetches all rows into client memory before applying filters. `IQueryable<T>` operates with Expression Trees (`Expression<Func<T, bool>>`). It translates your LINQ query into provider-specific SQL at the database server, sending only the filtered, paginated subset over the network.',
    keyTakeaway: 'IQueryable translates to SQL on the database server; IEnumerable executes in application memory.'
  },
  {
    id: 'linq-03',
    category: 'LINQ',
    level: 'Intermediate',
    question: 'Explain the difference between First(), FirstOrDefault(), Single(), and SingleOrDefault().',
    modelAnswer: '`First()` returns the first element; throws `InvalidOperationException` if empty. `FirstOrDefault()` returns the first element or `default(T)` (null) if empty. `Single()` returns the only element; throws if empty OR if more than 1 element matches. `SingleOrDefault()` returns the only element or `default(T)` if empty; throws if more than 1 element matches. Use `SingleOrDefault` when business rules mandate uniqueness (e.g., lookup by unique user email).',
    keyTakeaway: 'First stops at the first match; Single validates that exactly one matching record exists.'
  },
  {
    id: 'linq-04',
    category: 'LINQ',
    level: 'Advanced',
    question: 'What is the multiple enumeration problem in LINQ and how do you diagnose and prevent it?',
    modelAnswer: 'When a method returns an `IEnumerable<T>` backed by an unmaterialized query (or database query) and the caller iterates over it multiple times (e.g., `if (items.Any()) { Process(items.Count()); }`), the underlying query or database call executes multiple times. It causes performance degradation and unexpected side effects. Fix: Materialize the sequence once using `var list = items.ToList();` before multiple reads.',
    keyTakeaway: 'Call .ToList() or .ToArray() if you need to read an IEnumerable more than once.'
  },

  // Async & Threading
  {
    id: 'async-01',
    category: 'Async & Threading',
    level: 'Beginner',
    question: 'Does async/await create a new thread in .NET?',
    modelAnswer: 'No! `async` and `await` do not create background threads for I/O operations (like HTTP calls or database queries). Instead, the compiler transforms the async method into a state machine. When an `await` encounters an incomplete I/O task, it yields the current thread back to the thread pool to handle other requests. When the OS completes the I/O interrupt, a thread pool thread is assigned to resume the state machine. This maximizes server throughput.',
    keyTakeaway: 'Async/await is about asynchronous non-blocking I/O and scalability, not creating extra threads.'
  },
  {
    id: 'async-02',
    category: 'Async & Threading',
    level: 'Intermediate',
    question: 'Why should you avoid async void methods in C#?',
    modelAnswer: '`async void` methods cannot be awaited, and any unhandled exception thrown inside them cannot be caught by a caller’s `try/catch` block. The exception bubbles directly to the `SynchronizationContext` or thread pool, often crashing the entire application process. The only valid place for `async void` is top-level UI event handlers (e.g., button clicks in MAUI or WPF). All other methods must return `Task` or `Task<T>`.',
    keyTakeaway: 'Always return Task or Task<T>; use async void ONLY for UI button event handlers.'
  },
  {
    id: 'async-03',
    category: 'Async & Threading',
    level: 'Intermediate',
    question: 'What is the danger of calling .Result or .Wait() on an asynchronous Task?',
    modelAnswer: 'Calling `.Result` or `.Wait()` blocks the current thread synchronously until the task completes. In applications with a `SynchronizationContext` (like ASP.NET on legacy .NET Framework or UI apps), the awaited continuation needs to run on the captured context while that context is blocked waiting for `.Result`, creating an unrecoverable deadlock. Even on .NET Core, it causes Thread Pool Starvation under load. Always `await` asynchronously all the way down.',
    keyTakeaway: 'Sync-over-async (.Result / .Wait()) causes deadlocks and thread pool starvation.'
  },
  {
    id: 'async-04',
    category: 'Async & Threading',
    level: 'Advanced',
    question: 'How do CancellationToken and CancellationTokenSource work in production APIs?',
    modelAnswer: 'A `CancellationToken` enables cooperative cancellation across asynchronous operations. In ASP.NET Core, controller actions and Minimal APIs can accept a `CancellationToken` parameter injected automatically by the runtime. If a client closes their browser tab or network drops, the runtime cancels the token. Passing this token to EF Core (`ToListAsync(ct)`) or HttpClient ensures the server immediately halts database execution and frees resources rather than performing wasteful compute.',
    keyTakeaway: 'Pass CancellationToken through all async layers to avoid executing queries for disconnected clients.'
  },

  // Entity Framework Core
  {
    id: 'ef-01',
    category: 'EF Core',
    level: 'Beginner',
    question: 'What is DbContext in EF Core and what are its primary responsibilities?',
    modelAnswer: '`DbContext` is the primary bridge between your domain entities and the database. It combines the Unit of Work and Repository patterns. Its responsibilities include managing database connections, configuring entity mappings (via Fluent API or attributes), tracking changes made to entity instances, and generating and executing SQL for queries and `SaveChanges()`.',
    keyTakeaway: 'DbContext manages entity mappings, state tracking, and database transactions.'
  },
  {
    id: 'ef-02',
    category: 'EF Core',
    level: 'Intermediate',
    question: 'What is the N+1 query problem in EF Core and how do you resolve it?',
    modelAnswer: 'The N+1 problem occurs when a query fetches 1 collection of parents (e.g., 100 Customers) and then triggers a separate database query for each parent to load child data (e.g., Customer.Orders), resulting in 1 + 100 = 101 roundtrips. Resolution: Use Eager Loading with `.Include()` (e.g., `context.Customers.Include(c => c.Orders).ToListAsync()`) or use explicit LINQ Projections (`.Select(c => new CustomerDto { ... })`) to fetch only required columns in a single SQL JOIN.',
    keyTakeaway: 'Prevent N+1 by using .Include() or targeted LINQ .Select() projections.'
  },
  {
    id: 'ef-03',
    category: 'EF Core',
    level: 'Intermediate',
    question: 'When and why should you use AsNoTracking() in EF Core queries?',
    modelAnswer: 'By default, EF Core tracks all entities returned by queries in its `ChangeTracker` so it knows which properties were modified when `SaveChangesAsync()` is called. In read-only scenarios (like GET API endpoints), change tracking is wasted overhead. Calling `.AsNoTracking()` disables tracking, saving memory and CPU cycles while accelerating query execution.',
    keyTakeaway: 'Always use .AsNoTracking() on read-only queries in APIs for performance.'
  },
  {
    id: 'ef-04',
    category: 'EF Core',
    level: 'Advanced',
    question: 'How does EF Core handle database concurrency and optimistic locking?',
    modelAnswer: 'EF Core uses Optimistic Concurrency by designating a property as a concurrency token (e.g., `[Timestamp]` or `IsRowVersion()` in Fluent API). When generating an UPDATE or DELETE statement, EF appends `WHERE Id = @id AND RowVersion = @originalRowVersion`. If another process modified the row in the meantime, the row count affected is 0, causing EF Core to throw a `DbUpdateConcurrencyException`. The developer can catch this and implement retry or user conflict resolution.',
    keyTakeaway: 'Optimistic concurrency detects concurrent updates using rowversion / timestamp tokens.'
  },

  // ASP.NET Core & DI
  {
    id: 'asp-01',
    category: 'ASP.NET Core',
    level: 'Beginner',
    question: 'Explain the ASP.NET Core request processing pipeline and how middleware works.',
    modelAnswer: 'In ASP.NET Core, the request pipeline is constructed as a chain of middleware components configured in `Program.cs`. Each middleware receives the `HttpContext` and can either inspect/modify the request, execute logic before passing control to the next middleware via `next()`, or short-circuit the pipeline (e.g., authentication failure or returning static files). As the response unwinds, each middleware can execute logic on the outgoing response.',
    keyTakeaway: 'Middleware components form a bidirectional chain that handles requests and responses in sequence.'
  },
  {
    id: 'asp-02',
    category: 'Dependency Injection',
    level: 'Intermediate',
    question: 'Explain the three service lifetimes in ASP.NET Core Dependency Injection and the "Captive Dependency" bug.',
    modelAnswer: '1. Transient: Created every time requested. Ideal for lightweight stateless services. 2. Scoped: Created once per client HTTP request. Used for `DbContext` and business unit of work. 3. Singleton: Created once on first request and lives for the entire application lifetime. A "Captive Dependency" occurs when a longer-lived service consumes a shorter-lived service (e.g., a Singleton injecting a Scoped service). The Scoped service becomes trapped for the life of the application, leading to memory leaks and concurrency errors with DbContext.',
    keyTakeaway: 'Never inject a Scoped service into a Singleton service (Captive Dependency bug).'
  },
  {
    id: 'asp-03',
    category: 'ASP.NET Core',
    level: 'Intermediate',
    question: 'What are Minimal APIs in ASP.NET Core and how do they compare with traditional MVC Controllers?',
    modelAnswer: 'Minimal APIs (introduced in .NET 6 and expanded in .NET 8/9/10) allow developers to map HTTP endpoints directly in `Program.cs` using lambdas (`app.MapGet("/items", ...)`), bypassing the heavy MVC controller pipeline, filters, and reflection overhead. Minimal APIs have faster cold starts and lower memory footprints. MVC Controllers remain useful for large, complex enterprise applications with many related endpoints or teams used to controller conventions.',
    keyTakeaway: 'Minimal APIs provide high performance and low ceremony for modern microservices and APIs.'
  },
  {
    id: 'asp-04',
    category: 'ASP.NET Core',
    level: 'Advanced',
    question: 'How should global error handling be implemented in modern ASP.NET Core APIs?',
    modelAnswer: 'Modern ASP.NET Core recommends using the built-in exception handler middleware via `app.UseExceptionHandler()` combined with `IExceptionHandler` implementations (introduced in .NET 8), returning standard RFC 7807/9457 `ProblemDetails` responses. This separates unhandled exception logging from the client-facing error contract, ensuring sensitive stack traces and internal database schemas are never leaked to external callers.',
    keyTakeaway: 'Use IExceptionHandler and return RFC standard ProblemDetails for safe, uniform errors.'
  },

  // Security
  {
    id: 'sec-01',
    category: 'Security',
    level: 'Intermediate',
    question: 'What is the difference between Authentication and Authorization in ASP.NET Core?',
    modelAnswer: 'Authentication answers "Who are you?" by validating user credentials (e.g., password, JWT bearer token, cookie) and constructing a `ClaimsPrincipal`. Authorization answers "What are you allowed to do?" by inspecting the authenticated user’s roles, claims, or policies to grant or deny access to a specific endpoint or resource (`[Authorize(Policy = "AdminOnly")]`).',
    keyTakeaway: 'Authentication proves identity; Authorization checks permissions.'
  },
  {
    id: 'sec-02',
    category: 'Security',
    level: 'Intermediate',
    question: 'How do you prevent SQL Injection vulnerabilities in .NET applications?',
    modelAnswer: 'Never concatenate user input directly into SQL strings. In EF Core, LINQ queries automatically parameterize input. If using raw SQL queries with `FromSqlInterpolated` or `FromSql` in EF Core, use string interpolation where parameters are passed as `DbParameter` objects. In ADO.NET or Dapper, always use parameterized queries (`SELECT * FROM Users WHERE Email = @Email`, `new { Email = userInput }`).',
    keyTakeaway: 'Always use parameterized SQL queries and never concatenate raw strings into SQL commands.'
  },
  {
    id: 'sec-03',
    category: 'Security',
    level: 'Advanced',
    question: 'Explain JWT authentication and how to securely handle access token expiration and refresh tokens.',
    modelAnswer: 'A JSON Web Token (JWT) is a cryptographically signed, stateless token containing claims (subject, expiration, roles). Because JWTs are stateless, they cannot be revoked on the server until they expire. Best practice: issue short-lived access tokens (e.g., 15 minutes) and issue a cryptographically random refresh token stored securely in the database with an expiration date and revocation status. When the access token expires, the client exchanges the refresh token for a new pair.',
    keyTakeaway: 'Keep access tokens short-lived and use revocable refresh tokens in the database.'
  },

  // Architecture & Testing
  {
    id: 'arch-01',
    category: 'Architecture',
    level: 'Intermediate',
    question: 'What is Clean Architecture and why are dependencies directed inward towards Domain?',
    modelAnswer: 'Clean Architecture (or Onion / Hexagonal) organizes software into concentric layers: Domain (entities, business rules), Application (use cases, DTOs, interfaces), Infrastructure (EF Core, email, file storage), and Presentation (Web API, UI). Dependencies point strictly inward. The Domain depends on nothing external. This isolates core enterprise rules from external frameworks, databases, or UI changes, making the system highly testable.',
    keyTakeaway: 'The Domain layer has zero external dependencies; Infrastructure depends on Domain interfaces.'
  },
  {
    id: 'arch-02',
    category: 'Architecture',
    level: 'Advanced',
    question: 'What is WebApplicationFactory and why is it preferred for integration testing in ASP.NET Core?',
    modelAnswer: '`WebApplicationFactory<TProgram>` from `Microsoft.AspNetCore.Mvc.Testing` boots up the real ASP.NET Core test server in-memory, executing the full middleware pipeline, routing, model binding, and validation. In tests, you can override database registrations to point to an in-memory database, SQLite, or a real Docker container via Testcontainers. It tests end-to-end HTTP behavior without requiring an external hosting process or open network ports.',
    keyTakeaway: 'WebApplicationFactory boots the full ASP.NET Core pipeline in-memory for reliable integration tests.'
  }
];
