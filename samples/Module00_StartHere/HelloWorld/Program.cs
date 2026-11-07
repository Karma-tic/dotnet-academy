namespace Karmatix.Academy.Module00;

public static class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("==================================================");
        Console.WriteLine(" Welcome to Karmatix .NET Academy");
        Console.WriteLine(" Learn .NET the clear way (https://karmatix.in)");
        Console.WriteLine("==================================================");
        Console.WriteLine($"Runtime Version: {Environment.Version}");
        Console.WriteLine($"Operating System: {Environment.OSVersion}");
        Console.WriteLine($"64-Bit Process: {Environment.Is64BitProcess}");
        Console.WriteLine($"Machine Name: {Environment.MachineName}");
        Console.WriteLine("First console project compiled and executed successfully!");
    }
}

