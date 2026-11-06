import { LessonContent } from '../../components/LessonView';

export const module11Lessons: LessonContent[] = [
  {
    slug: 'capstone-1-bank-inventory',
    title: 'Capstone 1: Bank & Inventory Console Application',
    module: 11,
    moduleTitle: 'Capstone Projects',
    order: 1,
    duration: 25,
    difficulty: 'Beginner',
    prerequisites: ['classes-objects-and-encapsulation', 'collections-and-expressions'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Build a production-grade Bank & Inventory system in C# 14 demonstrating domain encapsulation, immutable transaction records, custom domain exceptions, and generic collections.',
    goal: 'Build, test, and run a complete object-oriented console application with full unit test coverage.',
    explanation: `
### Architecture of Capstone 1
This capstone demonstrates writing enterprise-grade domain models before adding web or database layers:
1. **BankAccount Entity**: Manages account balance with private setters, preventing unauthorized direct mutation.
2. **Transaction Record**: Immutable record logging every deposit and withdrawal with UTC timestamps and unique GUIDs.
3. **InventoryManager**: Generic dictionary-backed store managing stock levels and atomic deductions.
4. **Unit Tests**: Full xUnit test suite validating deposits, withdrawals, and insufficient funds exceptions.
    `,
    analogy: {
      realWorldScenario: 'A bank teller station combined with a warehouse stockroom.',
      techMapping: 'The teller ledger tracks money movements without allowing negative balance tricks. The warehouse clerk logs box movements in and out.'
    },
    codeSnippet: {
      code: `// Full compilable code in /samples/Capstones/Capstone1_BankInventory
public record Transaction(Guid Id, decimal Amount, string Description, DateTime Timestamp);

public class BankAccount
{
    public string AccountNumber { get; }
    public string OwnerName { get; }
    public decimal Balance { get; private set; }
    public List<Transaction> History { get; } = [];

    public BankAccount(string accountNumber, string ownerName, decimal initialDeposit)
    {
        if (initialDeposit < 0) throw new ArgumentException("Initial deposit cannot be negative.");
        AccountNumber = accountNumber;
        OwnerName = ownerName;
        Balance = initialDeposit;
        History.Add(new Transaction(Guid.NewGuid(), initialDeposit, "Initial Deposit", DateTime.UtcNow));
    }

    public void Deposit(decimal amount, string note)
    {
        if (amount <= 0) throw new ArgumentException("Deposit amount must be positive.");
        Balance += amount;
        History.Add(new Transaction(Guid.NewGuid(), amount, note, DateTime.UtcNow));
    }

    public void Withdraw(decimal amount, string note)
    {
        if (amount <= 0) throw new ArgumentException("Withdrawal amount must be positive.");
        if (amount > Balance) throw new InvalidOperationException("Insufficient funds.");
        Balance -= amount;
        History.Add(new Transaction(Guid.NewGuid(), -amount, note, DateTime.UtcNow));
    }
}
`,
      language: 'csharp',
      filename: 'Program.cs',
      samplePath: 'Capstones/Capstone1_BankInventory'
    },
    walkthrough: [
      { step: 'Domain Entities', detail: 'Defines BankAccount and Transaction records.' },
      { step: 'Encapsulation Rules', detail: 'Prevents negative deposits and prevents withdrawing beyond current balance.' },
      { step: 'Inventory Manager', detail: 'Implements DeductStock with stock check safety.' },
      { step: 'Unit Testing', detail: 'Validated via xUnit test fixtures in Karmatix.Academy.Tests.' }
    ],
    commonMistakes: [
      {
        mistake: 'Allowing direct public mutation on Balance (e.g. account.Balance = 1000).',
        whyItFails: 'Bypasses transaction logging, making ledger audits impossible.',
        fix: 'Enforce private setters and require calls to Deposit() and Withdraw().'
      }
    ],
    practiceTask: {
      title: 'Run Capstone 1 Locally',
      task: 'Execute Capstone 1 from your terminal using the dotnet CLI and verify all output.',
      hints: ['Run dotnet run --project samples/Capstones/Capstone1_BankInventory'],
      solutionCode: `dotnet run --project samples/Capstones/Capstone1_BankInventory`
    },
    quiz: [
      {
        question: 'Why are Transaction items modeled as immutable records in Capstone 1?',
        options: ['To speed up compilation', 'Because financial transactions are permanent historical events that must never be modified after creation', 'Because classes cannot store dates', 'To avoid using memory'],
        correctIndex: 1,
        explanation: 'Financial ledgers must remain immutable audit logs where historical records cannot be altered.'
      }
    ]
  },
  {
    slug: 'capstone-2-student-api',
    title: 'Capstone 2: Student Management REST API with EF Core & SQLite',
    module: 11,
    moduleTitle: 'Capstone Projects',
    order: 2,
    duration: 30,
    difficulty: 'Intermediate',
    prerequisites: ['minimal-apis-validation-and-errors', 'entity-framework-core-mastery'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Build a production-style RESTful API in ASP.NET Core (.NET 10 LTS) using Minimal APIs, Entity Framework Core with SQLite, DataAnnotations validation, and AsNoTracking query optimization.',
    goal: 'Build, migrate, and test a persistent RESTful CRUD API service with proper HTTP status codes and DTO contracts.',
    explanation: `
### Architecture of Capstone 2
This capstone connects ASP.NET Core Minimal APIs to a real SQLite relational database:
1. **StudentEntity**: Modeled with Id, FullName, Email (unique index), Major, and Gpa.
2. **StudentDbContext**: Configured with EF Core SQLite provider.
3. **DTOs**: \`CreateStudentDto\` with \`[EmailAddress]\` and \`[Range(0.0, 4.0)]\` validation attributes.
4. **Endpoints**:
   - \`GET /api/students\`: Returns all students with \`.AsNoTracking()\`.
   - \`GET /api/students/{id}\`: Returns single student or 404 Not Found.
   - \`POST /api/students\`: Validates DTO, checks email uniqueness (409 Conflict if duplicate), returns 201 Created with Location header.
   - \`DELETE /api/students/{id}\`: Uses modern EF Core \`ExecuteDeleteAsync()\` for high-speed direct SQL deletion.
    `,
    analogy: {
      realWorldScenario: 'A university registrar admissions portal.',
      techMapping: 'Students submit admission forms (POST DTO). The registrar checks for duplicate student records, validates GPA marks, and writes the student into the permanent student ledger (SQLite database).'
    },
    codeSnippet: {
      code: `// Full compilable code in /samples/Capstones/Capstone2_StudentApi
app.MapPost("/api/students", async (CreateStudentDto dto, StudentDbContext db) =>
{
    var exists = await db.Students.AnyAsync(s => s.Email == dto.Email);
    if (exists)
    {
        return Results.Conflict(new { error = "A student with this email address already exists." });
    }

    var entity = new StudentEntity
    {
        FullName = dto.FullName,
        Email = dto.Email,
        Major = dto.Major,
        Gpa = dto.Gpa
    };

    db.Students.Add(entity);
    await db.SaveChangesAsync();

    var responseDto = new StudentDto(entity.Id, entity.FullName, entity.Email, entity.Major, entity.Gpa, entity.CreatedAt);
    return Results.Created($"/api/students/{entity.Id}", responseDto);
});
`,
      language: 'csharp',
      filename: 'Program.cs',
      samplePath: 'Capstones/Capstone2_StudentApi'
    },
    walkthrough: [
      { step: 'Scaffold Web Project', detail: 'Created with Microsoft.NET.Sdk.Web targeting net10.0.' },
      { step: 'EF Core SQLite', detail: 'Configured via builder.Services.AddDbContext<StudentDbContext>.' },
      { step: 'Duplicate Verification', detail: 'Checks AnyAsync on email to return HTTP 409 Conflict on collision.' },
      { step: 'Results.Created', detail: 'Emits 201 Created status with URI and response payload.' }
    ],
    commonMistakes: [
      {
        mistake: 'Returning the EF Core entity directly from the POST handler.',
        whyItFails: 'Exposes database structure directly and can trigger circular reference serialization loops.',
        fix: 'Always map entity to a clean response DTO.'
      }
    ],
    practiceTask: {
      title: 'Run Capstone 2 Locally',
      task: 'Execute Capstone 2 using the dotnet CLI and make a test GET request to /api/students.',
      hints: ['Run dotnet run --project samples/Capstones/Capstone2_StudentApi'],
      solutionCode: `dotnet run --project samples/Capstones/Capstone2_StudentApi`
    },
    quiz: [
      {
        question: 'Which HTTP status code should be returned when attempting to register a student with an email that already exists?',
        options: ['200 OK', '404 Not Found', '409 Conflict', '500 Server Error'],
        correctIndex: 2,
        explanation: 'HTTP 409 Conflict indicates that the request could not be processed because of a conflict in the current state of the resource (such as unique key collisions).'
      }
    ]
  },
  {
    slug: 'capstone-7-production-api',
    title: 'Capstone 7: Dockerized, Observable Production API on Azure',
    module: 11,
    moduleTitle: 'Capstone Projects',
    order: 7,
    duration: 35,
    difficulty: 'Advanced',
    prerequisites: ['docker-and-containerization', 'github-actions-and-cicd'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Package and deploy a production-hardened .NET 10 API featuring multi-stage Docker builds, non-root user execution, Health Checks (/healthz, /ready), and automated CI/CD.',
    goal: 'Build, containerize, and deploy a production-observable cloud API ready for Azure Container Apps or Kubernetes.',
    explanation: `
### The Enterprise Capstone
This capstone culminates the entire curriculum, packaging a production API that meets enterprise reliability standards:
1. **Health Checks**: Implements \`/healthz\` (liveness probe) and \`/ready\` (readiness probe) for Kubernetes and Azure Container Apps.
2. **Multi-Stage Dockerfile**: Builds on \`mcr.microsoft.com/dotnet/sdk:10.0\` and runs on lean \`mcr.microsoft.com/dotnet/aspnet:10.0\`.
3. **Non-Root Execution**: Runs under standard \`USER $APP_UID\` to prevent container escape vulnerabilities.
4. **Automated CI/CD**: Verified with GitHub Actions running \`dotnet build -warnaserror\` and test suites before container packaging.
    `,
    analogy: {
      realWorldScenario: 'Launching a commercial passenger aircraft into scheduled airline service.',
      techMapping: 'Pre-flight instrument diagnostics (/healthz and /ready) verify engines and avionics. The cockpit operates under strict security protocols (non-root permissions) and air traffic control monitors flight radar continuously (observability).'
    },
    codeSnippet: {
      code: `// Multi-Stage Dockerfile in /samples/Capstones/Capstone7_ProductionApi
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["Capstone7_ProductionApi.csproj", "./"]
RUN dotnet restore "Capstone7_ProductionApi.csproj"
COPY . .
RUN dotnet publish "Capstone7_ProductionApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
USER $APP_UID

COPY --from=build /app/publish .
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "Capstone7_ProductionApi.dll"]
`,
      language: 'dockerfile',
      filename: 'Dockerfile',
      samplePath: 'Capstones/Capstone7_ProductionApi'
    },
    walkthrough: [
      { step: 'Health Probe Endpoints', detail: 'Configures app.MapHealthChecks("/healthz") for container orchestrators.' },
      { step: 'Multi-stage Docker Build', detail: 'Compiles in SDK stage, runs in slim ASP.NET Core runtime stage.' },
      { step: 'Non-Root User Enforcement', detail: 'USER $APP_UID drops administrative privileges in container.' },
      { step: 'Docker Compose', detail: 'Runs container locally with automated health check intervals.' }
    ],
    commonMistakes: [
      {
        mistake: 'Running Docker containers as root user in production cloud clusters.',
        whyItFails: 'If the container process is compromised, the attacker has root privileges on the underlying host node.',
        fix: 'Always add USER $APP_UID to your runtime stage.'
      }
    ],
    practiceTask: {
      title: 'Run Capstone 7 with Docker Compose',
      task: 'Navigate to samples/Capstones/Capstone7_ProductionApi and run docker compose up --build, then test the healthz endpoint.',
      hints: ['Use docker compose up --build', 'Query http://localhost:8080/healthz in browser or curl'],
      solutionCode: `cd samples/Capstones/Capstone7_ProductionApi
docker compose up --build`
    },
    quiz: [
      {
        question: 'What is the purpose of the /healthz endpoint in production containerized APIs?',
        options: ['It displays developer blog posts', 'It allows load balancers and Kubernetes orchestrators to verify application process health and automatically restart deadlocked pods', 'It formats SQL queries', 'It prints user passwords'],
        correctIndex: 1,
        explanation: 'Health check endpoints allow cloud orchestrators to monitor container health and manage traffic routing and automatic restarts.'
      }
    ]
  }
];
