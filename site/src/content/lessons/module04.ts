import { LessonContent } from '../../components/LessonView';

export const module04Lessons: LessonContent[] = [
  {
    slug: 'sql-and-adonet-fundamentals',
    title: 'SQL Fundamentals and ADO.NET Internals',
    module: 4,
    moduleTitle: 'Databases and Data Access',
    order: 1,
    duration: 16,
    difficulty: 'Beginner',
    prerequisites: ['classes-objects-and-encapsulation'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Understand relational SQL concepts (SELECT, JOIN, indexes, ACID transactions) and learn ADO.NET (SqlConnection, SqlCommand, SqlDataReader) so you truly understand what ORMs abstract away.',
    goal: 'Understand the underlying ADO.NET plumbing that powers every higher-level .NET ORM including Entity Framework Core and Dapper.',
    explanation: `
### What is ADO.NET?
Before modern ORMs like Entity Framework Core, all .NET data access was written using **ADO.NET**. 
Every ORM—even EF Core—internally uses ADO.NET to open physical database connections and stream rows.

The core ADO.NET components are:
1. **\`DbConnection\` (e.g. \`SqlConnection\`, \`SqliteConnection\`)**: Manages the physical network socket connection to the database engine.
2. **\`DbCommand\` (e.g. \`SqlCommand\`)**: Holds the SQL query text and parameters to be executed.
3. **\`DbDataReader\` (e.g. \`SqlDataReader\`)**: A high-speed, forward-only stream of database rows read sequentially from the network buffer.

### Parameterized Queries: The Shield Against SQL Injection
Never concatenate raw strings into SQL queries:
- ❌ **Fatal Flaw**: \`"SELECT * FROM Users WHERE Email = '" + userInput + "'"\` (Attacker inputs \`' OR '1'='1\`).
- ✅ **Secure**: \`cmd.Parameters.AddWithValue("@Email", userInput);\`
    `,
    analogy: {
      realWorldScenario: 'An underground high-pressure water pipeline.',
      techMapping: 'DbConnection is turning on the main valve. SqlCommand is opening the specific nozzle. DbDataReader is the high-speed stream of water rushing forward through the hose into your buckets (objects).'
    },
    codeSnippet: {
      code: `using System.Data;
using Microsoft.Data.Sqlite;

public static async Task QueryWithAdoNetAsync(string dbPath, string searchEmail)
{
    using var connection = new SqliteConnection($"Data Source={dbPath}");
    await connection.OpenAsync();

    // Parameterized SQL query prevents SQL Injection attacks
    string sql = "SELECT Id, FullName, Email FROM Students WHERE Email = @Email";

    using var command = new SqliteCommand(sql, connection);
    command.Parameters.AddWithValue("@Email", searchEmail);

    using var reader = await command.ExecuteReaderAsync(CommandBehavior.CloseConnection);
    while (await reader.ReadAsync())
    {
        int id = reader.GetInt32(0);
        string name = reader.GetString(1);
        string email = reader.GetString(2);
        Console.WriteLine($"Student ID: {id}, Name: {name}, Email: {email}");
    }
}
`,
      language: 'csharp',
      filename: 'AdoNetRawDemo.cs',
      samplePath: 'Module04_Data/EfCoreAndDapperLab'
    },
    walkthrough: [
      { step: 'Open Connection', detail: 'Establishes a connection to the SQLite database.' },
      { step: 'Prepare Parameterized Command', detail: 'Assigns @Email parameter to prevent SQL injection vulnerabilities.' },
      { step: 'ExecuteReaderAsync', detail: 'Streams rows directly from the database engine asynchronously.' },
      { step: 'Read Loop', detail: 'reader.ReadAsync() advances to the next row in forward-only mode, mapping columns to typed variables.' }
    ],
    commonMistakes: [
      {
        mistake: 'Concatenating user input directly into SQL strings.',
        whyItFails: 'Leaves your application vulnerable to SQL Injection, allowing attackers to bypass authentication or wipe databases.',
        fix: 'Always use parameterized SQL queries (command.Parameters.Add).'
      }
    ],
    practiceTask: {
      title: 'Parameterized Student Lookup',
      task: 'Write an ADO.NET method that queries for a student by their integer ID using parameters, and prints whether the record was found.',
      hints: ['Use @Id parameter', 'Use reader.HasRows or await reader.ReadAsync()'],
      solutionCode: `command.CommandText = "SELECT FullName FROM Students WHERE Id = @Id";
command.Parameters.AddWithValue("@Id", 42);
using var reader = await command.ExecuteReaderAsync();
if (await reader.ReadAsync())
{
    Console.WriteLine($"Found: {reader.GetString(0)}");
}`
    },
    quiz: [
      {
        question: 'Why must SQL queries always be parameterized in ADO.NET and Dapper?',
        options: ['It makes SQL queries run 100x faster', 'To protect the database from SQL Injection attacks by ensuring inputs are treated strictly as data literals', 'Because C# compiler will not compile unparameterized queries', 'To format dates automatically'],
        correctIndex: 1,
        explanation: 'Parameterization separates SQL code from user-supplied data, neutralizing SQL injection attempts.'
      }
    ]
  },
  {
    slug: 'entity-framework-core-mastery',
    title: 'Entity Framework Core: DbContext, Migrations, and Query Tuning',
    module: 4,
    moduleTitle: 'Databases and Data Access',
    order: 2,
    duration: 22,
    difficulty: 'Intermediate',
    prerequisites: ['sql-and-adonet-fundamentals'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Master EF Core: DbContext configuration, Fluent API entity modeling, code-first migrations, eliminating the N+1 problem with .Include(), and AsNoTracking() read performance.',
    goal: 'Build, migrate, and tune high-performance database access layers using Entity Framework Core 10 LTS.',
    explanation: `
### What is Entity Framework Core?
EF Core is the official Object-Relational Mapper (ORM) for .NET. It lets you query and manipulate database records using strongly-typed C# classes and LINQ.

### Change Tracking vs AsNoTracking()
- By default, EF Core tracks all retrieved entities in memory using its \`ChangeTracker\`. When you call \`SaveChangesAsync()\`, it generates SQL UPDATE statements for modified properties.
- **For GET API endpoints and read-only reports, change tracking is wasted overhead.** Adding \`.AsNoTracking()\` tells EF Core to skip tracking, significantly cutting memory allocations and accelerating query execution.

### The N+1 Problem and Eager Loading
If you query 100 Students and then loop through each student to read their Enrollments, EF Core will issue 1 query for students and 100 separate queries for enrollments (101 roundtrips!).
- **Fix**: Use Eager Loading via \`.Include(s => s.Enrollments)\` or project using LINQ \`.Select()\` to fetch exactly the columns needed in a single SQL statement.
    `,
    analogy: {
      realWorldScenario: 'A professional courier delivery service.',
      techMapping: 'Eager loading (.Include): The courier puts all orders for an apartment building in one van and delivers everything in 1 trip. The N+1 bug: The courier drives to the building, delivers one letter, drives back to headquarters, and repeats this 100 times for each resident.'
    },
    codeSnippet: {
      code: `using Microsoft.EntityFrameworkCore;

public class AcademyContext : DbContext
{
    public DbSet<Student> Students => Set<Student>();
    public DbSet<Enrollment> Enrollments => Set<Enrollment>();

    protected override void OnConfiguring(DbContextOptionsBuilder options) =>
        options.UseSqlite("Data Source=academy.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>(builder =>
        {
            builder.HasKey(s => s.Id);
            builder.HasIndex(s => s.Email).IsUnique();
            builder.Property(s => s.FullName).HasMaxLength(100).IsRequired();
            builder.HasMany(s => s.Enrollments)
                   .WithOne(e => e.Student)
                   .HasForeignKey(e => e.StudentId);
        });
    }
}

// Optimized read-only query
public async Task<List<StudentDto>> GetStudentsAsync(AcademyContext db)
{
    return await db.Students
        .AsNoTracking() // Disable change tracking for performance
        .Include(s => s.Enrollments) // Eager load child enrollments in single query
        .Select(s => new StudentDto(s.Id, s.FullName, s.Email, s.Enrollments.Count))
        .ToListAsync();
}
`,
      language: 'csharp',
      filename: 'EfCoreMastery.cs',
      samplePath: 'Module04_Data/EfCoreAndDapperLab'
    },
    walkthrough: [
      { step: 'Model Configuration', detail: 'OnModelCreating uses Fluent API to enforce unique index on Email and 1-to-many relationship with Enrollments.' },
      { step: 'AsNoTracking', detail: 'Instructs EF Core not to snapshot entities in memory, reducing memory pressure on read-only queries.' },
      { step: 'Include Eager Loading', detail: 'Generates an efficient SQL JOIN to fetch parent and child rows in one network request.' },
      { step: 'Targeted Projection', detail: 'Selects directly into a StudentDto, minimizing byte transfer over the wire.' }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting .AsNoTracking() on read-only GET requests in ASP.NET Core APIs.',
        whyItFails: 'EF Core unnecessarily creates identity tracking maps in memory for every returned object, hurting throughput and memory usage under load.',
        fix: 'Always append .AsNoTracking() to queries that only read data for serialization.'
      }
    ],
    practiceTask: {
      title: 'Query Students with Active Enrollments',
      task: 'Write an EF Core LINQ query that retrieves students who have at least 1 enrollment, using AsNoTracking and returning an anonymous object with FullName and Email.',
      hints: ['Use .Where(s => s.Enrollments.Any())', 'Use .AsNoTracking()', 'Project with .Select()'],
      solutionCode: `var activeStudents = await db.Students
    .AsNoTracking()
    .Where(s => s.Enrollments.Any())
    .Select(s => new { s.FullName, s.Email })
    .ToListAsync();`
    },
    quiz: [
      {
        question: 'What is the primary benefit of calling .AsNoTracking() in EF Core queries?',
        options: ['It commits transactions immediately', 'It disables entity snapshot change tracking, reducing memory allocations and accelerating query speeds for read-only scenarios', 'It deletes rows from the database', 'It encrypts the database connection'],
        correctIndex: 1,
        explanation: 'AsNoTracking tells EF Core not to track entity modifications, saving CPU cycles and heap memory on read operations.'
      }
    ]
  }
];
