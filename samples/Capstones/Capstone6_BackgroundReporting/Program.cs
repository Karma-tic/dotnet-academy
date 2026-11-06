using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Threading.Channels;

namespace Karmatix.Academy.Capstones.BackgroundReporting;

public record ReportJob(Guid JobId, string ReportName, DateTime QueuedAt);

public interface IReportQueue
{
    ValueTask QueueJobAsync(ReportJob job);
    IAsyncEnumerable<ReportJob> ReadJobsAsync(CancellationToken cancellationToken);
}

public class ChannelReportQueue : IReportQueue
{
    private readonly Channel<ReportJob> _channel = Channel.CreateBounded<ReportJob>(new BoundedChannelOptions(100)
    {
        FullMode = BoundedChannelFullMode.Wait
    });

    public ValueTask QueueJobAsync(ReportJob job) => _channel.Writer.WriteAsync(job);
    public IAsyncEnumerable<ReportJob> ReadJobsAsync(CancellationToken cancellationToken) =>
        _channel.Reader.ReadAllAsync(cancellationToken);
}

public class ReportProcessingWorker : BackgroundService
{
    private readonly IReportQueue _queue;
    private readonly ILogger<ReportProcessingWorker> _logger;

    public ReportProcessingWorker(IReportQueue queue, ILogger<ReportProcessingWorker> logger)
    {
        _queue = queue;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Report Processing Worker started.");

        await foreach (var job in _queue.ReadJobsAsync(stoppingToken))
        {
            _logger.LogInformation("Processing report job {JobId}: {ReportName}", job.JobId, job.ReportName);
            // Simulate report generation
            await Task.Delay(50, stoppingToken);
            _logger.LogInformation("Completed report job {JobId}.", job.JobId);
        }
    }
}

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = Host.CreateApplicationBuilder(args);
        builder.Services.AddSingleton<IReportQueue, ChannelReportQueue>();
        builder.Services.AddHostedService<ReportProcessingWorker>();

        var host = builder.Build();

        // Enqueue sample jobs
        var queue = host.Services.GetRequiredService<IReportQueue>();
        await queue.QueueJobAsync(new ReportJob(Guid.NewGuid(), "Monthly Student Progress Report", DateTime.UtcNow));
        await queue.QueueJobAsync(new ReportJob(Guid.NewGuid(), "Course Completion Certificate Audit", DateTime.UtcNow));

        Console.WriteLine("Capstone 6: Background Service Configured & Initialized.");

        // If run in standalone mode, let it run briefly to execute the jobs
        if (args.Length > 0 && args[0] == "--run-host")
        {
            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
            await host.RunAsync(cts.Token);
        }
    }
}
