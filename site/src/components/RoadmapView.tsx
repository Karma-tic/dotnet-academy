import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight, BookOpen, Briefcase, Check, Dumbbell, Flag, Info, MessageCircle, Package,
  PlayCircle, Users, Wrench, Award, FileText, Map, Compass, NotebookPen,
} from 'lucide-react';

// Shared Karmatix roadmap layout. Data comes from learn.karmatix.in (roadmap.generated.ts).

type Res = { id: string; name: string; by: string; url: string; type: string; cost: string; lang: string; why: string; tip: string };
type Stage = { title: string; weeks: string; goal: string; topics: readonly string[]; learn: readonly Res[]; practise: readonly Res[]; build: string; prove: string; hint: string | null };
export type RoadmapData = {
  id: string; name: string; role: string; tagline: string; months: string; start: string; why: string;
  stages: readonly Stage[]; libs: readonly { name: string; use: string }[]; interview: readonly string[];
  tools: readonly Res[]; channels: readonly Res[]; communities: readonly Res[];
  certs: readonly { id: string; name: string; fee: string; verdict: string; url: string }[]; note: string | null; source: string;
};
export type StageExtra = { practice: { to: string; title: string; text: string }[]; notes: { to: string; title: string }[] };

type InternalLink = (props: { to: string; className?: string; children: React.ReactNode }) => React.ReactElement;

interface Props {
  roadmap: RoadmapData;
  extras: StageExtra[];
  storageKey: string;
  heroCta: { to: string; label: string };
  InternalLink: InternalLink;
  after?: React.ReactNode;
}

const TYPE_ICON: Record<string, React.ElementType> = {
  course: BookOpen, docs: FileText, video: PlayCircle, practice: Dumbbell, tool: Wrench, community: Users,
  roadmap: Map, book: BookOpen, program: Compass, newsletter: FileText, podcast: PlayCircle, jobs: Briefcase,
};
const TYPE_LABEL: Record<string, string> = {
  course: 'Course', docs: 'Docs', video: 'YouTube', practice: 'Practice', tool: 'Tool', community: 'Community',
  roadmap: 'Roadmap', book: 'Book', program: 'Program', newsletter: 'Newsletter', podcast: 'Podcast', jobs: 'Jobs',
};
const COST: Record<string, string> = { free: 'Free', freemium: 'Free tier', paid: 'Paid' };
const VERDICT: Record<string, string> = { worth: 'Worth it', good: 'Good to have', only: 'Only if needed' };
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);

const ResCard: React.FC<{ r: Res; showTip?: boolean }> = ({ r, showTip = true }) => {
  const Icon = TYPE_ICON[r.type] || BookOpen;
  const host = new URL(r.url).hostname.replace(/^www\./, '');
  return (
    <article className="group relative flex gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition-colors hover:border-neutral-700 hover:bg-neutral-900">
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-ember"><Icon className="h-4 w-4" /></span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-[0.95rem] font-semibold leading-snug text-neutral-100">
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:rounded-xl">
              {r.name}<span className="sr-only"> (opens {host})</span>
            </a>
          </h4>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
        </div>
        <p className="mt-0.5 text-xs text-neutral-500">{[TYPE_LABEL[r.type], COST[r.cost], r.lang !== 'en' ? 'Hindi' : null].filter(Boolean).join(', ')}</p>
        {showTip && <p className="mt-2 text-sm leading-relaxed text-neutral-400">{r.tip}</p>}
      </div>
    </article>
  );
};

export const RoadmapView: React.FC<Props> = ({ roadmap: k, extras, storageKey, heroCta, InternalLink, after }) => {
  const total = useMemo(() => k.stages.reduce((n, s) => n + s.topics.length, 0), [k]);
  const [done, setDone] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem(storageKey) || '[]')); } catch { return new Set(); }
  });
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify([...done])); } catch { /* storage blocked */ }
    window.dispatchEvent(new CustomEvent('kx-roadmap-progress', { detail: { done: done.size, total } }));
  }, [done, storageKey, total]);
  const toggle = (key: string) => setDone((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
  const pct = Math.round((done.size / (total || 1)) * 100);

  return (
    <div className="bg-neutral-950 text-neutral-100">
      {/* Hero */}
      <section className="kx-glow border-b border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pt-14">
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <a href="https://learn.karmatix.in/roadmaps/" className="inline-flex min-h-9 items-center hover:text-neutral-100">Karmatix Learn roadmaps</a>
            <span aria-hidden="true"> / </span><span className="text-neutral-400">{k.name}</span>
          </nav>
          <h1 className="mt-3 text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-100 sm:text-6xl">
            {k.name} roadmap. <span className="italic font-normal text-ember" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>Every skill, in order.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400">
            {k.tagline} Each stage lists what you must know, the best place to learn it, where to practise here for free, what to build and how to prove it.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#stage-1" className="inline-flex min-h-11 items-center rounded-full bg-ember px-5 font-semibold text-ember-ink transition-colors hover:bg-ember-soft">Start stage 1</a>
            <InternalLink to={heroCta.to} className="inline-flex min-h-11 items-center rounded-full border border-neutral-700 px-5 font-semibold text-neutral-100 transition-colors hover:border-neutral-500 hover:bg-neutral-900">{heroCta.label}</InternalLink>
          </div>
          <dl className="mt-9 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-neutral-800 bg-neutral-800 sm:grid-cols-4">
            {[
              ['Become a', k.role], ['Time, part time', `${k.months} months`], ['Start with', k.start], ['Skills to learn', String(total)],
            ].map(([dt, dd]) => (
              <div key={dt} className="bg-neutral-900 p-4"><dt className="text-xs text-neutral-500">{dt}</dt><dd className="mt-1 text-sm font-medium text-neutral-100">{dd}</dd></div>
            ))}
          </dl>
          <p className="mt-5 flex max-w-3xl gap-2 text-sm leading-relaxed text-neutral-400"><Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-ember" />{k.why}</p>
          <nav aria-label="Stages" className="mt-6">
            <ol className="kx-scroll-row">
              {k.stages.map((s, i) => (
                <li key={s.title}><a href={`#stage-${i + 1}`} className="inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap rounded-full border border-neutral-800 bg-neutral-900 px-3.5 text-sm text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-100"><span className="text-ember">{i + 1}</span>{s.title}</a></li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Stages */}
        <div className="relative">
          <div className="pointer-events-none absolute bottom-4 left-[17px] top-4 w-[2px] rounded-full bg-neutral-700" aria-hidden="true">
            <div className="w-full rounded-full bg-ember transition-[height] duration-500" style={{ height: `${pct}%` }} />
          </div>
          <ol className="relative" aria-label={`${k.name} stages`}>
            {k.stages.map((s, i) => {
              const keys = s.topics.map((t) => `${i}-${slug(t)}`);
              const stageDone = keys.filter((x) => done.has(x)).length;
              const all = stageDone === keys.length;
              const ex = extras[i];
              return (
                <li key={s.title} id={`stage-${i + 1}`} className="relative scroll-mt-32 pb-14 pl-14 last:pb-0">
                  <span className={`absolute left-0 top-0 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-ember text-sm font-semibold ${all ? 'bg-ember text-ember-ink' : 'bg-neutral-950 text-ember'}`}>
                    {all ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <p className="text-sm text-neutral-500">{s.weeks} weeks <span aria-hidden="true">/</span> {stageDone} of {keys.length} done</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-100 sm:text-[1.7rem]">{s.title}</h2>
                  <p className="mt-1.5 text-neutral-400">{s.goal}</p>

                  <fieldset className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900/60 p-2 sm:p-3">
                    <legend className="sr-only">Skills for {s.title}</legend>
                    <p className="flex items-center gap-2 px-2 pb-1 pt-1.5 text-sm font-semibold text-neutral-100" aria-hidden="true"><Check className="h-4 w-4 text-ember" />What you need to know</p>
                    <ul>
                      {s.topics.map((t, j) => (
                        <li key={t}>
                          <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-neutral-800/60">
                            <input type="checkbox" checked={done.has(keys[j])} onChange={() => toggle(keys[j])} className="kx-check peer mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded-[5px] border border-neutral-600 bg-neutral-950" />
                            <span className="text-[0.95rem] leading-snug text-neutral-200 peer-checked:text-neutral-500 peer-checked:line-through">{t}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </fieldset>

                  <h3 className="mt-6 flex items-center gap-2 text-sm font-semibold text-neutral-100"><BookOpen className="h-4 w-4 text-ember" />Learn from</h3>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">{s.learn.map((r) => <ResCard key={r.id} r={r} />)}</div>
                  {s.hint && <p className="mt-3 flex gap-2 text-sm text-neutral-500"><Info className="mt-0.5 h-4 w-4 shrink-0 text-ember" />{s.hint}</p>}

                  <h3 className="mt-6 flex items-center gap-2 text-sm font-semibold text-neutral-100"><Dumbbell className="h-4 w-4 text-ember" />Practise here, free</h3>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {ex?.practice.map((p) => (
                      <article key={p.to + p.title} className="group relative rounded-xl border border-ember/40 bg-ember/[0.06] p-4 transition-colors hover:border-ember/70">
                        <h4 className="flex items-start justify-between gap-2 font-semibold text-neutral-100">
                          <InternalLink to={p.to} className="after:absolute after:inset-0 after:rounded-xl">{p.title}</InternalLink>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-ember/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-neutral-400">{p.text}</p>
                      </article>
                    ))}
                    {s.practise.filter((r) => !r.id.startsWith('karmatix-')).map((r) => <ResCard key={r.id} r={r} />)}
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-ember/40 bg-ember/[0.07] p-5">
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-100"><Wrench className="h-4 w-4 text-ember" />Build this</h3>
                      <p className="mt-2 leading-relaxed text-neutral-200">{s.build}</p>
                    </div>
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-100"><Flag className="h-4 w-4 text-ember" />Prove it</h3>
                      <p className="mt-2 leading-relaxed text-neutral-400">{s.prove}</p>
                    </div>
                  </div>

                  {ex?.notes.length ? (
                    <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
                      <span className="inline-flex items-center gap-1.5"><NotebookPen className="h-4 w-4" />Stuck? Short notes:</span>
                      {ex.notes.map((n) => <InternalLink key={n.to} to={n.to} className="inline-flex min-h-9 items-center text-ember-soft underline-offset-4 hover:underline">{n.title}</InternalLink>)}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Kit */}
        <aside className="space-y-8 lg:sticky lg:top-32 lg:max-h-[calc(100dvh-9rem)] lg:self-start lg:overflow-y-auto lg:pb-6" aria-label="Roadmap kit">
          <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-4" aria-labelledby="kx-prog">
            <h2 id="kx-prog" className="text-sm font-semibold text-neutral-100">Your progress</h2>
            <p className="mt-2 text-2xl font-semibold text-neutral-100">{done.size}<span className="text-base font-normal text-neutral-500"> of {total} skills</span></p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-800" role="progressbar" aria-label="Skills done" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done.size}>
              <div className="h-full rounded-full bg-ember transition-[width] duration-300" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-3 text-xs text-neutral-500">Saved in this browser only. No account needed.</p>
            {done.size > 0 && <button type="button" onClick={() => setDone(new Set())} className="mt-2 min-h-11 text-sm text-ember-soft underline-offset-4 hover:underline">Reset progress</button>}
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-100"><Package className="h-4 w-4 text-ember" />Libraries to know</h2>
            <ul className="mt-2">{k.libs.map((l) => <li key={l.name} className="border-b border-neutral-800 py-2.5"><p className="text-sm font-medium text-neutral-100">{l.name}</p><p className="text-xs text-neutral-500">{l.use}</p></li>)}</ul>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-100"><MessageCircle className="h-4 w-4 text-ember" />Interview topics</h2>
            <ul className="mt-2 space-y-1.5 text-sm text-neutral-400">{k.interview.map((t) => <li key={t} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember/70" aria-hidden="true" />{t}</li>)}</ul>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-100"><Award className="h-4 w-4 text-ember" />Certifications</h2>
            {k.certs.length > 0 && (
              <ul className="mt-3 space-y-2">{k.certs.map((c) => (
                <li key={c.id} className="rounded-xl border border-neutral-800 bg-neutral-900 p-3.5">
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-neutral-100 hover:text-ember-soft">{c.name}</a>
                  <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500"><span>{c.fee}</span><span className={`rounded-md px-1.5 py-0.5 ${c.verdict === 'worth' ? 'bg-emerald-500/10 text-emerald-300' : c.verdict === 'only' ? 'bg-amber-500/10 text-amber-300' : 'bg-neutral-800 text-neutral-400'}`}>{VERDICT[c.verdict]}</span></p>
                </li>
              ))}</ul>
            )}
            {k.note && <p className="mt-2 text-sm leading-relaxed text-neutral-400">{k.note}</p>}
            <a href="https://learn.karmatix.in/certifications/" className="mt-2 inline-flex min-h-9 items-center text-sm text-ember-soft underline-offset-4 hover:underline">Compare all certifications</a>
          </section>

          {[{ label: 'Tools to install', Icon: Wrench, list: k.tools }, { label: 'Channels to follow', Icon: PlayCircle, list: k.channels }, { label: 'Communities to join', Icon: Users, list: k.communities }].map(({ label, Icon, list }) => (
            <section key={label}>
              <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-100"><Icon className="h-4 w-4 text-ember" />{label}</h2>
              <ul className="mt-2">{list.map((r) => (
                <li key={r.id}><a href={r.url} target="_blank" rel="noopener noreferrer" className="group flex min-h-11 items-center justify-between gap-3 border-b border-neutral-800 text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                  <span className="min-w-0 truncate">{r.name}</span><ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-500 group-hover:text-ember" />
                </a></li>
              ))}</ul>
            </section>
          ))}
          <a href="https://learn.karmatix.in/roadmaps/" className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-neutral-700 px-4 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-500">All stack roadmaps</a>
        </aside>
      </div>
      {after}
    </div>
  );
};
