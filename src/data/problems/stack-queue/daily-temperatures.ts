import { Problem } from '../../../types/problem';

export const dailyTemperatures: Problem = {
  id: "daily-temperatures",
  title: "Daily Temperatures",
  difficulty: "Medium",
  topic: "Stack & Queue",
  tags: ["array","stack","monotonic-stack"],
  prompt: "Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.",
  constraints: ["1 <= temperatures.length <= 10^5","30 <= temperatures[i] <= 100"],
  examples: [
  {
    "input": "temperatures = [73,74,75,71,69,72,76,73]",
    "output": "[1,1,4,2,1,1,0,0]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:\n        res = [0] * len(temperatures)\n        stack = []  # pair: [temp, index]\n        \n        for i, t in enumerate(temperatures):\n            while stack and t > stack[-1][0]:\n                stackT, stackInd = stack.pop()\n                res[stackInd] = i - stackInd\n            stack.append([t, i])\n            \n        return res",
    "explanation": [
      "Use a monotonic decreasing stack to store temperatures and their indices.",
      "Iterate through the array. If the current temperature is greater than the temperature at the top of the stack, we found a warmer day.",
      "Pop from the stack and calculate the difference in indices.",
      "Store the difference in the result array."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <stack>\n\nclass Solution {\npublic:\n    std::vector<int> dailyTemperatures(std::vector<int>& temperatures) {\n        int n = temperatures.size();\n        std::vector<int> res(n, 0);\n        std::stack<int> s; // stores indices\n        \n        for (int i = 0; i < n; i++) {\n            while (!s.empty() && temperatures[i] > temperatures[s.top()]) {\n                res[s.top()] = i - s.top();\n                s.pop();\n            }\n            s.push(i);\n        }\n        \n        return res;\n    }\n};",
    "explanation": [
      "Initialize a result vector with zeros and a stack to store indices.",
      "Iterate through the temperatures. While the stack is not empty and the current temperature is strictly greater than the temperature at the index stored at the top of the stack.",
      "Update the result array at the popped index with the difference `i - popped_index`.",
      "Push the current index onto the stack."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.Stack;\n\nclass Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        int n = temperatures.length;\n        int[] res = new int[n];\n        Stack<Integer> stack = new Stack<>();\n        \n        for (int i = 0; i < n; i++) {\n            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n                int idx = stack.pop();\n                res[idx] = i - idx;\n            }\n            stack.push(i);\n        }\n        \n        return res;\n    }\n}",
    "explanation": [
      "Create a result array and a stack to store indices.",
      "Loop through the temperatures array.",
      "If the current temperature is higher than the temperature at the index on top of the stack, pop the stack and calculate the day difference.",
      "Push the current index to the stack to be resolved later."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Constantly decreasing temperatures","All same temperatures"]
};
