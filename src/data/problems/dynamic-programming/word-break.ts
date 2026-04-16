import { Problem } from '../../../types/problem';

export const wordBreak: Problem = {
  id: "word-break",
  title: "Word Break",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  tags: ["hash-table","string","dynamic-programming","memoization"],
  prompt: "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.",
  constraints: ["1 <= s.length <= 300","1 <= wordDict.length <= 1000","1 <= wordDict[i].length <= 20","s and wordDict[i] consist of only lowercase English letters.","All the strings of wordDict are unique."],
  examples: [
  {
    "input": "s = \"leetcode\", wordDict = [\"leet\", \"code\"]",
    "output": "true"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        dp = [False] * (len(s) + 1)\n        dp[len(s)] = True\n        \n        for i in range(len(s) - 1, -1, -1):\n            for w in wordDict:\n                if (i + len(w)) <= len(s) and s[i : i + len(w)] == w:\n                    dp[i] = dp[i + len(w)]\n                if dp[i]:\n                    break\n                    \n        return dp[0]",
    "explanation": [
      "Use a bottom-up DP array where `dp[i]` represents whether the substring `s[i:]` can be broken into valid words.",
      "Iterate backwards from the end of the string.",
      "For each position, try to match every word in the dictionary. If a match is found and the remaining substring is also valid (checked via lookahead in `dp`), mark the current position as valid.",
      "The result is `dp[0]`."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        vector<bool> dp(s.length() + 1, false);\n        dp[0] = true;\n        \n        for (int i = 1; i <= s.length(); i++) {\n            for (const string& w : wordDict) {\n                int start = i - w.length();\n                if (start >= 0 && dp[start] && s.substr(start, w.length()) == w) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        return dp[s.length()];\n    }\n};",
    "explanation": [
      "Tabulation approach: `dp[i]` is true if the prefix `s[0...i]` can be segmented.",
      "For each ending position `i`, check if any word from the dictionary ends there and if the prefix before that word was also valid.",
      "The `dp[0]` base case represents an empty string being validly segmentable.",
      "Final answer is `dp[s.length()]`."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        boolean[] dp = new boolean[s.length() + 1];\n        Set<String> set = new HashSet<>(wordDict);\n        dp[0] = true;\n        \n        for (int i = 1; i <= s.length(); i++) {\n            for (int j = 0; j < i; j++) {\n                if (dp[j] && set.contains(s.substring(j, i))) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        return dp[s.length()];\n    }\n}",
    "explanation": [
      "Convert the dictionary to a HashSet for O(1) average lookup time.",
      "Apply DP: a string of length `i` is breakable if there exists a split point `j` such that the prefix `s[0...j]` is breakable and the substring `s[j...i]` is in the dictionary.",
      "Result is stored in the last element of the boolean array.",
      "Algorithm explores all potential split points for each prefix."
    ]
  }
],
  timeComplexity: "O(N^2 * M) or O(N^3)",
  spaceComplexity: "O(N)",
  edgeCases: ["Empty string","Word used multiple times"]
};
