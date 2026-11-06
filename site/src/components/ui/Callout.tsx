import React from 'react';
import { Lightbulb, AlertTriangle, Info, HelpCircle, ShieldCheck } from 'lucide-react';

export type CalloutType = 'tip' | 'warning' | 'note' | 'interview' | 'enterprise';

export interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'note',
  title,
  children,
  className = '',
}) => {
  const configs = {
    tip: {
      icon: Lightbulb,
      defaultTitle: 'Pro Tip',
      border: 'border-emerald-300 dark:border-emerald-700/60',
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/20',
      text: 'text-emerald-900 dark:text-emerald-200',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    warning: {
      icon: AlertTriangle,
      defaultTitle: 'Watch Out',
      border: 'border-amber-300 dark:border-amber-700/60',
      bg: 'bg-amber-50/70 dark:bg-amber-950/20',
      text: 'text-amber-900 dark:text-amber-200',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    note: {
      icon: Info,
      defaultTitle: 'Note',
      border: 'border-blue-300 dark:border-blue-700/60',
      bg: 'bg-blue-50/70 dark:bg-blue-950/20',
      text: 'text-blue-900 dark:text-blue-200',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    interview: {
      icon: HelpCircle,
      defaultTitle: 'Interview Alert',
      border: 'border-indigo-300 dark:border-indigo-700/60',
      bg: 'bg-indigo-50/70 dark:bg-indigo-950/20',
      text: 'text-indigo-900 dark:text-indigo-200',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
    },
    enterprise: {
      icon: ShieldCheck,
      defaultTitle: 'Enterprise Practice',
      border: 'border-purple-300 dark:border-purple-700/60',
      bg: 'bg-purple-50/70 dark:bg-purple-950/20',
      text: 'text-purple-900 dark:text-purple-200',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
  }[type];

  const IconComponent = configs.icon;

  return (
    <div
      className={`my-5 rounded-xl border p-4.5 ${configs.border} ${configs.bg} ${configs.text} ${className}`}
      role="note"
    >
      <div className="flex items-center gap-2.5 font-semibold text-sm mb-1.5">
        <IconComponent className={`w-4.5 h-4.5 shrink-0 ${configs.iconColor}`} />
        <span>{title || configs.defaultTitle}</span>
      </div>
      <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 pl-7 space-y-2">
        {children}
      </div>
    </div>
  );
};
