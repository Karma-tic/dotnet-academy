import React, { useState } from 'react';
import { Award, CheckCircle2, ExternalLink, ShieldCheck, Map, HelpCircle, DollarSign, Clock } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { certificationsData, roadmaps } from '../content/certifications/certificationsData';

export const CertificationsGuide: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all');

  const filteredCerts = certificationsData.filter((c) => {
    if (filter === 'free') return c.isFree;
    if (filter === 'paid') return !c.isFree;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>Objective Career Credentials</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          .NET Certifications & Credentials Guide
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          An honest, factual breakdown of Microsoft certifications, free certified badges, real costs, and portfolio building strategies.
        </p>

        {/* Filter buttons */}
        <div className="flex justify-center gap-2 pt-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Credentials ({certificationsData.length})
          </Button>
          <Button
            variant={filter === 'free' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('free')}
          >
            100% Free / Free Audit
          </Button>
          <Button
            variant={filter === 'paid' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('paid')}
          >
            Microsoft Role-Based (Paid Exams)
          </Button>
        </div>
      </div>

      {/* Honest Editorial: Does a Certificate Matter? */}
      <Card className="bg-gradient-to-br from-indigo-50/60 to-purple-50/40 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200 dark:border-indigo-900/60 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5 font-bold text-lg text-slate-900 dark:text-white">
          <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>The Truth: Does a Certificate Actually Get You Hired?</span>
        </div>
        <div className="text-sm text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
          <p>
            <strong>The short answer:</strong> A certificate opens doors with automated HR keyword filters, especially at large enterprise system integrators (Accenture, Infosys, Wipro, TCS, Cognizant) and Microsoft Partner firms that require certified employee counts for partner status.
          </p>
          <p>
            <strong>The critical caveat:</strong> No engineering hiring manager will hire you based on an exam badge alone. Multiple-choice exams test memorization; real jobs require <em>craftsmanship</em>. The absolute highest hiring leverage is a <strong>working GitHub repository with clean code, unit tests, a CI pipeline, and a deployed demo API</strong>.
          </p>
          <p className="text-xs text-indigo-950 dark:text-indigo-200 font-semibold bg-indigo-100/60 dark:bg-indigo-900/40 p-3 rounded-xl">
            💡 Strategy: Study the free Microsoft Learn learning paths first (all training text and sandboxes are 100% free!). Only pay for exam vouchers if your employer pays for it, or if you are specifically targeting enterprise consulting roles.
          </p>
        </div>
      </Card>

      {/* Credentials Listing Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Active Credentials & Exam Profiles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCerts.map((cert) => (
            <Card key={cert.id} className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {cert.code && (
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                        Exam {cert.code}
                      </span>
                    )}
                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                      {cert.name}
                    </h3>
                    <span className="text-xs text-slate-500">Issuer: {cert.issuer}</span>
                  </div>
                  <Badge variant={cert.isFree ? 'success' : 'purple'}>
                    {cert.isFree ? 'Free ($0)' : 'Paid Exam'}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {cert.description}
                </p>

                {/* Metadata */}
                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    <span>Cost: {cert.cost}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Preparation Time: {cert.timeNeeded}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    <span>Recognition: {cert.recognition}</span>
                  </div>
                </div>

                {/* Key topics */}
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Key Evaluated Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cert.keyTopics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Verified {cert.lastVerified}
                </span>
                <a
                  href={cert.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Official Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* The "Build a Portfolio" Checklist */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            The Definitive "Proof-of-Work" Portfolio Checklist
          </h2>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          Complete these 5 tangible artifacts to outshine 95% of applicants who only present certificates:
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          {[
            {
              title: '1. Deployed ASP.NET Core REST API with Swagger / OpenAPI',
              detail: 'Host a live API on Azure Container Apps or a free Linux VPS. Provide a live URL where hiring managers can test endpoints directly in the browser.'
            },
            {
              title: '2. Real Entity Framework Core Migrations & SQLite / Postgres Schema',
              detail: 'Show code-first migrations, indexed tables, and optimized .AsNoTracking() queries demonstrating you understand database latency.'
            },
            {
              title: '3. Automated xUnit & WebApplicationFactory Test Suite',
              detail: 'Include end-to-end integration tests that spin up an in-memory test server and verify HTTP status codes and JSON response contracts.'
            },
            {
              title: '4. Green GitHub Actions CI/CD Pipeline',
              detail: 'Every pull request must run dotnet build -warnaserror and dotnet test, proving you write warning-free code.'
            },
            {
              title: '5. Production-Ready Multi-Stage Dockerfile',
              detail: 'Include a clean multi-stage Docker build that packages a minimal, non-root Linux container ready for Kubernetes or Cloud Run.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <h4 className="font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Visual Learning Roadmaps */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Map className="w-5 h-5 text-indigo-500" />
          <span>Curated Visual Learning Roadmaps</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadmaps.map((r, idx) => (
            <Card key={idx} hover className="p-5 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                  {r.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {r.description}
                </p>
              </div>
              <a
                href={r.url}
                target={r.url.startsWith('http') ? '_blank' : undefined}
                rel={r.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 self-start"
              >
                <span>{r.url.startsWith('#') ? 'View Interactive Roadmap' : 'Explore Official Documentation'}</span>
                {r.url.startsWith('http') && <ExternalLink className="w-3 h-3" />}
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
