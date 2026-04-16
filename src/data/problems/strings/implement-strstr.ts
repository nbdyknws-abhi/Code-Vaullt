import { Problem } from '../../../types/problem';

export const implementStrstr: Problem = {
  id: "implement-strstr",
  title: "Find the Index of the First Occurrence in a String",
  difficulty: "Easy",
  topic: "Strings",
  tags: ["two-pointers","string","string-matching"],
  prompt: "Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.",
  constraints: ["1 <= haystack.length, needle.length <= 10^4","haystack and needle consist of only lowercase English characters."],
  examples: [
  {
    "input": "haystack = \"sadbutsad\", needle = \"sad\"",
    "output": "0",
    "explanation": "\"sad\" occurs at index 0 and 6. The first occurrence is at index 0, so we return 0."
  },
  {
    "input": "haystack = \"leetcode\", needle = \"leeto\"",
    "output": "-1",
    "explanation": "\"leeto\" did not occur in \"leetcode\", so we return -1."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def strStr(haystack, needle):\n    # Built-in solution\n    return haystack.find(needle)",
    "explanation": [
      "Python strings provide a native robust C-optimized find() subroutine.",
      "Executes KMP string-matching pattern natively bypassing manual iteration.",
      "Simply returns exact first index or -1 explicitly."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <string>\n\nclass Solution {\npublic:\n    int strStr(std::string haystack, std::string needle) {\n        int m = haystack.length(), n = needle.length();\n        for (int i = 0; i <= m - n; i++) {\n            int j = 0;\n            for (; j < n; j++) {\n                if (haystack[i + j] != needle[j]) {\n                    break;\n                }\n            }\n            if (j == n) {\n                return i;\n            }\n        }\n        return -1;\n    }\n};",
    "explanation": [
      "Utilize two explicit sliding pointers running across substring possibilities linearly.",
      "Precompute window length limits determining execution cycles securely (m-n).",
      "Evaluate independent inner loop executing full string matches incrementally extending j indexes.",
      "If j successfully traverses the complete length of needle array n, matching confirmed."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int strStr(String haystack, String needle) {\n        if (needle.isEmpty()) return 0;\n        int m = haystack.length();\n        int n = needle.length();\n        if (m < n) return -1;\n        \n        for (int i = 0; i <= m - n; ++i) {\n            if (haystack.substring(i, i + n).equals(needle)) {\n                return i;\n            }\n        }\n        return -1;\n    }\n}",
    "explanation": [
      "Evaluate baseline lengths returning bounds errors bypassing loops explicitly.",
      "Sweep main Array sequentially.",
      "Instead of nested loops, use Java's secure string mapping subString and equals() object operations.",
      "Return exact initial iterator variable correlating to string start positions."
    ]
  }
],
  timeComplexity: "O(N * M)",
  spaceComplexity: "O(1)",
  edgeCases: ["needle > haystack","Empty needle"]
};
