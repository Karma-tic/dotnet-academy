// Generated from karmatix-learn (src/data). Do not edit by hand.
// Regenerate: node scripts/export-roadmap.mjs dotnet <this file>

export type RoadmapResource = { id: string; name: string; by: string; url: string; type: string; cost: string; lang: string; why: string; tip: string };

export const roadmap = {
  "id": "dotnet",
  "name": ".NET and C#",
  "icon": "server",
  "role": "Backend developer (.NET)",
  "tagline": "Build web APIs and services with C#, ASP.NET Core and SQL, the way enterprise teams do.",
  "months": "6 to 9",
  "start": "No coding needed",
  "why": ".NET is one of the most hired backend stacks in Indian service companies and enterprises, with steady demand for ASP.NET Core, SQL Server and Azure skills.",
  "stages": [
    {
      "title": "C# and the toolchain",
      "weeks": "3 to 4",
      "goal": "Get fluent in C# and the dotnet CLI.",
      "topics": [
        "Install the .NET SDK and use dotnet new, run and test",
        "Types, nullable references and control flow",
        "Classes, records and interfaces",
        "Collections and generics",
        "Exceptions, debugging and Git"
      ],
      "learn": [
        {
          "id": "karmatix-dotnet",
          "name": "Karmatix .NET Academy",
          "by": "Karmatix",
          "url": "https://karma-tic.github.io/dotnet-academy/",
          "type": "course",
          "cost": "free",
          "lang": "en",
          "why": "Our own free .NET 10 and C# 14 course with 16 tested projects and interview prep.",
          "tip": "Follow the modules in order and push every lab to your GitHub."
        },
        {
          "id": "csharp-docs",
          "name": "C# documentation",
          "by": "Microsoft",
          "url": "https://learn.microsoft.com/en-us/dotnet/csharp/",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "The official C# guide from basics to the newest language features.",
          "tip": "Read the Tour of C#, then look up each feature as you use it."
        },
        {
          "id": "dotnet-yt",
          "name": "dotnet (official channel)",
          "by": "YouTube",
          "url": "https://www.youtube.com/@dotnet",
          "type": "video",
          "cost": "free",
          "lang": "en",
          "why": "Official .NET channel with release talks, .NET Conf and beginner series.",
          "tip": "Watch the beginner series for C# and the .NET Conf keynote each November."
        }
      ],
      "practise": [
        {
          "id": "exercism",
          "name": "Exercism",
          "by": "Exercism",
          "url": "https://exercism.org/",
          "type": "practice",
          "cost": "free",
          "lang": "en",
          "why": "Free coding exercises in 70+ languages with optional human mentoring.",
          "tip": "Use it to pick up a second language fast. Request a mentor review on your solutions."
        },
        {
          "id": "learn-git-branching",
          "name": "Learn Git Branching",
          "by": "Peter Cottle",
          "url": "https://learngitbranching.js.org/",
          "type": "practice",
          "cost": "free",
          "lang": "en",
          "why": "A visual sandbox that makes rebase, merge and cherry-pick finally make sense.",
          "tip": "Finish the Main and Remote levels. You will stop fearing merge conflicts."
        }
      ],
      "build": "Five console apps: a bank account with transactions, a student grade report, an inventory manager, a file word counter and a CLI to-do list.",
      "prove": "A public repo with tests for at least two of them, or the free Foundational C# certification.",
      "hint": null
    },
    {
      "title": "Modern C# and LINQ",
      "weeks": "2 to 3",
      "goal": "Write the C# that real codebases use.",
      "topics": [
        "LINQ",
        "async and await with cancellation",
        "Lambdas and pattern matching",
        "Dependency injection basics",
        "Unit tests with xUnit"
      ],
      "learn": [
        {
          "id": "csharp-docs",
          "name": "C# documentation",
          "by": "Microsoft",
          "url": "https://learn.microsoft.com/en-us/dotnet/csharp/",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "The official C# guide from basics to the newest language features.",
          "tip": "Read the Tour of C#, then look up each feature as you use it."
        },
        {
          "id": "nick-chapsas",
          "name": "Nick Chapsas",
          "by": "YouTube",
          "url": "https://www.youtube.com/@nickchapsas",
          "type": "video",
          "cost": "free",
          "lang": "en",
          "why": "Short, sharp videos on modern C# and .NET features and performance.",
          "tip": "Watch for new language features and benchmark-backed advice."
        }
      ],
      "practise": [
        {
          "id": "exercism",
          "name": "Exercism",
          "by": "Exercism",
          "url": "https://exercism.org/",
          "type": "practice",
          "cost": "free",
          "lang": "en",
          "why": "Free coding exercises in 70+ languages with optional human mentoring.",
          "tip": "Use it to pick up a second language fast. Request a mentor review on your solutions."
        },
        {
          "id": "karmatix-dotnet",
          "name": "Karmatix .NET Academy",
          "by": "Karmatix",
          "url": "https://karma-tic.github.io/dotnet-academy/",
          "type": "course",
          "cost": "free",
          "lang": "en",
          "why": "Our own free .NET 10 and C# 14 course with 16 tested projects and interview prep.",
          "tip": "Follow the modules in order and push every lab to your GitHub."
        }
      ],
      "build": "Refactor your console apps with LINQ and async, and add xUnit tests for the core logic.",
      "prove": "Green tests in a GitHub Actions run.",
      "hint": null
    },
    {
      "title": "SQL and EF Core",
      "weeks": "2 to 3",
      "goal": "Store and query data correctly.",
      "topics": [
        "SQL: joins, grouping and indexes",
        "A local SQL Server or PostgreSQL",
        "EF Core: DbContext, migrations and relationships",
        "Efficient queries: projections and no N+1",
        "Dapper for raw SQL"
      ],
      "learn": [
        {
          "id": "ef-core-docs",
          "name": "Entity Framework Core docs",
          "by": "Microsoft",
          "url": "https://learn.microsoft.com/en-us/ef/core/",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "The official guide to EF Core: modelling, migrations, queries and performance.",
          "tip": "Read Performance and Querying before your first production app."
        },
        {
          "id": "postgres-tutorial",
          "name": "PostgreSQL tutorial",
          "by": "PostgreSQL",
          "url": "https://www.postgresql.org/docs/current/tutorial.html",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "The official introduction to the database most new projects choose.",
          "tip": "Install Postgres locally and do every query yourself."
        }
      ],
      "practise": [
        {
          "id": "sqlbolt",
          "name": "SQLBolt",
          "by": "SQLBolt",
          "url": "https://sqlbolt.com/",
          "type": "practice",
          "cost": "free",
          "lang": "en",
          "why": "Interactive SQL lessons that take an afternoon and stick.",
          "tip": "Do all lessons in one sitting, then move to DataLemur for interview problems."
        },
        {
          "id": "karmatix-dotnet",
          "name": "Karmatix .NET Academy",
          "by": "Karmatix",
          "url": "https://karma-tic.github.io/dotnet-academy/",
          "type": "course",
          "cost": "free",
          "lang": "en",
          "why": "Our own free .NET 10 and C# 14 course with 16 tested projects and interview prep.",
          "tip": "Follow the modules in order and push every lab to your GitHub."
        }
      ],
      "build": "A library database with books, members and loans, managed through EF Core migrations, with reports written in LINQ and in raw SQL.",
      "prove": "A migration history and a README with the schema diagram.",
      "hint": null
    },
    {
      "title": "ASP.NET Core Web APIs",
      "weeks": "3 to 4",
      "goal": "Build secure, documented REST APIs.",
      "topics": [
        "Minimal APIs and controllers",
        "Validation and error handling with ProblemDetails",
        "Middleware, logging and configuration",
        "Auth with JWT",
        "Integration tests and OpenAPI docs"
      ],
      "learn": [
        {
          "id": "aspnet-core-docs",
          "name": "ASP.NET Core docs",
          "by": "Microsoft",
          "url": "https://learn.microsoft.com/en-us/aspnet/core/",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "Official docs for web APIs, minimal APIs, auth, middleware and hosting.",
          "tip": "Build the minimal API tutorial, then read Fundamentals end to end."
        },
        {
          "id": "milan-jovanovic",
          "name": "Milan Jovanovic",
          "by": "YouTube",
          "url": "https://www.youtube.com/@MilanJovanovicTech",
          "type": "video",
          "cost": "free",
          "lang": "en",
          "why": "Clean architecture, EF Core and ASP.NET Core patterns with real code.",
          "tip": "Use his videos when you structure your capstone API."
        }
      ],
      "practise": [
        {
          "id": "karmatix-dotnet",
          "name": "Karmatix .NET Academy",
          "by": "Karmatix",
          "url": "https://karma-tic.github.io/dotnet-academy/",
          "type": "course",
          "cost": "free",
          "lang": "en",
          "why": "Our own free .NET 10 and C# 14 course with 16 tested projects and interview prep.",
          "tip": "Follow the modules in order and push every lab to your GitHub."
        },
        {
          "id": "bruno",
          "name": "Bruno",
          "by": "Bruno",
          "url": "https://www.usebruno.com/",
          "type": "tool",
          "cost": "free",
          "lang": "en",
          "why": "An open source API client that saves requests as files in your repo.",
          "tip": "Commit your API collection next to the code so reviewers can try your API."
        }
      ],
      "build": "A student or e-commerce API with auth, validation, pagination, OpenAPI docs and integration tests.",
      "prove": "A live API (Azure App Service free tier or Render) with an OpenAPI page.",
      "hint": null
    },
    {
      "title": "Architecture and production",
      "weeks": "3 to 4",
      "goal": "Structure, ship and run it like a team would.",
      "topics": [
        "Clean architecture, and when not to use it",
        "Caching with Redis",
        "Background jobs with hosted services",
        "Docker and GitHub Actions CI",
        "Deploying to Azure with health checks"
      ],
      "learn": [
        {
          "id": "milan-jovanovic",
          "name": "Milan Jovanovic",
          "by": "YouTube",
          "url": "https://www.youtube.com/@MilanJovanovicTech",
          "type": "video",
          "cost": "free",
          "lang": "en",
          "why": "Clean architecture, EF Core and ASP.NET Core patterns with real code.",
          "tip": "Use his videos when you structure your capstone API."
        },
        {
          "id": "docker",
          "name": "Docker: Get started",
          "by": "Docker",
          "url": "https://docs.docker.com/get-started/",
          "type": "tool",
          "cost": "free",
          "lang": "en",
          "why": "Containers are expected in almost every backend and DevOps job now.",
          "tip": "Add a Dockerfile and a compose file to every backend project you build."
        },
        {
          "id": "github-actions",
          "name": "GitHub Actions docs",
          "by": "GitHub",
          "url": "https://docs.github.com/en/actions",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "Free CI/CD built into GitHub. Every project should have a pipeline.",
          "tip": "Add tests and a deploy workflow to one project. Show the green badge in your README."
        }
      ],
      "practise": [
        {
          "id": "karmatix-dotnet",
          "name": "Karmatix .NET Academy",
          "by": "Karmatix",
          "url": "https://karma-tic.github.io/dotnet-academy/",
          "type": "course",
          "cost": "free",
          "lang": "en",
          "why": "Our own free .NET 10 and C# 14 course with 16 tested projects and interview prep.",
          "tip": "Follow the modules in order and push every lab to your GitHub."
        }
      ],
      "build": "Take the Karmatix production API capstone and extend it with caching, a background job and a deploy pipeline.",
      "prove": "AZ-204 if your target companies use Azure, plus a live capstone.",
      "hint": null
    },
    {
      "title": "Interview and job ready",
      "weeks": "2 to 3",
      "goal": "Prepare for .NET interview rounds.",
      "topics": [
        "CLR, garbage collection, value vs reference types",
        "async internals and deadlocks",
        "DI lifetimes: singleton, scoped, transient",
        "REST design and status codes",
        "SOLID with examples from your own code"
      ],
      "learn": [
        {
          "id": "tech-interview-handbook",
          "name": "Tech Interview Handbook",
          "by": "Yangshun Tay",
          "url": "https://www.techinterviewhandbook.org/",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "Free guide to the full interview process: resume, coding, behavioural and negotiation.",
          "tip": "Read the resume and behavioural sections. Most candidates skip them."
        }
      ],
      "practise": [
        {
          "id": "karmatix-dotnet",
          "name": "Karmatix .NET Academy",
          "by": "Karmatix",
          "url": "https://karma-tic.github.io/dotnet-academy/",
          "type": "course",
          "cost": "free",
          "lang": "en",
          "why": "Our own free .NET 10 and C# 14 course with 16 tested projects and interview prep.",
          "tip": "Follow the modules in order and push every lab to your GitHub."
        },
        {
          "id": "leetcode",
          "name": "LeetCode",
          "by": "LeetCode",
          "url": "https://leetcode.com/",
          "type": "practice",
          "cost": "freemium",
          "lang": "en",
          "why": "The standard platform for coding interview practice.",
          "tip": "Do problems by pattern, not at random. Use the NeetCode list to stay focused."
        }
      ],
      "build": "Answer the Karmatix .NET interview questions out loud and record yourself once.",
      "prove": "Two deployed APIs, tests in CI and confident answers on the common topics.",
      "hint": null
    }
  ],
  "libs": [
    {
      "name": "ASP.NET Core",
      "use": "Web APIs and web apps"
    },
    {
      "name": "Entity Framework Core",
      "use": "ORM and migrations"
    },
    {
      "name": "Dapper",
      "use": "Fast raw SQL"
    },
    {
      "name": "xUnit with FluentAssertions or Shouldly",
      "use": "Testing"
    },
    {
      "name": "Serilog",
      "use": "Structured logging"
    },
    {
      "name": "FluentValidation",
      "use": "Request validation"
    },
    {
      "name": "MediatR (optional)",
      "use": "In-process messaging for larger apps"
    },
    {
      "name": "Polly",
      "use": "Retries and resilience"
    }
  ],
  "tools": [
    {
      "id": "vscode",
      "name": "Visual Studio Code",
      "by": "Microsoft",
      "url": "https://code.visualstudio.com/",
      "type": "tool",
      "cost": "free",
      "lang": "en",
      "why": "The default editor. Free, fast and has an extension for everything.",
      "tip": "Learn ten shortcuts (multi-cursor, go to definition, rename symbol). It saves hours every week."
    },
    {
      "id": "docker",
      "name": "Docker: Get started",
      "by": "Docker",
      "url": "https://docs.docker.com/get-started/",
      "type": "tool",
      "cost": "free",
      "lang": "en",
      "why": "Containers are expected in almost every backend and DevOps job now.",
      "tip": "Add a Dockerfile and a compose file to every backend project you build."
    },
    {
      "id": "bruno",
      "name": "Bruno",
      "by": "Bruno",
      "url": "https://www.usebruno.com/",
      "type": "tool",
      "cost": "free",
      "lang": "en",
      "why": "An open source API client that saves requests as files in your repo.",
      "tip": "Commit your API collection next to the code so reviewers can try your API."
    },
    {
      "id": "github-actions",
      "name": "GitHub Actions docs",
      "by": "GitHub",
      "url": "https://docs.github.com/en/actions",
      "type": "docs",
      "cost": "free",
      "lang": "en",
      "why": "Free CI/CD built into GitHub. Every project should have a pipeline.",
      "tip": "Add tests and a deploy workflow to one project. Show the green badge in your README."
    }
  ],
  "channels": [
    {
      "id": "nick-chapsas",
      "name": "Nick Chapsas",
      "by": "YouTube",
      "url": "https://www.youtube.com/@nickchapsas",
      "type": "video",
      "cost": "free",
      "lang": "en",
      "why": "Short, sharp videos on modern C# and .NET features and performance.",
      "tip": "Watch for new language features and benchmark-backed advice."
    },
    {
      "id": "milan-jovanovic",
      "name": "Milan Jovanovic",
      "by": "YouTube",
      "url": "https://www.youtube.com/@MilanJovanovicTech",
      "type": "video",
      "cost": "free",
      "lang": "en",
      "why": "Clean architecture, EF Core and ASP.NET Core patterns with real code.",
      "tip": "Use his videos when you structure your capstone API."
    },
    {
      "id": "dotnet-yt",
      "name": "dotnet (official channel)",
      "by": "YouTube",
      "url": "https://www.youtube.com/@dotnet",
      "type": "video",
      "cost": "free",
      "lang": "en",
      "why": "Official .NET channel with release talks, .NET Conf and beginner series.",
      "tip": "Watch the beginner series for C# and the .NET Conf keynote each November."
    }
  ],
  "communities": [
    {
      "id": "r-developersindia",
      "name": "r/developersIndia",
      "by": "Reddit",
      "url": "https://www.reddit.com/r/developersIndia/",
      "type": "community",
      "cost": "free",
      "lang": "en",
      "why": "India's largest developer forum: jobs, salaries, interviews and advice.",
      "tip": "Search before you ask. The salary and interview threads are gold."
    },
    {
      "id": "stack-overflow",
      "name": "Stack Overflow",
      "by": "Stack Overflow",
      "url": "https://stackoverflow.com/",
      "type": "community",
      "cost": "free",
      "lang": "en",
      "why": "Still the biggest archive of answered programming questions.",
      "tip": "Answering questions in your stack is a great way to learn it deeply."
    },
    {
      "id": "gdg",
      "name": "Google Developer Groups",
      "by": "Google",
      "url": "https://gdg.community.dev/",
      "type": "community",
      "cost": "free",
      "lang": "en",
      "why": "Free local meetups and DevFests in most Indian cities.",
      "tip": "Go to one event a month and talk to two people. Volunteer to get to know organisers."
    }
  ],
  "certs": [
    {
      "id": "fcc-csharp",
      "name": "Foundational C# with Microsoft",
      "fee": "Free",
      "verdict": "good",
      "url": "https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/"
    },
    {
      "id": "az-204",
      "name": "Microsoft Azure Developer Associate",
      "fee": "$165",
      "verdict": "good",
      "url": "https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/"
    },
    {
      "id": "az-900",
      "name": "Microsoft Azure Fundamentals",
      "fee": "$99",
      "verdict": "good",
      "url": "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"
    }
  ],
  "interview": [
    "Value vs reference types, boxing",
    "IEnumerable vs IQueryable",
    "async/await and ConfigureAwait",
    "DI lifetimes and captive dependencies",
    "Middleware pipeline order",
    "EF Core tracking and N+1 queries",
    "JWT authentication flow",
    "Records vs classes"
  ],
  "related": "backend",
  "course": "https://karma-tic.github.io/dotnet-academy/",
  "note": null,
  "source": "https://learn.karmatix.in/roadmaps/dotnet/"
} as const;
