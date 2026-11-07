import React, { useState } from 'react';
import { Printer, Copy, Check, Download } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { cheatSheetsData, CheatSheet } from '../content/cheatsheets/cheatsheetsData';

export const CheatSheets: React.FC = () => {
  const [activeSheet, setActiveSheet] = useState<CheatSheet>(cheatSheetsData[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Download className="w-3.5 h-3.5" />
          <span>Offline Developer Kit (8 Reference Sheets)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Offline Kit: One-Page Printable Cheat Sheets
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          High-density reference sheets for C# 14, LINQ, EF Core, ASP.NET Core, .NET CLI, Git, SQL, and HTTP status codes. Print directly or save as PDF via your browser print dialog.
        </p>

        {/* Sheet Switcher */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {cheatSheetsData.map((sheet) => {
            const isSelected = activeSheet.id === sheet.id;
            return (
              <Button
                key={sheet.id}
                variant={isSelected ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveSheet(sheet)}
              >
                {sheet.title.replace(' Cheat Sheet', '').replace(' Reference', '')}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Main Cheat Sheet Content (Printable) */}
      <div className="print-page bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple">{activeSheet.category}</Badge>
              <span className="text-xs text-slate-400">Karmatix .NET Academy Offline Kit</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {activeSheet.title}
            </h2>
          </div>

          <Button variant="outline" size="sm" onClick={handlePrint} className="no-print">
            <Printer className="w-4 h-4 mr-1.5" />
            Print / Save PDF
          </Button>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {activeSheet.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-xs">
                {section.title}
              </h3>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                {section.items.map((item, iIdx) => {
                  const isCopied = copiedText === item.syntax;
                  return (
                    <div
                      key={iIdx}
                      className="p-3.5 bg-slate-50/40 dark:bg-slate-950/20 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <code className="text-xs font-mono font-bold text-slate-900 dark:text-indigo-200 block sm:inline">
                          {item.syntax}
                        </code>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {item.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopy(item.syntax)}
                        className="self-end sm:self-center text-slate-400 hover:text-indigo-600 transition-colors p-1 rounded no-print"
                        title="Copy syntax"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer brand stamp in print */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Karmatix .NET Academy &bull; https://learn.karmatix.in</span>
          <span>Verified on .NET 10 LTS &bull; C# 14</span>
        </div>
      </div>
    </div>
  );
};
