import { LessonContent } from '../../components/LessonView';

export const module00Lessons: LessonContent[] = [
  {
    slug: 'what-is-dotnet-and-csharp',
    title: 'What is .NET, C#, and the CLR?',
    module: 0,
    moduleTitle: 'Start Here',
    order: 1,
    duration: 10,
    difficulty: 'Beginner',
    prerequisites: ['None (Zero programming background assumed)'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Understand what .NET actually is, how C# code runs on your computer, what the CLR and BCL do, and why top global companies choose .NET.',
    goal: 'Understand the distinct roles of the C# programming language, the Roslyn compiler, the Common Language Runtime (CLR), and the Base Class Library (BCL).',
    explanation: `
When people say ".NET", they often mix up three different things: the programming language (C#), the runtime engine that executes code (CLR), and the enormous library of pre-written tools (BCL).

1. **C# (C-Sharp)** is the language you type. It is modern, type-safe, elegant, and designed by Anders Hejlsberg.
2. **Roslyn Compiler** compiles your readable C# text files (\`.cs\`) into an intermediate format called **Common Intermediate Language (CIL or IL)** and bundles them into an assembly file (\`.dll\`).
3. **The Common Language Runtime (CLR)** is the runtime engine. When you run your program, the CLR uses a **Just-In-Time (JIT) compiler** to translate that intermediate IL into the exact binary machine instructions your host CPU (Apple Silicon, Intel x64, or ARM Linux) understands.
4. **The Base Class Library (BCL)** is the massive collection of battle-tested standard libraries for file access, HTTP networking, security, JSON parsing, mathematics, and collections.

### .NET vs .NET Framework (Crucial Industry Context)
In older tutorials, you will see ".NET Framework" (versions 1.0 to 4.8.1). **That was the legacy, Windows-only platform from 2002.** In 2016, Microsoft rebuilt .NET from scratch as a modular, open-source, ultra-fast, cross-platform engine (originally called .NET Core, now simply **.NET**, currently on **.NET 10 LTS**). Never start a new project on .NET Framework.
    `,
    analogy: {
      realWorldScenario: 'Think of an international summit with representatives from 50 countries.',
      techMapping: 'C# is the speech written by the ambassador. The Roslyn compiler translates that speech into universal Esperanto (IL). The CLR is the on-demand headphone translator sitting in each delegate’s ear (JIT), translating into their specific dialect (x64/ARM machine code).'
    },
    codeSnippet: {
      code: `// C# 14 / .NET 10 Top-Level Program
Console.WriteLine("Hello, Karmatix .NET Academy!");
Console.WriteLine($"Running on .NET Version: {Environment.Version}");
Console.WriteLine($"Operating System: {Environment.OSVersion}");
`,
      language: 'csharp',
      filename: 'Program.cs',
      samplePath: 'Module00_StartHere/HelloWorld'
    },
    walkthrough: [
      { step: 'Source File', detail: 'You write code in Program.cs using standard C# syntax.' },
      { step: 'Roslyn Compilation', detail: 'Running "dotnet build" invokes Roslyn, compiling Program.cs into HelloWorld.dll containing IL and metadata.' },
      { step: 'CLR JIT Compilation', detail: 'When you type "dotnet run", the host CLR loads the assembly and the JIT compiler generates native machine code on the fly.' },
      { step: 'Execution & Output', detail: 'The CPU executes the machine instructions, printing the operating system and runtime version to your terminal.' }
    ],
    commonMistakes: [
      {
        mistake: 'Confusing .NET Framework 4.8 with modern .NET 10.',
        whyItFails: '.NET Framework 4.8 only runs on Windows, lacks modern C# 10–14 features, and uses legacy configuration files (web.config).',
        fix: 'Target "net10.0" in your .csproj file for cross-platform speed and active LTS support.'
      }
    ],
    practiceTask: {
      title: 'Inspect Your Local Environment',
      task: 'Create a new console project using the dotnet CLI and print out whether the current process is 64-bit and the machine host name.',
      hints: ['Use Environment.Is64BitProcess and Environment.MachineName'],
      solutionCode: `Console.WriteLine($"Is 64-bit: {Environment.Is64BitProcess}");
Console.WriteLine($"Machine: {Environment.MachineName}");`
    },
    quiz: [
      {
        question: 'What is the role of the Just-In-Time (JIT) compiler in .NET?',
        options: ['It checks git credentials', 'It compiles C# text directly into HTML', 'It translates Intermediate Language (IL) into native CPU machine instructions at runtime', 'It backs up the database'],
        correctIndex: 2,
        explanation: 'The CLR’s JIT compiler transforms machine-independent IL bytecode into native CPU instructions on the target host.'
      },
      {
        question: 'Which of the following describes the difference between legacy .NET Framework and modern .NET?',
        options: ['.NET Framework is faster and cross-platform', 'Modern .NET is open-source, cross-platform (Windows, Mac, Linux), and significantly faster than legacy .NET Framework', 'They are identical', '.NET Framework is for mobile only'],
        correctIndex: 1,
        explanation: 'Modern .NET is a cross-platform, modular, open-source rewrite that replaces the legacy Windows-only .NET Framework.'
      }
    ]
  },
  {
    slug: 'sdk-tools-installation',
    title: 'Installing the .NET SDK & Developer Tooling',
    module: 0,
    moduleTitle: 'Start Here',
    order: 2,
    duration: 12,
    difficulty: 'Beginner',
    prerequisites: ['what-is-dotnet-and-csharp'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Install the official .NET 10 SDK on Windows, macOS, or Linux, and set up your editor: VS Code with C# Dev Kit, Visual Studio, or JetBrains Rider.',
    goal: 'Install and verify the official .NET SDK, understand SDK vs Runtime, and configure a productive IDE workspace.',
    explanation: `
### SDK vs Runtime: What is the Difference?
- **.NET Runtime**: Contains only what is needed to *run* an already compiled application. End-users and lightweight production Docker containers only install the runtime.
- **.NET SDK (Software Development Kit)**: Contains the runtime, plus the Roslyn compiler, the \`dotnet\` CLI build tools, MSBuild, and project templates. **As a developer, you must always install the SDK.**

### Choosing Your Development Environment
1. **VS Code + C# Dev Kit (Cross-Platform / Recommended for Beginners & Mac/Linux)**:
   - Lightweight, lightning fast, powered by the official Microsoft C# Dev Kit extension.
2. **Visual Studio Community (Windows)**:
   - The heavyweight enterprise IDE with industry-best diagnostics and profiling. Free for individual developers and small businesses.
3. **JetBrains Rider (Cross-Platform)**:
   - Fast, ReSharper-powered IDE loved by professional teams. Free for non-commercial personal and learning use.
    `,
    analogy: {
      realWorldScenario: 'Buying a car versus buying the factory assembly tools.',
      techMapping: 'The Runtime is the car (it drives you where you need to go). The SDK is the mechanic’s toolkit and factory machinery (it lets you build and repair cars).'
    },
    codeSnippet: {
      code: `# Terminal verification commands:
dotnet --version
dotnet --list-sdks
dotnet --info
`,
      language: 'bash',
      filename: 'terminal-check.sh'
    },
    walkthrough: [
      { step: 'Download the SDK', detail: 'Visit https://dotnet.microsoft.com/download and select the .NET 10 LTS installer for your OS.' },
      { step: 'Run the Installer', detail: 'Follow the standard installation wizard on Windows, Mac (pkg), or Linux (apt/dnf).' },
      { step: 'Verify in Terminal', detail: 'Open terminal/PowerShell and run "dotnet --version". It should report 10.0.xxx.' },
      { step: 'Install Editor Extension', detail: 'If using VS Code, open Extensions and install "C# Dev Kit" by Microsoft.' }
    ],
    commonMistakes: [
      {
        mistake: 'Installing only the .NET Runtime instead of the .NET SDK.',
        whyItFails: 'Running "dotnet new" or "dotnet build" will fail with a command not found or missing SDK error.',
        fix: 'Always download the ".NET SDK", which includes compilers and developer tools.'
      }
    ],
    practiceTask: {
      title: 'Verify Your CLI Tooling',
      task: 'Run "dotnet --info" in your terminal and locate: (1) The SDK Version, (2) The Base Path, and (3) The Runtime Environment OS Name.',
      hints: ['Look under ".NET SDK:" and "Runtime Environment:" in the output'],
      solutionCode: `dotnet --info`
    },
    quiz: [
      {
        question: 'What is the primary difference between the .NET Runtime and the .NET SDK?',
        options: ['Runtime is for Windows only; SDK is for Linux', 'Runtime only executes apps; SDK includes the compiler, CLI tools, and runtime to build apps', 'SDK is paid; Runtime is free', 'They are identical'],
        correctIndex: 1,
        explanation: 'The SDK contains the compiler, MSBuild, and templates needed to develop and compile code; the runtime only executes pre-built binaries.'
      }
    ]
  },
  {
    slug: 'first-console-app-and-cli',
    title: 'Your First Project & dotnet CLI Essentials',
    module: 0,
    moduleTitle: 'Start Here',
    order: 3,
    duration: 15,
    difficulty: 'Beginner',
    prerequisites: ['sdk-tools-installation'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Master the anatomy of a .NET project (.csproj, Program.cs, bin/obj), and learn the essential dotnet CLI commands.',
    goal: 'Scaffold, build, run, test, and publish .NET projects entirely from the command line using the dotnet CLI.',
    explanation: `
### Anatomy of a .NET Project
When you create a project, the SDK generates:
1. **\`.csproj\` (C# Project File)**: An XML file that configures your target framework (\`<TargetFramework>net10.0</TargetFramework>\`), language version, nullable settings, and third-party NuGet package dependencies.
2. **\`Program.cs\`**: The entry point where your code begins execution.
3. **\`bin/\`**: Contains compiled executable binaries (.dll, .pdb debug symbols).
4. **\`obj/\`**: Contains temporary intermediate files generated during incremental compilation. Never commit \`bin/\` or \`obj/\` to Git!

### The 6 Essential \`dotnet\` CLI Commands
- \`dotnet new console -n MyApp\`: Scaffolds a new console application.
- \`dotnet build\`: Restores packages and compiles source files into \`bin/\`.
- \`dotnet run\`: Compiles (if modified) and immediately executes the application.
- \`dotnet test\`: Runs unit test suites.
- \`dotnet add package <PackageName>\`: Installs a NuGet package.
- \`dotnet publish -c Release\`: Packages an optimized production build.
    `,
    analogy: {
      realWorldScenario: 'Constructing a modular piece of IKEA furniture.',
      techMapping: 'The .csproj file is the blueprint and parts inventory list. The source code (.cs) is how the wooden parts fit together. The "bin/" folder is the assembled, polished table ready to use in your room.'
    },
    codeSnippet: {
      code: `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>

</Project>
`,
      language: 'xml',
      filename: 'MyApp.csproj',
      samplePath: 'Module00_StartHere/HelloWorld'
    },
    walkthrough: [
      { step: 'Create Directory', detail: 'Run "mkdir FirstApp && cd FirstApp"' },
      { step: 'Scaffold Project', detail: 'Run "dotnet new console"' },
      { step: 'Inspect Files', detail: 'Observe FirstApp.csproj and Program.cs created in the directory.' },
      { step: 'Execute Application', detail: 'Run "dotnet run" to see "Hello, World!" printed to your console.' }
    ],
    commonMistakes: [
      {
        mistake: 'Committing bin/ and obj/ folders to GitHub.',
        whyItFails: 'Binary files bloat your git history and cause conflicting OS lock issues when other teammates clone the repo.',
        fix: 'Always use a standard .gitignore file that excludes bin/ and obj/.'
      }
    ],
    practiceTask: {
      title: 'Scaffold and Run via CLI',
      task: 'Open your terminal, create a project named "GreetingApp", modify Program.cs to print "Welcome to Karmatix!", and build it with warnings treated as errors.',
      hints: ['Run "dotnet new console -n GreetingApp"', 'Use "dotnet build -warnaserror"'],
      solutionCode: `dotnet new console -n GreetingApp
cd GreetingApp
dotnet run`
    },
    quiz: [
      {
        question: 'Which file in a .NET project defines the TargetFramework (e.g. net10.0) and dependencies?',
        options: ['Program.cs', 'The .csproj file', 'launchSettings.json', 'global.json'],
        correctIndex: 1,
        explanation: 'The .csproj (C# Project) XML file defines the TargetFramework, compiler settings, and package references.'
      }
    ]
  }
];
