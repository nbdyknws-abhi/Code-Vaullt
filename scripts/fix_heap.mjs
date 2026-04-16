import fs from 'fs';
import path from 'path';

const heapData = {
  "reorganize-string": {
    title: "Reorganize String", difficulty: "Medium", topic: "Heap & Priority Queue", tags: ["hash-table", "string", "greedy", "sorting", "heap-priority-queue", "counting"],
    prompt: "Given a string `s`, rearrange the characters of `s` so that any two adjacent characters are not the same.\n\nReturn any possible rearrangement of `s` or return an empty string `\"\"` if not possible.",
    constraints: ["1 <= s.length <= 500", "s consists of lowercase English letters."],
    examples: [{input: "s = \"aab\"", output: "\"aba\""}, {input: "s = \"aaab\"", output: "\"\""}],
    timeComplexity: "O(N log A) where A is alphabet size", spaceComplexity: "O(A)", edgeCases: ["Impossible to rearrange", "Single character string"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def reorganizeString(self, s: str) -> str:
        count = Counter(s)
        maxHeap = [[-cnt, char] for char, cnt in count.items()]
        heapq.heapify(maxHeap)
        
        prev = None
        res = ""
        while maxHeap or prev:
            if prev and not maxHeap:
                return ""
            
            cnt, char = heapq.heappop(maxHeap)
            res += char
            cnt += 1
            
            if prev:
                heapq.heappush(maxHeap, prev)
                prev = None
                
            if cnt != 0:
                prev = [cnt, char]
                
        return res`,
        explanation: ["Use a max-heap to prioritize characters with the highest frequency.", "At each step, pick the most frequent character that is NOT the same as the previously picked character.", "Store the previously picked character and push it back into the heap only after another char has been picked to ensure no two adjacent chars are the same.", "If at any point we need to pick a char but the heap is empty (and we have a pending char), it's impossible; return \"\"."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    string reorganizeString(string s) {
        vector<int> counts(26, 0);
        for (char c : s) counts[c - 'a']++;
        
        priority_queue<pair<int, char>> pq;
        for (int i = 0; i < 26; i++) {
            if (counts[i] > 0) pq.push({counts[i], (char)('a' + i)});
        }
        
        string res = "";
        pair<int, char> prev = {-1, '#'};
        while (!pq.empty()) {
            auto curr = pq.top(); pq.pop();
            res += curr.second;
            
            if (prev.first > 0) pq.push(prev);
            
            curr.first--;
            prev = curr;
        }
        return res.length() == s.length() ? res : "";
    }
};`,
        explanation: ["Implementation using a max-priority queue to store character frequencies.", "By always pulling the most frequent available character, we greedily reduce the risk of running out of padding characters.", "The `prev` variable holds the character used in the preceding step to prevent immediate re-use.", "Validation at the end ensures all characters were successfully placed without violations."]
      },
      {
        language: "java",
        code: `class Solution {
    public String reorganizeString(String s) {
        int[] counts = new int[26];
        for (char c : s.toCharArray()) counts[c - 'a']++;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[1] - a[1]);
        for (int i = 0; i < 26; i++) {
            if (counts[i] > 0) pq.add(new int[]{i, counts[i]});
        }
        
        StringBuilder sb = new StringBuilder();
        int[] prev = null;
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            sb.append((char) (curr[0] + 'a'));
            if (prev != null && prev[1] > 0) pq.add(prev);
            curr[1]--;
            prev = curr;
        }
        return sb.length() == s.length() ? sb.toString() : "";
    }
}`,
        explanation: ["Utilize a frequency map and a max-heap of character-count pairs.", "Greedy selection of characters with the highest remaining frequency while avoiding the immediate duplicate.", "The `StringBuilder` accumulates the result efficiently.", "Final check compares constructed string length to original length to handle impossible cases (e.g., 'aaa')."]
      }
    ]
  },
  "sliding-window-median": {
    title: "Sliding Window Median", difficulty: "Hard", topic: "Heap & Priority Queue", tags: ["array", "hash-table", "sliding-window", "heap-priority-queue"],
    prompt: "Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle values.\n\nYou are given an integer array `nums` and an integer `k`. There is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the median array for each window in the original array.",
    constraints: ["1 <= k <= nums.length <= 10^5", "-2^31 <= nums[i] <= 2^31 - 1"],
    examples: [{input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]"}],
    timeComplexity: "O(N log K)", spaceComplexity: "O(N)", edgeCases: ["k is even", "k=1"],
    solutions: [
      {
        language: "python",
        code: `import heapq

class Solution:
    def medianSlidingWindow(self, nums: List[int], k: int) -> List[float]:
        small, large = [], [] # max-heap (negated), min-heap
        for i in range(k):
            heapq.heappush(small, -nums[i])
        for i in range(k // 2):
            heapq.heappush(large, -heapq.heappop(small))
            
        def get_median():
            return -small[0] if k % 2 else (-small[0] + large[0]) / 2.0
            
        res = [get_median() * 1.0]
        to_remove = collections.defaultdict(int)
        
        for i in range(k, len(nums)):
            out_num = nums[i-k]
            in_num = nums[i]
            balance = 0
            
            # Remove out_num
            balance += -1 if out_num <= -small[0] else 1
            to_remove[out_num] += 1
            
            # Add in_num
            if small and in_num <= -small[0]:
                balance += 1
                heapq.heappush(small, -in_num)
            else:
                balance -= 1
                heapq.heappush(large, in_num)
                
            # Rebalance
            if balance < 0:
                heapq.heappush(small, -heapq.heappop(large))
            elif balance > 0:
                heapq.heappush(large, -heapq.heappop(small))
                
            # Clean heaps
            while small and to_remove[-small[0]]:
                to_remove[-small[0]] -= 1
                heapq.heappop(small)
            while large and to_remove[large[0]]:
                to_remove[large[0]] -= 1
                heapq.heappop(large)
                
            res.append(get_median() * 1.0)
            
        return res`,
        explanation: ["Maintain two balanced heaps (max-heap for small half, min-heap for large half) throughout the sliding window movement.", "Since standard heaps don't support deleting arbitrary elements efficiently, use 'Lazy Removal': track numbers to be removed in a hash map and pop them only when they reach the heap top.", "After adding a new number and marking the old one for removal, rebalance the heaps to keep the median at the roots.", "Total complexity is O(N log K) due to heap operations."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<double> medianSlidingWindow(vector<int>& nums, int k) {
        multiset<int> window(nums.begin(), nums.begin() + k);
        auto mid = next(window.begin(), (k - 1) / 2);
        vector<double> res;
        
        for (int i = k; ; i++) {
            res.push_back(((double)*mid + *next(mid, (k + 1) % 2)) / 2.0);
            if (i == nums.size()) break;
            
            window.insert(nums[i]);
            if (nums[i] < *mid) mid--;
            
            if (nums[i - k] <= *mid) mid++;
            window.erase(window.find(nums[i - k]));
        }
        return res;
    }
};`,
        explanation: ["Use a C++ `multiset` which maintains elements in sorted order internally (implemented as a Red-Black Tree).", "Track a pointer to the median element to avoid full re-traversals.", "When a new number is inserted, shift the median pointer if the insertion happens before the current median.", "Similarly, adjust the pointer when removing the element that slid out of the window.", "Complexity O(N log K) with simpler logic than multi-heap balancing."]
      },
      {
        language: "java",
        code: `class Solution {
    public double[] medianSlidingWindow(int[] nums, int k) {
        PriorityQueue<Integer> left = new PriorityQueue<>(Collections.reverseOrder());
        PriorityQueue<Integer> right = new PriorityQueue<>();
        double[] result = new double[nums.length - k + 1];

        for (int i = 0; i < nums.length; i++) {
            if (left.size() <= right.size()) {
                right.add(nums[i]);
                left.add(right.poll());
            } else {
                left.add(nums[i]);
                right.add(left.poll());
            }

            if (left.size() + right.size() == k) {
                double median;
                if (k % 2 == 0) median = (double) left.peek() / 2 + (double) right.peek() / 2;
                else median = (double) left.peek();
                result[i - k + 1] = median;

                if (!left.remove(nums[i - k + 1])) {
                    right.remove(nums[i - k + 1]);
                }
            }
        }
        return result;
    }
}`,
        explanation: ["Employ a dual-priority queue architecture to dynamically compute sliding medians.", "Java's `PriorityQueue.remove(Object)` is O(K), making the worst-case O(N*K); however, balancing logic ensures medians are readily accessible at heap tops.", "Insertions and rebalancing follow the same logic as the Median Finder design.", "Floating point division correctly handles even-sized window means."]
      }
    ]
  },
  "smallest-range-covering-elements-from-k-lists": {
    title: "Smallest Range Covering Elements", difficulty: "Hard", topic: "Heap & Priority Queue", tags: ["array", "hash-table", "greedy", "sliding-window", "sorting", "heap-priority-queue"],
    prompt: "You have `k` lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the `k` lists.\n\nWe define the range [a, b] is smaller than range [c, d] if `b - a < d - c` or `a < c` if `b - a == d - c`.",
    constraints: ["nums.length == k", "1 <= k <= 3500", "1 <= nums[i].length <= 50", "-10^5 <= nums[i][j] <= 10^5", "nums[i] is sorted in non-decreasing order."],
    examples: [{input: "nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]", output: "[20,24]"}],
    timeComplexity: "O(N log K) where N is total elements", spaceComplexity: "O(K)", edgeCases: ["Lists of size 1", "Identical numbers across lists"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def smallRange(self, nums: List[List[int]]) -> List[int]:
        minHeap = []
        curMax = -float('inf')
        for i in range(len(nums)):
            heapq.heappush(minHeap, (nums[i][0], i, 0))
            curMax = max(curMax, nums[i][0])
            
        res = [-float('inf'), float('inf')]
        
        while len(minHeap) == len(nums):
            curMin, row, col = heapq.heappop(minHeap)
            
            if (curMax - curMin) < (res[1] - res[0]):
                res = [curMin, curMax]
                
            if col + 1 < len(nums[row]):
                nextVal = nums[row][col+1]
                heapq.heappush(minHeap, (nextVal, row, col + 1))
                curMax = max(curMax, nextVal)
                
        return res`,
        explanation: ["This can be modeled as finding a range that contains at least one pointer from each list.", "Use a min-heap to keep track of the current values pointed to in each of the `k` lists.", "Also maintain a `curMax` of all values currently in the heap.", "The potential range is always `[min_in_heap, curMax]`. Extract the minimum and replace it with the next element from that same list.", "The process stops when one of the lists is exhausted."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<int> smallestRange(vector<vector<int>>& nums) {
        int k = nums.size();
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;
        int maxVal = INT_MIN;
        for (int i = 0; i < k; i++) {
            pq.push({nums[i][0], i, 0});
            maxVal = max(maxVal, nums[i][0]);
        }
        
        vector<int> res = {-1000000, 1000000};
        while (pq.size() == k) {
            auto curr = pq.top(); pq.pop();
            int minVal = curr[0], row = curr[1], col = curr[2];
            
            if (maxVal - minVal < res[1] - res[0]) {
                res = {minVal, maxVal};
            }
            
            if (col + 1 < nums[row].size()) {
                int val = nums[row][col + 1];
                pq.push({val, row, col + 1});
                maxVal = max(maxVal, val);
            }
        }
        return res;
    }
};`,
        explanation: ["Leverage a min-priority queue to maintain the lower bound of the current candidate range across $k$ sorted arrays.", "Concurrently track the global maximum of all enqueued elements.", "Each extraction from the heap potentially tightens the range, which we greedily update.", "The O(N log K) complexity is highly efficient for the given constraints."]
      },
      {
        language: "java",
        code: `class Solution {
    public int[] smallestRange(List<List<Integer>> nums) {
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < nums.size(); i++) {
            int val = nums.get(i).get(0);
            pq.add(new int[]{val, i, 0});
            max = Math.max(max, val);
        }
        int start = 0, end = Integer.MAX_VALUE;
        while (pq.size() == nums.size()) {
            int[] curr = pq.poll();
            if (max - curr[0] < end - start) {
                start = curr[0];
                end = max;
            }
            if (curr[2] + 1 < nums.get(curr[1]).size()) {
                int next = nums.get(curr[1]).get(curr[2] + 1);
                pq.add(new int[]{next, curr[1], curr[2] + 1});
                max = Math.max(max, next);
            }
        }
        return new int[]{start, end};
    }
}`,
        explanation: ["Use a PriorityQueue to simulate an n-way pointer traversal across the sorted lists.", "Each state in the heap represents a valid 'cut' through all lists; the spread between the min and max determines the range size.", "Pointer progression mimics the logic used in Merge K Sorted Lists, ensuring optimal traversal.", "The earliest list depletion effectively establishes that no smaller range can satisfy the multi-list requirement."]
      }
    ]
  },
  "ugly-number-ii": {
    title: "Ugly Number II", difficulty: "Medium", topic: "Heap & Priority Queue", tags: ["hash-table", "math", "dynamic-programming", "heap-priority-queue"],
    prompt: "An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.\n\nGiven an integer `n`, return the `n`th ugly number.",
    constraints: ["1 <= n <= 1690"],
    examples: [{input: "n = 10", output: "12", explanation: "[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers."}],
    timeComplexity: "O(N log N)", spaceComplexity: "O(N)", edgeCases: ["n=1", "n is very large"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def nthUglyNumber(self, n: int) -> int:
        minHeap = [1]
        visit = {1}
        primes = [2, 3, 5]
        
        for i in range(n):
            res = heapq.heappop(minHeap)
            if i == n - 1:
                return res
            for p in primes:
                if res * p not in visit:
                    visit.add(res * p)
                    heapq.heappush(minHeap, res * p)
        return 0`,
        explanation: ["Generate ugly numbers by multiplying existing ugly numbers by 2, 3, and 5.", "Use a min-heap to always extract the smallest newly generated ugly number.", "Use a 'visit' set to ensure each ugly number is added to the heap only once.", "After `n` pops, the last popped number is the result."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int nthUglyNumber(int n) {
        priority_queue<long, vector<long>, greater<long>> pq;
        unordered_set<long> seen;
        pq.push(1);
        seen.insert(1);
        
        long curr = 1;
        for (int i = 0; i < n; i++) {
            curr = pq.top(); pq.pop();
            for (int factor : {2, 3, 5}) {
                long next = curr * factor;
                if (seen.find(next) == seen.end()) {
                    pq.push(next);
                    seen.insert(next);
                }
            }
        }
        return (int)curr;
    }
};`,
        explanation: ["Systematically generate sequence elements using a priority queue to maintain order.", "The factors 2, 3, and 5 are applied to every discovered ugly number to breed the next set.", "The unique constraint is handled by a hash set to prune duplicates from the heap.", "Returns the $n$-th extracted value, ensuring sequence correctness."]
      },
      {
        language: "java",
        code: `class Solution {
    public int nthUglyNumber(int n) {
        PriorityQueue<Long> pq = new PriorityQueue<>();
        Set<Long> seen = new HashSet<>();
        pq.add(1L);
        seen.add(1L);
        long res = 1;
        for (int i = 0; i < n; i++) {
            res = pq.poll();
            for (int p : new int[]{2, 3, 5}) {
                if (!seen.contains(res * p)) {
                    pq.add(res * p);
                    seen.add(res * p);
                }
            }
        }
        return (int)res;
    }
}`,
        explanation: ["Leverage a Long-based PriorityQueue to avoid overflow during generation of large ugly numbers.", "Each iteration computes potential successors, adding them to the priority queue if they haven't been visited.", "By processing in ascending order, we guarantee the sequence is built correctly until the target index is reached.", "Effective O(N log N) solution for generating sequence values under constraints."]
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

console.log("Updated Heap fixed placeholders.");
