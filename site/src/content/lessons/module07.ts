import { LessonContent } from '../../components/LessonView';

export const module07Lessons: LessonContent[] = [
  {
    slug: 'clean-architecture-and-ddd',
    title: 'Clean Architecture, Domain-Driven Design & CQRS',
    module: 7,
    moduleTitle: 'Architecture and Quality',
    order: 1,
    duration: 22,
    difficulty: 'Intermediate',
    prerequisites: ['interfaces-polymorphism-and-solid'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Master Clean Architecture (Domain, Application, Infrastructure, Presentation), understand the Dependency Rule, Domain-Driven Design principles, and CQRS patterns.',
    goal: 'Structure enterprise .NET solutions so business logic remains completely isolated from database engines, external APIs, and UI frameworks.',
    explanation: `
### The Core Rule of Clean Architecture: The Dependency Rule
In Clean Architecture (also called Onion or Hexagonal Architecture), your software is split into concentric rings:
1. **Domain (Center)**: Contains enterprise entities, value objects, domain exceptions, and repository interfaces. **Has ZERO external references.**
2. **Application**: Contains use cases, CQRS commands/queries, DTOs, and business interfaces. Depends *only* on Domain.
3. **Infrastructure**: Implements database mapping (EF Core DbContext), email services, cloud storage, and external REST APIs. Depends on Application.
4. **Presentation (Web API / UI)**: Contains Minimal API endpoints, controllers, or Razor Pages.

**The Golden Law: Dependencies point inward towards the Domain. The Domain never references EF Core, ASP.NET Core, or external libraries.**

### When NOT to Use Microservices!
Industry leaders caution against premature microservices:
- If your system has low traffic or a small development team, microservices add distributed transaction headaches, network latency, and deployment complexity without benefits.
- **Start with a Modular Monolith with Clean Architecture.** You get clean boundaries that can easily be split into microservices later if scaling demands it.
    `,
    analogy: {
      realWorldScenario: 'An ancient walled medieval castle.',
      techMapping: 'The inner sanctum houses the royalty and crown laws (Domain). Outside the sanctum is the inner court advisors (Application). Beyond that are the supply caravans and blacksmiths (Infrastructure). The outer drawbridge is where foreign visitors arrive (Presentation).'
    },
    codeSnippet: {
      code: `// Domain Layer: Pure Value Object
public readonly record struct StudentEmail
{
    public string Value { get; }

    public StudentEmail(string value)
    {
        if (string.IsNullOrWhiteSpace(value) || !value.Contains('@'))
            throw new ArgumentException("Invalid email format.", nameof(value));
        Value = value.ToLowerInvariant();
    }
}

// Domain Layer: Entity
public class StudentEntity
{
    public Guid Id { get; } = Guid.NewGuid();
    public StudentEmail Email { get; }
    public string Name { get; private set; }

    public StudentEntity(StudentEmail email, string name)
    {
        Email = email;
        Name = name;
    }
}

// Application Layer: Use Case Command
public class EnrollStudentUseCase
{
    private readonly IStudentRepository _repo;

    public EnrollStudentUseCase(IStudentRepository repo) => _repo = repo;

    public async Task<Guid> HandleAsync(string email, string name)
    {
        var student = new StudentEntity(new StudentEmail(email), name);
        await _repo.AddAsync(student);
        return student.Id;
    }
}
`,
      language: 'csharp',
      filename: 'CleanArchitectureDomainDemo.cs',
      samplePath: 'Module07_Architecture/CleanArchitectureCore'
    },
    walkthrough: [
      { step: 'Value Object', detail: 'StudentEmail validates invariants during creation and guarantees equality by value.' },
      { step: 'Isolated Entity', detail: 'StudentEntity does not depend on EF Core attributes, keeping domain logic pure.' },
      { step: 'Use Case', detail: 'EnrollStudentUseCase orchestrates domain entities and invokes IStudentRepository.' },
      { step: 'Inversion of Control', detail: 'Infrastructure provides the concrete EF Core repository implementation that implements IStudentRepository.' }
    ],
    commonMistakes: [
      {
        mistake: 'Referencing Microsoft.EntityFrameworkCore inside the Domain project.',
        whyItFails: 'Violates Clean Architecture by coupling pure domain rules to a specific database ORM.',
        fix: 'Keep Domain 100% free of third-party package dependencies; define repository interfaces in Domain/Application and implement them in Infrastructure.'
      }
    ],
    practiceTask: {
      title: 'Design an Order Clean Architecture Entity',
      task: 'Create an Order Entity in the Domain layer with a readonly list of OrderItems and an AddItem method that prevents adding items with price <= 0.',
      hints: ['Encapsulate List<OrderItem> behind IReadOnlyList', 'Enforce price > 0 check in AddItem'],
      solutionCode: `public class Order
{
    private readonly List<OrderItem> _items = [];
    public IReadOnlyList<OrderItem> Items => _items.AsReadOnly();

    public void AddItem(string name, decimal price)
    {
        if (price <= 0) throw new ArgumentException("Price must be positive.");
        _items.Add(new OrderItem(name, price));
    }
}`
    },
    quiz: [
      {
        question: 'In Clean Architecture, which layer should contain database mappings and third-party API clients?',
        options: ['Domain', 'Application', 'Infrastructure', 'Presentation'],
        correctIndex: 2,
        explanation: 'Infrastructure implements external concerns like databases, cloud services, and email providers.'
      }
    ]
  },
  {
    slug: 'testing-xunit-and-integration',
    title: 'Testing Masterclass: xUnit, Mocking, and WebApplicationFactory',
    module: 7,
    moduleTitle: 'Architecture and Quality',
    order: 2,
    duration: 20,
    difficulty: 'Intermediate',
    prerequisites: ['clean-architecture-and-ddd'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Write professional automated tests: unit tests with xUnit and NSubstitute, assertion libraries (note on FluentAssertions v8 commercial licensing), and real in-memory integration testing with WebApplicationFactory.',
    goal: 'Build comprehensive test suites combining unit tests for business logic and integration tests for HTTP API contracts.',
    explanation: `
### The Test Pyramid for .NET Developers
1. **Unit Tests (Base)**: Fast, test isolated methods with mock dependencies (xUnit, NSubstitute). Run in milliseconds.
2. **Integration Tests (Middle)**: Test the full ASP.NET Core pipeline and database interactions in-memory using **\`WebApplicationFactory<TProgram>\`**.
3. **End-to-End Tests (Peak)**: Test the deployed application end-to-end.

### Industry Note: FluentAssertions Licensing
Starting in version 8, FluentAssertions transitioned to a commercial license. In modern open-source and commercial .NET projects, teams recommend:
- **AwesomeAssertions** (the community open-source fork)
- **Shouldly**
- Standard **xUnit \`Assert\`** methods (which require zero extra dependencies).
    `,
    analogy: {
      realWorldScenario: 'Testing an automobile before mass production.',
      techMapping: 'Unit test: Testing an alternator or spark plug on a lab test bench. Integration test: Installing the engine, transmission, and brakes inside the chassis and running on a test track (WebApplicationFactory).'
    },
    codeSnippet: {
      code: `using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;

public class StudentApiIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public StudentApiIntegrationTests(WebApplicationFactory<Program> factory)
    {
        // Spins up in-memory ASP.NET Core test server
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetStudents_ReturnsSuccessStatusCode_AndJsonContentType()
    {
        // Act: Make real in-memory HTTP call through middleware
        var response = await _client.GetAsync("/api/students");

        // Assert: Verify HTTP contract
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(response.Content.Headers.ContentType);
        Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
    }
}
`,
      language: 'csharp',
      filename: 'ApiIntegrationTests.cs',
      samplePath: 'Karmatix.Academy.Tests'
    },
    walkthrough: [
      { step: 'WebApplicationFactory', detail: 'Boots the complete ASP.NET Core pipeline in-memory without opening external network ports.' },
      { step: 'CreateClient()', detail: 'Provides a pre-configured HttpClient connected directly to the in-memory test server.' },
      { step: 'Act', detail: 'Dispatches real HTTP GET request through all middleware, routing, and endpoint handlers.' },
      { step: 'Assert', detail: 'Verifies response status code and JSON content-type contract.' }
    ],
    commonMistakes: [
      {
        mistake: 'Relying exclusively on unit tests with mocks and skipping integration tests.',
        whyItFails: 'Unit tests cannot catch middleware ordering bugs, route matching failures, or JSON serialization quirks.',
        fix: 'Complement unit tests with WebApplicationFactory integration tests for key API endpoints.'
      }
    ],
    practiceTask: {
      title: 'Write an xUnit Fact for Discount Calculation',
      task: 'Write an xUnit test method verifying that Gold members receive exactly 15% discount on an original price of 100m.',
      hints: ['Use [Fact]', 'Assert.Equal(85m, discountedPrice)'],
      solutionCode: `[Fact]
public void GoldMember_ReceivesFifteenPercentDiscount()
{
    var strategy = DiscountStrategyFactory.Create("Gold");
    var finalPrice = strategy.ApplyDiscount(100m);
    Assert.Equal(85m, finalPrice);
}`
    },
    quiz: [
      {
        question: 'What is the primary advantage of WebApplicationFactory for ASP.NET Core testing?',
        options: ['It replaces all unit tests', 'It boots the entire real HTTP request pipeline in-memory, testing routing, middleware, and serialization without external hosting', 'It formats SQL queries', 'It accelerates computer CPU speed'],
        correctIndex: 1,
        explanation: 'WebApplicationFactory runs the real ASP.NET Core host in-memory, providing true integration verification with high speed.'
      }
    ]
  }
];
