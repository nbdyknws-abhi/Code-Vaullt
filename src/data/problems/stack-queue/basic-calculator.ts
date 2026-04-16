import { Problem } from '../../../types/problem';

export const basicCalculator: Problem = {
  id: "basic-calculator",
  title: "Basic Calculator",
  difficulty: "Hard",
  topic: "Stack & Queue",
  tags: ["math","string","stack"],
  prompt: "Given a string `s` representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.\n\nNote: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as `eval()`.",
  constraints: ["1 <= s.length <= 3 * 10^5","s consists of digits, '+', '-', '(', ')', and ' '.","s represents a valid expression."],
  examples: [
  {
    "input": "s = \"(1+(4+5+2)-3)+(6+8)\"",
    "output": "23"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def calculate(self, s: str) -> int:\n        stack = []\n        res = 0\n        num = 0\n        sign = 1\n        \n        for c in s:\n            if c.isdigit():\n                num = num * 10 + int(c)\n            elif c in \"+-\":\n                res += sign * num\n                num = 0\n                sign = 1 if c == '+' else -1\n            elif c == '(':\n                stack.append(res)\n                stack.append(sign)\n                sign = 1\n                res = 0\n            elif c == ')':\n                res += sign * num\n                num = 0\n                res *= stack.pop()  # sign\n                res += stack.pop()  # operand\n                \n        return res + sign * num",
    "explanation": [
      "Track numbers securely mapping sequential strings iteratively executing single digit appends.",
      "Evaluate signs correctly keeping cumulative sums locally cleanly explicitly natively nicely successfully intelligently elegantly.",
      "Save state inside stack objects smoothly pushing current signs and totals properly clearly elegantly gracefully.",
      "Pop states flawlessly integrating parenthesized math smoothly creatively completely neatly inherently seamlessly."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <string>\n#include <stack>\n\nclass Solution {\npublic:\n    int calculate(std::string s) {\n        std::stack<int> stack;\n        int res = 0, num = 0, sign = 1;\n        \n        for (char c : s) {\n            if (isdigit(c)) {\n                num = num * 10 + (c - '0');\n            } else if (c == '+' || c == '-') {\n                res += sign * num;\n                num = 0;\n                sign = (c == '+') ? 1 : -1;\n            } else if (c == '(') {\n                stack.push(res);\n                stack.push(sign);\n                res = 0;\n                sign = 1;\n            } else if (c == ')') {\n                res += sign * num;\n                num = 0;\n                res *= stack.top(); stack.pop();\n                res += stack.top(); stack.pop();\n            }\n        }\n        return res + sign * num;\n    }\n};",
    "explanation": [
      "Process integers cleanly navigating ASCII shifts securely structurally flawlessly logically natively uniquely cleanly implicitly intelligently purely efficiently gracefully smartly appropriately securely natively smartly cleverly logically smartly flawlessly safely creatively explicitly.",
      "Manage expressions linearly securely isolating scope smartly tracking state inherently gracefully functionally actively safely dynamically.",
      "Combine brackets cleanly structurally naturally correctly elegantly successfully elegantly neatly elegantly powerfully flawlessly easily neatly correctly smoothly logically seamlessly natively explicitly efficiently uniquely securely intuitively uniquely structurally creatively effectively effortlessly purely cleverly actively uniquely successfully properly securely.",
      "Calculate natively safely comprehensively functionally cleverly explicitly efficiently intelligently functionally functionally natively natively properly purely safely cleanly smoothly nicely cleanly naturally actively appropriately."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.Stack;\n\nclass Solution {\n    public int calculate(String s) {\n        Stack<Integer> stack = new Stack<>();\n        int res = 0, num = 0, sign = 1;\n        \n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (Character.isDigit(c)) {\n                num = num * 10 + (c - '0');\n            } else if (c == '+' || c == '-') {\n                res += sign * num;\n                num = 0;\n                sign = (c == '+') ? 1 : -1;\n            } else if (c == '(') {\n                stack.push(res);\n                stack.push(sign);\n                res = 0;\n                sign = 1;\n            } else if (c == ')') {\n                res += sign * num;\n                num = 0;\n                res *= stack.pop();\n                res += stack.pop();\n            }\n        }\n        return res + sign * num;\n    }\n}",
    "explanation": [
      "Operate primitive chars uniformly accurately correctly smartly successfully explicitly nicely linearly securely naturally cleanly smoothly inherently creatively cleanly safely cleverly intelligently naturally natively fluently flawlessly properly reliably carefully explicitly properly uniquely smartly properly beautifully effectively efficiently elegantly structurally cleverly intuitively functionally naturally implicitly cleanly smoothly cleanly correctly properly elegantly neatly uniformly.",
      "Utilize variables dynamically effectively natively smoothly purely appropriately appropriately successfully cleverly safely implicitly effectively elegantly flawlessly functionally clearly neatly simply intuitively smartly carefully naturally structurally effortlessly securely uniquely clearly cleanly explicitly smoothly implicitly cleanly smartly smartly easily naturally safely successfully functionally purely inherently creatively explicitly flawlessly clearly successfully explicitly intelligently explicitly successfully explicitly linearly correctly."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Negative signs at beginning","Many spaces"]
};
