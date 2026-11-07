namespace Karmatix.Academy.Capstones.BankInventory;

public record Transaction(Guid Id, decimal Amount, string Description, DateTime Timestamp);

public class BankAccount
{
    public string AccountNumber { get; }
    public string OwnerName { get; }
    public decimal Balance { get; private set; }
    public List<Transaction> History { get; } = [];

    public BankAccount(string accountNumber, string ownerName, decimal initialDeposit)
    {
        if (initialDeposit < 0) throw new ArgumentException("Initial deposit cannot be negative.");
        AccountNumber = accountNumber;
        OwnerName = ownerName;
        Balance = initialDeposit;
        History.Add(new Transaction(Guid.NewGuid(), initialDeposit, "Initial Deposit", DateTime.UtcNow));
    }

    public void Deposit(decimal amount, string note)
    {
        if (amount <= 0) throw new ArgumentException("Deposit amount must be positive.");
        Balance += amount;
        History.Add(new Transaction(Guid.NewGuid(), amount, note, DateTime.UtcNow));
    }

    public void Withdraw(decimal amount, string note)
    {
        if (amount <= 0) throw new ArgumentException("Withdrawal amount must be positive.");
        if (amount > Balance) throw new InvalidOperationException("Insufficient funds.");
        Balance -= amount;
        History.Add(new Transaction(Guid.NewGuid(), -amount, note, DateTime.UtcNow));
    }
}

public class InventoryItem
{
    public int Id { get; init; }
    public required string Sku { get; init; }
    public required string Name { get; init; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}

public class InventoryManager
{
    private readonly Dictionary<string, InventoryItem> _items = [];

    public void AddOrUpdateItem(InventoryItem item)
    {
        _items[item.Sku] = item;
    }

    public bool DeductStock(string sku, int count)
    {
        if (_items.TryGetValue(sku, out var item) && item.Quantity >= count)
        {
            item.Quantity -= count;
            return true;
        }
        return false;
    }

    public IEnumerable<InventoryItem> GetAll() => _items.Values;
}

public static class Program
{
    public static void Main()
    {
        Console.WriteLine("=====================================================");
        Console.WriteLine(" Capstone 1: Bank & Inventory Enterprise Console App");
        Console.WriteLine("=====================================================");

        // 1. Banking transactions
        var account = new BankAccount("KX-88910", "Aarav Sharma", 1000.00m);
        account.Deposit(250.00m, "Direct Deposit - Stipend");
        account.Withdraw(120.00m, "Books Purchase");

        Console.WriteLine($"Account: {account.AccountNumber} | Owner: {account.OwnerName}");
        Console.WriteLine($"Current Balance: ${account.Balance:F2}");
        Console.WriteLine($"Transaction Count: {account.History.Count}");

        // 2. Inventory management
        var inventory = new InventoryManager();
        inventory.AddOrUpdateItem(new InventoryItem
        {
            Id = 1,
            Sku = "KX-BOOK-01",
            Name = "Clean Architecture in C# 14",
            Quantity = 25,
            UnitPrice = 45.00m
        });

        bool success = inventory.DeductStock("KX-BOOK-01", 3);
        Console.WriteLine($"Stock Deduction of 3 units successful: {success}");

        var item = inventory.GetAll().First();
        Console.WriteLine($"Remaining Stock for {item.Name}: {item.Quantity} units");
        Console.WriteLine("Capstone 1 completed successfully.");
    }
}

