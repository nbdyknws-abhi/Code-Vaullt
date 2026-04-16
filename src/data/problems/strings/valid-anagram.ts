import { Problem } from '../../../types/problem';

export const validAnagram: Problem = {
  id: "valid-anagram",
  title: "Valid Anagram",
  difficulty: "Easy",
  topic: "Strings",
  tags: ["hash-table","string","sorting"],
  prompt: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
  constraints: ["1 <= s.length, t.length <= 5 * 10^4","s and t consist of lowercase English letters."],
  examples: [
  {
    "input": "s = \"anagram\", t = \"nagaram\"",
    "output": "true"
  },
  {
    "input": "s = \"rat\", t = \"car\"",
    "output": "false"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def isAnagram(s, t):\n    if len(s) != len(t):\n        return False\n        \n    counts = [0] * 26\n    for i in range(len(s)):\n        counts[ord(s[i]) - ord('a')] += 1\n        counts[ord(t[i]) - ord('a')] -= 1\n        \n    for count in counts:\n        if count != 0:\n            return False\n            \n    return True",
    "explanation": [
      "First check if the lengths are different; if so, they can't be anagrams.",
      "Use a fixed-size array of 26 integers to represent character frequencies.",
      "Increment the count for characters in s and decrement for characters in t.",
      "If all counts return back to 0, it's an anagram."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <string>\n#include <vector>\n\nclass Solution {\npublic:\n    bool isAnagram(std::string s, std::string t) {\n        if (s.length() != t.length()) return false;\n        \n        std::vector<int> counts(26, 0);\n        for (int i = 0; i < s.length(); i++) {\n            counts[s[i] - 'a']++;\n            counts[t[i] - 'a']--;\n        }\n        \n        for (int count : counts) {\n            if (count != 0) return false;\n        }\n        return true;\n    }\n};",
    "explanation": [
      "Reject strings of unequal lengths instantly.",
      "Create a frequency table corresponding to array positions 0-25 for standard alphabet.",
      "Iterate uniformly mapping the offset from 'a'. String s adds mapping, String t decreases mapping.",
      "Linear check across all 26 elements verifying zeroes."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        \n        int[] counts = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            counts[s.charAt(i) - 'a']++;\n            counts[t.charAt(i) - 'a']--;\n        }\n        \n        for (int count : counts) {\n            if (count != 0) return false;\n        }\n        return true;\n    }\n}",
    "explanation": [
      "Evaluate lengths.",
      "Initialize an integer array size 26 reflecting ASCII table constraints.",
      "Loop simultaneously across parallel strings pulling character integers.",
      "Scan array sequentially."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Different lengths","Empty strings"]
};
