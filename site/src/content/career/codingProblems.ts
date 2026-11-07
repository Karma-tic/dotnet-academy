export interface CodingProblem {
  id: string;
  title: string;
  category: 'Strings' | 'Arrays & Lists' | 'LINQ' | 'OOP & Design' | 'Async & Concurrency' | 'Algorithms';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: string;
  solutionCode: string;
  explanation: string;
  testCases: { input: string; expected: string }[];
}

export const codingProblems: CodingProblem[] = [
  // Strings & Primitives
  {
    id: 'cp-01',
    title: 'Valid Palindrome (Ignoring Punctuation and Case)',
    category: 'Strings',
    difficulty: 'Easy',
    description: 'Given a string `s`, return `true` if it is a palindrome, or `false` otherwise. A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward. Implement with O(1) extra space using two pointers or `ReadOnlySpan<char>`.',
    starterCode: `public class Solution
{
    public bool IsPalindrome(string s)
    {
        // Your code here
        return false;
    }
}`,
    solutionCode: `public class Solution
{
    public bool IsPalindrome(string s)
    {
        if (string.IsNullOrEmpty(s)) return true;
        ReadOnlySpan<char> span = s.AsSpan();
        int left = 0, right = span.Length - 1;

        while (left < right)
        {
            while (left < right && !char.IsLetterOrDigit(span[left])) left++;
            while (left < right && !char.IsLetterOrDigit(span[right])) right--;

            if (char.ToLowerInvariant(span[left]) != char.ToLowerInvariant(span[right]))
                return false;

            left++;
            right--;
        }
        return true;
    }
}`,
    explanation: 'Using two pointers and ReadOnlySpan<char> achieves O(N) time complexity with zero heap memory allocations.',
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expected: 'true' },
      { input: '"race a car"', expected: 'false' },
      { input: '" "', expected: 'true' }
    ]
  },
  {
    id: 'cp-02',
    title: 'Reverse Words in a String',
    category: 'Strings',
    difficulty: 'Medium',
    description: 'Given an input string `s`, reverse the order of the words. Return a string of the words in reverse order concatenated by a single space, reducing multiple spaces to one.',
    starterCode: `public class Solution
{
    public string ReverseWords(string s)
    {
        // Your code here
        return "";
    }
}`,
    solutionCode: `using System;
using System.Linq;

public class Solution
{
    public string ReverseWords(string s)
    {
        var words = s.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        Array.Reverse(words);
        return string.Join(" ", words);
    }
}`,
    explanation: 'StringSplitOptions.RemoveEmptyEntries cleanly strips consecutive whitespace. Array.Reverse flips word positions in-place.',
    testCases: [
      { input: '"the sky is blue"', expected: '"blue is sky the"' },
      { input: '"  hello world  "', expected: '"world hello"' }
    ]
  },
  {
    id: 'cp-03',
    title: 'First Non-Repeating Character in a String',
    category: 'Strings',
    difficulty: 'Easy',
    description: 'Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return -1.',
    starterCode: `public class Solution
{
    public int FirstUniqChar(string s)
    {
        // Your code here
        return -1;
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class Solution
{
    public int FirstUniqChar(string s)
    {
        var counts = new Dictionary<char, int>();
        foreach (char c in s)
        {
            counts[c] = counts.GetValueOrDefault(c, 0) + 1;
        }

        for (int i = 0; i < s.Length; i++)
        {
            if (counts[s[i]] == 1) return i;
        }
        return -1;
    }
}`,
    explanation: 'Two-pass algorithm: first pass counts occurrences in O(N); second pass finds the first character with a count of 1.',
    testCases: [
      { input: '"leetcode"', expected: '0' },
      { input: '"loveleetcode"', expected: '2' },
      { input: '"aabb"', expected: '-1' }
    ]
  },

  // Arrays & Lists
  {
    id: 'cp-04',
    title: 'Two Sum Problem',
    category: 'Arrays & Lists',
    difficulty: 'Easy',
    description: 'Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution.',
    starterCode: `public class Solution
{
    public int[] TwoSum(int[] nums, int target)
    {
        // Your code here
        return Array.Empty<int>();
    }
}`,
    solutionCode: `using System;
using System.Collections.Generic;

public class Solution
{
    public int[] TwoSum(int[] nums, int target)
    {
        var map = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++)
        {
            int complement = target - nums[i];
            if (map.TryGetValue(complement, out int index))
            {
                return new int[] { index, i };
            }
            map[nums[i]] = i;
        }
        return Array.Empty<int>();
    }
}`,
    explanation: 'Using a hash map allows looking up the required complement in O(1) time, bringing overall runtime to O(N).',
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' }
    ]
  },
  {
    id: 'cp-05',
    title: 'Merge Intervals',
    category: 'Arrays & Lists',
    difficulty: 'Medium',
    description: 'Given an array of intervals where `intervals[i] = [starti, endi]`, merge all overlapping intervals and return an array of the non-overlapping intervals.',
    starterCode: `public class Solution
{
    public int[][] Merge(int[][] intervals)
    {
        // Your code here
        return intervals;
    }
}`,
    solutionCode: `using System;
using System.Collections.Generic;

public class Solution
{
    public int[][] Merge(int[][] intervals)
    {
        if (intervals.Length <= 1) return intervals;
        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));

        var result = new List<int[]>();
        int[] current = intervals[0];
        result.Add(current);

        foreach (var next in intervals)
        {
            if (next[0] <= current[1])
            {
                current[1] = Math.Max(current[1], next[1]);
            }
            else
            {
                current = next;
                result.Add(current);
            }
        }

        return result.ToArray();
    }
}`,
    explanation: 'Sort by start time in O(N log N). A single pass merges overlapping boundaries.',
    testCases: [
      { input: '[[1,3],[2,6],[8,10],[15,18]]', expected: '[[1,6],[8,10],[15,18]]' },
      { input: '[[1,4],[4,5]]', expected: '[[1,5]]' }
    ]
  },

  // LINQ
  {
    id: 'cp-06',
    title: 'Top K Frequent Elements using LINQ',
    category: 'LINQ',
    difficulty: 'Medium',
    description: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements in descending order of frequency using modern LINQ.',
    starterCode: `public class Solution
{
    public int[] TopKFrequent(int[] nums, int k)
    {
        // Your code here
        return Array.Empty<int>();
    }
}`,
    solutionCode: `using System;
using System.Linq;

public class Solution
{
    public int[] TopKFrequent(int[] nums, int k)
    {
        return nums
            .GroupBy(n => n)
            .OrderByDescending(g => g.Count())
            .Take(k)
            .Select(g => g.Key)
            .ToArray();
    }
}`,
    explanation: 'GroupBy groups identical elements; OrderByDescending sorts by group count; Take(k) yields the top K keys.',
    testCases: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', expected: '[1, 2]' },
      { input: 'nums = [1], k = 1', expected: '[1]' }
    ]
  },
  {
    id: 'cp-07',
    title: 'Chunk an Enumerable into Batches',
    category: 'LINQ',
    difficulty: 'Easy',
    description: 'Implement a batching method using modern .NET `Chunk` (or demonstrate how it works) that divides a large list into chunks of size `chunkSize`.',
    starterCode: `public class Solution
{
    public IEnumerable<int[]> BatchProcess(int[] items, int size)
    {
        // Your code here
        return Enumerable.Empty<int[]>();
    }
}`,
    solutionCode: `using System.Collections.Generic;
using System.Linq;

public class Solution
{
    public IEnumerable<int[]> BatchProcess(int[] items, int size)
    {
        // Modern .NET LINQ has Chunk built-in
        return items.Chunk(size);
    }
}`,
    explanation: '.NET 6+ added Enumerable.Chunk(size), replacing cumbersome Skip/Take loops for batching operations.',
    testCases: [
      { input: '[1, 2, 3, 4, 5], size = 2', expected: '[[1, 2], [3, 4], [5]]' }
    ]
  },

  // Async & Concurrency
  {
    id: 'cp-08',
    title: 'Parallel Async Throttling with SemaphoreSlim',
    category: 'Async & Concurrency',
    difficulty: 'Medium',
    description: 'Given a list of URLs, write a method that downloads all items asynchronously but restricts concurrency to at most `maxDegreeOfParallelism` simultaneous downloads using `SemaphoreSlim`.',
    starterCode: `using System.Threading.Tasks;

public class Solution
{
    public async Task ProcessWithThrottleAsync(IEnumerable<string> urls, int maxDegree)
    {
        // Your code here
    }
}`,
    solutionCode: `using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

public class Solution
{
    public async Task ProcessWithThrottleAsync(IEnumerable<string> urls, int maxDegree)
    {
        using var semaphore = new SemaphoreSlim(maxDegree, maxDegree);
        var tasks = new List<Task>();

        foreach (var url in urls)
        {
            await semaphore.WaitAsync();
            tasks.Add(Task.Run(async () =>
            {
                try
                {
                    // Simulated async I/O download
                    await Task.Delay(50);
                }
                finally
                {
                    semaphore.Release();
                }
            }));
        }

        await Task.WhenAll(tasks);
    }
}`,
    explanation: 'SemaphoreSlim ensures at most maxDegree tasks run concurrently without blocking thread pool threads.',
    testCases: [
      { input: '10 items, maxDegree = 3', expected: 'All 10 completed with max 3 active' }
    ]
  },

  // OOP & Design
  {
    id: 'cp-09',
    title: 'Generic Result<T> Pattern Implementation',
    category: 'OOP & Design',
    difficulty: 'Medium',
    description: 'Implement a generic `Result<T>` struct/record that encapsulates either success with a value of type `T` or failure with an error message, without throwing exceptions for predictable domain errors.',
    starterCode: `public readonly record struct Result<T>
{
    // Implement Success, Failure, IsSuccess, Value, Error
}`,
    solutionCode: `public readonly record struct Result<T>
{
    public bool IsSuccess { get; }
    public T? Value { get; }
    public string? Error { get; }

    private Result(bool isSuccess, T? value, string? error)
    {
        IsSuccess = isSuccess;
        Value = value;
        Error = error;
    }

    public static Result<T> Success(T value) => new(true, value, null);
    public static Result<T> Failure(string error) => new(false, default, error);
}`,
    explanation: 'The Result pattern avoids costly exception stack trace allocations for predictable control-flow validation errors.',
    testCases: [
      { input: 'Result<int>.Success(42)', expected: 'IsSuccess = true, Value = 42' },
      { input: 'Result<int>.Failure("Invalid")', expected: 'IsSuccess = false, Error = "Invalid"' }
    ]
  }
];

