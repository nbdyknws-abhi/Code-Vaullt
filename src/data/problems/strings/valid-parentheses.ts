import { Problem } from '../../../types/problem';

export const validParentheses: Problem = {
  id: "valid-parentheses",
  title: "Valid Parentheses",
  difficulty: "Easy",
  topic: "Strings",
  tags: ["string","stack"],
  prompt: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if: Open brackets must be closed by the same type of brackets, Open brackets must be closed in the correct order, and Every close bracket has a corresponding open bracket of the same type.",
  constraints: ["1 <= s.length <= 10^4","s consists of parentheses only '()[]{}'."],
  examples: [
  {
    "input": "s = \"()\"",
    "output": "true"
  },
  {
    "input": "s = \"()[]{}\"",
    "output": "true"
  },
  {
    "input": "s = \"(]\"",
    "output": "false"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def isValid(s):\n    stack = []\n    mapping = {\")\": \"(\", \"}\": \"{\", \"]\": \"[\"}\n    \n    for char in s:\n        if char in mapping:\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element:\n                return False\n        else:\n            stack.append(char)\n            \n    return not stack",
    "explanation": [
      "Use a stack to keep track of opening brackets.",
      "Use a dictionary (hash map) for constant-time lookups mapping closing brackets to their opening pairs.",
      "For each character, if it's an opening bracket, push it onto the stack.",
      "If it's a closing bracket, pop from the stack (or use dummy string if empty) and verify it matches the mapped opening pair.",
      "At the end, return true only if the stack is completely empty."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <string>\n#include <stack>\n\nclass Solution {\npublic:\n    bool isValid(std::string s) {\n        std::stack<char> stack;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') {\n                stack.push(c);\n            } else {\n                if (stack.empty()) return false;\n                if (c == ')' && stack.top() != '(') return false;\n                if (c == '}' && stack.top() != '{') return false;\n                if (c == ']' && stack.top() != '[') return false;\n                stack.pop();\n            }\n        }\n        return stack.empty();\n    }\n};",
    "explanation": [
      "Initialize a C++ character stack.",
      "Loop through string characters pushing opening variants '(' '{' '[' natively.",
      "When encountering a closing variant, fail immediately if stack is currently missing elements.",
      "Compare top of stack explicitly against bracket types. If mismatch, fail immediately.",
      "Return boolean mapping to standard empty verification."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.Stack;\n\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(')\n                stack.push(')');\n            else if (c == '{')\n                stack.push('}');\n            else if (c == '[')\n                stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c)\n                return false;\n        }\n        return stack.isEmpty();\n    }\n}",
    "explanation": [
      "Optimize by pushing the EXPECTED closing character into the stack instead of the opened character.",
      "Loop through the native character array.",
      "When evaluating a closing character, pop and directly compare to the loop character.",
      "Stack should be utterly empty upon completion representing complete pairs."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Odd length string","Only closing brackets","Only opening brackets"]
};
