import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Are these pre-recorded videos or live interactive cohorts?',
    a: 'We operate live cohorts with direct architecture teardowns, design reviews, and group discussions. Rather than passive video playlists, learning is anchored around interactive mental model simulators, real compilable Git repositories, and code walkthroughs.',
  },
  {
    q: 'What prior programming experience is required before joining?',
    a: 'Our flagship .NET track begins from first principles and progresses to high-throughput cloud microservices. Advanced tracks like Systems & Concurrency assume comfort with at least one programming language and basic understanding of terminal and Git operations.',
  },
  {
    q: 'Do you offer job placement guarantees?',
    a: 'No fake guarantees. We do not sell inflated placement marketing. Instead, we teach rigorous systems engineering fundamentals, provide 200+ battle-tested technical interview questions, 6 timed mock tests, and real GitHub capstones that demonstrate clear engineering competence.',
  },
  {
    q: 'Can my company sponsor my tuition?',
    a: 'Yes. Many engineering teams sponsor our tracks through their annual learning and development budget. We provide formal GST-compliant invoices and company onboarding documentation upon enrollment.',
  },
];

export const EngineeringFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 border-b border-[#202938] bg-[#090b0e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11151c] border border-[#202938] text-xs font-mono font-medium text-[#f59e0b]">
            <HelpCircle className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>DIRECT ANSWERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
            Engineering Directness FAQ
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            Straight answers to common technical, curriculum, and admissions questions. Zero sales fluff.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[#202938] bg-[#11151c] shadow-inset-highlight overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#f8fafc] hover:text-[#f59e0b] transition-colors min-h-[52px]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#94a3b8] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#f59e0b]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#94a3b8] leading-relaxed border-t border-[#202938]/60">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
