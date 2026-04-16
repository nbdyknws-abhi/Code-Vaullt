import { Problem } from '../../../types/problem';

export const maximumProductSubarray: Problem = {
  id: "maximum-product-subarray",
  title: "Maximum Product Subarray",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  tags: ["array","dynamic-programming"],
  prompt: "Given an integer array `nums`, find a contiguous non-empty subarray within the array that has the largest product, and return the product.",
  constraints: ["1 <= nums.length <= 2 * 10^4","-10 <= nums[i] <= 10","All elements in nums are 32-bit integers."],
  examples: [
  {
    "input": "nums = [2,3,-2,4]",
    "output": "6",
    "explanation": "[2,3] has the largest product 6."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def maxProduct(self, nums: List[int]) -> int:\n        res = max(nums)\n        curMin, curMax = 1, 1\n        \n        for n in nums:\n            if n == 0:\n                curMin, curMax = 1, 1\n                continue\n            tmp = curMax * n\n            curMax = max(n * curMax, n * curMin, n)\n            curMin = min(tmp, n * curMin, n)\n            res = max(res, curMax)\n            \n        return res",
    "explanation": [
      "Since negative numbers can flip a product from very small to very large, we must track both the current maximum and current minimum at each step.",
      "When a zero is encountered, reset the multipliers to 1.",
      "At each number, update `curMax` and `curMin` by comparing the current number itself, and the product of the current number with previous limits.",
      "Result is the maximum `curMax` seen throughout the process."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int maxProduct(vector<int>& nums) {\n        int res = nums[0];\n        int curMin = 1, curMax = 1;\n        \n        for (int n : nums) {\n            int tmp = curMax * n;\n            curMax = max({n * curMax, n * curMin, n});\n            curMin = min({tmp, n * curMin, n});\n            res = max(res, curMax);\n        }\n        return res;\n    }\n};",
    "explanation": [
      "Maintain running product maximum and minimum to handle parity flips from negative numbers.",
      "Implicitly resets on 0 as `n * curMax`, `n * curMin`, and `n` will all be 0.",
      "Standard linear scan approach with O(1) extra space.",
      "Efficiently computes result in one pass."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int maxProduct(int[] nums) {\n        int res = nums[0];\n        int max = nums[0], min = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] < 0) {\n                int temp = max;\n                max = min;\n                min = temp;\n            }\n            max = Math.max(nums[i], max * nums[i]);\n            min = Math.min(nums[i], min * nums[i]);\n            res = Math.max(res, max);\n        }\n        return res;\n    }\n}",
    "explanation": [
      "A neat trick for handling negatives is swapping `max` and `min` whenever the current number is negative.",
      "This simplifies the `max`/`min` updates to simple comparisons with `nums[i]`.",
      "Logic correctly handles subarrays containing zeros or single elements.",
      "Optimal O(N) time and O(1) space complexity."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Array with zeros","Mixed positive/negative numbers"]
};
