import { Problem } from '../../../types/problem';

export const climbingStairs: Problem = {
  id: "climbing-stairs",
  title: "Climbing Stairs",
  difficulty: "Easy",
  topic: "Dynamic Programming",
  tags: ["math","dynamic-programming","memoization"],
  prompt: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
  constraints: ["1 <= n <= 45"],
  examples: [
  {
    "input": "n = 2",
    "output": "2",
    "explanation": "1. 1 step + 1 step, 2. 2 steps"
  },
  {
    "input": "n = 3",
    "output": "3",
    "explanation": "1. 1+1+1, 2. 1+2, 3. 2+1"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2:\n            return n\n        \n        one, two = 1, 2\n        for i in range(3, n + 1):\n            temp = one + two\n            one = two\n            two = temp\n            \n        return two",
    "explanation": [
      "Recognize that to reach step `n`, you must come from either step `n-1` (1 step) or `n-2` (2 steps).",
      "This is identical to the Fibonacci sequence formula: `f(n) = f(n-1) + f(n-2)`.",
      "Use a bottom-up iterative approach with two variables to optimize space from O(N) to O(1).",
      "Initialize `one=1` and `two=2` for base cases `n=1` and `n=2`."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int first = 1, second = 2;\n        for (int i = 3; i <= n; i++) {\n            int current = first + second;\n            first = second;\n            second = current;\n        }\n        return second;\n    }\n};",
    "explanation": [
      "The problem is a variation of Fibonacci sequence where each step depends on the previous two.",
      "Iterative solution avoids the overhead of recursion and exponential time complexity of brute force.",
      "Space complexity is O(1) as we only track the last two results.",
      "Total time is O(N) since we visit each step once in the loop."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int next = a + b;\n            a = b;\n            b = next;\n        }\n        return b;\n    }\n}",
    "explanation": [
      "This dynamic programming problem can be solved by storing the number of ways to reach each step.",
      "Since we only ever need the result of the previous two steps, we use two variables `a` and `b` to save space.",
      "The current result is always the sum of the two preceding results.",
      "Returning `b` after the loop gives the total ways to reach the `n`th step."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["n=1 basic case"]
};
