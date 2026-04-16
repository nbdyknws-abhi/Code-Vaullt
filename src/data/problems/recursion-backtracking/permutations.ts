import { Problem } from '../../../types/problem';

export const permutations: Problem = {
  id: "permutations",
  title: "Permutations",
  difficulty: "Medium",
  topic: "Recursion & Backtracking",
  tags: ["array","backtracking"],
  prompt: "Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.",
  constraints: ["1 <= nums.length <= 6","-10 <= nums[i] <= 10","All the integers of nums are unique."],
  examples: [
  {
    "input": "nums = [1,2,3]",
    "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        res = []\n        \n        def backtrack(start):\n            if start == len(nums):\n                res.append(nums[:])\n                return\n            \n            for i in range(start, len(nums)):\n                nums[start], nums[i] = nums[i], nums[start]\n                backtrack(start + 1)\n                nums[start], nums[i] = nums[i], nums[start]\n                \n        backtrack(0)\n        return res",
    "explanation": [
      "Generate permutations by swapping elements within the input array.",
      "The `backtrack` function fixes one element at the `start` position and recurses to permute the rest.",
      "The swap back is the 'backtracking' step that restores the array for the next iteration of the loop.",
      "Base case occurs when `start` reaches the end of the array, meaning one complete permutation has been formed."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        vector<vector<int>> res;\n        backtrack(nums, 0, res);\n        return res;\n    }\n\nprivate:\n    void backtrack(vector<int>& nums, int start, vector<vector<int>>& res) {\n        if (start == nums.size()) {\n            res.push_back(nums);\n            return;\n        }\n        for (int i = start; i < nums.size(); ++i) {\n            swap(nums[start], nums[i]);\n            backtrack(nums, start + 1, res);\n            swap(nums[start], nums[i]);\n        }\n    }\n};",
    "explanation": [
      "Implement a recursive backtracking algorithm using in-place swaps.",
      "The `start` parameter indicates the current position being fixed.",
      "Iterate through all possible candidates for the current position by swapping.",
      "A second swap (backtrack) restores original ordering to ensure all branches are explored correctly."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        List<List<Integer>> list = new ArrayList<>();\n        backtrack(list, new ArrayList<>(), nums);\n        return list;\n    }\n\n    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] nums){\n        if(tempList.size() == nums.length){\n            list.add(new ArrayList<>(tempList));\n        } else{\n            for(int i = 0; i < nums.length; i++){ \n                if(tempList.contains(nums[i])) continue; // element already exists, skip\n                tempList.add(nums[i]);\n                backtrack(list, tempList, nums);\n                tempList.remove(tempList.size() - 1);\n            }\n        }\n    }\n}",
    "explanation": [
      "Use a recursive approach to build permutations element by element.",
      "The `tempList` keeps track of the current permutation being built.",
      "Check if an element is already in the `tempList` to handle the 'distinct integers' requirement without extra space indices.",
      "Removing the last element (backtracking) resets the state for searching the next permutation branch."
    ]
  }
],
  timeComplexity: "O(N! * N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Single element array"]
};
