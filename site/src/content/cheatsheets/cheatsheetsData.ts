export interface CheatSheet {
  id: string;
  title: string;
  category: string;
  sections: {
    title: string;
    items: { syntax: string; description: string }[];
  }[];
}

export const cheatSheetsData: CheatSheet[] = [
  // 1. C# 14 & Modern Syntax
  {
    id: 'csharp-syntax',
    title: 'C# 14 & Modern Syntax Cheat Sheet',
    category: 'Language',
    sections: [
      {
        title: 'Variables & Types',
        items: [
          { syntax: 'int x = 42; double d = 3.14; bool flag = true;', description: 'Standard primitive value types (stack allocated)' },
          { syntax: 'string? name = null;', description: 'Nullable reference type declaration' },
          { syntax: 'var list = new List<string>();', description: 'Implicitly typed local variable' },
          { syntax: 'int[] arr = [1, 2, 3];', description: 'Modern collection expression (C# 12+)' },
          { syntax: '(int Id, string Name) person = (1, "Alex");', description: 'Named tuple syntax' },
          { syntax: 'const double Pi = 3.14159;', description: 'Compile-time constant' }
        ]
      },
      {
        title: 'Records & Immutability',
        items: [
          { syntax: 'public record User(int Id, string Email);', description: 'Positional record with value equality and init properties' },
          { syntax: 'var updated = user with { Email = "new@kx.in" };', description: 'Non-destructive mutation with "with" expression' },
          { syntax: 'public required string Title { get; init; }', description: 'Required member in object initializers' }
        ]
      },
      {
        title: 'Pattern Matching & Switch Expressions',
        items: [
          { syntax: 'string desc = shape switch { Circle c => $"Circle r={c.R}", Rect r => "Rect", _ => "Unknown" };', description: 'Type pattern switch expression' },
          { syntax: 'if (obj is string { Length: > 0 } nonEmp)', description: 'Property and relational pattern' },
          { syntax: 'if (value is >= 18 and <= 65)', description: 'Logical relational pattern combinator' }
        ]
      }
    ]
  },

  // 2. LINQ
  {
    id: 'linq-cheatsheet',
    title: 'LINQ Query & Method Syntax Cheat Sheet',
    category: 'LINQ',
    sections: [
      {
        title: 'Filtering & Projection',
        items: [
          { syntax: 'items.Where(x => x.IsActive)', description: 'Filters sequence based on predicate (deferred)' },
          { syntax: 'items.Select(x => new { x.Id, x.Name })', description: 'Projects each element to a new shape' },
          { syntax: 'items.SelectMany(x => x.Orders)', description: 'Flattens nested sequences into a single sequence' },
          { syntax: 'items.OfType<Customer>()', description: 'Filters elements by type' }
        ]
      },
      {
        title: 'Aggregation & Quantifiers',
        items: [
          { syntax: 'items.Any(x => x.Price > 100)', description: 'Returns true if any element matches (short-circuits)' },
          { syntax: 'items.All(x => x.Age >= 18)', description: 'Returns true if all elements match' },
          { syntax: 'items.Count(x => x.InStock)', description: 'Counts matching elements' },
          { syntax: 'items.Sum(x => x.Amount); items.Average(...)', description: 'Calculates numeric sum or average' },
          { syntax: 'items.GroupBy(x => x.Category)', description: 'Groups items by a key' }
        ]
      },
      {
        title: 'Paging & Partitioning',
        items: [
          { syntax: 'items.Skip((page - 1) * pageSize).Take(pageSize)', description: 'Classic offset pagination' },
          { syntax: 'items.Chunk(100)', description: 'Splits sequence into batches of 100 (.NET 6+)' },
          { syntax: 'items.DistinctBy(x => x.Email)', description: 'Deduplicates sequence by key selector (.NET 6+)' }
        ]
      }
    ]
  },

  // 3. Entity Framework Core
  {
    id: 'efcore-cheatsheet',
    title: 'Entity Framework Core Cheat Sheet',
    category: 'Data',
    sections: [
      {
        title: 'Query Optimization',
        items: [
          { syntax: 'context.Users.AsNoTracking().ToListAsync()', description: 'Disables change tracking for fast read-only queries' },
          { syntax: 'context.Orders.Include(o => o.Items).ThenInclude(i => i.Product)', description: 'Eager loading related child entities' },
          { syntax: 'context.Orders.AsSplitQuery().Include(...)', description: 'Splits multi-collection query into separate SQL queries' },
          { syntax: 'context.Users.Where(u => u.Id == id).ExecuteUpdateAsync(...)', description: 'Bulk update directly in SQL without loading entity into memory (.NET 7+)' },
          { syntax: 'context.Users.Where(u => u.IsDeleted).ExecuteDeleteAsync()', description: 'Bulk delete directly in SQL without loading entity (.NET 7+)' }
        ]
      },
      {
        title: 'Fluent API Configurations',
        items: [
          { syntax: 'builder.HasKey(x => x.Id);', description: 'Configures primary key' },
          { syntax: 'builder.HasIndex(x => x.Email).IsUnique();', description: 'Configures unique database index' },
          { syntax: 'builder.Property(x => x.Price).HasPrecision(18, 2);', description: 'Sets decimal precision for currency' },
          { syntax: 'builder.Property(x => x.RowVersion).IsRowVersion();', description: 'Configures optimistic concurrency token' }
        ]
      }
    ]
  },

  // 4. ASP.NET Core Web APIs
  {
    id: 'aspnetcore-cheatsheet',
    title: 'ASP.NET Core Web APIs & Minimal APIs',
    category: 'Web',
    sections: [
      {
        title: 'Minimal API Route Mapping',
        items: [
          { syntax: 'app.MapGet("/api/items", async (AppDbContext db) => await db.Items.ToListAsync());', description: 'Defines asynchronous GET endpoint with injected DbContext' },
          { syntax: 'app.MapPost("/api/items", async (CreateItemDto dto, AppDbContext db) => Results.Created($"/api/items/{id}", item));', description: 'POST endpoint returning 201 Created' },
          { syntax: 'app.MapGet("/api/items/{id:int}", async (int id, AppDbContext db) => ...);', description: 'Route parameter constraint (:int)' },
          { syntax: 'var group = app.MapGroup("/api/v1/students").RequireAuthorization();', description: 'Route group with shared path prefix and authorization policy' }
        ]
      },
      {
        title: 'Dependency Injection Lifetimes',
        items: [
          { syntax: 'builder.Services.AddTransient<IEmailSender, EmailSender>();', description: 'Transient: Created every time requested (lightweight, stateless)' },
          { syntax: 'builder.Services.AddScoped<IOrderService, OrderService>();', description: 'Scoped: Created once per client HTTP request (standard for DbContext)' },
          { syntax: 'builder.Services.AddSingleton<ICacheService, CacheService>();', description: 'Singleton: Created once on app start, shared across all requests' }
        ]
      },
      {
        title: 'Middleware Pipeline Configuration',
        items: [
          { syntax: 'app.UseExceptionHandler(); app.UseStatusCodePages();', description: 'Centralized error handling and RFC 7807 ProblemDetails' },
          { syntax: 'app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyHeader());', description: 'Cross-Origin Resource Sharing enablement' },
          { syntax: 'app.UseAuthentication(); app.UseAuthorization();', description: 'JWT authentication and role/claim authorization pipeline' }
        ]
      }
    ]
  },

  // 5. .NET CLI
  {
    id: 'dotnet-cli-cheatsheet',
    title: '.NET CLI Commands Reference',
    category: 'Tools',
    sections: [
      {
        title: 'Project Creation & Management',
        items: [
          { syntax: 'dotnet new webapi -n MyApi', description: 'Create a new ASP.NET Core Web API project' },
          { syntax: 'dotnet new sln -n MySolution', description: 'Create a solution file' },
          { syntax: 'dotnet sln add MyApi/MyApi.csproj', description: 'Add a project to the solution' },
          { syntax: 'dotnet add package Microsoft.EntityFrameworkCore', description: 'Install a NuGet package' }
        ]
      },
      {
        title: 'Build, Run & Test',
        items: [
          { syntax: 'dotnet build -warnaserror', description: 'Build project treating all warnings as errors' },
          { syntax: 'dotnet run', description: 'Build and execute the project' },
          { syntax: 'dotnet test --logger "console;verbosity=detailed"', description: 'Run all unit and integration tests' },
          { syntax: 'dotnet watch run', description: 'Run with Hot Reload on file changes' }
        ]
      },
      {
        title: 'Publishing & EF Migrations',
        items: [
          { syntax: 'dotnet publish -c Release -o ./publish', description: 'Publish framework-dependent production build' },
          { syntax: 'dotnet ef migrations add InitialCreate', description: 'Create a new EF Core code-first migration' },
          { syntax: 'dotnet ef database update', description: 'Apply pending migrations to target database' }
        ]
      }
    ]
  },

  // 6. Git & GitHub for .NET
  {
    id: 'git-cheatsheet',
    title: 'Git & GitHub for .NET Developers',
    category: 'Version Control',
    sections: [
      {
        title: 'Essential Daily Workflow',
        items: [
          { syntax: 'git init && dotnet new gitignore', description: 'Initialize repo with official .NET gitignore (bin/ and obj/ excluded)' },
          { syntax: 'git status -s', description: 'Show concise status of tracked and untracked changes' },
          { syntax: 'git add . && git commit -m "feat(api): add student endpoint"', description: 'Stage changes and create conventional commit' },
          { syntax: 'git checkout -b feature/auth-jwt', description: 'Create and switch to a new feature branch' }
        ]
      },
      {
        title: 'Branching & Collaboration',
        items: [
          { syntax: 'git fetch origin && git pull --rebase origin main', description: 'Pull latest remote changes cleanly replaying local commits' },
          { syntax: 'git push -u origin feature/auth-jwt', description: 'Push branch to GitHub and set upstream tracking' },
          { syntax: 'git stash save "wip" && git stash pop', description: 'Temporarily shelve uncommitted work to switch branches' },
          { syntax: 'git diff HEAD~1 HEAD', description: 'Inspect exact line changes between last commit and current' }
        ]
      },
      {
        title: 'Emergency Undo & Clean Up',
        items: [
          { syntax: 'git restore --staged <file>', description: 'Unstage file while preserving local changes' },
          { syntax: 'git restore <file>', description: 'Discard local changes in file, reverting to last commit' },
          { syntax: 'git log --oneline --graph -n 10', description: 'View formatted 1-line branch history graph' }
        ]
      }
    ]
  },

  // 7. SQL & Relational Databases for .NET
  {
    id: 'sql-cheatsheet',
    title: 'SQL & Relational Databases for .NET',
    category: 'Database',
    sections: [
      {
        title: 'CRUD Operations & Joins',
        items: [
          { syntax: 'SELECT s.Id, s.Name, g.Grade FROM Students s INNER JOIN Grades g ON s.Id = g.StudentId WHERE s.IsActive = 1;', description: 'Inner Join with predicate filter' },
          { syntax: 'INSERT INTO Students (Name, Email, EnrolledAt) VALUES (\'Aarav\', \'aarav@kx.in\', CURRENT_TIMESTAMP);', description: 'Insert record with timestamp' },
          { syntax: 'UPDATE Students SET IsActive = 0 WHERE EnrolledAt < \'2024-01-01\';', description: 'Conditional batch update' },
          { syntax: 'DELETE FROM Orders WHERE Status = \'Cancelled\' AND CreatedAt < DATEADD(month, -6, GETDATE());', description: 'Batch deletion with date arithmetic' }
        ]
      },
      {
        title: 'Indexing & Constraints',
        items: [
          { syntax: 'CREATE UNIQUE NONCLUSTERED INDEX IX_Students_Email ON Students(Email);', description: 'Unique B-Tree index preventing duplicate email entries' },
          { syntax: 'CREATE INDEX IX_Orders_CustomerId_Status ON Orders(CustomerId, Status);', description: 'Composite index optimizing multi-column queries' },
          { syntax: 'ALTER TABLE Orders ADD CONSTRAINT FK_Orders_Customers FOREIGN KEY (CustomerId) REFERENCES Customers(Id) ON DELETE CASCADE;', description: 'Foreign key constraint with cascade delete' }
        ]
      },
      {
        title: 'Transactions & Aggregations',
        items: [
          { syntax: 'BEGIN TRANSACTION; ... COMMIT; (or ROLLBACK;)', description: 'ACID transaction boundary' },
          { syntax: 'SELECT DepartmentId, COUNT(*), AVG(Salary) FROM Employees GROUP BY DepartmentId HAVING COUNT(*) > 5;', description: 'Group By aggregation with Having filter' }
        ]
      }
    ]
  },

  // 8. HTTP Status Codes
  {
    id: 'http-status-cheatsheet',
    title: 'HTTP Status Codes for REST APIs',
    category: 'Web',
    sections: [
      {
        title: 'Success (2xx)',
        items: [
          { syntax: '200 OK', description: 'Standard successful GET, PUT, or DELETE response' },
          { syntax: '201 Created', description: 'Resource successfully created via POST (includes Location header)' },
          { syntax: '204 No Content', description: 'Operation succeeded, no response body returned (common in DELETE)' }
        ]
      },
      {
        title: 'Client Errors (4xx)',
        items: [
          { syntax: '400 Bad Request', description: 'Malformed JSON, validation failed, or invalid parameters' },
          { syntax: '401 Unauthorized', description: 'Authentication is missing or credentials/token are invalid' },
          { syntax: '403 Forbidden', description: 'User is authenticated but lacks required role or permissions' },
          { syntax: '404 Not Found', description: 'Requested resource URL or database ID does not exist' },
          { syntax: '409 Conflict', description: 'Optimistic concurrency failure or duplicate unique constraint' },
          { syntax: '429 Too Many Requests', description: 'Client exceeded rate limiting quota' }
        ]
      },
      {
        title: 'Server Errors (5xx)',
        items: [
          { syntax: '500 Internal Server Error', description: 'Unhandled exception on the server (return ProblemDetails)' },
          { syntax: '502 Bad Gateway', description: 'Upstream microservice or database unreachable' },
          { syntax: '503 Service Unavailable', description: 'Service temporarily down for maintenance or health check failed' }
        ]
      }
    ]
  }
];
