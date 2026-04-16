import { Problem } from '../../../types/problem';

export const rottingOranges: Problem = {
  id: "rotting-oranges",
  title: "Rotting Oranges",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["array","breadth-first-search","matrix"],
  prompt: "You are given an `m x n` grid where each cell can have one of three values:\n0 representing an empty cell,\n1 representing a fresh orange, or\n2 representing a rotten orange.\nEvery minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.\n\nReturn the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
  constraints: ["m == grid.length","n == grid[i].length","1 <= m, n <= 10","grid[i][j] is 0, 1, or 2."],
  examples: [
  {
    "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
    "output": "4"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def orangesRotting(self, grid: List[List[int]]) -> int:\n        q = collections.deque()\n        time, fresh = 0, 0\n        \n        ROWS, COLS = len(grid), len(grid[0])\n        for r in range(ROWS):\n            for c in range(COLS):\n                if grid[r][c] == 1:\n                    fresh += 1\n                if grid[r][c] == 2:\n                    q.append([r, c])\n                    \n        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]\n        while q and fresh > 0:\n            for i in range(len(q)):\n                r, c = q.popleft()\n                for dr, dc in directions:\n                    row, col = dr + r, dc + c\n                    if (row in range(ROWS) and col in range(COLS) and\n                        grid[row][col] == 1):\n                        grid[row][col] = 2\n                        q.append([row, col])\n                        fresh -= 1\n            time += 1\n            \n        return time if fresh == 0 else -1",
    "explanation": [
      "Use Multi-source BFS to simulate the spreading decay process.",
      "Initialize a queue with all starting rotten oranges and count all fresh ones.",
      "At each minute, process all oranges currently in the queue, infecting their fresh neighbors and adding them to the queue for the next minute.",
      "Return the elapsed time if all fresh oranges were infected, or -1 if some remained unreachable."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int orangesRotting(vector<vector<int>>& grid) {\n        int m = grid.size(), n = grid[0].size();\n        queue<pair<int, int>> q;\n        int fresh = 0;\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (grid[i][j] == 2) q.push({i, j});\n                else if (grid[i][j] == 1) fresh++;\n            }\n        }\n        \n        if (fresh == 0) return 0;\n        int minutes = -1;\n        vector<pair<int, int>> dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};\n        \n        while (!q.empty()) {\n            minutes++;\n            int size = q.size();\n            for (int i = 0; i < size; i++) {\n                auto [r, c] = q.front(); q.pop();\n                for (auto& d : dirs) {\n                    int nr = r + d.first, nc = c + d.second;\n                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {\n                        grid[nr][nc] = 2;\n                        q.push({nr, nc});\n                        fresh--;\n                    }\n                }\n            }\n        }\n        return fresh == 0 ? minutes : -1;\n    }\n};",
    "explanation": [
      "Implement multi-source Breadth-First Search to track simultaneous rot spreading.",
      "The queue ensures we process oranges level by level (minute by minute).",
      "Fresh oranges act as unreachable nodes until adjacent to a rotten source.",
      "If the queue empties but fresh count is still positive, it's impossible to rot everything."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int orangesRotting(int[][] grid) {\n        Queue<int[]> queue = new LinkedList<>();\n        int fresh = 0;\n        for (int i = 0; i < grid.length; i++) {\n            for (int j = 0; j < grid[0].length; j++) {\n                if (grid[i][j] == 2) queue.add(new int[]{i, j});\n                else if (grid[i][j] == 1) fresh++;\n            }\n        }\n        if (fresh == 0) return 0;\n        int count = 0;\n        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n        while (!queue.isEmpty()) {\n            int size = queue.size();\n            for (int i = 0; i < size; i++) {\n                int[] point = queue.poll();\n                for (int[] d : dirs) {\n                    int r = point[0] + d[0], c = point[1] + d[1];\n                    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != 1) continue;\n                    grid[r][c] = 2;\n                    queue.add(new int[]{r, c});\n                    fresh--;\n                }\n            }\n            if (!queue.isEmpty()) count++;\n        }\n        return fresh == 0 ? count : -1;\n    }\n}",
    "explanation": [
      "Model the infection as a level-order traversal problem in a graph.",
      "Each level represents one minute of time passing.",
      "BFS is used because it naturally explores neighbors in a 'wave' pattern, perfect for uniform distance spread.",
      "The fresh orange counter allows for a final validation of reachability."
    ]
  }
],
  timeComplexity: "O(M * N)",
  spaceComplexity: "O(M * N)",
  edgeCases: ["No fresh oranges","Island of fresh oranges"]
};
