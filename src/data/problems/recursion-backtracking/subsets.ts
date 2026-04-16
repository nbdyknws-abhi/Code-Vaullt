import { Problem } from '../../../types/problem';

export const subsets: Problem = {
  id: "subsets",
  title: "Subsets",
  difficulty: "Medium",
  topic: "Recursion & Backtracking",
  tags: ["array","backtracking","bit-manipulation"],
  prompt: "Given an integer array `nums` of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
  constraints: ["1 <= nums.length <= 10","-10 <= nums[i] <= 10","All the numbers of nums are unique."],
  examples: [
  {
    "input": "nums = [1,2,3]",
    "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def subsets(self, nums: List[int]) -> List[List[int]]:\n        res = []\n        subset = []\n        \n        def backtrack(i):\n            if i >= len(nums):\n                res.append(subset.copy())\n                return\n            \n            # Decision to include nums[i]\n            subset.append(nums[i])\n            backtrack(i + 1)\n            \n            # Decision NOT to include nums[i]\n            subset.pop()\n            backtrack(i + 1)\n            \n        backtrack(0)\n        return res",
    "explanation": [
      "Use a backtracking approach to explore all possible combinations.",
      "At each index, you have two choices: include the current number in the subset or exclude it.",
      "Recursively call the function for the next index for both choices.",
      "The base case is when the index reaches the length of the input array, at which point the current subset is added to the results."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        vector<vector<int>> res;\n        vector<int> current;\n        backtrack(nums, 0, current, res);\n        return res;\n    }\n    \nprivate:\n    void backtrack(vector<int>& nums, int index, vector<int>& current, vector<vector<int>>& res) {\n        res.push_back(current);\n        for (int i = index; i < nums.size(); ++i) {\n            current.push_back(nums[i]);\n            backtrack(nums, i + 1, current, res);\n            current.pop_back();\n        }\n    }\n};",
    "explanation": [
      "Use a recursive backtracking function to generate all possible subsets.",
      "In each call, add the current subset to the result list.",
      "Iterate from the current index to the end of the array, adding each element to the subset and recursing.",
      "After the recursive call, remove the last added element (backtrack) to explore other possibilities."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> res = new ArrayList<>();\n        backtrack(res, new ArrayList<>(), nums, 0);\n        return res;\n    }\n\n    private void backtrack(List<List<Integer>> res, List<Integer> tempList, int[] nums, int start) {\n        res.add(new ArrayList<>(tempList));\n        for (int i = start; i < nums.length; i++) {\n            tempList.add(nums[i]);\n            backtrack(res, tempList, nums, i + 1);\n            tempList.remove(tempList.size() - 1);\n        }\n    }\n}",
    "explanation": [
      "Utilize a recursive backtracking method to explore the entire search space.",
      "The recursion explores subsets of increasing length starting from each element.",
      "The `tempList` holds the current state, which is copied into the result list at every step.",
      "Removing the last element (backtracking) allows the algorithm to explore other branches of the decision tree."
    ]
  }
],
  timeComplexity: "O(2^N * N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Empty array","Single element array"]
};
