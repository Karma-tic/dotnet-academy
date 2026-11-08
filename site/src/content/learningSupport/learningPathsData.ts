export interface PathMilestone {
  week: number;
  title: string;
  moduleIds: number[];
  deliverable: string;
  recommendedDurationHours: number;
}

export interface LearningPath {
  id: string;
  title: string;
  roleTarget: string;
  tagline: string;
  estimatedWeeks: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  colorBadge: string;
  description: string;
  targetModules: number[];
  milestones: PathMilestone[];
  capstoneProject: {
    title: string;
    description: string;
    repoDirectory: string;
  };
  jobRoles: string[];
}

export const learningPathsData: LearningPath[] = [
  {
    id: 'web-api-developer',
    title: 'Web API & Backend Developer Track',
    roleTarget: 'Backend .NET Engineer / REST API Specialist',
    tagline: 'Master production ASP.NET Core, EF Core, Clean Architecture, and high-throughput REST APIs.',
    estimatedWeeks: 8,
    difficulty: 'Beginner',
    colorBadge: 'violet',
    description: 'The premier enterprise pathway. Takes you from fundamental C# syntax through database modeling with EF Core, dependency injection, repository & CQRS patterns, security, validation, and production API design.',
    targetModules: [0, 1, 2, 3, 4, 5, 8],
    milestones: [
      {
        week: 1,
        title: 'Core Runtime & C# 14 Foundations',
        moduleIds: [0, 1],
        deliverable: 'CLI Task Manager with record types, pattern matching, and nullable reference types.',
        recommendedDurationHours: 12
      },
      {
        week: 2,
        title: 'Object-Oriented Design & LINQ Proficiency',
        moduleIds: [2, 3],
        deliverable: 'In-memory financial reporting calculator powered by deferred LINQ queries and custom extension methods.',
        recommendedDurationHours: 14
      },
      {
        week: 4,
        title: 'Entity Framework Core & Database Architecture',
        moduleIds: [4],
        deliverable: 'Relational SQLite / SQL Server store with Code-First migrations, AsNoTracking optimization, and foreign keys.',
        recommendedDurationHours: 16
      },
      {
        week: 6,
        title: 'ASP.NET Core Web APIs & Security',
        moduleIds: [5],
        deliverable: 'Production REST API with JWT bearer tokens, rate limiting, FluentValidation, and Swagger / OpenAPI schemas.',
        recommendedDurationHours: 16
      },
      {
        week: 8,
        title: 'Clean Architecture & Capstone Deployment',
        moduleIds: [8],
        deliverable: 'Capstone 2: Student Management System built on Clean Architecture (Domain, Application, Infrastructure, API).',
        recommendedDurationHours: 18
      }
    ],
    capstoneProject: {
      title: 'Capstone 2: Student Management Web API',
      description: 'Clean Architecture enterprise REST API with SQLite/Postgres persistence, JWT auth, and xUnit integration test suite.',
      repoDirectory: 'samples/Capstones/Capstone2_StudentApi'
    },
    jobRoles: [
      'Junior .NET Developer',
      'Backend C# Engineer',
      'REST API Developer',
      'Enterprise Software Associate'
    ]
  },
  {
    id: 'fullstack-blazor-developer',
    title: 'Full-Stack .NET Developer (Blazor & Razor)',
    roleTarget: 'Full-Stack .NET / Blazor WebAssembly Engineer',
    tagline: 'Build end-to-end web applications with C# on both client and server—zero JavaScript required.',
    estimatedWeeks: 10,
    difficulty: 'Intermediate',
    colorBadge: 'emerald',
    description: 'Designed for developers who want to ship modern reactive single-page applications (SPA) and server-rendered web portals entirely using C#, ASP.NET Core, and Microsoft Blazor.',
    targetModules: [0, 1, 2, 3, 4, 5, 6, 8],
    milestones: [
      {
        week: 2,
        title: 'C# 14 & Async Programming Foundations',
        moduleIds: [0, 1, 2],
        deliverable: 'Console application demonstrating Async/Await and cancellation token propagation.',
        recommendedDurationHours: 15
      },
      {
        week: 4,
        title: 'Relational Data Modeling with EF Core',
        moduleIds: [3, 4],
        deliverable: 'E-commerce schema with product catalogs, shopping carts, and migrations.',
        recommendedDurationHours: 16
      },
      {
        week: 7,
        title: 'Backend API & Front-End UI Architecture',
        moduleIds: [5, 6],
        deliverable: 'Interactive Blazor WebAssembly or Razor Pages frontend with client-side form validation and state management.',
        recommendedDurationHours: 20
      },
      {
        week: 10,
        title: 'Full-Stack Integration, SignalR & Polishing',
        moduleIds: [8],
        deliverable: 'Full-stack application featuring real-time data notifications via SignalR hubs and responsive UI.',
        recommendedDurationHours: 22
      }
    ],
    capstoneProject: {
      title: 'Interactive Web Portal with Real-Time State',
      description: 'End-to-end full stack web application leveraging ASP.NET Core Minimal APIs backend and Blazor component front-end.',
      repoDirectory: 'samples/Capstones/Capstone2_StudentApi'
    },
    jobRoles: [
      'Full-Stack .NET Developer',
      'Blazor Web Developer',
      'Enterprise Application Specialist',
      'C# Solutions Engineer'
    ]
  },
  {
    id: 'cloud-devops-developer',
    title: 'Cloud & DevOps-Leaning .NET Architect',
    roleTarget: 'Cloud Backend Engineer / .NET DevOps Practitioner',
    tagline: 'Containerize with Docker, orchestrate CI/CD pipelines, and deploy resilient microservices to Azure.',
    estimatedWeeks: 10,
    difficulty: 'Advanced',
    colorBadge: 'amber',
    description: 'Focuses on taking enterprise .NET services into production: multi-stage Docker builds, health checks, OpenTelemetry logging and metrics, GitHub Actions automation, and deployment to free cloud tiers.',
    targetModules: [4, 5, 7, 8, 9, 10, 11],
    milestones: [
      {
        week: 2,
        title: 'Enterprise APIs, Middleware & Validation',
        moduleIds: [5, 8],
        deliverable: 'Hardened ASP.NET Core service with rate-limiting, CORS, and centralized exception handling.',
        recommendedDurationHours: 14
      },
      {
        week: 5,
        title: 'Automated Testing & Multi-Stage Docker Builds',
        moduleIds: [7, 9],
        deliverable: 'Optimized production Dockerfile based on chiseled distroless images, verified by xUnit tests in Docker.',
        recommendedDurationHours: 18
      },
      {
        week: 8,
        title: 'CI/CD Automation & GitHub Actions Gateways',
        moduleIds: [9, 10],
        deliverable: 'Automated GitHub Actions workflow building .NET 10 solution, running tests, and publishing container images.',
        recommendedDurationHours: 16
      },
      {
        week: 10,
        title: 'Cloud Deployment, Monitoring & Capstone 3',
        moduleIds: [10, 11],
        deliverable: 'Capstone 3: Microservice deployed to Azure Container Apps or Render with health checks and structured logs.',
        recommendedDurationHours: 20
      }
    ],
    capstoneProject: {
      title: 'Capstone 3: Containerized Microservice Pipeline',
      description: 'Dockerized microservice with health checks, structured Serilog telemetry, and automated GitHub Actions CI deployment.',
      repoDirectory: 'samples/Capstones/Capstone3_ContainerizedService'
    },
    jobRoles: [
      'Cloud .NET Developer',
      '.NET DevOps Engineer',
      'Platform Engineer',
      'Azure Cloud Specialist'
    ]
  },
  {
    id: 'interview-fast-track',
    title: 'Interview Fast Track (4-Week Intensive)',
    roleTarget: 'Exam & Interview Ready .NET Candidate',
    tagline: 'High-yield technical interview prep: language edge-cases, memory allocation, and 50+ coding problems.',
    estimatedWeeks: 4,
    difficulty: 'Intermediate',
    colorBadge: 'purple',
    description: 'Designed for engineers with upcoming company exams, campus placements, or technical interviews. Focuses exclusively on high-frequency questions: value vs reference types, boxing/unboxing, garbage collection, async traps, and system design.',
    targetModules: [1, 2, 3, 4, 5, 8],
    milestones: [
      {
        week: 1,
        title: 'C# Internals, Memory & Type System',
        moduleIds: [1, 2],
        deliverable: 'Master value vs ref types, ref struct, ReadOnlySpan<char>, boxing overhead, and garbage collection generations.',
        recommendedDurationHours: 15
      },
      {
        week: 2,
        title: 'LINQ Query Optimization & EF Core Traps',
        moduleIds: [3, 4],
        deliverable: 'Conquer N+1 queries, AsNoTracking, split queries, deferred execution, and IEnumerable vs IQueryable.',
        recommendedDurationHours: 15
      },
      {
        week: 3,
        title: 'Async/Await, Concurrency & ASP.NET Core Lifecycle',
        moduleIds: [5, 8],
        deliverable: 'Explain DI lifecycles (Transient vs Scoped vs Singleton), Deadlocks, Task.WhenAll vs Parallel.ForEach.',
        recommendedDurationHours: 18
      },
      {
        week: 4,
        title: 'Mock Technical Interview & 50+ Coding Problems',
        moduleIds: [8],
        deliverable: 'Pass all 3 simulated technical mock interviews with >=85% score and solve 20 daily practice challenges.',
        recommendedDurationHours: 20
      }
    ],
    capstoneProject: {
      title: 'Interview Mastery & Coding Portfolio',
      description: 'Verified completion of 200+ technical Q&As, 3 timed mock interview examinations, and Clean Architecture capstones.',
      repoDirectory: 'site/src/content/career'
    },
    jobRoles: [
      '.NET Software Engineer',
      'Associate Consultant',
      'Systems Analyst',
      'C# Technical Specialist'
    ]
  }
];

