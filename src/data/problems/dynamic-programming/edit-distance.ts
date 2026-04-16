import { Problem } from '../../../types/problem';

export const editDistance: Problem = {
  id: "edit-distance",
  title: "Edit Distance",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  tags: ["string","dynamic-programming"],
  prompt: "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word:\n1. Insert a character\n2. Delete a character\n3. Replace a character",
  constraints: ["0 <= word1.length, word2.length <= 500","word1 and word2 consist of lowercase English letters."],
  examples: [
  {
    "input": "word1 = \"horse\", word2 = \"ros\"",
    "output": "3",
    "explanation": "horse -> rorse (replace 'h' with 'r'), rorse -> rose (remove 'r'), rose -> ros (remove 'e')"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        dp = [[0] * (len(word2) + 1) for _ in range(len(word1) + 1)]\n        \n        for i in range(len(word1) + 1):\n            dp[i][len(word2)] = len(word1) - i\n        for j in range(len(word2) + 1):\n            dp[len(word1)][j] = len(word2) - j\n            \n        for i in range(len(word1) - 1, -1, -1):\n            for j in range(len(word2) - 1, -1, -1):\n                if word1[i] == word2[j]:\n                    dp[i][j] = dp[i + 1][j + 1]\n                else:\n                    dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1])\n                    \n        return dp[0][0]",
    "explanation": [
      "Create a 2D table where `dp[i][j]` is the edit distance between `word1[i:]` and `word2[j:]`.",
      "Base cases: converting empty strings required the full length of the other string in deletions/insertions.",
      "If characters match, no operation is needed. Otherwise, pick the minimum of Insert (`dp[i][j+1]`), Delete (`dp[i+1][j]`), or Replace (`dp[i+1][j+1]`).",
      "Bottom-up approach iteratively fills the table."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        int m = word1.length();\n        int n = word2.length();\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1));\n        \n        for (int i = 0; i <= m; i++) dp[i][0] = i;\n        for (int j = 0; j <= n; j++) dp[0][j] = j;\n        \n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (word1[i-1] == word2[j-1]) {\n                    dp[i][j] = dp[i-1][j-1];\n                } else {\n                    dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});\n                }\n            }\n        }\n        return dp[m][n];\n    }\n};",
    "explanation": [
      "Apply Levenshtein Distance algorithm using optimized DP tabulation.",
      "The state transition captures all possible edits at each index.",
      "Result at `dp[m][n]` represents the full transformation cost.",
      "Uses `std::min` with initializer list to concisely find the cheapest operation."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int minDistance(String word1, String word2) {\n        int m = word1.length(), n = word2.length();\n        int[][] dp = new int[m + 1][n + 1];\n        for (int i = 0; i <= m; i++) dp[i][0] = i;\n        for (int j = 0; j <= n; j++) dp[0][j] = j;\n        \n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {\n                    dp[i][j] = dp[i - 1][j - 1];\n                } else {\n                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));\n                }\n            }\n        }\n        return dp[m][n];\n    }\n}",
    "explanation": [
      "Building a result matrix where `dp[i][j]` maps the sub-problem of converting the first `i` characters of `word1` to the first `j` characters of `word2`.",
      "Diagonal movement represents matching or replacement; horizontal/vertical moves represent deletion/insertion.",
      "Linear O(M*N) logic efficiently handles string comparison logic.",
      "Handles corner cases where one or both strings are empty via initialization loops."
    ]
  }
],
  timeComplexity: "O(M * N)",
  spaceComplexity: "O(M * N)",
  edgeCases: ["Empty string","Identical strings"]
};
