# Capstone 6: Background-Job & Reporting Service

## Overview
Demonstrates asynchronous producer-consumer background processing using \`Microsoft.Extensions.Hosting.BackgroundService\` and high-throughput thread-safe \`System.Threading.Channels\`.

## Key Features
- Bounded channel queue with backpressure handling
- Non-blocking cooperative cancellation with \`CancellationToken\`
- Structured logging via \`ILogger<T>\`

## Running Locally
```bash
dotnet run --project samples/Capstones/Capstone6_BackgroundReporting -- --run-host
```

