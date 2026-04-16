import { Problem } from '../../../types/problem';

export const pacificAtlanticWaterFlow: Problem = {
  id: "pacific-atlantic-water-flow",
  title: "Pacific Atlantic Water Flow",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["array","depth-first-search","breadth-first-search","matrix"],
  prompt: "There is an `m x n` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.\n\nThe island is partitioned into a grid of square cells. You are given an `m x n` integer matrix `heights` where `heights[r][c]` represents the height above sea level of the cell at coordinate `(r, c)`.\n\nRain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.\n\nReturn a 2D list of grid coordinates `result` where `result[i] = [ri, ci]` denotes that rain water can flow from cell `(ri, ci)` to both the Pacific and Atlantic oceans.",
  constraints: ["m == heights.length","n == heights[r].length","1 <= m, n <= 200","0 <= heights[r][c] <= 10^5"],
  examples: [
  {
    "input": "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
    "output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:\n        ROWS, COLS = len(heights), len(heights[0])\n        pac, atl = set(), set()\n        \n        def dfs(r, c, visit, prevHeight):\n            if ((r, c) in visit or\n                r < 0 or c < 0 or r == ROWS or c == COLS or\n                heights[r][c] < prevHeight):\n                return\n            visit.add((r, c))\n            dfs(r + 1, c, visit, heights[r][c])\n            dfs(r - 1, c, visit, heights[r][c])\n            dfs(r, c + 1, visit, heights[r][c])\n            dfs(r, c - 1, visit, heights[r][c])\n            \n        for c in range(COLS):\n            dfs(0, c, pac, heights[0][c])\n            dfs(ROWS - 1, c, atl, heights[ROWS - 1][c])\n            \n        for r in range(ROWS):\n            dfs(r, 0, pac, heights[r][0])\n            dfs(r, COLS - 1, atl, heights[r][COLS - 1])\n            \n        res = []\n        for r in range(ROWS):\n            for c in range(COLS):\n                if (r, c) in pac and (r, c) in atl:\n                    res.append([r, c])\n        return res",
    "explanation": [
      "Reverse the problem: find all cells from which water can flow 'up' to the oceans.",
      "Perform DFS starting from all edge cells (top/left for Pacific, bottom/right for Atlantic).",
      "Maintain two sets, `pac` and `atl`, to store coordinates reachable from each ocean.",
      "The intersection of the two sets contains the cells that can flow to both oceans."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n        int m = heights.size(), n = heights[0].size();\n        vector<vector<bool>> pac(m, vector<bool>(n, false));\n        vector<vector<bool>> atl(m, vector<bool>(n, false));\n        \n        for (int i = 0; i < m; i++) {\n            dfs(heights, pac, i, 0, heights[i][0]);\n            dfs(heights, atl, i, n - 1, heights[i][n - 1]);\n        }\n        for (int j = 0; j < n; j++) {\n            dfs(heights, pac, 0, j, heights[0][j]);\n            dfs(heights, atl, m - 1, j, heights[m - 1][j]);\n        }\n        \n        vector<vector<int>> res;\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (pac[i][j] && atl[i][j]) res.push_back({i, j});\n            }\n        }\n        return res;\n    }\n    \nprivate:\n    void dfs(vector<vector<int>>& h, vector<vector<bool>>& ocean, int r, int c, int prev) {\n        if (r < 0 || r >= h.size() || c < 0 || c >= h[0].size() || ocean[r][c] || h[r][c] < prev) return;\n        ocean[r][c] = true;\n        dfs(h, ocean, r + 1, c, h[r][c]);\n        dfs(h, ocean, r - 1, c, h[r][c]);\n        dfs(h, ocean, r, c + 1, h[r][c]);\n        dfs(h, ocean, r, c - 1, h[r][c]);\n    }\n};",
    "explanation": [
      "Initialize two boolean matrices to track reachability from Pacific and Atlantic oceans.",
      "Start DFS from all cells adjacent to either ocean, moving 'uphill' to reachable cells.",
      "A valid flow path exists if a cell is marked true in both matrices.",
      "Standard O(M*N) path discovery using recursion."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n        int rows = heights.length, cols = heights[0].length;\n        boolean[][] pac = new boolean[rows][cols];\n        boolean[][] atl = new boolean[rows][cols];\n        \n        for (int i = 0; i < rows; i++) {\n            dfs(heights, pac, i, 0);\n            dfs(heights, atl, i, cols - 1);\n        }\n        for (int j = 0; j < cols; j++) {\n            dfs(heights, pac, 0, j);\n            dfs(heights, atl, rows - 1, j);\n        }\n        \n        List<List<Integer>> res = new ArrayList<>();\n        for (int i = 0; i < rows; i++) {\n            for (int j = 0; j < cols; j++) {\n                if (pac[i][j] && atl[i][j]) {\n                    res.add(Arrays.asList(i, j));\n                }\n            }\n        }\n        return res;\n    }\n\n    private void dfs(int[][] h, boolean[][] ocean, int r, int c) {\n        ocean[r][c] = true;\n        int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};\n        for (int[] d : dirs) {\n            int nr = r + d[0], nc = c + d[1];\n            if (nr >= 0 && nr < h.length && nc >= 0 && nc < h[0].length && \n                !ocean[nr][nc] && h[nr][nc] >= h[r][c]) {\n                dfs(h, ocean, nr, nc);\n            }\n        }\n    }\n}",
    "explanation": [
      "Compute oceanic reachability using a 'reverse flood fill' uphill from the coasts.",
      "Two separate boolean arrays capture cells that can connect to the Pacific and Atlantic respectively.",
      "Final list is constructed by finding all shared reachable cells.",
      "The uphill flow condition `h[nr][nc] >= h[r][c]` is equivalent to downhill flow in the problem description."
    ]
  }
],
  timeComplexity: "O(M * N)",
  spaceComplexity: "O(M * N)",
  edgeCases: ["Single cell grid","Grid with all same heights"]
};
