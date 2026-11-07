import React, { useState } from 'react';
import { Folder, FileCode, CheckCircle2, Download, MessageSquare, ArrowRight, Sparkles, Terminal } from 'lucide-react';

export interface CurriculumTracksProps {
  onEnterDotNetCourse: () => void;
}

interface TrackData {
  id: string;
  name: string;
  tag: string;
  tagVariant: 'live' | 'upcoming';
  duration: string;
  prerequisites: string[];
  description: string;
  price: string;
  emi: string;
  cohort: string;
  capstoneName: string;
  fileTree: { name: string; isFolder?: boolean; children?: string[] }[];
  isFlagship?: boolean;
}

const TRACKS: TrackData[] = [
  {
    id: 'dotnet',
    name: '.NET & Systems Architecture',
    tag: 'Flagship Active',
    tagVariant: 'live',
    duration: '12 Weeks (Self-Paced or Guided)',
    cohort: 'Immediate Access / Cohort: 15 Nov',
    prerequisites: ['Basic familiarity with any programming language', 'Curiosity for systems engineering and high-throughput backends'],
    description: 'Master modern .NET 10 LTS and C# 14 from zero programming to production cloud microservices. Includes 16 compilable solution projects, 200+ interview questions, 6 timed mock exams, and Clean Architecture capstones.',
    price: 'Free Self-Paced (₹0)',
    emi: 'Guided Cohort Mentorship: ₹14,999 (or ₹1,250/mo)',
    capstoneName: 'Production Microservice: Clean Architecture + Docker',
    isFlagship: true,
    fileTree: [
      {
        name: 'src/CleanArchitecture.Core',
        isFolder: true,
        children: ['Entities/Order.cs', 'ValueObjects/Money.cs', 'Events/OrderCreatedEvent.cs', 'Interfaces/IOrderRepository.cs'],
      },
      {
        name: 'src/CleanArchitecture.Infrastructure',
        isFolder: true,
        children: ['Persistence/AppDbContext.cs', 'Repositories/CachedOrderRepository.cs', 'Channels/OrderChannelProcessor.cs'],
      },
      {
        name: 'src/CleanArchitecture.Api',
        isFolder: true,
        children: ['Endpoints/OrderEndpoints.cs', 'Middleware/GlobalExceptionMiddleware.cs', 'Program.cs', 'Dockerfile'],
      },
      {
        name: 'tests/Architecture.Tests',
        isFolder: true,
        children: ['DomainRulesTests.cs', 'BenchmarkThroughputTests.cs'],
      },
    ],
  },
  {
    id: 'systems',
    name: 'Systems & Concurrency',
    tag: 'Next Batch: 15 Nov',
    tagVariant: 'live',
    duration: '12 Weeks (Live Cohort)',
    cohort: 'Starting 15 Nov (Seats Limited)',
    prerequisites: ['Proficiency in at least one procedural or OOP language', 'Understanding of basic terminal commands and git'],
    description: 'Deconstruct operating systems and runtime internals. Build custom memory allocators, cooperative thread schedulers, and high-performance network polling engines in Go and Rust.',
    price: '₹14,999',
    emi: 'No-Cost EMI available from ₹1,250/month',
    capstoneName: 'Custom epoll Non-Blocking TCP Server in Rust',
    fileTree: [
      {
        name: 'crates/runtime_core',
        isFolder: true,
        children: ['scheduler/stealing_pool.rs', 'mem/arena_allocator.rs', 'event/epoll_engine.rs'],
      },
      {
        name: 'crates/networking',
        isFolder: true,
        children: ['tcp/socket_handler.rs', 'buffer/ring_buffer.rs', 'protocol/frame_parser.rs'],
      },
      {
        name: 'benches',
        isFolder: true,
        children: ['concurrency_throughput.rs', 'allocation_latency.rs'],
      },
    ],
  },
  {
    id: 'distributed',
    name: 'Distributed Systems & Backend',
    tag: 'Cohort: 15 Nov',
    tagVariant: 'live',
    duration: '12 Weeks (Live Cohort)',
    cohort: 'Starting 15 Nov (Seats Limited)',
    prerequisites: ['Experience building backend APIs', 'Basic understanding of relational databases and networking'],
    description: 'Learn how massive global platforms withstand network partitions. Construct durable write ahead logs, Raft consensus quorums, event stream brokers, and partitioned Key-Value storage.',
    price: '₹14,999',
    emi: 'No-Cost EMI available from ₹1,250/month',
    capstoneName: 'Distributed Raft Consensus Key-Value Store',
    fileTree: [
      {
        name: 'internal/raft',
        isFolder: true,
        children: ['election.go', 'log_replication.go', 'heartbeat.go', 'rpc_transport.go'],
      },
      {
        name: 'internal/storage',
        isFolder: true,
        children: ['wal/wal_writer.go', 'lsm/memtable.go', 'lsm/sstable_compaction.go'],
      },
      {
        name: 'cmd/server',
        isFolder: true,
        children: ['main.go', 'docker-compose.cluster.yml'],
      },
    ],
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Engineering & Craft',
    tag: 'Cohort: 01 Dec',
    tagVariant: 'upcoming',
    duration: '12 Weeks (Live Cohort)',
    cohort: 'Starting 01 Dec (Admissions Open)',
    prerequisites: ['Familiarity with HTML, CSS, and modern JavaScript/TypeScript'],
    description: 'Bridge frontend concurrency with high-speed backend execution. Master React Concurrent Mode, streaming SSR, Edge middleware, database indexing, and sub-100ms API engineering.',
    price: '₹14,999',
    emi: 'No-Cost EMI available from ₹1,250/month',
    capstoneName: 'Realtime Collaborative Canvas Engine',
    fileTree: [
      {
        name: 'apps/web',
        isFolder: true,
        children: ['components/CanvasRenderer.tsx', 'hooks/useConflictResolution.ts', 'workers/compression.worker.ts'],
      },
      {
        name: 'apps/api',
        isFolder: true,
        children: ['routes/sync.ts', 'services/delta_merger.ts', 'db/schema.prisma'],
      },
    ],
  },
];

export const CurriculumTracks: React.FC<CurriculumTracksProps> = ({
  onEnterDotNetCourse,
}) => {
  const [activeTrackId, setActiveTrackId] = useState<string>('dotnet');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'src/CleanArchitecture.Core': true,
    'src/CleanArchitecture.Infrastructure': true,
    'src/CleanArchitecture.Api': true,
    'crates/runtime_core': true,
    'internal/raft': true,
    'apps/web': true,
  });

  const activeTrack = TRACKS.find((t) => t.id === activeTrackId) || TRACKS[0];

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  return (
    <section id="curriculum" className="py-20 border-b border-[#202938]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11151c] border border-[#202938] text-xs font-mono font-medium text-[#f59e0b]">
            <span>ENGINEERING TRACKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
            Curriculum Tracks & Interactive Syllabus
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            Choose a rigorous engineering path. Every track includes production codebases, architecture teardowns, and interview-grade capstones.
          </p>
        </div>

        {/* Segmented Track Controller (Tabs) */}
        <div className="flex overflow-x-auto gap-2 pb-2 border-b border-[#202938]">
          {TRACKS.map((t) => {
            const isActive = activeTrackId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTrackId(t.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors min-h-[44px] flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#f59e0b] text-black font-semibold shadow-sm'
                    : 'bg-[#11151c] border border-[#202938] text-[#94a3b8] hover:text-[#f8fafc] hover:border-[#334155]'
                }`}
              >
                <span>{t.name}</span>
                {t.isFlagship && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isActive ? 'bg-black/20 text-black' : 'bg-[#f59e0b]/15 text-[#f59e0b]'
                  }`}>
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Inspector Card Details */}
        <div className="p-6 sm:p-8 rounded-xl border border-[#202938] bg-[#11151c] shadow-inset-highlight space-y-8">
          {/* Track Header & Tag */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202938] pb-6">
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <h3 className="text-xl sm:text-2xl font-bold text-[#f8fafc] break-words">
                  {activeTrack.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#22c55e] shrink-0">
                  {activeTrack.tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#94a3b8] max-w-3xl leading-relaxed">
                {activeTrack.description}
              </p>
            </div>

            {/* Price Badge */}
            <div className="p-4 rounded-xl bg-[#090b0e] border border-[#202938] text-left md:text-right font-mono shrink-0 w-full md:w-auto">
              <span className="text-xs text-[#64748b] block">TUITION & ACCESS</span>
              <p className="text-xl sm:text-2xl font-bold text-[#f59e0b]">{activeTrack.price}</p>
              <p className="text-[11px] text-[#94a3b8]">{activeTrack.emi}</p>
            </div>
          </div>

          {/* 2-Column Inspector: Prerequisites & File Tree */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Track Overview & Prerequisites */}
            <div className="lg:col-span-5 min-w-0 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-xs font-semibold text-[#f59e0b] uppercase tracking-wider block">
                  Prerequisites Checklist
                </span>
                <div className="space-y-2">
                  {activeTrack.prerequisites.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#f8fafc]">
                      <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#090b0e] border border-[#202938] space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[#94a3b8]">
                  <span>Duration:</span>
                  <span className="text-[#f8fafc] font-semibold">{activeTrack.duration}</span>
                </div>
                <div className="flex items-center justify-between text-[#94a3b8]">
                  <span>Admissions Status:</span>
                  <span className="text-[#22c55e] font-semibold">{activeTrack.cohort}</span>
                </div>
                <div className="flex items-center justify-between text-[#94a3b8]">
                  <span>Capstone Project:</span>
                  <span className="text-[#f59e0b] font-semibold text-right max-w-[200px] truncate">{activeTrack.capstoneName}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {activeTrack.isFlagship ? (
                  <button
                    onClick={onEnterDotNetCourse}
                    className="px-6 py-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-black font-semibold text-sm rounded-full transition-transform active:scale-95 shadow-sm min-h-[44px] flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Enter .NET Academy (12 Modules)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href="https://wa.me/919999999999?text=Hi%20Karmatix%2C%20I%20am%20interested%20in%20enrolling%20in%20the%20track."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-black font-semibold text-sm rounded-full transition-transform active:scale-95 shadow-sm min-h-[44px] flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-black" />
                    <span>Enroll via WhatsApp (+91)</span>
                  </a>
                )}

                <a
                  href="https://wa.me/919999999999?text=Hi%20Karmatix%2C%20please%20share%20the%20detailed%20syllabus%20PDF."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-[#090b0e] hover:bg-[#19202c] border border-[#202938] hover:border-[#334155] text-[#f8fafc] text-xs font-mono font-medium rounded-full transition-colors min-h-[44px] flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#94a3b8]" />
                  <span>Download Syllabus (PDF)</span>
                </a>
              </div>
            </div>

            {/* Right: Interactive Capstone File Tree */}
            <div className="lg:col-span-7 min-w-0 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#f59e0b] uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Capstone Repository Architecture</span>
                </span>
                <span className="font-mono text-[11px] text-[#64748b]">100% Compilable Tree</span>
              </div>

              {/* Terminal Viewport */}
              <div className="p-4 rounded-xl bg-[#090b0e] border border-[#202938] font-mono text-xs text-[#94a3b8] space-y-2 max-h-[320px] overflow-y-auto">
                <div className="text-[#64748b] text-[11px] pb-1 border-b border-[#202938]">
                  repo: karmatix-academy / {activeTrack.id}-capstone
                </div>

                {activeTrack.fileTree.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <button
                      onClick={() => item.isFolder && toggleFolder(item.name)}
                      className="flex items-center gap-2 text-[#f8fafc] hover:text-[#f59e0b] w-full text-left font-semibold"
                    >
                      <Folder className="w-4 h-4 text-[#f59e0b]" />
                      <span>{item.name}</span>
                    </button>

                    {item.children && expandedFolders[item.name] && (
                      <div className="pl-6 space-y-1 border-l border-[#202938] ml-2">
                        {item.children.map((child, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2 text-xs text-[#94a3b8] hover:text-[#f8fafc]">
                            <FileCode className="w-3.5 h-3.5 text-[#64748b]" />
                            <span>{child}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
