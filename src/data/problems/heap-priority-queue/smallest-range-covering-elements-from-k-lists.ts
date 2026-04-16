import { Problem } from '../../../types/problem';

export const smallestRangeCoveringElementsFromKLists: Problem = {
  id: "smallest-range-covering-elements-from-k-lists",
  title: "Smallest Range Covering Elements",
  difficulty: "Hard",
  topic: "Heap & Priority Queue",
  tags: ["array","hash-table","greedy","sliding-window","sorting","heap-priority-queue"],
  prompt: "You have `k` lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the `k` lists.\n\nWe define the range [a, b] is smaller than range [c, d] if `b - a < d - c` or `a < c` if `b - a == d - c`.",
  constraints: ["nums.length == k","1 <= k <= 3500","1 <= nums[i].length <= 50","-10^5 <= nums[i][j] <= 10^5","nums[i] is sorted in non-decreasing order."],
  examples: [
  {
    "input": "nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]",
    "output": "[20,24]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def smallRange(self, nums: List[List[int]]) -> List[int]:\n        minHeap = []\n        curMax = -float('inf')\n        for i in range(len(nums)):\n            heapq.heappush(minHeap, (nums[i][0], i, 0))\n            curMax = max(curMax, nums[i][0])\n            \n        res = [-float('inf'), float('inf')]\n        \n        while len(minHeap) == len(nums):\n            curMin, row, col = heapq.heappop(minHeap)\n            \n            if (curMax - curMin) < (res[1] - res[0]):\n                res = [curMin, curMax]\n                \n            if col + 1 < len(nums[row]):\n                nextVal = nums[row][col+1]\n                heapq.heappush(minHeap, (nextVal, row, col + 1))\n                curMax = max(curMax, nextVal)\n                \n        return res",
    "explanation": [
      "This can be modeled as finding a range that contains at least one pointer from each list.",
      "Use a min-heap to keep track of the current values pointed to in each of the `k` lists.",
      "Also maintain a `curMax` of all values currently in the heap.",
      "The potential range is always `[min_in_heap, curMax]`. Extract the minimum and replace it with the next element from that same list.",
      "The process stops when one of the lists is exhausted."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<int> smallestRange(vector<vector<int>>& nums) {\n        int k = nums.size();\n        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;\n        int maxVal = INT_MIN;\n        for (int i = 0; i < k; i++) {\n            pq.push({nums[i][0], i, 0});\n            maxVal = max(maxVal, nums[i][0]);\n        }\n        \n        vector<int> res = {-1000000, 1000000};\n        while (pq.size() == k) {\n            auto curr = pq.top(); pq.pop();\n            int minVal = curr[0], row = curr[1], col = curr[2];\n            \n            if (maxVal - minVal < res[1] - res[0]) {\n                res = {minVal, maxVal};\n            }\n            \n            if (col + 1 < nums[row].size()) {\n                int val = nums[row][col + 1];\n                pq.push({val, row, col + 1});\n                maxVal = max(maxVal, val);\n            }\n        }\n        return res;\n    }\n};",
    "explanation": [
      "Leverage a min-priority queue to maintain the lower bound of the current candidate range across $k$ sorted arrays.",
      "Concurrently track the global maximum of all enqueued elements.",
      "Each extraction from the heap potentially tightens the range, which we greedily update.",
      "The O(N log K) complexity is highly efficient for the given constraints."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int[] smallestRange(List<List<Integer>> nums) {\n        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);\n        int max = Integer.MIN_VALUE;\n        for (int i = 0; i < nums.size(); i++) {\n            int val = nums.get(i).get(0);\n            pq.add(new int[]{val, i, 0});\n            max = Math.max(max, val);\n        }\n        int start = 0, end = Integer.MAX_VALUE;\n        while (pq.size() == nums.size()) {\n            int[] curr = pq.poll();\n            if (max - curr[0] < end - start) {\n                start = curr[0];\n                end = max;\n            }\n            if (curr[2] + 1 < nums.get(curr[1]).size()) {\n                int next = nums.get(curr[1]).get(curr[2] + 1);\n                pq.add(new int[]{next, curr[1], curr[2] + 1});\n                max = Math.max(max, next);\n            }\n        }\n        return new int[]{start, end};\n    }\n}",
    "explanation": [
      "Use a PriorityQueue to simulate an n-way pointer traversal across the sorted lists.",
      "Each state in the heap represents a valid 'cut' through all lists; the spread between the min and max determines the range size.",
      "Pointer progression mimics the logic used in Merge K Sorted Lists, ensuring optimal traversal.",
      "The earliest list depletion effectively establishes that no smaller range can satisfy the multi-list requirement."
    ]
  }
],
  timeComplexity: "O(N log K) where N is total elements",
  spaceComplexity: "O(K)",
  edgeCases: ["Lists of size 1","Identical numbers across lists"]
};
