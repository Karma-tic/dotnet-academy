import React, { useState } from 'react';
import { MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';

export interface PortalNavProps {
  onNavigateSection: (sectionId: string) => void;
  onEnterDotNetCourse: () => void;
}

export const PortalNav: React.FC<PortalNavProps> = ({
  onNavigateSection,
  onEnterDotNetCourse,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16 backdrop-blur-md bg-[#090b0e]/90 border-b border-[#202938] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-2">
        {/* Left: Brand Wordmark + [Learning] Pill */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-1.5 sm:gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-[#f59e0b] rounded-lg p-1"
          >
            <span className="font-bold text-base sm:text-xl tracking-tight text-white">
              Karmatix
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/20 px-1.5 sm:px-2 py-0.5 rounded-full font-medium">
              [Learning]
            </span>
          </button>
        </div>

        {/* Center: Desktop Navigation Anchors */}
        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium text-[#94a3b8]">
          <button
            onClick={() => handleNavClick('curriculum')}
            className="px-3 py-2 rounded-lg hover:text-[#f8fafc] hover:bg-[#11151c] transition-colors min-h-[44px] flex items-center"
          >
            Curriculum
          </button>
          <button
            onClick={() => handleNavClick('methodology')}
            className="px-3 py-2 rounded-lg hover:text-[#f8fafc] hover:bg-[#11151c] transition-colors min-h-[44px] flex items-center"
          >
            Methodology
          </button>
          <button
            onClick={() => handleNavClick('mental-models')}
            className="px-3 py-2 rounded-lg hover:text-[#f8fafc] hover:bg-[#11151c] transition-colors min-h-[44px] flex items-center"
          >
            Mental Models
          </button>
          <button
            onClick={() => handleNavClick('admissions')}
            className="px-3 py-2 rounded-lg hover:text-[#f8fafc] hover:bg-[#11151c] transition-colors min-h-[44px] flex items-center"
          >
            Admissions
          </button>
        </nav>

        {/* Right: Live Cohort Beacon + WhatsApp + Primary CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Live Cohort Beacon */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#11151c] border border-[#202938] text-xs text-[#94a3b8]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
            </span>
            <span>Next Batch: 15 Nov</span>
          </div>

          {/* Secondary Action: WhatsApp Counselor */}
          <a
            href="https://wa.me/919999999999?text=Hi%20Karmatix%20Team%2C%20I%20have%20questions%20about%20the%20engineering%20tracks."
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#11151c] border border-transparent hover:border-[#202938] rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Chat directly with an engineering mentor on WhatsApp"
            aria-label="Chat with counselor on WhatsApp"
          >
            <MessageSquare className="w-5 h-5 text-[#22c55e]" />
          </a>

          {/* Primary CTA: Explore Tracks */}
          <button
            onClick={() => handleNavClick('curriculum')}
            className="px-4 py-2 bg-[#f59e0b] hover:bg-[#fbbf24] text-black font-medium text-sm rounded-full transition-transform active:scale-95 shadow-sm min-h-[44px] flex items-center gap-1.5"
          >
            <span>Explore Tracks</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-1 sm:gap-2 shrink-0">
          <a
            href="https://wa.me/919999999999?text=Hi%20Karmatix%20Team%2C%20I%20have%20questions%20about%20the%20engineering%20tracks."
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#22c55e] hover:bg-[#11151c] rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
            aria-label="WhatsApp counselor"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#11151c] min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#090b0e] border-b border-[#202938] px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#11151c] border border-[#202938] text-xs text-[#94a3b8] w-fit mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
            </span>
            <span>Next Batch: 15 Nov</span>
          </div>

          <button
            onClick={() => handleNavClick('curriculum')}
            className="block w-full text-left px-3 py-2 text-sm text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#11151c] rounded-lg"
          >
            Curriculum
          </button>
          <button
            onClick={() => handleNavClick('methodology')}
            className="block w-full text-left px-3 py-2 text-sm text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#11151c] rounded-lg"
          >
            Methodology
          </button>
          <button
            onClick={() => handleNavClick('mental-models')}
            className="block w-full text-left px-3 py-2 text-sm text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#11151c] rounded-lg"
          >
            Mental Models
          </button>
          <button
            onClick={() => handleNavClick('admissions')}
            className="block w-full text-left px-3 py-2 text-sm text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#11151c] rounded-lg"
          >
            Admissions
          </button>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onEnterDotNetCourse();
              }}
              className="w-full py-2.5 px-4 bg-[#f59e0b] hover:bg-[#fbbf24] text-black font-medium text-sm rounded-full text-center"
            >
              Start .NET Flagship Track
            </button>
            <a
              href="https://wa.me/919999999999?text=Hi%20Karmatix%20Team%2C%20I%20have%20questions%20about%20the%20engineering%20tracks."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#11151c] border border-[#202938] text-[#f8fafc] text-sm rounded-full text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#22c55e]" />
              <span>Chat on WhatsApp (+91)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
