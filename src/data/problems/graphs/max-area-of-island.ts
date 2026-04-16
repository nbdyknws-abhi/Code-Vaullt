import { Problem } from '../../../types/problem';

export const maxAreaOfIsland: Problem = {
  id: "max-area-of-island",
  title: "Max Area of Island",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["array","depth-first-search","breadth-first-search","union-find","matrix"],
  prompt: "You are given an `m x n` binary matrix `grid`. An island is a group of '1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.\n\nThe area of an island is the number of cells with a value 1 in the island. Return the maximum area of an island in the grid. If there is no island, return 0.",
  constraints: ["m == grid.length","n == grid[i].length","1 <= m, n <= 50","grid[i][j] is '0' or '1'."],
  examples: [
  {
    "input": "grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],...]",
    "output": "6"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:\n        ROWS, COLS = len(grid), len(grid[0])\n        visit = set()\n        \n        def dfs(r, c):\n            if (r < 0 or r == ROWS or c < 0 or c == COLS or\n                grid[r][c] == 0 or (r, c) in visit):\n                return 0\n            visit.add((r, c))\n            return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)\n        \n        area = 0\n        for r in range(ROWS):\n            for c in range(COLS):\n                area = max(area, dfs(r, c))\n        return area",
    "explanation": [
      "Traverse every cell and start a DFS when an unvisited land cell is reached.",
      "The DFS returns the total count of cells connected for that specific island (area).",
      "Recursive accumulation: `1 + sum(dfs(neighbors))`.",
      "Update the global maximum area during the traversal."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int maxAreaOfIsland(vector<vector<int>>& grid) {\n        int m = grid.size(), n = grid[0].size();\n        int maxArea = 0;\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (grid[i][j] == 1) {\n                    maxArea = max(maxArea, getArea(grid, i, j));\n                }\n            }\n        }\n        return maxArea;\n    }\n    \nprivate:\n    int getArea(vector<vector<int>>& grid, int r, int c) {\n        if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] == 0) return 0;\n        grid[r][c] = 0; // mark as visited\n        return 1 + getArea(grid, r + 1, c) + getArea(grid, r - 1, c) + getArea(grid, r, c + 1) + getArea(grid, r, c - 1);\n    }\n};",
    "explanation": [
      "Apply flood fill logic starting at each '1' in the grid.",
      "Instead of an explicit visited set, modify the grid in-place by turning '1's into '0's.",
      "Accumulate size by summing the return values of four-way recursive calls.",
      "The O(M*N) complexity ensures we visit each cell exactly twice: once for the scan and once for the DFS sink."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int maxAreaOfIsland(int[][] grid) {\n        int max = 0;\n        for (int i = 0; i < grid.length; i++) {\n            for (int j = 0; j < grid[0].length; j++) {\n                if (grid[i][j] == 1) {\n                    max = Math.max(max, dfs(grid, i, j));\n                }\n            }\n        }\n        return max;\n    }\n\n    private int dfs(int[][] grid, int i, int j) {\n        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == 0) return 0;\n        grid[i][j] = 0;\n        return 1 + dfs(grid, i + 1, j) + dfs(grid, i - 1, j) + dfs(grid, i, j + 1) + dfs(grid, i, j - 1);\n    }\n}",
    "explanation": [
      "Count island components by recursively sinking them after counting each cell.",
      "The base cases handle board boundaries and water/visited cells.",
      "Using a simple DFS maximizes the area discovery for every isolated component.",
      "O(MN) complexity makes it highly efficient for grid sizes within constraints."
    ]
  }
],
  timeComplexity: "O(M * N)",
  spaceComplexity: "O(M * N)",
  edgeCases: ["No islands","Single large island"]
};
