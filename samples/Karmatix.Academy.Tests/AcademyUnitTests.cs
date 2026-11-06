using Xunit;
using Karmatix.Academy.Module01;
using Karmatix.Academy.Module02;
using Karmatix.Academy.Module06;
using Karmatix.Academy.Module07;
using Karmatix.Academy.Capstones.BankInventory;
using Karmatix.Academy.Capstones.TaskManager;

namespace Karmatix.Academy.Tests;

public class AcademyUnitTests
{
    [Fact]
    public void Module01_CalculateTotalSkills_ReturnsCorrectCount()
    {
        List<string> skills = ["C# 14", ".NET 10", "EF Core"];
        int count = Karmatix.Academy.Module01.Program.CalculateTotalSkills(skills);
        Assert.Equal(3, count);
    }

    [Fact]
    public void Module02_DiscountStrategy_GoldMemberReceivesFifteenPercentOff()
    {
        var strategy = DiscountStrategyFactory.Create("Gold");
        decimal originalPrice = 100.00m;
        decimal discountedPrice = strategy.ApplyDiscount(originalPrice);

        Assert.Equal(85.00m, discountedPrice);
    }

    [Fact]
    public void Module02_OrderBuilder_CalculatesFinalAmountCorrectly()
    {
        var customer = new Customer(1, "Test Customer", "Standard");
        var strategy = DiscountStrategyFactory.Create(customer.Tier);

        var order = new OrderBuilder()
            .WithCustomer(customer)
            .AddProduct(new Product { Id = 1, Name = "Item A", Price = 25m })
            .AddProduct(new Product { Id = 2, Name = "Item B", Price = 75m })
            .Build(strategy);

        Assert.Equal(100m, order.FinalAmount);
        Assert.Equal(2, order.Items.Count);
    }

    [Fact]
    public void Module06_PasswordHasher_CorrectlyHashesAndValidates()
    {
        string raw = "KarmatixPass2026!";
        string hash = PasswordHasher.HashPassword(raw);

        Assert.True(PasswordHasher.VerifyPassword(raw, hash));
        Assert.False(PasswordHasher.VerifyPassword("WrongPassword!", hash));
    }

    [Fact]
    public async Task Module07_EnrollStudentUseCase_SuccessfullyPersistsEnrollment()
    {
        var repo = new InMemoryEnrollmentRepository();
        var useCase = new EnrollStudentUseCase(repo);

        var dto = await useCase.ExecuteAsync(new EnrollStudentCommand("student@karmatix.in", "csharp-14"));

        Assert.NotNull(dto);
        Assert.True(dto.IsActive);
        Assert.Equal("student@karmatix.in", dto.Email);

        var fromRepo = await repo.GetByIdAsync(dto.Id);
        Assert.NotNull(fromRepo);
        Assert.Equal("csharp-14", fromRepo.CourseSlug);
    }

    [Fact]
    public void Capstone1_BankAccount_DepositAndWithdraw_UpdatesBalanceAccurately()
    {
        var account = new BankAccount("KX-TEST-01", "Jane Doe", 500m);
        account.Deposit(200m, "Bonus");
        account.Withdraw(150m, "Groceries");

        Assert.Equal(550m, account.Balance);
        Assert.Equal(3, account.History.Count);
    }

    [Fact]
    public void Capstone1_BankAccount_WithdrawMoreThanBalance_ThrowsInvalidOperationException()
    {
        var account = new BankAccount("KX-TEST-02", "John Doe", 100m);
        Assert.Throws<InvalidOperationException>(() => account.Withdraw(200m, "Overdraft"));
    }

    [Fact]
    public void Capstone3_TaskManager_CompleteTask_UpdatesStatusAndTimestamp()
    {
        var service = new TaskManagerService();
        var task = service.CreateTask("Test Task", "Desc", TaskPriority.High, "user_42");

        Assert.Equal(TaskItemStatus.Todo, task.Status);
        Assert.Null(task.CompletedAt);

        bool completed = service.CompleteTask(task.Id, "user_42");
        Assert.True(completed);
        Assert.Equal(TaskItemStatus.Completed, task.Status);
        Assert.NotNull(task.CompletedAt);
    }
}
