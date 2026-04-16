import fs from 'fs';
import path from 'path';

const arraysData = {
  "two-sum": {
    title: "Two Sum", difficulty: "Easy", topic: "Arrays", tags: ["hash-table", "array"],
    prompt: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists."],
    examples: [{input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["Negative numbers", "Zeroes"],
    solutions: [
      {
        language: "python",
        code: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        explanation: ["Use a hash map to store numbers we've seen and their indices.", "Iterate through the array.", "For each number, check if its complement (target - current number) exists in the hash map.", "If it does, return the current index and the complement's index."]
      },
      {
        language: "cpp",
        code: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
        explanation: ["Use an unordered_map to store values and their indices.", "Iterate through the vector.", "Check if the required complement is already in our map.", "If found, return the pair of indices."]
      },
      {
        language: "java",
        code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
        explanation: ["Initialize a HashMap to store traversed elements and their indices.", "Loop through the array elements.", "If the target minus the current element is in the map, a match is found.", "Otherwise, add the current element to the map."]
      }
    ]
  },
  "best-time-to-buy-and-sell-stock": {
    title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays", tags: ["array", "dynamic-programming"],
    prompt: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    examples: [{input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["Empty array", "Descending array (no profit)"],
    solutions: [
      {
        language: "python",
        code: `def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_profit:
            max_profit = price - min_price
    return max_profit`,
        explanation: ["Initialize min_price to infinity and max_profit to 0.", "Iterate through each price.", "Update min_price if the current price is lower.", "Otherwise, calculate profit if we sold today, and update max_profit if it's higher."]
      },
      {
        language: "cpp",
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxProfit(std::vector<int>& prices) {
        int min_price = 1e9;
        int max_profit = 0;
        for (int price : prices) {
            min_price = std::min(min_price, price);
            max_profit = std::max(max_profit, price - min_price);
        }
        return max_profit;
    }
};`,
        explanation: ["Track the minimum price seen so far.", "Track the maximum profit possible.", "In a single pass, update the minimum price and then update the maximum profit using the difference between current price and minimum price."]
      },
      {
        language: "java",
        code: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`,
        explanation: ["Use two variables: minPrice for the lowest buy point, and maxProfit for the best return.", "Loop through the array once.", "Update minPrice if we find a cheaper day.", "Check if selling today yields a higher profit than maxProfit."]
      }
    ]
  },
  "maximum-subarray-kadanes-algorithm": {
    title: "Maximum Subarray", difficulty: "Medium", topic: "Arrays", tags: ["array", "divide-and-conquer", "dynamic-programming"],
    prompt: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [{input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6."}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["All negative numbers", "Single element array"],
    solutions: [
      {
        language: "python",
        code: `def maxSubArray(nums):
    current_sum = max_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum`,
        explanation: ["Initialize current_sum and max_sum to the first element.", "Iterate starting from the second element.", "At each step, decide whether to add the element to the current subarray or start a new subarray.", "Update max_sum if current_sum is greater."]
      },
      {
        language: "cpp",
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxSubArray(std::vector<int>& nums) {
        int current_sum = nums[0];
        int max_sum = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            current_sum = std::max(nums[i], current_sum + nums[i]);
            max_sum = std::max(max_sum, current_sum);
        }
        return max_sum;
    }
};`,
        explanation: ["This is Kadane's Algorithm.", "Keep a running total (current_sum) and the absolute maximum (max_sum).", "If current_sum becomes less than the current element, it means starting fresh from the current element is better."]
      },
      {
        language: "java",
        code: `class Solution {
    public int maxSubArray(int[] nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,
        explanation: ["Set base cases for currentSum and maxSum using the first array item.", "Iterate from the second item.", "currentSum computes the local maximum subarray ending at index i.", "maxSum tracks the global maximum subarray sum across all indices."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'arrays');

Object.keys(arraysData).forEach(id => {
  const data = arraysData[id];
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

console.log("Written detailed array problems.");
