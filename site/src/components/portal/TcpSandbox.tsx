import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw, AlertTriangle, Zap } from 'lucide-react';

export const TcpSandbox: React.FC = () => {
  const [packetLoss, setPacketLoss] = useState<number>(2); // 0% to 15%
  const [rtt, setRtt] = useState<number>(60); // 20ms to 240ms
  const [cwnd, setCwnd] = useState<number>(1); // Congestion Window in MSS
  const [ssthresh, setSsthresh] = useState<number>(32);
  const [phase, setPhase] = useState<'Slow Start' | 'Congestion Avoidance' | 'Packet Drop Recovery'>('Slow Start');
  const [history, setHistory] = useState<number[]>([1]);
  const [droppedPacket, setDroppedPacket] = useState<boolean>(false);

  // Simulation tick driving TCP Slow Start & Congestion Avoidance
  useEffect(() => {
    const intervalTime = Math.max(300, rtt * 4);

    const interval = setInterval(() => {
      // Check if packet loss occurs based on packetLoss percentage
      const willDrop = packetLoss > 0 && Math.random() * 100 < packetLoss;

      if (willDrop && cwnd > 2) {
        // Multiplicative Decrease on Drop
        setDroppedPacket(true);
        const newSsthresh = Math.max(2, Math.floor(cwnd / 2));
        setSsthresh(newSsthresh);
        setCwnd(Math.max(1, Math.floor(newSsthresh / 2)));
        setPhase('Packet Drop Recovery');
        setTimeout(() => setDroppedPacket(false), 400);
      } else {
        // Normal Growth
        setCwnd((prev) => {
          let nextCwnd = prev;
          if (prev < ssthresh) {
            // Slow start: Exponential growth
            nextCwnd = Math.min(64, prev * 2);
            setPhase('Slow Start');
          } else {
            // Congestion avoidance: Linear growth (+1 MSS per RTT)
            nextCwnd = Math.min(64, prev + 1);
            setPhase('Congestion Avoidance');
          }
          return nextCwnd;
        });
      }

      setHistory((prev) => {
        const updated = [...prev, cwnd];
        return updated.length > 20 ? updated.slice(updated.length - 20) : updated;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [packetLoss, rtt, cwnd, ssthresh]);

  const handleReset = () => {
    setCwnd(1);
    setSsthresh(32);
    setPhase('Slow Start');
    setHistory([1]);
    setDroppedPacket(false);
  };

  const throughputEst = useMemo(() => {
    // Math approximation: (cwnd * 1460 bytes * 8) / (rtt / 1000) in Mbps
    const bps = (cwnd * 1460 * 8) / (rtt / 1000);
    return (bps / 1_000_000).toFixed(1);
  }, [cwnd, rtt]);

  return (
    <section id="sandbox" className="py-20 border-b border-[#202938] bg-[#090b0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11151c] border border-[#202938] text-xs font-mono font-medium text-[#f59e0b]">
            <Zap className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>INTERACTIVE EXPERIMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
            TCP Congestion Window & Slow Start Simulator
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            Hands-on mental models build intuition faster than video streaming. Adjust packet loss and latency to watch the TCP congestion window adapt in real time.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="p-6 sm:p-8 rounded-xl border border-[#202938] bg-[#11151c] shadow-inset-highlight space-y-8">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-[#202938] pb-6">
            {/* Slider 1: Packet Loss */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-[#94a3b8]">
                <span>Simulate Packet Loss:</span>
                <span className="text-[#f59e0b] font-bold">{packetLoss}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={packetLoss}
                onChange={(e) => setPacketLoss(Number(e.target.value))}
                className="w-full accent-[#f59e0b] cursor-pointer"
                aria-label="Packet loss slider"
              />
              <span className="text-[11px] text-[#64748b]">0% (Lossless fiber) to 15% (Congested mobile 4G)</span>
            </div>

            {/* Slider 2: Round Trip Time (RTT) */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-[#94a3b8]">
                <span>Round Trip Time (RTT):</span>
                <span className="text-[#f59e0b] font-bold">{rtt}ms</span>
              </div>
              <input
                type="range"
                min="20"
                max="240"
                step="10"
                value={rtt}
                onChange={(e) => setRtt(Number(e.target.value))}
                className="w-full accent-[#f59e0b] cursor-pointer"
                aria-label="Round trip time slider"
              />
              <span className="text-[11px] text-[#64748b]">20ms (Local intra-region) to 240ms (Trans-oceanic)</span>
            </div>

            {/* Telemetry Summary & Reset */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#090b0e] border border-[#202938]">
              <div className="font-mono text-xs space-y-1">
                <span className="text-[#64748b] block text-[10px]">CURRENT PHASE</span>
                <span className={`font-bold ${
                  phase === 'Packet Drop Recovery' ? 'text-red-400' : phase === 'Slow Start' ? 'text-[#f59e0b]' : 'text-[#22c55e]'
                }`}>
                  {phase}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="p-2 rounded bg-[#19202c] border border-[#334155] text-[#94a3b8] hover:text-[#f8fafc] hover:border-[#f59e0b] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Reset Simulation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Live Packet Pipeline Visualization */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#94a3b8]">PACKETS IN FLIGHT (CWND: {cwnd} MSS):</span>
              <span className="text-[#22c55e] font-semibold">Throughput: {throughputEst} Mbps</span>
            </div>

            {/* Animated SVG Visualizer */}
            <div className="p-3 sm:p-4 rounded-xl bg-[#090b0e] border border-[#202938] overflow-hidden min-h-[140px] flex items-center">
              <div className="w-full flex items-center justify-between gap-2 sm:gap-4">
                {/* Client Node */}
                <div className="p-2 sm:p-3 rounded-lg bg-[#11151c] border border-[#202938] text-center font-mono text-[10px] sm:text-xs shrink-0 w-16 sm:w-24">
                  <span className="text-[#64748b] block text-[9px] sm:text-[10px]">CLIENT</span>
                  <span className="text-[#f8fafc] font-bold">Sender</span>
                </div>

                {/* Packet Flight Corridor */}
                <div className="flex-1 relative h-16 flex items-center justify-center overflow-hidden border-y border-[#202938]/40 min-w-0">
                  <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 px-1 sm:px-2 max-w-full">
                    {Array.from({ length: Math.min(24, cwnd) }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3.5 sm:w-4 h-5 sm:h-6 rounded-xs transition-all duration-300 flex items-center justify-center text-[8px] sm:text-[9px] font-mono font-bold ${
                          droppedPacket
                            ? 'bg-red-500/80 text-white scale-90'
                            : 'bg-[#f59e0b] text-black shadow-xs'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {droppedPacket && (
                    <div className="absolute inset-0 bg-red-950/50 backdrop-blur-xs flex items-center justify-center font-mono text-[10px] sm:text-xs text-red-400 font-bold gap-1 text-center p-1 animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">PACKET LOSS: MULTIPLICATIVE DECREASE</span>
                    </div>
                  )}
                </div>

                {/* Server Node */}
                <div className="p-2 sm:p-3 rounded-lg bg-[#11151c] border border-[#202938] text-center font-mono text-[10px] sm:text-xs shrink-0 w-16 sm:w-24">
                  <span className="text-[#64748b] block text-[9px] sm:text-[10px]">SERVER</span>
                  <span className="text-[#22c55e] font-bold">Receiver</span>
                </div>
              </div>
            </div>

            {/* CWND Progression Sparkline Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between items-center text-[11px] font-mono text-[#64748b]">
                <span>CWND HISTORICAL SAMPLES:</span>
                <span>ssthresh: {ssthresh} MSS</span>
              </div>
              <div className="h-10 flex items-end gap-1 p-1 bg-[#090b0e] border border-[#202938] rounded-lg">
                {history.map((val, idx) => {
                  const heightPercent = Math.min(100, Math.max(8, (val / 64) * 100));
                  return (
                    <div
                      key={idx}
                      style={{ height: `${heightPercent}%` }}
                      className={`flex-1 rounded-xs transition-all duration-200 ${
                        val >= ssthresh ? 'bg-[#22c55e]' : 'bg-[#f59e0b]'
                      }`}
                      title={`CWND: ${val} MSS`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
