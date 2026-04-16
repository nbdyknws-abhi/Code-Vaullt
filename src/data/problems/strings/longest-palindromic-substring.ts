import { Problem } from '../../../types/problem';

export const longestPalindromicSubstring: Problem = {
  id: "longest-palindromic-substring",
  title: "Longest Palindromic Substring",
  difficulty: "Medium",
  topic: "Strings",
  tags: ["string","dynamic-programming"],
  prompt: "Given a string `s`, return the longest palindromic substring in `s`.",
  constraints: ["1 <= s.length <= 1000","s consist of only digits and English letters."],
  examples: [
  {
    "input": "s = \"babad\"",
    "output": "\"bab\"",
    "explanation": "\"aba\" is also a valid answer."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def longestPalindrome(s):\n    res = \"\"\n    resLen = 0\n    \n    for i in range(len(s)):\n        # odd length\n        l, r = i, i\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            if (r - l + 1) > resLen:\n                res = s[l:r+1]\n                resLen = r - l + 1\n            l -= 1\n            r += 1\n            \n        # even length\n        l, r = i, i + 1\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            if (r - l + 1) > resLen:\n                res = s[l:r+1]\n                resLen = r - l + 1\n            l -= 1\n            r += 1\n            \n    return res",
    "explanation": [
      "Iterate through every character in the string, treating it as the center of a potential palindrome.",
      "Expand outwards checking for odd length palindromes (center is a single char).",
      "Expand outwards checking for even length palindromes (center is between two chars).",
      "Update the longest tracked string whenever a longer palindrome bounds is mapped."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <string>\n\nclass Solution {\npublic:\n    std::string longestPalindrome(std::string s) {\n        if (s.empty()) return \"\";\n        int start = 0, maxLen = 0;\n        \n        for (int i = 0; i < s.length(); ++i) {\n            int len1 = expandAroundCenter(s, i, i);\n            int len2 = expandAroundCenter(s, i, i + 1);\n            int len = std::max(len1, len2);\n            \n            if (len > maxLen) {\n                start = i - (len - 1) / 2;\n                maxLen = len;\n            }\n        }\n        \n        return s.substr(start, maxLen);\n    }\n    \nprivate:\n    int expandAroundCenter(std::string s, int left, int right) {\n        while (left >= 0 && right < s.length() && s[left] == s[right]) {\n            left--;\n            right++;\n        }\n        return right - left - 1;\n    }\n};",
    "explanation": [
      "Use a helper function to determine the length of a palindrome extending outward from a specific center sequence.",
      "Account for explicit edge scenarios parsing both singleton odd origins and duplicate even neighbor sequences natively.",
      "Execute length calculation comparing max known configuration length to dynamically generated width."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public String longestPalindrome(String s) {\n        if (s == null || s.length() < 1) return \"\";\n        int start = 0, end = 0;\n        for (int i = 0; i < s.length(); i++) {\n            int len1 = expandAroundCenter(s, i, i);\n            int len2 = expandAroundCenter(s, i, i + 1);\n            int len = Math.max(len1, len2);\n            if (len > end - start) {\n                start = i - (len - 1) / 2;\n                end = i + len / 2;\n            }\n        }\n        return s.substring(start, end + 1);\n    }\n\n    private int expandAroundCenter(String s, int left, int right) {\n        int L = left, R = right;\n        while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) {\n            L--;\n            R++;\n        }\n        return R - L - 1;\n    }\n}",
    "explanation": [
      "Establish constraints filtering out null lengths.",
      "Leverage identical logic from C++ executing bidirectional outward crawl validation algorithms utilizing specific character-pointer boundaries.",
      "Translate relative bounding sizes back to absolute index references configuring string substring allocations."
    ]
  }
],
  timeComplexity: "O(N^2)",
  spaceComplexity: "O(1)",
  edgeCases: ["Single character","Entire string is a palindrome"]
};
