import { Problem } from '../../../types/problem';

export const sudokuSolver: Problem = {
  id: "sudoku-solver",
  title: "Sudoku Solver",
  difficulty: "Hard",
  topic: "Recursion & Backtracking",
  tags: ["array","hash-table","backtracking","matrix"],
  prompt: "Write a program to solve a Sudoku puzzle by filling the empty cells.\n\nA sudoku solution must satisfy all of the following rules:\n1. Each of the digits `1-9` must occur exactly once in each row.\n2. Each of the digits `1-9` must occur exactly once in each column.\n3. Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-grids of the grid.\n\nThe character `'.'` indicates empty cells.",
  constraints: ["board.length == 9","board[i].length == 9","board[i][j] is a digit or '.'.","It is guaranteed that the input board has only one solution."],
  examples: [
  {
    "input": "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"], ...]",
    "output": "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"], ...]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def solveSudoku(self, board: List[List[str]]) -> None:\n        def solve():\n            for r in range(9):\n                for c in range(9):\n                    if board[r][c] == \".\":\n                        for char in \"123456789\":\n                            if self.is_valid(r, c, char, board):\n                                board[r][c] = char\n                                if solve():\n                                    return True\n                                board[r][c] = \".\"\n                        return False\n            return True\n            \n        solve()\n        \n    def is_valid(self, r, c, char, board):\n        for i in range(9):\n            if board[i][c] == char: return False\n            if board[r][i] == char: return False\n            if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == char: return False\n        return True",
    "explanation": [
      "Nested loop finds the next available empty cell (marked with '.').",
      "Try every character from '1' to '9' for that cell.",
      "The `is_valid` function checks row, column, and 3x3 block constraints simultaneously.",
      "If a placement is valid, recurse. If the complete puzzle is solved, propagate the return. Otherwise, reset the cell (backtrack) and try the next candidate."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    void solveSudoku(vector<vector<char>>& board) {\n        solve(board);\n    }\n    \nprivate:\n    bool solve(vector<vector<char>>& board) {\n        for (int i = 0; i < 9; i++) {\n            for (int j = 0; j < 9; j++) {\n                if (board[i][j] == '.') {\n                    for (char c = '1'; c <= '9'; c++) {\n                        if (isValid(board, i, j, c)) {\n                            board[i][j] = c;\n                            if (solve(board)) return true;\n                            board[i][j] = '.';\n                        }\n                    }\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n    \n    bool isValid(vector<vector<char>>& board, int row, int col, char c) {\n        for (int i = 0; i < 9; i++) {\n            if (board[i][col] == c) return false;\n            if (board[row][i] == c) return false;\n            if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;\n        }\n        return true;\n    }\n};",
    "explanation": [
      "Standard backtracking implementation for Sudoku solver.",
      "Explore every empty cell and attempt to place valid digits.",
      "Propagate the success status (`true`) upwards through recursion levels as soon as the puzzle is fully filled.",
      "The constraint validation function uses modulo and division arithmetic to efficiently check 3x3 sub-boxes."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public void solveSudoku(char[][] board) {\n        if(board == null || board.length == 0) return;\n        solve(board);\n    }\n\n    private boolean solve(char[][] board){\n        for(int i = 0; i < board.length; i++){\n            for(int j = 0; j < board[0].length; j++){\n                if(board[i][j] == '.'){\n                    for(char c = '1'; c <= '9'; c++){\n                        if(isValid(board, i, j, c)){\n                            board[i][j] = c;\n                            if(solve(board)) return true;\n                            else board[i][j] = '.';\n                        }\n                    }\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n\n    private boolean isValid(char[][] board, int row, int col, char c){\n        for(int i = 0; i < 9; i++) {\n            if(board[i][col] != '.' && board[i][col] == c) return false; //check row\n            if(board[row][i] != '.' && board[row][i] == c) return false; //check column\n            if(board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] != '.' && \n               board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false; //check 3*3 block\n        }\n        return true;\n    }\n}",
    "explanation": [
      "Use backtracking recursion to fill the board one empty cell at a time.",
      "For each empty cell, iterate through digits 1-9 and verify constraints across row, col, and sub-box.",
      "A valid placement leads to the next recursive depth; failure resets the board cell.",
      "The algorithm terminates successfully as soon as all 81 cells are filled without conflicts."
    ]
  }
],
  timeComplexity: "O(9^(N*N))",
  spaceComplexity: "O(N*N)",
  edgeCases: ["Partially filled boards"]
};
