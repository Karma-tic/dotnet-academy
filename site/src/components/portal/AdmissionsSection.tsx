import React from 'react';
import { MessageSquare, ArrowRight, ShieldCheck, CheckCircle2, CreditCard, Users, FileCheck } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Syllabus Evaluation',
    desc: 'Review the technical prerequisites, core concepts, and capstone repository architecture for your selected track.',
    icon: FileCheck,
  },
  {
    num: '02',
    title: 'Instructor Fit Call',
    desc: 'Schedule a direct 15-minute conversation over WhatsApp or Google Meet with an active engineering instructor.',
    icon: Users,
  },
  {
    num: '03',
    title: 'Transparent Payment',
    desc: 'Complete enrollment through UPI, Indian NetBanking, or 0% No-Cost EMI options. Formal GST invoices provided.',
    icon: CreditCard,
  },
  {
    num: '04',
    title: 'Repository Access',
    desc: 'Receive your private GitHub repository invite, architectural discord access, and cohort calendar onboarding.',
    icon: ShieldCheck,
  },
];

export const AdmissionsSection: React.FC = () => {
  return (
    <section id="admissions" className="py-20 border-b border-[#202938]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11151c] border border-[#202938] text-xs font-mono font-medium text-[#f59e0b]">
            <span>ADMISSIONS ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
            Transparent Admissions & Payment
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            Zero high-pressure sales calls. We assess mutual engineering fit before accepting any payment.
          </p>
        </div>

        {/* 4-Step Roadmap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[#202938] bg-[#11151c] shadow-inset-highlight space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/20 px-2.5 py-1 rounded-full">
                      STEP {s.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#94a3b8]" />
                  </div>
                  <h3 className="text-base font-bold text-[#f8fafc]">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#202938] text-[11px] font-mono text-[#22c55e] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Advisor Callout Card */}
        <div className="p-6 sm:p-8 rounded-xl border border-[#202938] bg-gradient-to-r from-[#11151c] via-[#11151c] to-[#19202c] shadow-inset-highlight flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-[#22c55e] font-bold block">
              Direct Engineering Advisory
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#f8fafc]">
              Unsure which track fits your background?
            </h3>
            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
              Speak directly with an engineering mentor over WhatsApp. Get honest technical guidance on prerequisites, work commitments, and career goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/919999999999?text=Hi%20Karmatix%2C%20I%20would%20like%20guidance%20on%20which%20track%20best%20fits%20my%20background."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold text-sm rounded-full transition-transform active:scale-95 shadow-sm min-h-[44px] flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-black" />
              <span>Connect on WhatsApp (+91)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
