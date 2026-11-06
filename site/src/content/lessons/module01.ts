import { LessonContent } from '../../components/LessonView';

export const module01Lessons: LessonContent[] = [
  {
    slug: 'variables-types-and-nullability',
    title: 'Variables, Types, and Nullable Reference Types',
    module: 1,
    moduleTitle: 'C# Fundamentals',
    order: 1,
    duration: 12,
    difficulty: 'Beginner',
    prerequisites: ['what-is-dotnet-and-csharp'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Master foundational primitive types (int, double, bool, decimal), string interpolation, var keyword, constants, and Nullable Reference Types in C# 14.',
    goal: 'Declare, initialize, and use primitive value types safely while preventing NullReferenceExceptions through Nullable Reference Types.',
    explanation: `
### Static Typing and Strongly-Typed Safety
C# is a **strongly-typed, statically-typed language**. Every variable has a known type at compile time.

- **\`int\` (32-bit integer)**: Whole numbers like 42, -100.
- **\`double\` (64-bit floating point)**: Scientific math numbers. Fast, but subject to binary floating-point rounding.
- **\`decimal\` (128-bit high-precision)**: Financial, monetary values like currency (\$19.99). **Always use decimal for money!**
- **\`bool\`**: Logical \`true\` or \`false\`.
- **\`string\`**: Immutable sequence of UTF-16 characters.

### Nullable Reference Types (NRT)
In legacy C#, any string could be \`null\`, causing frequent \`NullReferenceException\` crashes at runtime. Modern C# enables **Nullable Reference Types**:
- \`string name = "Karmatix";\` -> Non-nullable. The compiler forbids assigning null.
- \`string? nickname = null;\` -> Explicitly nullable. The compiler forces you to check before accessing properties (\`nickname?.Length\`).
    `,
    analogy: {
      realWorldScenario: 'Filling out a passport application form.',
      techMapping: 'Fields marked mandatory (like your Legal Name) cannot be left blank (non-nullable string). Fields marked optional (like Middle Name) can be blank (string? with null).'
    },
    codeSnippet: {
      code: `// Value types (stack allocated)
int userAge = 28;
decimal productPrice = 49.99m; // Notice 'm' suffix for decimal
bool isSubscribed = true;

// String interpolation with formatting
string customerName = "Aanya Rao";
string? promoCode = null; // Explicitly nullable

Console.WriteLine($"Customer: {customerName}, Price: {productPrice:C}");

// Safe null navigation
int promoLength = promoCode?.Length ?? 0;
Console.WriteLine($"Promo Code Length: {promoLength}");
`,
      language: 'csharp',
      filename: 'VariablesDemo.cs',
      samplePath: 'Module01_Fundamentals/FundamentalsLab'
    },
    walkthrough: [
      { step: 'Value Type Declaration', detail: 'int userAge and decimal productPrice store raw bytes directly where declared.' },
      { step: 'Currency Suffix', detail: 'Decimal numbers require the "m" suffix (e.g., 49.99m) so the compiler creates a 128-bit high precision decimal.' },
      { step: 'String Interpolation', detail: 'Prefixing string with "$" enables {variable} placeholders with culture-aware formatting ({productPrice:C}).' },
      { step: 'Null Coalescing', detail: 'The "?." safe operator and "??" null-coalescing operator return a safe fallback value if the reference is null.' }
    ],
    commonMistakes: [
      {
        mistake: 'Using double or float for financial/currency calculations.',
        whyItFails: 'Binary floating-point types cannot represent base-10 fractions like 0.1 exactly, introducing cumulative rounding errors ($0.1 + $0.2 != $0.3).',
        fix: 'Always use the decimal type (suffix m) for money, prices, and accounting.'
      }
    ],
    practiceTask: {
      title: 'Calculate Financial Discount Safely',
      task: 'Declare an original price of $120.50m, apply a 15% discount, and print the formatted price using string interpolation currency formatting.',
      hints: ['Use decimal type: 120.50m', 'Multiply by 0.85m', 'Use {discountedPrice:C} for currency output'],
      solutionCode: `decimal originalPrice = 120.50m;
decimal finalPrice = originalPrice * 0.85m;
Console.WriteLine($"Discounted Price: {finalPrice:C}");`
    },
    quiz: [
      {
        question: 'Which C# data type should always be used for financial and monetary calculations?',
        options: ['double', 'float', 'decimal', 'int'],
        correctIndex: 2,
        explanation: 'decimal provides 128-bit base-10 precision, eliminating binary floating-point rounding errors.'
      },
      {
        question: 'What does the "??" operator do in C#?',
        options: ['Multiplies two numbers', 'Returns the left operand if not null; otherwise evaluates and returns the right operand', 'Throws an exception', 'Checks if two objects are equal'],
        correctIndex: 1,
        explanation: 'The null-coalescing operator (??) provides a fallback value when the left-hand expression evaluates to null.'
      }
    ]
  },
  {
    slug: 'control-flow-and-pattern-matching',
    title: 'Conditions, Loops, and Modern Pattern Matching',
    module: 1,
    moduleTitle: 'C# Fundamentals',
    order: 2,
    duration: 15,
    difficulty: 'Beginner',
    prerequisites: ['variables-types-and-nullability'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Write expressive control flow using modern switch expressions, relational patterns, property pattern matching, and efficient loops.',
    goal: 'Replace cumbersome nested if/else statements with clean, declarative C# 14 pattern matching and switch expressions.',
    explanation: `
### From Clunky switch statements to Modern Switch Expressions
Legacy switch statements were verbose, error-prone, and required \`case\`, \`break\`, and \`default\`. 

Modern C# features **Switch Expressions**, which treat the switch block as a functional expression that returns a value:

\`\`\`csharp
string status = statusCode switch
{
    200 => "OK",
    201 => "Created",
    400 => "Bad Request",
    404 => "Not Found",
    _ => "Unknown Error" // Discard pattern acts as default
};
\`\`\`

### Relational & Combinator Patterns
You can match values against logical ranges directly:
\`\`\`csharp
string ageGroup = age switch
{
    < 13 => "Child",
    >= 13 and <= 19 => "Teenager",
    >= 20 and < 65 => "Adult",
    _ => "Senior"
};
\`\`\`
    `,
    analogy: {
      realWorldScenario: 'An automated sorting conveyor belt at an express post sorting facility.',
      techMapping: 'Packages glide down the belt. Laser sensors check weight, dimensions, and barcode patterns in a single pass, directing each parcel to its exact sorting bin.'
    },
    codeSnippet: {
      code: `int score = 88;

// Modern C# 14 relational pattern matching expression
string grade = score switch
{
    >= 90 => "A+ (Outstanding)",
    >= 80 and < 90 => "A (Excellent)",
    >= 70 and < 80 => "B (Proficient)",
    >= 60 and < 70 => "C (Satisfactory)",
    _ => "F (Needs Review)"
};

Console.WriteLine($"Score: {score} -> Grade: {grade}");

// Foreach loop over a range
int[] milestones = [25, 50, 75, 100];
foreach (int m in milestones)
{
    Console.WriteLine($"Progress checkpoint: {m}% completed");
}
`,
      language: 'csharp',
      filename: 'PatternMatchingDemo.cs',
      samplePath: 'Module01_Fundamentals/FundamentalsLab'
    },
    walkthrough: [
      { step: 'Switch Expression', detail: 'score switch { ... } evaluates score and immediately returns the mapped grade string.' },
      { step: 'Relational Pattern', detail: '">= 80 and < 90" validates boundaries using the "and" pattern combinator.' },
      { step: 'Discard Pattern', detail: '"_" acts as the fallback default branch, ensuring the switch expression is exhaustive.' },
      { step: 'Foreach Loop', detail: 'Iterates cleanly over the array without manual index counter variables.' }
    ],
    commonMistakes: [
      {
        mistake: 'Missing the fallback discard pattern "_" in a switch expression.',
        whyItFails: 'If an unhandled value is passed at runtime, the CLR throws a SwitchExpressionException.',
        fix: 'Always provide a default "_" discard branch at the end of switch expressions.'
      }
    ],
    practiceTask: {
      title: 'Classify HTTP Response Codes',
      task: 'Write a method using a switch expression that accepts an int statusCode and returns "Success (2xx)", "Client Error (4xx)", "Server Error (5xx)", or "Other".',
      hints: ['Use >= 200 and <= 299', 'Use >= 400 and <= 499'],
      solutionCode: `int code = 404;
string category = code switch
{
    >= 200 and <= 299 => "Success (2xx)",
    >= 400 and <= 499 => "Client Error (4xx)",
    >= 500 and <= 599 => "Server Error (5xx)",
    _ => "Other"
};
Console.WriteLine(category);`
    },
    quiz: [
      {
        question: 'What does the underscore "_" represent in a C# switch expression?',
        options: ['A private variable', 'The default / discard pattern matching any unmatched value', 'An ignored parameter', 'A syntax error'],
        correctIndex: 1,
        explanation: 'The underscore (_) is the discard pattern that acts as the default fallback case.'
      }
    ]
  },
  {
    slug: 'collections-and-expressions',
    title: 'Collections, Lists, Dictionaries, and Collection Expressions',
    module: 1,
    moduleTitle: 'C# Fundamentals',
    order: 3,
    duration: 18,
    difficulty: 'Beginner',
    prerequisites: ['variables-types-and-nullability'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Master arrays, List<T>, Dictionary<TKey, TValue>, HashSet<T>, Queue<T>, Stack<T>, and modern C# collection expressions ([1, 2, 3]).',
    goal: 'Select the optimal data structure for any scenario based on performance characteristics (O(1) vs O(N)).',
    explanation: `
### Choosing the Right Collection
- **Array (\`T[]\`)**: Fixed-size, contiguous memory, fastest indexed access (\`arr[0]\`). Cannot grow or shrink.
- **\`List<T>\`**: Dynamically resizable array. Grows automatically as you add items. Best general-purpose collection.
- **\`Dictionary<TKey, TValue>\`**: Key-value store with average **O(1)** lookup by key. Keys must be unique.
- **\`HashSet<T>\`**: Unordered set of unique items. O(1) membership check (\`set.Contains(item)\`).
- **\`Queue<T>\`**: First-In, First-Out (FIFO) pipeline.
- **\`Stack<T>\`**: Last-In, First-Out (LIFO) undo buffer.

### Modern Collection Expressions (\`[ ... ]\`)
In C# 12/13/14, you no longer need verbose syntax like \`new List<int> { 1, 2, 3 }\`. Use unified square brackets:
\`\`\`csharp
int[] array = [1, 2, 3];
List<string> names = ["Alice", "Bob", "Charlie"];
HashSet<int> uniqueIds = [101, 102, 103];
\`\`\`
    `,
    analogy: {
      realWorldScenario: 'Organizing your tools and household items.',
      techMapping: 'An Array is an egg carton with fixed 12 slots. A List<T> is a shopping cart that expands as you add items. A Dictionary is an office directory: look up an employee name (key) to get their extension number (value) instantly.'
    },
    codeSnippet: {
      code: `// Modern collection expressions
List<string> modules = ["Module 0", "Module 1", "Module 2"];
modules.Add("Module 3");

// Fast O(1) Key-Value lookups
Dictionary<string, int> moduleDuration = new()
{
    ["Module 0"] = 45,
    ["Module 1"] = 90,
    ["Module 2"] = 120
};

// Safe lookup with TryGetValue
if (moduleDuration.TryGetValue("Module 1", out int duration))
{
    Console.WriteLine($"Module 1 Duration: {duration} minutes");
}

// HashSet for uniqueness
HashSet<string> tags = ["csharp", "dotnet", "csharp"]; // Duplicates discarded automatically
Console.WriteLine($"Unique tags count: {tags.Count}"); // Prints 2
`,
      language: 'csharp',
      filename: 'CollectionsDemo.cs',
      samplePath: 'Module01_Fundamentals/FundamentalsLab'
    },
    walkthrough: [
      { step: 'Collection Expression', detail: 'Initializes List<string> concisely using [ ... ] syntax.' },
      { step: 'Dynamic Growth', detail: 'Calling modules.Add(...) allocates internal capacity automatically.' },
      { step: 'Safe Dictionary Lookup', detail: 'TryGetValue checks for key existence without throwing KeyNotFoundException.' },
      { step: 'HashSet Deduplication', detail: 'Automatically strips duplicate "csharp" entry during insertion.' }
    ],
    commonMistakes: [
      {
        mistake: 'Accessing dictionary indexer dict["missingKey"] directly without checking.',
        whyItFails: 'If the key does not exist, the CLR throws a KeyNotFoundException.',
        fix: 'Use dict.TryGetValue(key, out var val) or dict.GetValueOrDefault(key, fallback).'
      }
    ],
    practiceTask: {
      title: 'Count Word Frequencies',
      task: 'Given an array of words, use a Dictionary<string, int> to count how many times each word appears.',
      hints: ['Iterate with foreach', 'Use dict[word] = dict.GetValueOrDefault(word, 0) + 1'],
      solutionCode: `string[] words = ["apple", "banana", "apple", "cherry", "banana", "apple"];
var counts = new Dictionary<string, int>();

foreach (var w in words)
{
    counts[w] = counts.GetValueOrDefault(w, 0) + 1;
}

foreach (var kvp in counts)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}`
    },
    quiz: [
      {
        question: 'Which collection guarantees unique elements with average O(1) lookup time?',
        options: ['List<T>', 'Queue<T>', 'HashSet<T>', 'Stack<T>'],
        correctIndex: 2,
        explanation: 'HashSet<T> uses hashing algorithms to enforce unique membership with O(1) time complexity.'
      }
    ]
  }
];
