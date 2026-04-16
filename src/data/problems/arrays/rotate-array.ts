import { Problem } from '../../../types/problem';

export const rotateArray: Problem = {
  id: "rotate-array",
  title: "Rotate Array",
  difficulty: "Medium",
  topic: "Arrays",
  tags: ["array","math","two-pointers"],
  prompt: "Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.",
  constraints: ["1 <= nums.length <= 10^5","-2^31 <= nums[i] <= 2^31 - 1","0 <= k <= 10^5"],
  examples: [
  {
    "input": "nums = [1,2,3,4,5,6,7], k = 3",
    "output": "[5,6,7,1,2,3,4]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def rotate(nums, k):\n    k %= len(nums)\n    \n    def reverse(l, r):\n        while l < r:\n            nums[l], nums[r] = nums[r], nums[l]\n            l, r = l + 1, r - 1\n            \n    reverse(0, len(nums) - 1)\n    reverse(0, k - 1)\n    reverse(k, len(nums) - 1)",
    "explanation": [
      "Module k by array length to handle giant shifts.",
      "Reverse the entire array.",
      "Reverse the first k elements.",
      "Reverse the remaining elements to land sequence correctly."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <algorithm>\n\nclass Solution {\npublic:\n    void rotate(std::vector<int>& nums, int k) {\n        k = k % nums.size();\n        std::reverse(nums.begin(), nums.end());\n        std::reverse(nums.begin(), nums.begin() + k);\n        std::reverse(nums.begin() + k, nums.end());\n    }\n};",
    "explanation": [
      "Handle rotation wrap-arround via modulus.",
      "Standard reverse operations provided by algorithms header.",
      "Execute full reverse, then partial chunked reverse."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public void rotate(int[] nums, int k) {\n        k %= nums.length;\n        reverse(nums, 0, nums.length - 1);\n        reverse(nums, 0, k - 1);\n        reverse(nums, k, nums.length - 1);\n    }\n    \n    public void reverse(int[] nums, int start, int end) {\n        while (start < end) {\n            int temp = nums[start];\n            nums[start] = nums[end];\n            nums[end] = temp;\n            start++;\n            end--;\n        }\n    }\n}",
    "explanation": [
      "Define reverse helper with left/right converging pointers.",
      "Bind large k jumps.",
      "Full -> Segment A -> Segment B inversions lock placement in O(N)."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["k > n","k = 0"]
};
