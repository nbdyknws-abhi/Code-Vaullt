import { Problem } from '../../../types/problem';

export const slidingWindowMedian: Problem = {
  id: "sliding-window-median",
  title: "Sliding Window Median",
  difficulty: "Hard",
  topic: "Heap & Priority Queue",
  tags: ["array","hash-table","sliding-window","heap-priority-queue"],
  prompt: "Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle values.\n\nYou are given an integer array `nums` and an integer `k`. There is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the median array for each window in the original array.",
  constraints: ["1 <= k <= nums.length <= 10^5","-2^31 <= nums[i] <= 2^31 - 1"],
  examples: [
  {
    "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
    "output": "[1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "import heapq\n\nclass Solution:\n    def medianSlidingWindow(self, nums: List[int], k: int) -> List[float]:\n        small, large = [], [] # max-heap (negated), min-heap\n        for i in range(k):\n            heapq.heappush(small, -nums[i])\n        for i in range(k // 2):\n            heapq.heappush(large, -heapq.heappop(small))\n            \n        def get_median():\n            return -small[0] if k % 2 else (-small[0] + large[0]) / 2.0\n            \n        res = [get_median() * 1.0]\n        to_remove = collections.defaultdict(int)\n        \n        for i in range(k, len(nums)):\n            out_num = nums[i-k]\n            in_num = nums[i]\n            balance = 0\n            \n            # Remove out_num\n            balance += -1 if out_num <= -small[0] else 1\n            to_remove[out_num] += 1\n            \n            # Add in_num\n            if small and in_num <= -small[0]:\n                balance += 1\n                heapq.heappush(small, -in_num)\n            else:\n                balance -= 1\n                heapq.heappush(large, in_num)\n                \n            # Rebalance\n            if balance < 0:\n                heapq.heappush(small, -heapq.heappop(large))\n            elif balance > 0:\n                heapq.heappush(large, -heapq.heappop(small))\n                \n            # Clean heaps\n            while small and to_remove[-small[0]]:\n                to_remove[-small[0]] -= 1\n                heapq.heappop(small)\n            while large and to_remove[large[0]]:\n                to_remove[large[0]] -= 1\n                heapq.heappop(large)\n                \n            res.append(get_median() * 1.0)\n            \n        return res",
    "explanation": [
      "Maintain two balanced heaps (max-heap for small half, min-heap for large half) throughout the sliding window movement.",
      "Since standard heaps don't support deleting arbitrary elements efficiently, use 'Lazy Removal': track numbers to be removed in a hash map and pop them only when they reach the heap top.",
      "After adding a new number and marking the old one for removal, rebalance the heaps to keep the median at the roots.",
      "Total complexity is O(N log K) due to heap operations."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<double> medianSlidingWindow(vector<int>& nums, int k) {\n        multiset<int> window(nums.begin(), nums.begin() + k);\n        auto mid = next(window.begin(), (k - 1) / 2);\n        vector<double> res;\n        \n        for (int i = k; ; i++) {\n            res.push_back(((double)*mid + *next(mid, (k + 1) % 2)) / 2.0);\n            if (i == nums.size()) break;\n            \n            window.insert(nums[i]);\n            if (nums[i] < *mid) mid--;\n            \n            if (nums[i - k] <= *mid) mid++;\n            window.erase(window.find(nums[i - k]));\n        }\n        return res;\n    }\n};",
    "explanation": [
      "Use a C++ `multiset` which maintains elements in sorted order internally (implemented as a Red-Black Tree).",
      "Track a pointer to the median element to avoid full re-traversals.",
      "When a new number is inserted, shift the median pointer if the insertion happens before the current median.",
      "Similarly, adjust the pointer when removing the element that slid out of the window.",
      "Complexity O(N log K) with simpler logic than multi-heap balancing."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public double[] medianSlidingWindow(int[] nums, int k) {\n        PriorityQueue<Integer> left = new PriorityQueue<>(Collections.reverseOrder());\n        PriorityQueue<Integer> right = new PriorityQueue<>();\n        double[] result = new double[nums.length - k + 1];\n\n        for (int i = 0; i < nums.length; i++) {\n            if (left.size() <= right.size()) {\n                right.add(nums[i]);\n                left.add(right.poll());\n            } else {\n                left.add(nums[i]);\n                right.add(left.poll());\n            }\n\n            if (left.size() + right.size() == k) {\n                double median;\n                if (k % 2 == 0) median = (double) left.peek() / 2 + (double) right.peek() / 2;\n                else median = (double) left.peek();\n                result[i - k + 1] = median;\n\n                if (!left.remove(nums[i - k + 1])) {\n                    right.remove(nums[i - k + 1]);\n                }\n            }\n        }\n        return result;\n    }\n}",
    "explanation": [
      "Employ a dual-priority queue architecture to dynamically compute sliding medians.",
      "Java's `PriorityQueue.remove(Object)` is O(K), making the worst-case O(N*K); however, balancing logic ensures medians are readily accessible at heap tops.",
      "Insertions and rebalancing follow the same logic as the Median Finder design.",
      "Floating point division correctly handles even-sized window means."
    ]
  }
],
  timeComplexity: "O(N log K)",
  spaceComplexity: "O(N)",
  edgeCases: ["k is even","k=1"]
};
