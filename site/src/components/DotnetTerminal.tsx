import { useEffect, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

// The first five minutes of every .NET developer: scaffold, run, call the API.
// Output mirrors the real `dotnet new webapi` template and Kestrel startup logs.
const LINES: { text: string; kind: 'cmd' | 'out' | 'info' | 'ok' }[] = [
  { text: 'dotnet new webapi -n Shop', kind: 'cmd' },
  { text: 'The template "ASP.NET Core Web API" was created successfully.', kind: 'ok' },
  { text: 'cd Shop && dotnet run', kind: 'cmd' },
  { text: 'Building...', kind: 'out' },
  { text: 'info: Microsoft.Hosting.Lifetime[14]', kind: 'info' },
  { text: '      Now listening on: http://localhost:5000', kind: 'out' },
  { text: 'info: Microsoft.Hosting.Lifetime[0]', kind: 'info' },
  { text: '      Application started. Press Ctrl+C to shut down.', kind: 'out' },
];

const SUMMARIES = ['Freezing', 'Bracing', 'Chilly', 'Cool', 'Mild', 'Warm', 'Balmy', 'Hot', 'Sweltering', 'Scorching'];
const forecast = () => Array.from({ length: 3 }, (_, i) => {
  const c = Math.floor(Math.random() * 75) - 20;
  const d = new Date(Date.now() + (i + 1) * 864e5).toISOString().slice(0, 10);
  return { date: d, temperatureC: c, temperatureF: 32 + Math.trunc(c / 0.5556), summary: SUMMARIES[Math.floor(Math.random() * SUMMARIES.length)] };
});

export function DotnetTerminal() {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [shown, setShown] = useState(reduce ? LINES.length : 0);
  const [res, setRes] = useState<ReturnType<typeof forecast> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shown >= LINES.length) return;
    const t = window.setTimeout(() => setShown((n) => n + 1), LINES[shown]?.kind === 'cmd' ? 650 : 280);
    return () => window.clearTimeout(t);
  }, [shown]);

  const ready = shown >= LINES.length;
  const call = () => { setLoading(true); window.setTimeout(() => { setRes(forecast()); setLoading(false); }, reduce ? 0 : 350); };

  return (
    <div className="mx-auto w-full max-w-[460px] space-y-3">
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#0c0b14] shadow-[0_40px_90px_-40px_rgba(81,43,212,.6)]">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-slate-500">Terminal</span>
          {ready && !reduce && (
            <button type="button" onClick={() => { setShown(0); setRes(null); }} className="ml-auto inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs text-slate-500 hover:text-slate-200" aria-label="Replay">
              <RotateCcw className="h-3.5 w-3.5" />Replay
            </button>
          )}
        </div>
        <pre className="min-h-[230px] whitespace-pre-wrap break-words p-4 font-mono text-[12.5px] leading-relaxed" aria-live="polite">
          {LINES.slice(0, shown).map((l, i) => (
            <div key={i} className={l.kind === 'cmd' ? 'text-slate-100' : l.kind === 'info' ? 'text-[#4ec9b0]' : l.kind === 'ok' ? 'text-[#b39dfc]' : 'text-slate-400'}>
              {l.kind === 'cmd' && <span className="select-none text-[#9b7ff7]">$ </span>}{l.text}
            </div>
          ))}
          {!ready && <span className="inline-block h-4 w-2 translate-y-0.5 bg-slate-300 motion-safe:animate-pulse" aria-hidden="true" />}
        </pre>
      </div>

      <div className={`rounded-xl border border-slate-800 bg-slate-900 p-3 transition-opacity ${ready ? 'opacity-100' : 'opacity-40'}`}>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-emerald-500/15 px-2 py-1 font-mono text-xs font-semibold text-emerald-300">GET</span>
          <span className="min-w-0 flex-1 truncate font-mono text-xs text-slate-300">localhost:5000/weatherforecast</span>
          <button type="button" disabled={!ready || loading} onClick={call} className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full bg-ember-deep px-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#6b45e6] disabled:cursor-not-allowed disabled:opacity-50">
            <Play className="h-3.5 w-3.5" />{loading ? 'Sending' : 'Send'}
          </button>
        </div>
        {res && (
          <pre className="mt-3 max-h-40 overflow-auto rounded-lg bg-[#0c0b14] p-3 font-mono text-[11.5px] leading-relaxed text-slate-300">
            <span className="text-emerald-300">200 OK</span>{'  application/json\n'}{JSON.stringify(res, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
