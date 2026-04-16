import { Problem } from '../../../types/problem';

export const surroundedRegions: Problem = {
  id: "surrounded-regions",
  title: "Surrounded Regions",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["array","depth-first-search","breadth-first-search","union-find","matrix"],
  prompt: "Given an `m x n` matrix `board` containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.\n\nA region is captured by flipping all 'O's into 'X's in that surrounded region.",
  constraints: ["m == board.length","n == board[i].length","1 <= m, n <= 200","board[i][j] is 'X' or 'O'."],
  examples: [
  {
    "input": "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
    "output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def solve(self, board: List[List[str]]) -> None:\n        ROWS, COLS = len(board), len(board[0])\n        \n        def capture(r, c):\n            if (r < 0 or c < 0 or r == ROWS or c == COLS or\n                board[r][c] != \"O\"):\n                return\n            board[r][c] = \"T\"\n            capture(r + 1, c)\n            capture(r - 1, c)\n            capture(r, c + 1)\n            capture(r, c - 1)\n            \n        # 1. Capture unsurrounded regions (O -> T)\n        for r in range(ROWS):\n            for c in range(COLS):\n                if (board[r][c] == \"O\" and \n                    (r in [0, ROWS - 1] or c in [0, COLS - 1])):\n                    capture(r, c)\n                    \n        # 2. Capture surrounded regions (O -> X)\n        for r in range(ROWS):\n            for c in range(COLS):\n                if board[r][c] == \"O\":\n                    board[r][c] = \"X\"\n                    \n        # 3. Uncapture unsurrounded regions (T -> O)\n        for r in range(ROWS):\n            for c in range(COLS):\n                if board[r][c] == \"T\":\n                    board[r][c] = \"O\"",
    "explanation": [
      "The key observation is that an 'O' region is UNSURROUNDED if and only if at least one of its 'O's is on the border.",
      "Start DFS from every 'O' on the border to mark all connected 'O's as temporary ('T').",
      "After the edge cases are marked, all remaining 'O's in the board must be entirely surrounded by 'X's; flip them to 'X'.",
      "Finally, flip all 'T's back to 'O's."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    void solve(vector<vector<char>>& board) {\n        int m = board.size(), n = board[0].size();\n        for (int i = 0; i < m; i++) {\n            dfs(board, i, 0);\n            dfs(board, i, n - 1);\n        }\n        for (int j = 0; j < n; j++) {\n            dfs(board, 0, j);\n            dfs(board, m - 1, j);\n        }\n        \n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (board[i][j] == 'O') board[i][j] = 'X';\n                else if (board[i][j] == '#') board[i][j] = 'O';\n            }\n        }\n    }\n    \nprivate:\n    void dfs(vector<vector<char>>& b, int r, int c) {\n        if (r < 0 || r >= b.size() || c < 0 || c >= b[0].size() || b[r][c] != 'O') return;\n        b[r][c] = '#';\n        dfs(b, r + 1, c);\n        dfs(b, r - 1, c);\n        dfs(b, r, c + 1);\n        dfs(b, r, c - 1);\n    }\n};",
    "explanation": [
      "Isolate border 'O's and all their connected neighbors by temporarily renaming them to '#'.",
      "Any remaining 'O' in the board's interior is effectively surrounded and can be safely flipped to 'X'.",
      "The renamed '#' characters are then restored to their original 'O' state.",
      "Linear time complexity O(M*N) as each cell is processed the same number of times."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public void solve(char[][] board) {\n        int m = board.length, n = board[0].length;\n        for (int i = 0; i < m; i++) {\n            dfs(board, i, 0);\n            dfs(board, i, n - 1);\n        }\n        for (int j = 0; j < n; j++) {\n            dfs(board, 0, j);\n            dfs(board, m - 1, j);\n        }\n        \n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (board[i][j] == 'O') board[i][j] = 'X';\n                else if (board[i][j] == 'T') board[i][j] = 'O';\n            }\n        }\n    }\n\n    private void dfs(char[][] b, int i, int j) {\n        if (i < 0 || i >= b.length || j < 0 || j >= b[0].length || b[i][j] != 'O') return;\n        b[i][j] = 'T';\n        dfs(b, i + 1, j);\n        dfs(b, i - 1, j);\n        dfs(b, i, j + 1);\n        dfs(b, i, j - 1);\n    }\n}",
    "explanation": [
      "Utilize a three-step process: identify border-connected regions, flip surrounded regions, and cleanup markers.",
      "The 'T' marker distinguishes 'O's that should remain from those that should be captured.",
      "DFS ensures all connected 'unsurrounded' components are correctly identified and skipped from capturing.",
      "In-place modification minimizes additional space usage beyond the recursive stack."
    ]
  }
],
  timeComplexity: "O(M * N)",
  spaceComplexity: "O(M * N)",
  edgeCases: ["Board with no 'O's","Board with only 'O's"]
};
