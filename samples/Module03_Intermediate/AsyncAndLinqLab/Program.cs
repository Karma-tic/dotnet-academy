using System.Text.Json;
using System.Threading.Channels;

namespace Karmatix.Academy.Module03;

public record CourseModule(int Id, string Title, int LessonsCount, bool IsMandatory);

public static class Program
{
    public static async Task Main()
    {
        Console.WriteLine("--- Module 3: LINQ, Async/Await & Modern BCL Lab ---");

        // 1. LINQ Processing
        List<CourseModule> curriculum = [
            new(0, "Start Here", 5, true),
            new(1, "Fundamentals", 6, true),
            new(2, "OOP & Patterns", 3, true),
            new(3, "Intermediate C#", 4, true),
            new(4, "Data & EF Core", 4, true),
            new(5, "ASP.NET Core Web", 8, true),
            new(6, "Security", 3, true),
            new(7, "Architecture & Testing", 4, true),
            new(8, "DevOps & Cloud", 4, true),
            new(9, "Desktop & Mobile", 2, false),
            new(10, "Career Hub", 5, true),
            new(11, "Capstones", 7, true),
        ];

        var totalMandatoryLessons = curriculum
            .Where(m => m.IsMandatory)
            .Sum(m => m.LessonsCount);

        var topHeavyModules = curriculum
            .OrderByDescending(m => m.LessonsCount)
            .Take(3)
            .Select(m => $"{m.Title} ({m.LessonsCount} lessons)");

        Console.WriteLine($"Total Mandatory Lessons: {totalMandatoryLessons}");
        Console.WriteLine($"Top Heavy Modules: {string.Join(", ", topHeavyModules)}");

        // 2. High-performance JSON serialization
        var jsonOptions = new JsonSerializerOptions
        {
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };
        string json = JsonSerializer.Serialize(curriculum.Take(2), jsonOptions);
        Console.WriteLine("Serialized JSON Preview:");
        Console.WriteLine(json);

        // 3. Channels: Producer-Consumer Asynchronous Processing
        var channel = Channel.CreateBounded<string>(5);
        var producer = Task.Run(async () =>
        {
            for (int i = 1; i <= 3; i++)
            {
                await channel.Writer.WriteAsync($"Message #{i} from background publisher");
                await Task.Delay(20);
            }
            channel.Writer.Complete();
        });

        var consumer = Task.Run(async () =>
        {
            await foreach (var msg in channel.Reader.ReadAllAsync())
            {
                Console.WriteLine($"[Channel Consumer] Received: {msg}");
            }
        });

        await Task.WhenAll(producer, consumer);

        // 4. Zero-allocation Span<T> slicing
        ReadOnlySpan<char> sourceText = "Karmatix .NET Academy".AsSpan();
        ReadOnlySpan<char> brandSlice = sourceText.Slice(0, 8); // "Karmatix" without allocations
        Console.WriteLine($"Span Slice (Zero Allocations): {brandSlice.ToString()}");

        Console.WriteLine("Module 3 Lab completed cleanly.");
    }
}
