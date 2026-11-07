import { LessonContent } from '../../components/LessonView';

export const module03Lessons: LessonContent[] = [
  {
    slug: 'linq-masterclass',
    title: 'LINQ Masterclass: Querying, Filtering, and Performance',
    module: 3,
    moduleTitle: 'Intermediate C#',
    order: 1,
    duration: 18,
    difficulty: 'Intermediate',
    prerequisites: ['collections-and-expressions'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Master Language Integrated Query (LINQ): method syntax, deferred execution mechanics, IEnumerable vs IQueryable, and avoiding multiple enumeration traps.',
    goal: 'Transform and filter complex object graphs with declarative LINQ operators while avoiding memory allocations and repetitive database calls.',
    explanation: `
### What is LINQ?
Language Integrated Query (LINQ) provides a uniform, strongly-typed query syntax across in-memory collections, XML, and relational databases.

### Deferred Execution: The Secret Engine of LINQ
Most LINQ operators (like \`.Where()\`, \`.Select()\`, \`.Take()\`) do not execute when declared. They construct an iterator pipeline that executes **only when you enumerate the results** (e.g., in a \`foreach\` loop or by calling \`.ToList()\`, \`.ToArray()\`, \`.Count()\`).

\`\`\`csharp
// The query is NOT executed here:
var activeUsers = users.Where(u => u.IsActive);

// The query executes HERE during enumeration:
foreach (var user in activeUsers) { ... }
\`\`\`

### Multiple Enumeration Trap
If you iterate over an unmaterialized query multiple times (e.g., \`if (query.Any()) { Process(query.Count()); }\`), the query executes from scratch twice! If backed by a database, you make 2 full network roundtrips. 
**Fix: Materialize with \`.ToList()\` or \`.ToArray()\` if you need multiple reads.**
    `,
    analogy: {
      realWorldScenario: 'An automated water filtration pipeline.',
      techMapping: 'Attaching filters (Where, Select) does not move any water. Turning on the faucet at the end (ToList, foreach) causes water to flow through each filter stage sequentially.'
    },
    codeSnippet: {
      code: `public record Course(int Id, string Title, int EnrolledStudents, decimal Rating);

List<Course> courses = [
    new(1, "C# 14 Fundamentals", 1500, 4.9m),
    new(2, "ASP.NET Core Web APIs", 1200, 4.8m),
    new(3, "Entity Framework Core Deep Dive", 950, 4.7m),
    new(4, "Docker & DevOps for .NET", 800, 4.6m)
];

// Composed LINQ pipeline
var topTierCourses = courses
    .Where(c => c.Rating >= 4.8m)
    .OrderByDescending(c => c.EnrolledStudents)
    .Select(c => new { c.Title, c.EnrolledStudents })
    .ToList(); // Materialized to prevent re-execution

foreach (var item in topTierCourses)
{
    Console.WriteLine($"Top Course: {item.Title} ({item.EnrolledStudents} students)");
}
`,
      language: 'csharp',
      filename: 'LinqMastery.cs',
      samplePath: 'Module03_Intermediate/AsyncAndLinqLab'
    },
    walkthrough: [
      { step: 'Filter (.Where)', detail: 'Filters sequence to only include courses with Rating >= 4.8m.' },
      { step: 'Sort (.OrderByDescending)', detail: 'Sorts matching records by enrollment count from highest to lowest.' },
      { step: 'Projection (.Select)', detail: 'Projects each course into a lightweight anonymous object with only Title and EnrolledStudents.' },
      { step: 'Materialization (.ToList)', detail: 'Executes the pipeline and stores results in a memory List, preventing duplicate runs.' }
    ],
    commonMistakes: [
      {
        mistake: 'Using .Count() == 0 to check if an enumerable is empty.',
        whyItFails: '.Count() must iterate through the entire sequence to count every item. On large sets or databases, this is extremely wasteful.',
        fix: 'Use !items.Any() or items.Count == 0 on ICollection to check emptiness in O(1).'
      }
    ],
    practiceTask: {
      title: 'Find Top 2 Highest Scoring Students',
      task: 'Given a list of student records with Name and Score, write a LINQ query to find the names of the top 2 students with a Score >= 80, sorted descending.',
      hints: ['Use .Where()', 'Use .OrderByDescending()', 'Use .Take(2)', 'Use .Select(s => s.Name)'],
      solutionCode: `var topStudents = students
    .Where(s => s.Score >= 80)
    .OrderByDescending(s => s.Score)
    .Take(2)
    .Select(s => s.Name)
    .ToList();`
    },
    quiz: [
      {
        question: 'What is the primary benefit of deferred execution in LINQ?',
        options: ['It runs queries in parallel across multiple CPUs automatically', 'It avoids evaluating items until results are actually requested, enabling query composition', 'It caches results to disk', 'It encrypts database parameters'],
        correctIndex: 1,
        explanation: 'Deferred execution allows composing queries dynamically without evaluating them until enumerated.'
      }
    ]
  },
  {
    slug: 'async-await-and-concurrency',
    title: 'Async/Await, Tasks, and High-Throughput Concurrency',
    module: 3,
    moduleTitle: 'Intermediate C#',
    order: 2,
    duration: 20,
    difficulty: 'Intermediate',
    prerequisites: ['linq-masterclass'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Master non-blocking asynchronous programming in C#: Task state machines, avoiding .Result deadlocks, CancellationToken propagation, and SemaphoreSlim throttling.',
    goal: 'Write non-blocking asynchronous code that frees server thread pool threads during network and database I/O operations.',
    explanation: `
### What Async/Await Really Does
Contrary to popular myth, **async/await does not create a background thread for I/O**.
When your method encounters \`await httpClient.GetStringAsync(...)\`:
1. The Roslyn compiler rewrites your method into a **State Machine**.
2. If the operation is not finished, your method yields control, and the current thread returns immediately to the Thread Pool to handle other incoming user requests.
3. When the operating system signals that the network packet has arrived (an I/O completion port interrupt), a thread pool worker resumes your method right where it left off.

### The Two Deadly Async Mistakes
1. **\`async void\`**: Exceptions thrown inside \`async void\` cannot be caught by \`try/catch\` and will crash the application process! Always return \`Task\` or \`Task<T>\`.
2. **\`task.Result\` or \`task.Wait()\` (Sync-over-Async)**: Calling synchronous blocking properties on an incomplete Task causes **Thread Pool Starvation** and deadlocks. Always \`await\` all the way up.
    `,
    analogy: {
      realWorldScenario: 'Ordering a coffee at a busy cafe.',
      techMapping: 'Synchronous blocking: The cashier takes your order, stops everyone in line, and stands idle waiting 5 minutes for the espresso machine before taking the next customer. Asynchronous non-blocking: The cashier takes your order, hands you a numbered buzzer (Task), and immediately serves the next 20 customers while the barista brews your coffee.'
    },
    codeSnippet: {
      code: `using System.Threading;
using System.Threading.Tasks;

public class AsyncThrottler
{
    private readonly SemaphoreSlim _semaphore = new(3, 3); // Max 3 concurrent operations

    public async Task ProcessItemsConcurrentlyAsync(IEnumerable<string> urls, CancellationToken ct)
    {
        var tasks = new List<Task>();

        foreach (var url in urls)
        {
            // Acquire slot asynchronously
            await _semaphore.WaitAsync(ct);

            tasks.Add(Task.Run(async () =>
            {
                try
                {
                    ct.ThrowIfCancellationRequested();
                    // Non-blocking simulated I/O operation
                    await Task.Delay(100, ct);
                    Console.WriteLine($"Downloaded: {url}");
                }
                finally
                {
                    _semaphore.Release(); // Always release in finally block!
                }
            }, ct));
        }

        await Task.WhenAll(tasks);
    }
}
`,
      language: 'csharp',
      filename: 'AsyncConcurrencyDemo.cs',
      samplePath: 'Module03_Intermediate/AsyncAndLinqLab'
    },
    walkthrough: [
      { step: 'SemaphoreSlim Initialization', detail: 'Restricts concurrency to at most 3 simultaneous operations without blocking threads.' },
      { step: 'WaitAsync', detail: 'Asynchronously awaits an available slot; does not hold a thread pool worker if all 3 slots are occupied.' },
      { step: 'CancellationToken', detail: 'Allows the caller to abort execution immediately if the user cancels or closes their browser tab.' },
      { step: 'Task.WhenAll', detail: 'Asynchronously awaits the completion of all batch tasks simultaneously.' }
    ],
    commonMistakes: [
      {
        mistake: 'Using Thread.Sleep() inside an async method.',
        whyItFails: 'Thread.Sleep blocks the active OS thread synchronously, preventing it from doing other useful work.',
        fix: 'Always use await Task.Delay(milliseconds) for non-blocking asynchronous pauses.'
      }
    ],
    practiceTask: {
      title: 'Parallel Fetch with Timeout',
      task: 'Write an asynchronous method that executes two simulated async tasks in parallel using Task.WhenAll, returning their combined results.',
      hints: ['Use Task.WhenAll(taskA, taskB)', 'Await both tasks concurrently'],
      solutionCode: `async Task<(string, int)> FetchDataAsync()
{
    var task1 = Task.Run(async () => { await Task.Delay(50); return "Data A"; });
    var task2 = Task.Run(async () => { await Task.Delay(50); return 42; });

    await Task.WhenAll(task1, task2);
    return (await task1, await task2);
}`
    },
    quiz: [
      {
        question: 'Why should you avoid calling .Result or .Wait() on a Task?',
        options: ['It disables compiler optimization', 'It causes sync-over-async blocking, leading to thread pool starvation and deadlocks', 'It deletes the task from memory', 'It forces garbage collection'],
        correctIndex: 1,
        explanation: 'Blocking synchronously on asynchronous tasks starves thread pool workers and deadlocks synchronization contexts.'
      }
    ]
  }
];

