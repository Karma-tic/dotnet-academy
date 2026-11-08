import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

export interface RichTextRendererProps {
  content: string | React.ReactNode;
  className?: string;
  onJargonClick?: (term: string) => void;
}

/**
 * Parses inline markdown:
 * - **bold** -> <strong>
 * - `code` -> <code>
 * - [label](url) -> <a> with <ExternalLink />
 * - Removes any orphan raw asterisks to strictly prevent raw ** leaks
 */
function renderInlineContent(text: string, _onJargonClick?: (term: string) => void): React.ReactNode[] {
  // Regex to match inline code, bold, links, or plain text
  // Order matters: match `code` first, then **bold**, then [label](url)
  const tokens: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      const plain = text.substring(lastIndex, match.index).replace(/\*\*/g, '');
      if (plain) tokens.push(plain);
    }

    const token = match[0];
    if (token.startsWith('`') && token.endsWith('`')) {
      const code = token.slice(1, -1);
      tokens.push(
        <code
          key={`code-${match.index}`}
          className="font-mono text-xs bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700/60 font-semibold"
        >
          {code}
        </code>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      const boldText = token.slice(2, -2);
      tokens.push(
        <strong
          key={`bold-${match.index}`}
          className="font-bold text-slate-900 dark:text-slate-100"
        >
          {boldText}
        </strong>
      );
    } else if (token.startsWith('[') && token.includes('](')) {
      const labelEnd = token.indexOf('](');
      const label = token.slice(1, labelEnd);
      const url = token.slice(labelEnd + 2, -1);
      const isExternal = url.startsWith('http://') || url.startsWith('https://');

      tokens.push(
        <a
          key={`link-${match.index}`}
          href={url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5 font-medium"
        >
          <span>{label}</span>
          {isExternal && <ExternalLink className="w-3 h-3 inline-block shrink-0 opacity-80" />}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Trailing text
  if (lastIndex < text.length) {
    const trailing = text.substring(lastIndex).replace(/\*\*/g, '');
    if (trailing) tokens.push(trailing);
  }

  return tokens.length > 0 ? tokens : [text.replace(/\*\*/g, '')];
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  content,
  className = '',
  onJargonClick,
}) => {
  if (typeof content !== 'string') {
    return <div className={className}>{content}</div>;
  }

  // Normalize newlines
  const rawText = content.replace(/\r\n/g, '\n');

  // Split into code blocks vs non-code blocks
  const parts: React.ReactNode[] = [];
  const codeBlockRegex = /```([a-zA-Z0-9_\-\+]*)\n([\s\S]*?)```/g;
  let lastPos = 0;
  let codeMatch: RegExpExecArray | null;
  let blockKey = 0;

  while ((codeMatch = codeBlockRegex.exec(rawText)) !== null) {
    // Process markdown before this code block
    if (codeMatch.index > lastPos) {
      const textSection = rawText.substring(lastPos, codeMatch.index);
      renderTextSection(textSection, parts, blockKey++, onJargonClick);
    }

    const lang = codeMatch[1]?.trim() || 'csharp';
    const codeBody = codeMatch[2]?.trim() || '';

    parts.push(
      <CodeBlock
        key={`code-block-${blockKey++}`}
        code={codeBody}
        language={lang}
      />
    );

    lastPos = codeBlockRegex.lastIndex;
  }

  // Process remaining text
  if (lastPos < rawText.length) {
    const remaining = rawText.substring(lastPos);
    renderTextSection(remaining, parts, blockKey++, onJargonClick);
  }

  return <div className={`space-y-3 leading-relaxed text-slate-700 dark:text-slate-300 ${className}`}>{parts}</div>;
};

/**
 * Helper to render headings, horizontal rules, bullet lists, ordered lists, and paragraphs.
 */
function renderTextSection(
  rawText: string,
  output: React.ReactNode[],
  sectionKey: number,
  onJargonClick?: (term: string) => void
) {
  const lines = rawText.split('\n');
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === 'ul') {
      output.push(
        <ul key={`ul-${output.length}-${sectionKey}`} className="list-disc pl-5 space-y-1.5 my-3 text-sm">
          {currentList.items.map((it, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineContent(it, onJargonClick)}
            </li>
          ))}
        </ul>
      );
    } else {
      output.push(
        <ol key={`ol-${output.length}-${sectionKey}`} className="list-decimal pl-5 space-y-1.5 my-3 text-sm">
          {currentList.items.map((it, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineContent(it, onJargonClick)}
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      flushList();
      output.push(
        <hr key={`hr-${output.length}-${sectionKey}`} className="my-6 border-t border-slate-200 dark:border-slate-800" />
      );
      continue;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      flushList();
      output.push(
        <h3 key={`h3-${output.length}-${sectionKey}`} className="text-lg font-bold text-slate-900 dark:text-white mt-5 mb-2">
          {renderInlineContent(trimmed.substring(4), onJargonClick)}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      output.push(
        <h2 key={`h2-${output.length}-${sectionKey}`} className="text-xl font-extrabold text-slate-900 dark:text-white mt-6 mb-3">
          {renderInlineContent(trimmed.substring(3), onJargonClick)}
        </h2>
      );
      continue;
    }

    // Unordered List (- item or * item)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const itemText = trimmed.substring(2);
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Ordered List (1. item, 2. item, etc.)
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      const itemText = olMatch[2];
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Normal paragraph
    flushList();
    output.push(
      <p key={`p-${output.length}-${sectionKey}`} className="text-sm sm:text-base leading-relaxed">
        {renderInlineContent(trimmed, onJargonClick)}
      </p>
    );
  }

  flushList();
}
