import { Problem } from '../../../types/problem';

export const maximumSubarrayKadanesAlgorithm: Problem = {
  id: "maximum-subarray-kadanes-algorithm",
  title: "Maximum Subarray",
  difficulty: "Medium",
  topic: "Arrays",
  tags: ["array","divide-and-conquer","dynamic-programming"],
  prompt: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
  constraints: ["1 <= nums.length <= 10^5","-10^4 <= nums[i] <= 10^4"],
  examples: [
  {
    "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
    "output": "6",
    "explanation": "The subarray [4,-1,2,1] has the largest sum 6."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def maxSubArray(nums):\n    current_sum = max_sum = nums[0]\n    for num in nums[1:]:\n        current_sum = max(num, current_sum + num)\n        max_sum = max(max_sum, current_sum)\n    return max_sum",
    "explanation": [
      "Initialize current_sum and max_sum to the first element.",
      "Iterate starting from the second element.",
      "At each step, decide whether to add the element to the current subarray or start a new subarray.",
      "Update max_sum if current_sum is greater."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <algorithm>\n\nclass Solution {\npublic:\n    int maxSubArray(std::vector<int>& nums) {\n        int current_sum = nums[0];\n        int max_sum = nums[0];\n        for (int i = 1; i < nums.size(); i++) {\n            current_sum = std::max(nums[i], current_sum + nums[i]);\n            max_sum = std::max(max_sum, current_sum);\n        }\n        return max_sum;\n    }\n};",
    "explanation": [
      "This is Kadane's Algorithm.",
      "Keep a running total (current_sum) and the absolute maximum (max_sum).",
      "If current_sum becomes less than the current element, it means starting fresh from the current element is better."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int maxSubArray(int[] nums) {\n        int currentSum = nums[0];\n        int maxSum = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            currentSum = Math.max(nums[i], currentSum + nums[i]);\n            maxSum = Math.max(maxSum, currentSum);\n        }\n        return maxSum;\n    }\n}",
    "explanation": [
      "Set base cases for currentSum and maxSum using the first array item.",
      "Iterate from the second item.",
      "currentSum computes the local maximum subarray ending at index i.",
      "maxSum tracks the global maximum subarray sum across all indices."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["All negative numbers","Single element array"]
};
