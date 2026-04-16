import fs from 'fs';
import path from 'path';

const heapData = {
  "kth-largest-element-in-an-array": {
    title: "Kth Largest Element in an Array", difficulty: "Medium", topic: "Heap & Priority Queue", tags: ["array", "divide-and-conquer", "sorting", "heap-priority-queue", "quickselect"],
    prompt: "Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.\n\nNote that it is the `k`th largest element in the sorted order, not the `k`th distinct element.",
    constraints: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [{input: "nums = [3,2,1,5,6,4], k = 2", output: "5"}],
    timeComplexity: "O(N log K)", spaceComplexity: "O(K)", edgeCases: ["k=1", "k=nums.length"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        minHeap = []
        for n in nums:
            heapq.heappush(minHeap, n)
            if len(minHeap) > k:
                heapq.heappop(minHeap)
        return minHeap[0]`,
        explanation: ["Use a min-heap to keep track of the `k` largest elements seen so far.", "Iterate through the array, pushing each element onto the heap.", "If the heap size exceeds `k`, pop the smallest element (the top of the min-heap).", "After the loop, the top of the heap is the `k`th largest element."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (int n : nums) {
            minHeap.push(n);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        return minHeap.top();
    }
};`,
        explanation: ["A min-priority queue efficiently maintains the top `k` elements.", "The `greater<int>` comparator ensures the smallest of the `k` largest elements is at the top.", "Pushing an element is O(log k), making the total time complexity O(n log k).", "Space complexity is O(k) for the priority queue."]
      },
      {
        language: "java",
        code: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int n : nums) {
            minHeap.add(n);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }
}`,
        explanation: ["In Java, `PriorityQueue` is a min-heap by default.", "By limiting the heap size to `k`, we ensure the `k`th largest element always stays at the top.", "This approach is more memory-efficient than sorting the whole array if `k` is small.", "Time complexity is O(N log K)."]
      }
    ]
  },
  "top-k-frequent-elements": {
    title: "Top K Frequent Elements", difficulty: "Medium", topic: "Heap & Priority Queue", tags: ["array", "hash-table", "sorting", "heap-priority-queue", "bucket-sort"],
    prompt: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.",
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4", "k is in the range [1, the number of unique elements in the array].", "It is guaranteed that the answer is unique."],
    examples: [{input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]"}],
    timeComplexity: "O(N log K) or O(N)", spaceComplexity: "O(N)", edgeCases: ["k equals number of unique elements"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        count = {}
        for n in nums:
            count[n] = 1 + count.get(n, 0)
            
        heap = []
        for n, c in count.items():
            heapq.heappush(heap, (c, n))
            if len(heap) > k:
                heapq.heappop(heap)
        
        return [pair[1] for pair in heap]`,
        explanation: ["First, count the frequency of each number using a hash map.", "Use a min-heap to store tuples of `(frequency, number)`.", "Keep the heap size at `k`. When size is exceeded, the element with the lowest frequency is popped.", "The numbers remaining in the heap are the `k` most frequent."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        for (int n : nums) count[n]++;
        
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;
        for (auto const& [val, freq] : count) {
            minHeap.push({freq, val});
            if (minHeap.size() > k) minHeap.pop();
        }
        
        vector<int> res;
        while (!minHeap.empty()) {
            res.push_back(minHeap.top().second);
            minHeap.pop();
        }
        return res;
    }
};`,
        explanation: ["Count frequencies using a hash map.", "Push `{frequency, value}` pairs into a min-priority queue.", "Strictly maintain queue size at `k` to ensure optimal performance.", "The min-heap property ensures that lower frequency elements are pruned first."]
      },
      {
        language: "java",
        code: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);
        
        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        for (int key : count.keySet()) {
            minHeap.add(new int[]{count.get(key), key});
            if (minHeap.size() > k) minHeap.poll();
        }
        
        int[] res = new int[k];
        for (int i = 0; i < k; i++) res[i] = minHeap.poll()[1];
        return res;
    }
}`,
        explanation: ["Map-based counting followed by heap-based selection.", "The custom comparator `(a, b) -> a[0] - b[0]` sorts the heap by frequency in ascending order.", "Extracting from the min-heap provides the `k` most frequent elements.", "Time complexity is O(N log K)."]
      }
    ]
  },
  "find-median-from-data-stream": {
    title: "Find Median from Data Stream", difficulty: "Hard", topic: "Heap & Priority Queue", tags: ["two-pointers", "design", "sorting", "heap-priority-queue", "data-stream"],
    prompt: "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.\n\nImplement the MedianFinder class:\n- `MedianFinder()` initializes the MedianFinder object.\n- `void addNum(int num)` adds the integer `num` from the data stream to the data structure.\n- `double findMedian()` returns the median of all elements so far.",
    constraints: ["-10^5 <= num <= 10^5", "At most 5 * 10^4 calls will be made to addNum and findMedian."],
    examples: [{input: "[\"MedianFinder\", \"addNum\", \"addNum\", \"findMedian\", \"addNum\", \"findMedian\"]\n[[], [1], [2], [], [3], []]", output: "[null, null, null, 1.5, null, 2.0]"}],
    timeComplexity: "O(log N) for addNum, O(1) for findMedian", spaceComplexity: "O(N)", edgeCases: ["Even total elements", "Odd total elements"],
    solutions: [
      {
        language: "python",
        code: `class MedianFinder:
    def __init__(self):
        self.small = [] # maxHeap
        self.large = [] # minHeap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -1 * num)
        
        # Ensure every element in small <= every element in large
        if self.small and self.large and (-1 * self.small[0]) > self.large[0]:
            val = -1 * heapq.heappop(self.small)
            heapq.heappush(self.large, val)
            
        # Uneven size
        if len(self.small) > len(self.large) + 1:
            val = -1 * heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.large) > len(self.small) + 1:
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -1 * val)

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return -1 * self.small[0]
        if len(self.large) > len(self.small):
            return self.large[0]
        return (-1 * self.small[0] + self.large[0]) / 2.0`,
        explanation: ["Use two heaps to maintain the data: a max-heap (`small`) for the smaller half and a min-heap (`large`) for the larger half.", "Balance the heaps such that their sizes differ by at most one.", "This ensures the max of the small half and the min of the large half are the candidates for the median.", "Medians are computed in constant time based on the peek values of the heaps."]
      },
      {
        language: "cpp",
        code: `class MedianFinder {
    priority_queue<int> maxHeap; // small half
    priority_queue<int, vector<int>, greater<int>> minHeap; // large half
public:
    void addNum(int num) {
        maxHeap.push(num);
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    double findMedian() {
        return maxHeap.size() > minHeap.size() ? maxHeap.top() : (maxHeap.top() + minHeap.top()) / 2.0;
    }
};`,
        explanation: ["Implement a two-heap balanced approach.", "The `maxHeap` stores the set of smaller elements, while `minHeap` stores the larger ones.", "Balancing is done after every insertion to keep the total count centered.", "O(log N) per addition ensures performance under high stream frequency."]
      },
      {
        language: "java",
        code: `class MedianFinder {
    private PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());
    private PriorityQueue<Integer> large = new PriorityQueue<>();

    public void addNum(int num) {
        small.add(num);
        large.add(small.poll());
        if (small.size() < large.size()) {
            small.add(large.poll());
        }
    }

    public double findMedian() {
        if (small.size() > large.size()) return small.peek();
        return (small.peek() + large.peek()) / 2.0;
    }
}`,
        explanation: ["Leverage two standard priority queues: one with reverse order and one with default order.", "A clean property is maintained: the root of `small` is the largest element of the left half, and the root of `large` is the smallest of the right half.", "Median calculation is simple: peek one or average both depending on total parity.", "Highly robust design for streaming data use cases."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'heap-priority-queue');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

Object.keys(heapData).forEach(id => {
  const data = heapData[id];
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

console.log("Written heap problems part 1.");
