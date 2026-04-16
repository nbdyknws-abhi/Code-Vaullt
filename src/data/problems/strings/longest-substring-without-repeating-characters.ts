import { Problem } from '../../../types/problem';

export const longestSubstringWithoutRepeatingCharacters: Problem = {
  id: "longest-substring-without-repeating-characters",
  title: "Longest Substring Without Repeating Characters",
  difficulty: "Medium",
  topic: "Strings",
  tags: ["hash-table","string","sliding-window"],
  prompt: "Given a string `s`, find the length of the longest substring without repeating characters.",
  constraints: ["0 <= s.length <= 5 * 10^4","s consists of English letters, digits, symbols and spaces."],
  examples: [
  {
    "input": "s = \"abcabcbb\"",
    "output": "3",
    "explanation": "The answer is \"abc\", with the length of 3."
  },
  {
    "input": "s = \"pwwkew\"",
    "output": "3",
    "explanation": "The answer is \"wke\", with the length of 3."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def lengthOfLongestSubstring(s):\n    char_map = {}\n    max_len = 0\n    left = 0\n    \n    for right in range(len(s)):\n        if s[right] in char_map and char_map[s[right]] >= left:\n            left = char_map[s[right]] + 1\n        \n        char_map[s[right]] = right\n        max_len = max(max_len, right - left + 1)\n        \n    return max_len",
    "explanation": [
      "Use a sliding window approach with two pointers (left and right).",
      "Maintain a hash map to store the last seen index of each character.",
      "If a character is already in the map and its index is within the current window, move the left pointer past its last occurrence.",
      "Update the maximum length found so far."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <string>\n#include <unordered_map>\n#include <algorithm>\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(std::string s) {\n        std::unordered_map<char, int> charMap;\n        int maxLen = 0;\n        int left = 0;\n        \n        for (int right = 0; right < s.length(); ++right) {\n            if (charMap.find(s[right]) != charMap.end() && charMap[s[right]] >= left) {\n                left = charMap[s[right]] + 1;\n            }\n            charMap[s[right]] = right;\n            maxLen = std::max(maxLen, right - left + 1);\n        }\n        \n        return maxLen;\n    }\n};",
    "explanation": [
      "Use an unordered_map to track character indices.",
      "Expand the window by moving the right pointer.",
      "If a duplicate character is found inside the current window window, shrink the window by moving left past the duplicate's index.",
      "Compute maximum substring length during each step."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Map<Character, Integer> map = new HashMap<>();\n        int maxLen = 0;\n        int left = 0;\n        \n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            if (map.containsKey(c) && map.get(c) >= left) {\n                left = map.get(c) + 1;\n            }\n            map.put(c, right);\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        \n        return maxLen;\n    }\n}",
    "explanation": [
      "Define a HashMap mapping Characters to Integers.",
      "Maintain absolute boundaries via right and left variables.",
      "Extract character. If the character's last position is at or ahead of 'left', bump 'left' to avoid repeating.",
      "Replace/Insert the character's newest index."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(min(M, N))",
  edgeCases: ["Empty string","String with all same characters"]
};
