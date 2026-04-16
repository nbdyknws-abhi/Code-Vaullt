import { Problem } from '../../../types/problem';

export const combinationSumIi: Problem = {
  id: "combination-sum-ii",
  title: "Combination Sum II",
  difficulty: "Medium",
  topic: "Recursion & Backtracking",
  tags: ["array","backtracking"],
  prompt: "Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`.\n\nEach number in `candidates` may only be used once in the combination.\n\nNote: The solution set must not contain duplicate combinations.",
  constraints: ["1 <= candidates.length <= 100","1 <= candidates[i] <= 50","1 <= target <= 30"],
  examples: [
  {
    "input": "candidates = [10,1,2,7,6,1,5], target = 8",
    "output": "[[1,1,6],[1,2,5],[1,7],[2,6]]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:\n        candidates.sort()\n        res = []\n        \n        def backtrack(cur, pos, target):\n            if target == 0:\n                res.append(cur.copy())\n                return\n            if target <= 0:\n                return\n            \n            prev = -1\n            for i in range(pos, len(candidates)):\n                if candidates[i] == prev:\n                    continue\n                cur.append(candidates[i])\n                backtrack(cur, i + 1, target - candidates[i])\n                cur.pop()\n                prev = candidates[i]\n                \n        backtrack([], 0, target)\n        return res",
    "explanation": [
      "Sort the candidates to easily identify and skip duplicates.",
      "In the backtracking loop, if the current element is the same as the previous one at the same level of recursion, skip it to avoid duplicate combinations.",
      "Pass `i + 1` to the next recursion to ensure each candidate is used at most once.",
      "The target is decremented by the value of the included candidate in each step."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {\n        sort(candidates.begin(), candidates.end());\n        vector<vector<int>> res;\n        vector<int> current;\n        backtrack(candidates, target, 0, current, res);\n        return res;\n    }\n    \nprivate:\n    void backtrack(vector<int>& candidates, int target, int index, vector<int>& current, vector<vector<int>>& res) {\n        if (target == 0) {\n            res.push_back(current);\n            return;\n        }\n        for (int i = index; i < candidates.size(); ++i) {\n            if (i > index && candidates[i] == candidates[i - 1]) continue;\n            if (candidates[i] > target) break;\n            \n            current.push_back(candidates[i]);\n            backtrack(candidates, target - candidates[i], i + 1, current, res);\n            current.pop_back();\n        }\n    }\n};",
    "explanation": [
      "Sort the input array to allow pruning and duplicate handles.",
      "The check `i > index && candidates[i] == candidates[i-1]` prevents generating duplicate combinations by skipping identical elements at the same tree depth.",
      "Use `i + 1` in the recursive call to ensure each array element is used exactly once per path.",
      "Break the loop if the current candidate exceeds the remaining target (since array is sorted)."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public List<List<Integer>> combinationSum2(int[] candidates, int target) {\n        List<List<Integer>> list = new ArrayList<>();\n        Arrays.sort(candidates);\n        backtrack(list, new ArrayList<>(), candidates, target, 0);\n        return list;\n    }\n\n    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] nums, int remain, int start) {\n        if(remain < 0) return;\n        else if(remain == 0) list.add(new ArrayList<>(tempList));\n        else {\n            for(int i = start; i < nums.length; i++) {\n                if(i > start && nums[i] == nums[i-1]) continue; // skip duplicates\n                tempList.add(nums[i]);\n                backtrack(list, tempList, nums, remain - nums[i], i + 1);\n                tempList.remove(tempList.size() - 1);\n            }\n        }\n    }\n}",
    "explanation": [
      "First, sort the array to manage identical values.",
      "In the loop, logic `if(i > start && nums[i] == nums[i-1]) continue` ensures only the first instance of a duplicate is used as the 'start' of a branch at any level.",
      "Decrement the `remain` sum and move carefully to the next index `i + 1`.",
      "Backtrack by removing the tail element to explore sibling branches."
    ]
  }
],
  timeComplexity: "O(2^N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Large input with duplicates"]
};
