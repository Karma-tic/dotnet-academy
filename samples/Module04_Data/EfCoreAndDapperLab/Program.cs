using Microsoft.EntityFrameworkCore;
using Dapper;

namespace Karmatix.Academy.Module04;

public class Student
{
    public int Id { get; set; }
    public required string FullName { get; set; }
    public required string Email { get; set; }
    public List<CourseEnrollment> Enrollments { get; set; } = [];
}

public class CourseEnrollment
{
    public int Id { get; set; }
    public required string CourseName { get; set; }
    public int StudentId { get; set; }
    public Student? Student { get; set; }
}

public class AcademyDbContext : DbContext
{
    public DbSet<Student> Students => Set<Student>();
    public DbSet<CourseEnrollment> Enrollments => Set<CourseEnrollment>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Use an in-memory SQLite database connection for immediate execution without disk dependency
        optionsBuilder.UseSqlite("Data Source=:memory:");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>(builder =>
        {
            builder.HasKey(s => s.Id);
            builder.HasIndex(s => s.Email).IsUnique();
            builder.Property(s => s.FullName).HasMaxLength(100).IsRequired();
            builder.HasMany(s => s.Enrollments)
                   .WithOne(e => e.Student)
                   .HasForeignKey(e => e.StudentId)
                   .OnDelete(DeleteBehavior.Cascade);
        });
    }
}

public static class Program
{
    public static async Task Main()
    {
        Console.WriteLine("--- Module 4: Entity Framework Core & Dapper Data Access Lab ---");

        using var db = new AcademyDbContext();
        await db.Database.OpenConnectionAsync();
        await db.Database.EnsureCreatedAsync();

        // 1. Insert Entities
        var student = new Student
        {
            FullName = "Rohan Verma",
            Email = "rohan@karmatix.in",
            Enrollments =
            [
                new() { CourseName = "C# 14 Mastery" },
                new() { CourseName = ".NET 10 Web APIs" }
            ]
        };

        db.Students.Add(student);
        await db.SaveChangesAsync();

        // 2. EF Core Eager Loading (.Include) with .AsNoTracking()
        var retrievedStudent = await db.Students
            .AsNoTracking()
            .Include(s => s.Enrollments)
            .FirstOrDefaultAsync(s => s.Email == "rohan@karmatix.in");

        if (retrievedStudent != null)
        {
            Console.WriteLine($"[EF Core] Loaded: {retrievedStudent.FullName} with {retrievedStudent.Enrollments.Count} enrollments.");
        }

        // 3. High-Performance Raw SQL with Dapper on same connection
        var connection = db.Database.GetDbConnection();
        var dapperResult = await connection.QueryAsync<Student>(
            "SELECT Id, FullName, Email FROM Students WHERE Email = @Email",
            new { Email = "rohan@karmatix.in" }
        );

        var firstDapper = dapperResult.FirstOrDefault();
        if (firstDapper != null)
        {
            Console.WriteLine($"[Dapper Micro-ORM] Direct SQL mapped student: {firstDapper.FullName} (ID: {firstDapper.Id})");
        }

        Console.WriteLine("Data access patterns executed successfully.");
    }
}

