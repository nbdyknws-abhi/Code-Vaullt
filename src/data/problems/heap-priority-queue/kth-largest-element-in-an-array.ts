import { Problem } from '../../../types/problem';

export const kthLargestElementInAnArray: Problem = {
  id: "kth-largest-element-in-an-array",
  title: "Kth Largest Element in an Array",
  difficulty: "Medium",
  topic: "Heap & Priority Queue",
  tags: ["array","divide-and-conquer","sorting","heap-priority-queue","quickselect"],
  prompt: "Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.\n\nNote that it is the `k`th largest element in the sorted order, not the `k`th distinct element.",
  constraints: ["1 <= k <= nums.length <= 10^5","-10^4 <= nums[i] <= 10^4"],
  examples: [
  {
    "input": "nums = [3,2,1,5,6,4], k = 2",
    "output": "5"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def findKthLargest(self, nums: List[int], k: int) -> int:\n        minHeap = []\n        for n in nums:\n            heapq.heappush(minHeap, n)\n            if len(minHeap) > k:\n                heapq.heappop(minHeap)\n        return minHeap[0]",
    "explanation": [
      "Use a min-heap to keep track of the `k` largest elements seen so far.",
      "Iterate through the array, pushing each element onto the heap.",
      "If the heap size exceeds `k`, pop the smallest element (the top of the min-heap).",
      "After the loop, the top of the heap is the `k`th largest element."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> minHeap;\n        for (int n : nums) {\n            minHeap.push(n);\n            if (minHeap.size() > k) {\n                minHeap.pop();\n            }\n        }\n        return minHeap.top();\n    }\n};",
    "explanation": [
      "A min-priority queue efficiently maintains the top `k` elements.",
      "The `greater<int>` comparator ensures the smallest of the `k` largest elements is at the top.",
      "Pushing an element is O(log k), making the total time complexity O(n log k).",
      "Space complexity is O(k) for the priority queue."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        for (int n : nums) {\n            minHeap.add(n);\n            if (minHeap.size() > k) {\n                minHeap.poll();\n            }\n        }\n        return minHeap.peek();\n    }\n}",
    "explanation": [
      "In Java, `PriorityQueue` is a min-heap by default.",
      "By limiting the heap size to `k`, we ensure the `k`th largest element always stays at the top.",
      "This approach is more memory-efficient than sorting the whole array if `k` is small.",
      "Time complexity is O(N log K)."
    ]
  }
],
  timeComplexity: "O(N log K)",
  spaceComplexity: "O(K)",
  edgeCases: ["k=1","k=nums.length"]
};
