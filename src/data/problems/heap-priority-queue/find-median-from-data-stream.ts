import { Problem } from '../../../types/problem';

export const findMedianFromDataStream: Problem = {
  id: "find-median-from-data-stream",
  title: "Find Median from Data Stream",
  difficulty: "Hard",
  topic: "Heap & Priority Queue",
  tags: ["two-pointers","design","sorting","heap-priority-queue","data-stream"],
  prompt: "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.\n\nImplement the MedianFinder class:\n- `MedianFinder()` initializes the MedianFinder object.\n- `void addNum(int num)` adds the integer `num` from the data stream to the data structure.\n- `double findMedian()` returns the median of all elements so far.",
  constraints: ["-10^5 <= num <= 10^5","At most 5 * 10^4 calls will be made to addNum and findMedian."],
  examples: [
  {
    "input": "[\"MedianFinder\", \"addNum\", \"addNum\", \"findMedian\", \"addNum\", \"findMedian\"]\n[[], [1], [2], [], [3], []]",
    "output": "[null, null, null, 1.5, null, 2.0]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class MedianFinder:\n    def __init__(self):\n        self.small = [] # maxHeap\n        self.large = [] # minHeap\n\n    def addNum(self, num: int) -> None:\n        heapq.heappush(self.small, -1 * num)\n        \n        # Ensure every element in small <= every element in large\n        if self.small and self.large and (-1 * self.small[0]) > self.large[0]:\n            val = -1 * heapq.heappop(self.small)\n            heapq.heappush(self.large, val)\n            \n        # Uneven size\n        if len(self.small) > len(self.large) + 1:\n            val = -1 * heapq.heappop(self.small)\n            heapq.heappush(self.large, val)\n        if len(self.large) > len(self.small) + 1:\n            val = heapq.heappop(self.large)\n            heapq.heappush(self.small, -1 * val)\n\n    def findMedian(self) -> float:\n        if len(self.small) > len(self.large):\n            return -1 * self.small[0]\n        if len(self.large) > len(self.small):\n            return self.large[0]\n        return (-1 * self.small[0] + self.large[0]) / 2.0",
    "explanation": [
      "Use two heaps to maintain the data: a max-heap (`small`) for the smaller half and a min-heap (`large`) for the larger half.",
      "Balance the heaps such that their sizes differ by at most one.",
      "This ensures the max of the small half and the min of the large half are the candidates for the median.",
      "Medians are computed in constant time based on the peek values of the heaps."
    ]
  },
  {
    "language": "cpp",
    "code": "class MedianFinder {\n    priority_queue<int> maxHeap; // small half\n    priority_queue<int, vector<int>, greater<int>> minHeap; // large half\npublic:\n    void addNum(int num) {\n        maxHeap.push(num);\n        minHeap.push(maxHeap.top());\n        maxHeap.pop();\n        if (maxHeap.size() < minHeap.size()) {\n            maxHeap.push(minHeap.top());\n            minHeap.pop();\n        }\n    }\n    double findMedian() {\n        return maxHeap.size() > minHeap.size() ? maxHeap.top() : (maxHeap.top() + minHeap.top()) / 2.0;\n    }\n};",
    "explanation": [
      "Implement a two-heap balanced approach.",
      "The `maxHeap` stores the set of smaller elements, while `minHeap` stores the larger ones.",
      "Balancing is done after every insertion to keep the total count centered.",
      "O(log N) per addition ensures performance under high stream frequency."
    ]
  },
  {
    "language": "java",
    "code": "class MedianFinder {\n    private PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\n    private PriorityQueue<Integer> large = new PriorityQueue<>();\n\n    public void addNum(int num) {\n        small.add(num);\n        large.add(small.poll());\n        if (small.size() < large.size()) {\n            small.add(large.poll());\n        }\n    }\n\n    public double findMedian() {\n        if (small.size() > large.size()) return small.peek();\n        return (small.peek() + large.peek()) / 2.0;\n    }\n}",
    "explanation": [
      "Leverage two standard priority queues: one with reverse order and one with default order.",
      "A clean property is maintained: the root of `small` is the largest element of the left half, and the root of `large` is the smallest of the right half.",
      "Median calculation is simple: peek one or average both depending on total parity.",
      "Highly robust design for streaming data use cases."
    ]
  }
],
  timeComplexity: "O(log N) for addNum, O(1) for findMedian",
  spaceComplexity: "O(N)",
  edgeCases: ["Even total elements","Odd total elements"]
};
