export interface HowToLearnSection {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  readTimeMinutes: number;
  coreRule: string;
  content: {
    summary: string;
    points: {
      headline: string;
      body: string;
      codeSnippet?: string;
    }[];
    actionableHabit: string;
  };
}

export const howToLearnData: HowToLearnSection[] = [
  {
    id: 'type-dont-paste',
    title: 'How to Study Code: Type It, Never Paste It',
    subtitle: 'Building neural muscle memory and syntax fluency',
    iconName: 'Keyboard',
    readTimeMinutes: 2,
    coreRule: 'If your fingers didn\'t type the semicolon, your brain didn\'t internalize the structure.',
    content: {
      summary: 'Copy-pasting creates the illusion of competence. When you copy code from a tutorial or LLM into your editor and hit run, your brain skips the micro-decisions: which keyword came first, where the curly braces close, why a variable needed a type, and how commas separate parameters.',
      points: [
        {
          headline: 'Tactile Motor Memory',
          body: 'Writing `public async Task<IActionResult> GetByIdAsync(int id, CancellationToken ct)` by hand forces you to acknowledge every keyword: the access modifier, async modifier, generic return type, method name, and cancellation token. Typing exposes hesitation points where your mental model is fuzzy.'
        },
        {
          headline: 'The 20% Mutation Rule',
          body: 'Whenever you finish typing a working sample from this course, deliberately mutate 20% of it before moving to the next section. Rename variables to fit a domain you care about (e.g., change "Product" to "CricketMatch" or "TrainSchedule"), add a new property, or add a validation guard. Mutation proves comprehension.'
        },
        {
          headline: 'Explain Code Aloud (Rubber Ducking)',
          body: 'After typing a block of code, read it aloud line by line in plain English. If you cannot explain what `builder.Services.AddScoped<IOrderService, OrderService>();` does to an imaginary peer, re-read the lesson before proceeding.'
        }
      ],
      actionableHabit: 'Keep your browser on one half of your screen and your terminal/VS Code on the other. Disable autocomplete extensions (like Copilot/IntelliCode) during your first 4 weeks so you learn C# syntax without machine crutches.'
    }
  },
  {
    id: 'reading-errors',
    title: 'How to Read Error Messages without Panic',
    subtitle: 'Deciphering compiler diagnostic codes and runtime stack traces',
    iconName: 'AlertTriangle',
    readTimeMinutes: 2,
    coreRule: 'An error message is not a judgment on your intelligence; it is a GPS coordinate telling you where reality disagreed with your code.',
    content: {
      summary: 'Beginners see red error text and feel overwhelmed, often closing the terminal or blindly modifying random lines. Professional engineers treat error messages as high-precision diagnostics. The compiler is your fastest feedback loop.',
      points: [
        {
          headline: 'Compiler Errors vs Runtime Exceptions',
          body: 'Compiler errors (CSxxxx) occur before your code ever runs. The Roslyn compiler tells you the exact file, line number, and character column. Runtime exceptions (like NullReferenceException) occur while executing. Read the exception type first, then the message, then the stack trace.'
        },
        {
          headline: 'Look Up the Diagnostic ID',
          body: 'Every C# compiler error begins with "CS" followed by 4 digits (e.g., CS0103, CS1002, CS8602). Never search for your entire variable name. Search for the error code: `dotnet error CS0103` in terminal or search "Microsoft docs CS8602". Microsoft maintains official diagnostic documentation for every code.',
          codeSnippet: 'dotnet build -warnaserror\n# Output: Program.cs(14,21): error CS1002: ; expected'
        },
        {
          headline: 'Read Stack Traces from Top to Bottom (Your Code First)',
          body: 'When a runtime exception throws, scan the stack trace from the top until you find a line pointing to a file in YOUR project (not `Microsoft.AspNetCore.*` or `System.Private.CoreLib`). The first frame that references your source code is where the invalid state entered.'
        },
        {
          headline: 'Check Inner Exceptions',
          body: 'In EF Core and ASP.NET Core, top-level exceptions are frequently wrapped in `DbUpdateException` or `TargetInvocationException`. Always scroll down to inspect `InnerException`. The innermost exception contains the true database engine error (e.g., foreign key violation or column nullability constraint).'
        }
      ],
      actionableHabit: 'When an error occurs, force yourself to spend 60 seconds reading the error text, file name, and line number before touching your keyboard.'
    }
  },
  {
    id: 'debugging-mastery',
    title: 'How to Debug Like a Senior Engineer',
    subtitle: 'Breakpoints, stepping, watches, and structured diagnostics',
    iconName: 'Bug',
    readTimeMinutes: 2,
    coreRule: 'Printing "here1" and "here2" with Console.WriteLine is guessing. The debugger lets you pause time and inspect reality.',
    content: {
      summary: 'Debugging is the scientific method applied to software: form a hypothesis, pause execution at the boundary, inspect actual state against expected state, and isolate the diverging condition.',
      points: [
        {
          headline: 'Master the Three Stepping Keys',
          body: 'F10 (Step Over): Executes the current line and advances to the next without diving into method internals.\nF11 (Step Into): Steps directly inside the method call on the current line to inspect its logic.\nShift+F11 (Step Out): Executes the remainder of the current method and returns to the caller.'
        },
        {
          headline: 'Conditional Breakpoints',
          body: 'In loops running hundreds of iterations, right-click the red breakpoint dot and select "Condition". Set an expression like `order.Id == 405` or `i == 99`. The debugger will only pause when your specific edge case triggers.'
        },
        {
          headline: 'The Watch and Immediate Windows',
          body: 'Use the Watch window to track object properties as you step through code. Use the Immediate Window (or Debug Console) to evaluate arbitrary C# expressions on the live pause state, such as `user.Orders.Count()` or `order.CalculateTotal()`, without modifying source code.'
        },
        {
          headline: 'Binary Search Debugging (Bisecting)',
          body: 'If a calculation fails in a 100-line method, place a breakpoint at line 50. If the state is correct at line 50, the defect is in lines 51-100. If it is already incorrect, the defect is in lines 1-50. You can isolate any defect in 6 steps.'
        }
      ],
      actionableHabit: 'Never guess why a bug happens. Place a breakpoint before the suspect line, trigger the request in Swagger or Postman, and step through line by line.'
    }
  },
  {
    id: 'docs-and-search',
    title: 'How to Navigate Official Docs and Source Code',
    subtitle: 'Using learn.microsoft.com, API Browser, and source.dot.net',
    iconName: 'Compass',
    readTimeMinutes: 2,
    coreRule: 'Outdated blog posts lie. Official docs and open-source runtime code are the ultimate ground truth.',
    content: {
      summary: 'The .NET ecosystem moves fast: .NET releases an updated LTS or STS version every November. Blog posts from 2018 (.NET Core 2.1) or 2014 (.NET Framework 4.5) will teach you obsolete patterns like Startup.cs, project.json, or synchronicity anti-patterns.',
      points: [
        {
          headline: 'The .NET API Browser',
          body: 'Bookmark `learn.microsoft.com/dotnet/api`. Whenever you use a class (e.g., `HttpClient`, `Channel<T>`, `DbContext`), verify which assembly it lives in, which version introduced it, and whether any method overloads are deprecated.'
        },
        {
          headline: 'Inspect Real .NET Source at source.dot.net',
          body: 'Microsoft open-sourced the entire .NET runtime, ASP.NET Core, and EF Core. At `source.dot.net`, you can search any method (like `List<T>.Add` or `WebApplication.CreateBuilder`) and see the exact C# implementation written by Microsoft engineers. Seeing that `List<T>` is simply an array that doubles in size demystifies memory growth.'
        },
        {
          headline: 'Filter by Version and Date',
          body: 'When searching Google or DuckDuckGo for .NET solutions, always include the target version (e.g., "asp.net core 10 minimal api rate limiting") or filter search results to the past year to prevent reading deprecated ASP.NET MVC 5 tutorials.'
        }
      ],
      actionableHabit: 'When you want to know what a method does, press F12 in VS Code / Visual Studio ("Go to Definition") to inspect the decompiled metadata signature and docstrings directly inside your editor.'
    }
  },
  {
    id: 'asking-good-questions',
    title: 'How to Ask for Help: The MCVE Standard',
    subtitle: 'Writing questions that get solved in minutes instead of ignored',
    iconName: 'HelpCircle',
    readTimeMinutes: 2,
    coreRule: 'If you want someone to donate 10 minutes of their time to help you, invest 10 minutes formulating your question cleanly.',
    content: {
      summary: 'Senior engineers and open-source maintainers love helping motivated learners, but they ignore questions that say "My API is not working, please help" with a blurry smartphone photo of a monitor screen.',
      points: [
        {
          headline: 'Minimal, Complete, and Verifiable (MCVE)',
          body: 'Minimal: Strip away database connections, authentication, and extraneous 500 lines of code. Reproduce the bug in a simple 20-line console app or single Minimal API route.\nComplete: Include all code necessary to reproduce the issue.\nVerifiable: Ensure the code actually exhibits the problem when another person runs it.'
        },
        {
          headline: 'The 4-Part Question Structure',
          body: '1. Goal: "I am trying to validate a user registration payload using FluentValidation in ASP.NET Core 10."\n2. Attempt: "I registered the validator in Program.cs using AddValidatorsFromAssemblyContaining."\n3. Actual Result: "When sending an invalid JSON payload, the endpoint returns 200 OK instead of 400 Bad Request."\n4. Error / Code: Include the formatted code snippet and any stack trace.'
        },
        {
          headline: 'Never Post Screenshots of Code',
          body: 'Screenshots cannot be searched, copied, or tested in an editor. Always paste code using markdown code fences (```csharp) with clean indentation and syntax highlighting.'
        }
      ],
      actionableHabit: 'Use the interactive question template generator on our "Stuck? Get Help" page whenever you need to ask a question on Stack Overflow, Reddit, or Discord.'
    }
  },
  {
    id: 'escaping-tutorial-hell',
    title: 'How to Escape Tutorial Hell Forever',
    subtitle: 'Moving from passive video consumption to autonomous software engineering',
    iconName: 'Zap',
    readTimeMinutes: 2,
    coreRule: 'Watching someone else build an API does not make you a backend engineer any more than watching cricket makes you Virat Kohli.',
    content: {
      summary: 'Tutorial hell is the state where you feel confident while following a tutorial, but freeze when staring at an empty `Program.cs` without step-by-step instructions. The only antidote is uncomfortable, autonomous problem-solving.',
      points: [
        {
          headline: 'Build the "Sister Project"',
          body: 'While completing the Capstone projects in this academy (e.g., our Student Portal API), simultaneously build a sister project in parallel. If we build a Student Portal, build a Hospital Patient Record API or an Automobile Service Center API using the exact same architectural patterns. Applying concepts to a different domain proves true mastery.'
        },
        {
          headline: 'Embrace the Blank Editor Anxiety',
          body: 'The feeling of "I don\'t know where to start" is normal. Start with the smallest verifiable unit: write a `record class Book(int Id, string Title);`, make an in-memory `List<Book>`, map one `app.MapGet("/books", () => books);` route, and run it. Expand iteratively.'
        },
        {
          headline: 'Finish What You Start',
          body: 'Ten unfinished half-built projects will not get you hired. One production-grade application with clean EF Core migrations, unit tests, Docker containerization, and a clear GitHub README with architectural diagrams demonstrates enterprise readiness.'
        }
      ],
      actionableHabit: 'Commit code to GitHub daily. When your streak represents real code you wrote without following a video word-for-word, you have escaped tutorial hell.'
    }
  }
];
