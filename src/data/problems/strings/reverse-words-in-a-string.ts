import { Problem } from '../../../types/problem';

export const reverseWordsInAString: Problem = {
  id: "reverse-words-in-a-string",
  title: "Reverse Words in a String",
  difficulty: "Medium",
  topic: "Strings",
  tags: ["string","two-pointers"],
  prompt: "Given an input string `s`, reverse the order of the words.",
  constraints: ["1 <= s.length <= 10^4","s contains English letters (upper-case and lower-case), digits, and spaces ' '."],
  examples: [
  {
    "input": "s = \"the sky is blue\"",
    "output": "\"blue is sky the\""
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def reverseWords(s):\n    return \" \".join(s.split()[::-1])",
    "explanation": [
      "Python's split() without arguments automatically handles arbitrary amounts of whitespace, trimming both ends and ignoring multiple spaces.",
      "Reverse the resulting list natively utilizing slicing parameters [::-1].",
      "Rejoin the components mapping strict ' ' individual spaces natively."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <string>\n#include <algorithm>\n\nclass Solution {\npublic:\n    std::string reverseWords(std::string s) {\n        std::string result;\n        int i = 0;\n        int n = s.length();\n        \n        while (i < n) {\n            while (i < n && s[i] == ' ') i++;\n            if (i >= n) break;\n            int j = i + 1;\n            while (j < n && s[j] != ' ') j++;\n            std::string sub = s.substr(i, j - i);\n            if (result.length() == 0) result = sub;\n            else result = sub + \" \" + result;\n            i = j + 1;\n        }\n        \n        return result;\n    }\n};",
    "explanation": [
      "Extract entire words utilizing separate pointer structures bypassing external libraries.",
      "Construct sequence backwards dynamically compiling strings continuously applying prefixes exclusively.",
      "Automatically handles whitespace filtering effectively via sequential loops advancing independent counter iterators."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public String reverseWords(String s) {\n        String[] words = s.trim().split(\"\\\\s+\");\n        StringBuilder sb = new StringBuilder();\n        for (int i = words.length - 1; i >= 0; i--) {\n            sb.append(words[i]);\n            if (i > 0) {\n                sb.append(\" \");\n            }\n        }\n        return sb.toString();\n    }\n}",
    "explanation": [
      "Implement strict edge trimming discarding leading or trailing boundaries sequentially.",
      "Utilize standardized Regex splitting applying strictly to contiguous whitespace blocks mapping strings to arrays explicitly.",
      "Reverse loop arrays concatenating structures leveraging StringBuilder optimization logic securely."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Multiple spaces","Trailing/leading spaces"]
};
