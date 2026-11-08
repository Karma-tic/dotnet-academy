import React from 'react';

export interface JargonWordProps {
  termId: string;
  children: React.ReactNode;
}

export const JargonWord: React.FC<JargonWordProps> = ({ termId, children }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('open-jargon-modal', { detail: termId }));
  };

  return (
    <span
      onClick={handleClick}
      className="inline-flex items-center gap-1 cursor-pointer font-medium text-amber-700 dark:text-amber-400 border-b border-dashed border-amber-400 hover:border-amber-600 hover:bg-amber-500/10 px-1 py-0.5 rounded transition-all"
      title="Click to open Jargon Buster"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e as any);
        }
      }}
    >
      <span>{children}</span>
      <span className="text-[10px] opacity-75">🌶️</span>
    </span>
  );
};
