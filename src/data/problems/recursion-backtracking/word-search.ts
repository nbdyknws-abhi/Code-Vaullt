import { Problem } from '../../../types/problem';

export const wordSearch: Problem = {
  id: "word-search",
  title: "Word Search",
  difficulty: "Medium",
  topic: "Recursion & Backtracking",
  tags: ["array","backtracking","matrix"],
  prompt: "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
  constraints: ["m == board.length","n = board[i].length","1 <= m, n <= 6","1 <= word.length <= 15","board and word consist of only lowercase and uppercase English letters."],
  examples: [
  {
    "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
    "output": "true"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        ROWS, COLS = len(board), len(board[0])\n        path = set()\n        \n        def dfs(r, c, i):\n            if i == len(word):\n                return True\n            if (r < 0 or c < 0 or\n                r >= ROWS or c >= COLS or\n                word[i] != board[r][c] or\n                (r, c) in path):\n                return False\n            \n            path.add((r, c))\n            res = (dfs(r + 1, c, i + 1) or\n                   dfs(r - 1, c, i + 1) or\n                   dfs(r, c + 1, i + 1) or\n                   dfs(r, c - 1, i + 1))\n            path.remove((r, c))\n            return res\n        \n        for r in range(ROWS):\n            for c in range(COLS):\n                if dfs(r, c, 0): return True\n        return False",
    "explanation": [
      "Perform a Depth First Search (DFS) starting from every cell in the board.",
      "The `dfs` function explores neighbors (up, down, left, right) to match the next character in the word.",
      "Use a set named `path` to track visited cells in the current recursive path and prevent reuse.",
      "Backtracking occurs by removing the cell from `path` after exploring all four directions."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        for (int i = 0; i < board.size(); i++) {\n            for (int j = 0; j < board[0].size(); j++) {\n                if (backtrack(board, word, i, j, 0)) return true;\n            }\n        }\n        return false;\n    }\n    \nprivate:\n    bool backtrack(vector<vector<char>>& board, string& word, int r, int c, int index) {\n        if (index == word.length()) return true;\n        if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size() || board[r][c] != word[index]) return false;\n        \n        char temp = board[r][c];\n        board[r][c] = '*'; // mark as visited\n        \n        bool found = backtrack(board, word, r + 1, c, index + 1) ||\n                     backtrack(board, word, r - 1, c, index + 1) ||\n                     backtrack(board, word, r, c + 1, index + 1) ||\n                     backtrack(board, word, r, c - 1, index + 1);\n        \n        board[r][c] = temp; // restore\n        return found;\n    }\n};",
    "explanation": [
      "Iterate through every cell on the grid to start the search.",
      "In-place marking (setting character to '*') is used to track visited cells without extra memory.",
      "Recursively explore all adjacent cells for the next character in the target string.",
      "Restore the cell's original character after the search branch completion for future attempts."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public boolean exist(char[][] board, String word) {\n        for (int i = 0; i < board.length; i++) {\n            for (int j = 0; j < board[0].length; j++) {\n                if (dfs(board, word, i, j, 0)) return true;\n            }\n        }\n        return false;\n    }\n\n    private boolean dfs(char[][] board, String word, int i, int j, int k) {\n        if (k == word.length()) return true;\n        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != word.charAt(k)) return false;\n        \n        char temp = board[i][j];\n        board[i][j] = ' ';\n        boolean res = dfs(board, word, i + 1, j, k + 1) ||\n                      dfs(board, word, i - 1, j, k + 1) ||\n                      dfs(board, word, i, j + 1, k + 1) ||\n                      dfs(board, word, i, j - 1, k + 1);\n        board[i][j] = temp;\n        return res;\n    }\n}",
    "explanation": [
      "Execute a grid-wide search using a helper DFS method.",
      "The base case is when the character index matches the word length, indicating success.",
      "Prevent using the same cell twice by temporarily replacing its content with an invalid character space.",
      "Revert the change (backtrack) immediately after the current character's recursive chain finishes."
    ]
  }
],
  timeComplexity: "O(N * M * 4^L) where L is word length",
  spaceComplexity: "O(L)",
  edgeCases: ["Word longer than total cells"]
};
