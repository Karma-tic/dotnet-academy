import React, { useState } from 'react';
import { Copy, Check, Terminal, ExternalLink } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlightLines?: number[];
  samplePath?: string; // relative to /samples
  canRunLocally?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'csharp',
  filename,
  highlightLines = [],
  samplePath,
  canRunLocally = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [showRunCommand, setShowRunCommand] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-sm group">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="font-mono text-indigo-400 font-medium lowercase">{language}</span>
          {filename && (
            <>
              <span className="text-slate-600">/</span>
              <span className="font-mono text-slate-300">{filename}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {samplePath && (
            <a
              href={`https://github.com/Karma-tic/dotnet-academy/tree/main/samples/${samplePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-slate-400 hover:text-indigo-300 transition-colors px-2 py-1 rounded hover:bg-slate-800"
              title="View full source on GitHub"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {canRunLocally && (
            <button
              onClick={() => setShowRunCommand(!showRunCommand)}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-indigo-300 transition-colors px-2 py-1 rounded hover:bg-slate-800"
              title="Run locally instructions"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Run</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Local Run helper banner */}
      {showRunCommand && (
        <div className="px-4 py-2.5 bg-indigo-950/40 border-b border-indigo-900/50 text-xs text-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-semibold text-white">To run locally: </span>
            <code className="bg-slate-900 px-2 py-0.5 rounded text-indigo-300 font-mono">
              dotnet run {samplePath ? `--project samples/${samplePath}` : ''}
            </code>
          </div>
          <span className="text-slate-400">Requires .NET 10 SDK</span>
        </div>
      )}

      {/* Code body */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted = highlightLines.includes(lineNum);
              return (
                <tr
                  key={idx}
                  className={isHighlighted ? 'bg-indigo-950/50 -mx-4 px-4 block' : 'block'}
                >
                  <td className="select-none text-slate-600 text-right pr-4 w-8 font-mono text-xs">
                    {lineNum}
                  </td>
                  <td className="text-slate-200 whitespace-pre font-mono">
                    {line || ' '}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
