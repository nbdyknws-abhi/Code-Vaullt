import { Problem } from '../../../types/problem';

export const longestIncreasingSubsequence: Problem = {
  id: "longest-increasing-subsequence",
  title: "Longest Increasing Subsequence",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  tags: ["array","binary-search","dynamic-programming"],
  prompt: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
  constraints: ["1 <= nums.length <= 2500","-10^4 <= nums[i] <= 10^4"],
  examples: [
  {
    "input": "nums = [10,9,2,5,3,7,101,18]",
    "output": "4",
    "explanation": "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        LIS = [1] * len(nums)\n        \n        for i in range(len(nums) - 1, -1, -1):\n            for j in range(i + 1, len(nums)):\n                if nums[i] < nums[j]:\n                    LIS[i] = max(LIS[i], 1 + LIS[j])\n                    \n        return max(LIS)",
    "explanation": [
      "Use an array `LIS` where `LIS[i]` stores the length of the longest increasing subsequence starting at index `i`.",
      "Iterate backwards through the input array.",
      "For each element `i`, check all elements `j` to its right. If `nums[i] < nums[j]`, update `LIS[i]`.",
      "The final answer is the maximum value in the `LIS` array."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        if (nums.empty()) return 0;\n        vector<int> dp(nums.size(), 1);\n        int maxLen = 1;\n        \n        for (int i = 1; i < nums.size(); i++) {\n            for (int j = 0; j < i; j++) {\n                if (nums[j] < nums[i]) {\n                    dp[i] = max(dp[i], dp[j] + 1);\n                }\n            }\n            maxLen = max(maxLen, dp[i]);\n        }\n        return maxLen;\n    }\n};",
    "explanation": [
      "Define `dp[i]` as the LIS ending at index `i`.",
      "For every `i`, compare it with every index `j < i`. If `nums[j] < nums[i]`, then `dp[i]` can potentially be `dp[j] + 1`.",
      "Keep track of the global maximum `maxLen` during iteration.",
      "This is the classic O(N^2) dynamic programming approach."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int lengthOfLIS(int[] nums) {\n        if (nums.length == 0) return 0;\n        int[] dp = new int[nums.length];\n        Arrays.fill(dp, 1);\n        int res = 1;\n        \n        for (int i = 1; i < nums.length; i++) {\n            for (int j = 0; j < i; j++) {\n                if (nums[i] > nums[j]) {\n                    dp[i] = Math.max(dp[i], dp[j] + 1);\n                }\n            }\n            res = Math.max(res, dp[i]);\n        }\n        return res;\n    }\n}",
    "explanation": [
      "Initialize a `dp` array tracking the longest subsequence ending at each index.",
      "Outer loop traverses each element as a potential subsequence end.",
      "Inner loop checks all previous elements to find valid 'predecessors' in an increasing sequence.",
      "Final result is the peak value in the `dp` array."
    ]
  }
],
  timeComplexity: "O(N^2) or O(N log N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Array with same values","Decreasing array"]
};
