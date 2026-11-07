import { LessonContent } from '../../components/LessonView';

export const module02Lessons: LessonContent[] = [
  {
    slug: 'classes-objects-and-encapsulation',
    title: 'Classes, Objects, and Encapsulation',
    module: 2,
    moduleTitle: 'Object-Oriented C#',
    order: 1,
    duration: 15,
    difficulty: 'Beginner',
    prerequisites: ['variables-types-and-nullability'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Master the building blocks of OOP: classes as blueprints, objects as instances, constructors, property encapsulation, and auto-properties.',
    goal: 'Design robust classes that protect internal state from invalid mutation using private setters and validation in properties.',
    explanation: `
### What is a Class vs an Object?
- A **Class** is the architectural blueprint defining properties and behaviors.
- An **Object** is a concrete instance allocated in heap memory created via the \`new\` keyword.

### Encapsulation: The Core Shield of OOP
Encapsulation means keeping internal fields \`private\` and exposing them only through controlled \`public\` properties or methods. Never make fields public!

\`\`\`csharp
public class BankAccount
{
    // Backing private field or auto-property with private setter
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentException("Amount must be positive.");
        Balance += amount;
    }
}
\`\`\`
By using \`private set\`, outside code cannot accidentally do \`account.Balance = -99999m;\`.
    `,
    analogy: {
      realWorldScenario: 'An automatic teller machine (ATM).',
      techMapping: 'The ATM vault contains physical cash (private state). You cannot open the safe doors directly. You interact with the keypad and deposit slot (public interface), which verifies PIN and funds before adjusting money.'
    },
    codeSnippet: {
      code: `public class CustomerAccount
{
    public int Id { get; init; }
    public required string FullName { get; set; }
    public decimal Balance { get; private set; }

    public CustomerAccount(int id, string fullName, decimal openingDeposit)
    {
        if (openingDeposit < 0)
            throw new ArgumentException("Opening deposit cannot be negative.");

        Id = id;
        FullName = fullName;
        Balance = openingDeposit;
    }

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentException("Must deposit more than 0.");
        Balance += amount;
    }
}
`,
      language: 'csharp',
      filename: 'CustomerAccount.cs',
      samplePath: 'Module02_OOP/DesignPatternsLab'
    },
    walkthrough: [
      { step: 'Init-Only Property', detail: 'public int Id { get; init; } can only be set during construction, guaranteeing immutability afterwards.' },
      { step: 'Required Modifier', detail: '"required string FullName" forces callers to provide a name when instantiating the class.' },
      { step: 'Encapsulated State', detail: 'Balance has a private setter, forbidding direct external manipulation.' },
      { step: 'Domain Invariants', detail: 'Deposit() checks that the amount is strictly positive before modifying the balance.' }
    ],
    commonMistakes: [
      {
        mistake: 'Declaring public fields like "public decimal balance;".',
        whyItFails: 'Any external code can directly set balance = -50000 without validation or event notification.',
        fix: 'Always use properties with private setters or init-only accessors.'
      }
    ],
    practiceTask: {
      title: 'Build a Secure Thermostat Class',
      task: 'Create a Thermostat class with a CurrentTemperature property (private set) and a SetTemperature(double temp) method that throws an exception if the temperature is below -50 or above 150 Celsius.',
      hints: ['Check boundaries inside SetTemperature', 'Store value in private set property'],
      solutionCode: `public class Thermostat
{
    public double CurrentTemperature { get; private set; } = 20.0;

    public void SetTemperature(double temp)
    {
        if (temp < -50 || temp > 150)
            throw new ArgumentOutOfRangeException(nameof(temp), "Temperature out of safe range.");
        CurrentTemperature = temp;
    }
}`
    },
    quiz: [
      {
        question: 'Why is encapsulation considered a vital principle in commercial software engineering?',
        options: ['It makes code compile in under 1 second', 'It protects internal object state and enforces business rules and validation', 'It disables memory garbage collection', 'It replaces database backups'],
        correctIndex: 1,
        explanation: 'Encapsulation shields an object’s internal state from unintended corruption and enforces invariants.'
      }
    ]
  },
  {
    slug: 'interfaces-polymorphism-and-solid',
    title: 'Interfaces, Polymorphism, and SOLID Principles',
    module: 2,
    moduleTitle: 'Object-Oriented C#',
    order: 2,
    duration: 20,
    difficulty: 'Intermediate',
    prerequisites: ['classes-objects-and-encapsulation'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Master contracts with interfaces, polymorphic dispatch, and the 5 foundational SOLID principles used in modern .NET systems.',
    goal: 'Decouple high-level business logic from concrete implementations using interfaces and Dependency Inversion.',
    explanation: `
### What is an Interface?
An **Interface** defines a pure capability contract ("what an object can do") without dictating implementation details. 
Classes implement interfaces using the \`:\` syntax.

### The SOLID Principles Explained Simply
- **S - Single Responsibility Principle (SRP)**: A class should do one thing and have only one reason to change.
- **O - Open/Closed Principle (OCP)**: Open for extension (new behaviors), closed for modification (don't break existing tested code). Achieve via interfaces/strategies.
- **L - Liskov Substitution Principle (LSP)**: Any subclass or implementation should be swappable for its base type without breaking correctness.
- **I - Interface Segregation Principle (ISP)**: Prefer many small, focused interfaces rather than one bloated "god" interface.
- **D - Dependency Inversion Principle (DIP)**: High-level modules should depend on abstractions (interfaces), not concrete implementations.
    `,
    analogy: {
      realWorldScenario: 'Standard USB-C ports on electronic devices.',
      techMapping: 'USB-C is the interface. Any device (charger, monitor, keyboard, thumb drive) that conforms to the USB-C contract plugs in seamlessly. Your laptop (high-level code) doesn’t care who manufactured the cable (implementation).'
    },
    codeSnippet: {
      code: `// Strategy Pattern & Dependency Inversion
public interface INotificationService
{
    Task SendAsync(string recipient, string message);
}

public class EmailNotificationService : INotificationService
{
    public Task SendAsync(string recipient, string message)
    {
        Console.WriteLine($"[Email Sent to {recipient}]: {message}");
        return Task.CompletedTask;
    }
}

public class SmsNotificationService : INotificationService
{
    public Task SendAsync(string recipient, string message)
    {
        Console.WriteLine($"[SMS Sent to {recipient}]: {message}");
        return Task.CompletedTask;
    }
}

// Consumer depends ONLY on the abstraction (DIP)
public class OrderNotifier
{
    private readonly INotificationService _notifier;

    public OrderNotifier(INotificationService notifier)
    {
        _notifier = notifier;
    }

    public async Task NotifyCustomerAsync(string user, string orderId)
    {
        await _notifier.SendAsync(user, $"Your order #{orderId} has been confirmed!");
    }
}
`,
      language: 'csharp',
      filename: 'SolidNotificationDemo.cs',
      samplePath: 'Module02_OOP/DesignPatternsLab'
    },
    walkthrough: [
      { step: 'Define Abstraction', detail: 'INotificationService specifies the asynchronous SendAsync contract.' },
      { step: 'Multiple Implementations', detail: 'EmailNotificationService and SmsNotificationService implement the contract in different ways (Polymorphism).' },
      { step: 'Constructor Injection', detail: 'OrderNotifier accepts INotificationService via its constructor, adhering to Dependency Inversion.' },
      { step: 'Testability', detail: 'In unit tests, you can easily substitute a mock notification service without sending real emails.' }
    ],
    commonMistakes: [
      {
        mistake: 'Instantiating concrete classes directly inside business services (e.g. "var notifier = new EmailNotificationService()").',
        whyItFails: 'Tightly couples the class to Email, making it impossible to switch to SMS or mock during unit testing.',
        fix: 'Inject INotificationService via constructor injection.'
      }
    ],
    practiceTask: {
      title: 'Implement Payment Gateway Polymorphism',
      task: 'Define an IPaymentGateway interface with a ProcessPayment(decimal amount) method. Implement CreditCardPaymentGateway and CryptoPaymentGateway, and verify both through the interface.',
      hints: ['Interface return type can be bool', 'Implement classes using : IPaymentGateway'],
      solutionCode: `public interface IPaymentGateway
{
    bool ProcessPayment(decimal amount);
}

public class CreditCardGateway : IPaymentGateway
{
    public bool ProcessPayment(decimal amount) => true;
}

public class UpiGateway : IPaymentGateway
{
    public bool ProcessPayment(decimal amount) => true;
}`
    },
    quiz: [
      {
        question: 'Which SOLID principle advises that high-level modules should depend upon abstractions rather than concrete classes?',
        options: ['Single Responsibility Principle', 'Liskov Substitution Principle', 'Dependency Inversion Principle', 'Interface Segregation Principle'],
        correctIndex: 2,
        explanation: 'The Dependency Inversion Principle (DIP) dictates that systems should rely on interfaces rather than concrete implementations.'
      }
    ]
  }
];

