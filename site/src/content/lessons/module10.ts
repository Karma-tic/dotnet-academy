import { LessonContent } from '../../components/LessonView';

export const module10Lessons: LessonContent[] = [
  {
    slug: 'career-interview-roadmap',
    title: 'The .NET Technical Interview Roadmap',
    module: 10,
    moduleTitle: 'Career Hub',
    order: 1,
    duration: 15,
    difficulty: 'Intermediate',
    prerequisites: ['what-is-dotnet-and-csharp'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'A strategic walkthrough of what real engineering managers evaluate across behavioral, technical rounds, live coding, and system design interviews.',
    goal: 'Structure your interview preparation systematically to pass junior, mid-level, and senior .NET engineering assessments.',
    explanation: `
### The 4 Stages of a Modern .NET Technical Hiring Process
1. **Screening Round (Recruiter / Lead)**:
   - Evaluates basic technical literacy: .NET versions, projects built, resume authenticity.
2. **Technical Deep-Dive (Senior Engineer)**:
   - Concepts: Value vs Reference types, Garbage Collection generations, async/await mechanics, Captive Dependencies in DI, and N+1 queries in EF Core.
3. **Live Coding / Take-Home Assignment**:
   - Building a small RESTful endpoint, parsing JSON, implementing a business domain model with validation, or solving string/array algorithmic challenges.
4. **System Design & Architecture (Engineering Manager / Director)**:
   - Clean Architecture, choosing Monolith vs Microservices, caching with Redis, resilience, and cloud deployments on Azure/AWS.
    `,
    analogy: {
      realWorldScenario: 'Auditioning for a symphony orchestra.',
      techMapping: 'They don’t just ask if you can read sheet music (theory). They ask you to play scales (live coding), perform a duet with others (behavioral pair programming), and explain your interpretation of the piece (system design).'
    },
    codeSnippet: {
      code: `// Sample Clean Interview Take-Home Endpoint (Minimal API)
app.MapGet("/api/v1/health", () => Results.Ok(new
{
    status = "Healthy",
    timestamp = DateTime.UtcNow,
    engine = "Karmatix .NET Academy"
}));
`,
      language: 'csharp',
      filename: 'InterviewTakeHome.cs',
      samplePath: 'Module05_AspNetCore/MinimalApiDemo'
    },
    walkthrough: [
      { step: 'Study Theory with Depth', detail: 'Review the 200+ interview Q&A in the Career Hub section, focusing on WHY things work.' },
      { step: 'Solve Coding Katas', detail: 'Practice the 50+ coding problems on strings, arrays, and LINQ.' },
      { step: 'Complete Timed Mock Tests', detail: 'Take the 6 timed mock tests to build test-taking speed.' },
      { step: 'Showcase Live Capstones', detail: 'Deploy at least 2 capstones with public URLs and green CI badges.' }
    ],
    commonMistakes: [
      {
        mistake: 'Memorizing interview answers without understanding the underlying mechanics.',
        whyItFails: 'Interviewers quickly ask follow-up questions ("What happens if memory is low?" or "Why does that cause a deadlock?"), exposing superficial memorization.',
        fix: 'Understand the underlying CLR, memory, and pipeline mechanics.'
      }
    ],
    practiceTask: {
      title: 'Practice Explaining Async/Await Out Loud',
      task: 'Practice explaining to a peer or recording yourself: "Does async/await create a new thread in C#?" for 2 minutes using clear analogies.',
      hints: ['State machine', 'I/O completion port', 'Thread pool freeing'],
      solutionCode: `// Key points to say:
// 1. No, it does not create a thread for I/O.
// 2. The compiler generates a state machine.
// 3. The current thread returns to the thread pool while waiting for I/O.
// 4. Thread pool thread resumes execution when the OS interrupt arrives.`
    },
    quiz: [
      {
        question: 'What is the most convincing proof of technical competence you can present in an interview?',
        options: ['A laminated certificate only', 'A public GitHub repository with tested code, clean architecture, green CI, and a live deployed demo API', 'A list of 50 programming books read', 'A high LinkedIn follower count'],
        correctIndex: 1,
        explanation: 'Tangible proof of craftsmanship (tested repositories with automated CI and live deployments) is the highest leverage asset in hiring.'
      }
    ]
  }
];

