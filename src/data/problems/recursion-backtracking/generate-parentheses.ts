import { Problem } from '../../../types/problem';

export const generateParentheses: Problem = {
  id: "generate-parentheses",
  title: "Generate Parentheses",
  difficulty: "Medium",
  topic: "Recursion & Backtracking",
  tags: ["string","backtracking","dynamic-programming"],
  prompt: "Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
  constraints: ["1 <= n <= 8"],
  examples: [
  {
    "input": "n = 3",
    "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        stack = []\n        res = []\n        \n        def backtrack(openN, closedN):\n            if openN == closedN == n:\n                res.append(\"\".join(stack))\n                return\n            \n            if openN < n:\n                stack.append(\"(\")\n                backtrack(openN + 1, closedN)\n                stack.pop()\n            \n            if closedN < openN:\n                stack.append(\")\")\n                backtrack(openN, closedN + 1)\n                stack.pop()\n                \n        backtrack(0, 0)\n        return res",
    "explanation": [
      "Keep track of the counts of open and closed parentheses used.",
      "Only add an open parenthesis if the count is less than `n`.",
      "Only add a closed parenthesis if its count is less than the count of open parentheses (to maintain 'well-formed' status).",
      "Backtrack by popping the last character added to the current candidate string."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        vector<string> res;\n        backtrack(res, \"\", 0, 0, n);\n        return res;\n    }\n    \nprivate:\n    void backtrack(vector<string>& res, string s, int open, int close, int n) {\n        if (s.length() == n * 2) {\n            res.push_back(s);\n            return;\n        }\n        if (open < n) backtrack(res, s + \"(\", open + 1, close, n);\n        if (close < open) backtrack(res, s + \")\", open, close + 1, n);\n    }\n};",
    "explanation": [
      "Directly build strings by passing them by value (which implicitly backtracks in recursive calls).",
      "Parameter `open` tracks opening brackets used, `close` tracks closing brackets.",
      "A well-formed string must never have more closing brackets than opening brackets at any prefix.",
      "Success condition is reached when string length equals `2 * n`."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public List<String> generateParenthesis(int n) {\n        List<String> list = new ArrayList<String>();\n        backtrack(list, \"\", 0, 0, n);\n        return list;\n    }\n\n    private void backtrack(List<String> list, String str, int open, int close, int max){\n        if(str.length() == max * 2){\n            list.add(str);\n            return;\n        }\n        if(open < max)\n            backtrack(list, str + \"(\", open + 1, close, max);\n        if(close < open)\n            backtrack(list, str + \")\", open, close + 1, max);\n    }\n}",
    "explanation": [
      "The logic centers on two rules for maintaining well-formedness: 1) Total open count <= n, 2) Closed count < current open count.",
      "Recursive branches explore adding '(' and ')' independently based on these rules.",
      "String immutable properties in Java allow passing partial results through recursion without explicit removal.",
      "List appends the completed valid strings when the correct length is reached."
    ]
  }
],
  timeComplexity: "O(4^N / sqrt(N))",
  spaceComplexity: "O(N)",
  edgeCases: ["n=1 basic pair"]
};
