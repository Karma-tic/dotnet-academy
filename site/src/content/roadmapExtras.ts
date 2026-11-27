// What this site adds to each .NET roadmap stage: tested projects, practice and optional notes.
// Links are hash routes inside the academy (for example "projects" becomes #/projects).
import type { StageExtra } from '../components/RoadmapView';

export const stageExtras: StageExtra[] = [
  {
    practice: [
      { to: 'projects#capstone-1', title: 'Capstone 1: bank and inventory console app', text: 'A tested console app using classes, validation, collections and logging. Read it, run it, then rebuild it.' },
      { to: 'practice', title: 'Daily practice', text: 'Short C# problems with a streak to keep you coding every day.' },
    ],
    notes: [
      { to: 'lesson/sdk-tools-installation', title: 'Install the SDK and tools' },
      { to: 'lesson/variables-types-and-nullability', title: 'C# fundamentals' },
      { to: 'lesson/classes-objects-and-encapsulation', title: 'Object-oriented C#' },
    ],
  },
  {
    practice: [
      { to: 'projects#async-and-linq-lab', title: 'Async and LINQ lab', text: 'Tested exercises on LINQ queries, async and await, and cancellation.' },
      { to: 'cheatsheets', title: 'C# and LINQ cheat sheets', text: 'Quick references to keep open while you code.' },
    ],
    notes: [
      { to: 'lesson/linq-masterclass', title: 'LINQ' },
      { to: 'lesson/async-await-and-concurrency', title: 'Async and concurrency' },
    ],
  },
  {
    practice: [
      { to: 'projects#ef-core-and-dapper-lab', title: 'EF Core and Dapper lab', text: 'The same queries written with EF Core and with Dapper, with tests.' },
      { to: 'projects#capstone-2', title: 'Capstone 2: student management API', text: 'A REST API on EF Core and SQLite with DTOs and validation.' },
    ],
    notes: [
      { to: 'lesson/sql-and-adonet-fundamentals', title: 'SQL and ADO.NET' },
      { to: 'lesson/entity-framework-core-mastery', title: 'Entity Framework Core' },
    ],
  },
  {
    practice: [
      { to: 'projects#minimal-api-demo', title: 'Minimal API demo', text: 'Routing, validation and typed results in a small tested API.' },
      { to: 'projects#security-and-jwt-demo', title: 'Security and JWT demo', text: 'JWT authentication and authorization policies, working end to end.' },
      { to: 'projects#capstone-4', title: 'Capstone 4: e-commerce API', text: 'Catalogue, cart, pricing and checkout across multiple endpoints.' },
    ],
    notes: [
      { to: 'lesson/aspnet-request-pipeline-and-middleware', title: 'ASP.NET Core pipeline' },
      { to: 'lesson/authentication-authorization-and-jwt', title: 'Auth and JWT' },
    ],
  },
  {
    practice: [
      { to: 'projects#capstone-7', title: 'Capstone 7: production API', text: 'A Dockerised, production-style API ready for Azure Container Apps.' },
      { to: 'projects#capstone-5', title: 'Capstone 5: real-time chat', text: 'SignalR hubs, groups and fallbacks.' },
      { to: 'free-tiers', title: 'Free cloud tiers', text: 'Where to deploy your API for free while you learn.' },
    ],
    notes: [{ to: 'lesson/clean-architecture-and-ddd', title: 'Clean architecture' }],
  },
  {
    practice: [
      { to: 'exam-prep', title: 'Interview prep hub', text: 'Interview questions with answers, mock tests and company-style problems.' },
      { to: 'cheatsheets', title: 'Cheat sheets', text: 'Last-day revision for C#, LINQ, EF Core and ASP.NET Core.' },
      { to: 'certifications', title: 'Certifications guide', text: 'Which Microsoft certifications are worth it for .NET developers.' },
    ],
    notes: [],
  },
];
