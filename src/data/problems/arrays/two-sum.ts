import { Problem } from '../../../types/problem';

export const twoSum: Problem = {
  id: "two-sum",
  title: "Two Sum",
  difficulty: "Easy",
  topic: "Arrays",
  tags: ["hash-table","array"],
  prompt: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
  constraints: ["2 <= nums.length <= 10^4","-10^9 <= nums[i] <= 10^9","-10^9 <= target <= 10^9","Only one valid answer exists."],
  examples: [
  {
    "input": "nums = [2,7,11,15], target = 9",
    "output": "[0,1]",
    "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []",
    "explanation": [
      "Use a hash map to store numbers we've seen and their indices.",
      "Iterate through the array.",
      "For each number, check if its complement (target - current number) exists in the hash map.",
      "If it does, return the current index and the complement's index."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        std::unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); ++i) {\n            int complement = target - nums[i];\n            if (seen.count(complement)) {\n                return {seen[complement], i};\n            }\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};",
    "explanation": [
      "Use an unordered_map to store values and their indices.",
      "Iterate through the vector.",
      "Check if the required complement is already in our map.",
      "If found, return the pair of indices."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (seen.containsKey(complement)) {\n                return new int[] { seen.get(complement), i };\n            }\n            seen.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}",
    "explanation": [
      "Initialize a HashMap to store traversed elements and their indices.",
      "Loop through the array elements.",
      "If the target minus the current element is in the map, a match is found.",
      "Otherwise, add the current element to the map."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Negative numbers","Zeroes"]
};
