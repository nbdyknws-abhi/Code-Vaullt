import fs from 'fs';
import path from 'path';

const recursionData = {
  "combination-sum-ii": {
    title: "Combination Sum II", difficulty: "Medium", topic: "Recursion & Backtracking", tags: ["array", "backtracking"],
    prompt: "Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`.\n\nEach number in `candidates` may only be used once in the combination.\n\nNote: The solution set must not contain duplicate combinations.",
    constraints: ["1 <= candidates.length <= 100", "1 <= candidates[i] <= 50", "1 <= target <= 30"],
    examples: [{input: "candidates = [10,1,2,7,6,1,5], target = 8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]"}],
    timeComplexity: "O(2^N)", spaceComplexity: "O(N)", edgeCases: ["Large input with duplicates"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res = []
        
        def backtrack(cur, pos, target):
            if target == 0:
                res.append(cur.copy())
                return
            if target <= 0:
                return
            
            prev = -1
            for i in range(pos, len(candidates)):
                if candidates[i] == prev:
                    continue
                cur.append(candidates[i])
                backtrack(cur, i + 1, target - candidates[i])
                cur.pop()
                prev = candidates[i]
                
        backtrack([], 0, target)
        return res`,
        explanation: ["Sort the candidates to easily identify and skip duplicates.", "In the backtracking loop, if the current element is the same as the previous one at the same level of recursion, skip it to avoid duplicate combinations.", "Pass `i + 1` to the next recursion to ensure each candidate is used at most once.", "The target is decremented by the value of the included candidate in each step."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> res;
        vector<int> current;
        backtrack(candidates, target, 0, current, res);
        return res;
    }
    
private:
    void backtrack(vector<int>& candidates, int target, int index, vector<int>& current, vector<vector<int>>& res) {
        if (target == 0) {
            res.push_back(current);
            return;
        }
        for (int i = index; i < candidates.size(); ++i) {
            if (i > index && candidates[i] == candidates[i - 1]) continue;
            if (candidates[i] > target) break;
            
            current.push_back(candidates[i]);
            backtrack(candidates, target - candidates[i], i + 1, current, res);
            current.pop_back();
        }
    }
};`,
        explanation: ["Sort the input array to allow pruning and duplicate handles.", "The check `i > index && candidates[i] == candidates[i-1]` prevents generating duplicate combinations by skipping identical elements at the same tree depth.", "Use `i + 1` in the recursive call to ensure each array element is used exactly once per path.", "Break the loop if the current candidate exceeds the remaining target (since array is sorted)."]
      },
      {
        language: "java",
        code: `class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> list = new ArrayList<>();
        Arrays.sort(candidates);
        backtrack(list, new ArrayList<>(), candidates, target, 0);
        return list;
    }

    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] nums, int remain, int start) {
        if(remain < 0) return;
        else if(remain == 0) list.add(new ArrayList<>(tempList));
        else {
            for(int i = start; i < nums.length; i++) {
                if(i > start && nums[i] == nums[i-1]) continue; // skip duplicates
                tempList.add(nums[i]);
                backtrack(list, tempList, nums, remain - nums[i], i + 1);
                tempList.remove(tempList.size() - 1);
            }
        }
    }
}`,
        explanation: ["First, sort the array to manage identical values.", "In the loop, logic `if(i > start && nums[i] == nums[i-1]) continue` ensures only the first instance of a duplicate is used as the 'start' of a branch at any level.", "Decrement the `remain` sum and move carefully to the next index `i + 1`.", "Backtrack by removing the tail element to explore sibling branches."]
      }
    ]
  },
  "letter-combinations-of-a-phone-number": {
    title: "Letter Combinations of a Phone Number", difficulty: "Medium", topic: "Recursion & Backtracking", tags: ["hash-table", "string", "backtracking"],
    prompt: "Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nA mapping of digits to letters (just like on the telephone buttons) is provided below. Note that 1 does not map to any letters.",
    constraints: ["0 <= digits.length <= 4", "digits[i] is a digit in the range ['2', '9']."],
    examples: [{input: "digits = \"23\"", output: "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"}],
    timeComplexity: "O(4^N * N)", spaceComplexity: "O(N)", edgeCases: ["Empty string input"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []
            
        digit_to_char = {
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
        }
        res = []
        
        def backtrack(i, cur_str):
            if len(cur_str) == len(digits):
                res.append(cur_str)
                return
            
            for c in digit_to_char[digits[i]]:
                backtrack(i + 1, cur_str + c)
                
        backtrack(0, "")
        return res`,
        explanation: ["Map each digit to its corresponding characters as a hash table.", "Use recursion to build the string one character at a time.", "For each character matching the current digit, recurse into the next digit index.", "Base case occurs when the length of the built string matches the length of the input digits string."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        
        vector<string> res;
        string current = "";
        vector<string> mapping = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        backtrack(digits, 0, current, mapping, res);
        return res;
    }
    
private:
    void backtrack(string& digits, int index, string& current, vector<string>& mapping, vector<string>& res) {
        if (index == digits.length()) {
            res.push_back(current);
            return;
        }
        string letters = mapping[digits[index] - '0'];
        for (char c : letters) {
            current.push_back(c);
            backtrack(digits, index + 1, current, mapping, res);
            current.pop_back();
        }
    }
};`,
        explanation: ["Use an array to map integer digits to their letter strings.", "Implement a recursive DFS (backtracking) approach.", "Iterate through each letter mapped to the current digit, append it to the partial answer, and recurse.", "Backtrack by popping the last character before moving to the next candidate letter."]
      },
      {
        language: "java",
        code: `class Solution {
    private static final String[] KEYS = { "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz" };

    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if (digits == null || digits.isEmpty()) return res;
        backtrack(res, new StringBuilder(), digits, 0);
        return res;
    }

    private void backtrack(List<String> res, StringBuilder sb, String digits, int index) {
        if (index == digits.length()) {
            res.add(sb.toString());
            return;
        }
        String letters = KEYS[digits.charAt(index) - '0'];
        for (char c : letters.toCharArray()) {
            sb.append(c);
            backtrack(res, sb, digits, index + 1);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}`,
        explanation: ["Store keyboard mapping in a static constant array.", "Use a `StringBuilder` to efficiently build and manipulate the combination string during recursion.", "The recursive function takes the current digit index and proceeds until the target length is met.", "String building is optimized by appending and deleting at the tail in O(1)."]
      }
    ]
  },
  "n-queens": {
    title: "N-Queens", difficulty: "Hard", topic: "Recursion & Backtracking", tags: ["array", "backtracking"],
    prompt: "The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.\n\nGiven an integer `n`, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' indicate a queen and an empty space, respectively.",
    constraints: ["1 <= n <= 9"],
    examples: [{input: "n = 4", output: "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]"}],
    timeComplexity: "O(N!)", spaceComplexity: "O(N^2)", edgeCases: ["n=1 board"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        col = set()
        posDiag = set() # (r + c)
        negDiag = set() # (r - c)
        
        res = []
        board = [["."] * n for _ in range(n)]
        
        def backtrack(r):
            if r == n:
                copy = ["".join(row) for row in board]
                res.append(copy)
                return
            
            for c in range(n):
                if c in col or (r + c) in posDiag or (r - c) in negDiag:
                    continue
                
                col.add(c)
                posDiag.add(r + c)
                negDiag.add(r - c)
                board[r][c] = "Q"
                
                backtrack(r + 1)
                
                col.remove(c)
                posDiag.remove(r + c)
                negDiag.remove(r - c)
                board[r][c] = "."
                
        backtrack(0)
        return res`,
        explanation: ["Use three sets to keep track of columns, positive diagonals, and negative diagonals currently occupied by queens.", "Positive diagonals share the same `r + c` sum; negative diagonals share the same `r - c` difference.", "The backtracking function progresses row by row.", "If a position `(r, c)` is safe, place a queen, update sets, and recurse. Then remove the queen (backtrack) to search other columns."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        vector<bool> cols(n, false), d1(2 * n, false), d2(2 * n, false);
        backtrack(res, board, cols, d1, d2, 0, n);
        return res;
    }
    
private:
    void backtrack(vector<vector<string>>& res, vector<string>& board, vector<bool>& cols, vector<bool>& d1, vector<bool>& d2, int row, int n) {
        if (row == n) {
            res.push_back(board);
            return;
        }
        for (int col = 0; col < n; col++) {
            if (cols[col] || d1[row + col] || d2[row - col + n]) continue;
            
            board[row][col] = 'Q';
            cols[col] = d1[row + col] = d2[row - col + n] = true;
            backtrack(res, board, cols, d1, d2, row + 1, n);
            board[row][col] = '.';
            cols[col] = d1[row + col] = d2[row - col + n] = false;
        }
    }
};`,
        explanation: ["Use boolean vectors to efficiently track column and diagonal conflicts.", "Diagonal 1 index is `row + col`. Diagonal 2 index is `row - col + n` to ensure positive indices.", "Iterate through columns of the current row to find a valid placement.", "The recursive call advances to the next row, and backtracking restores conflict markers for alternative path exploration."]
      },
      {
        language: "java",
        code: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for(int i = 0; i < n; i++) Arrays.fill(board[i], '.');
        backtrack(board, 0, res);
        return res;
    }

    private void backtrack(char[][] board, int row, List<List<String>> res) {
        if(row == board.length) {
            res.add(construct(board));
            return;
        }
        for(int col = 0; col < board.length; col++) {
            if(validate(board, row, col)) {
                board[row][col] = 'Q';
                backtrack(board, row + 1, res);
                board[row][col] = '.';
            }
        }
    }

    private boolean validate(char[][] board, int row, int col) {
        for(int i = 0; i < row; i++) {
            for(int j = 0; j < board.length; j++) {
                if(board[i][j] == 'Q' && (j == col || Math.abs(row - i) == Math.abs(col - j))) return false;
            }
        }
        return true;
    }

    private List<String> construct(char[][] board) {
        List<String> res = new LinkedList<>();
        for(int i = 0; i < board.length; i++) res.add(new String(board[i]));
        return res;
    }
}`,
        explanation: ["Represent the chessboard as a 2D character array.", "The `validate` function checks if a queen at `(row, col)` conflicts with any queens in previous rows.", "Conflict check involves comparing column indices and the absolute difference of row/column positions (diagonals).", "Successfully placing `n` queens leads to board conversion into a list of strings for final output."]
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

console.log("Written recursion problems part 2.");
