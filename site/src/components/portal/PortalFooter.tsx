import React, { useState, useEffect } from 'react';
import { Clock, Shield, ExternalLink } from 'lucide-react';

export interface PortalFooterProps {
  onEnterDotNetCourse: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenLegal: (page: 'privacy' | 'terms' | 'contact') => void;
}

export const PortalFooter: React.FC<PortalFooterProps> = ({
  onEnterDotNetCourse,
  onNavigateSection,
  onOpenLegal,
}) => {
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Indian Standard Time (IST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setIstTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="border-t border-[#202938] bg-[#090b0e] text-[#94a3b8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Column 1: Brand & Live IST Server Clock */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-xl text-[#f8fafc]">Karmatix</span>
              <span className="font-mono text-xs text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/20 px-2 py-0.5 rounded-full font-medium">
                [Learning]
              </span>
            </div>
            <p className="text-sm text-[#94a3b8] max-w-sm leading-relaxed">
              Engineering education the clear way. First-principles systems architecture, production codebases, and interactive mental models for software craftsmen.
            </p>

            {/* Live IST Server Clock */}
            <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 p-2.5 rounded-lg bg-[#11151c] border border-[#202938] font-mono text-xs text-[#f8fafc] max-w-full">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#22c55e] shrink-0" />
                <span className="text-[#64748b]">SERVER CLOCK:</span>
                <span className="text-[#f59e0b] font-bold">{istTime || '08:30:00'} IST</span>
              </div>
              <span className="text-[#64748b] text-[11px]">(Bangalore, IN)</span>
            </div>
          </div>

          {/* Column 2: Engineering Tracks */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#f8fafc] font-bold block">
              Curriculum Tracks
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={onEnterDotNetCourse}
                  className="hover:text-[#f59e0b] transition-colors flex items-center gap-1.5 text-left"
                >
                  <span className="text-[#22c55e]">●</span>
                  <span>.NET & Systems (Flagship)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('curriculum')}
                  className="hover:text-[#f59e0b] transition-colors text-left"
                >
                  Systems & Concurrency (Go / Rust)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('curriculum')}
                  className="hover:text-[#f59e0b] transition-colors text-left"
                >
                  Distributed Systems & Backend
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('curriculum')}
                  className="hover:text-[#f59e0b] transition-colors text-left"
                >
                  Full-Stack Engineering & Craft
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Tools */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#f8fafc] font-bold block">
              Resources
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigateSection('mental-models')}
                  className="hover:text-[#f59e0b] transition-colors text-left"
                >
                  Systems Dissection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('curriculum')}
                  className="hover:text-[#f59e0b] transition-colors text-left"
                >
                  TCP Congestion Sandbox
                </button>
              </li>
              <li>
                <button
                  onClick={onEnterDotNetCourse}
                  className="hover:text-[#f59e0b] transition-colors text-left"
                >
                  200+ Interview Q&A Hub
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/Karma-tic/dotnet-academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f59e0b] transition-colors flex items-center gap-1"
                >
                  <span>GitHub Repositories</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Publisher & Advisory */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#f8fafc] font-bold block">
              Publisher
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://karmatix.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f59e0b] transition-colors flex items-center gap-1"
                >
                  <span>Karmatix Studio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f59e0b] transition-colors"
                >
                  WhatsApp Advisory Desk
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('contact')}
                  className="hover:text-[#f59e0b] transition-colors text-left"
                >
                  Corporate L&D Inquiries
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-[#202938] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-[#64748b]">
            &copy; 2026 Karmatix. All rights reserved. Published in Bangalore, India.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[#94a3b8]">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#f8fafc] transition-colors flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Privacy Policy (DPDP Act)</span>
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#f8fafc] transition-colors"
            >
              Terms of Use
            </button>
            <button
              onClick={() => onOpenLegal('contact')}
              className="hover:text-[#f8fafc] transition-colors"
            >
              Refund Policy & Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
