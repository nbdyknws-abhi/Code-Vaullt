import { Problem } from '../../../types/problem';

export const nQueens: Problem = {
  id: "n-queens",
  title: "N-Queens",
  difficulty: "Hard",
  topic: "Recursion & Backtracking",
  tags: ["array","backtracking"],
  prompt: "The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.\n\nGiven an integer `n`, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' indicate a queen and an empty space, respectively.",
  constraints: ["1 <= n <= 9"],
  examples: [
  {
    "input": "n = 4",
    "output": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def solveNQueens(self, n: int) -> List[List[str]]:\n        col = set()\n        posDiag = set() # (r + c)\n        negDiag = set() # (r - c)\n        \n        res = []\n        board = [[\".\"] * n for _ in range(n)]\n        \n        def backtrack(r):\n            if r == n:\n                copy = [\"\".join(row) for row in board]\n                res.append(copy)\n                return\n            \n            for c in range(n):\n                if c in col or (r + c) in posDiag or (r - c) in negDiag:\n                    continue\n                \n                col.add(c)\n                posDiag.add(r + c)\n                negDiag.add(r - c)\n                board[r][c] = \"Q\"\n                \n                backtrack(r + 1)\n                \n                col.remove(c)\n                posDiag.remove(r + c)\n                negDiag.remove(r - c)\n                board[r][c] = \".\"\n                \n        backtrack(0)\n        return res",
    "explanation": [
      "Use three sets to keep track of columns, positive diagonals, and negative diagonals currently occupied by queens.",
      "Positive diagonals share the same `r + c` sum; negative diagonals share the same `r - c` difference.",
      "The backtracking function progresses row by row.",
      "If a position `(r, c)` is safe, place a queen, update sets, and recurse. Then remove the queen (backtrack) to search other columns."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        vector<vector<string>> res;\n        vector<string> board(n, string(n, '.'));\n        vector<bool> cols(n, false), d1(2 * n, false), d2(2 * n, false);\n        backtrack(res, board, cols, d1, d2, 0, n);\n        return res;\n    }\n    \nprivate:\n    void backtrack(vector<vector<string>>& res, vector<string>& board, vector<bool>& cols, vector<bool>& d1, vector<bool>& d2, int row, int n) {\n        if (row == n) {\n            res.push_back(board);\n            return;\n        }\n        for (int col = 0; col < n; col++) {\n            if (cols[col] || d1[row + col] || d2[row - col + n]) continue;\n            \n            board[row][col] = 'Q';\n            cols[col] = d1[row + col] = d2[row - col + n] = true;\n            backtrack(res, board, cols, d1, d2, row + 1, n);\n            board[row][col] = '.';\n            cols[col] = d1[row + col] = d2[row - col + n] = false;\n        }\n    }\n};",
    "explanation": [
      "Use boolean vectors to efficiently track column and diagonal conflicts.",
      "Diagonal 1 index is `row + col`. Diagonal 2 index is `row - col + n` to ensure positive indices.",
      "Iterate through columns of the current row to find a valid placement.",
      "The recursive call advances to the next row, and backtracking restores conflict markers for alternative path exploration."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        List<List<String>> res = new ArrayList<>();\n        char[][] board = new char[n][n];\n        for(int i = 0; i < n; i++) Arrays.fill(board[i], '.');\n        backtrack(board, 0, res);\n        return res;\n    }\n\n    private void backtrack(char[][] board, int row, List<List<String>> res) {\n        if(row == board.length) {\n            res.add(construct(board));\n            return;\n        }\n        for(int col = 0; col < board.length; col++) {\n            if(validate(board, row, col)) {\n                board[row][col] = 'Q';\n                backtrack(board, row + 1, res);\n                board[row][col] = '.';\n            }\n        }\n    }\n\n    private boolean validate(char[][] board, int row, int col) {\n        for(int i = 0; i < row; i++) {\n            for(int j = 0; j < board.length; j++) {\n                if(board[i][j] == 'Q' && (j == col || Math.abs(row - i) == Math.abs(col - j))) return false;\n            }\n        }\n        return true;\n    }\n\n    private List<String> construct(char[][] board) {\n        List<String> res = new LinkedList<>();\n        for(int i = 0; i < board.length; i++) res.add(new String(board[i]));\n        return res;\n    }\n}",
    "explanation": [
      "Represent the chessboard as a 2D character array.",
      "The `validate` function checks if a queen at `(row, col)` conflicts with any queens in previous rows.",
      "Conflict check involves comparing column indices and the absolute difference of row/column positions (diagonals).",
      "Successfully placing `n` queens leads to board conversion into a list of strings for final output."
    ]
  }
],
  timeComplexity: "O(N!)",
  spaceComplexity: "O(N^2)",
  edgeCases: ["n=1 board"]
};
