import { Problem } from '../../../types/problem';

export const _3sum: Problem = {
  id: "3sum",
  title: "3Sum",
  difficulty: "Medium",
  topic: "Arrays",
  tags: ["array","two-pointers","sorting"],
  prompt: "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
  constraints: ["3 <= nums.length <= 3000","-10^5 <= nums[i] <= 10^5"],
  examples: [
  {
    "input": "nums = [-1,0,1,2,-1,-4]",
    "output": "[[-1,-1,2],[-1,0,1]]",
    "explanation": "The distinct triplets are [-1,0,1] and [-1,-1,2]."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def threeSum(nums):\n    res = []\n    nums.sort()\n    for i in range(len(nums)):\n        if i > 0 and nums[i] == nums[i-1]:\n            continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s > 0:\n                r -= 1\n            elif s < 0:\n                l += 1\n            else:\n                res.append([nums[i], nums[l], nums[r]])\n                l += 1\n                while nums[l] == nums[l-1] and l < r:\n                    l += 1\n    return res",
    "explanation": [
      "Sort the array first to handle duplicates easily.",
      "Iterate fixed pointer i through the array.",
      "Use two pointers (l, r) to find pairs that sum to -nums[i].",
      "Skip duplicate values for i and l to avoid duplicate triplets."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <algorithm>\n\nclass Solution {\npublic:\n    std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {\n        std::vector<std::vector<int>> res;\n        std::sort(nums.begin(), nums.end());\n        for (int i = 0; i < nums.size(); i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.size() - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum > 0) r--;\n                else if (sum < 0) l++;\n                else {\n                    res.push_back({nums[i], nums[l], nums[r]});\n                    l++;\n                    while (nums[l] == nums[l - 1] && l < r) l++;\n                }\n            }\n        }\n        return res;\n    }\n};",
    "explanation": [
      "Sort the array to enable two-pointer search.",
      "Iterate using a standard loop, skipping adjacent duplicate heads.",
      "Use two pointers converging from ends of the remaining subset.",
      "Advance left pointer past duplicates upon finding a valid triplet."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;\n\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> res = new ArrayList<>();\n        for (int i = 0; i < nums.length && nums[i] <= 0; ++i) {\n            if (i == 0 || nums[i - 1] != nums[i]) {\n                int lo = i + 1, hi = nums.length - 1;\n                while (lo < hi) {\n                    int sum = nums[i] + nums[lo] + nums[hi];\n                    if (sum < 0) {\n                        lo++;\n                    } else if (sum > 0) {\n                        hi--;\n                    } else {\n                        res.add(Arrays.asList(nums[i], nums[lo++], nums[hi--]));\n                        while (lo < hi && nums[lo] == nums[lo - 1])\n                            ++lo;\n                    }\n                }\n            }\n        }\n        return res;\n    }\n}",
    "explanation": [
      "Arrays.sort ensures duplicates group together and allows early stopping if nums[i] > 0.",
      "Iterate keeping track of the target as -nums[i].",
      "Use two pointers (lo, hi) searching for the inverse sums.",
      "Move pointers safely bypassing duplicates."
    ]
  }
],
  timeComplexity: "O(N^2)",
  spaceComplexity: "O(1)",
  edgeCases: ["All zeros","Fewer than 3 elements"]
};
