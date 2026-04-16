import { Problem } from '../../../types/problem';

export const letterCombinationsOfAPhoneNumber: Problem = {
  id: "letter-combinations-of-a-phone-number",
  title: "Letter Combinations of a Phone Number",
  difficulty: "Medium",
  topic: "Recursion & Backtracking",
  tags: ["hash-table","string","backtracking"],
  prompt: "Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nA mapping of digits to letters (just like on the telephone buttons) is provided below. Note that 1 does not map to any letters.",
  constraints: ["0 <= digits.length <= 4","digits[i] is a digit in the range ['2', '9']."],
  examples: [
  {
    "input": "digits = \"23\"",
    "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def letterCombinations(self, digits: str) -> List[str]:\n        if not digits:\n            return []\n            \n        digit_to_char = {\n            \"2\": \"abc\", \"3\": \"def\", \"4\": \"ghi\", \"5\": \"jkl\",\n            \"6\": \"mno\", \"7\": \"pqrs\", \"8\": \"tuv\", \"9\": \"wxyz\"\n        }\n        res = []\n        \n        def backtrack(i, cur_str):\n            if len(cur_str) == len(digits):\n                res.append(cur_str)\n                return\n            \n            for c in digit_to_char[digits[i]]:\n                backtrack(i + 1, cur_str + c)\n                \n        backtrack(0, \"\")\n        return res",
    "explanation": [
      "Map each digit to its corresponding characters as a hash table.",
      "Use recursion to build the string one character at a time.",
      "For each character matching the current digit, recurse into the next digit index.",
      "Base case occurs when the length of the built string matches the length of the input digits string."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        if (digits.empty()) return {};\n        \n        vector<string> res;\n        string current = \"\";\n        vector<string> mapping = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n        backtrack(digits, 0, current, mapping, res);\n        return res;\n    }\n    \nprivate:\n    void backtrack(string& digits, int index, string& current, vector<string>& mapping, vector<string>& res) {\n        if (index == digits.length()) {\n            res.push_back(current);\n            return;\n        }\n        string letters = mapping[digits[index] - '0'];\n        for (char c : letters) {\n            current.push_back(c);\n            backtrack(digits, index + 1, current, mapping, res);\n            current.pop_back();\n        }\n    }\n};",
    "explanation": [
      "Use an array to map integer digits to their letter strings.",
      "Implement a recursive DFS (backtracking) approach.",
      "Iterate through each letter mapped to the current digit, append it to the partial answer, and recurse.",
      "Backtrack by popping the last character before moving to the next candidate letter."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    private static final String[] KEYS = { \"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\" };\n\n    public List<String> letterCombinations(String digits) {\n        List<String> res = new ArrayList<>();\n        if (digits == null || digits.isEmpty()) return res;\n        backtrack(res, new StringBuilder(), digits, 0);\n        return res;\n    }\n\n    private void backtrack(List<String> res, StringBuilder sb, String digits, int index) {\n        if (index == digits.length()) {\n            res.add(sb.toString());\n            return;\n        }\n        String letters = KEYS[digits.charAt(index) - '0'];\n        for (char c : letters.toCharArray()) {\n            sb.append(c);\n            backtrack(res, sb, digits, index + 1);\n            sb.deleteCharAt(sb.length() - 1);\n        }\n    }\n}",
    "explanation": [
      "Store keyboard mapping in a static constant array.",
      "Use a `StringBuilder` to efficiently build and manipulate the combination string during recursion.",
      "The recursive function takes the current digit index and proceeds until the target length is met.",
      "String building is optimized by appending and deleting at the tail in O(1)."
    ]
  }
],
  timeComplexity: "O(4^N * N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Empty string input"]
};
