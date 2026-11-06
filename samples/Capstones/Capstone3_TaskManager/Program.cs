namespace Karmatix.Academy.Capstones.TaskManager;

public enum TaskPriority { Low, Medium, High, Urgent }
public enum TaskItemStatus { Todo, InProgress, Completed }

public class TaskItem
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public required string Title { get; set; }
    public string? Description { get; set; }
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    public TaskItemStatus Status { get; set; } = TaskItemStatus.Todo;
    public string AssignedToUserId { get; set; } = string.Empty;
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; private set; }

    public void MarkCompleted()
    {
        Status = TaskItemStatus.Completed;
        CompletedAt = DateTime.UtcNow;
    }
}

public class TaskManagerService
{
    private readonly List<TaskItem> _tasks = [];

    public TaskItem CreateTask(string title, string? desc, TaskPriority priority, string userId)
    {
        if (string.IsNullOrWhiteSpace(title)) throw new ArgumentException("Title cannot be empty.");
        var task = new TaskItem
        {
            Title = title,
            Description = desc,
            Priority = priority,
            AssignedToUserId = userId
        };
        _tasks.Add(task);
        return task;
    }

    public IEnumerable<TaskItem> GetUserTasks(string userId) =>
        _tasks.Where(t => t.AssignedToUserId == userId);

    public bool CompleteTask(Guid taskId, string userId)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == taskId && t.AssignedToUserId == userId);
        if (task == null) return false;
        task.MarkCompleted();
        return true;
    }
}

public static class Program
{
    public static void Main()
    {
        Console.WriteLine("==================================================");
        Console.WriteLine(" Capstone 3: Task Manager Core & Identity Logic");
        Console.WriteLine("==================================================");

        var service = new TaskManagerService();
        var task1 = service.CreateTask("Deploy .NET 10 API to Azure", "Set up container apps and key vault", TaskPriority.Urgent, "user_01");
        var task2 = service.CreateTask("Write xUnit Integration Tests", "Cover WebApplicationFactory tests", TaskPriority.High, "user_01");

        service.CompleteTask(task1.Id, "user_01");

        var userTasks = service.GetUserTasks("user_01").ToList();
        Console.WriteLine($"Total tasks for user_01: {userTasks.Count}");
        Console.WriteLine($"Task 1 Status: {task1.Status} (Completed At: {task1.CompletedAt})");
        Console.WriteLine($"Task 2 Status: {task2.Status}");
        Console.WriteLine("Capstone 3 logic verified.");
    }
}
