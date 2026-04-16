import { Problem } from '../../../types/problem';

export const combinationSum: Problem = {
  id: "combination-sum",
  title: "Combination Sum",
  difficulty: "Medium",
  topic: "Recursion & Backtracking",
  tags: ["array","backtracking"],
  prompt: "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order.\n\nThe same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.",
  constraints: ["1 <= candidates.length <= 30","1 <= candidates[i] <= 200","All elements of candidates are distinct.","1 <= target <= 500"],
  examples: [
  {
    "input": "candidates = [2,3,6,7], target = 7",
    "output": "[[2,2,3],[7]]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:\n        res = []\n        \n        def backtrack(i, cur, total):\n            if total == target:\n                res.append(cur.copy())\n                return\n            if i >= len(candidates) or total > target:\n                return\n            \n            # Decision to include candidates[i]\n            cur.append(candidates[i])\n            backtrack(i, cur, total + candidates[i])\n            \n            # Decision NOT to include candidates[i]\n            cur.pop()\n            backtrack(i + 1, cur, total)\n            \n        backtrack(0, [], 0)\n        return res",
    "explanation": [
      "Apply a binary choice backtracking pattern at each element.",
      "Choose to include the current candidate (can be repeated, so index `i` remains the same) or skip it (index `i` moves to `i+1`).",
      "Prune the search if the current sum exceeds the target.",
      "Base cases include hitting the target sum (save result) or exhausting options."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        vector<vector<int>> res;\n        vector<int> current;\n        backtrack(candidates, target, 0, current, res);\n        return res;\n    }\n    \nprivate:\n    void backtrack(vector<int>& candidates, int target, int index, vector<int>& current, vector<vector<int>>& res) {\n        if (target == 0) {\n            res.push_back(current);\n            return;\n        }\n        for (int i = index; i < candidates.size(); ++i) {\n            if (candidates[i] <= target) {\n                current.push_back(candidates[i]);\n                backtrack(candidates, target - candidates[i], i, current, res);\n                current.pop_back();\n            }\n        }\n    }\n};",
    "explanation": [
      "Use a recursive search that subtracts candidates from the target value.",
      "By passing the current index `i` into the next recursive call, we allow reusing the same candidate multiple times.",
      "The loop ensures we explore all candidates starting from the current index.",
      "The condition `candidates[i] <= target` helps prune invalid path branches."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        List<List<Integer>> list = new ArrayList<>();\n        Arrays.sort(candidates);\n        backtrack(list, new ArrayList<>(), candidates, target, 0);\n        return list;\n    }\n\n    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] nums, int remain, int start){\n        if(remain < 0) return;\n        else if(remain == 0) list.add(new ArrayList<>(tempList));\n        else{ \n            for(int i = start; i < nums.length; i++){\n                tempList.add(nums[i]);\n                backtrack(list, tempList, nums, remain - nums[i], i); // not i + 1 because we can reuse same elements\n                tempList.remove(tempList.size() - 1);\n            }\n        }\n    }\n}",
    "explanation": [
      "The algorithm uses recursion to explore all paths where the sum equals the target.",
      "Sorting the candidates initially allows for more effective pruning if needed (though not strictly required for this logic).",
      "The `remain` parameter tracks the remaining sum needed to be zero.",
      "Reusing the index `i` in the recursive call enables multiple choices of the same candidate."
    ]
  }
],
  timeComplexity: "O(N^(T/M)) where T is target, M is min value",
  spaceComplexity: "O(T/M)",
  edgeCases: ["No combinations possible"]
};
