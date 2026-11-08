import React, { useState } from 'react';
import { Sparkles, Layers, AlertCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { CodeBlock } from './ui/CodeBlock';

interface BigOEntry {
  timeComplexity: string;
  timeClass: 'good' | 'average' | 'poor';
  memoryAllocation: string;
  examTip: string;
  codeSnippet: string;
}

const bigODatabase: Record<string, Record<string, BigOEntry>> = {
  'List<T>': {
    'Access / Indexing': {
      timeComplexity: 'O(1) Constant',
      timeClass: 'good',
      memoryAllocation: 'Zero extra allocation (direct memory offset calculation)',
      examTip: 'Frequent Exam Question: Indexing `list[i]` is instantaneous because elements reside in contiguous memory, just like a raw C-style array.',
      codeSnippet: 'int item = list[4]; // O(1) instantaneous lookup',
    },
    'Search / Contains': {
      timeComplexity: 'O(N) Linear',
      timeClass: 'average',
      memoryAllocation: 'Zero allocation, but scans all N elements sequentially',
      examTip: 'Top Interview Trap: If you need to check `.Contains()` inside a loop, switch to `HashSet<T>` immediately to avoid turning O(N) into an catastrophic O(N^2) disaster.',
      codeSnippet: 'bool exists = list.Contains("Target"); // Scans from index 0 to N-1',
    },
    'Insert at End (Append)': {
      timeComplexity: 'O(1) Amortized',
      timeClass: 'good',
      memoryAllocation: 'Zero allocation until capacity is reached; then doubles internal array (2x)',
      examTip: 'Placement Trick: When capacity exceeds the internal buffer, `List<T>` allocates a new array of double the size and copies elements over.',
      codeSnippet: 'list.Add("New Item"); // O(1) amortized',
    },
    'Insert at Index 0 (Prepend)': {
      timeComplexity: 'O(N) Linear',
      timeClass: 'poor',
      memoryAllocation: 'Shifts every existing element 1 position to the right',
      examTip: 'Exam Alert: Never call `list.Insert(0, item)` in a loop! Use `LinkedList<T>` or `Queue<T>` if you frequently prepend.',
      codeSnippet: 'list.Insert(0, "First Item"); // Shifts all N elements right!',
    },
    'Delete / Remove Item': {
      timeComplexity: 'O(N) Linear',
      timeClass: 'average',
      memoryAllocation: 'Zero allocation, but shifts subsequent elements to fill the gap',
      examTip: 'Calling `list.RemoveAt(0)` takes O(N) because the array must close the empty hole.',
      codeSnippet: 'list.RemoveAt(0); // O(N) shift operation',
    },
  },
  'Dictionary<TKey, TValue>': {
    'Access / Indexing': {
      timeComplexity: 'O(1) Constant',
      timeClass: 'good',
      memoryAllocation: 'Hashed lookup via entry buckets array',
      examTip: 'Dictionary calculates `key.GetHashCode()` to jump directly to the target bucket. Only drops to O(N) if every key collides into the same hash bucket.',
      codeSnippet: 'string role = userRoles["user_42"]; // O(1) instant key lookup',
    },
    'Search / Contains': {
      timeComplexity: 'O(1) for Keys, O(N) for Values',
      timeClass: 'good',
      memoryAllocation: 'Zero allocation for ContainsKey',
      examTip: '`dict.ContainsKey(key)` is lightning-fast O(1). However, `dict.ContainsValue(value)` is slow O(N) because it must iterate over every bucket.',
      codeSnippet: 'if (dict.ContainsKey("user_42")) { /* O(1) */ }',
    },
    'Insert at End (Append)': {
      timeComplexity: 'O(1) Amortized',
      timeClass: 'good',
      memoryAllocation: 'Allocates bucket entry; resizes prime-numbered table when load factor hits threshold',
      examTip: 'Modern .NET resizes dictionaries using prime numbers to minimize mathematical hash collisions.',
      codeSnippet: 'dict["user_43"] = "Administrator"; // O(1) amortized',
    },
    'Insert at Index 0 (Prepend)': {
      timeComplexity: 'Not Applicable (Unordered Hash Map)',
      timeClass: 'average',
      memoryAllocation: 'Dictionaries do not maintain sequential numeric insertion indices',
      examTip: 'If order matters, use `OrderedDictionary` or `SortedDictionary<TKey, TValue>` (which uses a Red-Black binary search tree with O(log N)).',
      codeSnippet: '// Dictionaries are keyed by hash, not numeric index',
    },
    'Delete / Remove Item': {
      timeComplexity: 'O(1) Constant',
      timeClass: 'good',
      memoryAllocation: 'Marks bucket as free with zero array shifting',
      examTip: 'Unlike `List<T>`, removing an item from a Dictionary does NOT require shifting memory.',
      codeSnippet: 'dict.Remove("user_42"); // O(1) instant removal',
    },
  },
  'HashSet<T>': {
    'Access / Indexing': {
      timeComplexity: 'Not Applicable (Set has no numeric index)',
      timeClass: 'average',
      memoryAllocation: 'Hash buckets only',
      examTip: 'A `HashSet<T>` is mathematically a set of unique keys with no values attached.',
      codeSnippet: '// Sets do not support set[0]; iterate or check existence',
    },
    'Search / Contains': {
      timeComplexity: 'O(1) Constant',
      timeClass: 'good',
      memoryAllocation: 'Zero allocation hash inspection',
      examTip: 'Number 1 placement exam optimization: Convert lists to `HashSet` when checking membership to change O(N) into O(1).',
      codeSnippet: 'if (allowedUserIds.Contains(userId)) { /* O(1) */ }',
    },
    'Insert at End (Append)': {
      timeComplexity: 'O(1) Amortized',
      timeClass: 'good',
      memoryAllocation: 'Returns false if item already exists (no duplicate allowed)',
      examTip: '`hashSet.Add(x)` returns a `bool`! True if added, false if already present.',
      codeSnippet: 'bool wasAdded = uniqueTags.Add("dotnet10");',
    },
    'Insert at Index 0 (Prepend)': {
      timeComplexity: 'Not Applicable (Unordered Set)',
      timeClass: 'average',
      memoryAllocation: 'Hashed buckets',
      examTip: 'Use `SortedSet<T>` if you need elements sorted in natural order (Red-Black tree, O(log N)).',
      codeSnippet: '// Unordered set structure',
    },
    'Delete / Remove Item': {
      timeComplexity: 'O(1) Constant',
      timeClass: 'good',
      memoryAllocation: 'Zero allocation',
      examTip: 'Instant O(1) removal by hash code.',
      codeSnippet: 'uniqueTags.Remove("dotnet10"); // O(1)',
    },
  },
  'Span<T> / ReadOnlySpan<T>': {
    'Access / Indexing': {
      timeComplexity: 'O(1) Sub-nanosecond',
      timeClass: 'good',
      memoryAllocation: '100% Stack Allocation (Zero Heap Allocation, 0 GC Pressure)',
      examTip: 'Span<T> is a `ref struct` that can NEVER escape to the managed heap. The JIT compiler emits raw pointer arithmetic with zero bound checks when optimized.',
      codeSnippet: 'ReadOnlySpan<char> span = text.AsSpan();\nchar first = span[0]; // Instantaneous O(1)',
    },
    'Search / Contains': {
      timeComplexity: 'O(N) Vectorized SIMD',
      timeClass: 'good',
      memoryAllocation: 'Zero heap allocation; uses CPU vector registers (AVX2/AVX-512)',
      examTip: '.NET 10 uses SIMD hardware acceleration for Span searches, scanning 32 to 64 bytes in a single CPU cycle.',
      codeSnippet: 'bool hasSpace = span.Contains(\' \'); // Hardware SIMD accelerated',
    },
    'Insert at End (Append)': {
      timeComplexity: 'Not Applicable (Fixed Memory Window)',
      timeClass: 'average',
      memoryAllocation: 'Spans cannot dynamically resize',
      examTip: 'A Span is a view over pre-allocated memory (stack, heap array, or native unmanaged buffer).',
      codeSnippet: '// Fixed view over memory; cannot call .Add()',
    },
    'Insert at Index 0 (Prepend)': {
      timeComplexity: 'Not Applicable (Fixed Window)',
      timeClass: 'average',
      memoryAllocation: 'Fixed length ref struct',
      examTip: 'Use slicing: `span.Slice(1)` creates a sub-window in O(1) with zero memory copies.',
      codeSnippet: 'ReadOnlySpan<char> trimmed = span.Slice(1); // O(1) with 0 allocations',
    },
    'Delete / Remove Item': {
      timeComplexity: 'Not Applicable (Slice instead)',
      timeClass: 'good',
      memoryAllocation: 'Zero allocations via slicing',
      examTip: 'Instead of removing, slice the window: `span.Slice(0, length - 1)` creates a shorter view with zero allocations.',
      codeSnippet: 'var sub = span.Slice(0, 5); // O(1) window creation',
    },
  },
};

export const BigOCalculator: React.FC = () => {
  const collections = Object.keys(bigODatabase);
  const [selectedCollection, setSelectedCollection] = useState<string>('List<T>');
  const operations = Object.keys(bigODatabase[selectedCollection] || {});
  const [selectedOperation, setSelectedOperation] = useState<string>('Search / Contains');

  const currentData =
    bigODatabase[selectedCollection]?.[selectedOperation] ||
    bigODatabase['List<T>']['Search / Contains'];

  const getBadgeColor = (type: 'good' | 'average' | 'poor') => {
    if (type === 'good') return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
    if (type === 'average') return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    return 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800';
  };

  return (
    <Card className="p-6 sm:p-8 space-y-6">
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Interactive Problem Solver &amp; Formula Estimator</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          .NET Big-O Complexity &amp; Memory Allocation Calculator
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Select a .NET data structure and an operation to compute runtime complexity, memory behavior, and placement exam traps.
        </p>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            1. Select .NET Collection Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {collections.map((col) => (
              <button
                key={col}
                onClick={() => {
                  setSelectedCollection(col);
                  const newOps = Object.keys(bigODatabase[col]);
                  if (!newOps.includes(selectedOperation)) {
                    setSelectedOperation(newOps[0]);
                  }
                }}
                className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                  selectedCollection === col
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            2. Select Operation
          </label>
          <div className="flex flex-col gap-1.5">
            {operations.map((op) => (
              <button
                key={op}
                onClick={() => setSelectedOperation(op)}
                className={`p-2 rounded-xl border text-left text-xs font-medium transition-all ${
                  selectedOperation === op
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculation Results Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Selected Scenario</span>
            <div className="font-extrabold text-base text-slate-900 dark:text-white">
              {selectedCollection} &bull; {selectedOperation}
            </div>
          </div>

          <div className={`px-4 py-1.5 rounded-xl border text-sm font-black shadow-xs ${getBadgeColor(currentData.timeClass)}`}>
            {currentData.timeComplexity}
          </div>
        </div>

        {/* Memory Profile */}
        <div className="flex items-start gap-3 text-xs sm:text-sm">
          <Layers className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 dark:text-white">Memory &amp; Storage Profile: </span>
            <span className="text-slate-600 dark:text-slate-300">{currentData.memoryAllocation}</span>
          </div>
        </div>

        {/* Placement Exam Insight */}
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-xs sm:text-sm space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Placement Interview Tip (TCS, Infosys, Wipro, AZ-204)</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentData.examTip}
          </p>
        </div>

        {/* Code Snippet */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Example C# Implementation</span>
          <CodeBlock code={currentData.codeSnippet} language="csharp" />
        </div>
      </div>
    </Card>
  );
};
