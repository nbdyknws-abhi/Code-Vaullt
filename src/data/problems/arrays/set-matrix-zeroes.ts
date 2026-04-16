import { Problem } from '../../../types/problem';

export const setMatrixZeroes: Problem = {
  id: "set-matrix-zeroes",
  title: "Set Matrix Zeroes",
  difficulty: "Medium",
  topic: "Arrays",
  tags: ["array","hash-table","matrix"],
  prompt: "Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s.\n\nYou must do it in place.",
  constraints: ["m == matrix.length","n == matrix[0].length","1 <= m, n <= 200","-2^31 <= matrix[i][j] <= 2^31 - 1"],
  examples: [
  {
    "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
    "output": "[[1,0,1],[0,0,0],[1,0,1]]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def setZeroes(matrix):\n    ROWS, COLS = len(matrix), len(matrix[0])\n    rowZero = False\n\n    for r in range(ROWS):\n        for c in range(COLS):\n            if matrix[r][c] == 0:\n                matrix[0][c] = 0\n                if r > 0:\n                    matrix[r][0] = 0\n                else:\n                    rowZero = True\n\n    for r in range(1, ROWS):\n        for c in range(1, COLS):\n            if matrix[0][c] == 0 or matrix[r][0] == 0:\n                matrix[r][c] = 0\n\n    if matrix[0][0] == 0:\n        for r in range(ROWS):\n            matrix[r][0] = 0\n\n    if rowZero:\n        for c in range(COLS):\n            matrix[0][c] = 0",
    "explanation": [
      "Use the first row and column as flags to track zero status.",
      "Need a separate variable (rowZero) to flag the top row specifically because matrix[0][0] overlaps.",
      "Pass 1: Flag edges.",
      "Pass 2: Update inner matrix.",
      "Pass 3: Update first row/col based on flags."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n\nclass Solution {\npublic:\n    void setZeroes(std::vector<std::vector<int>>& matrix) {\n        bool firstRowZero = false;\n        int m = matrix.size(), n = matrix[0].size();\n        \n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (matrix[i][j] == 0) {\n                    matrix[0][j] = 0;\n                    if (i > 0) matrix[i][0] = 0;\n                    else firstRowZero = true;\n                }\n            }\n        }\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                if (matrix[0][j] == 0 || matrix[i][0] == 0) {\n                    matrix[i][j] = 0;\n                }\n            }\n        }\n        if (matrix[0][0] == 0) {\n            for (int i = 0; i < m; i++) matrix[i][0] = 0;\n        }\n        if (firstRowZero) {\n            for (int j = 0; j < n; j++) matrix[0][j] = 0;\n        }\n    }\n};",
    "explanation": [
      "Flag 0s in the first row/col.",
      "Use firstRowZero bool because matrix[0][0] handles both.",
      "Nullify inner matrix using flags.",
      "Finally fix the first row and col boundaries."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public void setZeroes(int[][] matrix) {\n        boolean firstCol = false;\n        int R = matrix.length;\n        int C = matrix[0].length;\n\n        for (int i = 0; i < R; i++) {\n            if (matrix[i][0] == 0) {\n                firstCol = true;\n            }\n            for (int j = 1; j < C; j++) {\n                if (matrix[i][j] == 0) {\n                    matrix[0][j] = 0;\n                    matrix[i][0] = 0;\n                }\n            }\n        }\n\n        for (int i = 1; i < R; i++) {\n            for (int j = 1; j < C; j++) {\n                if (matrix[i][0] == 0 || matrix[0][j] == 0) {\n                    matrix[i][j] = 0;\n                }\n            }\n        }\n\n        if (matrix[0][0] == 0) {\n            for (int j = 0; j < C; j++) {\n                matrix[0][j] = 0;\n            }\n        }\n\n        if (firstCol) {\n            for (int i = 0; i < R; i++) {\n                matrix[i][0] = 0;\n            }\n        }\n    }\n}",
    "explanation": [
      "O(1) space optimization by utilizing 0th row and column markers.",
      "Variable firstCol handles truthy state of leftmost vertical boundary.",
      "Iterate twice: record triggers, execute zeroes.",
      "Finish processing edge cells depending on boolean triggers."
    ]
  }
],
  timeComplexity: "O(M * N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Zero at [0][0]"]
};
