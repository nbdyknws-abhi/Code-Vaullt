import { Problem } from '../../../types/problem';

export const coinChange: Problem = {
  id: "coin-change",
  title: "Coin Change",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  tags: ["array","dynamic-programming","breadth-first-search"],
  prompt: "You are given an integer array `coins` representing coins of different denominations and an integer `target` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.",
  constraints: ["1 <= coins.length <= 12","1 <= coins[i] <= 2^31 - 1","0 <= amount <= 10^4"],
  examples: [
  {
    "input": "coins = [1,2,5], amount = 11",
    "output": "3",
    "explanation": "11 = 5 + 5 + 1"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        dp = [amount + 1] * (amount + 1)\n        dp[0] = 0\n        \n        for a in range(1, amount + 1):\n            for c in coins:\n                if a - c >= 0:\n                    dp[a] = min(dp[a], 1 + dp[a - c])\n                    \n        return dp[amount] if dp[amount] != (amount + 1) else -1",
    "explanation": [
      "Initialize a DP array of size `amount + 1` with a placeholder larger than any potential result (like `amount + 1`).",
      "Set base case `dp[0] = 0` (0 coins needed for 0 amount).",
      "For every amount `a`, iterate through all coin types to find the minimum number of coins needed.",
      "The transition is `dp[a] = min(dp[a], 1 + dp[a - coin])`."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        \n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (i - coin >= 0) {\n                    dp[i] = min(dp[i], 1 + dp[i - coin]);\n                }\n            }\n        }\n        return (dp[amount] > amount) ? -1 : dp[amount];\n    }\n};",
    "explanation": [
      "Create a results table (DP array) to store the minimum coins for every value from 1 to `amount`.",
      "The inner loop tests every coin denomination against the current value `i`.",
      "Use `amount + 1` as the initial value to represent infinity (no solution found yet).",
      "Return the final index result or -1 if it's still marked as unreachable."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        \n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (i >= coin) {\n                    dp[i] = Math.min(dp[i], 1 + dp[i - coin]);\n                }\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}",
    "explanation": [
      "Maintain an array `dp` where `dp[i]` is the minimum number of coins to make change for amount `i`.",
      "Base case is set at `dp[0] = 0`.",
      "The choice at each step is between the current known minimum or adding 1 coin to a previously calculated smaller sub-problem `dp[i - coin]`.",
      "Sorting coins array can sometimes optimize this, but the core logic stays O(amount * N)."
    ]
  }
],
  timeComplexity: "O(amount * coins.length)",
  spaceComplexity: "O(amount)",
  edgeCases: ["Amount is 0","No solution possible"]
};
