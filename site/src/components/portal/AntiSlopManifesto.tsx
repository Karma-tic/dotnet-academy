import React, { useState } from 'react';
import { Eye, ShieldAlert, Sliders, RefreshCw } from 'lucide-react';

export const AntiSlopManifesto: React.FC = () => {
  // Card 1 State: Abstraction vs Memory Layout
  const [viewMemoryLayout, setViewMemoryLayout] = useState(false);

  // Card 2 State: Raft Consensus Node State
  const [nodes, setNodes] = useState<{ id: number; role: 'Leader' | 'Follower' | 'Candidate' | 'Dead' }[]>([
    { id: 1, role: 'Leader' },
    { id: 2, role: 'Follower' },
    { id: 3, role: 'Follower' },
  ]);
  const [electionLog, setElectionLog] = useState('Cluster Healthy: Node 1 heartbeat active (50ms)');

  const handleSimulateFailure = () => {
    setNodes([
      { id: 1, role: 'Dead' },
      { id: 2, role: 'Candidate' },
      { id: 3, role: 'Follower' },
    ]);
    setElectionLog('Heartbeat lost on Node 1. Node 2 initiating election term 2...');

    setTimeout(() => {
      setNodes([
        { id: 1, role: 'Dead' },
        { id: 2, role: 'Leader' },
        { id: 3, role: 'Follower' },
      ]);
      setElectionLog('Quorum reached. Node 2 elected new cluster Leader.');
    }, 1200);
  };

  const handleResetCluster = () => {
    setNodes([
      { id: 1, role: 'Leader' },
      { id: 2, role: 'Follower' },
      { id: 3, role: 'Follower' },
    ]);
    setElectionLog('Cluster reset. Node 1 restored as primary Leader.');
  };

  // Card 3 State: Architectural Trade-off Slider
  const [balance, setBalance] = useState<number>(50); // 0 = Strict Consistency, 100 = Max Throughput

  // Pointer spotlight handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="methodology" className="py-20 border-b border-[#202938]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11151c] border border-[#202938] text-xs font-mono font-medium text-[#f59e0b]">
            <span>ENGINEERING CRAFT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
            The Anti-Slop Manifesto
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            Real engineering begins where video tutorials stop. We replace superficial frameworks with core operating system internals, fault domains, and verified architectural reasoning.
          </p>
        </div>

        {/* 3-Column Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mystery Boilerplate vs Mechanical Sympathy */}
          <div
            onMouseMove={handleMouseMove}
            className="spotlight-card p-6 rounded-xl border border-[#202938] bg-[#11151c] shadow-inset-highlight flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#f59e0b] uppercase tracking-wider font-semibold">
                  Internals Focus
                </span>
                <Eye className="w-4 h-4 text-[#94a3b8]" />
              </div>
              <h3 className="text-lg font-bold text-[#f8fafc]">
                Mystery Boilerplate vs Mechanical Sympathy
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Stop treating libraries as magic black boxes. Understand memory layouts, cache misses, and network serialization from first principles.
              </p>
            </div>

            {/* Interactive Toggle Box */}
            <div className="p-4 rounded-lg bg-[#090b0e] border border-[#202938] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#94a3b8]">Inspection Mode:</span>
                <button
                  onClick={() => setViewMemoryLayout(!viewMemoryLayout)}
                  className="px-2.5 py-1 text-xs font-mono rounded-full bg-[#19202c] border border-[#334155] text-[#f59e0b] hover:border-[#f59e0b] transition-colors min-h-[32px]"
                >
                  {viewMemoryLayout ? 'View High-Level' : 'Inspect Raw Memory'}
                </button>
              </div>

              {!viewMemoryLayout ? (
                <div className="font-mono text-xs text-[#94a3b8] bg-[#11151c] p-3 rounded border border-[#202938]">
                  <p className="text-[#f8fafc]">// Opaque Object Reference</p>
                  <p>Order {`{ id: 4021, price: 99.50 }`}</p>
                  <p className="text-[#64748b] text-[11px] mt-1">Pointer heap indirection (unknown overhead)</p>
                </div>
              ) : (
                <div className="font-mono text-xs space-y-1 bg-[#11151c] p-3 rounded border border-[#f59e0b]/40">
                  <p className="text-[#22c55e]">// 64-Byte Cache Line Layout</p>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#94a3b8]">0x00: u64 id (8B)</span>
                    <span className="text-[#f59e0b]">Aligned</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#94a3b8]">0x08: f64 price (8B)</span>
                    <span className="text-[#f59e0b]">L1 Hit: 0.9ns</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#64748b]">0x10: 48B Data Buffer</span>
                    <span className="text-[#22c55e]">Zero Copy</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Disposable Demos vs Production Resilience */}
          <div
            onMouseMove={handleMouseMove}
            className="spotlight-card p-6 rounded-xl border border-[#202938] bg-[#11151c] shadow-inset-highlight flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#f59e0b] uppercase tracking-wider font-semibold">
                  Fault Isolation
                </span>
                <ShieldAlert className="w-4 h-4 text-[#94a3b8]" />
              </div>
              <h3 className="text-lg font-bold text-[#f8fafc]">
                Disposable Demos vs Production Resilience
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                We do not build trivial todo apps. You construct durable queues, Raft consensus clusters, and fault-isolated micro-services.
              </p>
            </div>

            {/* Interactive Raft Simulator */}
            <div className="p-4 rounded-lg bg-[#090b0e] border border-[#202938] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8]">Cluster Nodes:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSimulateFailure}
                    className="px-2 py-1 text-[11px] rounded bg-red-950/60 border border-red-800/80 text-red-300 hover:bg-red-900/60 transition-colors"
                  >
                    Kill Leader
                  </button>
                  <button
                    onClick={handleResetCluster}
                    className="p-1 rounded bg-[#19202c] border border-[#334155] text-[#94a3b8] hover:text-[#f8fafc]"
                    title="Reset Cluster"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Node Chips */}
              <div className="grid grid-cols-3 gap-2">
                {nodes.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2 rounded text-center border text-[11px] ${
                      n.role === 'Leader'
                        ? 'bg-[#19202c] border-[#f59e0b] text-[#f59e0b]'
                        : n.role === 'Dead'
                        ? 'bg-red-950/30 border-red-900 text-red-400 opacity-60'
                        : n.role === 'Candidate'
                        ? 'bg-amber-950/40 border-amber-500 text-amber-300 animate-pulse'
                        : 'bg-[#11151c] border-[#202938] text-[#94a3b8]'
                    }`}
                  >
                    <p className="font-bold">Node {n.id}</p>
                    <p className="text-[10px]">{n.role}</p>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-[#64748b] truncate pt-1 border-t border-[#202938]">
                {electionLog}
              </p>
            </div>
          </div>

          {/* Card 3: AI Syntax vs Architectural Judgment */}
          <div
            onMouseMove={handleMouseMove}
            className="spotlight-card p-6 rounded-xl border border-[#202938] bg-[#11151c] shadow-inset-highlight flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#f59e0b] uppercase tracking-wider font-semibold">
                  System Design
                </span>
                <Sliders className="w-4 h-4 text-[#94a3b8]" />
              </div>
              <h3 className="text-lg font-bold text-[#f8fafc]">
                AI Syntax vs Architectural Judgment
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Copilots generate syntax in seconds. Great engineers design data contracts, backpressure strategies, and consistency boundaries.
              </p>
            </div>

            {/* Interactive Trade-off Balance Slider */}
            <div className="p-4 rounded-lg bg-[#090b0e] border border-[#202938] space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-[#94a3b8]">
                <span>Architectural Trade-off:</span>
                <span className="text-[#f59e0b] font-semibold">
                  {balance < 40 ? 'Linearizable ACID' : balance > 65 ? 'Eventual High-P99' : 'Balanced Quorum'}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full accent-[#f59e0b] cursor-pointer"
                aria-label="Trade-off balance slider"
              />

              <div className="grid grid-cols-3 gap-1 pt-1 text-[11px]">
                <div className="p-1.5 rounded bg-[#11151c] border border-[#202938] text-center">
                  <span className="text-[#64748b] block text-[9px]">CONSISTENCY</span>
                  <span className="text-[#f8fafc] font-bold">{100 - balance}%</span>
                </div>
                <div className="p-1.5 rounded bg-[#11151c] border border-[#202938] text-center">
                  <span className="text-[#64748b] block text-[9px]">THROUGHPUT</span>
                  <span className="text-[#f59e0b] font-bold">{balance * 120}k rps</span>
                </div>
                <div className="p-1.5 rounded bg-[#11151c] border border-[#202938] text-center">
                  <span className="text-[#64748b] block text-[9px]">LATENCY P99</span>
                  <span className="text-[#22c55e] font-bold">{Math.round(2 + (100 - balance) * 0.18)}ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
