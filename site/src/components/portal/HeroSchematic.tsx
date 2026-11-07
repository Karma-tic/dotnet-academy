import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, MessageSquare, Activity, Cpu, Database, Network } from 'lucide-react';

export interface HeroSchematicProps {
  onExploreClick: () => void;
  onEnterFlagshipClick: () => void;
}

interface TelemetryData {
  title: string;
  metric1: string;
  metric2: string;
  metric3: string;
  latency: string;
}

const LAYER_TELEMETRY: Record<number, TelemetryData> = {
  1: {
    title: 'Layer 1: Network Ingress',
    metric1: 'Protocol: TCP / TLS 1.3 Handshake',
    metric2: 'Socket State: 48,290 Active Sockets',
    metric3: 'Event Multiplexer: epoll Edge-Triggered',
    latency: '0.28ms',
  },
  2: {
    title: 'Layer 2: Memory & Concurrency',
    metric1: 'Worker Pool: Lock-Free Ring Buffer',
    metric2: 'Cache Locality: 64-Byte Line Aligned',
    metric3: 'Contention Index: 0.04% Mutex Wait',
    latency: '12μs',
  },
  3: {
    title: 'Layer 3: Storage & Log Buffer',
    metric1: 'Log Engine: Sequential Write Ahead Log',
    metric2: 'Sync Mode: O_DIRECT Block Allocation',
    metric3: 'Durability Boundary: Group fsync',
    latency: '0.42ms',
  },
};

export const HeroSchematic: React.FC<HeroSchematicProps> = ({
  onExploreClick,
}) => {
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas visual rendering for animated schematic trace
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let packetOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle grid
      ctx.strokeStyle = '#202938';
      ctx.lineWidth = 1;
      const gridSize = 28;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Three Architectural Planes (Isometric Perspective)
      const planes = [
        { id: 1, y: 70, label: 'L1: Ingress & TLS Termination', color: activeLayer === 1 ? '#f59e0b' : '#334155' },
        { id: 2, y: 175, label: 'L2: Memory & Worker Concurrency', color: activeLayer === 2 ? '#f59e0b' : '#334155' },
        { id: 3, y: 280, label: 'L3: Write Ahead Log & Disk Flush', color: activeLayer === 3 ? '#f59e0b' : '#334155' },
      ];

      planes.forEach((plane) => {
        // Plane platform
        ctx.fillStyle = plane.id === activeLayer ? '#19202c' : '#11151c';
        ctx.strokeStyle = plane.color;
        ctx.lineWidth = plane.id === activeLayer ? 2 : 1;

        ctx.beginPath();
        ctx.roundRect(40, plane.y, canvas.width - 80, 68, 8);
        ctx.fill();
        ctx.stroke();

        // Platform label
        ctx.fillStyle = plane.id === activeLayer ? '#f8fafc' : '#94a3b8';
        ctx.font = '600 13px JetBrains Mono, monospace';
        ctx.fillText(plane.label, 56, plane.y + 26);

        // Sub status line
        ctx.fillStyle = plane.id === activeLayer ? '#f59e0b' : '#64748b';
        ctx.font = '500 11px JetBrains Mono, monospace';
        const sub = plane.id === 1 ? 'TCP Socket Flow' : plane.id === 2 ? 'L1/L2 Cache Prefetch' : 'Direct IO Append';
        ctx.fillText(sub, 56, plane.y + 48);

        // Active node indicator
        ctx.fillStyle = plane.id === activeLayer ? '#22c55e' : '#475569';
        ctx.beginPath();
        ctx.arc(canvas.width - 64, plane.y + 34, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Data Trace Connecting Lines
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      // Vertical bus line
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 138);
      ctx.lineTo(canvas.width / 2, 175);
      ctx.moveTo(canvas.width / 2, 243);
      ctx.lineTo(canvas.width / 2, 280);
      ctx.stroke();
      ctx.setLineDash([]);

      // Animated traveling data packet
      packetOffset = (packetOffset + 1.5) % 280;
      const packetY = 70 + packetOffset;
      if (packetY < 348) {
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, packetY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeLayer]);

  const currentTelemetry = LAYER_TELEMETRY[activeLayer];

  return (
    <section id="hero" className="relative pt-20 pb-16 md:pt-28 md:pb-24 border-b border-[#202938] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (55% budget: max 4 text elements, <= 2 lines headline, <= 20 words subtext) */}
          <div className="lg:col-span-7 min-w-0 space-y-6">
            {/* 1. Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11151c] border border-[#202938] text-[11px] sm:text-xs font-mono font-medium text-[#f59e0b] max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse shrink-0"></span>
              <span className="truncate">SYSTEMS FIRST · ZERO HAND-WAVING</span>
            </div>

            {/* 2. Headline (Strictly max 2 lines on desktop) */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#f8fafc] leading-[1.15] break-words">
              Engineering education<br className="sm:hidden" /> the clear way.
            </h1>

            {/* 3. Subtext (Strictly <= 20 words: exactly 17 words) */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl">
              Master software engineering through interactive mental models, production codebases, and systems architecture from first principles.
            </p>

            {/* 4. CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-black font-semibold text-sm rounded-full transition-transform active:scale-95 shadow-sm min-h-[44px] flex items-center justify-center gap-2"
              >
                <span>Explore Curriculum</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919999999999?text=Hi%20Karmatix%2C%20I%20want%20to%20learn%20more%20about%20the%20engineering%20tracks."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 bg-[#11151c] hover:bg-[#19202c] border border-[#202938] hover:border-[#334155] text-[#f8fafc] text-sm font-medium rounded-full transition-colors min-h-[44px] flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#22c55e]" />
                <span className="sm:hidden">Chat on WhatsApp (+91)</span>
                <span className="hidden sm:inline">Chat on WhatsApp (+91 Counselor)</span>
              </a>
            </div>

            {/* Trust Micro-Row */}
            <div className="pt-4 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-300 font-mono">
              <span className="px-2.5 py-1 rounded-full bg-[#11151c] border border-[#202938]">
                Go / Rust Internals
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#11151c] border border-[#202938]">
                Distributed Systems
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#11151c] border border-[#202938]">
                100% Real Codebases
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Glass Schematic Canvas */}
          <div className="lg:col-span-5 min-w-0 max-w-full">
            <div className="p-3 sm:p-5 rounded-xl border border-[#202938] bg-[#11151c] shadow-inset-highlight space-y-4 overflow-hidden w-full max-w-full">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-[#202938] pb-3 text-xs text-[#94a3b8]">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#f59e0b]" />
                  <span className="font-mono font-medium text-[#f8fafc]">SYSTEM SCHEMATIC</span>
                </div>
                <span className="font-mono text-[11px] text-[#22c55e]">INTERACTIVE ENGINE</span>
              </div>

              {/* Layer Selector Tabs */}
              <div className="grid grid-cols-3 gap-1 sm:gap-1.5 p-1 bg-[#090b0e] border border-[#202938] rounded-lg">
                {[
                  { id: 1, label: 'L1: Ingress', short: 'L1', icon: Network },
                  { id: 2, label: 'L2: Memory', short: 'L2', icon: Cpu },
                  { id: 3, label: 'L3: Storage', short: 'L3', icon: Database },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeLayer === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveLayer(item.id)}
                      className={`py-2 px-1 sm:px-2 rounded font-mono text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-colors min-h-[44px] ${
                        isActive
                          ? 'bg-[#19202c] text-[#f59e0b] border border-[#334155]'
                          : 'text-[#94a3b8] hover:text-[#f8fafc]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="hidden sm:inline">{item.label}</span>
                      <span className="sm:hidden">{item.short}</span>
                    </button>
                  );
                })}
              </div>

              {/* Canvas Viewport */}
              <div className="relative rounded-lg overflow-hidden border border-[#202938] bg-[#090b0e] w-full max-w-full">
                <canvas
                  ref={canvasRef}
                  width={420}
                  height={380}
                  style={{ width: '100%', maxWidth: '100%' }}
                  className="w-full max-w-full h-[240px] sm:h-[320px] block"
                />
              </div>

              {/* Live Telemetry Box */}
              <div className="p-3.5 rounded-lg bg-[#090b0e] border border-[#202938] space-y-1.5 font-mono text-xs overflow-hidden">
                <div className="flex items-center justify-between text-[#f8fafc] font-semibold border-b border-[#202938]/60 pb-1">
                  <span className="truncate mr-2">{currentTelemetry.title}</span>
                  <span className="text-[#f59e0b] shrink-0 text-[11px] sm:text-xs">latency: {currentTelemetry.latency}</span>
                </div>
                <p className="text-[#94a3b8] text-[11px] truncate">{currentTelemetry.metric1}</p>
                <p className="text-[#94a3b8] text-[11px] truncate">{currentTelemetry.metric2}</p>
                <p className="text-[#64748b] text-[11px] truncate">{currentTelemetry.metric3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
