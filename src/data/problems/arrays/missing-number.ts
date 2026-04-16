import { Problem } from '../../../types/problem';

export const missingNumber: Problem = {
  id: "missing-number",
  title: "Missing Number",
  difficulty: "Easy",
  topic: "Arrays",
  tags: ["array","hash-table","math","binary-search","bit-manipulation"],
  prompt: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
  constraints: ["n == nums.length","1 <= n <= 10^4","0 <= nums[i] <= n"],
  examples: [
  {
    "input": "nums = [3,0,1]",
    "output": "2",
    "explanation": "n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def missingNumber(nums):\n    res = len(nums)\n    for i in range(len(nums)):\n        res += (i - nums[i])\n    return res",
    "explanation": [
      "Use math sum differences avoiding overflow.",
      "We aggregate indices versus values seamlessly via running accumulator."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n\nclass Solution {\npublic:\n    int missingNumber(std::vector<int>& nums) {\n        int res = nums.size();\n        for(int i=0; i<nums.size(); i++){\n            res ^= i;\n            res ^= nums[i];\n        }\n        return res;\n    }\n};",
    "explanation": [
      "Bitwise XOR solves nicely in O(1) space.",
      "XORing a number against itself sets bits back to 0.",
      "We XOR all numbers 0...N and all items in array; the sole remainder represents the missing numeral."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int missingNumber(int[] nums) {\n        int sum = 0;\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            sum += nums[i];\n        }\n        int expectedSum = n * (n + 1) / 2;\n        return expectedSum - sum;\n    }\n}",
    "explanation": [
      "Gauss's mathematics formula for summation N*(N+1)/2 solves the theoretical sum.",
      "Calculated linear aggregate versus theoretical exact directly leaves missing element."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Missing 0","Missing max n"]
};
