export interface MockTestQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MockTest {
  id: string;
  title: string;
  durationMinutes: number;
  passingScore: number;
  description: string;
  questions: MockTestQuestion[];
}

export const mockTests: MockTest[] = [
  {
    id: 'mock-1',
    title: 'Mock Test 1: C# 14 & OOP Fundamentals',
    durationMinutes: 20,
    passingScore: 70,
    description: 'Covers value vs reference types, memory, nullable reference types, records, pattern matching, and OOP principles.',
    questions: [
      {
        id: 1,
        question: 'Which of the following is allocated on the managed heap?',
        options: ['An instance of a struct declared inside a method', 'An instance of a standard class', 'A primitive int variable inside a method', 'A bool function parameter'],
        correctIndex: 1,
        explanation: 'Classes are reference types and their instances are always allocated on the managed heap.'
      },
      {
        id: 2,
        question: 'What does the "with" expression in C# do when used on a record?',
        options: ['Mutates the existing record instance in-place', 'Creates a shallow copy with specified properties modified (non-destructive mutation)', 'Serializes the record to JSON', 'Deletes the record from memory'],
        correctIndex: 1,
        explanation: 'The "with" expression creates a shallow copy of a record with the specified property changes, preserving immutability.'
      },
      {
        id: 3,
        question: 'What happens when you box a value type in C#?',
        options: ['The value type is moved to the stack', 'A new object is allocated on the managed heap and the value bytes are copied into it', 'The CLR terminates the thread', 'The value is automatically converted to a string'],
        correctIndex: 1,
        explanation: 'Boxing wraps a value type in an object reference allocated on the heap, incurring GC overhead.'
      },
      {
        id: 4,
        question: 'In C# 14 / modern .NET, what is the default behavior of reference types when Nullable Reference Types is enabled?',
        options: ['All reference types can be null without warnings', 'All reference types are treated as non-nullable unless explicitly annotated with ?', 'Null is completely illegal and causes a compiler syntax crash', 'Only structs can be null'],
        correctIndex: 1,
        explanation: 'When NRT is enabled, types like "string" are non-nullable by default; you must write "string?" to allow null.'
      },
      {
        id: 5,
        question: 'Which keyword prevents a class from being inherited in C#?',
        options: ['static', 'sealed', 'protected', 'readonly'],
        correctIndex: 1,
        explanation: 'The sealed keyword prevents subclasses from inheriting from the class.'
      },
      {
        id: 6,
        question: 'What is the Liskov Substitution Principle (LSP) in SOLID?',
        options: ['Subclasses should replace all interfaces with abstract classes', 'Objects of a superclass should be replaceable with objects of a subclass without breaking application correctness', 'A class must have only one responsibility', 'Classes should be open for modification'],
        correctIndex: 1,
        explanation: 'LSP requires that derived classes maintain the behavioral contract of their base types.'
      },
      {
        id: 7,
        question: 'What is a "Span<T>" in C#?',
        options: ['A thread synchronization primitive', 'A ref struct providing contiguous, allocation-free memory access across arrays and stack memory', 'A new type of generic list', 'A database connection pool'],
        correctIndex: 1,
        explanation: 'Span<T> is a ref struct that enables zero-allocation slicing over memory buffers.'
      },
      {
        id: 8,
        question: 'What is the role of the Garbage Collector Generation 0?',
        options: ['Long-lived static objects', 'Short-lived objects (such as temporary local variables) collected most frequently', 'Large objects exceeding 85,000 bytes', 'Database connection pools'],
        correctIndex: 1,
        explanation: 'Gen 0 holds short-lived temporary objects and is collected rapidly and frequently.'
      },
      {
        id: 9,
        question: 'Which method must be called to release unmanaged resources when using an IDisposable object?',
        options: ['Dispose()', 'Finalize()', 'CloseConnection()', 'Free()'],
        correctIndex: 0,
        explanation: 'Dispose() is the standard method defined on the IDisposable interface, typically invoked via "using".'
      },
      {
        id: 10,
        question: 'What is the purpose of the "init" property accessor introduced in C# 9?',
        options: ['Allows setting the property at any time during execution', 'Allows property mutation only during object initialization / constructor', 'Initializes the property with a random number', 'Binds the property to a database column'],
        correctIndex: 1,
        explanation: 'Init-only accessors enforce immutability after object creation while allowing object initializer syntax.'
      },
      {
        id: 11,
        question: 'What does the "required" modifier on a class member guarantee in C# 11+?',
        options: ['The caller must initialize the member during object construction', 'The member cannot be null', 'The member is stored on the database', 'The member must be private'],
        correctIndex: 0,
        explanation: 'The required keyword forces callers constructing the object to initialize that property.'
      },
      {
        id: 12,
        question: 'How do you check both type and cast an object safely using pattern matching in modern C#?',
        options: ['if (obj is string s)', 'if (obj.GetType() == typeof(string))', 'string s = (string)obj;', 'if (obj as string)'],
        correctIndex: 0,
        explanation: '"is string s" tests the type and assigns the cast variable in a single expression.'
      },
      {
        id: 13,
        question: 'What is the Large Object Heap (LOH) threshold in .NET?',
        options: ['1,000 bytes', '10,000 bytes', '85,000 bytes', '1,000,000 bytes'],
        correctIndex: 2,
        explanation: 'Objects 85,000 bytes or larger are allocated on the Large Object Heap (LOH) to avoid compaction costs.'
      },
      {
        id: 14,
        question: 'What is the output of "10 / 4" in C# if both are integer literals?',
        options: ['2.5', '2', '3', 'Compilation error'],
        correctIndex: 1,
        explanation: 'Integer division truncates the decimal portion, returning 2.'
      },
      {
        id: 15,
        question: 'Which collection guarantees unique elements in C#?',
        options: ['List<T>', 'Queue<T>', 'HashSet<T>', 'Stack<T>'],
        correctIndex: 2,
        explanation: 'HashSet<T> uses hashing to enforce uniqueness and provide O(1) lookups.'
      },
      {
        id: 16,
        question: 'What is the time complexity of looking up a key in a standard Dictionary<TKey, TValue>?',
        options: ['O(N)', 'O(log N)', 'O(1) average', 'O(N^2)'],
        correctIndex: 2,
        explanation: 'Dictionary lookups operate in O(1) average time based on hash code buckets.'
      },
      {
        id: 17,
        question: 'Can an interface contain default method implementations in modern C#?',
        options: ['No, interfaces can only have declarations', 'Yes, Default Interface Methods have been supported since C# 8', 'Only if the interface is marked private', 'Only in .NET Framework 4.8'],
        correctIndex: 1,
        explanation: 'C# 8 introduced default interface methods, allowing non-breaking API evolution.'
      },
      {
        id: 18,
        question: 'What happens if an unhandled exception occurs in a console application?',
        options: ['The application ignores it and continues', 'The CLR logs the stack trace and terminates the process', 'The OS restarts the computer', 'The code rolls back to main'],
        correctIndex: 1,
        explanation: 'Unhandled exceptions terminate the execution process after reporting the stack trace.'
      },
      {
        id: 19,
        question: 'Which of the following is a value type?',
        options: ['System.String', 'System.DateTime', 'System.Array', 'System.Delegate'],
        correctIndex: 1,
        explanation: 'DateTime is a struct (value type), while String, Array, and Delegate are reference types.'
      },
      {
        id: 20,
        question: 'What is the correct syntax for a string interpolation expression in C#?',
        options: ['@"Hello {name}"', '$"Hello {name}"', '#"Hello {name}"', '&"Hello {name}"'],
        correctIndex: 1,
        explanation: 'Prefixing a string with $ enables string interpolation with {expression} placeholders.'
      }
    ]
  },
  {
    id: 'mock-2',
    title: 'Mock Test 2: LINQ, Collections & Async .NET',
    durationMinutes: 20,
    passingScore: 70,
    description: 'Covers deferred execution, IEnumerable vs IQueryable, Tasks, async/await, cancellation tokens, and deadlocks.',
    questions: [
      {
        id: 1,
        question: 'What does "deferred execution" mean in LINQ?',
        options: ['The query is executed asynchronously on a background thread', 'The query is executed only when the sequence is enumerated (e.g. via foreach, ToList)', 'The query is delayed by 5 seconds', 'The query is cached on the disk'],
        correctIndex: 1,
        explanation: 'Deferred execution evaluates queries upon enumeration, allowing dynamic composition.'
      },
      {
        id: 2,
        question: 'Which method immediately executes a LINQ query and stores results in heap memory?',
        options: ['Where()', 'Select()', 'ToList()', 'OrderBy()'],
        correctIndex: 2,
        explanation: 'ToList() forces immediate evaluation and copies results into a new List<T>.'
      },
      {
        id: 3,
        question: 'What is the primary danger of using "async void" instead of "async Task"?',
        options: ['It uses 10x more memory', 'Unhandled exceptions cannot be caught by callers and can crash the process', 'It forces synchronous execution', 'It cannot use the await keyword'],
        correctIndex: 1,
        explanation: 'async void cannot be awaited and unhandled exceptions bubble to the process level.'
      },
      {
        id: 4,
        question: 'What happens when you call .Result or .Wait() on an uncompleted Task in an environment with a SynchronizationContext?',
        options: ['It accelerates the task', 'It can cause a deadlock by blocking the thread waiting for the continuation', 'It cancels the task', 'It re-runs the task'],
        correctIndex: 1,
        explanation: 'Blocking synchronously on a Task that requires the blocked thread to complete results in a deadlock.'
      },
      {
        id: 5,
        question: 'What is the purpose of CancellationToken in async methods?',
        options: ['To speed up network requests', 'To enable cooperative cancellation of ongoing asynchronous work', 'To encrypt parameters', 'To lock shared memory'],
        correctIndex: 1,
        explanation: 'CancellationTokens signal to long-running tasks that the caller has aborted or cancelled the request.'
      },
      {
        id: 6,
        question: 'What is the difference between Task.WhenAll and Task.WaitAll?',
        options: ['WhenAll returns an awaitable Task; WaitAll blocks the calling thread synchronously', 'WhenAll creates threads; WaitAll deletes threads', 'They are identical', 'WaitAll is non-blocking'],
        correctIndex: 0,
        explanation: 'Task.WhenAll is non-blocking and awaitable; Task.WaitAll is blocking.'
      },
      {
        id: 7,
        question: 'Which LINQ operator is used to flatten a list of lists into a single flat sequence?',
        options: ['Select()', 'SelectMany()', 'Flatten()', 'Concat()'],
        correctIndex: 1,
        explanation: 'SelectMany projects each element to an IEnumerable and flattens the resulting sequences.'
      },
      {
        id: 8,
        question: 'What does Enumerable.Any() do?',
        options: ['Returns the count of items', 'Checks if any element satisfies a condition, returning bool and stopping at the first match', 'Sorts elements randomly', 'Returns the first item'],
        correctIndex: 1,
        explanation: 'Any() returns true immediately upon finding a matching element without iterating the rest.'
      },
      {
        id: 9,
        question: 'Why should you use SemaphoreSlim instead of the lock keyword for async code?',
        options: ['lock works fine with await', 'The lock keyword cannot be used across await expressions; SemaphoreSlim supports WaitAsync()', 'lock is deprecated', 'SemaphoreSlim is faster than lock for CPU work'],
        correctIndex: 1,
        explanation: 'C# prohibits await inside a lock statement; SemaphoreSlim provides non-blocking WaitAsync().'
      },
      {
        id: 10,
        question: 'What is IAsyncEnumerable<T> used for in modern .NET?',
        options: ['Streaming asynchronous sequences of data item-by-item without loading everything into memory', 'Running LINQ on Excel files', 'Multi-threaded sorting', 'Connecting to Bluetooth'],
        correctIndex: 0,
        explanation: 'IAsyncEnumerable<T> allows streaming data asynchronously using "await foreach".'
      },
      {
        id: 11,
        question: 'Which method returns the single matching element and throws if more than one match exists?',
        options: ['First()', 'Single()', 'SingleOrDefault()', 'ElementAt()'],
        correctIndex: 1,
        explanation: 'Single() expects exactly one match; throws if 0 or >1 matches.'
      },
      {
        id: 12,
        question: 'How do you run multiple independent CPU-bound calculations in parallel in .NET?',
        options: ['Parallel.ForEach or Task.Run', 'Thread.Sleep', 'GC.Collect', 'async void'],
        correctIndex: 0,
        explanation: 'Parallel.ForEach and Task.Run dispatch CPU-bound work across thread pool worker threads.'
      },
      {
        id: 13,
        question: 'What is the return type of a method that performs asynchronous work without returning a value?',
        options: ['void', 'Task', 'Thread', 'Future'],
        correctIndex: 1,
        explanation: 'Task is the standard return type for value-less asynchronous methods.'
      },
      {
        id: 14,
        question: 'What is ValueTask<T> and when is it preferred over Task<T>?',
        options: ['It is a class for database connections', 'It is a value type (struct) designed to avoid heap allocation when the result is frequently completed synchronously', 'It is slower than Task', 'It replaces all Tasks in .NET 10'],
        correctIndex: 1,
        explanation: 'ValueTask<T> avoids allocating a Task object on the heap when operations often complete synchronously.'
      },
      {
        id: 15,
        question: 'Which LINQ operator divides an array into fixed-size smaller arrays in modern .NET?',
        options: ['Split()', 'Chunk()', 'Partition()', 'Slice()'],
        correctIndex: 1,
        explanation: 'Chunk(size) splits an IEnumerable into chunks of the given maximum size.'
      },
      {
        id: 16,
        question: 'What does Task.Delay(1000) do?',
        options: ['Blocks the current thread for 1 second', 'Returns a Task that completes after 1 second without blocking a thread', 'Kills the application after 1 second', 'Spins the CPU at 100%'],
        correctIndex: 1,
        explanation: 'Task.Delay uses a system timer to complete asynchronously without holding a thread.'
      },
      {
        id: 17,
        question: 'What happens if you iterate over an IEnumerable<T> twice if it queries a remote database?',
        options: ['It crashes on the second iteration', 'It re-executes the remote database query a second time', 'It automatically caches in RAM', 'The database deletes the table'],
        correctIndex: 1,
        explanation: 'Multiple enumeration re-evaluates the query pipeline, re-querying the database.'
      },
      {
        id: 18,
        question: 'Which method checks if an element exists in a HashSet<T> in O(1) time?',
        options: ['Find()', 'Contains()', 'Exists()', 'IndexOf()'],
        correctIndex: 1,
        explanation: 'HashSet<T>.Contains() checks membership in O(1) average time.'
      },
      {
        id: 19,
        question: 'What is the purpose of System.Threading.Channels in .NET?',
        options: ['Audio playback', 'High-performance, thread-safe asynchronous producer-consumer messaging', 'WebSocket communication', 'GPU rendering'],
        correctIndex: 1,
        explanation: 'Channels provide high-throughput producer-consumer queues with backpressure support.'
      },
      {
        id: 20,
        question: 'What is the purpose of the ConfigureAwait(false) method?',
        options: ['Disables all errors', 'Configures the continuation to not force capture of the original SynchronizationContext, avoiding deadlocks in libraries', 'Deletes the task', 'Runs the code in debug mode'],
        correctIndex: 1,
        explanation: 'ConfigureAwait(false) avoids capturing context, improving library performance and preventing deadlocks.'
      }
    ]
  },
  {
    id: 'mock-3',
    title: 'Mock Test 3: Entity Framework Core & SQL Data Access',
    durationMinutes: 20,
    passingScore: 70,
    description: 'Covers DbContext, migrations, relationships, AsNoTracking, N+1 query problem, transactions, and Dapper.',
    questions: [
      {
        id: 1,
        question: 'What is the N+1 query problem in ORMs?',
        options: ['A database error where table names must end with N', 'Executing 1 initial query to get parents, followed by N separate queries for each parent’s children', 'A query that takes N+1 seconds to run', 'A deadlock involving N threads'],
        correctIndex: 1,
        explanation: 'The N+1 problem causes excessive database roundtrips due to lazy or iterative child loading.'
      },
      {
        id: 2,
        question: 'How do you resolve the N+1 problem in EF Core when querying related data?',
        options: ['Use .AsNoTracking()', 'Use .Include() for eager loading or targeted .Select() projections', 'Use .OrderBy()', 'Disable the database connection'],
        correctIndex: 1,
        explanation: 'Eager loading via .Include() or projecting with .Select() issues a single SQL JOIN.'
      },
      {
        id: 3,
        question: 'What is the recommended DI lifetime for an EF Core DbContext in ASP.NET Core?',
        options: ['Transient', 'Scoped (one per HTTP request)', 'Singleton', 'Static'],
        correctIndex: 1,
        explanation: 'Scoped ensures all services within a single request share the same DbContext and transaction unit of work.'
      },
      {
        id: 4,
        question: 'What does .AsNoTracking() do on an EF Core query?',
        options: ['Prevents the query from logging to console', 'Disables entity change tracking in DbContext, reducing memory overhead on read-only queries', 'Hides the user IP address', 'Deletes the database rows after reading'],
        correctIndex: 1,
        explanation: 'AsNoTracking avoids registering entities in the ChangeTracker, improving GET query speed.'
      },
      {
        id: 5,
        question: 'Which command creates a new code-first migration in EF Core CLI?',
        options: ['dotnet ef database update', 'dotnet ef migrations add InitialCreate', 'dotnet build ef', 'dotnet run migrations'],
        correctIndex: 1,
        explanation: 'dotnet ef migrations add <Name> scaffolds the migration files based on model differences.'
      },
      {
        id: 6,
        question: 'What is Dapper in the .NET ecosystem?',
        options: ['A full ORM that replaces EF Core with automatic migrations', 'A lightweight, high-performance micro-ORM that maps raw SQL query results directly to C# objects', 'A front-end UI framework', 'A unit testing mock tool'],
        correctIndex: 1,
        explanation: 'Dapper extends IDbConnection to provide lightning-fast object mapping from raw SQL.'
      },
      {
        id: 7,
        question: 'How do you define a composite primary key in EF Core using Fluent API?',
        options: ['modelBuilder.Entity<Item>().HasKey(x => new { x.Id, x.TenantId });', 'modelBuilder.Entity<Item>().AddComposite();', '[Key][Key]', 'modelBuilder.Entity<Item>().HasIndex();'],
        correctIndex: 0,
        explanation: 'HasKey with an anonymous object specifies composite primary keys in Fluent API.'
      },
      {
        id: 8,
        question: 'What does DbContext.SaveChangesAsync() do?',
        options: ['Saves all changes made in tracked entities to the database in an asynchronous transaction', 'Rolls back all changes', 'Deletes all entities from memory', 'Creates a new database table'],
        correctIndex: 0,
        explanation: 'SaveChangesAsync persists pending insertions, updates, and deletions in a single transaction.'
      },
      {
        id: 9,
        question: 'Which method seeds initial lookup data into a table in EF Core migrations?',
        options: ['modelBuilder.Entity<T>().HasData(...)', 'context.Database.InsertAll(...)', 'migrationBuilder.Seed()', 'dotnet ef seed'],
        correctIndex: 0,
        explanation: 'HasData() in OnModelCreating configures static seed data included in migrations.'
      },
      {
        id: 10,
        question: 'How does EF Core prevent SQL Injection when you write LINQ queries?',
        options: ['It disables user input', 'It translates LINQ parameters into parameterized SQL variables (@p0, @p1)', 'It cleans strings with regex', 'It runs queries inside a sandbox'],
        correctIndex: 1,
        explanation: 'EF Core translates captured C# variables into SQL query parameters, preventing injection.'
      },
      {
        id: 11,
        question: 'What does "Split Queries" (.AsSplitQuery()) do in EF Core?',
        options: ['Splits a query containing multiple .Include() calls into multiple single SQL statements to prevent Cartesian product explosion', 'Splits the database across two hard drives', 'Runs half the query in C# and half in SQL', 'Divides rows into pages'],
        correctIndex: 0,
        explanation: 'AsSplitQuery avoids massive duplicate data caused by Cartesian products in multiple 1-to-many JOINs.'
      },
      {
        id: 12,
        question: 'What is Optimistic Concurrency in database operations?',
        options: ['Locking the database row exclusively so nobody else can read it', 'Allowing concurrent updates and detecting conflicts at commit time using row version tokens', 'Assuming no errors will ever occur', 'Disabling multi-threading'],
        correctIndex: 1,
        explanation: 'Optimistic concurrency checks row version tokens during updates without maintaining locks.'
      },
      {
        id: 13,
        question: 'What does a SQL clustered index determine?',
        options: ['The physical order of data rows in the table', 'The encryption key of the table', 'The user access permissions', 'The backup schedule'],
        correctIndex: 0,
        explanation: 'A clustered index physically sorts and stores data rows in order based on key values.'
      },
      {
        id: 14,
        question: 'Which isolation level prevents Dirty Reads but still allows Non-Repeatable Reads?',
        options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
        correctIndex: 1,
        explanation: 'Read Committed prevents reading uncommitted changes made by concurrent transactions.'
      },
      {
        id: 15,
        question: 'In EF Core, what does EntityState.Modified mean?',
        options: ['The entity was deleted', 'The entity is being tracked and has property changes that will be written as an UPDATE statement', 'The entity is unchanged', 'The entity is not attached to DbContext'],
        correctIndex: 1,
        explanation: 'Modified indicates that property changes have occurred and will be saved on SaveChanges.'
      },
      {
        id: 16,
        question: 'What is the purpose of DbContextPool in high-load ASP.NET Core applications?',
        options: ['It pools physical SQL server instances', 'It pools and reuses DbContext instances to avoid allocation and initialization costs per request', 'It combines EF Core with Dapper', 'It caches raw query strings'],
        correctIndex: 1,
        explanation: 'AddDbContextPool maintains a reusable pool of DbContext instances, reducing allocations.'
      },
      {
        id: 17,
        question: 'How do you apply pending migrations to the database at application startup in production CI/CD?',
        options: ['Never use context.Database.Migrate() in high-availability production; generate idempotent SQL migration scripts via "dotnet ef migrations script"', 'Always let every web pod call Migrate() simultaneously', 'Manually type SQL in production', 'Delete and recreate the database'],
        correctIndex: 0,
        explanation: 'Production enterprise best practice uses idempotent SQL scripts generated by the CI/CD pipeline.'
      },
      {
        id: 18,
        question: 'What does "Shadow Property" mean in EF Core?',
        options: ['A property that is encrypted in memory', 'A property that exists in the database schema but is not defined in the C# entity class', 'A private variable', 'A temporary debug property'],
        correctIndex: 1,
        explanation: 'Shadow properties exist in the EF model and database without having a property in the C# class.'
      },
      {
        id: 19,
        question: 'Which ADO.NET class is used to execute a SQL statement and read a forward-only stream of rows?',
        options: ['SqlDataAdapter', 'SqlDataReader', 'DataSet', 'SqlCommandBuilder'],
        correctIndex: 1,
        explanation: 'SqlDataReader provides high-performance, forward-only row streaming from the database.'
      },
      {
        id: 20,
        question: 'How do you configure a One-to-Many relationship using Fluent API in EF Core?',
        options: ['builder.HasOne(x => x.Parent).WithMany(x => x.Children).HasForeignKey(x => x.ParentId);', 'builder.HasMany().WithMany();', 'builder.Relation(1, "many");', 'builder.Join();'],
        correctIndex: 0,
        explanation: 'HasOne(...).WithMany(...).HasForeignKey(...) establishes the standard 1-to-many relationship.'
      }
    ]
  },
  {
    id: 'mock-4',
    title: 'Mock Test 4: ASP.NET Core Web APIs & Architecture',
    durationMinutes: 20,
    passingScore: 70,
    description: 'Covers middleware pipeline, dependency injection bugs, validation, DTO mapping, minimal APIs, and Clean Architecture.',
    questions: [
      {
        id: 1,
        question: 'What is a "Captive Dependency" in ASP.NET Core Dependency Injection?',
        options: ['A service that takes more than 10 seconds to create', 'A shorter-lived service (e.g. Scoped) being injected into a longer-lived service (e.g. Singleton)', 'A circular reference between two classes', 'A dependency that cannot be resolved'],
        correctIndex: 1,
        explanation: 'Captive dependencies trap scoped services for the life of singletons, causing leaks and concurrency issues.'
      },
      {
        id: 2,
        question: 'What is the role of Kestrel in ASP.NET Core?',
        options: ['A cross-platform, high-performance web server built into ASP.NET Core', 'A database ORM', 'A CSS preprocessor', 'A testing framework'],
        correctIndex: 0,
        explanation: 'Kestrel is the default asynchronous cross-platform web server for ASP.NET Core.'
      },
      {
        id: 3,
        question: 'Which status code must be returned when a resource is successfully created via a POST request?',
        options: ['200 OK', '201 Created', '204 No Content', '202 Accepted'],
        correctIndex: 1,
        explanation: '201 Created signifies successful resource creation, ideally including a Location header.'
      },
      {
        id: 4,
        question: 'What is the RFC standard format for representing error details in modern HTTP APIs?',
        options: ['ProblemDetails (RFC 7807 / 9457)', 'XML Error Dump', 'Plain Text Stack Trace', 'HTML 500 error page'],
        correctIndex: 0,
        explanation: 'ProblemDetails provides a standardized JSON error structure with type, title, status, and detail.'
      },
      {
        id: 5,
        question: 'In Clean Architecture, which layer contains entities, value objects, and domain business rules?',
        options: ['Infrastructure', 'Application', 'Domain', 'Presentation'],
        correctIndex: 2,
        explanation: 'The Domain layer is the enterprise core and has zero outward dependencies.'
      },
      {
        id: 6,
        question: 'How do you bind strongly-typed settings from appsettings.json in ASP.NET Core?',
        options: ['Using the Options Pattern (IOptions<T>, IOptionsSnapshot<T>)', 'Hardcoding strings in controllers', 'Reading text files manually with File.ReadAllText', 'Static configuration classes'],
        correctIndex: 0,
        explanation: 'The Options pattern provides strongly-typed, validated access to configuration groups.'
      },
      {
        id: 7,
        question: 'What is the difference between IOptions<T> and IOptionsSnapshot<T>?',
        options: ['IOptionsSnapshot reads updated values per request without restarting; IOptions is a singleton snapshot', 'IOptions is for databases; IOptionsSnapshot is for images', 'They are identical', 'IOptions cannot be injected'],
        correctIndex: 0,
        explanation: 'IOptionsSnapshot is scoped and reloads configuration changes on every HTTP request.'
      },
      {
        id: 8,
        question: 'Why should enterprise applications prefer DTOs (Data Transfer Objects) over returning entity models directly from APIs?',
        options: ['To prevent over-posting vulnerabilities and decouple public contracts from database schemas', 'DTOs make the server run 10x faster', 'Entity models cannot be serialized to JSON', 'C# requires DTOs for compiling'],
        correctIndex: 0,
        explanation: 'DTOs prevent exposing internal database structure and protect against mass assignment security vulnerabilities.'
      },
      {
        id: 9,
        question: 'What is the purpose of FluentValidation in modern .NET APIs?',
        options: ['Validates database backups', 'Provides clean, fluent rules separating validation logic from DTO data structures', 'Tests CSS styles', 'Encrypts user passwords'],
        correctIndex: 1,
        explanation: 'FluentValidation separates validation rules into dedicated testable classes.'
      },
      {
        id: 10,
        question: 'Which method registers a service with a Transient lifetime in WebApplicationBuilder?',
        options: ['builder.Services.AddTransient<IService, Service>();', 'builder.Services.AddScoped<IService, Service>();', 'builder.Services.AddSingleton<IService, Service>();', 'builder.Services.Register<Service>();'],
        correctIndex: 0,
        explanation: 'AddTransient registers services that are created anew on every single injection request.'
      },
      {
        id: 11,
        question: 'How do you map a GET endpoint with route parameters in ASP.NET Core Minimal APIs?',
        options: ['app.MapGet("/users/{id:int}", (int id) => ...);', 'app.Get("/users", ...);', 'app.Route("/users", ...);', 'app.CreateEndpoint();'],
        correctIndex: 0,
        explanation: 'app.MapGet("/users/{id:int}", ...) defines the route with an integer constraint.'
      },
      {
        id: 12,
        question: 'What does the CORS header "Access-Control-Allow-Origin" do?',
        options: ['Controls which external web domains are allowed to make cross-origin requests to your API in browser clients', 'Locks the database to one computer', 'Sets the server IP address', 'Controls git push permissions'],
        correctIndex: 0,
        explanation: 'CORS policies instruct client browsers whether to allow JavaScript to read responses from another origin.'
      },
      {
        id: 13,
        question: 'What is the purpose of Rate Limiting in Web APIs?',
        options: ['Slows down fast users intentionally', 'Protects services from denial of service (DoS), abuse, and brute force attacks by restricting requests per time window', 'Decreases internet costs', 'Sorts database records'],
        correctIndex: 1,
        explanation: 'Rate limiting limits request frequency per client/IP to maintain service availability.'
      },
      {
        id: 14,
        question: 'What is the difference between In-Memory Caching and Distributed Caching (e.g. Redis)?',
        options: ['In-memory lives only on the local machine process; distributed caching shares cached data across multiple load-balanced web servers', 'In-memory is on the cloud; distributed is local', 'Redis is slower than a relational database', 'Distributed caching only works with text files'],
        correctIndex: 0,
        explanation: 'Distributed caches allow horizontally scaled multi-pod applications to share cache state.'
      },
      {
        id: 15,
        question: 'What does Output Caching in ASP.NET Core (introduced in .NET 7/8/9/10) do?',
        options: ['Caches the entire HTTP response body and headers on the server to short-circuit future matching requests', 'Writes output to a printer', 'Caches user passwords in memory', 'Saves logs to disk'],
        correctIndex: 0,
        explanation: 'Output caching stores completed HTTP responses on the server, serving future calls without re-executing endpoints.'
      },
      {
        id: 16,
        question: 'What is a BackgroundService in .NET?',
        options: ['A service that hides from the Windows Task Manager', 'A base class for implementing long-running background worker tasks via IHostedService', 'A background desktop wallpaper manager', 'A deprecated Windows Service component'],
        correctIndex: 1,
        explanation: 'BackgroundService is the standard abstract class for executing background tasks in hosted applications.'
      },
      {
        id: 17,
        question: 'What is SignalR used for in ASP.NET Core?',
        options: ['Sending SMS messages', 'Real-time two-way communication between server and client via WebSockets with automatic fallbacks', 'SQL query optimization', 'Compiling C# code'],
        correctIndex: 1,
        explanation: 'SignalR facilitates bi-directional real-time communication for chats, dashboards, and live alerts.'
      },
      {
        id: 18,
        question: 'What is gRPC and when is it preferred over REST/JSON?',
        options: ['A high-performance RPC framework using HTTP/2 and Protobuf binary serialization, ideal for internal microservice-to-microservice communication', 'A replacement for HTML', 'An image compression format', 'A database driver'],
        correctIndex: 0,
        explanation: 'gRPC offers ultra-low latency and binary efficiency for internal distributed systems.'
      },
      {
        id: 19,
        question: 'What is the purpose of Health Checks in ASP.NET Core (/healthz)?',
        options: ['Checks CPU temperature', 'Exposes endpoints for load balancers and Kubernetes probes to verify application and dependency health', 'Runs unit tests every minute', 'Scans for computer viruses'],
        correctIndex: 1,
        explanation: 'Health check endpoints inform orchestrators whether a pod is ready to accept traffic.'
      },
      {
        id: 20,
        question: 'Which method in WebApplicationFactory allows replacing production database registrations with test containers or SQLite?',
        options: ['WithWebHostBuilder(builder => builder.ConfigureTestServices(...))', 'ReplaceAll()', 'builder.Clear()', 'builder.UseMocks()'],
        correctIndex: 0,
        explanation: 'ConfigureTestServices overrides service collection descriptors during integration tests.'
      }
    ]
  },
  {
    id: 'mock-5',
    title: 'Mock Test 5: Security, Identity & Authentication',
    durationMinutes: 20,
    passingScore: 70,
    description: 'Covers authentication vs authorization, JWTs, ASP.NET Core Identity, OWASP Top 10, CORS, CSRF, and secret management.',
    questions: [
      {
        id: 1,
        question: 'What is the difference between Authentication and Authorization?',
        options: ['Authentication validates identity ("Who are you?"); Authorization validates permissions ("What can you do?")', 'Authentication is for mobile; Authorization is for web', 'They are synonymous terms', 'Authorization always runs before Authentication'],
        correctIndex: 0,
        explanation: 'Authentication establishes identity; Authorization checks access rights.'
      },
      {
        id: 2,
        question: 'Why should password hashes always use an adaptive algorithm like PBKDF2, Argon2, or BCrypt with a unique Salt?',
        options: ['To make the string shorter', 'To prevent rainbow table attacks and slow down brute-force hardware cracking attempts', 'Because SHA-256 cannot hash strings', 'To allow decrypting the password later'],
        correctIndex: 1,
        explanation: 'Salting prevents rainbow table lookups and work factors slow down hardware GPU brute-force attacks.'
      },
      {
        id: 3,
        question: 'What are the three parts of a JSON Web Token (JWT)?',
        options: ['Header, Payload, Signature', 'Username, Password, Role', 'Database, Table, Row', 'Public Key, Private Key, Certificate'],
        correctIndex: 0,
        explanation: 'JWT consists of a Base64Url-encoded Header, Payload, and cryptographic Signature separated by dots.'
      },
      {
        id: 4,
        question: 'Why should JWT access tokens have a short expiration time (e.g. 15 minutes)?',
        options: ['To save server hard drive space', 'Because JWTs are stateless; if stolen, a token cannot be revoked server-side until it expires', 'Because browsers delete tokens every 15 minutes', 'To force users to type passwords continuously'],
        correctIndex: 1,
        explanation: 'Stateless tokens cannot be revoked instantly without distributed blacklists; short lifetimes mitigate theft risk.'
      },
      {
        id: 5,
        question: 'What is a Cross-Site Request Forgery (CSRF) attack?',
        options: ['Executing malicious JavaScript injected into a comment section', 'Tricking an authenticated user’s browser into executing an unauthorized command on a trusted website via ambient cookie credentials', 'Cracking passwords via brute force', 'Sniffing network traffic over HTTP'],
        correctIndex: 1,
        explanation: 'CSRF exploits automatic cookie transmission on malicious cross-origin requests; mitigated by Anti-Forgery tokens and SameSite=Strict.'
      },
      {
        id: 6,
        question: 'How do you defend against Cross-Site Scripting (XSS) in ASP.NET Core?',
        options: ['Razor automatically HTML-encodes output expressions (@Model.Data); validate and sanitize all raw HTML inputs', 'Disable JavaScript in user browsers', 'Use HTTP instead of HTTPS', 'Store all data in SQLite'],
        correctIndex: 0,
        explanation: 'Razor encodes HTML by default, preventing injected script execution.'
      },
      {
        id: 7,
        question: 'Where should application production secrets (database passwords, API keys) be stored?',
        options: ['Committed to git in appsettings.json', 'In a secure vault like Azure Key Vault, AWS Secrets Manager, or injected via environment variables', 'In the public JavaScript bundle', 'Written in README.md'],
        correctIndex: 1,
        explanation: 'Production secrets must never be committed to source control; use dedicated secrets managers.'
      },
      {
        id: 8,
        question: 'What does the "Secret Manager" tool in the .NET SDK do during local development?',
        options: ['Stores secrets securely in the Windows/Mac user profile directory outside the git repository folder', 'Encrypts git commits', 'Locks your laptop', 'Creates database passwords'],
        correctIndex: 0,
        explanation: 'Secret Manager keeps development secrets in the local user directory so they cannot be accidentally committed.'
      },
      {
        id: 9,
        question: 'What is the purpose of HTTPS / TLS encryption?',
        options: ['Prevents search engines from reading your website', 'Ensures confidentiality and integrity by encrypting data in transit and preventing man-in-the-middle attacks', 'Accelerates server CPU clock speed', 'Validates user passwords'],
        correctIndex: 1,
        explanation: 'TLS encrypts all HTTP traffic between browser and server, preventing eavesdropping and tampering.'
      },
      {
        id: 10,
        question: 'What is Claims-based authorization in ASP.NET Core?',
        options: ['An authorization model where access decisions are made by evaluating key-value assertions (claims) associated with the user’s identity', 'An insurance policy for software', 'Checking if a user is an admin only', 'Hardcoded if/else checks in database triggers'],
        correctIndex: 0,
        explanation: 'Claims express identity attributes (e.g., Department, DateOfBirth, BadgeNumber) evaluated by policies.'
      },
      {
        id: 11,
        question: 'How do you enforce HTTPS redirection in ASP.NET Core middleware?',
        options: ['app.UseHttpsRedirection();', 'app.EnforceHttps();', 'app.Redirect();', 'builder.Services.AddHttps();'],
        correctIndex: 0,
        explanation: 'app.UseHttpsRedirection() redirects incoming HTTP requests to their secure HTTPS counterpart.'
      },
      {
        id: 12,
        question: 'What does HSTS (HTTP Strict Transport Security) header tell browsers?',
        options: ['To only communicate with the website over HTTPS for a specified duration, even if the user types http://', 'To block all external images', 'To delete cookies on exit', 'To disable browser extensions'],
        correctIndex: 0,
        explanation: 'HSTS instructs browsers to enforce HTTPS connections exclusively for the domain.'
      },
      {
        id: 13,
        question: 'What is Mass Assignment (Over-Posting) vulnerability?',
        options: ['Sending 1,000 emails at once', 'When an API endpoint binds request JSON directly to an internal entity model, allowing an attacker to modify unintended fields like IsAdmin or Role', 'A database deadlock error', 'An infinite loop in a controller'],
        correctIndex: 1,
        explanation: 'Over-posting allows malicious clients to overwrite sensitive model properties if DTOs are not used.'
      },
      {
        id: 14,
        question: 'What does the SameSite attribute on a Cookie accomplish?',
        options: ['Controls whether cookies are sent with cross-site requests, mitigating CSRF attacks', 'Restricts the cookie to one computer', 'Encrypts the cookie content', 'Limits cookie lifespan to 5 minutes'],
        correctIndex: 0,
        explanation: 'SameSite=Lax/Strict prevents browser transmission of cookies on cross-origin forgery requests.'
      },
      {
        id: 15,
        question: 'Which method in ASP.NET Core validates that a model satisfies DataAnnotations before proceeding in MVC?',
        options: ['ModelState.IsValid', 'Model.Validate()', 'Validator.Check()', 'Request.Validate()'],
        correctIndex: 0,
        explanation: 'ModelState.IsValid evaluates DataAnnotations attributes like [Required] and [MaxLength].'
      },
      {
        id: 16,
        question: 'What is OAuth 2.0 primarily designed for?',
        options: ['Database encryption', 'Delegated authorization, allowing a third-party application to access user resources without exposing user passwords', 'Password hashing', 'Desktop UI design'],
        correctIndex: 1,
        explanation: 'OAuth 2.0 is an authorization framework enabling delegated access tokens.'
      },
      {
        id: 17,
        question: 'What does OpenID Connect (OIDC) add on top of OAuth 2.0?',
        options: ['An identity layer providing authentication via an ID Token (JWT) in addition to authorization', 'Faster database queries', 'CSS formatting', 'Automatic docker container builds'],
        correctIndex: 0,
        explanation: 'OIDC adds identity authentication on top of OAuth 2.0 authorization using ID tokens.'
      },
      {
        id: 18,
        question: 'Why should you never log raw passwords or authorization tokens into application log files?',
        options: ['Log files are frequently stored in plaintext and accessible by broader operations personnel, leading to credential leakage', 'Because passwords contain symbols that break log parsers', 'It slows down disk writes', 'C# prevents logging strings'],
        correctIndex: 0,
        explanation: 'Logging credentials violates compliance (DPDP/GDPR) and creates critical security exposure.'
      },
      {
        id: 19,
        question: 'What does Content Security Policy (CSP) header protect against?',
        options: ['Restricts which scripts, styles, and media can be loaded and executed by the browser, mitigating XSS and data exfiltration', 'Protects against SQL injection', 'Controls git branch permissions', 'Blocks server crashes'],
        correctIndex: 0,
        explanation: 'CSP tells client browsers which resource sources and script origins are trusted.'
      },
      {
        id: 20,
        question: 'How do you secure a Minimal API endpoint with authentication in ASP.NET Core?',
        options: ['app.MapGet("/secure", ...).RequireAuthorization();', 'app.MapGet("/secure", ...).Lock();', 'app.Secure("/secure", ...);', 'app.MapGet("/secure", ...).UseAuth();'],
        correctIndex: 0,
        explanation: '.RequireAuthorization() applies authorization metadata to the endpoint route.'
      }
    ]
  },
  {
    id: 'mock-6',
    title: 'Mock Test 6: DevOps, Cloud, Containers & Observability',
    durationMinutes: 20,
    passingScore: 70,
    description: 'Covers Dockerfile creation, multi-stage builds, Azure hosting, GitHub Actions CI/CD, Serilog, and OpenTelemetry.',
    questions: [
      {
        id: 1,
        question: 'Why are multi-stage Docker builds recommended for .NET applications?',
        options: ['To allow building for both Windows and Mac in one image', 'To separate the heavy SDK build environment from the lean runtime container, resulting in tiny, secure production images', 'Because single-stage builds are deprecated', 'Multi-stage builds make the app run 5x faster'],
        correctIndex: 1,
        explanation: 'Multi-stage builds compile with the .NET SDK and copy only output binaries to the smaller runtime image.'
      },
      {
        id: 2,
        question: 'What is Native AOT (Ahead-of-Time) compilation in modern .NET?',
        options: ['Compiling C# directly into architecture-specific machine code ahead of time, eliminating the JIT compiler for instant startup and low memory usage', 'Compiling code in the browser', 'A new type of async method', 'Translating C# into Python'],
        correctIndex: 0,
        explanation: 'Native AOT generates standalone machine binaries without JIT, yielding minimal memory and instantaneous startup.'
      },
      {
        id: 3,
        question: 'What is the purpose of OpenTelemetry in modern distributed .NET applications?',
        options: ['A vendor-neutral observability framework providing standardized metrics, distributed traces, and logs across microservices', 'A cloud database', 'A tool for managing Git repositories', 'A front-end charting library'],
        correctIndex: 0,
        explanation: 'OpenTelemetry is the industry standard for vendor-agnostic distributed tracing, metrics, and logging.'
      },
      {
        id: 4,
        question: 'What is .NET Aspire?',
        options: ['A legacy Windows-only desktop framework', 'An opinionated cloud-ready stack for building observable, production-ready distributed .NET applications with service discovery and dashboards', 'A new database query language', 'A Microsoft cloud billing portal'],
        correctIndex: 1,
        explanation: '.NET Aspire orchestrates cloud-native .NET apps with built-in telemetry, resilience, and service discovery.'
      },
      {
        id: 5,
        question: 'Which GitHub Actions event triggers a continuous integration workflow on new commits?',
        options: ['on: [push]', 'trigger: always', 'start: commit', 'workflow: run'],
        correctIndex: 0,
        explanation: '"on: [push]" instructs GitHub Actions to execute the workflow whenever commits are pushed.'
      },
      {
        id: 6,
        question: 'What flag must be passed to "dotnet build" in CI/CD to treat all compiler warnings as fatal errors?',
        options: ['--warnaserror (or -warnaserror)', '--strict', '--no-warnings', '--fail-on-warn'],
        correctIndex: 0,
        explanation: '-warnaserror forces the build to fail if any warnings occur, enforcing rigorous code standards.'
      },
      {
        id: 7,
        question: 'What is the purpose of structured logging (e.g. with Serilog)?',
        options: ['Formatting logs as beautiful colored text', 'Logging events as structured key-value data (JSON) so they can be queried, filtered, and aggregated in tools like Seq or Datadog', 'Saving logs into Word documents', 'Encrypting log messages on disk'],
        correctIndex: 1,
        explanation: 'Structured logging preserves message templates and parameters as searchable JSON properties.'
      },
      {
        id: 8,
        question: 'In Kubernetes, what is the role of a "Liveness Probe"?',
        options: ['Determines if the container is still alive and healthy; if it fails, Kubernetes restarts the container', 'Checks if the user has an internet connection', 'Scans the code for bugs', 'Scales the cluster to 100 nodes'],
        correctIndex: 0,
        explanation: 'Liveness probes detect deadlocks or process crashes, restarting unresponsive pods automatically.'
      },
      {
        id: 9,
        question: 'What is the difference between Azure App Service and Azure Container Apps?',
        options: ['App Service is a fully managed PaaS for web apps; Container Apps is a serverless container platform built on Kubernetes (KEDA) that scales to zero', 'App Service only runs PHP', 'Container Apps is Windows-only', 'They are identical services'],
        correctIndex: 0,
        explanation: 'Container Apps runs microservices on managed Kubernetes with scale-to-zero capabilities.'
      },
      {
        id: 10,
        question: 'What is the purpose of the dotnet publish command?',
        options: ['Deletes the project', 'Compiles the application, resolves dependencies, and copies all assets into an output directory ready for deployment', 'Uploads the project to NuGet.org', 'Prints the code on paper'],
        correctIndex: 1,
        explanation: 'dotnet publish packages the application and runtime binaries for production deployment.'
      },
      {
        id: 11,
        question: 'What is a "Self-Contained" .NET deployment?',
        options: ['An app that runs without an operating system', 'A deployment that bundles the application together with the exact .NET runtime binaries, so the host machine does not need .NET pre-installed', 'An app that has no database', 'An app written in a single file'],
        correctIndex: 1,
        explanation: 'Self-contained publishing bundles the .NET runtime with the application files.'
      },
      {
        id: 12,
        question: 'Why should you run Docker containers as non-root users in production?',
        options: ['Non-root containers run 2x faster', 'To adhere to the principle of least privilege; if a container is compromised, the attacker cannot gain root access to the host node', 'Docker prohibits root users', 'Non-root users use less RAM'],
        correctIndex: 1,
        explanation: 'Running as non-root limits container breakout attacks and enforces container security.'
      },
      {
        id: 13,
        question: 'What is a reverse proxy (e.g. Nginx or YARP) and why is it placed in front of Kestrel?',
        options: ['To handle SSL termination, compression, static files, and edge security before passing traffic to internal Kestrel web servers', 'To rewrite C# code into JavaScript', 'To compile the app', 'To back up databases'],
        correctIndex: 0,
        explanation: 'Reverse proxies shield backend application servers from internet exposure and handle edge concerns.'
      },
      {
        id: 14,
        question: 'What is YARP in the .NET ecosystem?',
        options: ['Yet Another Reverse Proxy - a highly customizable, high-performance reverse proxy library built by Microsoft on ASP.NET Core', 'A unit testing mock library', 'A YAML file validator', 'A build automation tool'],
        correctIndex: 0,
        explanation: 'YARP is Microsoft’s toolkit for creating performant reverse proxy servers in C#.'
      },
      {
        id: 15,
        question: 'What does "Horizontal Pod Autoscaler" (HPA) do in Kubernetes?',
        options: ['Increases CPU power of the physical server', 'Automatically scales the number of running pod replicas up or down based on observed CPU, memory, or custom metrics', 'Rotates database passwords', 'Clears disk space'],
        correctIndex: 1,
        explanation: 'HPA adjusts pod replica counts dynamically based on traffic and resource consumption.'
      },
      {
        id: 16,
        question: 'What is the purpose of an EditorConfig file (.editorconfig) in a .NET repository?',
        options: ['Controls which code editor you are allowed to open', 'Enforces consistent code style, formatting, indentations, and analyzer rule severities across all team members and IDEs', 'Configures database connections', 'Controls git branch rules'],
        correctIndex: 1,
        explanation: 'EditorConfig standardizes code style conventions across VS Code, Visual Studio, and Rider.'
      },
      {
        id: 17,
        question: 'What is the difference between Continuous Integration (CI) and Continuous Deployment (CD)?',
        options: ['CI automates building, linting, and testing code on every push; CD automates deploying validated code to staging/production environments', 'CI is for Linux; CD is for Windows', 'They mean the exact same thing', 'CI is manual; CD is automatic'],
        correctIndex: 0,
        explanation: 'CI verifies code correctness continuously; CD delivers tested releases to production environments.'
      },
      {
        id: 18,
        question: 'How do you prevent costly surprise billing on cloud providers like Azure or AWS when learning .NET?',
        options: ['Never use cloud providers', 'Configure strict Budget Alerts, use Free-Tier services, and delete or deallocate test resource groups immediately after use', 'Keep virtual machines running 24/7', 'Disable cloud billing'],
        correctIndex: 1,
        explanation: 'Setting budget alerts and deleting test resources prevents runaway enterprise cloud charges.'
      },
      {
        id: 19,
        question: 'What is the purpose of Testcontainers in .NET testing pipelines?',
        options: ['Runs tests inside plastic boxes', 'Spins up real, disposable Docker containers (e.g. real SQL Server, PostgreSQL, Redis) automatically during integration tests and tears them down on completion', 'Tests shipping containers', 'Replaces xUnit'],
        correctIndex: 1,
        explanation: 'Testcontainers provides real database and infrastructure instances in Docker during integration tests.'
      },
      {
        id: 20,
        question: 'What is the role of a Docker .dockerignore file?',
        options: ['Prevents Docker from installing', 'Prevents unnecessary files (like bin/, obj/, .git, node_modules) from being sent to the Docker daemon, speeding up build context transfers', 'Lists broken docker images', 'Disables docker compose'],
        correctIndex: 1,
        explanation: '.dockerignore keeps build contexts lean by excluding local binaries and IDE files.'
      }
    ]
  }
];

