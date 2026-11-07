export interface CloudFreeTier {
  id: string;
  provider: string;
  serviceName: string;
  category: 'Cloud Hosting' | 'Database' | 'Development Environment' | 'Container Registry';
  freeAllowance: string;
  status: 'Active Free Tier' | 'Changed / Conditional' | 'Retired / Discontinued';
  url: string;
  costWarning: string;
  idealFor: string;
  lastVerified: string;
  limitations: string[];
}

export const cloudFreeTiersData: CloudFreeTier[] = [
  {
    id: 'azure-app-service',
    provider: 'Microsoft Azure',
    serviceName: 'Azure App Service (F1 Free Tier)',
    category: 'Cloud Hosting',
    freeAllowance: '1 GB RAM, 1 GB Storage, 60 CPU minutes/day on shared compute infrastructure.',
    status: 'Active Free Tier',
    url: 'https://azure.microsoft.com/free/',
    costWarning: 'Always ensure your Spending Limit is set to $0 / Enabled during account creation so Azure halts resources rather than incurring charges.',
    idealFor: 'Deploying small ASP.NET Core Minimal APIs and hobby web apps for portfolio demonstration.',
    lastVerified: '2026-11-07',
    limitations: [
      'Shared compute infrastructure (not dedicated VM)',
      'App sleeps after idle periods; cold start delay on first request',
      'No custom domain SSL bindings on F1 tier (use azurewebsites.net domain)'
    ]
  },
  {
    id: 'azure-sql-free',
    provider: 'Microsoft Azure',
    serviceName: 'Azure SQL Database Free Offer',
    category: 'Database',
    freeAllowance: '32 GB storage + 100,000 vCore seconds per month of serverless General Purpose compute.',
    status: 'Active Free Tier',
    url: 'https://learn.microsoft.com/azure/azure-sql/database/free-offer',
    costWarning: 'Auto-pauses compute when idle to conserve your 100k vCore seconds. Resumes automatically on incoming EF Core connections.',
    idealFor: 'Real enterprise SQL Server testing with EF Core migrations without running local LocalDB.',
    lastVerified: '2026-11-07',
    limitations: [
      'Limit 1 free database per Azure subscription',
      'Requires serverless compute tier configuration',
      'Compute pauses after 60 min inactivity (initial connection takes 10–30s to wake)'
    ]
  },
  {
    id: 'github-codespaces',
    provider: 'GitHub',
    serviceName: 'GitHub Codespaces',
    category: 'Development Environment',
    freeAllowance: '60 core-hours per month (e.g., 30 hours of a 2-core cloud VM) + 15 GB cloud storage for all GitHub Free accounts.',
    status: 'Active Free Tier',
    url: 'https://github.com/features/codespaces',
    costWarning: 'Always stop your Codespace when finished practicing. Unstopped codespaces consume storage and idle core hours.',
    idealFor: 'Coding .NET 10 from low-spec laptops, Chromebooks, or college lab computers without installing the SDK locally.',
    lastVerified: '2026-11-07',
    limitations: [
      '60 core-hours cap per calendar month',
      'Browser or VS Code remote connection required',
      'Storage consumed by inactive stopped containers until deleted'
    ]
  },
  {
    id: 'neon-postgres',
    provider: 'Neon',
    serviceName: 'Neon Serverless Postgres',
    category: 'Database',
    freeAllowance: '0.5 GB data storage with serverless autoscaling compute and instant database branching.',
    status: 'Active Free Tier',
    url: 'https://neon.tech/pricing',
    costWarning: 'Serverless compute suspends after 5 minutes of zero traffic. Zero risk of unexpected bills on the free tier.',
    idealFor: 'Connecting ASP.NET Core apps with Npgsql.EntityFrameworkCore.PostgreSQL in modern cloud deployments.',
    lastVerified: '2026-11-07',
    limitations: [
      '0.5 GB maximum storage cap on free tier',
      'Cold start delay of 500ms–1.5s when waking from suspended state',
      'Single project on free tier'
    ]
  },
  {
    id: 'supabase-postgres',
    provider: 'Supabase',
    serviceName: 'Supabase Managed Postgres',
    category: 'Database',
    freeAllowance: '500 MB database storage, 2 active projects, built-in REST and dashboard UI.',
    status: 'Active Free Tier',
    url: 'https://supabase.com/pricing',
    costWarning: 'Free projects pause automatically after 7 consecutive days of zero traffic. You can unpause with one click in the Supabase dashboard.',
    idealFor: 'Relational database practice with direct connection strings for EF Core.',
    lastVerified: '2026-11-07',
    limitations: [
      'Pauses after 7 days of inactivity',
      '500 MB database limit',
      '2 active free projects per account'
    ]
  },
  {
    id: 'render-web',
    provider: 'Render',
    serviceName: 'Render Web Services (Free Tier)',
    category: 'Cloud Hosting',
    freeAllowance: '512 MB RAM, 0.1 CPU, custom domains, free automatic TLS certificates, and native Dockerfile support.',
    status: 'Active Free Tier',
    url: 'https://render.com/pricing',
    costWarning: 'Free web services spin down after 15 minutes of inactivity. When a new HTTP request arrives, Render spins the container back up, taking approximately 50 seconds.',
    idealFor: 'Hosting your Dockerized .NET portfolio APIs for employers and recruiters to inspect.',
    lastVerified: '2026-11-07',
    limitations: [
      '50-second cold start when waking from idle',
      '750 free instance hours per month across account',
      'No persistent disk storage on free services (stateless only)'
    ]
  },
  {
    id: 'docker-hub',
    provider: 'Docker',
    serviceName: 'Docker Hub Personal Free',
    category: 'Container Registry',
    freeAllowance: 'Unlimited public repositories, 1 private repository, 200 image pull requests per 6 hours.',
    status: 'Active Free Tier',
    url: 'https://hub.docker.com/pricing',
    costWarning: 'Ensure you do not commit production secrets or connection strings into publicly pushed container images.',
    idealFor: 'Publishing Capstone 3 Docker images from GitHub Actions CI pipelines.',
    lastVerified: '2026-11-07',
    limitations: [
      '200 pulls per 6 hours for anonymous / free accounts',
      'Images must remain public to stay free',
      'Max 1 private repository'
    ]
  },
  {
    id: 'railway-changed',
    provider: 'Railway',
    serviceName: 'Railway Cloud Deployment',
    category: 'Cloud Hosting',
    freeAllowance: 'One-time $5 trial credit only. No perpetual recurring monthly free tier.',
    status: 'Changed / Conditional',
    url: 'https://railway.com/pricing',
    costWarning: 'CRITICAL WARNING: Many older 2022 YouTube tutorials claim Railway gives a free $5 every month. This was discontinued in 2023. Railway now requires a paid subscription once the initial trial credit is exhausted.',
    idealFor: 'Short-term trial testing only. Do not use for long-term free portfolio hosting.',
    lastVerified: '2026-11-07',
    limitations: [
      'Trial credit does not renew monthly',
      'Requires card authorization after trial',
      'Services suspended once trial credits expire'
    ]
  },
  {
    id: 'heroku-retired',
    provider: 'Heroku',
    serviceName: 'Heroku Free Dynos & Postgres',
    category: 'Cloud Hosting',
    freeAllowance: 'DISCONTINUED. Zero free allowance.',
    status: 'Retired / Discontinued',
    url: 'https://blog.heroku.com/next-chapter',
    costWarning: 'CRITICAL NOTICE: Heroku completely eliminated all free dynos and free Heroku Postgres databases in late 2022. Any tutorial instructing you to deploy your .NET app to free Heroku is severely outdated.',
    idealFor: 'Not applicable. Use Render or Azure App Service instead.',
    lastVerified: '2026-11-07',
    limitations: [
      'All services require paid plans',
      'No free tier available'
    ]
  }
];

