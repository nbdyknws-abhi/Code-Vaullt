import { Problem } from '../../../types/problem';

export const houseRobber: Problem = {
  id: "house-robber",
  title: "House Robber",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  tags: ["array","dynamic-programming"],
  prompt: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
  constraints: ["1 <= nums.length <= 100","0 <= nums[i] <= 400"],
  examples: [
  {
    "input": "nums = [1,2,3,1]",
    "output": "4",
    "explanation": "Rob house 1 (money = 1) and rob house 3 (money = 3). Total = 1 + 3 = 4."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def rob(self, nums: List[int]) -> int:\n        rob1, rob2 = 0, 0\n        \n        # [rob1, rob2, n, n+1, ...]\n        for n in nums:\n            temp = max(n + rob1, rob2)\n            rob1 = rob2\n            rob2 = temp\n            \n        return rob2",
    "explanation": [
      "For each house, the choice is either to rob it (summing its value with the max robbed from two houses back) or skip it (taking the max robbed from the previous house).",
      "Use two variables `rob1` and `rob2` to represent the sub-problems of robbing up to `i-2` and `i-1` houses respectively.",
      "The update rule is `rob[i] = max(nums[i] + rob[i-2], rob[i-1])`.",
      "This approach ensures we never rob adjacent houses while maximizing total loot."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        int n = nums.size();\n        if (n == 0) return 0;\n        if (n == 1) return nums[0];\n        \n        int rob1 = 0, rob2 = 0;\n        for (int num : nums) {\n            int current = max(num + rob1, rob2);\n            rob1 = rob2;\n            rob2 = current;\n        }\n        return rob2;\n    }\n};",
    "explanation": [
      "Iterate through the houses and make a local optimal decision for each.",
      "The state `rob2` always holds the maximum possible loot up to the current house.",
      "Space is optimized to O(1) by only keeping track of the last two maximum possible robbing totals.",
      "Handles various edge cases like empty arrays or single-element inputs gracefully."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int rob(int[] nums) {\n        if (nums.length == 0) return 0;\n        int rob1 = 0;\n        int rob2 = 0;\n        for (int num : nums) {\n            int temp = Math.max(num + rob1, rob2);\n            rob1 = rob2;\n            rob2 = temp;\n        }\n        return rob2;\n    }\n}",
    "explanation": [
      "This DP solution uses the recurrence `dp[i] = max(dp[i-2] + nums[i], dp[i-1])`.",
      "By using only two variables instead of a full DP array, space utilization is constant.",
      "Each number in the array is visited exactly once, resulting in linear time complexity.",
      "Final maximum amount is retrieved from the `rob2` variable after the full iteration."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Single house","Two houses"]
};
