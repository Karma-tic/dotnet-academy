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
  {
    "id": "cp-01",
    "title": "Valid Palindrome (Ignoring Punctuation and Case)",
    "category": "Strings",
    "difficulty": "Easy",
    "description": "Given a string `s`, return `true` if it is a palindrome, or `false` otherwise. A phrase is a palindrome if, after converting uppercase to lowercase and removing non-alphanumeric characters, it reads the same forward and backward. Implement with O(1) extra space using two pointers or `ReadOnlySpan<char>`.",
    "starterCode": "public class Solution\n{\n    public bool IsPalindrome(string s)\n    {\n        // Your code here\n        return false;\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public bool IsPalindrome(string s)\n    {\n        if (string.IsNullOrEmpty(s)) return true;\n        ReadOnlySpan<char> span = s.AsSpan();\n        int left = 0, right = span.Length - 1;\n        while (left < right)\n        {\n            while (left < right && !char.IsLetterOrDigit(span[left])) left++;\n            while (left < right && !char.IsLetterOrDigit(span[right])) right--;\n            if (char.ToLowerInvariant(span[left]) != char.ToLowerInvariant(span[right])) return false;\n            left++;\n            right--;\n        }\n        return true;\n    }\n}",
    "explanation": "Two pointers with ReadOnlySpan<char> achieve O(N) time and zero heap allocations.",
    "testCases": [
      {
        "input": "\"A man, a plan, a canal: Panama\"",
        "expected": "true"
      },
      {
        "input": "\"race a car\"",
        "expected": "false"
      }
    ]
  },
  {
    "id": "cp-02",
    "title": "Reverse Words in a String",
    "category": "Strings",
    "difficulty": "Medium",
    "description": "Given an input string `s`, reverse the order of the words. Return a string of the words in reverse order concatenated by a single space, stripping leading, trailing, and duplicate spaces.",
    "starterCode": "public class Solution\n{\n    public string ReverseWords(string s)\n    {\n        // Your code here\n        return \"\";\n    }\n}",
    "solutionCode": "using System;\nusing System.Linq;\n\npublic class Solution\n{\n    public string ReverseWords(string s)\n    {\n        var words = s.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);\n        Array.Reverse(words);\n        return string.Join(\" \", words);\n    }\n}",
    "explanation": "StringSplitOptions removes superfluous whitespace cleanly and Array.Reverse operates in-place on the array.",
    "testCases": [
      {
        "input": "\"the sky is blue\"",
        "expected": "\"blue is sky the\""
      },
      {
        "input": "\"  hello world  \"",
        "expected": "\"world hello\""
      }
    ]
  },
  {
    "id": "cp-03",
    "title": "Longest Common Prefix",
    "category": "Strings",
    "difficulty": "Easy",
    "description": "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string `\"\"`.",
    "starterCode": "public class Solution\n{\n    public string LongestCommonPrefix(string[] strs)\n    {\n        // Your code here\n        return \"\";\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public string LongestCommonPrefix(string[] strs)\n    {\n        if (strs.Length == 0) return \"\";\n        string prefix = strs[0];\n        for (int i = 1; i < strs.Length; i++)\n        {\n            while (!strs[i].StartsWith(prefix))\n            {\n                prefix = prefix[..^1];\n                if (prefix.Length == 0) return \"\";\n            }\n        }\n        return prefix;\n    }\n}",
    "explanation": "Vertical/horizontal reduction using range indexer [..^1] shrinks the candidate prefix until it matches all entries.",
    "testCases": [
      {
        "input": "[\"flower\",\"flow\",\"flight\"]",
        "expected": "\"fl\""
      },
      {
        "input": "[\"dog\",\"racecar\",\"car\"]",
        "expected": "\"\""
      }
    ]
  },
  {
    "id": "cp-04",
    "title": "String Compression (Run-Length Encoding)",
    "category": "Strings",
    "difficulty": "Medium",
    "description": "Given an array of characters `chars`, compress it using consecutive character repetitions: e.g. [\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"] becomes [\"a\",\"2\",\"b\",\"2\",\"c\",\"3\"]. Return new length.",
    "starterCode": "public class Solution\n{\n    public int Compress(char[] chars)\n    {\n        // Your code here\n        return 0;\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public int Compress(char[] chars)\n    {\n        int write = 0, anchor = 0;\n        for (int read = 0; read < chars.Length; read++)\n        {\n            if (read + 1 == chars.Length || chars[read + 1] != chars[read])\n            {\n                chars[write++] = chars[anchor];\n                int count = read - anchor + 1;\n                if (count > 1)\n                {\n                    foreach (char c in count.ToString())\n                        chars[write++] = c;\n                }\n                anchor = read + 1;\n            }\n        }\n        return write;\n    }\n}",
    "explanation": "Two-pointer approach modifies the character array in-place with O(1) extra space.",
    "testCases": [
      {
        "input": "[\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]",
        "expected": "6"
      }
    ]
  },
  {
    "id": "cp-05",
    "title": "Valid Anagram Check",
    "category": "Strings",
    "difficulty": "Easy",
    "description": "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise using an array frequency table.",
    "starterCode": "public class Solution\n{\n    public bool IsAnagram(string s, string t)\n    {\n        // Your code here\n        return false;\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public bool IsAnagram(string s, string t)\n    {\n        if (s.Length != t.Length) return false;\n        Span<int> freq = stackalloc int[26];\n        foreach (char c in s) freq[c - 'a']++;\n        foreach (char c in t)\n        {\n            if (--freq[c - 'a'] < 0) return false;\n        }\n        return true;\n    }\n}",
    "explanation": "Stackalloc Span<int> uses stack memory with zero garbage collection allocations for 26 letters.",
    "testCases": [
      {
        "input": "s = \"anagram\", t = \"nagaram\"",
        "expected": "true"
      },
      {
        "input": "s = \"rat\", t = \"car\"",
        "expected": "false"
      }
    ]
  },
  {
    "id": "cp-06",
    "title": "Longest Substring Without Repeating Characters",
    "category": "Strings",
    "difficulty": "Medium",
    "description": "Given a string `s`, find the length of the longest substring without duplicate characters using the sliding window pattern.",
    "starterCode": "public class Solution\n{\n    public int LengthOfLongestSubstring(string s)\n    {\n        // Your code here\n        return 0;\n    }\n}",
    "solutionCode": "using System;\nusing System.Collections.Generic;\n\npublic class Solution\n{\n    public int LengthOfLongestSubstring(string s)\n    {\n        var map = new Dictionary<char, int>();\n        int maxLen = 0, left = 0;\n        for (int right = 0; right < s.Length; right++)\n        {\n            if (map.TryGetValue(s[right], out int prevIndex))\n                left = Math.Max(left, prevIndex + 1);\n            map[s[right]] = right;\n            maxLen = Math.Max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}",
    "explanation": "Sliding window with dictionary tracking character positions runs in linear O(N) time.",
    "testCases": [
      {
        "input": "\"abcabcbb\"",
        "expected": "3"
      },
      {
        "input": "\"bbbbb\"",
        "expected": "1"
      }
    ]
  },
  {
    "id": "cp-07",
    "title": "Roman to Integer Conversion",
    "category": "Strings",
    "difficulty": "Easy",
    "description": "Given a roman numeral string `s`, convert it to an integer handling subtraction rules (IV=4, IX=9, XL=40, XC=90, CD=400, CM=900).",
    "starterCode": "public class Solution\n{\n    public int RomanToInt(string s)\n    {\n        // Your code here\n        return 0;\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public int RomanToInt(string s)\n    {\n        static int Value(char c) => c switch {\n            'I' => 1, 'V' => 5, 'X' => 10, 'L' => 50,\n            'C' => 100, 'D' => 500, 'M' => 1000, _ => 0\n        };\n        int total = 0;\n        for (int i = 0; i < s.Length; i++)\n        {\n            int curr = Value(s[i]);\n            if (i + 1 < s.Length && curr < Value(s[i + 1]))\n                total -= curr;\n            else\n                total += curr;\n        }\n        return total;\n    }\n}",
    "explanation": "Switch expression maps values in O(1); subtraction rule compares current with next token.",
    "testCases": [
      {
        "input": "\"III\"",
        "expected": "3"
      },
      {
        "input": "\"LVIII\"",
        "expected": "58"
      },
      {
        "input": "\"MCMXCIV\"",
        "expected": "1994"
      }
    ]
  },
  {
    "id": "cp-08",
    "title": "String to Integer (atoi) with Overflow Clamp",
    "category": "Strings",
    "difficulty": "Medium",
    "description": "Implement `MyAtoi(string s)`: ignore whitespace, parse optional +/- sign, parse digits, clamp between int.MinValue and int.MaxValue.",
    "starterCode": "public class Solution\n{\n    public int MyAtoi(string s)\n    {\n        // Your code here\n        return 0;\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public int MyAtoi(string s)\n    {\n        if (string.IsNullOrWhiteSpace(s)) return 0;\n        ReadOnlySpan<char> span = s.AsSpan().TrimStart();\n        if (span.IsEmpty) return 0;\n        int sign = 1, i = 0;\n        if (span[0] == '+' || span[0] == '-')\n        {\n            sign = span[0] == '-' ? -1 : 1;\n            i++;\n        }\n        long result = 0;\n        while (i < span.Length && char.IsDigit(span[i]))\n        {\n            result = result * 10 + (span[i] - '0');\n            if (sign * result > int.MaxValue) return int.MaxValue;\n            if (sign * result < int.MinValue) return int.MinValue;\n            i++;\n        }\n        return (int)(sign * result);\n    }\n}",
    "explanation": "ReadOnlySpan.TrimStart avoids allocation and long accumulator catches 32-bit overflow.",
    "testCases": [
      {
        "input": "\"42\"",
        "expected": "42"
      },
      {
        "input": "\"   -42\"",
        "expected": "-42"
      },
      {
        "input": "\"1337c0d3\"",
        "expected": "1337"
      }
    ]
  },
  {
    "id": "cp-09",
    "title": "Generic Result<T> Monadic Pattern",
    "category": "OOP & Design",
    "difficulty": "Medium",
    "description": "Implement a generic readonly record struct `Result<T>` that encapsulates success with value or failure with error message, preventing null reference exceptions.",
    "starterCode": "public readonly record struct Result<T>\n{\n    // Implement Success, Failure, IsSuccess, Value, Error\n}",
    "solutionCode": "public readonly record struct Result<T>\n{\n    public bool IsSuccess { get; }\n    public T? Value { get; }\n    public string? Error { get; }\n    private Result(bool isSuccess, T? value, string? error)\n    {\n        IsSuccess = isSuccess;\n        Value = value;\n        Error = error;\n    }\n    public static Result<T> Success(T val) => new(true, val, null);\n    public static Result<T> Failure(string err) => new(false, default, err);\n}",
    "explanation": "Avoids costly exception stack traces for domain validation outcomes.",
    "testCases": [
      {
        "input": "Result<int>.Success(42)",
        "expected": "IsSuccess=true, Value=42"
      }
    ]
  },
  {
    "id": "cp-10",
    "title": "Two Sum (Indices with Target Sum)",
    "category": "Arrays & Lists",
    "difficulty": "Easy",
    "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. Each input has exactly one solution in O(N) time.",
    "starterCode": "public class Solution\n{\n    public int[] TwoSum(int[] nums, int target)\n    {\n        // Your code here\n        return [];\n    }\n}",
    "solutionCode": "using System.Collections.Generic;\n\npublic class Solution\n{\n    public int[] TwoSum(int[] nums, int target)\n    {\n        var map = new Dictionary<int, int>();\n        for (int i = 0; i < nums.Length; i++)\n        {\n            int complement = target - nums[i];\n            if (map.TryGetValue(complement, out int index))\n                return [index, i];\n            map[nums[i]] = i;\n        }\n        return [];\n    }\n}",
    "explanation": "Single-pass dictionary lookup stores complement in O(1) time and O(N) space.",
    "testCases": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "expected": "[0, 1]"
      }
    ]
  },
  {
    "id": "cp-11",
    "title": "Three Sum to Zero",
    "category": "Arrays & Lists",
    "difficulty": "Medium",
    "description": "Given an integer array `nums`, return all the unique triplets `[nums[i], nums[j], nums[k]]` such that `nums[i] + nums[j] + nums[k] == 0`.",
    "starterCode": "public class Solution\n{\n    public IList<IList<int>> ThreeSum(int[] nums)\n    {\n        // Your code here\n        return [];\n    }\n}",
    "solutionCode": "using System;\nusing System.Collections.Generic;\n\npublic class Solution\n{\n    public IList<IList<int>> ThreeSum(int[] nums)\n    {\n        Array.Sort(nums);\n        var res = new List<IList<int>>();\n        for (int i = 0; i < nums.Length - 2; i++)\n        {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int left = i + 1, right = nums.Length - 1;\n            while (left < right)\n            {\n                int sum = nums[i] + nums[left] + nums[right];\n                if (sum == 0)\n                {\n                    res.Add([nums[i], nums[left], nums[right]]);\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++; right--;\n                }\n                else if (sum < 0) left++;\n                else right--;\n            }\n        }\n        return res;\n    }\n}",
    "explanation": "Sort plus two pointers avoids duplicate triplets in O(N^2) time.",
    "testCases": [
      {
        "input": "[-1,0,1,2,-1,-4]",
        "expected": "[[-1,-1,2],[-1,0,1]]"
      }
    ]
  },
  {
    "id": "cp-12",
    "title": "Maximum Subarray (Kadane Algorithm)",
    "category": "Arrays & Lists",
    "difficulty": "Medium",
    "description": "Given an integer array `nums`, find the subarray with the largest sum, and return its sum in O(N) time.",
    "starterCode": "public class Solution\n{\n    public int MaxSubArray(int[] nums)\n    {\n        // Your code here\n        return 0;\n    }\n}",
    "solutionCode": "using System;\n\npublic class Solution\n{\n    public int MaxSubArray(int[] nums)\n    {\n        int maxSoFar = nums[0], currMax = nums[0];\n        for (int i = 1; i < nums.Length; i++)\n        {\n            currMax = Math.Max(nums[i], currMax + nums[i]);\n            maxSoFar = Math.Max(maxSoFar, currMax);\n        }\n        return maxSoFar;\n    }\n}",
    "explanation": "Kadane algorithm decides at each step whether to extend the current subarray or start fresh.",
    "testCases": [
      {
        "input": "[-2,1,-3,4,-1,2,1,-5,4]",
        "expected": "6"
      }
    ]
  },
  {
    "id": "cp-13",
    "title": "Merge Two Sorted Arrays in O(M+N)",
    "category": "Arrays & Lists",
    "difficulty": "Easy",
    "description": "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order. Merge `nums2` into `nums1` in-place as one sorted array.",
    "starterCode": "public class Solution\n{\n    public void Merge(int[] nums1, int m, int[] nums2, int n)\n    {\n        // Your code here\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public void Merge(int[] nums1, int m, int[] nums2, int n)\n    {\n        int p1 = m - 1, p2 = n - 1, p = m + n - 1;\n        while (p2 >= 0)\n        {\n            if (p1 >= 0 && nums1[p1] > nums2[p2])\n                nums1[p--] = nums1[p1--];\n            else\n                nums1[p--] = nums2[p2--];\n        }\n    }\n}",
    "explanation": "Merging from the back avoids overwriting existing elements in nums1.",
    "testCases": [
      {
        "input": "nums1 = [1,2,3,0,0,0], m=3, nums2 = [2,5,6], n=3",
        "expected": "[1,2,2,3,5,6]"
      }
    ]
  },
  {
    "id": "cp-14",
    "title": "Move Zeroes to End In-Place",
    "category": "Arrays & Lists",
    "difficulty": "Easy",
    "description": "Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements in O(1) space.",
    "starterCode": "public class Solution\n{\n    public void MoveZeroes(int[] nums)\n    {\n        // Your code here\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public void MoveZeroes(int[] nums)\n    {\n        int insertPos = 0;\n        for (int i = 0; i < nums.Length; i++)\n        {\n            if (nums[i] != 0)\n            {\n                (nums[insertPos], nums[i]) = (nums[i], nums[insertPos]);\n                insertPos++;\n            }\n        }\n    }\n}",
    "explanation": "C# tuple swap syntax (a, b) = (b, a) moves non-zeroes to the left cleanly.",
    "testCases": [
      {
        "input": "[0,1,0,3,12]",
        "expected": "[1,3,12,0,0]"
      }
    ]
  },
  {
    "id": "cp-15",
    "title": "Product of Array Except Self",
    "category": "Arrays & Lists",
    "difficulty": "Medium",
    "description": "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]` without using the division operation in O(N) time.",
    "starterCode": "public class Solution\n{\n    public int[] ProductExceptSelf(int[] nums)\n    {\n        // Your code here\n        return [];\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public int[] ProductExceptSelf(int[] nums)\n    {\n        int n = nums.Length;\n        int[] output = new int[n];\n        output[0] = 1;\n        for (int i = 1; i < n; i++)\n            output[i] = output[i - 1] * nums[i - 1];\n        int right = 1;\n        for (int i = n - 1; i >= 0; i--)\n        {\n            output[i] *= right;\n            right *= nums[i];\n        }\n        return output;\n    }\n}",
    "explanation": "Prefix and suffix products combined directly in output array achieve O(1) extra space.",
    "testCases": [
      {
        "input": "[1,2,3,4]",
        "expected": "[24,12,8,6]"
      }
    ]
  },
  {
    "id": "cp-16",
    "title": "Rotate Array by K Steps",
    "category": "Arrays & Lists",
    "difficulty": "Medium",
    "description": "Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative, in O(1) extra space.",
    "starterCode": "public class Solution\n{\n    public void Rotate(int[] nums, int k)\n    {\n        // Your code here\n    }\n}",
    "solutionCode": "using System;\n\npublic class Solution\n{\n    public void Rotate(int[] nums, int k)\n    {\n        k %= nums.Length;\n        Array.Reverse(nums);\n        Array.Reverse(nums, 0, k);\n        Array.Reverse(nums, k, nums.Length - k);\n    }\n}",
    "explanation": "Three reverse passes reverse whole array then parts 0..k-1 and k..end.",
    "testCases": [
      {
        "input": "nums = [1,2,3,4,5,6,7], k = 3",
        "expected": "[5,6,7,1,2,3,4]"
      }
    ]
  },
  {
    "id": "cp-17",
    "title": "Find First Missing Positive Integer",
    "category": "Arrays & Lists",
    "difficulty": "Hard",
    "description": "Given an unsorted integer array `nums`, return the smallest positive integer that is not present in `nums` in O(N) time and O(1) auxiliary space.",
    "starterCode": "public class Solution\n{\n    public int FirstMissingPositive(int[] nums)\n    {\n        // Your code here\n        return 1;\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public int FirstMissingPositive(int[] nums)\n    {\n        int n = nums.Length;\n        for (int i = 0; i < n; i++)\n        {\n            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i])\n            {\n                int targetIndex = nums[i] - 1;\n                (nums[i], nums[targetIndex]) = (nums[targetIndex], nums[i]);\n            }\n        }\n        for (int i = 0; i < n; i++)\n            if (nums[i] != i + 1) return i + 1;\n        return n + 1;\n    }\n}",
    "explanation": "Index cyclic sort places each number val at index val-1 directly in-place.",
    "testCases": [
      {
        "input": "[1,2,0]",
        "expected": "3"
      },
      {
        "input": "[3,4,-1,1]",
        "expected": "2"
      }
    ]
  },
  {
    "id": "cp-18",
    "title": "Group Anagrams",
    "category": "Arrays & Lists",
    "difficulty": "Medium",
    "description": "Given an array of strings `strs`, group the anagrams together in any order.",
    "starterCode": "public class Solution\n{\n    public IList<IList<string>> GroupAnagrams(string[] strs)\n    {\n        // Your code here\n        return [];\n    }\n}",
    "solutionCode": "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\npublic class Solution\n{\n    public IList<IList<string>> GroupAnagrams(string[] strs)\n    {\n        var dict = new Dictionary<string, List<string>>();\n        foreach (var s in strs)\n        {\n            char[] arr = s.ToCharArray();\n            Array.Sort(arr);\n            string key = new string(arr);\n            if (!dict.TryGetValue(key, out var list))\n            {\n                list = new List<string>();\n                dict[key] = list;\n            }\n            list.Add(s);\n        }\n        return dict.Values.Cast<IList<string>>().ToList();\n    }\n}",
    "explanation": "Sorted string representation serves as canonical hash map bucket key.",
    "testCases": [
      {
        "input": "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
        "expected": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]"
      }
    ]
  },
  {
    "id": "cp-19",
    "title": "Intersection of Two Arrays",
    "category": "Arrays & Lists",
    "difficulty": "Easy",
    "description": "Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must be unique.",
    "starterCode": "public class Solution\n{\n    public int[] Intersection(int[] nums1, int[] nums2)\n    {\n        // Your code here\n        return [];\n    }\n}",
    "solutionCode": "using System.Collections.Generic;\n\npublic class Solution\n{\n    public int[] Intersection(int[] nums1, int[] nums2)\n    {\n        var set1 = new HashSet<int>(nums1);\n        var res = new HashSet<int>();\n        foreach (int num in nums2)\n            if (set1.Contains(num)) res.Add(num);\n        int[] outArr = new int[res.Count];\n        res.CopyTo(outArr);\n        return outArr;\n    }\n}",
    "explanation": "HashSet eliminates duplicates and provides O(1) average lookup time.",
    "testCases": [
      {
        "input": "nums1 = [1,2,2,1], nums2 = [2,2]",
        "expected": "[2]"
      }
    ]
  },
  {
    "id": "cp-20",
    "title": "Subarray Sum Equals K",
    "category": "Arrays & Lists",
    "difficulty": "Medium",
    "description": "Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals `k`.",
    "starterCode": "public class Solution\n{\n    public int SubarraySum(int[] nums, int k)\n    {\n        // Your code here\n        return 0;\n    }\n}",
    "solutionCode": "using System.Collections.Generic;\n\npublic class Solution\n{\n    public int SubarraySum(int[] nums, int k)\n    {\n        var prefixCounts = new Dictionary<int, int> { [0] = 1 };\n        int sum = 0, count = 0;\n        foreach (int n in nums)\n        {\n            sum += n;\n            if (prefixCounts.TryGetValue(sum - k, out int freq))\n                count += freq;\n            prefixCounts[sum] = prefixCounts.GetValueOrDefault(sum) + 1;\n        }\n        return count;\n    }\n}",
    "explanation": "Prefix sum hash table tracks how many times (sum - k) occurred in previous steps.",
    "testCases": [
      {
        "input": "nums = [1,1,1], k = 2",
        "expected": "2"
      }
    ]
  },
  {
    "id": "cp-21",
    "title": "Top K Frequent Elements",
    "category": "Arrays & Lists",
    "difficulty": "Medium",
    "description": "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements in O(N log K) time or better using a PriorityQueue.",
    "starterCode": "public class Solution\n{\n    public int[] TopKFrequent(int[] nums, int k)\n    {\n        // Your code here\n        return [];\n    }\n}",
    "solutionCode": "using System.Collections.Generic;\n\npublic class Solution\n{\n    public int[] TopKFrequent(int[] nums, int k)\n    {\n        var freq = new Dictionary<int, int>();\n        foreach (int n in nums) freq[n] = freq.GetValueOrDefault(n) + 1;\n        var pq = new PriorityQueue<int, int>();\n        foreach (var (val, count) in freq)\n        {\n            pq.Enqueue(val, count);\n            if (pq.Count > k) pq.Dequeue();\n        }\n        int[] res = new int[k];\n        for (int i = 0; i < k; i++) res[i] = pq.Dequeue();\n        return res;\n    }\n}",
    "explanation": ".NET 6 PriorityQueue<TElement, TPriority> min-heap retains top k items efficiently.",
    "testCases": [
      {
        "input": "nums = [1,1,1,2,2,3], k = 2",
        "expected": "[1, 2]"
      }
    ]
  },
  {
    "id": "cp-22",
    "title": "Valid Parentheses using Stack<char>",
    "category": "Algorithms",
    "difficulty": "Easy",
    "description": "Given a string `s` containing `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid (brackets must close in correct order).",
    "starterCode": "public class Solution\n{\n    public bool IsValid(string s)\n    {\n        // Your code here\n        return false;\n    }\n}",
    "solutionCode": "using System.Collections.Generic;\n\npublic class Solution\n{\n    public bool IsValid(string s)\n    {\n        var stack = new Stack<char>();\n        foreach (char c in s)\n        {\n            if (c == '(') stack.Push(')');\n            else if (c == '{') stack.Push('}');\n            else if (c == '[') stack.Push(']');\n            else if (stack.Count == 0 || stack.Pop() != c) return false;\n        }\n        return stack.Count == 0;\n    }\n}",
    "explanation": "Pushing closing bracket counterparts simplifies matching on pop.",
    "testCases": [
      {
        "input": "\"()\"",
        "expected": "true"
      },
      {
        "input": "\"()[]{}\"",
        "expected": "true"
      },
      {
        "input": "\"(]\"",
        "expected": "false"
      }
    ]
  },
  {
    "id": "cp-23",
    "title": "Evaluate Reverse Polish Notation (Postfix)",
    "category": "Algorithms",
    "difficulty": "Medium",
    "description": "Evaluate the value of an arithmetic expression in Reverse Polish Notation given an array of tokens.",
    "starterCode": "public class Solution\n{\n    public int EvalRPN(string[] tokens)\n    {\n        // Your code here\n        return 0;\n    }\n}",
    "solutionCode": "using System;\nusing System.Collections.Generic;\n\npublic class Solution\n{\n    public int EvalRPN(string[] tokens)\n    {\n        var stack = new Stack<int>();\n        foreach (var t in tokens)\n        {\n            if (int.TryParse(t, out int val)) stack.Push(val);\n            else\n            {\n                int b = stack.Pop(), a = stack.Pop();\n                stack.Push(t switch {\n                    \"+\" => a + b, \"-\" => a - b,\n                    \"*\" => a * b, \"/\" => a / b,\n                    _ => throw new InvalidOperationException()\n                });\n            }\n        }\n        return stack.Pop();\n    }\n}",
    "explanation": "Stack processes operands first and applies operators to popped operands.",
    "testCases": [
      {
        "input": "[\"2\",\"1\",\"+\",\"3\",\"*\"]",
        "expected": "9"
      }
    ]
  },
  {
    "id": "cp-24",
    "title": "Min Stack with O(1) GetMin()",
    "category": "Algorithms",
    "difficulty": "Medium",
    "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant O(1) time.",
    "starterCode": "public class MinStack\n{\n    // Push, Pop, Top, GetMin\n}",
    "solutionCode": "using System;\nusing System.Collections.Generic;\n\npublic class MinStack\n{\n    private readonly Stack<(int val, int min)> _stack = new();\n    public void Push(int val) => _stack.Push((val, _stack.Count == 0 ? val : Math.Min(val, _stack.Peek().min)));\n    public void Pop() => _stack.Pop();\n    public int Top() => _stack.Peek().val;\n    public int GetMin() => _stack.Peek().min;\n}",
    "explanation": "Storing running minimum alongside element tuple yields true O(1) GetMin without secondary lists.",
    "testCases": [
      {
        "input": "Push -2, Push 0, Push -3, GetMin",
        "expected": "-3"
      }
    ]
  },
  {
    "id": "cp-25",
    "title": "Custom LINQ Extension: Chunk<T> Implementation",
    "category": "LINQ",
    "difficulty": "Medium",
    "description": "Implement a custom LINQ extension method `ChunkBy<T>(this IEnumerable<T> source, int size)` that yields arrays of chunks using iterator yield return.",
    "starterCode": "public static class LinqExtensions\n{\n    public static IEnumerable<T[]> ChunkBy<T>(this IEnumerable<T> source, int size)\n    {\n        // Your code here\n        yield break;\n    }\n}",
    "solutionCode": "using System;\nusing System.Collections.Generic;\n\npublic static class LinqExtensions\n{\n    public static IEnumerable<T[]> ChunkBy<T>(this IEnumerable<T> source, int size)\n    {\n        ArgumentNullException.ThrowIfNull(source);\n        if (size <= 0) throw new ArgumentOutOfRangeException(nameof(size));\n        using var enumerator = source.GetEnumerator();\n        while (enumerator.MoveNext())\n        {\n            var chunk = new List<T>(size) { enumerator.Current };\n            while (chunk.Count < size && enumerator.MoveNext())\n                chunk.Add(enumerator.Current);\n            yield return chunk.ToArray();\n        }\n    }\n}",
    "explanation": "Demonstrates manual enumerator stepping with yield return for memory-efficient streaming.",
    "testCases": [
      {
        "input": "[1,2,3,4,5], size=2",
        "expected": "[[1,2], [3,4], [5]]"
      }
    ]
  },
  {
    "id": "cp-26",
    "title": "Custom LINQ Extension: DistinctBy Key Selector",
    "category": "LINQ",
    "difficulty": "Easy",
    "description": "Implement `DistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)` using a HashSet to filter duplicates.",
    "starterCode": "public static class LinqExtensions\n{\n    public static IEnumerable<TSource> CustomDistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)\n    {\n        yield break;\n    }\n}",
    "solutionCode": "using System;\nusing System.Collections.Generic;\n\npublic static class LinqExtensions\n{\n    public static IEnumerable<TSource> CustomDistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)\n    {\n        ArgumentNullException.ThrowIfNull(source);\n        ArgumentNullException.ThrowIfNull(keySelector);\n        var seenKeys = new HashSet<TKey>();\n        foreach (var item in source)\n            if (seenKeys.Add(keySelector(item))) yield return item;\n    }\n}",
    "explanation": "HashSet.Add returns false if element already exists, enabling single-pass deferred deduplication.",
    "testCases": [
      {
        "input": "Users by email",
        "expected": "Deduplicated sequence"
      }
    ]
  },
  {
    "id": "cp-27",
    "title": "LINQ: Top 3 Earners Per Department",
    "category": "LINQ",
    "difficulty": "Medium",
    "description": "Given a list of employees with Department and Salary, return a dictionary of department names mapped to the top 3 highest-earning employees using LINQ.",
    "starterCode": "public record Employee(string Name, string Department, decimal Salary);\n\npublic class Solution\n{\n    public Dictionary<string, List<Employee>> GetTopEarners(IEnumerable<Employee> employees)\n    {\n        return [];\n    }\n}",
    "solutionCode": "using System.Collections.Generic;\nusing System.Linq;\n\npublic record Employee(string Name, string Department, decimal Salary);\n\npublic class Solution\n{\n    public Dictionary<string, List<Employee>> GetTopEarners(IEnumerable<Employee> employees)\n    {\n        return employees\n            .GroupBy(e => e.Department)\n            .ToDictionary(\n                g => g.Key,\n                g => g.OrderByDescending(e => e.Salary).Take(3).ToList()\n            );\n    }\n}",
    "explanation": "GroupBy followed by OrderByDescending and Take(3) mirrors SQL RANK() window functions.",
    "testCases": [
      {
        "input": "Employees across 3 departments",
        "expected": "Max 3 per department"
      }
    ]
  },
  {
    "id": "cp-28",
    "title": "LINQ: Left Outer Join with DefaultIfEmpty",
    "category": "LINQ",
    "difficulty": "Medium",
    "description": "Perform a Left Outer Join between Students and Grades using LINQ GroupJoin and DefaultIfEmpty.",
    "starterCode": "public record Student(int Id, string Name);\npublic record Grade(int StudentId, string Subject, char Score);\n\npublic class Solution\n{\n    public IEnumerable<string> LeftJoinSummary(IEnumerable<Student> students, IEnumerable<Grade> grades)\n    {\n        return [];\n    }\n}",
    "solutionCode": "using System.Collections.Generic;\nusing System.Linq;\n\npublic record Student(int Id, string Name);\npublic record Grade(int StudentId, string Subject, char Score);\n\npublic class Solution\n{\n    public IEnumerable<string> LeftJoinSummary(IEnumerable<Student> students, IEnumerable<Grade> grades)\n    {\n        return students.GroupJoin(\n            grades,\n            s => s.Id,\n            g => g.StudentId,\n            (s, studentGrades) => new { s.Name, Grades = studentGrades.DefaultIfEmpty() }\n        )\n        .SelectMany(\n            x => x.Grades,\n            (x, g) => $\"{x.Name}: {(g != null ? g.Subject : \"No Grade\")}\"\n        );\n    }\n}",
    "explanation": "GroupJoin + SelectMany + DefaultIfEmpty is the idiomatic C# pattern for SQL LEFT JOIN.",
    "testCases": [
      {
        "input": "Students with and without grades",
        "expected": "All students preserved"
      }
    ]
  },
  {
    "id": "cp-29",
    "title": "LINQ: Moving Window Running Average",
    "category": "LINQ",
    "difficulty": "Hard",
    "description": "Given a sequence of doubles and window size `k`, yield the running average of the last `k` numbers without storing the entire sequence.",
    "starterCode": "public class Solution\n{\n    public IEnumerable<double> MovingAverage(IEnumerable<double> stream, int k)\n    {\n        yield break;\n    }\n}",
    "solutionCode": "using System.Collections.Generic;\n\npublic class Solution\n{\n    public IEnumerable<double> MovingAverage(IEnumerable<double> stream, int k)\n    {\n        var window = new Queue<double>(k);\n        double sum = 0;\n        foreach (double val in stream)\n        {\n            window.Enqueue(val);\n            sum += val;\n            if (window.Count > k) sum -= window.Dequeue();\n            yield return sum / window.Count;\n        }\n    }\n}",
    "explanation": "Queue with constant subtraction/addition maintains O(1) step time for streaming time-series.",
    "testCases": [
      {
        "input": "[1, 10, 3, 5], k=3",
        "expected": "[1, 5.5, 4.66, 6]"
      }
    ]
  },
  {
    "id": "cp-30",
    "title": "LINQ: Flatten Hierarchical Categories with SelectMany",
    "category": "LINQ",
    "difficulty": "Medium",
    "description": "Flatten a nested tree of Category nodes (each with subcategories) into a flat list using recursive SelectMany extension.",
    "starterCode": "public record Category(string Name, List<Category> SubCategories);\n\npublic static class Solution\n{\n    public static IEnumerable<Category> Flatten(IEnumerable<Category> root)\n    {\n        return [];\n    }\n}",
    "solutionCode": "using System.Collections.Generic;\nusing System.Linq;\n\npublic record Category(string Name, List<Category> SubCategories);\n\npublic static class Solution\n{\n    public static IEnumerable<Category> Flatten(IEnumerable<Category> root)\n    {\n        return root.SelectMany(c => new[] { c }.Concat(Flatten(c.SubCategories ?? Enumerable.Empty<Category>())));\n    }\n}",
    "explanation": "Recursive LINQ query flattens n-ary trees cleanly in declarative syntax.",
    "testCases": [
      {
        "input": "Nested category tree",
        "expected": "All nodes flattened"
      }
    ]
  },
  {
    "id": "cp-31",
    "title": "LINQ: PartitionBy Boolean Predicate",
    "category": "LINQ",
    "difficulty": "Medium",
    "description": "Split a list into two lists (matching and non-matching) in a single pass without evaluating the source enumerable twice.",
    "starterCode": "public static class Solution\n{\n    public static (List<T> Matches, List<T> NonMatches) Partition<T>(this IEnumerable<T> source, Func<T, bool> predicate)\n    {\n        return ([], []);\n    }\n}",
    "solutionCode": "using System;\nusing System.Collections.Generic;\n\npublic static class Solution\n{\n    public static (List<T> Matches, List<T> NonMatches) Partition<T>(this IEnumerable<T> source, Func<T, bool> predicate)\n    {\n        var matches = new List<T>();\n        var nonMatches = new List<T>();\n        foreach (var item in source)\n        {\n            if (predicate(item)) matches.Add(item);\n            else nonMatches.Add(item);\n        }\n        return (matches, nonMatches);\n    }\n}",
    "explanation": "Avoids multiple enumeration pitfalls common when calling .Where(p) and .Where(!p).",
    "testCases": [
      {
        "input": "[1,2,3,4,5], isEven",
        "expected": "Matches=[2,4], NonMatches=[1,3,5]"
      }
    ]
  },
  {
    "id": "cp-32",
    "title": "LINQ: Graph Cycle Detection with Visited Set",
    "category": "LINQ",
    "difficulty": "Hard",
    "description": "Detect whether a directed graph contains a cycle given adjacency dictionary `Dictionary<int, List<int>>`.",
    "starterCode": "public class Solution\n{\n    public bool HasCycle(Dictionary<int, List<int>> graph)\n    {\n        return false;\n    }\n}",
    "solutionCode": "using System.Collections.Generic;\n\npublic class Solution\n{\n    public bool HasCycle(Dictionary<int, List<int>> graph)\n    {\n        var visited = new HashSet<int>();\n        var recursionStack = new HashSet<int>();\n        bool Dfs(int node)\n        {\n            visited.Add(node);\n            recursionStack.Add(node);\n            if (graph.TryGetValue(node, out var neighbors))\n            {\n                foreach (var next in neighbors)\n                {\n                    if (!visited.Contains(next) && Dfs(next)) return true;\n                    if (recursionStack.Contains(next)) return true;\n                }\n            }\n            recursionStack.Remove(node);\n            return false;\n        }\n        foreach (var node in graph.Keys)\n            if (!visited.Contains(node) && Dfs(node)) return true;\n        return false;\n    }\n}",
    "explanation": "DFS with recursionStack hash set flags back-edges indicating directed cycles.",
    "testCases": [
      {
        "input": "1->2, 2->3, 3->1",
        "expected": "true"
      }
    ]
  },
  {
    "id": "cp-33",
    "title": "Builder Pattern with Method Chaining",
    "category": "OOP & Design",
    "difficulty": "Easy",
    "description": "Implement a fluent `HttpRequestMessageBuilder` supporting WithUrl, WithMethod, WithHeader, and Build().",
    "starterCode": "public class HttpRequestBuilder\n{\n    // Implement builder methods\n}",
    "solutionCode": "using System.Net.Http;\n\npublic class HttpRequestBuilder\n{\n    private string _url = \"\";\n    private HttpMethod _method = HttpMethod.Get;\n    public HttpRequestBuilder WithUrl(string url) { _url = url; return this; }\n    public HttpRequestBuilder WithMethod(HttpMethod method) { _method = method; return this; }\n    public HttpRequestMessage Build() => new(_method, _url);\n}",
    "explanation": "Fluent Builders construct complex immutable objects step by step.",
    "testCases": [
      {
        "input": "WithUrl(\"https://karmatix.in\").WithMethod(HttpMethod.Post)",
        "expected": "HttpRequestMessage configured"
      }
    ]
  },
  {
    "id": "cp-34",
    "title": "Factory Method Pattern for Payment Processors",
    "category": "OOP & Design",
    "difficulty": "Medium",
    "description": "Implement an extensible `PaymentProcessorFactory` that returns `IPaymentProcessor` based on payment method string (UPI, Card, NetBanking).",
    "starterCode": "public interface IPaymentProcessor { void Pay(decimal amount); }\npublic class PaymentFactory\n{\n    public static IPaymentProcessor Create(string type) => throw null!;\n}",
    "solutionCode": "using System;\n\npublic interface IPaymentProcessor { string Process(decimal amount); }\npublic class UpiProcessor : IPaymentProcessor { public string Process(decimal a) => $\"UPI paid {a}\"; }\npublic class CardProcessor : IPaymentProcessor { public string Process(decimal a) => $\"Card paid {a}\"; }\n\npublic static class PaymentFactory\n{\n    public static IPaymentProcessor Create(string type) => type.ToUpperInvariant() switch {\n        \"UPI\" => new UpiProcessor(),\n        \"CARD\" => new CardProcessor(),\n        _ => throw new ArgumentException($\"Unknown provider {type}\")\n    };\n}",
    "explanation": "Encapsulates object instantiation logic behind polymorphism and pattern matching.",
    "testCases": [
      {
        "input": "\"UPI\", 500",
        "expected": "\"UPI paid 500\""
      }
    ]
  },
  {
    "id": "cp-35",
    "title": "Decorator Pattern for Cached Repository",
    "category": "OOP & Design",
    "difficulty": "Medium",
    "description": "Implement a decorator `CachedUserRepository` wrapping `IUserRepository` to transparently add in-memory caching.",
    "starterCode": "public interface IUserRepository { string GetUser(int id); }\npublic class CachedUserRepository : IUserRepository\n{\n    // Your code here\n}",
    "solutionCode": "using System.Collections.Concurrent;\n\npublic interface IUserRepository { string GetUser(int id); }\npublic class CachedUserRepository(IUserRepository inner) : IUserRepository\n{\n    private readonly ConcurrentDictionary<int, string> _cache = new();\n    public string GetUser(int id) => _cache.GetOrAdd(id, inner.GetUser);\n}",
    "explanation": "The Decorator pattern attaches caching behaviors without modifying the underlying repository.",
    "testCases": [
      {
        "input": "GetUser(1) twice",
        "expected": "Inner called once, second from cache"
      }
    ]
  },
  {
    "id": "cp-36",
    "title": "Strategy Pattern for Dynamic Pricing & Discounts",
    "category": "OOP & Design",
    "difficulty": "Easy",
    "description": "Implement discount strategies (FestivalDiscount, StudentDiscount, NoDiscount) conforming to `IDiscountStrategy`.",
    "starterCode": "public interface IDiscountStrategy { decimal Apply(decimal total); }",
    "solutionCode": "public interface IDiscountStrategy { decimal Apply(decimal total); }\npublic class StudentDiscount : IDiscountStrategy { public decimal Apply(decimal t) => t * 0.85m; }\npublic class FestivalDiscount : IDiscountStrategy { public decimal Apply(decimal t) => t * 0.70m; }\npublic class Order(IDiscountStrategy strategy)\n{\n    public decimal Calculate(decimal total) => strategy.Apply(total);\n}",
    "explanation": "Strategy pattern encapsulates interchangeable algorithms adhering to Open/Closed Principle.",
    "testCases": [
      {
        "input": "total=100 with StudentDiscount",
        "expected": "85.0"
      }
    ]
  },
  {
    "id": "cp-37",
    "title": "Observer Pattern with IObserver & IObservable",
    "category": "OOP & Design",
    "difficulty": "Medium",
    "description": "Implement a stock ticker observable publisher using the BCL `IObservable<decimal>` and `IObserver<decimal>` contracts.",
    "starterCode": "using System;\npublic class StockTicker : IObservable<decimal>\n{\n    // Implement Subscribe\n}",
    "solutionCode": "using System;\nusing System.Collections.Generic;\n\npublic class StockTicker : IObservable<decimal>\n{\n    private readonly List<IObserver<decimal>> _observers = [];\n    public IDisposable Subscribe(IObserver<decimal> observer)\n    {\n        if (!_observers.Contains(observer)) _observers.Add(observer);\n        return new Unsubscriber(_observers, observer);\n    }\n    public void Notify(decimal price) { foreach (var obs in _observers) obs.OnNext(price); }\n    private class Unsubscriber(List<IObserver<decimal>> list, IObserver<decimal> obs) : IDisposable\n    {\n        public void Dispose() => list.Remove(obs);\n    }\n}",
    "explanation": "Demonstrates official .NET BCL push-based notification pattern with IDisposable unsubscription.",
    "testCases": [
      {
        "input": "Notify 150.0m",
        "expected": "All subscribers receive 150.0m"
      }
    ]
  },
  {
    "id": "cp-38",
    "title": "Thread-Safe Singleton with Lazy<T>",
    "category": "OOP & Design",
    "difficulty": "Easy",
    "description": "Implement a high-performance thread-safe singleton class in C# using `System.Lazy<T>`.",
    "starterCode": "public sealed class AppConfigManager\n{\n    // Thread-safe singleton\n}",
    "solutionCode": "using System;\n\npublic sealed class AppConfigManager\n{\n    private static readonly Lazy<AppConfigManager> _lazy = new(() => new AppConfigManager());\n    public static AppConfigManager Instance => _lazy.Value;\n    private AppConfigManager() { }\n    public string AppName => \"Karmatix\";\n}",
    "explanation": "Lazy<T> guarantees thread-safety and lazy initialization with zero manual locking overhead.",
    "testCases": [
      {
        "input": "AppConfigManager.Instance == AppConfigManager.Instance",
        "expected": "true"
      }
    ]
  },
  {
    "id": "cp-39",
    "title": "Value Object with Record Struct and Guard Clauses",
    "category": "OOP & Design",
    "difficulty": "Easy",
    "description": "Implement an immutable `EmailAddress` readonly record struct that validates format in its primary constructor.",
    "starterCode": "public readonly record struct EmailAddress\n{\n    // Value property and validation\n}",
    "solutionCode": "using System;\n\npublic readonly record struct EmailAddress\n{\n    public string Value { get; }\n    public EmailAddress(string value)\n    {\n        if (string.IsNullOrWhiteSpace(value) || !value.Contains('@'))\n            throw new ArgumentException(\"Invalid email\");\n        Value = value.Trim().ToLowerInvariant();\n    }\n}",
    "explanation": "Domain-Driven Design (DDD) Value Objects guarantee self-validating state with value equality semantics.",
    "testCases": [
      {
        "input": "\"User@KX.IN\"",
        "expected": "Value=\"user@kx.in\""
      }
    ]
  },
  {
    "id": "cp-40",
    "title": "Middleware Pipeline Pattern using Delegate Chains",
    "category": "OOP & Design",
    "difficulty": "Hard",
    "description": "Build a miniature middleware pipeline runner where delegates chain with `next(context)` execution.",
    "starterCode": "using System;\nusing System.Threading.Tasks;\n\npublic delegate Task RequestDelegate(string context);\npublic class PipelineBuilder\n{\n    // Use, Build\n}",
    "solutionCode": "using System;\nusing System.Collections.Generic;\nusing System.Threading.Tasks;\n\npublic delegate Task RequestDelegate(string context);\npublic class PipelineBuilder\n{\n    private readonly List<Func<RequestDelegate, RequestDelegate>> _components = [];\n    public PipelineBuilder Use(Func<RequestDelegate, RequestDelegate> middleware)\n    {\n        _components.Add(middleware);\n        return this;\n    }\n    public RequestDelegate Build()\n    {\n        RequestDelegate current = ctx => Task.CompletedTask;\n        for (int i = _components.Count - 1; i >= 0; i--)\n            current = _components[i](current);\n        return current;\n    }\n}",
    "explanation": "The foundation of ASP.NET Core middleware pipeline reversed delegation chaining.",
    "testCases": [
      {
        "input": "2 middleware pipeline",
        "expected": "Executes in onion order"
      }
    ]
  },
  {
    "id": "cp-41",
    "title": "Throttling Async Operations with SemaphoreSlim",
    "category": "Async & Concurrency",
    "difficulty": "Medium",
    "description": "Given a collection of tasks, execute them with a maximum concurrency degree using `SemaphoreSlim`.",
    "starterCode": "using System.Collections.Generic;\nusing System.Threading.Tasks;\n\npublic class Solution\n{\n    public async Task ProcessThrottledAsync(IEnumerable<string> items, int maxDegree)\n    {\n    }\n}",
    "solutionCode": "using System;\nusing System.Collections.Generic;\nusing System.Threading;\nusing System.Threading.Tasks;\n\npublic class Solution\n{\n    public async Task ProcessThrottledAsync(IEnumerable<string> items, int maxDegree)\n    {\n        using var semaphore = new SemaphoreSlim(maxDegree, maxDegree);\n        var tasks = new List<Task>();\n        foreach (var item in items)\n        {\n            await semaphore.WaitAsync();\n            tasks.Add(Task.Run(async () =>\n            {\n                try { await Task.Delay(20); }\n                finally { semaphore.Release(); }\n            }));\n        }\n        await Task.WhenAll(tasks);\n    }\n}",
    "explanation": "SemaphoreSlim ensures at most maxDegree tasks execute concurrently without starving the thread pool.",
    "testCases": [
      {
        "input": "10 items, maxDegree=3",
        "expected": "All finish with max 3 parallel"
      }
    ]
  },
  {
    "id": "cp-42",
    "title": "Retry Policy with Exponential Backoff and Jitter",
    "category": "Async & Concurrency",
    "difficulty": "Medium",
    "description": "Implement an async retry function `ExecuteWithRetryAsync` that retries up to `maxRetries` with exponential backoff delay.",
    "starterCode": "using System;\nusing System.Threading.Tasks;\n\npublic class Solution\n{\n    public static async Task<T> ExecuteWithRetryAsync<T>(Func<Task<T>> action, int maxRetries)\n    {\n        throw null!;\n    }\n}",
    "solutionCode": "using System;\nusing System.Threading.Tasks;\n\npublic class Solution\n{\n    public static async Task<T> ExecuteWithRetryAsync<T>(Func<Task<T>> action, int maxRetries)\n    {\n        int attempt = 0;\n        while (true)\n        {\n            try { return await action(); }\n            catch when (++attempt <= maxRetries)\n            {\n                int delayMs = (int)Math.Pow(2, attempt) * 100 + Random.Shared.Next(0, 50);\n                await Task.Delay(delayMs);\n            }\n        }\n    }\n}",
    "explanation": "Exponential backoff with jitter prevents thundering herd problem on recovering downstream APIs.",
    "testCases": [
      {
        "input": "Fails twice then succeeds",
        "expected": "Returns value on 3rd attempt"
      }
    ]
  },
  {
    "id": "cp-43",
    "title": "Producer-Consumer Queue with System.Threading.Channels",
    "category": "Async & Concurrency",
    "difficulty": "Hard",
    "description": "Build a bounded high-throughput producer-consumer queue using `Channel.CreateBounded<T>` with backpressure.",
    "starterCode": "using System.Threading.Channels;\n\npublic class QueueWorker<T>\n{\n    // WriteAsync and ReadAllAsync\n}",
    "solutionCode": "using System.Collections.Generic;\nusing System.Threading.Channels;\nusing System.Threading.Tasks;\n\npublic class QueueWorker<T>\n{\n    private readonly Channel<T> _channel = Channel.CreateBounded<T>(new BoundedChannelOptions(100) {\n        FullMode = BoundedChannelFullMode.Wait\n    });\n    public ValueTask EnqueueAsync(T item) => _channel.Writer.WriteAsync(item);\n    public IAsyncEnumerable<T> ReadAllAsync() => _channel.Reader.ReadAllAsync();\n    public void Complete() => _channel.Writer.Complete();\n}",
    "explanation": "Channels provide thread-safe lock-free memory buffers with native async backpressure.",
    "testCases": [
      {
        "input": "Producer enqueues 100 items",
        "expected": "Consumer consumes in order"
      }
    ]
  },
  {
    "id": "cp-44",
    "title": "Periodic Background Timer using PeriodicTimer",
    "category": "Async & Concurrency",
    "difficulty": "Easy",
    "description": "Implement a background heartbeat worker that ticks every specified interval using .NET 6+ `PeriodicTimer`.",
    "starterCode": "using System;\nusing System.Threading;\nusing System.Threading.Tasks;\n\npublic class HeartbeatWorker\n{\n    public static async Task RunAsync(TimeSpan interval, CancellationToken ct)\n    {\n    }\n}",
    "solutionCode": "using System;\nusing System.Threading;\nusing System.Threading.Tasks;\n\npublic class HeartbeatWorker\n{\n    public static async Task RunAsync(TimeSpan interval, CancellationToken ct)\n    {\n        using var timer = new PeriodicTimer(interval);\n        while (!ct.IsCancellationRequested && await timer.WaitForNextTickAsync(ct))\n        {\n            // Perform tick maintenance\n        }\n    }\n}",
    "explanation": "PeriodicTimer avoids callback re-entrancy and memory allocations compared to older System.Threading.Timer.",
    "testCases": [
      {
        "input": "interval = 100ms, ct canceled after 300ms",
        "expected": "Graceful loop termination"
      }
    ]
  },
  {
    "id": "cp-45",
    "title": "Thread-Safe Cache with Double-Check Locking",
    "category": "Async & Concurrency",
    "difficulty": "Medium",
    "description": "Implement a thread-safe cache store using double-checked locking with a lock object or SemaphoreSlim.",
    "starterCode": "public class SafeStore<TKey, TValue> where TKey : notnull\n{\n    // GetOrAdd\n}",
    "solutionCode": "using System;\nusing System.Collections.Generic;\n\npublic class SafeStore<TKey, TValue> where TKey : notnull\n{\n    private readonly Dictionary<TKey, TValue> _store = new();\n    private readonly object _lock = new();\n    public TValue GetOrAdd(TKey key, Func<TKey, TValue> factory)\n    {\n        if (_store.TryGetValue(key, out var val)) return val;\n        lock (_lock)\n        {\n            if (_store.TryGetValue(key, out val)) return val;\n            val = factory(key);\n            _store[key] = val;\n            return val;\n        }\n    }\n}",
    "explanation": "Double-checked locking ensures expensive factory method is invoked exactly once across concurrent threads.",
    "testCases": [
      {
        "input": "Concurrent calls for key \"A\"",
        "expected": "Factory called once"
      }
    ]
  },
  {
    "id": "cp-46",
    "title": "CancellationToken Propagation & Graceful Timeout",
    "category": "Async & Concurrency",
    "difficulty": "Easy",
    "description": "Demonstrate combining a caller CancellationToken with a 5-second timeout using `CancellationTokenSource.CreateLinkedTokenSource`.",
    "starterCode": "using System.Threading;\nusing System.Threading.Tasks;\n\npublic class Solution\n{\n    public static async Task RunWithTimeoutAsync(CancellationToken callerToken)\n    {\n    }\n}",
    "solutionCode": "using System;\nusing System.Threading;\nusing System.Threading.Tasks;\n\npublic class Solution\n{\n    public static async Task RunWithTimeoutAsync(CancellationToken callerToken)\n    {\n        using var timeoutCts = new CancellationTokenSource(TimeSpan.FromSeconds(5));\n        using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(callerToken, timeoutCts.Token);\n        await Task.Delay(100, linkedCts.Token);\n    }\n}",
    "explanation": "Linked token sources trigger if either the caller cancels or timeout duration expires first.",
    "testCases": [
      {
        "input": "Timeout fires",
        "expected": "OperationCanceledException thrown"
      }
    ]
  },
  {
    "id": "cp-47",
    "title": "Binary Search on Sorted Array",
    "category": "Algorithms",
    "difficulty": "Easy",
    "description": "Given an array of integers `nums` sorted in ascending order and a target value, search target in O(log N) time.",
    "starterCode": "public class Solution\n{\n    public int Search(int[] nums, int target)\n    {\n        // Your code here\n        return -1;\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public int Search(int[] nums, int target)\n    {\n        int low = 0, high = nums.Length - 1;\n        while (low <= high)\n        {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n}",
    "explanation": "`low + (high - low) / 2` avoids integer overflow on large arrays.",
    "testCases": [
      {
        "input": "nums = [-1,0,3,5,9,12], target = 9",
        "expected": "4"
      }
    ]
  },
  {
    "id": "cp-48",
    "title": "Search in Rotated Sorted Array",
    "category": "Algorithms",
    "difficulty": "Medium",
    "description": "Given a sorted array rotated at an unknown pivot, find the index of target in O(log N) time.",
    "starterCode": "public class Solution\n{\n    public int SearchRotated(int[] nums, int target)\n    {\n        return -1;\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public int SearchRotated(int[] nums, int target)\n    {\n        int left = 0, right = nums.Length - 1;\n        while (left <= right)\n        {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[left] <= nums[mid])\n            {\n                if (nums[left] <= target && target < nums[mid]) right = mid - 1;\n                else left = mid + 1;\n            }\n            else\n            {\n                if (nums[mid] < target && target <= nums[right]) left = mid + 1;\n                else right = mid - 1;\n            }\n        }\n        return -1;\n    }\n}",
    "explanation": "At least one half is always sorted; checking whether target lies inside sorted half guides bisecting.",
    "testCases": [
      {
        "input": "nums = [4,5,6,7,0,1,2], target = 0",
        "expected": "4"
      }
    ]
  },
  {
    "id": "cp-49",
    "title": "Invert a Binary Tree",
    "category": "Algorithms",
    "difficulty": "Easy",
    "description": "Given the root of a binary tree, invert the tree (mirror left and right subtrees) and return its root.",
    "starterCode": "public class TreeNode { public int Val; public TreeNode? Left; public TreeNode? Right; }\npublic class Solution\n{\n    public TreeNode? InvertTree(TreeNode? root)\n    {\n        return null;\n    }\n}",
    "solutionCode": "public class TreeNode { public int Val; public TreeNode? Left; public TreeNode? Right; }\npublic class Solution\n{\n    public TreeNode? InvertTree(TreeNode? root)\n    {\n        if (root == null) return null;\n        (root.Left, root.Right) = (InvertTree(root.Right), InvertTree(root.Left));\n        return root;\n    }\n}",
    "explanation": "Recursive post-order traversal swaps left and right subtrees in O(N) time.",
    "testCases": [
      {
        "input": "[4,2,7,1,3,6,9]",
        "expected": "[4,7,2,9,6,3,1]"
      }
    ]
  },
  {
    "id": "cp-50",
    "title": "Lowest Common Ancestor in Binary Search Tree",
    "category": "Algorithms",
    "difficulty": "Medium",
    "description": "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q.",
    "starterCode": "public class Solution\n{\n    public TreeNode? LowestCommonAncestor(TreeNode? root, TreeNode p, TreeNode q)\n    {\n        return null;\n    }\n}",
    "solutionCode": "public class Solution\n{\n    public TreeNode? LowestCommonAncestor(TreeNode? root, TreeNode p, TreeNode q)\n    {\n        while (root != null)\n        {\n            if (p.Val < root.Val && q.Val < root.Val) root = root.Left;\n            else if (p.Val > root.Val && q.Val > root.Val) root = root.Right;\n            else return root;\n        }\n        return null;\n    }\n}",
    "explanation": "BST property: when values diverge to opposite sides of current node, current node is the LCA.",
    "testCases": [
      {
        "input": "BST root=6, p=2, q=8",
        "expected": "6"
      }
    ]
  },
  {
    "id": "cp-51",
    "title": "Rate Limiter: Sliding Window Counter",
    "category": "Algorithms",
    "difficulty": "Hard",
    "description": "Implement a sliding window rate limiter that allows at most `maxRequests` per `windowSeconds`.",
    "starterCode": "public class SlidingWindowRateLimiter\n{\n    // AllowRequest(string clientId)\n}",
    "solutionCode": "using System;\nusing System.Collections.Concurrent;\n\npublic class SlidingWindowRateLimiter(int maxRequests, TimeSpan window)\n{\n    private readonly ConcurrentDictionary<string, ConcurrentQueue<DateTime>> _clients = new();\n    public bool AllowRequest(string clientId)\n    {\n        var queue = _clients.GetOrAdd(clientId, _ => new ConcurrentQueue<DateTime>());\n        var now = DateTime.UtcNow;\n        var cutoff = now - window;\n        while (queue.TryPeek(out var time) && time < cutoff) queue.TryDequeue(out _);\n        if (queue.Count >= maxRequests) return false;\n        queue.Enqueue(now);\n        return true;\n    }\n}",
    "explanation": "Sliding window timestamp queue purges expired requests and prevents burst boundaries.",
    "testCases": [
      {
        "input": "5 reqs in 1 sec with max 5",
        "expected": "All allowed; 6th rejected"
      }
    ]
  },
  {
    "id": "cp-52",
    "title": "LRU Cache (Least Recently Used) in O(1)",
    "category": "Algorithms",
    "difficulty": "Hard",
    "description": "Design and implement a data structure for Least Recently Used (LRU) cache with O(1) Get and Put operations using a Dictionary and Doubly-Linked List.",
    "starterCode": "public class LRUCache\n{\n    public LRUCache(int capacity) { }\n    public int Get(int key) => -1;\n    public void Put(int key, int value) { }\n}",
    "solutionCode": "using System.Collections.Generic;\n\npublic class LRUCache\n{\n    private readonly int _capacity;\n    private readonly Dictionary<int, LinkedListNode<(int key, int val)>> _map = new();\n    private readonly LinkedList<(int key, int val)> _list = new();\n    public LRUCache(int capacity) => _capacity = capacity;\n    public int Get(int key)\n    {\n        if (!_map.TryGetValue(key, out var node)) return -1;\n        _list.Remove(node);\n        _list.AddFirst(node);\n        return node.Value.val;\n    }\n    public void Put(int key, int value)\n    {\n        if (_map.TryGetValue(key, out var node))\n        {\n            _list.Remove(node);\n            node.Value = (key, value);\n            _list.AddFirst(node);\n            return;\n        }\n        if (_map.Count >= _capacity)\n        {\n            var last = _list.Last!;\n            _map.Remove(last.Value.key);\n            _list.RemoveLast();\n        }\n        var newNode = new LinkedListNode<(int, int)>((key, value));\n        _list.AddFirst(newNode);\n        _map[key] = newNode;\n    }\n}",
    "explanation": "Dictionary maps keys to LinkedList nodes; removing and re-inserting at front is O(1).",
    "testCases": [
      {
        "input": "Put(1,1), Put(2,2), Get(1), Put(3,3), Get(2)",
        "expected": "Returns -1 for evicted key 2"
      }
    ]
  }
];
