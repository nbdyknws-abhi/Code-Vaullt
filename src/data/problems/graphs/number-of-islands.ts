import { Problem } from '../../../types/problem';

export const numberOfIslands: Problem = {
  id: "number-of-islands",
  title: "Number of Islands",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["array","depth-first-search","breadth-first-search","union-find","matrix"],
  prompt: "Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
  constraints: ["m == grid.length","n == grid[i].length","1 <= m, n <= 300","grid[i][j] is '0' or '1'."],
  examples: [
  {
    "input": "grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]",
    "output": "1"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        if not grid:\n            return 0\n            \n        rows, cols = len(grid), len(grid[0])\n        visit = set()\n        islands = 0\n        \n        def bfs(r, c):\n            q = collections.deque()\n            visit.add((r, c))\n            q.append((r, c))\n            \n            while q:\n                row, col = q.popleft()\n                directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]\n                \n                for dr, dc in directions:\n                    nr, nc = row + dr, col + dc\n                    if (nr in range(rows) and \n                        nc in range(cols) and \n                        grid[nr][nc] == \"1\" and \n                        (nr, nc) not in visit):\n                        q.append((nr, nc))\n                        visit.add((nr, nc))\n                        \n        for r in range(rows):\n            for c in range(cols):\n                if grid[r][c] == \"1\" and (r, c) not in visit:\n                    bfs(r, c)\n                    islands += 1\n        return islands",
    "explanation": [
      "Traverse every cell in the grid.",
      "If a land cell ('1') is found and it hasn't been visited, it marks the start of a new island.",
      "Use BFS (or DFS) to visit all connected land cells of that island and mark them as visited.",
      "The number of times BFS is triggered equals the number of islands."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        int m = grid.size(), n = grid[0].size();\n        int res = 0;\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (grid[i][j] == '1') {\n                    res++;\n                    dfs(grid, i, j);\n                }\n            }\n        }\n        return res;\n    }\n    \nprivate:\n    void dfs(vector<vector<char>>& grid, int r, int c) {\n        if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] == '0') return;\n        grid[r][c] = '0'; // mark as visited in-place\n        dfs(grid, r + 1, c);\n        dfs(grid, r - 1, c);\n        dfs(grid, r, c + 1);\n        dfs(grid, r, c - 1);\n    }\n};",
    "explanation": [
      "Scanning the grid linearly, initiate a DFS whenever '1' is encountered.",
      "The DFS sinks the entire island by changing '1's to '0's (in-place marking to save memory).",
      "This prevents the same island from being counted twice.",
      "Standard graph traversal algorithm with linear time complexity relative to the number of cells."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int numIslands(char[][] grid) {\n        int count = 0;\n        for (int i = 0; i < grid.length; i++) {\n            for (int j = 0; j < grid[0].length; j++) {\n                if (grid[i][j] == '1') {\n                    dfs(grid, i, j);\n                    count++;\n                }\n            }\n        }\n        return count;\n    }\n\n    private void dfs(char[][] grid, int i, int j) {\n        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == '0') return;\n        grid[i][j] = '0';\n        dfs(grid, i + 1, j);\n        dfs(grid, i - 1, j);\n        dfs(grid, i, j + 1);\n        dfs(grid, i, j - 1);\n    }\n}",
    "explanation": [
      "Execute a grid-wide scan for land cells.",
      "Once detected, use recursion to perform a flood fill, identifying all adjacent land components.",
      "The visited state is tracked by overwriting land cells with water cells.",
      "Each flood fill completion increment the total island tally."
    ]
  }
],
  timeComplexity: "O(M * N)",
  spaceComplexity: "O(M * N)",
  edgeCases: ["No islands","Grid full of islands"]
};
