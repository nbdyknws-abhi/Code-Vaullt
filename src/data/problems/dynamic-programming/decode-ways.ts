import { Problem } from '../../../types/problem';

export const decodeWays: Problem = {
  id: "decode-ways",
  title: "Decode Ways",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  tags: ["string","dynamic-programming"],
  prompt: "A message containing letters from `A-Z` can be encoded into numbers using the following mapping:\n'A' -> \"1\", 'B' -> \"2\", ... 'Z' -> \"26\"\n\nTo decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, \"11106\" can be mapped into:\n- \"AAJF\" with the grouping (1 1 10 6)\n- \"KJF\" with the grouping (11 10 6)\n\nNote that the grouping (1 11 06) is invalid because \"06\" cannot be mapped into 'F' since \"6\" is different from \"06\". Given a string `s` containing only digits, return the number of ways to decode it.",
  constraints: ["1 <= s.length <= 100","s contains only digits and may contain leading zero(s)."],
  examples: [
  {
    "input": "s = \"226\"",
    "output": "3",
    "explanation": "\"226\" could be decoded as \"BZ\" (2 26), \"VF\" (22 6), or \"BBF\" (2 2 6)."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def numDecodings(self, s: str) -> int:\n        if not s or s[0] == \"0\":\n            return 0\n            \n        dp = { len(s) : 1 }\n        for i in range(len(s) - 1, -1, -1):\n            if s[i] == \"0\":\n                dp[i] = 0\n            else:\n                dp[i] = dp[i + 1]\n                \n            if (i + 1 < len(s) and (s[i] == \"1\" or \n                (s[i] == \"2\" and s[i + 1] in \"0123456\"))):\n                dp[i] += dp[i + 2]\n                \n        return dp[0]",
    "explanation": [
      "Use dynamic programming to count decoding options from right to left.",
      "A single digit `s[i]` can be decoded if it's not '0'.",
      "A double digit `s[i:i+2]` can be decoded if it's between '10' and '26'.",
      "Base case is reached at the end of the string (1 way to decode empty string).",
      "Sum the ways from both valid paths for each index."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int numDecodings(string s) {\n        if (s.empty() || s[0] == '0') return 0;\n        int n = s.length();\n        vector<int> dp(n + 1, 0);\n        dp[0] = 1;\n        dp[1] = 1;\n        \n        for (int i = 2; i <= n; i++) {\n            if (s[i-1] != '0') dp[i] += dp[i-1];\n            int twoDigit = stoi(s.substr(i-2, 2));\n            if (twoDigit >= 10 && twoDigit <= 26) dp[i] += dp[i-2];\n        }\n        return dp[n];\n    }\n};",
    "explanation": [
      "Tabulate the number of ways to decode the prefix of length `i`.",
      "One-digit case: if `s[i-1]` is valid (not '0'), it contributes `dp[i-1]` ways.",
      "Two-digit case: if `s[i-2...i-1]` forms a number from 10 to 26, it contributes `dp[i-2]` ways.",
      "Linear time complexity ensures efficiency for maximum input length."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int numDecodings(String s) {\n        int n = s.length();\n        int[] dp = new int[n + 1];\n        dp[0] = 1;\n        dp[1] = s.charAt(0) == '0' ? 0 : 1;\n        \n        for (int i = 2; i <= n; i++) {\n            int first = Integer.valueOf(s.substring(i - 1, i));\n            int second = Integer.valueOf(s.substring(i - 2, i));\n            if (first >= 1 && first <= 9) {\n               dp[i] += dp[i - 1];\n            }\n            if (second >= 10 && second <= 26) {\n                dp[i] += dp[i - 2];\n            }\n        }\n        return dp[n];\n    }\n}",
    "explanation": [
      "Determine ways to decode by combining results from sub-problems of length `i-1` and `i-2`.",
      "String parsing logic correctly identifies valid encoding mappings (1-26).",
      "The algorithm gracefully handles failing states (e.g., '0' inputs) by adding 0 to the current `dp[i]` result.",
      "Space optimization is possible, but O(N) is standard for clarity."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["String with leading zero","String with '30' or '0' internally"]
};
