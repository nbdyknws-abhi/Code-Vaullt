import { Problem } from '../../../types/problem';

export const bestTimeToBuyAndSellStock: Problem = {
  id: "best-time-to-buy-and-sell-stock",
  title: "Best Time to Buy and Sell Stock",
  difficulty: "Easy",
  topic: "Arrays",
  tags: ["array","dynamic-programming"],
  prompt: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
  constraints: ["1 <= prices.length <= 10^5","0 <= prices[i] <= 10^4"],
  examples: [
  {
    "input": "prices = [7,1,5,3,6,4]",
    "output": "5",
    "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def maxProfit(prices):\n    min_price = float('inf')\n    max_profit = 0\n    for price in prices:\n        if price < min_price:\n            min_price = price\n        elif price - min_price > max_profit:\n            max_profit = price - min_price\n    return max_profit",
    "explanation": [
      "Initialize min_price to infinity and max_profit to 0.",
      "Iterate through each price.",
      "Update min_price if the current price is lower.",
      "Otherwise, calculate profit if we sold today, and update max_profit if it's higher."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <algorithm>\n\nclass Solution {\npublic:\n    int maxProfit(std::vector<int>& prices) {\n        int min_price = 1e9;\n        int max_profit = 0;\n        for (int price : prices) {\n            min_price = std::min(min_price, price);\n            max_profit = std::max(max_profit, price - min_price);\n        }\n        return max_profit;\n    }\n};",
    "explanation": [
      "Track the minimum price seen so far.",
      "Track the maximum profit possible.",
      "In a single pass, update the minimum price and then update the maximum profit using the difference between current price and minimum price."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int maxProfit(int[] prices) {\n        int minPrice = Integer.MAX_VALUE;\n        int maxProfit = 0;\n        for (int price : prices) {\n            if (price < minPrice) {\n                minPrice = price;\n            } else if (price - minPrice > maxProfit) {\n                maxProfit = price - minPrice;\n            }\n        }\n        return maxProfit;\n    }\n}",
    "explanation": [
      "Use two variables: minPrice for the lowest buy point, and maxProfit for the best return.",
      "Loop through the array once.",
      "Update minPrice if we find a cheaper day.",
      "Check if selling today yields a higher profit than maxProfit."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Empty array","Descending array (no profit)"]
};
