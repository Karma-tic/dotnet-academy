# Capstone 5: Real-Time Chat with SignalR

## Overview
Demonstrates bi-directional WebSocket communication in ASP.NET Core using strongly-typed SignalR Hubs (\`Hub<IChatClient>\`), client room grouping, and automatic fallbacks (Server-Sent Events / Long Polling).

## Key Concepts
- Strongly-typed client interface (\`IChatClient\`) eliminating magic strings
- Connection lifecycle hooks (\`OnConnectedAsync\`, \`OnDisconnectedAsync\`)
- Group broadcasting for topic-based chat rooms

## Running Locally
```bash
dotnet run --project samples/Capstones/Capstone5_SignalRChat
```
Connect via any SignalR client to \`http://localhost:5000/hub/chat\`.
