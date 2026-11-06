namespace Karmatix.Academy.Capstones.EcommerceApi;

public record ProductDto(int Id, string Name, string Sku, decimal Price, string Category);
public record CartItemDto(int ProductId, string ProductName, decimal UnitPrice, int Quantity);
public record CartDto(string CartId, List<CartItemDto> Items, decimal Subtotal);
public record PlaceOrderRequest(string CartId, string ShippingAddress);
public record OrderSummaryDto(Guid OrderId, string Status, decimal TotalAmount, DateTime OrderDate);

public class EcommerceStore
{
    private readonly List<ProductDto> _products = [
        new(1, "Modern C# 14 & .NET 10 Guide", "BK-001", 39.99m, "Books"),
        new(2, "Enterprise Microservices Architecture", "BK-002", 49.99m, "Books"),
        new(3, "Mechanical Keychron C# Developer Keyboard", "HW-101", 119.00m, "Hardware"),
        new(4, "Karmatix Academy Hoodie", "AP-201", 55.00m, "Apparel"),
        new(5, "USB-C Dual 4K Display Dock", "HW-102", 189.50m, "Hardware")
    ];

    private readonly Dictionary<string, List<CartItemDto>> _carts = [];
    private readonly List<OrderSummaryDto> _orders = [];

    public IEnumerable<ProductDto> GetProducts(int page, int pageSize, string? category)
    {
        var query = _products.AsEnumerable();
        if (!string.IsNullOrWhiteSpace(category))
            query = query.Where(p => p.Category.Equals(category, StringComparison.OrdinalIgnoreCase));

        return query.Skip((page - 1) * pageSize).Take(pageSize);
    }

    public CartDto AddToCart(string cartId, int productId, int quantity)
    {
        var product = _products.FirstOrDefault(p => p.Id == productId)
            ?? throw new KeyNotFoundException("Product not found.");

        if (!_carts.TryGetValue(cartId, out var items))
        {
            items = [];
            _carts[cartId] = items;
        }

        var existing = items.FirstOrDefault(i => i.ProductId == productId);
        if (existing != null)
        {
            items.Remove(existing);
            items.Add(existing with { Quantity = existing.Quantity + quantity });
        }
        else
        {
            items.Add(new CartItemDto(product.Id, product.Name, product.Price, quantity));
        }

        decimal subtotal = items.Sum(i => i.UnitPrice * i.Quantity);
        return new CartDto(cartId, items, subtotal);
    }

    public OrderSummaryDto Checkout(string cartId)
    {
        if (!_carts.TryGetValue(cartId, out var items) || items.Count == 0)
            throw new InvalidOperationException("Cart is empty.");

        decimal total = items.Sum(i => i.UnitPrice * i.Quantity);
        var order = new OrderSummaryDto(Guid.NewGuid(), "Paid & Confirmed", total, DateTime.UtcNow);
        _orders.Add(order);
        _carts.Remove(cartId); // Clear cart upon successful order
        return order;
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddSingleton<EcommerceStore>();
        builder.Services.AddEndpointsApiExplorer();

        var app = builder.Build();

        app.MapGet("/api/products", (EcommerceStore store, int page = 1, int pageSize = 10, string? category = null) =>
        {
            var paged = store.GetProducts(page, pageSize, category);
            return Results.Ok(new { page, pageSize, data = paged });
        });

        app.MapPost("/api/cart/{cartId}/items", (string cartId, int productId, int quantity, EcommerceStore store) =>
        {
            try
            {
                var cart = store.AddToCart(cartId, productId, quantity);
                return Results.Ok(cart);
            }
            catch (KeyNotFoundException)
            {
                return Results.NotFound(new { error = "Product not found." });
            }
        });

        app.MapPost("/api/cart/{cartId}/checkout", (string cartId, EcommerceStore store) =>
        {
            try
            {
                var order = store.Checkout(cartId);
                return Results.Created($"/api/orders/{order.OrderId}", order);
            }
            catch (InvalidOperationException ex)
            {
                return Results.BadRequest(new { error = ex.Message });
            }
        });

        if (args.Length == 0 || args[0] != "--no-run")
        {
            Console.WriteLine("Capstone 4: E-Commerce API Ready.");
        }
    }
}
