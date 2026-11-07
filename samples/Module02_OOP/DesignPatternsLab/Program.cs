namespace Karmatix.Academy.Module02;

// 1. Domain Entities & Record
public record Customer(int Id, string Name, string Tier);

public class Product
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public required decimal Price { get; init; }
}

// 2. Strategy Pattern for Discounting (Open/Closed Principle)
public interface IDiscountStrategy
{
    decimal ApplyDiscount(decimal originalPrice);
}

public class StandardDiscountStrategy : IDiscountStrategy
{
    public decimal ApplyDiscount(decimal originalPrice) => originalPrice;
}

public class GoldMemberDiscountStrategy : IDiscountStrategy
{
    public decimal ApplyDiscount(decimal originalPrice) => originalPrice * 0.85m; // 15% off
}

// 3. Factory Pattern
public static class DiscountStrategyFactory
{
    public static IDiscountStrategy Create(string tier) => tier.ToLowerInvariant() switch
    {
        "gold" => new GoldMemberDiscountStrategy(),
        _ => new StandardDiscountStrategy()
    };
}

// 4. Repository Pattern
public interface IRepository<T> where T : class
{
    void Add(T entity);
    IEnumerable<T> GetAll();
}

public class InMemoryRepository<T> : IRepository<T> where T : class
{
    private readonly List<T> _storage = [];

    public void Add(T entity) => _storage.Add(entity);
    public IEnumerable<T> GetAll() => _storage.AsReadOnly();
}

// 5. Builder Pattern
public class Order
{
    public int OrderId { get; set; }
    public Customer? Customer { get; set; }
    public List<Product> Items { get; } = [];
    public decimal FinalAmount { get; set; }
}

public class OrderBuilder
{
    private readonly Order _order = new();

    public OrderBuilder WithCustomer(Customer customer)
    {
        _order.Customer = customer;
        return this;
    }

    public OrderBuilder AddProduct(Product product)
    {
        _order.Items.Add(product);
        return this;
    }

    public Order Build(IDiscountStrategy discountStrategy)
    {
        decimal subtotal = 0;
        foreach (var item in _order.Items)
        {
            subtotal += item.Price;
        }
        _order.FinalAmount = discountStrategy.ApplyDiscount(subtotal);
        return _order;
    }
}

public static class Program
{
    public static void Main()
    {
        Console.WriteLine("--- Module 2: Object-Oriented C# & Design Patterns Lab ---");

        var customer = new Customer(101, "Priya Patel", "Gold");
        var discountStrategy = DiscountStrategyFactory.Create(customer.Tier);

        var p1 = new Product { Id = 1, Name = "C# 14 Mastery Guide", Price = 50.00m };
        var p2 = new Product { Id = 2, Name = ".NET 10 Enterprise Course", Price = 150.00m };

        var order = new OrderBuilder()
            .WithCustomer(customer)
            .AddProduct(p1)
            .AddProduct(p2)
            .Build(discountStrategy);

        var orderRepo = new InMemoryRepository<Order>();
        orderRepo.Add(order);

        Console.WriteLine($"Order Placed for {customer.Name} ({customer.Tier})");
        Console.WriteLine($"Items Count: {order.Items.Count}");
        Console.WriteLine($"Total Amount after Discount: ${order.FinalAmount:F2}");
        Console.WriteLine("All OOP patterns executed cleanly.");
    }
}

