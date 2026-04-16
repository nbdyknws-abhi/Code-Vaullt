import fs from 'fs';
import path from 'path';

const dpData = {
  "longest-increasing-subsequence": {
    title: "Longest Increasing Subsequence", difficulty: "Medium", topic: "Dynamic Programming", tags: ["array", "binary-search", "dynamic-programming"],
    prompt: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    examples: [{input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."}],
    timeComplexity: "O(N^2) or O(N log N)", spaceComplexity: "O(N)", edgeCases: ["Array with same values", "Decreasing array"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        LIS = [1] * len(nums)
        
        for i in range(len(nums) - 1, -1, -1):
            for j in range(i + 1, len(nums)):
                if nums[i] < nums[j]:
                    LIS[i] = max(LIS[i], 1 + LIS[j])
                    
        return max(LIS)`,
        explanation: ["Use an array `LIS` where `LIS[i]` stores the length of the longest increasing subsequence starting at index `i`.", "Iterate backwards through the input array.", "For each element `i`, check all elements `j` to its right. If `nums[i] < nums[j]`, update `LIS[i]`.", "The final answer is the maximum value in the `LIS` array."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        if (nums.empty()) return 0;
        vector<int> dp(nums.size(), 1);
        int maxLen = 1;
        
        for (int i = 1; i < nums.size(); i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
            maxLen = max(maxLen, dp[i]);
        }
        return maxLen;
    }
};`,
        explanation: ["Define `dp[i]` as the LIS ending at index `i`.", "For every `i`, compare it with every index `j < i`. If `nums[j] < nums[i]`, then `dp[i]` can potentially be `dp[j] + 1`.", "Keep track of the global maximum `maxLen` during iteration.", "This is the classic O(N^2) dynamic programming approach."]
      },
      {
        language: "java",
        code: `class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums.length == 0) return 0;
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        int res = 1;
        
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            res = Math.max(res, dp[i]);
        }
        return res;
    }
}`,
        explanation: ["Initialize a `dp` array tracking the longest subsequence ending at each index.", "Outer loop traverses each element as a potential subsequence end.", "Inner loop checks all previous elements to find valid 'predecessors' in an increasing sequence.", "Final result is the peak value in the `dp` array."]
      }
    ]
  },
  "unique-paths": {
    title: "Unique Paths", difficulty: "Medium", topic: "Dynamic Programming", tags: ["math", "dynamic-programming", "combinatorics"],
    prompt: "There is a robot on an `m x n` grid. The robot is initially located at the top-left corner (`grid[0][0]`). The robot tries to move to the bottom-right corner (`grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.\n\nGiven the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.",
    constraints: ["1 <= m, n <= 100"],
    examples: [{input: "m = 3, n = 7", output: "28"}],
    timeComplexity: "O(M * N)", spaceComplexity: "O(N)", edgeCases: ["Grid with only one row/column"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        row = [1] * n
        
        for i in range(m - 1):
            newRow = [1] * n
            for j in range(n - 2, -1, -1):
                newRow[j] = newRow[j + 1] + row[j]
            row = newRow
            
        return row[0]`,
        explanation: ["Think of this as a grid where each cell's value is the sum of choices from the cell below and the cell to the right.", "Instead of a full 2D grid, we can just maintain the last calculated row to reduce space complexity.", "The base case is that all cells in the bottom row and rightmost column have only 1 unique path to the destination.", "Iteration calculates the inner cells bottom-up."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> prevRow(n, 1);
        for (int i = 1; i < m; i++) {
            vector<int> currRow(n, 1);
            for (int j = 1; j < n; j++) {
                currRow[j] = currRow[j - 1] + prevRow[j];
            }
            prevRow = currRow;
        }
        return prevRow[n - 1];
    }
};`,
        explanation: ["Use 1D space optimization by storing only the previous calculated row.", "The value of `paths[i][j]` is always `paths[i-1][j] + paths[i][j-1]`.", "Standard O(M*N) path counting strategy using bottom-up tabulation.", "Initializing with 1 handles the border cases where there's only one movement option."]
      },
      {
        language: "java",
        code: `class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
}`,
        explanation: ["Efficient 1D array DP where the value at `dp[j]` is updated based on its previous value (representing the cell above) and `dp[j-1]` (representing the cell to the left).", "Outer loop processes rows, inner loop processes columns.", "Minimum memory allocation strategy for linear space complexity.", "Perfect for interviews requiring both correctness and optimization."]
      }
    ]
  },
  "edit-distance": {
    title: "Edit Distance", difficulty: "Medium", topic: "Dynamic Programming", tags: ["string", "dynamic-programming"],
    prompt: "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word:\n1. Insert a character\n2. Delete a character\n3. Replace a character",
    constraints: ["0 <= word1.length, word2.length <= 500", "word1 and word2 consist of lowercase English letters."],
    examples: [{input: "word1 = \"horse\", word2 = \"ros\"", output: "3", explanation: "horse -> rorse (replace 'h' with 'r'), rorse -> rose (remove 'r'), rose -> ros (remove 'e')"}],
    timeComplexity: "O(M * N)", spaceComplexity: "O(M * N)", edgeCases: ["Empty string", "Identical strings"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        dp = [[0] * (len(word2) + 1) for _ in range(len(word1) + 1)]
        
        for i in range(len(word1) + 1):
            dp[i][len(word2)] = len(word1) - i
        for j in range(len(word2) + 1):
            dp[len(word1)][j] = len(word2) - j
            
        for i in range(len(word1) - 1, -1, -1):
            for j in range(len(word2) - 1, -1, -1):
                if word1[i] == word2[j]:
                    dp[i][j] = dp[i + 1][j + 1]
                else:
                    dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1])
                    
        return dp[0][0]`,
        explanation: ["Create a 2D table where `dp[i][j]` is the edit distance between `word1[i:]` and `word2[j:]`.", "Base cases: converting empty strings required the full length of the other string in deletions/insertions.", "If characters match, no operation is needed. Otherwise, pick the minimum of Insert (`dp[i][j+1]`), Delete (`dp[i+1][j]`), or Replace (`dp[i+1][j+1]`).", "Bottom-up approach iteratively fills the table."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length();
        int n = word2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i-1] == word2[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
                }
            }
        }
        return dp[m][n];
    }
};`,
        explanation: ["Apply Levenshtein Distance algorithm using optimized DP tabulation.", "The state transition captures all possible edits at each index.", "Result at `dp[m][n]` represents the full transformation cost.", "Uses `std::min` with initializer list to concisely find the cheapest operation."]
      },
      {
        language: "java",
        code: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
                }
            }
        }
        return dp[m][n];
    }
}`,
        explanation: ["Building a result matrix where `dp[i][j]` maps the sub-problem of converting the first `i` characters of `word1` to the first `j` characters of `word2`.", "Diagonal movement represents matching or replacement; horizontal/vertical moves represent deletion/insertion.", "Linear O(M*N) logic efficiently handles string comparison logic.", "Handles corner cases where one or both strings are empty via initialization loops."]
      }
    ]
  },
  "maximum-product-subarray": {
    title: "Maximum Product Subarray", difficulty: "Medium", topic: "Dynamic Programming", tags: ["array", "dynamic-programming"],
    prompt: "Given an integer array `nums`, find a contiguous non-empty subarray within the array that has the largest product, and return the product.",
    constraints: ["1 <= nums.length <= 2 * 10^4", "-10 <= nums[i] <= 10", "All elements in nums are 32-bit integers."],
    examples: [{input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6."}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["Array with zeros", "Mixed positive/negative numbers"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        res = max(nums)
        curMin, curMax = 1, 1
        
        for n in nums:
            if n == 0:
                curMin, curMax = 1, 1
                continue
            tmp = curMax * n
            curMax = max(n * curMax, n * curMin, n)
            curMin = min(tmp, n * curMin, n)
            res = max(res, curMax)
            
        return res`,
        explanation: ["Since negative numbers can flip a product from very small to very large, we must track both the current maximum and current minimum at each step.", "When a zero is encountered, reset the multipliers to 1.", "At each number, update `curMax` and `curMin` by comparing the current number itself, and the product of the current number with previous limits.", "Result is the maximum `curMax` seen throughout the process."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int res = nums[0];
        int curMin = 1, curMax = 1;
        
        for (int n : nums) {
            int tmp = curMax * n;
            curMax = max({n * curMax, n * curMin, n});
            curMin = min({tmp, n * curMin, n});
            res = max(res, curMax);
        }
        return res;
    }
};`,
        explanation: ["Maintain running product maximum and minimum to handle parity flips from negative numbers.", "Implicitly resets on 0 as `n * curMax`, `n * curMin`, and `n` will all be 0.", "Standard linear scan approach with O(1) extra space.", "Efficiently computes result in one pass."]
      },
      {
        language: "java",
        code: `class Solution {
    public int maxProduct(int[] nums) {
        int res = nums[0];
        int max = nums[0], min = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < 0) {
                int temp = max;
                max = min;
                min = temp;
            }
            max = Math.max(nums[i], max * nums[i]);
            min = Math.min(nums[i], min * nums[i]);
            res = Math.max(res, max);
        }
        return res;
    }
}`,
        explanation: ["A neat trick for handling negatives is swapping `max` and `min` whenever the current number is negative.", "This simplifies the `max`/`min` updates to simple comparisons with `nums[i]`.", "Logic correctly handles subarrays containing zeros or single elements.", "Optimal O(N) time and O(1) space complexity."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'dynamic-programming');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

Object.keys(dpData).forEach(id => {
  const data = dpData[id];
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

console.log("Written DP problems part 2.");
