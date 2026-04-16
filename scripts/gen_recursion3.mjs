import fs from 'fs';
import path from 'path';

const recursionData = {
  "word-search": {
    title: "Word Search", difficulty: "Medium", topic: "Recursion & Backtracking", tags: ["array", "backtracking", "matrix"],
    prompt: "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
    constraints: ["m == board.length", "n = board[i].length", "1 <= m, n <= 6", "1 <= word.length <= 15", "board and word consist of only lowercase and uppercase English letters."],
    examples: [{input: "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"", output: "true"}],
    timeComplexity: "O(N * M * 4^L) where L is word length", spaceComplexity: "O(L)", edgeCases: ["Word longer than total cells"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        ROWS, COLS = len(board), len(board[0])
        path = set()
        
        def dfs(r, c, i):
            if i == len(word):
                return True
            if (r < 0 or c < 0 or
                r >= ROWS or c >= COLS or
                word[i] != board[r][c] or
                (r, c) in path):
                return False
            
            path.add((r, c))
            res = (dfs(r + 1, c, i + 1) or
                   dfs(r - 1, c, i + 1) or
                   dfs(r, c + 1, i + 1) or
                   dfs(r, c - 1, i + 1))
            path.remove((r, c))
            return res
        
        for r in range(ROWS):
            for c in range(COLS):
                if dfs(r, c, 0): return True
        return False`,
        explanation: ["Perform a Depth First Search (DFS) starting from every cell in the board.", "The `dfs` function explores neighbors (up, down, left, right) to match the next character in the word.", "Use a set named `path` to track visited cells in the current recursive path and prevent reuse.", "Backtracking occurs by removing the cell from `path` after exploring all four directions."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        for (int i = 0; i < board.size(); i++) {
            for (int j = 0; j < board[0].size(); j++) {
                if (backtrack(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }
    
private:
    bool backtrack(vector<vector<char>>& board, string& word, int r, int c, int index) {
        if (index == word.length()) return true;
        if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size() || board[r][c] != word[index]) return false;
        
        char temp = board[r][c];
        board[r][c] = '*'; // mark as visited
        
        bool found = backtrack(board, word, r + 1, c, index + 1) ||
                     backtrack(board, word, r - 1, c, index + 1) ||
                     backtrack(board, word, r, c + 1, index + 1) ||
                     backtrack(board, word, r, c - 1, index + 1);
        
        board[r][c] = temp; // restore
        return found;
    }
};`,
        explanation: ["Iterate through every cell on the grid to start the search.", "In-place marking (setting character to '*') is used to track visited cells without extra memory.", "Recursively explore all adjacent cells for the next character in the target string.", "Restore the cell's original character after the search branch completion for future attempts."]
      },
      {
        language: "java",
        code: `class Solution {
    public boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                if (dfs(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }

    private boolean dfs(char[][] board, String word, int i, int j, int k) {
        if (k == word.length()) return true;
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != word.charAt(k)) return false;
        
        char temp = board[i][j];
        board[i][j] = ' ';
        boolean res = dfs(board, word, i + 1, j, k + 1) ||
                      dfs(board, word, i - 1, j, k + 1) ||
                      dfs(board, word, i, j + 1, k + 1) ||
                      dfs(board, word, i, j - 1, k + 1);
        board[i][j] = temp;
        return res;
    }
}`,
        explanation: ["Execute a grid-wide search using a helper DFS method.", "The base case is when the character index matches the word length, indicating success.", "Prevent using the same cell twice by temporarily replacing its content with an invalid character space.", "Revert the change (backtrack) immediately after the current character's recursive chain finishes."]
      }
    ]
  },
  "palindrome-partitioning": {
    title: "Palindrome Partitioning", difficulty: "Medium", topic: "Recursion & Backtracking", tags: ["string", "backtracking", "dynamic-programming"],
    prompt: "Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of `s`.",
    constraints: ["1 <= s.length <= 16", "s contains only lowercase English letters."],
    examples: [{input: "s = \"aab\"", output: "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]"}],
    timeComplexity: "O(2^N * N)", spaceComplexity: "O(N)", edgeCases: ["String is already a palindrome"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def partition(self, s: str) -> List[List[str]]:
        res = []
        part = []
        
        def dfs(i):
            if i >= len(s):
                res.append(part.copy())
                return
            for j in range(i, len(s)):
                if self.isPalindrome(s, i, j):
                    part.append(s[i:j+1])
                    dfs(j + 1)
                    part.pop()
                    
        dfs(0)
        return res
    
    def isPalindrome(self, s, l, r):
        while l < r:
            if s[l] != s[r]:
                return False
            l, r = l + 1, r - 1
        return True`,
        explanation: ["Use backtracking to try all possible substring splits.", "A split is valid if the resulting substring is a palindrome.", "On finding a valid palindrome, include it in the current path and recurse starting from the next character.", "Backtrack by removing the substring and trying a longer split at the current position."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res;
        vector<string> path;
        backtrack(s, 0, path, res);
        return res;
    }

private:
    void backtrack(string& s, int start, vector<string>& path, vector<vector<string>>& res) {
        if (start == s.length()) {
            res.push_back(path);
            return;
        }
        for (int i = start; i < s.length(); i++) {
            if (isPalindrome(s, start, i)) {
                path.push_back(s.substr(start, i - start + 1));
                backtrack(s, i + 1, path, res);
                path.pop_back();
            }
        }
    }
    
    bool isPalindrome(string& s, int l, int r) {
        while (l < r) {
            if (s[l++] != s[r--]) return false;
        }
        return true;
    }
};`,
        explanation: ["A recursive DFS explores different indices to partition the string.", "A separate helper function checks if the current slice `s[start...i]` is a palindrome.", "If valid, add the slice to the current decomposition and branch into the remaining string.", "Pop the last part to try different partition boundaries in the loop."]
      },
      {
        language: "java",
        code: `class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> list = new ArrayList<>();
        backtrack(list, new ArrayList<>(), s, 0);
        return list;
    }

    private void backtrack(List<List<String>> list, List<String> tempList, String s, int start) {
        if(start == s.length()) {
            list.add(new ArrayList<>(tempList));
        } else {
            for(int i = start; i < s.length(); i++) {
                if(isPalindrome(s, start, i)) {
                    tempList.add(s.substring(start, i + 1));
                    backtrack(list, tempList, s, i + 1);
                    tempList.remove(tempList.size() - 1);
                }
            }
        }
    }

    private boolean isPalindrome(String s, int low, int high) {
        while(low < high) if(s.charAt(low++) != s.charAt(high--)) return false;
        return true;
    }
}`,
        explanation: ["Utilize recursion with a start index tracking progress through the string.", "Only recurse if the candidate substring starting from `start` is palindromic.", "Store partitions in a temporary list, taking a deep constant-time copy when a full partitioning is achieved.", "The iterative loop inside recursion ensures all possible split points are considered."]
      }
    ]
  },
  "generate-parentheses": {
    title: "Generate Parentheses", difficulty: "Medium", topic: "Recursion & Backtracking", tags: ["string", "backtracking", "dynamic-programming"],
    prompt: "Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    constraints: ["1 <= n <= 8"],
    examples: [{input: "n = 3", output: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"}],
    timeComplexity: "O(4^N / sqrt(N))", spaceComplexity: "O(N)", edgeCases: ["n=1 basic pair"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        stack = []
        res = []
        
        def backtrack(openN, closedN):
            if openN == closedN == n:
                res.append("".join(stack))
                return
            
            if openN < n:
                stack.append("(")
                backtrack(openN + 1, closedN)
                stack.pop()
            
            if closedN < openN:
                stack.append(")")
                backtrack(openN, closedN + 1)
                stack.pop()
                
        backtrack(0, 0)
        return res`,
        explanation: ["Keep track of the counts of open and closed parentheses used.", "Only add an open parenthesis if the count is less than `n`.", "Only add a closed parenthesis if its count is less than the count of open parentheses (to maintain 'well-formed' status).", "Backtrack by popping the last character added to the current candidate string."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        backtrack(res, "", 0, 0, n);
        return res;
    }
    
private:
    void backtrack(vector<string>& res, string s, int open, int close, int n) {
        if (s.length() == n * 2) {
            res.push_back(s);
            return;
        }
        if (open < n) backtrack(res, s + "(", open + 1, close, n);
        if (close < open) backtrack(res, s + ")", open, close + 1, n);
    }
};`,
        explanation: ["Directly build strings by passing them by value (which implicitly backtracks in recursive calls).", "Parameter `open` tracks opening brackets used, `close` tracks closing brackets.", "A well-formed string must never have more closing brackets than opening brackets at any prefix.", "Success condition is reached when string length equals `2 * n`."]
      },
      {
        language: "java",
        code: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> list = new ArrayList<String>();
        backtrack(list, "", 0, 0, n);
        return list;
    }

    private void backtrack(List<String> list, String str, int open, int close, int max){
        if(str.length() == max * 2){
            list.add(str);
            return;
        }
        if(open < max)
            backtrack(list, str + "(", open + 1, close, max);
        if(close < open)
            backtrack(list, str + ")", open, close + 1, max);
    }
}`,
        explanation: ["The logic centers on two rules for maintaining well-formedness: 1) Total open count <= n, 2) Closed count < current open count.", "Recursive branches explore adding '(' and ')' independently based on these rules.", "String immutable properties in Java allow passing partial results through recursion without explicit removal.", "List appends the completed valid strings when the correct length is reached."]
      }
    ]
  },
  "sudoku-solver": {
    title: "Sudoku Solver", difficulty: "Hard", topic: "Recursion & Backtracking", tags: ["array", "hash-table", "backtracking", "matrix"],
    prompt: "Write a program to solve a Sudoku puzzle by filling the empty cells.\n\nA sudoku solution must satisfy all of the following rules:\n1. Each of the digits `1-9` must occur exactly once in each row.\n2. Each of the digits `1-9` must occur exactly once in each column.\n3. Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-grids of the grid.\n\nThe character `'.'` indicates empty cells.",
    constraints: ["board.length == 9", "board[i].length == 9", "board[i][j] is a digit or '.'.", "It is guaranteed that the input board has only one solution."],
    examples: [{input: "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"], ...]", output: "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"], ...]"}],
    timeComplexity: "O(9^(N*N))", spaceComplexity: "O(N*N)", edgeCases: ["Partially filled boards"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        def solve():
            for r in range(9):
                for c in range(9):
                    if board[r][c] == ".":
                        for char in "123456789":
                            if self.is_valid(r, c, char, board):
                                board[r][c] = char
                                if solve():
                                    return True
                                board[r][c] = "."
                        return False
            return True
            
        solve()
        
    def is_valid(self, r, c, char, board):
        for i in range(9):
            if board[i][c] == char: return False
            if board[r][i] == char: return False
            if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == char: return False
        return True`,
        explanation: ["Nested loop finds the next available empty cell (marked with '.').", "Try every character from '1' to '9' for that cell.", "The `is_valid` function checks row, column, and 3x3 block constraints simultaneously.", "If a placement is valid, recurse. If the complete puzzle is solved, propagate the return. Otherwise, reset the cell (backtrack) and try the next candidate."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
    
private:
    bool solve(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;
                            if (solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    bool isValid(vector<vector<char>>& board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == c) return false;
            if (board[row][i] == c) return false;
            if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
        }
        return true;
    }
};`,
        explanation: ["Standard backtracking implementation for Sudoku solver.", "Explore every empty cell and attempt to place valid digits.", "Propagate the success status (`true`) upwards through recursion levels as soon as the puzzle is fully filled.", "The constraint validation function uses modulo and division arithmetic to efficiently check 3x3 sub-boxes."]
      },
      {
        language: "java",
        code: `class Solution {
    public void solveSudoku(char[][] board) {
        if(board == null || board.length == 0) return;
        solve(board);
    }

    private boolean solve(char[][] board){
        for(int i = 0; i < board.length; i++){
            for(int j = 0; j < board[0].length; j++){
                if(board[i][j] == '.'){
                    for(char c = '1'; c <= '9'; c++){
                        if(isValid(board, i, j, c)){
                            board[i][j] = c;
                            if(solve(board)) return true;
                            else board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    private boolean isValid(char[][] board, int row, int col, char c){
        for(int i = 0; i < 9; i++) {
            if(board[i][col] != '.' && board[i][col] == c) return false; //check row
            if(board[row][i] != '.' && board[row][i] == c) return false; //check column
            if(board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] != '.' && 
               board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false; //check 3*3 block
        }
        return true;
    }
}`,
        explanation: ["Use backtracking recursion to fill the board one empty cell at a time.", "For each empty cell, iterate through digits 1-9 and verify constraints across row, col, and sub-box.", "A valid placement leads to the next recursive depth; failure resets the board cell.", "The algorithm terminates successfully as soon as all 81 cells are filled without conflicts."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'recursion-backtracking');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

Object.keys(recursionData).forEach(id => {
  const data = recursionData[id];
  let varName = id.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
  if (/^[0-9]/.test(varName)) varName = '_' + varName;

  const content = `import { Problem } from '../../../types/problem';

export const ${varName}: Problem = {
  id: "${id}",
  title: "${data.title}",
  difficulty: "${data.difficulty}",
  topic: "${data.topic}",
  tags: ${JSON.stringify(data.tags)},
  prompt: ${JSON.stringify(data.prompt)},
  constraints: ${JSON.stringify(data.constraints)},
  examples: ${JSON.stringify(data.examples, null, 2)},
  solutions: ${JSON.stringify(data.solutions, null, 2)},
  timeComplexity: "${data.timeComplexity}",
  spaceComplexity: "${data.spaceComplexity}",
  edgeCases: ${JSON.stringify(data.edgeCases)}
};
`;
  fs.writeFileSync(path.join(targetDir, `${id}.ts`), content);
});

console.log("Written recursion problems part 3.");
