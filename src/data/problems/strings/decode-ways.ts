import { Problem } from '../../../types/problem';

export const decodeWays: Problem = {
  id: "decode-ways",
  title: "Decode Ways",
  difficulty: "Medium",
  topic: "Strings",
  tags: ["string","dynamic-programming"],
  prompt: "A message containing letters from `A-Z` can be encoded into numbers using mapping 'A' -> '1', 'B' -> '2' ... 'Z' -> '26'.\n\nGiven a string `s` containing only digits, return the number of ways to decode it.",
  constraints: ["1 <= s.length <= 100","s contains only digits and may contain leading zero(s)."],
  examples: [
  {
    "input": "s = \"12\"",
    "output": "2",
    "explanation": "\"12\" could be decoded as \"AB\" (1 2) or \"L\" (12)."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def numDecodings(s):\n    if not s or s[0] == '0':\n        return 0\n        \n    dp = [0] * (len(s) + 1)\n    dp[0] = 1\n    dp[1] = 1\n    \n    for i in range(2, len(s) + 1):\n        if s[i-1] != '0':\n            dp[i] += dp[i-1]\n            \n        two_digit = int(s[i-2:i])\n        if 10 <= two_digit <= 26:\n            dp[i] += dp[i-2]\n            \n    return dp[len(s)]",
    "explanation": [
      "Initialize a DP array where dp[i] equals distinct decoding ways up to position i.",
      "Validate explicit leading zeroes triggering absolute failures.",
      "A single character qualifies as a decode if it is not 0 (extending previous count dp[i-1]).",
      "Double characters qualify bridging previously registered values up to length 26 (extending count dp[i-2])."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <string>\n#include <vector>\n\nclass Solution {\npublic:\n    int numDecodings(std::string s) {\n        if (s.empty() || s[0] == '0') return 0;\n        int n = s.length();\n        std::vector<int> dp(n + 1, 0);\n        dp[0] = 1;\n        dp[1] = 1;\n        \n        for (int i = 2; i <= n; i++) {\n            int oneDigit = s[i - 1] - '0';\n            int twoDigits = std::stoi(s.substr(i - 2, 2));\n            \n            if (oneDigit >= 1) {\n                dp[i] += dp[i - 1];\n            }\n            if (twoDigits >= 10 && twoDigits <= 26) {\n                dp[i] += dp[i - 2];\n            }\n        }\n        return dp[n];\n    }\n};",
    "explanation": [
      "Prevent initial evaluation if character equals explicit 0.",
      "Allocate linear N array size for state recording DP configurations.",
      "Compute sequential individual offsets dynamically aggregating counts mapped at dp[i].",
      "Final Array index N natively resolves combinations."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int numDecodings(String s) {\n        if (s == null || s.length() == 0 || s.charAt(0) == '0') {\n            return 0;\n        }\n        int n = s.length();\n        int[] dp = new int[n + 1];\n        dp[0] = 1;\n        dp[1] = 1;\n        \n        for (int i = 2; i <= n; i++) {\n            int first = Integer.valueOf(s.substring(i - 1, i));\n            int second = Integer.valueOf(s.substring(i - 2, i));\n            \n            if (first >= 1 && first <= 9) {\n                dp[i] += dp[i - 1];\n            }\n            if (second >= 10 && second <= 26) {\n                dp[i] += dp[i - 2];\n            }\n        }\n        return dp[n];\n    }\n}",
    "explanation": [
      "Leverage primitive integer arrays executing DP evaluations.",
      "Extract substrings dynamically mapping character integers sequentially.",
      "Limit subsets exclusively connecting 1-9 blocks independent of 10-26 composite mappings.",
      "Aggregate linear dependencies inside active loops natively."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Leading zeroes","Interspersed zeroes (e.g., '06')"]
};
