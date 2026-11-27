import { ArrowUpRight, FolderGit2, CheckCircle2, Terminal } from 'lucide-react';

const REPO = 'https://github.com/Karma-tic/dotnet-academy/tree/main/samples';

type Project = { id: string; title: string; path: string; stage: number; text: string; skills: string[] };

const labs: Project[] = [
  { id: 'hello-world', title: 'Hello World', path: 'Module00_StartHere/HelloWorld', stage: 1, text: 'Your first .NET console app and the dotnet CLI workflow.', skills: ['dotnet new', 'dotnet run', 'Project files'] },
  { id: 'fundamentals-lab', title: 'Fundamentals lab', path: 'Module01_Fundamentals/FundamentalsLab', stage: 1, text: 'Types, nullability, control flow and collections with tests.', skills: ['Nullable types', 'Pattern matching', 'Collections'] },
  { id: 'design-patterns-lab', title: 'Design patterns lab', path: 'Module02_OOP/DesignPatternsLab', stage: 1, text: 'Classes, interfaces and common patterns in plain C#.', skills: ['Interfaces', 'Polymorphism', 'SOLID'] },
  { id: 'async-and-linq-lab', title: 'Async and LINQ lab', path: 'Module03_Intermediate/AsyncAndLinqLab', stage: 2, text: 'LINQ queries, async and await, and cancellation, all tested.', skills: ['LINQ', 'async/await', 'CancellationToken'] },
  { id: 'ef-core-and-dapper-lab', title: 'EF Core and Dapper lab', path: 'Module04_Data/EfCoreAndDapperLab', stage: 3, text: 'The same data access written with EF Core and Dapper.', skills: ['DbContext', 'Migrations', 'Dapper'] },
  { id: 'minimal-api-demo', title: 'Minimal API demo', path: 'Module05_AspNetCore/MinimalApiDemo', stage: 4, text: 'Routing, validation and typed results in a small API.', skills: ['Minimal APIs', 'Validation', 'OpenAPI'] },
  { id: 'security-and-jwt-demo', title: 'Security and JWT demo', path: 'Module06_Security/SecurityAndJwtDemo', stage: 4, text: 'JWT authentication and authorization policies end to end.', skills: ['JWT', 'Policies', 'Claims'] },
  { id: 'clean-architecture-core', title: 'Clean architecture core', path: 'Module07_Architecture/CleanArchitectureCore', stage: 5, text: 'Domain, application and infrastructure layers with tests.', skills: ['Layers', 'DI', 'Testing'] },
];

const capstones: Project[] = [
  { id: 'capstone-1', title: 'Bank and inventory console app', path: 'Capstones/Capstone1_BankInventory', stage: 1, text: 'Encapsulation, domain validation, collections and transaction logging.', skills: ['OOP', 'Validation', 'Logging'] },
  { id: 'capstone-2', title: 'Student management REST API', path: 'Capstones/Capstone2_StudentApi', stage: 3, text: 'ASP.NET Core and EF Core with SQLite, DTOs, validation and async projections.', skills: ['EF Core', 'DTOs', 'REST'] },
  { id: 'capstone-3', title: 'Task manager web app', path: 'Capstones/Capstone3_TaskManager', stage: 4, text: 'State machines, task assignment, identity-based authorization and testable services.', skills: ['Authorization', 'Services', 'Tests'] },
  { id: 'capstone-4', title: 'E-commerce REST API', path: 'Capstones/Capstone4_EcommerceApi', stage: 4, text: 'Catalogue pagination, filtering, cart, pricing and checkout.', skills: ['Pagination', 'Sessions', 'Checkout'] },
  { id: 'capstone-5', title: 'Real-time chat with SignalR', path: 'Capstones/Capstone5_SignalRChat', stage: 5, text: 'Strongly typed hubs, room groups and transport fallbacks.', skills: ['SignalR', 'Groups', 'WebSockets'] },
  { id: 'capstone-6', title: 'Background jobs and reporting', path: 'Capstones/Capstone6_BackgroundReporting', stage: 5, text: 'Producer and consumer processing with BackgroundService and Channels.', skills: ['Hosted services', 'Channels', 'Reports'] },
  { id: 'capstone-7', title: 'Dockerised production API', path: 'Capstones/Capstone7_ProductionApi', stage: 5, text: 'A hardened API ready for Azure Container Apps or Kubernetes.', skills: ['Docker', 'Health checks', 'Config'] },
];

const Card = ({ p }: { p: Project }) => (
  <article id={p.id} className="group relative flex scroll-mt-32 flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700 hover:bg-slate-900">
    <div className="flex items-start justify-between gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-ember"><FolderGit2 className="h-4 w-4" /></span>
      <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-400">Roadmap stage {p.stage}</span>
    </div>
    <h3 className="mt-4 font-semibold text-slate-100">
      <a href={`${REPO}/${p.path}`} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:rounded-xl">{p.title}<span className="sr-only"> (opens GitHub)</span></a>
    </h3>
    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.text}</p>
    <ul className="mt-4 flex flex-wrap gap-1.5">{p.skills.map((s) => <li key={s} className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-300">{s}</li>)}</ul>
    <p className="mt-auto flex items-center justify-between pt-4 text-xs text-slate-500"><span className="font-mono">samples/{p.path}</span><ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-ember" /></p>
  </article>
);

export function ProjectsView() {
  return (
    <div className="bg-slate-950 pb-10">
      <section className="kx-glow border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16">
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-slate-100 sm:text-5xl">Tested .NET projects</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
            Eight labs and seven capstones that build and pass their tests on every change. Read the code, run it, then rebuild it yourself without looking. That is the practice that sticks.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />.NET 10 and C# 14</li>
            <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />Built with warnings as errors</li>
            <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />xUnit tests run in CI</li>
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6" aria-labelledby="run-h">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 id="run-h" className="flex items-center gap-2 text-sm font-semibold text-slate-100"><Terminal className="h-4 w-4 text-ember" />Run any project locally</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-sm text-slate-300">{`git clone https://github.com/Karma-tic/dotnet-academy
cd dotnet-academy/samples
dotnet test KarmatixDotNetAcademy.sln`}</pre>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6" aria-labelledby="cap-h">
        <h2 id="cap-h" className="text-2xl font-semibold tracking-tight text-slate-100">Capstones</h2>
        <p className="mt-1 text-slate-400">Portfolio-sized projects. Rebuild one per roadmap stage and deploy it.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{capstones.map((p) => <Card key={p.id} p={p} />)}</div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6" aria-labelledby="lab-h">
        <h2 id="lab-h" className="text-2xl font-semibold tracking-tight text-slate-100">Labs</h2>
        <p className="mt-1 text-slate-400">Small, focused projects for one skill at a time.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{labs.map((p) => <Card key={p.id} p={p} />)}</div>
      </section>
    </div>
  );
}
