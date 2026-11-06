import { LessonContent } from '../../components/LessonView';

export const module09Lessons: LessonContent[] = [
  {
    slug: 'desktop-and-mobile-dotnet-ecosystem',
    title: 'Desktop and Mobile in .NET: MAUI, WPF, and WinForms Trade-offs',
    module: 9,
    moduleTitle: 'Desktop and Mobile',
    order: 1,
    duration: 14,
    difficulty: 'Intermediate',
    prerequisites: ['what-is-dotnet-and-csharp'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'An honest, objective evaluation of .NET client technologies: .NET MAUI (cross-platform desktop & mobile), WPF (modern Windows enterprise standard), and WinForms (legacy legacy systems).',
    goal: 'Understand the architectural trade-offs, strengths, and realistic limitations of .NET UI client frameworks.',
    explanation: `
### The .NET Client Landscape
When building client-facing graphical user interfaces in .NET, you have three primary frameworks:

1. **.NET MAUI (Multi-platform App UI)**:
   - **Target**: Android, iOS, macOS (Mac Catalyst), and Windows from a **single C# / XAML codebase**.
   - **Current Status**: Active official cross-platform framework under continuous investment in .NET 9 and .NET 10.
   - **When to Choose**: Cross-platform mobile/desktop requirements where native controls and device hardware integration (GPS, camera) are needed.
   - **Honest Trade-off**: XAML styling and third-party UI ecosystem can be steeper than web hybrid approaches (like MAUI Blazor Hybrid).

2. **WPF (Windows Presentation Foundation)**:
   - **Target**: High-performance, rich desktop applications on **Windows only**.
   - **Current Status**: Extremely mature, rock-solid, and the backbone of banking terminals, medical devices, engineering CAD tools, and trading desks.
   - **When to Choose**: Complex, data-heavy desktop enterprise applications targeting Windows exclusively.
   - **Honest Trade-off**: Does not run on macOS or Linux.

3. **WinForms (Windows Forms)**:
   - **Target**: Legacy Windows desktop applications dating back to 2002.
   - **Current Status**: In maintenance mode (supported on modern .NET for legacy migration, but no major new architectural paradigms).
   - **When to Choose**: Maintaining legacy internal corporate back-office apps. Do NOT use for greenfield projects.
    `,
    analogy: {
      realWorldScenario: 'Choosing transportation for a journey.',
      techMapping: 'WinForms is an old, reliable pickup truck from 2002 (still runs, but dated). WPF is a luxury German sports sedan designed specifically for smooth German highways (Windows only, supreme engineering). .NET MAUI is an amphibious all-terrain vehicle (travels on road, water, and sand across iOS, Android, Mac, and Windows).'
    },
    codeSnippet: {
      code: `// Sample .NET MAUI Cross-Platform Page (C# Markup / XAML Binding)
public class WelcomePage : ContentPage
{
    public WelcomePage()
    {
        Content = new VerticalStackLayout
        {
            Padding = 30,
            Spacing = 15,
            Children =
            {
                new Label
                {
                    Text = "Welcome to Karmatix .NET Academy",
                    FontSize = 24,
                    HorizontalOptions = LayoutOptions.Center
                },
                new Button
                {
                    Text = "Start Exploring",
                    Command = new Command(async () =>
                        await DisplayAlert("Success", "Ready to master .NET 10!", "OK"))
                }
            }
        };
    }
}
`,
      language: 'csharp',
      filename: 'WelcomePage.cs',
      samplePath: 'Module00_StartHere/HelloWorld'
    },
    walkthrough: [
      { step: 'Single Project Architecture', detail: '.NET MAUI projects use a single project file targeting net10.0-android, net10.0-ios, net10.0-maccatalyst, and net10.0-windows.' },
      { step: 'Native Control Rendering', detail: 'Controls render as native UI controls on each respective target OS (e.g. UIButton on iOS, Button on Android).' },
      { step: 'MAUI Blazor Hybrid Option', detail: 'Enables embedding modern web components (HTML/CSS) inside native MAUI shells with zero WebAssembly overhead.' }
    ],
    commonMistakes: [
      {
        mistake: 'Choosing WinForms for a brand-new commercial desktop application in 2026.',
        whyItFails: 'WinForms lacks modern DPI scaling, touch support, hardware acceleration, and cross-platform flexibility.',
        fix: 'Choose WPF for Windows-dedicated enterprise apps or .NET MAUI for cross-platform requirements.'
      }
    ],
    practiceTask: {
      title: 'Compare UI Framework Trade-offs',
      task: 'List the 3 primary .NET UI frameworks and identify which one supports cross-platform iOS and Android deployment.',
      hints: ['.NET MAUI', 'WPF', 'WinForms'],
      solutionCode: `// .NET MAUI is the only one supporting iOS, Android, macOS, and Windows from a single codebase.`
    },
    quiz: [
      {
        question: 'Which .NET UI framework enables targeting Android, iOS, macOS, and Windows from a single C# codebase?',
        options: ['WinForms', 'WPF', '.NET MAUI', 'Silverlight'],
        correctIndex: 2,
        explanation: '.NET MAUI (Multi-platform App UI) is Microsoft’s unified cross-platform client framework.'
      }
    ]
  }
];
