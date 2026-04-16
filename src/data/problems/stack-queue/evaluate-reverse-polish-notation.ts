import { Problem } from '../../../types/problem';

export const evaluateReversePolishNotation: Problem = {
  id: "evaluate-reverse-polish-notation",
  title: "Evaluate Reverse Polish Notation",
  difficulty: "Medium",
  topic: "Stack & Queue",
  tags: ["array","math","stack"],
  prompt: "You are given an array of strings `tokens` that represents an arithmetic expression in a Reverse Polish Notation.\n\nEvaluate the expression. Return an integer that represents the value of the expression.",
  constraints: ["1 <= tokens.length <= 10^4","tokens[i] is either an operator: \"+\", \"-\", \"*\", or \"/\", or an integer in the range [-200, 200]."],
  examples: [
  {
    "input": "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]",
    "output": "9",
    "explanation": "((2 + 1) * 3) = 9"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def evalRPN(self, tokens: List[str]) -> int:\n        stack = []\n        for c in tokens:\n            if c == \"+\":\n                stack.append(stack.pop() + stack.pop())\n            elif c == \"-\":\n                a, b = stack.pop(), stack.pop()\n                stack.append(b - a)\n            elif c == \"*\":\n                stack.append(stack.pop() * stack.pop())\n            elif c == \"/\":\n                a, b = stack.pop(), stack.pop()\n                stack.append(int(b / a))\n            else:\n                stack.append(int(c))\n        return stack[0]",
    "explanation": [
      "Use a stack to keep track of numbers.",
      "When encountering an operator, pop the top two numbers, apply the operator, and push the result back.",
      "Be careful with division in Python (`int(b / a)`) to truncate towards zero as required by the problem.",
      "If it's a number, push it onto the stack."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <string>\n#include <stack>\n\nclass Solution {\npublic:\n    int evalRPN(std::vector<std::string>& tokens) {\n        std::stack<int> s;\n        for (std::string& t : tokens) {\n            if (t == \"+\" || t == \"-\" || t == \"*\" || t == \"/\") {\n                int op2 = s.top(); s.pop();\n                int op1 = s.top(); s.pop();\n                if (t == \"+\") s.push(op1 + op2);\n                else if (t == \"-\") s.push(op1 - op2);\n                else if (t == \"*\") s.push(op1 * op2);\n                else if (t == \"/\") s.push(op1 / op2);\n            } else {\n                s.push(std::stoi(t));\n            }\n        }\n        return s.top();\n    }\n};",
    "explanation": [
      "Use a stack of integers.",
      "Iterate through tokens. If the token is an operator, pop two operands (note: the first popped is the right operand).",
      "Perform integer arithmetic (C++ division truncates towards zero by default).",
      "Push the result back onto the stack; otherwise, parse the string to an integer and push it."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.Stack;\n\nclass Solution {\n    public int evalRPN(String[] tokens) {\n        Stack<Integer> stack = new Stack<>();\n        for (String t : tokens) {\n            if (\"+-*/\".contains(t)) {\n                int b = stack.pop();\n                int a = stack.pop();\n                if (t.equals(\"+\")) stack.push(a + b);\n                else if (t.equals(\"-\")) stack.push(a - b);\n                else if (t.equals(\"*\")) stack.push(a * b);\n                else if (t.equals(\"/\")) stack.push(a / b);\n            } else {\n                stack.push(Integer.parseInt(t));\n            }\n        }\n        return stack.pop();\n    }\n}",
    "explanation": [
      "Initialize a Stack of Integers.",
      "Iterate over the token array. Check if the token is one of the four operators.",
      "Pop two elements (right and left operands), compute the result, and push it.",
      "Convert numeric strings to integers and push them onto the stack."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Single token","Division truncating towards zero"]
};
