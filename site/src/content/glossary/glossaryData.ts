export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  analogy: string;
}

export const glossaryData: GlossaryTerm[] = [
  {
    term: 'CLR (Common Language Runtime)',
    category: 'Runtime',
    definition: 'The virtual execution engine that compiles intermediate language (IL) into machine code, executes threads, and manages memory.',
    analogy: 'The operating engine of a hybrid vehicle that converts electrical battery power into smooth wheel motion.'
  },
  {
    term: 'BCL (Base Class Library)',
    category: 'Runtime',
    definition: 'The comprehensive collection of standard foundational types, collections, file I/O, and networking classes built into .NET.',
    analogy: 'A standard professional toolbox containing wrenches, screwdrivers, and tape so you never build basics from scratch.'
  },
  {
    term: 'Garbage Collector (GC)',
    category: 'Memory',
    definition: 'An automated background memory manager that reclaims heap allocations that are no longer referenced by active execution roots.',
    analogy: 'A municipal recycling truck that visits neighborhoods periodically to pick up discard bins left on the curb.'
  },
  {
    term: 'JIT Compiler (Just-In-Time)',
    category: 'Runtime',
    definition: 'The compiler component inside the CLR that converts machine-independent CIL bytecode into native CPU instructions at runtime.',
    analogy: 'An on-demand simultaneous translator speaking native sentences into headphones as the speaker speaks.'
  },
  {
    term: 'Boxing',
    category: 'Memory',
    definition: 'The process of converting a stack-allocated value type into an object reference type allocated on the managed heap.',
    analogy: 'Placing a loose metal coin into a velvet display box with an address label, increasing storage weight.'
  },
  {
    term: 'Span<T>',
    category: 'Performance',
    definition: 'A stack-only ref struct representing a contiguous region of arbitrary memory with zero heap allocations.',
    analogy: 'A magnifying glass window positioned over a section of a printed encyclopedia without tearing out the page.'
  },
  {
    term: 'Record',
    category: 'Language',
    definition: 'A C# type providing built-in value-based equality, non-destructive mutation via "with", and concise syntax.',
    analogy: 'A passport page: two passports with identical details represent the identical identity, and stamps create new copies.'
  },
  {
    term: 'Deferred Execution',
    category: 'LINQ',
    definition: 'A LINQ query evaluation model where the query logic executes only when the resulting sequence is actually enumerated.',
    analogy: 'Writing a recipe on a piece of paper; the cake is only baked when someone actually follows the instructions in the kitchen.'
  },
  {
    term: 'IQueryable<T>',
    category: 'Data',
    definition: 'An interface representing a query as an expression tree translated to provider-specific SQL on the database server.',
    analogy: 'Sending a chef a formal dinner request order slip that they cook in their restaurant kitchen before delivering the plate.'
  },
  {
    term: 'IEnumerable<T>',
    category: 'Collections',
    definition: 'An interface representing an in-memory forward-only iterator over a sequence of elements using delegates.',
    analogy: 'Looking through items already sitting on your kitchen table one by one.'
  },
  {
    term: 'DbContext',
    category: 'EF Core',
    definition: 'The central Entity Framework class that combines the Unit of Work and Repository patterns to manage database transactions and mappings.',
    analogy: 'A diplomatic embassy coordinating communications, agreements, and transactions between two sovereign countries.'
  },
  {
    term: 'N+1 Problem',
    category: 'EF Core',
    definition: 'A severe query performance defect where 1 parent query is followed by N individual database queries to load child records.',
    analogy: 'A courier driving to the warehouse 50 separate times to deliver 50 packages instead of loading all 50 onto one delivery truck.'
  },
  {
    term: 'Middleware',
    category: 'ASP.NET Core',
    definition: 'Software components assembled into an application pipeline to inspect, process, or terminate incoming HTTP requests and outgoing responses.',
    analogy: 'An airport security checkpoint corridor where passengers sequentially pass through baggage checks, passport control, and metal detectors.'
  },
  {
    term: 'Captive Dependency',
    category: 'Dependency Injection',
    definition: 'A dependency injection bug where a shorter-lived service (Scoped) is injected into a longer-lived service (Singleton), keeping it alive indefinitely.',
    analogy: 'A hotel guest locking a room service waiter inside their room for the entire duration of a month-long vacation.'
  },
  {
    term: 'JWT (JSON Web Token)',
    category: 'Security',
    definition: 'A cryptographically signed, stateless string containing Base64URL-encoded header, claims payload, and signature for authentication.',
    analogy: 'A stamped concert wristband that allows security guards to verify your VIP access instantly without checking a guestbook.'
  },
  {
    term: 'ProblemDetails (RFC 7807 / 9457)',
    category: 'Web API',
    definition: 'The standardized machine-readable JSON specification for HTTP API error responses containing type, title, status, and detail.',
    analogy: 'A standardized medical report format used by doctors worldwide so any hospital instantly understands test diagnoses.'
  },
  {
    term: 'Clean Architecture',
    category: 'Architecture',
    definition: 'A software design philosophy organizing code into concentric layers where business domain rules have zero dependencies on external frameworks or databases.',
    analogy: 'A fortress where the crown jewels are protected in the innermost sanctum, unaffected by changes to the outer moat walls.'
  },
  {
    term: 'CancellationToken',
    category: 'Async',
    definition: 'A lightweight struct passed through asynchronous call chains to cooperatively notify long-running operations when a client has aborted.',
    analogy: 'A chef receiving an order cancellation buzzer from the waiter, immediately turning off the frying pan before wasting ingredients.'
  },
  {
    term: 'Kestrel',
    category: 'Web Server',
    definition: 'The built-in, cross-platform, asynchronous, high-throughput web server powering modern ASP.NET Core applications.',
    analogy: 'A high-speed bullet train engine carrying passengers swiftly and reliably across any modern railway track.'
  },
  {
    term: '.NET Aspire',
    category: 'Cloud',
    definition: 'An opinionated cloud-ready orchestration and telemetry framework for configuring, developing, and running observable distributed .NET applications.',
    analogy: 'An air traffic control tower coordinating flight paths, radar telemetry, and ground operations across all aircraft in a fleet.'
  }
];

