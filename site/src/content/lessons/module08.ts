import { LessonContent } from '../../components/LessonView';

export const module08Lessons: LessonContent[] = [
  {
    slug: 'docker-and-containerization',
    title: 'Docker for .NET: Multi-Stage Builds and Production Hardening',
    module: 8,
    moduleTitle: 'DevOps, Cloud and Deployment',
    order: 1,
    duration: 18,
    difficulty: 'Intermediate',
    prerequisites: ['minimal-apis-validation-and-errors'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Master containerizing modern .NET applications using multi-stage Docker builds, non-root security enforcement ($APP_UID), and docker-compose local environments.',
    goal: 'Create minimal, hardened production Docker images under 150MB that run securely on Azure Container Apps or Kubernetes.',
    explanation: `
### Why Multi-Stage Docker Builds Are Essential
A single-stage Docker build copies the entire 800MB .NET SDK into your production image. That wastes network bandwidth, slows down pod scaling, and exposes compiler tools to attackers.

**Multi-stage builds split the process into 2 phases:**
1. **Build Stage (\`mcr.microsoft.com/dotnet/sdk:10.0\`)**: Restores NuGet packages and compiles your code using \`dotnet publish\`.
2. **Runtime Stage (\`mcr.microsoft.com/dotnet/aspnet:10.0-alpine\` or Debian slim)**: Only copies the compiled \`.dll\` binaries from the build stage. **Contains zero compilers or source files.**

### Production Container Security
Modern .NET container images automatically include a non-root user:
\`\`\`dockerfile
USER $APP_UID
\`\`\`
Running as non-root ensures that even if an attacker discovers a zero-day exploit, they cannot compromise the underlying Kubernetes host node.
    `,
    analogy: {
      realWorldScenario: 'A professional commercial bakery.',
      techMapping: 'The build stage is the bustling kitchen with 50-pound flour sacks, ovens, and mixers. The runtime container is the clean display box in the storefront window containing only the finished, packaged pastry.'
    },
    codeSnippet: {
      code: `# Stage 1: Build & Publish
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["MyApi.csproj", "./"]
RUN dotnet restore "MyApi.csproj"

COPY . .
RUN dotnet publish "MyApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Minimal, Hardened Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

# Run as non-root user for security compliance
USER $APP_UID

COPY --from=build /app/publish .

ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "MyApi.dll"]
`,
      language: 'dockerfile',
      filename: 'Dockerfile',
      samplePath: 'Capstones/Capstone7_ProductionApi'
    },
    walkthrough: [
      { step: 'Stage 1 (build)', detail: 'Uses full .NET SDK image to restore dependencies and publish binaries in Release mode.' },
      { step: 'Stage 2 (final)', detail: 'Switches to the lightweight ASP.NET Core runtime image.' },
      { step: 'USER $APP_UID', detail: 'Drops root permissions and switches to the default non-root application user.' },
      { step: 'COPY --from=build', detail: 'Transfers only the compiled binaries, leaving all intermediate build cache behind.' }
    ],
    commonMistakes: [
      {
        mistake: 'Leaving .git, bin/, and obj/ unignored during Docker build.',
        whyItFails: 'Sends gigabytes of unnecessary local files into the Docker build context, making builds slow and causing architecture mismatches.',
        fix: 'Always create a .dockerignore file excluding bin/, obj/, .git, and node_modules/.'
      }
    ],
    practiceTask: {
      title: 'Write a .dockerignore File',
      task: 'Create a .dockerignore file that excludes bin/, obj/, .git/, and *.user files from being sent to the Docker daemon.',
      hints: ['Add one pattern per line'],
      solutionCode: `bin/
obj/
.git/
*.user
*.suo`
    },
    quiz: [
      {
        question: 'Why should .NET production Docker containers execute under "USER $APP_UID"?',
        options: ['It increases memory usage', 'To follow the principle of least privilege, preventing container breakout attacks by running as non-root', 'Because Docker forbids running as root', 'To make the image smaller'],
        correctIndex: 1,
        explanation: 'Running as non-root limits the blast radius of container security vulnerabilities.'
      }
    ]
  },
  {
    slug: 'github-actions-and-cicd',
    title: 'Continuous Integration with GitHub Actions and Deployment',
    module: 8,
    moduleTitle: 'DevOps, Cloud and Deployment',
    order: 2,
    duration: 18,
    difficulty: 'Intermediate',
    prerequisites: ['docker-and-containerization'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Build an automated CI/CD pipeline using GitHub Actions that restores, builds with -warnaserror, executes unit tests, and validates code quality on every push.',
    goal: 'Create an automated GitHub Actions workflow that gates pull requests and deployments against test failures and compiler warnings.',
    explanation: `
### What is CI/CD?
- **Continuous Integration (CI)**: Automatically builds, lints, and tests your code every time you or a teammate opens a pull request. If any test fails or compiler warning occurs, the build is blocked.
- **Continuous Deployment (CD)**: Automatically deploys validated code to production or staging environments (such as GitHub Pages or Azure Container Apps) without manual human intervention.

### Treating Warnings as Errors in CI
In production enterprise teams, **compiler warnings are treated as defects**. Passing \`-warnaserror\` ensures that code with unused variables, potential null dereferences, or obsolete APIs cannot be merged.
    `,
    analogy: {
      realWorldScenario: 'An automated vehicle safety inspection line.',
      techMapping: 'Every car rolling off the assembly line passes through automated laser alignment, brake checks, and emission sensors. If even one warning light blinks, the car is halted from shipping to customers.'
    },
    codeSnippet: {
      code: `name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v4

    - name: Setup .NET SDK
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: '10.0.x'

    - name: Restore Dependencies
      run: dotnet restore samples/KarmatixDotNetAcademy.sln

    - name: Build with Strict Warnings as Errors
      run: dotnet build samples/KarmatixDotNetAcademy.sln -c Release -warnaserror --no-restore

    - name: Run Automated Unit Tests
      run: dotnet test samples/KarmatixDotNetAcademy.sln -c Release --no-build --verbosity normal
`,
      language: 'yaml',
      filename: 'ci.yml',
      samplePath: '.github/workflows/ci.yml'
    },
    walkthrough: [
      { step: 'actions/checkout', detail: 'Pulls the repository source code into the GitHub Actions runner VM.' },
      { step: 'actions/setup-dotnet', detail: 'Installs the pinned .NET 10 SDK on the runner.' },
      { step: 'dotnet restore', detail: 'Downloads and caches all NuGet package dependencies.' },
      { step: 'dotnet build -warnaserror', detail: 'Compiles all projects, failing immediately if any warning is emitted.' },
      { step: 'dotnet test', detail: 'Executes all unit and integration test fixtures, blocking deployment if any assertion fails.' }
    ],
    commonMistakes: [
      {
        mistake: 'Leaving out the -warnaserror flag in CI pipelines.',
        whyItFails: 'Teams accumulate technical debt: nullable warnings and obsolete API usage multiply unnoticed over time.',
        fix: 'Enforce dotnet build -warnaserror on every CI run.'
      }
    ],
    practiceTask: {
      title: 'Add a Code Coverage Step to CI',
      task: 'Modify a GitHub Actions workflow to run dotnet test with the parameter --collect:"XPlat Code Coverage".',
      hints: ['Append --collect:"XPlat Code Coverage" to the dotnet test command line'],
      solutionCode: `run: dotnet test --collect:"XPlat Code Coverage"`
    },
    quiz: [
      {
        question: 'What is the purpose of passing "-warnaserror" during CI compilation?',
        options: ['It disables warnings completely', 'It treats every compiler warning as a fatal build error, preventing technical debt from entering the repository', 'It slows down compilation', 'It hides error messages from logs'],
        correctIndex: 1,
        explanation: 'Treating warnings as errors ensures that all code standards and null-safety guarantees are strictly enforced.'
      }
    ]
  }
];

