export interface LessonEnhancement {
  eli5: string;
  didYouKnow: string;
  examAlert: string;
  sandboxUrl?: string;
}

export const lessonEnhancementsMap: Record<string, LessonEnhancement> = {
  'what-is-dotnet-and-csharp': {
    eli5: 'Think of C# like writing an email in English. Your computer only speaks binary robot math (0s and 1s). .NET is the magical bilingual butler who takes your English email, turns it into a universal recipe card, and then whispers it into your computer’s processor in its exact native tongue so it runs super fast!',
    didYouKnow: 'Stack Overflow—one of the top 50 most visited websites on the internet—runs its entire global infrastructure serving over 1.3 billion pageviews a month on just 9 on-premise .NET servers! Other languages would require hundreds of servers.',
    examAlert: 'Frequent TCS & Infosys Question: "Explain the difference between JIT Compilation and AOT Compilation in .NET, and define what the CLR actually does." Answer: JIT converts IL to machine code at runtime on-demand; AOT compiles directly before execution.',
    sandboxUrl: 'https://dotnetfiddle.net/',
  },
  'installation-and-first-cli-app': {
    eli5: 'Installing the .NET SDK is like buying a toolbox with a hammer, saw, and screwdrivers. You don\'t need a giant, heavy workshop app to build tables; you can just open a black terminal window and type `dotnet new` to make a brand-new project in 2 seconds flat!',
    didYouKnow: 'The C# language was originally going to be named "Cool" (standing for "C-like Object Oriented Language"). Microsoft had to rename it to C# because "Cool" couldn\'t be trademarked!',
    examAlert: 'TCS & Wipro Coding Test: Candidates often get confused between the .NET SDK and the .NET Runtime. The SDK is for developers to build code; the Runtime is only for production servers to run already-compiled apps.',
    sandboxUrl: 'https://dotnetfiddle.net/',
  },
  'variables-data-types-and-operators': {
    eli5: 'A variable is just a Tupperware container with a sticky label on it. If you label it `int`, you can only put whole numbers inside. If you try to cram text into it, C# slaps your hand before you even turn on the computer!',
    didYouKnow: 'In C# 10 and 14, strings can be compared using `ReadOnlySpan<char>` with ZERO memory allocations on the heap. This simple technique saved Microsoft hundreds of thousands of dollars on Azure Bing server costs.',
    examAlert: 'Company Exam Trap: "What is the default value of an uninitialized int vs an uninitialized string in a C# class?" Answer: `int` defaults to `0`, while `string` (a reference type) defaults to `null`.',
    sandboxUrl: 'https://dotnetfiddle.net/',
  },
  'control-flow-and-pattern-matching': {
    eli5: 'Control flow is like choosing your adventure. Pattern matching is like a smart postal scanner that looks at a parcel and says: "Is this a letter? Sort it left. Is this an oversized box? Sort it right. Is it a fragile glass vase? Handle with caution!"',
    didYouKnow: 'C# switch expressions (`x switch { 1 => "One", _ => "Other" }`) were borrowed from functional programming languages like Haskell and F#. They evaluate much faster than long chains of `if-else if`.',
    examAlert: 'Infosys & Cognizant Placement Test: Pattern matching with relational patterns (`switch (score) { >= 90 => "A", >= 80 => "B" }`) is frequently tested in MCQs.',
    sandboxUrl: 'https://dotnetfiddle.net/',
  },
  'methods-parameters-and-scope': {
    eli5: 'A method is a kitchen recipe. You give it ingredients (parameters), it chops and bakes them, and hands you back a delicious cake (the return value). The flour on the counter stays in the kitchen (local scope) and doesn\'t spill into the living room!',
    didYouKnow: 'In modern C#, you can use local functions inside methods. The compiler converts them into hidden private static methods with zero allocation overhead when using the `static` keyword.',
    examAlert: 'Accenture & TCS Exam: Difference between `ref`, `out`, and `in` parameter modifiers. Remember: `in` is read-only reference, `out` must be assigned before leaving the method, `ref` must be initialized before entering.',
    sandboxUrl: 'https://dotnetfiddle.net/',
  },
  'classes-records-and-structs': {
    eli5: 'A class is a blueprint for a house. A record is a printed receipt (once printed, you don\'t scribble on it; you photocopy it if you want changes). A struct is a tiny sticky note you hand directly to a friend.',
    didYouKnow: 'Before records were added in C# 9, engineers had to write over 50 lines of boilerplate code to implement value equality, GetHashCode, and ToString for a simple model. Records reduced all of that to a single line!',
    examAlert: 'Microsoft AZ-204 & Placement Interviews: "When would you choose a record over a class?" Answer: When modeling immutable data structures, DTOs, or API payloads where value-based equality is desired.',
    sandboxUrl: 'https://dotnetfiddle.net/',
  },
  'interfaces-and-polymorphism': {
    eli5: 'An interface is a standard wall electrical outlet. The wall doesn\'t care if you plug in a toaster, a blender, or a MacBook charger—as long as the plug fits the three holes (the interface contract), electricity flows smoothly!',
    didYouKnow: 'C# 8 introduced Default Interface Methods, allowing Microsoft to add new methods to existing interfaces without breaking millions of legacy applications worldwide.',
    examAlert: 'Top TCS Technical Interview Question: "Can an interface in C# have private fields or constructors?" Answer: No, interfaces cannot contain instance state (fields) or constructors.',
    sandboxUrl: 'https://dotnetfiddle.net/',
  },
  'collections-and-linq': {
    eli5: 'LINQ is like a shopping assistant at the supermarket. Instead of walking through every single aisle yourself, you hand the assistant a note saying: "Bring me all fruits under 50 rupees, sorted alphabetically." The assistant does all the walking for you.',
    didYouKnow: 'LINQ uses "Deferred Execution". When you write `.Where(...)`, no data is actually filtered yet! The query only runs when you force it with a `foreach` loop or `.ToList()`.',
    examAlert: 'Mass Placement Coding Exam: The difference between `IEnumerable` and `IQueryable`. `IEnumerable` filters in client memory, while `IQueryable` translates into native database SQL queries via EF Core.',
    sandboxUrl: 'https://dotnetfiddle.net/',
  },
  'async-await-and-concurrency': {
    eli5: 'Imagine ordering food at a counter. Instead of forcing you to stand staring at the grill for 10 minutes (blocking the line for everyone behind you), the cook gives you a buzzing buzzer. You go sit down, and only return when your buzzer rings!',
    didYouKnow: 'The async/await pattern was invented by the C# design team (led by Mads Torgersen and Anders Hejlsberg) in C# 5. It was so revolutionary that JavaScript, Python, Rust, and Swift all copied the exact same syntax.',
    examAlert: 'Most Frequent Junior Backend Question: "What happens if you call `.Result` or `.Wait()` on an async method?" Answer: Deadlock risk and Thread Pool starvation under load. Always use `await`.',
    sandboxUrl: 'https://dotnetfiddle.net/',
  },
  'aspnet-core-minimal-apis': {
    eli5: 'A Minimal API is like an espresso machine on your desk. Instead of buying an entire industrial kitchen with 10 cabinets and folders (old MVC controllers), you write 4 lines of code and your web API is serving JSON to the whole world.',
    didYouKnow: 'ASP.NET Core Minimal APIs are among the top 10 fastest web frameworks in the independent TechEmpower benchmarks, serving over 7 million requests per second on modern hardware.',
    examAlert: 'Microsoft Azure Developer Associate (AZ-204): "How do you define route constraints in ASP.NET Core Minimal APIs?" Answer: Using syntax like `app.MapGet("/users/{id:int}", ...)` or regex constraints.',
    sandboxUrl: 'https://dotnetfiddle.net/',
  },
  'dependency-injection-in-dotnet': {
    eli5: 'Imagine a toy robot. If you weld a fixed battery inside its chest, when the battery dies, you have to throw the entire robot away. Instead, you design a battery compartment on its back so any standard AA battery can be inserted from the outside!',
    didYouKnow: 'ASP.NET Core was rebuilt from the ground up with a high-performance built-in IoC container. You don\'t need third-party tools like Autofac or Ninject for 99% of enterprise applications.',
    examAlert: 'TCS / Wipro / Accenture Core Interview: "Explain the three service lifetimes in ASP.NET Core DI: Transient, Scoped, and Singleton." Answer: Transient = new instance per request; Scoped = one instance per HTTP request; Singleton = one instance for the entire application life.',
    sandboxUrl: 'https://dotnetfiddle.net/',
  },
  'entity-framework-core-and-databases': {
    eli5: 'EF Core is a translator between your C# code and a giant SQL database spreadsheet. You talk to your C# lists of Students, and EF Core quietly writes all the `SELECT * FROM Students` and `INSERT INTO` commands in the background without you having to spell SQL keywords.',
    didYouKnow: 'EF Core 10 includes a compiled query cache and vector search integration, making it capable of running semantic similarity queries directly for AI applications alongside traditional relational SQL.',
    examAlert: 'Common Exam Question: "What is the N+1 query problem and how do you resolve it in EF Core?" Answer: It happens when querying parent entities and fetching children inside a loop. Fix it with eager loading (`.Include()`) or projection (`.Select()`).',
    sandboxUrl: 'https://dotnetfiddle.net/',
  },
};

export function getLessonEnhancement(slug: string, summary: string, title: string): LessonEnhancement {
  if (lessonEnhancementsMap[slug]) {
    return lessonEnhancementsMap[slug];
  }

  // Smart, high-quality fallback for any other lesson
  return {
    eli5: `In plain words: ${summary} We strip away the complicated terminology so you can build mental models first, then master the code with confidence.`,
    didYouKnow: `C# was designed to balance the blistering performance of C++ with the safety and developer happiness of high-level languages. It powers everything from indie games in Unity to the world's most mission-critical financial networks.`,
    examAlert: `Placement Exam Watch: Companies frequently test fundamentals of "${title}" in technical multiple-choice rounds. Focus on memory lifecycle, type constraints, and real-world edge cases.`,
    sandboxUrl: 'https://dotnetfiddle.net/',
  };
}

