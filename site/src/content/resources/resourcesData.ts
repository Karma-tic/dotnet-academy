export interface LearningResource {
  id: string;
  name: string;
  category: 'Official' | 'Video & Creators' | 'Interactive Practice' | 'Books & Blogs' | 'Developer Tools' | 'Communities' | 'Podcasts & Newsletters';
  cost: 'Free' | 'Free to Audit' | 'Freemium' | 'Commercial / Paid';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  url: string;
  whyItsGood: string;
  lastVerified: string;
  licenseNote?: string;
}

export const resourcesData: LearningResource[] = [
  // Official
  {
    id: 'res-01',
    name: 'Microsoft Learn: .NET Documentation',
    category: 'Official',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://learn.microsoft.com/dotnet',
    whyItsGood: 'The canonical reference for language specs, BCL APIs, migration guides, and runtime architecture.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-02',
    name: 'Tour of C# & C# Language Specification',
    category: 'Official',
    cost: 'Free',
    level: 'Beginner',
    url: 'https://learn.microsoft.com/dotnet/csharp/tour-of-csharp/',
    whyItsGood: 'Authoritative, step-by-step introduction to language keywords, types, and object model.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-03',
    name: '.NET API Browser',
    category: 'Official',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://learn.microsoft.com/dotnet/api/',
    whyItsGood: 'Fast, searchable signature reference for every class, method, struct, and assembly across all .NET versions.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-04',
    name: 'ASP.NET Core Official Documentation',
    category: 'Official',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://learn.microsoft.com/aspnet/core/',
    whyItsGood: 'In-depth documentation for middleware, Minimal APIs, Blazor render modes, security, and Kestrel performance.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-05',
    name: 'Entity Framework Core Official Docs',
    category: 'Official',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://learn.microsoft.com/ef/core/',
    whyItsGood: 'Comprehensive guide to DbContext, migrations, relationships, performance modeling, and compiled queries.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-06',
    name: 'Microsoft Learn: Foundational C# with freeCodeCamp',
    category: 'Official',
    cost: 'Free',
    level: 'Beginner',
    url: 'https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/',
    whyItsGood: 'Free certified pathway developed in partnership between Microsoft Learn and freeCodeCamp.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-07',
    name: 'eShop Reference Application (dotnet/eShop)',
    category: 'Official',
    cost: 'Free',
    level: 'Advanced',
    url: 'https://github.com/dotnet/eShop',
    whyItsGood: 'Microsoft flagship enterprise reference architecture demonstrating .NET Aspire, Docker, microservices, and Clean Architecture.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-08',
    name: 'dotnet/samples GitHub Repository',
    category: 'Official',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://github.com/dotnet/samples',
    whyItsGood: 'Official Microsoft repository containing hundreds of runnable console, web, and cloud code samples.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-09',
    name: '.NET Conf Recordings Archive',
    category: 'Official',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://www.dotnetconf.net/',
    whyItsGood: 'Deep technical presentations by the actual engineering team building C#, runtime, and cloud tools.',
    lastVerified: '2026-11-06'
  },

  // Video & Creators
  {
    id: 'res-10',
    name: 'The .NET Channel (Official Microsoft YouTube)',
    category: 'Video & Creators',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://www.youtube.com/@dotnet',
    whyItsGood: 'Weekly community standups, deep architectural deep dives, and feature announcements straight from the product teams.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-11',
    name: 'Milan Jovanović YouTube & Newsletter',
    category: 'Video & Creators',
    cost: 'Free',
    level: 'Intermediate',
    url: 'https://www.youtube.com/@MilanJovanovicTech',
    whyItsGood: 'World-class, bite-sized tutorials on Clean Architecture, EF Core performance, CQRS, and Domain-Driven Design.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-12',
    name: 'Nick Chapsas (Keep Call Open / Dometrain)',
    category: 'Video & Creators',
    cost: 'Freemium',
    level: 'Intermediate',
    url: 'https://www.youtube.com/@nickchapsas',
    whyItsGood: 'Pragmatic, opinionated analysis of new .NET features, performance benchmarks, and common engineering traps.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-13',
    name: 'IAmTimCorey (Tim Corey)',
    category: 'Video & Creators',
    cost: 'Freemium',
    level: 'Beginner',
    url: 'https://www.youtube.com/@IAmTimCorey',
    whyItsGood: 'Patient, highly pedagogical explanations of C# fundamentals, dependency injection, and project structuring.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-14',
    name: 'Gui Ferreira',
    category: 'Video & Creators',
    cost: 'Free',
    level: 'Intermediate',
    url: 'https://www.youtube.com/@GuiFerreiraCode',
    whyItsGood: 'Fast-paced, high-density breakdowns of C# performance tips and modern clean coding practices.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-15',
    name: 'Zoran Horvat',
    category: 'Video & Creators',
    cost: 'Free',
    level: 'Advanced',
    url: 'https://www.youtube.com/@ZoranHorvat',
    whyItsGood: 'Masterclass in object-oriented design, domain modeling, immutability, and refactoring.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-16',
    name: 'Amichai Mantinband',
    category: 'Video & Creators',
    cost: 'Free',
    level: 'Intermediate',
    url: 'https://www.youtube.com/@amantinband',
    whyItsGood: 'Clear, elegant architectural walkthroughs focusing on Clean Architecture and ErrorOr / Result patterns.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-17',
    name: 'Kudvenkat',
    category: 'Video & Creators',
    cost: 'Free',
    level: 'Beginner',
    url: 'https://www.youtube.com/@kudvenkat',
    whyItsGood: 'Legendary foundational tutorials explaining fundamental C#, SQL, and ASP.NET step-by-step for absolute beginners.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-18',
    name: 'Les Jackson',
    category: 'Video & Creators',
    cost: 'Free',
    level: 'Intermediate',
    url: 'https://www.youtube.com/@LesJackson',
    whyItsGood: 'Hands-on, multi-hour projects building complete microservices and Dockerized APIs from scratch.',
    lastVerified: '2026-11-06'
  },

  // Interactive Practice
  {
    id: 'res-19',
    name: 'Exercism C# Track',
    category: 'Interactive Practice',
    cost: 'Free',
    level: 'Beginner',
    url: 'https://exercism.org/tracks/csharp',
    whyItsGood: 'Over 140 free coding exercises with automated test suites and optional human volunteer mentor feedback.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-20',
    name: '.NET Fiddle & SharpLab.io',
    category: 'Interactive Practice',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://dotnetfiddle.net',
    whyItsGood: 'Instant in-browser C# code execution for sharing snippets. SharpLab inspects lowered C#, IL, and assembly output.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-21',
    name: 'LeetCode (C# Language Track)',
    category: 'Interactive Practice',
    cost: 'Freemium',
    level: 'Intermediate',
    url: 'https://leetcode.com/problemset/all/',
    whyItsGood: 'The industry benchmark for practicing data structures, algorithms, and technical interview coding rounds.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-22',
    name: 'HackerRank & Codewars C#',
    category: 'Interactive Practice',
    cost: 'Free',
    level: 'Beginner',
    url: 'https://www.hackerrank.com/domains/csharp',
    whyItsGood: 'Skill verification challenges and gamified kata to build C# syntax muscle memory.',
    lastVerified: '2026-11-06'
  },

  // Books & Blogs
  {
    id: 'res-23',
    name: 'Free Microsoft Architecture E-Books',
    category: 'Books & Blogs',
    cost: 'Free',
    level: 'Intermediate',
    url: 'https://dotnet.microsoft.com/learn/dotnet/architecture-guides',
    whyItsGood: 'Free official downloadable PDFs on .NET Microservices, Clean Architecture, and Containerized Lifecycle.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-24',
    name: "Andrew Lock's .NET Escapades",
    category: 'Books & Blogs',
    cost: 'Free',
    level: 'Advanced',
    url: 'https://andrewlock.net/',
    whyItsGood: 'The gold-standard blog exploring ASP.NET Core internals, source generators, and configuration plumbing.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-25',
    name: 'Code Maze',
    category: 'Books & Blogs',
    cost: 'Freemium',
    level: 'Intermediate',
    url: 'https://code-maze.com/',
    whyItsGood: 'Comprehensive, practical, step-by-step written articles covering every aspect of ASP.NET Core and EF Core.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-26',
    name: 'Steve Smith (Ardalis) Blog & Clean Architecture Template',
    category: 'Books & Blogs',
    cost: 'Free',
    level: 'Intermediate',
    url: 'https://ardalis.com/',
    whyItsGood: 'Industry-leading best practices on SOLID, design patterns, testing, and Clean Architecture scaffolding.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-27',
    name: 'Awesome .NET (GitHub Curated List)',
    category: 'Books & Blogs',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://github.com/quozd/awesome-dotnet',
    whyItsGood: 'Community-maintained directory of the best open-source libraries, tools, and frameworks in the .NET ecosystem.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-28',
    name: 'Pro C# and .NET (Andrew Troelsen) & C# in Depth (Jon Skeet)',
    category: 'Books & Blogs',
    cost: 'Commercial / Paid',
    level: 'All Levels',
    url: 'https://www.manning.com/books/c-sharp-in-depth-fourth-edition',
    whyItsGood: 'Comprehensive paid books for deep theoretical mastery of C# language evolution.',
    lastVerified: '2026-11-06',
    licenseNote: 'Paid book; optional reading.'
  },

  // Developer Tools
  {
    id: 'res-29',
    name: 'Visual Studio Community Edition',
    category: 'Developer Tools',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://visualstudio.microsoft.com/vs/community/',
    whyItsGood: 'Fully-featured enterprise IDE with world-class debugging, profiling, and testing diagnostics.',
    lastVerified: '2026-11-06',
    licenseNote: 'Free for individuals, open-source projects, and small teams under 5 users.'
  },
  {
    id: 'res-30',
    name: 'VS Code with C# Dev Kit',
    category: 'Developer Tools',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://code.visualstudio.com/',
    whyItsGood: 'Fast, cross-platform lightweight editor with solution explorer, test discovery, and Roslyn language server.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-31',
    name: 'JetBrains Rider',
    category: 'Developer Tools',
    cost: 'Freemium',
    level: 'Intermediate',
    url: 'https://www.jetbrains.com/rider/',
    whyItsGood: 'Exceptional cross-platform .NET IDE powered by ReSharper. Now free for non-commercial personal development.',
    lastVerified: '2026-11-06',
    licenseNote: 'Free for non-commercial and learning use under JetBrains community license.'
  },
  {
    id: 'res-32',
    name: 'DBeaver Community & SQLiteStudio',
    category: 'Developer Tools',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://dbeaver.io/',
    whyItsGood: 'Universal open-source database GUI supporting SQLite, SQL Server, PostgreSQL, and MySQL.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-33',
    name: 'Bruno (Open Source API Client)',
    category: 'Developer Tools',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://www.usebruno.com/',
    whyItsGood: 'Lightweight, offline, git-friendly open-source API test client that saves requests as plaintext in your repo.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-34',
    name: 'ILSpy / dotPeek (Open Source Decompiler)',
    category: 'Developer Tools',
    cost: 'Free',
    level: 'Intermediate',
    url: 'https://github.com/icsharpcode/ILSpy',
    whyItsGood: 'Decompiles .NET assemblies back to readable C# to inspect BCL internals and NuGet package code.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-35',
    name: 'BenchmarkDotNet',
    category: 'Developer Tools',
    cost: 'Free',
    level: 'Advanced',
    url: 'https://benchmarkdotnet.org/',
    whyItsGood: 'The industry-standard benchmarking library used by the .NET runtime team to measure CPU cycles and allocations.',
    lastVerified: '2026-11-06'
  },

  // Communities, Podcasts & Newsletters
  {
    id: 'res-36',
    name: 'Reddit r/dotnet & r/csharp',
    category: 'Communities',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://www.reddit.com/r/dotnet/',
    whyItsGood: 'Active global communities discussing architecture questions, library releases, and industry trends.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-37',
    name: '.NET Rocks! Podcast',
    category: 'Podcasts & Newsletters',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://www.dotnetrocks.com/',
    whyItsGood: 'The longest-running developer audio podcast, interviewing key engineers and architects every week.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-38',
    name: 'The Hanselminutes Podcast by Scott Hanselman',
    category: 'Podcasts & Newsletters',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://hanselminutes.com/',
    whyItsGood: 'Thoughtful conversations with technologists across software engineering, open source, and inclusivity.',
    lastVerified: '2026-11-06'
  },
  {
    id: 'res-39',
    name: '.NET Weekly Newsletter',
    category: 'Podcasts & Newsletters',
    cost: 'Free',
    level: 'All Levels',
    url: 'https://www.dotnetweekly.com/',
    whyItsGood: 'Weekly curated roundup of the best technical articles, blogs, and tutorials in the .NET ecosystem.',
    lastVerified: '2026-11-06'
  }
];
