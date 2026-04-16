import { Problem } from '../../../types/problem';

export const uniquePaths: Problem = {
  id: "unique-paths",
  title: "Unique Paths",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  tags: ["math","dynamic-programming","combinatorics"],
  prompt: "There is a robot on an `m x n` grid. The robot is initially located at the top-left corner (`grid[0][0]`). The robot tries to move to the bottom-right corner (`grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.\n\nGiven the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.",
  constraints: ["1 <= m, n <= 100"],
  examples: [
  {
    "input": "m = 3, n = 7",
    "output": "28"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        row = [1] * n\n        \n        for i in range(m - 1):\n            newRow = [1] * n\n            for j in range(n - 2, -1, -1):\n                newRow[j] = newRow[j + 1] + row[j]\n            row = newRow\n            \n        return row[0]",
    "explanation": [
      "Think of this as a grid where each cell's value is the sum of choices from the cell below and the cell to the right.",
      "Instead of a full 2D grid, we can just maintain the last calculated row to reduce space complexity.",
      "The base case is that all cells in the bottom row and rightmost column have only 1 unique path to the destination.",
      "Iteration calculates the inner cells bottom-up."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        vector<int> prevRow(n, 1);\n        for (int i = 1; i < m; i++) {\n            vector<int> currRow(n, 1);\n            for (int j = 1; j < n; j++) {\n                currRow[j] = currRow[j - 1] + prevRow[j];\n            }\n            prevRow = currRow;\n        }\n        return prevRow[n - 1];\n    }\n};",
    "explanation": [
      "Use 1D space optimization by storing only the previous calculated row.",
      "The value of `paths[i][j]` is always `paths[i-1][j] + paths[i][j-1]`.",
      "Standard O(M*N) path counting strategy using bottom-up tabulation.",
      "Initializing with 1 handles the border cases where there's only one movement option."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int uniquePaths(int m, int n) {\n        int[] dp = new int[n];\n        Arrays.fill(dp, 1);\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                dp[j] += dp[j - 1];\n            }\n        }\n        return dp[n - 1];\n    }\n}",
    "explanation": [
      "Efficient 1D array DP where the value at `dp[j]` is updated based on its previous value (representing the cell above) and `dp[j-1]` (representing the cell to the left).",
      "Outer loop processes rows, inner loop processes columns.",
      "Minimum memory allocation strategy for linear space complexity.",
      "Perfect for interviews requiring both correctness and optimization."
    ]
  }
],
  timeComplexity: "O(M * N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Grid with only one row/column"]
};
