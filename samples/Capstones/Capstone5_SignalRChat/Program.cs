using Microsoft.AspNetCore.SignalR;

namespace Karmatix.Academy.Capstones.SignalRChat;

public record ChatMessage(string User, string Content, DateTime Timestamp);

public interface IChatClient
{
    Task ReceiveMessage(ChatMessage message);
    Task UserJoined(string user);
    Task UserLeft(string user);
}

public class AcademyChatHub : Hub<IChatClient>
{
    public async Task SendBroadcast(string user, string message)
    {
        var chatMsg = new ChatMessage(user, message, DateTime.UtcNow);
        await Clients.All.ReceiveMessage(chatMsg);
    }

    public async Task JoinRoom(string roomName, string user)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        await Clients.Group(roomName).UserJoined(user);
    }

    public override async Task OnConnectedAsync()
    {
        Console.WriteLine($"[SignalR] Client Connected: {Context.ConnectionId}");
        await base.OnConnectedAsync();
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddSignalR();

        var app = builder.Build();

        app.MapGet("/", () => "Karmatix SignalR Real-Time Chat Server Active.");
        app.MapHub<AcademyChatHub>("/hub/chat");

        if (args.Length == 0 || args[0] != "--no-run")
        {
            Console.WriteLine("Capstone 5: SignalR Chat Hub Configured.");
        }
    }
}

