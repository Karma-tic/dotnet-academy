using System.Text;

namespace Karmatix.Academy.Module01;

// Custom Domain Exception
public class InvalidAgeException : Exception
{
    public InvalidAgeException(string message) : base(message) { }
}

public static class Program
{
    public static void Main()
    {
        Console.WriteLine("--- Module 1: C# Fundamentals Lab ---");

        // 1. Types & Collection Expressions
        int age = 24;
        string? candidateName = "Alex Sharma";
        int[] numbers = [10, 20, 30, 40, 50]; // C# 12+ collection expression
        List<string> skills = ["C# 14", ".NET 10", "ASP.NET Core", "EF Core"];

        // 2. Pattern Matching & Switch Expression
        string seniority = age switch
        {
            < 18 => throw new InvalidAgeException("Candidate must be an adult."),
            >= 18 and < 22 => "Junior Trainee",
            >= 22 and < 30 => "Software Engineer",
            _ => "Senior / Principal Architect"
        };

        // 3. StringBuilder for high performance
        var sb = new StringBuilder();
        sb.Append($"Candidate: {candidateName} | Level: {seniority} | Skills: ");
        sb.Append(string.Join(", ", skills));

        // 4. Modern DateOnly & TimeOnly
        DateOnly startDate = new(2026, 11, 15);
        TimeOnly standupTime = new(9, 30);

        Console.WriteLine(sb.ToString());
        Console.WriteLine($"Start Date: {startDate:yyyy-MM-dd} at {standupTime:HH:mm}");
        Console.WriteLine($"Total Skills Count: {CalculateTotalSkills(skills)}");
        Console.WriteLine("Fundamentals lab executed cleanly.");
    }

    // Local function demonstration
    public static int CalculateTotalSkills(IReadOnlyList<string> items)
    {
        return items.Count;
    }
}
