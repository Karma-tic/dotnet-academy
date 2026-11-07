using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Karmatix.Academy.Capstones.StudentApi;

public class StudentEntity
{
    public int Id { get; set; }
    public required string FullName { get; set; }
    public required string Email { get; set; }
    public string Major { get; set; } = "Computer Science";
    public double Gpa { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class StudentDbContext : DbContext
{
    public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options) { }
    public DbSet<StudentEntity> Students => Set<StudentEntity>();
}

public record CreateStudentDto(
    [Required, StringLength(100, MinimumLength = 2)] string FullName,
    [Required, EmailAddress] string Email,
    [Required] string Major,
    [Range(0.0, 4.0)] double Gpa
);

public record StudentDto(int Id, string FullName, string Email, string Major, double Gpa, DateTime CreatedAt);

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<StudentDbContext>(opt =>
            opt.UseSqlite("Data Source=students_academy.db"));
        builder.Services.AddEndpointsApiExplorer();

        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<StudentDbContext>();
            db.Database.EnsureCreated();
        }

        // Endpoints
        app.MapGet("/api/students", async (StudentDbContext db) =>
        {
            var students = await db.Students
                .AsNoTracking()
                .Select(s => new StudentDto(s.Id, s.FullName, s.Email, s.Major, s.Gpa, s.CreatedAt))
                .ToListAsync();
            return Results.Ok(students);
        });

        app.MapGet("/api/students/{id:int}", async (int id, StudentDbContext db) =>
        {
            var student = await db.Students
                .AsNoTracking()
                .Where(s => s.Id == id)
                .Select(s => new StudentDto(s.Id, s.FullName, s.Email, s.Major, s.Gpa, s.CreatedAt))
                .FirstOrDefaultAsync();

            return student is not null ? Results.Ok(student) : Results.NotFound();
        });

        app.MapPost("/api/students", async (CreateStudentDto dto, StudentDbContext db) =>
        {
            var exists = await db.Students.AnyAsync(s => s.Email == dto.Email);
            if (exists)
            {
                return Results.Conflict(new { error = "A student with this email address already exists." });
            }

            var entity = new StudentEntity
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Major = dto.Major,
                Gpa = dto.Gpa
            };

            db.Students.Add(entity);
            await db.SaveChangesAsync();

            var responseDto = new StudentDto(entity.Id, entity.FullName, entity.Email, entity.Major, entity.Gpa, entity.CreatedAt);
            return Results.Created($"/api/students/{entity.Id}", responseDto);
        });

        app.MapDelete("/api/students/{id:int}", async (int id, StudentDbContext db) =>
        {
            var rowsAffected = await db.Students.Where(s => s.Id == id).ExecuteDeleteAsync();
            return rowsAffected > 0 ? Results.NoContent() : Results.NotFound();
        });

        if (args.Length == 0 || args[0] != "--no-run")
        {
            Console.WriteLine("Capstone 2: Student API Configured.");
        }
    }
}

