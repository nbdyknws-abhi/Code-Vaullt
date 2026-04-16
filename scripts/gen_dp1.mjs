import fs from 'fs';
import path from 'path';

const dpData = {
  "climbing-stairs": {
    title: "Climbing Stairs", difficulty: "Easy", topic: "Dynamic Programming", tags: ["math", "dynamic-programming", "memoization"],
    prompt: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
    constraints: ["1 <= n <= 45"],
    examples: [{input: "n = 2", output: "2", explanation: "1. 1 step + 1 step, 2. 2 steps"}, {input: "n = 3", output: "3", explanation: "1. 1+1+1, 2. 1+2, 3. 2+1"}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["n=1 basic case"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        
        one, two = 1, 2
        for i in range(3, n + 1):
            temp = one + two
            one = two
            two = temp
            
        return two`,
        explanation: ["Recognize that to reach step `n`, you must come from either step `n-1` (1 step) or `n-2` (2 steps).", "This is identical to the Fibonacci sequence formula: `f(n) = f(n-1) + f(n-2)`.", "Use a bottom-up iterative approach with two variables to optimize space from O(N) to O(1).", "Initialize `one=1` and `two=2` for base cases `n=1` and `n=2`."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int first = 1, second = 2;
        for (int i = 3; i <= n; i++) {
            int current = first + second;
            first = second;
            second = current;
        }
        return second;
    }
};`,
        explanation: ["The problem is a variation of Fibonacci sequence where each step depends on the previous two.", "Iterative solution avoids the overhead of recursion and exponential time complexity of brute force.", "Space complexity is O(1) as we only track the last two results.", "Total time is O(N) since we visit each step once in the loop."]
      },
      {
        language: "java",
        code: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int next = a + b;
            a = b;
            b = next;
        }
        return b;
    }
}`,
        explanation: ["This dynamic programming problem can be solved by storing the number of ways to reach each step.", "Since we only ever need the result of the previous two steps, we use two variables `a` and `b` to save space.", "The current result is always the sum of the two preceding results.", "Returning `b` after the loop gives the total ways to reach the `n`th step."]
      }
    ]
  },
  "house-robber": {
    title: "House Robber", difficulty: "Medium", topic: "Dynamic Programming", tags: ["array", "dynamic-programming"],
    prompt: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    examples: [{input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (money = 1) and rob house 3 (money = 3). Total = 1 + 3 = 4."}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["Single house", "Two houses"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def rob(self, nums: List[int]) -> int:
        rob1, rob2 = 0, 0
        
        # [rob1, rob2, n, n+1, ...]
        for n in nums:
            temp = max(n + rob1, rob2)
            rob1 = rob2
            rob2 = temp
            
        return rob2`,
        explanation: ["For each house, the choice is either to rob it (summing its value with the max robbed from two houses back) or skip it (taking the max robbed from the previous house).", "Use two variables `rob1` and `rob2` to represent the sub-problems of robbing up to `i-2` and `i-1` houses respectively.", "The update rule is `rob[i] = max(nums[i] + rob[i-2], rob[i-1])`.", "This approach ensures we never rob adjacent houses while maximizing total loot."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        if (n == 1) return nums[0];
        
        int rob1 = 0, rob2 = 0;
        for (int num : nums) {
            int current = max(num + rob1, rob2);
            rob1 = rob2;
            rob2 = current;
        }
        return rob2;
    }
};`,
        explanation: ["Iterate through the houses and make a local optimal decision for each.", "The state `rob2` always holds the maximum possible loot up to the current house.", "Space is optimized to O(1) by only keeping track of the last two maximum possible robbing totals.", "Handles various edge cases like empty arrays or single-element inputs gracefully."]
      },
      {
        language: "java",
        code: `class Solution {
    public int rob(int[] nums) {
        if (nums.length == 0) return 0;
        int rob1 = 0;
        int rob2 = 0;
        for (int num : nums) {
            int temp = Math.max(num + rob1, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
}`,
        explanation: ["This DP solution uses the recurrence `dp[i] = max(dp[i-2] + nums[i], dp[i-1])`.", "By using only two variables instead of a full DP array, space utilization is constant.", "Each number in the array is visited exactly once, resulting in linear time complexity.", "Final maximum amount is retrieved from the `rob2` variable after the full iteration."]
      }
    ]
  },
  "coin-change": {
    title: "Coin Change", difficulty: "Medium", topic: "Dynamic Programming", tags: ["array", "dynamic-programming", "breadth-first-search"],
    prompt: "You are given an integer array `coins` representing coins of different denominations and an integer `target` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.",
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    examples: [{input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1"}],
    timeComplexity: "O(amount * coins.length)", spaceComplexity: "O(amount)", edgeCases: ["Amount is 0", "No solution possible"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0
        
        for a in range(1, amount + 1):
            for c in coins:
                if a - c >= 0:
                    dp[a] = min(dp[a], 1 + dp[a - c])
                    
        return dp[amount] if dp[amount] != (amount + 1) else -1`,
        explanation: ["Initialize a DP array of size `amount + 1` with a placeholder larger than any potential result (like `amount + 1`).", "Set base case `dp[0] = 0` (0 coins needed for 0 amount).", "For every amount `a`, iterate through all coin types to find the minimum number of coins needed.", "The transition is `dp[a] = min(dp[a], 1 + dp[a - coin])`."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = min(dp[i], 1 + dp[i - coin]);
                }
            }
        }
        return (dp[amount] > amount) ? -1 : dp[amount];
    }
};`,
        explanation: ["Create a results table (DP array) to store the minimum coins for every value from 1 to `amount`.", "The inner loop tests every coin denomination against the current value `i`.", "Use `amount + 1` as the initial value to represent infinity (no solution found yet).", "Return the final index result or -1 if it's still marked as unreachable."]
      },
      {
        language: "java",
        code: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i >= coin) {
                    dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
        explanation: ["Maintain an array `dp` where `dp[i]` is the minimum number of coins to make change for amount `i`.", "Base case is set at `dp[0] = 0`.", "The choice at each step is between the current known minimum or adding 1 coin to a previously calculated smaller sub-problem `dp[i - coin]`.", "Sorting coins array can sometimes optimize this, but the core logic stays O(amount * N)."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'dynamic-programming');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

Object.keys(dpData).forEach(id => {
  const data = dpData[id];
  let varName = id.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
  if (/^[0-9]/.test(varName)) varName = '_' + varName;

  const content = `import { Problem } from '../../../types/problem';

export const ${varName}: Problem = {
  id: "${id}",
  title: "${data.title}",
  difficulty: "${data.difficulty}",
  topic: "${data.topic}",
  tags: ${JSON.stringify(data.tags)},
  prompt: ${JSON.stringify(data.prompt)},
  constraints: ${JSON.stringify(data.constraints)},
  examples: ${JSON.stringify(data.examples, null, 2)},
  solutions: ${JSON.stringify(data.solutions, null, 2)},
  timeComplexity: "${data.timeComplexity}",
  spaceComplexity: "${data.spaceComplexity}",
  edgeCases: ${JSON.stringify(data.edgeCases)}
};
`;
  fs.writeFileSync(path.join(targetDir, `${id}.ts`), content);
});

console.log("Written DP problems part 1.");
