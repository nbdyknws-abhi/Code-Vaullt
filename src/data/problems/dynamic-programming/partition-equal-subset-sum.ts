import { Problem } from '../../../types/problem';

export const partitionEqualSubsetSum: Problem = {
  id: "partition-equal-subset-sum",
  title: "Partition Equal Subset Sum",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  tags: ["array","dynamic-programming"],
  prompt: "Given a non-empty array `nums` containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.",
  constraints: ["1 <= nums.length <= 200","1 <= nums[i] <= 100"],
  examples: [
  {
    "input": "nums = [1,5,11,5]",
    "output": "true",
    "explanation": "The array can be partitioned as [1, 5, 5] and [11]."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def canPartition(self, nums: List[int]) -> bool:\n        if sum(nums) % 2:\n            return False\n            \n        target = sum(nums) // 2\n        dp = set([0])\n        \n        for n in nums:\n            nextDP = set()\n            for t in dp:\n                if t + n == target:\n                    return True\n                nextDP.add(t + n)\n                nextDP.add(t)\n            dp = nextDP\n            \n        return target in dp",
    "explanation": [
      "If the total sum is odd, it's impossible to partition into two equal integers.",
      "Goal is to find a subset that sums exactly to half of the total sum.",
      "Use a set of all possible sums generated so far starting from 0.",
      "Iterate through each number, creating new possible sums by adding it to existing ones.",
      "If the target sum is ever reached, return early."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        int sum = 0;\n        for (int n : nums) sum += n;\n        if (sum % 2 != 0) return false;\n        \n        int target = sum / 2;\n        vector<bool> dp(target + 1, false);\n        dp[0] = true;\n        \n        for (int n : nums) {\n            for (int i = target; i >= n; i--) {\n                if (dp[i - n]) dp[i] = true;\n            }\n        }\n        return dp[target];\n    }\n};",
    "explanation": [
      "Translate problem to 0/1 Knapsack: can we pick items to get a total weight of `sum / 2`?",
      "Use a boolean array where `dp[i]` is true if sum `i` is possible.",
      "Inner loop runs backwards to ensure each number is used only once (preventing reuse logic flaws).",
      "Time complexity O(N * target), space O(target)."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public boolean canPartition(int[] nums) {\n        int sum = 0;\n        for (int n : nums) sum += n;\n        if (sum % 2 != 0) return false;\n        \n        int target = sum / 2;\n        boolean[] dp = new boolean[target + 1];\n        dp[0] = true;\n        \n        for (int num : nums) {\n            for (int i = target; i >= num; i--) {\n                if (dp[i - num]) {\n                    dp[i] = true;\n                }\n            }\n        }\n        return dp[target];\n    }\n}",
    "explanation": [
      "Perform an existence check for a subset sum using dynamic programming.",
      "Calculating only for half-sum significantly reduces the state space of the algorithm.",
      "The backward traversal of the `dp` array is crucial for memory-efficient 0/1 knapsack implementation.",
      "Algorithm returns true immediately if the half-sum index in the boolean array is marked reachable."
    ]
  }
],
  timeComplexity: "O(N * Sum)",
  spaceComplexity: "O(Sum)",
  edgeCases: ["Sum is odd","Single element"]
};
