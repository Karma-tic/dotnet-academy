import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Server, ArrowDown, HardDrive, Cpu, Radio } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Chapter {
  id: number;
  badge: string;
  title: string;
  summary: string;
  details: string[];
  specs: { label: string; val: string }[];
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    badge: 'STAGE 1: THE INGRESS BOUNDARY',
    title: '50,000 Concurrent Sockets Without Thread Starvation',
    summary: 'Traditional thread per connection models collapse under massive concurrency. Modern architectures use kernel non-blocking multiplexers to handle tens of thousands of connections on a single worker loop.',
    details: [
      'Linux epoll edge-triggered socket event notifications.',
      'Kernel to userspace zero-copy ring buffer reads via io_uring.',
      'TCP receive window tuning preventing buffer bloat.',
    ],
    specs: [
      { label: 'Ingress Concurrency', val: '50,000 Sockets' },
      { label: 'Event Latency', val: '< 18μs per Event' },
      { label: 'Thread Overhead', val: '0 Extra OS Threads' },
    ],
  },
  {
    id: 2,
    badge: 'STAGE 2: ASYNCHRONOUS QUEUING & BACKPRESSURE',
    title: 'Zero-Loss Message Pipelines with Buffer Boundaries',
    summary: 'When producers outpace consumers, naive unbounded queues exhaust heap memory. Resilient backpressure signals upstream workers to pause, preventing catastrophic OOM crashes.',
    details: [
      'Lock-free single-producer multi-consumer ring buffers.',
      'Exponential backpressure signaling upstream TCP window shrinkage.',
      'Drop-head vs drop-tail shedding policies under spike saturation.',
    ],
    specs: [
      { label: 'Ring Capacity', val: '65,536 Slots' },
      { label: 'Contention', val: '0 Mutex Locks' },
      { label: 'Shedding Delay', val: '0 Milliseconds' },
    ],
  },
  {
    id: 3,
    badge: 'STAGE 3: STORAGE CONSENSUS & DISK FLUSH',
    title: 'How Databases Guarantee Durability When Power Fails',
    summary: 'Data in volatile RAM vanishes during hardware cutouts. Durability requires sequential append-only write ahead logs and explicit synchronization to non-volatile disk controllers.',
    details: [
      'Sequential append log preventing random mechanical head seek time.',
      'Group commit batching amortizing fsync overhead across thousands of transactions.',
      'CRC32 checksum validation detecting silent bit rot on storage blocks.',
    ],
    specs: [
      { label: 'Sync Mechanism', val: 'fdatasync() Batch' },
      { label: 'Durability', val: 'Zero Data Loss' },
      { label: 'Write Amplification', val: '1.08x Factor' },
    ],
  },
];

export const PinnedDissection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
          isMobile: '(max-width: 1023px)',
        },
        (context) => {
          if (!context.conditions?.isDesktop) return;

          // Pinned timeline strictly starting at top top
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=200%',
              pin: true,
              scrub: 0.8,
              onUpdate: (self) => {
                const progress = self.progress;
                if (progress < 0.33) {
                  setActiveChapterIndex(0);
                } else if (progress < 0.66) {
                  setActiveChapterIndex(1);
                } else {
                  setActiveChapterIndex(2);
                }
              },
            },
          });

          tl.to('.stage-card-0', { opacity: 0, y: -20, duration: 1 })
            .fromTo('.stage-card-1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
            .to('.stage-card-1', { opacity: 0, y: -20, duration: 1 })
            .fromTo('.stage-card-2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
        }
      );
    },
    { scope: containerRef }
  );

  const activeChapter = CHAPTERS[activeChapterIndex];

  return (
    <section
      id="mental-models"
      ref={containerRef}
      className="relative min-h-[100dvh] py-16 lg:py-0 flex items-center border-b border-[#202938] bg-[#090b0e]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        {/* Section Header */}
        <div className="mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11151c] border border-[#202938] text-xs font-mono font-medium text-[#f59e0b]">
            <Radio className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>SYSTEMS DISSECTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
            Interactive Systems Scrollytelling
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-xl">
            Trace a single network packet through the kernel ingress boundary, across memory buffers, and down to durable disk sync.
          </p>
        </div>

        {/* Desktop View: Pinned 2-Column Scrollytelling */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center">
          {/* Left Column: Chapter Narratives */}
          <div className="col-span-6 space-y-4">
            {/* Stage Progress Pill Tabs */}
            <div className="flex items-center gap-2 mb-4">
              {CHAPTERS.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`px-3 py-1.5 rounded-full font-mono text-xs transition-colors min-h-[36px] flex items-center gap-1.5 ${
                    activeChapterIndex === idx
                      ? 'bg-[#f59e0b] text-black font-semibold'
                      : 'bg-[#11151c] border border-[#202938] text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  <span>Stage {c.id}</span>
                </button>
              ))}
            </div>

            <div className="p-6 rounded-xl border border-[#202938] bg-[#11151c] shadow-inset-highlight space-y-4">
              <span className="font-mono text-xs font-bold text-[#f59e0b] tracking-wider block">
                {activeChapter.badge}
              </span>
              <h3 className="text-2xl font-bold text-[#f8fafc] leading-snug">
                {activeChapter.title}
              </h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                {activeChapter.summary}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#202938]">
                {activeChapter.details.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#f8fafc]">
                    <span className="text-[#22c55e] mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Live Spec Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#202938]">
                {activeChapter.specs.map((s, idx) => (
                  <div key={idx} className="p-2 rounded bg-[#090b0e] border border-[#202938] text-center font-mono">
                    <span className="text-[10px] text-[#64748b] block">{s.label}</span>
                    <span className="text-xs font-bold text-[#f59e0b]">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage Inspection Canvas Pane */}
          <div className="col-span-6">
            <div className="p-6 rounded-xl border border-[#202938] bg-[#11151c] shadow-inset-highlight space-y-5">
              <div className="flex items-center justify-between border-b border-[#202938] pb-3 text-xs font-mono">
                <span className="text-[#94a3b8]">KERNEL EXECUTION TRACE</span>
                <span className="text-[#22c55e]">STATUS: REALTIME SYNCHRONIZED</span>
              </div>

              {/* Dynamic Visual Stage Container */}
              <div className="p-6 rounded-lg bg-[#090b0e] border border-[#202938] min-h-[300px] flex flex-col justify-center items-center text-center space-y-4">
                {activeChapterIndex === 0 && (
                  <div className="space-y-3 w-full">
                    <Server className="w-12 h-12 text-[#f59e0b] mx-auto animate-pulse" />
                    <p className="font-mono text-sm font-bold text-[#f8fafc]">epoll_wait() Event Multiplexing</p>
                    <p className="text-xs text-[#94a3b8] max-w-sm mx-auto">
                      Non-blocking file descriptors waiting on kernel readiness queue. Zero context-switching overhead.
                    </p>
                    <div className="p-2.5 rounded bg-[#11151c] border border-[#202938] font-mono text-xs text-[#22c55e]">
                      READY SOCKS: 50,000 | TIME SLICE: 0.02ms | THREADS: 1
                    </div>
                  </div>
                )}

                {activeChapterIndex === 1 && (
                  <div className="space-y-3 w-full">
                    <Cpu className="w-12 h-12 text-[#f59e0b] mx-auto animate-pulse" />
                    <p className="font-mono text-sm font-bold text-[#f8fafc]">Atomic Ring Buffer & Backpressure</p>
                    <p className="text-xs text-[#94a3b8] max-w-sm mx-auto">
                      Lock-free circular FIFO memory buffer. When consumer lags, upstream socket reads pause automatically.
                    </p>
                    <div className="p-2.5 rounded bg-[#11151c] border border-[#202938] font-mono text-xs text-[#f59e0b]">
                      RING FILL: 42% | LOCKLESS CAS OPS: 4.8M/sec | DROPS: 0
                    </div>
                  </div>
                )}

                {activeChapterIndex === 2 && (
                  <div className="space-y-3 w-full">
                    <HardDrive className="w-12 h-12 text-[#f59e0b] mx-auto animate-pulse" />
                    <p className="font-mono text-sm font-bold text-[#f8fafc]">Write Ahead Log & Atomic Disk Sync</p>
                    <p className="text-xs text-[#94a3b8] max-w-sm mx-auto">
                      Append-only sequential disk writes. Group commits guarantee complete transaction persistence through power outage.
                    </p>
                    <div className="p-2.5 rounded bg-[#11151c] border border-[#202938] font-mono text-xs text-[#22c55e]">
                      FLUSH MODE: O_DIRECT | BATCH SIZE: 4KB | INTEGRITY: 100%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View: 3 Discrete Cards with Connected Progression Lines */}
        <div className="lg:hidden space-y-6">
          {CHAPTERS.map((c, idx) => (
            <div key={c.id} className="relative">
              <div className="p-5 rounded-xl border border-[#202938] bg-[#11151c] shadow-inset-highlight space-y-3">
                <span className="font-mono text-xs font-bold text-[#f59e0b] tracking-wider block">
                  {c.badge}
                </span>
                <h3 className="text-lg font-bold text-[#f8fafc]">
                  {c.title}
                </h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  {c.summary}
                </p>
                <div className="space-y-1.5 pt-2 border-t border-[#202938]">
                  {c.details.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#f8fafc]">
                      <span className="text-[#22c55e]">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              {idx < CHAPTERS.length - 1 && (
                <div className="flex justify-center my-2 text-[#f59e0b]">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
