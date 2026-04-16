import { Problem } from '../../../types/problem';

export const topKFrequentElements: Problem = {
  id: "top-k-frequent-elements",
  title: "Top K Frequent Elements",
  difficulty: "Medium",
  topic: "Heap & Priority Queue",
  tags: ["array","hash-table","sorting","heap-priority-queue","bucket-sort"],
  prompt: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.",
  constraints: ["1 <= nums.length <= 10^5","-10^4 <= nums[i] <= 10^4","k is in the range [1, the number of unique elements in the array].","It is guaranteed that the answer is unique."],
  examples: [
  {
    "input": "nums = [1,1,1,2,2,3], k = 2",
    "output": "[1,2]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def topKFrequent(self, nums: List[int], k: int) -> List[int]:\n        count = {}\n        for n in nums:\n            count[n] = 1 + count.get(n, 0)\n            \n        heap = []\n        for n, c in count.items():\n            heapq.heappush(heap, (c, n))\n            if len(heap) > k:\n                heapq.heappop(heap)\n        \n        return [pair[1] for pair in heap]",
    "explanation": [
      "First, count the frequency of each number using a hash map.",
      "Use a min-heap to store tuples of `(frequency, number)`.",
      "Keep the heap size at `k`. When size is exceeded, the element with the lowest frequency is popped.",
      "The numbers remaining in the heap are the `k` most frequent."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        unordered_map<int, int> count;\n        for (int n : nums) count[n]++;\n        \n        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;\n        for (auto const& [val, freq] : count) {\n            minHeap.push({freq, val});\n            if (minHeap.size() > k) minHeap.pop();\n        }\n        \n        vector<int> res;\n        while (!minHeap.empty()) {\n            res.push_back(minHeap.top().second);\n            minHeap.pop();\n        }\n        return res;\n    }\n};",
    "explanation": [
      "Count frequencies using a hash map.",
      "Push `{frequency, value}` pairs into a min-priority queue.",
      "Strictly maintain queue size at `k` to ensure optimal performance.",
      "The min-heap property ensures that lower frequency elements are pruned first."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> count = new HashMap<>();\n        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);\n        \n        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);\n        for (int key : count.keySet()) {\n            minHeap.add(new int[]{count.get(key), key});\n            if (minHeap.size() > k) minHeap.poll();\n        }\n        \n        int[] res = new int[k];\n        for (int i = 0; i < k; i++) res[i] = minHeap.poll()[1];\n        return res;\n    }\n}",
    "explanation": [
      "Map-based counting followed by heap-based selection.",
      "The custom comparator `(a, b) -> a[0] - b[0]` sorts the heap by frequency in ascending order.",
      "Extracting from the min-heap provides the `k` most frequent elements.",
      "Time complexity is O(N log K)."
    ]
  }
],
  timeComplexity: "O(N log K) or O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["k equals number of unique elements"]
};
