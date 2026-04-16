import { Problem } from '../../../types/problem';

export const kthLargestElementInAStream: Problem = {
  id: "kth-largest-element-in-a-stream",
  title: "Kth Largest Element in a Stream",
  difficulty: "Easy",
  topic: "Heap & Priority Queue",
  tags: ["tree","design","binary-search-tree","heap-priority-queue","binary-tree","data-stream"],
  prompt: "Design a class to find the `k`th largest element in a stream. Note that it is the `k`th largest element in the sorted order, not the `k`th distinct element.\n\nImplement `KthLargest` class:\n- `KthLargest(int k, int[] nums)` Initializes the object with the integer `k` and the stream of integers `nums`.\n- `int add(int val)` Appends the integer `val` to the stream and returns the element representing the `k`th largest element in the stream.",
  constraints: ["1 <= k <= 10^4","0 <= nums.length <= 10^4","-10^4 <= nums[i] <= 10^4","-10^4 <= val <= 10^4","At most 10^4 calls will be made to add."],
  examples: [
  {
    "input": "[\"KthLargest\", \"add\", \"add\", \"add\", \"add\", \"add\"]\n[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]",
    "output": "[null, 4, 5, 5, 8, 8]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class KthLargest:\n    def __init__(self, k: int, nums: List[int]):\n        self.minHeap = nums\n        self.k = k\n        heapq.heapify(self.minHeap)\n        while len(self.minHeap) > k:\n            heapq.heappop(self.minHeap)\n\n    def add(self, val: int) -> int:\n        heapq.heappush(self.minHeap, val)\n        if len(self.minHeap) > self.k:\n            heapq.heappop(self.minHeap)\n        return self.minHeap[0]",
    "explanation": [
      "A min-heap is perfect for tracking 'top k' elements because the `k`th largest is strictly the smallest of the `k` largest items.",
      "Initialize by heapifying the input and pruning down to size `k`.",
      "The `add` method maintains this invariant by pushing the new value and potentially popping the new minimum.",
      "Returns the root of the min-heap in O(1) after O(log k) insertion."
    ]
  },
  {
    "language": "cpp",
    "code": "class KthLargest {\n    priority_queue<int, vector<int>, greater<int>> pq;\n    int K;\npublic:\n    KthLargest(int k, vector<int>& nums) {\n        K = k;\n        for (int n : nums) add(n);\n    }\n    \n    int add(int val) {\n        pq.push(val);\n        if (pq.size() > K) pq.pop();\n        return pq.top();\n    }\n};",
    "explanation": [
      "Use a min-priority queue to keep exactly `k` largest elements from the data stream.",
      "The `add` operation leverages the priority queue's ability to maintain order in logarithmic time.",
      "Size management ensures the smallest of the largest `k` (i.e., the `k`th largest) is always at the top.",
      "Constant space O(k) relative to the stream size."
    ]
  },
  {
    "language": "java",
    "code": "class KthLargest {\n    private PriorityQueue<Integer> pq;\n    private int k;\n\n    public KthLargest(int k, int[] nums) {\n        this.k = k;\n        pq = new PriorityQueue<>();\n        for (int n : nums) add(n);\n    }\n    \n    public int add(int val) {\n        pq.add(val);\n        if (pq.size() > k) pq.poll();\n        return pq.peek();\n    }\n}",
    "explanation": [
      "Implement the stream listener using a Java `PriorityQueue`.",
      "Initializing with existing numbers runs `add` iteratively to prime the heap.",
      "The `peek` operation on the min-heap directly reveals the `k`th largest value.",
      "Efficiently handles continuous stream updates without complete re-sorting."
    ]
  }
],
  timeComplexity: "O(log K) for add, O(K) for initialization",
  spaceComplexity: "O(K)",
  edgeCases: ["Initialize with fewer than k elements"]
};
