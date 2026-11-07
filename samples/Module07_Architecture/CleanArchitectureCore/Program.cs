namespace Karmatix.Academy.Module07;

// ==========================================
// 1. DOMAIN LAYER (Zero external dependencies)
// ==========================================

// Value Object: Email (Encapsulates validity)
public readonly record struct EmailAddress
{
    public string Value { get; }

    public EmailAddress(string value)
    {
        if (string.IsNullOrWhiteSpace(value) || !value.Contains('@'))
            throw new ArgumentException("Invalid email format.", nameof(value));
        Value = value.ToLowerInvariant();
    }

    public override string ToString() => Value;
}

// Domain Entity
public class AcademyEnrollment
{
    public Guid Id { get; private set; }
    public EmailAddress StudentEmail { get; private set; }
    public string CourseSlug { get; private set; }
    public DateTime EnrolledAt { get; private set; }
    public bool IsActive { get; private set; }

    public AcademyEnrollment(EmailAddress studentEmail, string courseSlug)
    {
        Id = Guid.NewGuid();
        StudentEmail = studentEmail;
        CourseSlug = courseSlug;
        EnrolledAt = DateTime.UtcNow;
        IsActive = true;
    }

    public void Cancel()
    {
        IsActive = false;
    }
}

// Domain Repository Interface Contract
public interface IEnrollmentRepository
{
    Task<AcademyEnrollment?> GetByIdAsync(Guid id);
    Task AddAsync(AcademyEnrollment enrollment);
}

// ==========================================
// 2. APPLICATION LAYER (Use Cases & DTOs)
// ==========================================

public record EnrollStudentCommand(string Email, string CourseSlug);
public record EnrollmentDto(Guid Id, string Email, string CourseSlug, bool IsActive);

public class EnrollStudentUseCase
{
    private readonly IEnrollmentRepository _repository;

    public EnrollStudentUseCase(IEnrollmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<EnrollmentDto> ExecuteAsync(EnrollStudentCommand command)
    {
        var email = new EmailAddress(command.Email);
        var enrollment = new AcademyEnrollment(email, command.CourseSlug);
        await _repository.AddAsync(enrollment);

        return new EnrollmentDto(
            enrollment.Id,
            enrollment.StudentEmail.Value,
            enrollment.CourseSlug,
            enrollment.IsActive
        );
    }
}

// ==========================================
// 3. IN-MEMORY INFRASTRUCTURE ADAPTER
// ==========================================

public class InMemoryEnrollmentRepository : IEnrollmentRepository
{
    private readonly Dictionary<Guid, AcademyEnrollment> _store = [];

    public Task<AcademyEnrollment?> GetByIdAsync(Guid id)
    {
        _store.TryGetValue(id, out var item);
        return Task.FromResult(item);
    }

    public Task AddAsync(AcademyEnrollment enrollment)
    {
        _store[enrollment.Id] = enrollment;
        return Task.CompletedTask;
    }
}

public static class Program
{
    public static async Task Main()
    {
        Console.WriteLine("--- Module 7: Clean Architecture & Domain Design Lab ---");

        var repo = new InMemoryEnrollmentRepository();
        var useCase = new EnrollStudentUseCase(repo);

        var result = await useCase.ExecuteAsync(new EnrollStudentCommand("developer@karmatix.in", "csharp-fundamentals"));

        Console.WriteLine($"[Clean Architecture] Student Enrolled: {result.Email} into {result.CourseSlug}");
        Console.WriteLine($"Enrollment Id: {result.Id} | Active: {result.IsActive}");
        Console.WriteLine("Clean Architecture executed cleanly.");
    }
}

