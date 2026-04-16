import fs from 'fs';
import path from 'path';

const arraysData = {
  "set-matrix-zeroes": {
    title: "Set Matrix Zeroes", difficulty: "Medium", topic: "Arrays", tags: ["array", "hash-table", "matrix"],
    prompt: "Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s.\n\nYou must do it in place.",
    constraints: ["m == matrix.length", "n == matrix[0].length", "1 <= m, n <= 200", "-2^31 <= matrix[i][j] <= 2^31 - 1"],
    examples: [{input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]"}],
    timeComplexity: "O(M * N)", spaceComplexity: "O(1)", edgeCases: ["Zero at [0][0]"],
    solutions: [
      {
        language: "python",
        code: `def setZeroes(matrix):
    ROWS, COLS = len(matrix), len(matrix[0])
    rowZero = False

    for r in range(ROWS):
        for c in range(COLS):
            if matrix[r][c] == 0:
                matrix[0][c] = 0
                if r > 0:
                    matrix[r][0] = 0
                else:
                    rowZero = True

    for r in range(1, ROWS):
        for c in range(1, COLS):
            if matrix[0][c] == 0 or matrix[r][0] == 0:
                matrix[r][c] = 0

    if matrix[0][0] == 0:
        for r in range(ROWS):
            matrix[r][0] = 0

    if rowZero:
        for c in range(COLS):
            matrix[0][c] = 0`,
        explanation: ["Use the first row and column as flags to track zero status.", "Need a separate variable (rowZero) to flag the top row specifically because matrix[0][0] overlaps.", "Pass 1: Flag edges.", "Pass 2: Update inner matrix.", "Pass 3: Update first row/col based on flags."]
      },
      {
        language: "cpp",
        code: `#include <vector>

class Solution {
public:
    void setZeroes(std::vector<std::vector<int>>& matrix) {
        bool firstRowZero = false;
        int m = matrix.size(), n = matrix[0].size();
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[0][j] = 0;
                    if (i > 0) matrix[i][0] = 0;
                    else firstRowZero = true;
                }
            }
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[0][j] == 0 || matrix[i][0] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }
        if (matrix[0][0] == 0) {
            for (int i = 0; i < m; i++) matrix[i][0] = 0;
        }
        if (firstRowZero) {
            for (int j = 0; j < n; j++) matrix[0][j] = 0;
        }
    }
};`,
        explanation: ["Flag 0s in the first row/col.", "Use firstRowZero bool because matrix[0][0] handles both.", "Nullify inner matrix using flags.", "Finally fix the first row and col boundaries."]
      },
      {
        language: "java",
        code: `class Solution {
    public void setZeroes(int[][] matrix) {
        boolean firstCol = false;
        int R = matrix.length;
        int C = matrix[0].length;

        for (int i = 0; i < R; i++) {
            if (matrix[i][0] == 0) {
                firstCol = true;
            }
            for (int j = 1; j < C; j++) {
                if (matrix[i][j] == 0) {
                    matrix[0][j] = 0;
                    matrix[i][0] = 0;
                }
            }
        }

        for (int i = 1; i < R; i++) {
            for (int j = 1; j < C; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        if (matrix[0][0] == 0) {
            for (int j = 0; j < C; j++) {
                matrix[0][j] = 0;
            }
        }

        if (firstCol) {
            for (int i = 0; i < R; i++) {
                matrix[i][0] = 0;
            }
        }
    }
}`,
        explanation: ["O(1) space optimization by utilizing 0th row and column markers.", "Variable firstCol handles truthy state of leftmost vertical boundary.", "Iterate twice: record triggers, execute zeroes.", "Finish processing edge cells depending on boolean triggers."]
      }
    ]
  },
  "rotate-array": {
    title: "Rotate Array", difficulty: "Medium", topic: "Arrays", tags: ["array", "math", "two-pointers"],
    prompt: "Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.",
    constraints: ["1 <= nums.length <= 10^5", "-2^31 <= nums[i] <= 2^31 - 1", "0 <= k <= 10^5"],
    examples: [{input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]"}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["k > n", "k = 0"],
    solutions: [
      {
        language: "python",
        code: `def rotate(nums, k):
    k %= len(nums)
    
    def reverse(l, r):
        while l < r:
            nums[l], nums[r] = nums[r], nums[l]
            l, r = l + 1, r - 1
            
    reverse(0, len(nums) - 1)
    reverse(0, k - 1)
    reverse(k, len(nums) - 1)`,
        explanation: ["Module k by array length to handle giant shifts.", "Reverse the entire array.", "Reverse the first k elements.", "Reverse the remaining elements to land sequence correctly."]
      },
      {
        language: "cpp",
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    void rotate(std::vector<int>& nums, int k) {
        k = k % nums.size();
        std::reverse(nums.begin(), nums.end());
        std::reverse(nums.begin(), nums.begin() + k);
        std::reverse(nums.begin() + k, nums.end());
    }
};`,
        explanation: ["Handle rotation wrap-arround via modulus.", "Standard reverse operations provided by algorithms header.", "Execute full reverse, then partial chunked reverse."]
      },
      {
        language: "java",
        code: `class Solution {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }
    
    public void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
}`,
        explanation: ["Define reverse helper with left/right converging pointers.", "Bind large k jumps.", "Full -> Segment A -> Segment B inversions lock placement in O(N)."]
      }
    ]
  },
  "missing-number": {
    title: "Missing Number", difficulty: "Easy", topic: "Arrays", tags: ["array", "hash-table", "math", "binary-search", "bit-manipulation"],
    prompt: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
    constraints: ["n == nums.length", "1 <= n <= 10^4", "0 <= nums[i] <= n"],
    examples: [{input: "nums = [3,0,1]", output: "2", explanation: "n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums."}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["Missing 0", "Missing max n"],
    solutions: [
      {
        language: "python",
        code: `def missingNumber(nums):
    res = len(nums)
    for i in range(len(nums)):
        res += (i - nums[i])
    return res`,
        explanation: ["Use math sum differences avoiding overflow.", "We aggregate indices versus values seamlessly via running accumulator."]
      },
      {
        language: "cpp",
        code: `#include <vector>

class Solution {
public:
    int missingNumber(std::vector<int>& nums) {
        int res = nums.size();
        for(int i=0; i<nums.size(); i++){
            res ^= i;
            res ^= nums[i];
        }
        return res;
    }
};`,
        explanation: ["Bitwise XOR solves nicely in O(1) space.", "XORing a number against itself sets bits back to 0.", "We XOR all numbers 0...N and all items in array; the sole remainder represents the missing numeral."]
      },
      {
        language: "java",
        code: `class Solution {
    public int missingNumber(int[] nums) {
        int sum = 0;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            sum += nums[i];
        }
        int expectedSum = n * (n + 1) / 2;
        return expectedSum - sum;
    }
}`,
        explanation: ["Gauss's mathematics formula for summation N*(N+1)/2 solves the theoretical sum.", "Calculated linear aggregate versus theoretical exact directly leaves missing element."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'arrays');

Object.keys(arraysData).forEach(id => {
  const data = arraysData[id];
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

console.log("Written detailed array problems part 4.");
