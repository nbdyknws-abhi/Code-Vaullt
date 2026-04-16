import { Problem } from '../../../types/problem';

export const palindromePartitioning: Problem = {
  id: "palindrome-partitioning",
  title: "Palindrome Partitioning",
  difficulty: "Medium",
  topic: "Recursion & Backtracking",
  tags: ["string","backtracking","dynamic-programming"],
  prompt: "Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of `s`.",
  constraints: ["1 <= s.length <= 16","s contains only lowercase English letters."],
  examples: [
  {
    "input": "s = \"aab\"",
    "output": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def partition(self, s: str) -> List[List[str]]:\n        res = []\n        part = []\n        \n        def dfs(i):\n            if i >= len(s):\n                res.append(part.copy())\n                return\n            for j in range(i, len(s)):\n                if self.isPalindrome(s, i, j):\n                    part.append(s[i:j+1])\n                    dfs(j + 1)\n                    part.pop()\n                    \n        dfs(0)\n        return res\n    \n    def isPalindrome(self, s, l, r):\n        while l < r:\n            if s[l] != s[r]:\n                return False\n            l, r = l + 1, r - 1\n        return True",
    "explanation": [
      "Use backtracking to try all possible substring splits.",
      "A split is valid if the resulting substring is a palindrome.",
      "On finding a valid palindrome, include it in the current path and recurse starting from the next character.",
      "Backtrack by removing the substring and trying a longer split at the current position."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<vector<string>> partition(string s) {\n        vector<vector<string>> res;\n        vector<string> path;\n        backtrack(s, 0, path, res);\n        return res;\n    }\n\nprivate:\n    void backtrack(string& s, int start, vector<string>& path, vector<vector<string>>& res) {\n        if (start == s.length()) {\n            res.push_back(path);\n            return;\n        }\n        for (int i = start; i < s.length(); i++) {\n            if (isPalindrome(s, start, i)) {\n                path.push_back(s.substr(start, i - start + 1));\n                backtrack(s, i + 1, path, res);\n                path.pop_back();\n            }\n        }\n    }\n    \n    bool isPalindrome(string& s, int l, int r) {\n        while (l < r) {\n            if (s[l++] != s[r--]) return false;\n        }\n        return true;\n    }\n};",
    "explanation": [
      "A recursive DFS explores different indices to partition the string.",
      "A separate helper function checks if the current slice `s[start...i]` is a palindrome.",
      "If valid, add the slice to the current decomposition and branch into the remaining string.",
      "Pop the last part to try different partition boundaries in the loop."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public List<List<String>> partition(String s) {\n        List<List<String>> list = new ArrayList<>();\n        backtrack(list, new ArrayList<>(), s, 0);\n        return list;\n    }\n\n    private void backtrack(List<List<String>> list, List<String> tempList, String s, int start) {\n        if(start == s.length()) {\n            list.add(new ArrayList<>(tempList));\n        } else {\n            for(int i = start; i < s.length(); i++) {\n                if(isPalindrome(s, start, i)) {\n                    tempList.add(s.substring(start, i + 1));\n                    backtrack(list, tempList, s, i + 1);\n                    tempList.remove(tempList.size() - 1);\n                }\n            }\n        }\n    }\n\n    private boolean isPalindrome(String s, int low, int high) {\n        while(low < high) if(s.charAt(low++) != s.charAt(high--)) return false;\n        return true;\n    }\n}",
    "explanation": [
      "Utilize recursion with a start index tracking progress through the string.",
      "Only recurse if the candidate substring starting from `start` is palindromic.",
      "Store partitions in a temporary list, taking a deep constant-time copy when a full partitioning is achieved.",
      "The iterative loop inside recursion ensures all possible split points are considered."
    ]
  }
],
  timeComplexity: "O(2^N * N)",
  spaceComplexity: "O(N)",
  edgeCases: ["String is already a palindrome"]
};
