import { Problem } from '../../../types/problem';

export const productOfArrayExceptSelf: Problem = {
  id: "product-of-array-except-self",
  title: "Product of Array Except Self",
  difficulty: "Medium",
  topic: "Arrays",
  tags: ["array","prefix-sum"],
  prompt: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.",
  constraints: ["2 <= nums.length <= 10^5","-30 <= nums[i] <= 30"],
  examples: [
  {
    "input": "nums = [1,2,3,4]",
    "output": "[24,12,8,6]",
    "explanation": "For i=0: 2*3*4 = 24. For i=1: 1*3*4 = 12, etc."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def productExceptSelf(nums):\n    n = len(nums)\n    res = [1] * n\n    \n    left = 1\n    for i in range(n):\n        res[i] = left\n        left *= nums[i]\n        \n    right = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= right\n        right *= nums[i]\n        \n    return res",
    "explanation": [
      "Initialize a result array with 1s.",
      "First pass (forward): calculate the running prefix product (excluding current cell) and store it.",
      "Second pass (backward): calculate the running suffix product and multiply it by the existing prefix product in the result array."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n\nclass Solution {\npublic:\n    std::vector<int> productExceptSelf(std::vector<int>& nums) {\n        int n = nums.size();\n        std::vector<int> res(n, 1);\n        int left = 1;\n        for (int i = 0; i < n; i++) {\n            res[i] = left;\n            left *= nums[i];\n        }\n        int right = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= right;\n            right *= nums[i];\n        }\n        return res;\n    }\n};",
    "explanation": [
      "Use the output array to gather left running products.",
      "Then iterate backwards through the array while maintaining a right running product.",
      "Multiply the right product directly into the answer array for O(1) extra space outside the answer array."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        res[0] = 1;\n        for (int i = 1; i < n; i++) {\n            res[i] = res[i - 1] * nums[i - 1];\n        }\n        int right = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= right;\n            right *= nums[i];\n        }\n        return res;\n    }\n}",
    "explanation": [
      "Instantiate the result array and populate it with prefix aggregates in one pass.",
      "Start a right accumulator at 1.",
      "Walk the array backwards, multiplying the right accumulator into the result at that index and updating the right accumulator."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Array with zeros","Negative values"]
};
