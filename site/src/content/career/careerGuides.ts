export interface CareerArticle {
  id: string;
  title: string;
  category: 'Resume & Portfolio' | 'GitHub & LinkedIn' | 'Interview Strategy' | 'Revision Plans' | 'Common Mistakes';
  summary: string;
  content: string;
}

export const careerArticles: CareerArticle[] = [
  {
    id: 'resume-portfolio-guide',
    title: 'The Production .NET Developer Resume & Portfolio Playbook',
    category: 'Resume & Portfolio',
    summary: 'How to write a high-impact, ATS-optimized .NET resume and assemble a portfolio that proves real engineering capability.',
    content: `
### What Enterprise Hiring Managers Actually Look For

Most beginner .NET resumes fail because they list trivial CRUD tutorials (e.g., "Built a todo app with ASP.NET") without demonstrating engineering depth. Modern engineering leads want to see:

1. **Production Best Practices**: Clean Architecture, DTOs, FluentValidation, Global Exception Handling with RFC ProblemDetails.
2. **Data Integrity**: Real database modeling with Entity Framework Core, migrations, index optimization, and understanding the N+1 problem.
3. **Automated Testing**: Real integration tests using \`WebApplicationFactory\` and unit tests with xUnit or NSubstitute.
4. **DevOps & Cloud**: Docker multi-stage builds, GitHub Actions CI/CD pipelines with \`dotnet build -warnaserror\`, and cloud hosting.

### The 4 High-Impact Resume Bullet Formula
Instead of writing:
- *❌ "Created REST APIs using ASP.NET Core and SQL Server."*

Write this instead:
- *✅ "Architected and deployed a multi-tenant RESTful API on .NET 10 LTS using Clean Architecture, reducing query latency by 45% using EF Core .AsNoTracking() and indexed queries."*
- *✅ "Built automated CI/CD pipeline with GitHub Actions executing unit and integration tests with 92% code coverage, packaging a multi-stage Docker image deployed to Azure Container Apps."*

### Must-Have Sections on Your Resume
- **Header**: Name, Title (e.g., "Full-Stack .NET Engineer"), Location, LinkedIn, GitHub, Email, Portfolio Link.
- **Technical Skills**: Grouped cleanly:
  - *Languages & Frameworks*: C# 14, .NET 10 LTS, ASP.NET Core, EF Core, LINQ, SQL.
  - *Architecture & Patterns*: Clean Architecture, REST, Minimal APIs, Dependency Injection, CQRS.
  - *Testing & Quality*: xUnit, WebApplicationFactory, NSubstitute, SonarQube, EditorConfig.
  - *DevOps & Cloud*: Docker, GitHub Actions, Azure (App Service, SQL, Key Vault), Linux/Nginx.
- **Flagship Projects**: 2–3 deep projects with live demo URLs, repository links, architectural overview, and quantified impact.
- **Experience**: Previous roles or freelance accomplishments.
`
  },
  {
    id: 'github-profile-guide',
    title: 'Transforming Your GitHub into a Job-Winning Portfolio',
    category: 'GitHub & LinkedIn',
    summary: 'A complete checklist for organizing your repositories, crafting READMEs, and showing proof of craftsmanship.',
    content: `
### The 5 Elements of an Irresistible GitHub Profile

1. **Pinned Repositories with Visual READMEs**:
   - Never leave a pinned repo with an empty or default README.
   - Every pinned repository must have:
     - Clear Architecture Diagram (Mermaid or SVG).
     - Tech Stack Badges (.NET 10, C# 14, EF Core, Docker, xUnit).
     - Quickstart guide (\`dotnet build\`, \`dotnet test\`, \`docker compose up\`).
     - Live demo URL or Postman collection link.
2. **Green Contribution Graph with Meaningful Commits**:
   - Avoid "Commit 1", "Updated code".
   - Use conventional commit messages: \`feat: implement JWT token refresh\`, \`fix: resolve N+1 query in order checkout\`, \`test: add integration test for user login\`.
3. **Clean Root Profile README**:
   - A concise introduction, your core tech stack, current learning goals, and links to your top articles or projects.
4. **Active CI Badges**:
   - Show that your build is green! Add the GitHub Actions workflow badge (\`[![Build Status](...)]\`) directly at the top of your README.
`
  },
  {
    id: 'linkedin-networking-playbook',
    title: 'LinkedIn Optimization & Cold Outreach for .NET Engineers',
    category: 'GitHub & LinkedIn',
    summary: 'How to attract technical recruiters and connect meaningfully with engineering leaders.',
    content: `
### Optimizing Your Headline
Avoid generic titles like *"Aspiring Software Engineer"* or *"Recent Graduate"*. 
Instead, highlight your concrete technical capability:
- *✅ .NET Developer | C# 14, ASP.NET Core Web APIs, EF Core, Azure, Docker | Passionate about Clean Architecture*

### Sharing "Build in Public" Updates
Recruiters and hiring managers browse LinkedIn for candidates who demonstrate genuine curiosity and technical communication skills. 
Once a week, post a concise breakdown of something you built or debugged:
- "Today I debugged an N+1 query issue in Entity Framework Core. Here is the difference between client-side evaluation and eager loading with .Include()..."
- "Just deployed my first multi-stage Docker container with .NET 10 to Azure Container Apps. Here are 3 lessons I learned about slimming image sizes down from 800MB to 120MB..."
`
  },
  {
    id: 'salary-negotiation-basics',
    title: 'Salary Negotiation & Job Offer Strategy for .NET Developers',
    category: 'Interview Strategy',
    summary: 'Practical principles to negotiate compensation with confidence, tact, and data.',
    content: `
### 1. Research Real Market Benchmarks First
Before entering interviews, gather concrete salary ranges for your level and region (e.g., Glassdoor, Levels.fyi, AmbitionBox for India). Know your:
- **Baseline Minimum**: The absolute floor below which you will walk away.
- **Target Value**: The realistic competitive market average.
- **Aspirational Value**: Top 15% range for well-funded startups and multinational enterprise tech centers.

### 2. Never Disclose Your Number First
When recruiters ask: *"What are your salary expectations?"*, respond with polite professionalism:
> *"I am focusing on finding the right technical team and mission where I can make an immediate impact with modern .NET and cloud systems. I would appreciate understanding the budgeted range for this position."*

### 3. Evaluate the Entire Package
Base salary is only one component. Always evaluate:
- Annual performance bonuses
- Health insurance and employee wellness coverage
- Learning allowances (certifications, books, conference tickets)
- Remote work flexibility and equipment stipends
`
  },
  {
    id: 'common-mistakes-series',
    title: 'The Top 10 Fatal Mistakes .NET Developers Make in Production',
    category: 'Common Mistakes',
    summary: 'The classic traps in memory, async, EF Core, and security that cost companies outages and performance bottlenecks.',
    content: `
### 1. Sync-Over-Async (.Result / .Wait())
- **The Defect**: Calling \`task.Result\` or \`task.Wait()\` blocks thread pool threads. Under high traffic, this exhausts all available thread pool threads, causing application-wide lockups.
- **The Fix**: Always \`await\` asynchronous calls all the way up the call stack.

### 2. The N+1 Query Problem in EF Core
- **The Defect**: Iterating over entities and querying child records inside a loop causes 100+ database queries instead of 1.
- **The Fix**: Use \`.Include()\` for eager loading or projection with \`.Select()\` to generate a single SQL JOIN.

### 3. Captive Dependencies in Dependency Injection
- **The Defect**: Injecting a Scoped service (like \`DbContext\`) into a Singleton service locks the scoped instance for the entire application lifetime, causing concurrency exceptions and memory leaks.
- **The Fix**: Never inject Scoped into Singleton. If a background singleton worker needs a scoped service, create an explicit scope with \`IServiceScopeFactory\`.

### 4. Over-Posting (Mass Assignment)
- **The Defect**: Accepting an EF Core entity model directly as a controller parameter allows malicious users to send JSON containing \`"isAdmin": true\`.
- **The Fix**: Always use DTOs with explicit properties, and map them to entity models.

### 5. String Concatenation in Loops
- **The Defect**: Strings are immutable in C#. Appending strings inside loops allocates thousands of temporary heap objects.
- **The Fix**: Use \`StringBuilder\` or LINQ \`string.Join()\` for iterative string assembly.

### 6. Missing CancellationToken Propagation
- **The Defect**: Leaving out cancellation tokens means database queries and external HTTP calls continue running even after the user closes their browser.
- **The Fix**: Accept a \`CancellationToken\` in controller actions and pass it to all asynchronous methods.

### 7. Swallowing Exceptions
- **The Defect**: Writing \`catch (Exception) { /* do nothing */ }\` hides catastrophic failures and makes debugging impossible.
- **The Fix**: Catch specific exceptions, log them with structured logging (\`ILogger\`), or let the global error handler return a \`ProblemDetails\` response.

### 8. Hardcoding Database Connection Strings in Git
- **The Defect**: Committing passwords or database strings to GitHub is an immediate security breach.
- **The Fix**: Use .NET Secret Manager for local development and Azure Key Vault or Environment Variables in production.

### 9. Omitting .AsNoTracking() on Read-Only Queries
- **The Defect**: EF Core tracks every retrieved entity by default, consuming substantial memory and CPU.
- **The Fix**: Add \`.AsNoTracking()\` to all GET and reporting queries.

### 10. Returning 200 OK for Errors
- **The Defect**: Returning HTTP 200 with JSON like \`{ "success": false, "error": "Not found" }\` violates HTTP standards and breaks API consumers and monitoring tools.
- **The Fix**: Return proper HTTP status codes: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, and 500 Internal Server Error.
`
  },
  {
    id: 'revision-plan-7-day',
    title: '7-Day High-Intensity Technical Interview Revision Plan',
    category: 'Revision Plans',
    summary: 'A day-by-day rapid sprint to refresh core C#, data structures, EF Core, and system architecture before an upcoming interview.',
    content: `
- **Day 1: C# Internals & Language Mechanics**
  - Review Value vs Reference types, Stack vs Heap, GC Generations (Gen 0, 1, 2, LOH).
  - Practice records, \`with\` expressions, and Nullable Reference Types.
  - Review 20 interview Q&A on C# Basics.
- **Day 2: Object-Oriented Design & SOLID**
  - Revise the 4 pillars with analogies.
  - Write code samples for Factory, Strategy, and Repository patterns.
  - Explain SOLID in simple terms.
- **Day 3: LINQ & Collections Masterclass**
  - Understand deferred execution vs immediate execution.
  - Compare \`IEnumerable<T>\` vs \`IQueryable<T>\`.
  - Solve 5 coding practice problems on strings and arrays.
- **Day 4: Asynchronous Programming & Concurrency**
  - Deep-dive into Task state machine and thread pool mechanics.
  - Review why \`async void\` and \`.Result\` are dangerous.
  - Implement throttling with \`SemaphoreSlim\`.
- **Day 5: Entity Framework Core & SQL Optimization**
  - Review migrations, shadow properties, and navigation configurations.
  - Practice spotting and fixing N+1 queries.
  - Compare EF Core vs Dapper trade-offs.
- **Day 6: ASP.NET Core & Security**
  - Review request pipeline middleware order.
  - Understand Transient vs Scoped vs Singleton lifecycles.
  - Review JWT authentication, refresh tokens, and OWASP Top 10 defenses.
- **Day 7: Full Mock Tests & System Design**
  - Take Mock Tests 1, 3, and 5 under 20-minute timed conditions.
  - Walk through Clean Architecture folder structure.
  - Practice explaining your Capstone projects with clarity.
`
  },
  {
    id: 'revision-plan-30-day',
    title: '30-Day Comprehensive Job-Ready Sprint',
    category: 'Revision Plans',
    summary: 'A structured 4-week roadmap taking you through every layer of modern .NET engineering with capstone completion.',
    content: `
- **Week 1: Foundations & Object-Oriented Mastery**
  - Modules 0, 1, and 2.
  - Build Capstone 1 (Bank & Inventory Console Application).
  - Solve 15 coding exercises on arrays, strings, and collections.
- **Week 2: LINQ, Async/Await & EF Core**
  - Modules 3 and 4.
  - Build Capstone 2 (Student Management REST API with EF Core & SQLite).
  - Solve 15 coding exercises on LINQ and async throttling.
- **Week 3: ASP.NET Core Web APIs, Security & Real-Time**
  - Modules 5 and 6.
  - Build Capstone 4 (E-Commerce REST API with JWT Auth & Pagination).
  - Build Capstone 5 (Real-time Chat with SignalR).
- **Week 4: Architecture, Testing, DevOps & Career Prep**
  - Modules 7, 8, 9, 10, and 11.
  - Build Capstone 7 (Observable, Dockerized Production API).
  - Complete all 6 Timed Mock Tests with >= 80% score.
  - Finalize your GitHub profile and resume with live deployed demo links.
`
  }
];

