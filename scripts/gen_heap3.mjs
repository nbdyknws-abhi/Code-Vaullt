import fs from 'fs';
import path from 'path';

const heapData = {
  "k-closest-points-to-origin": {
    title: "K Closest Points to Origin", difficulty: "Medium", topic: "Heap & Priority Queue", tags: ["array", "math", "divide-and-conquer", "geometry", "sorting", "heap-priority-queue", "quickselect"],
    prompt: "Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)`.\n\nThe distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)^2 + (y1 - y2)^2).\n\nYou may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).",
    constraints: ["1 <= k <= points.length <= 10^4", "-10^4 <= xi, yi <= 10^4"],
    examples: [{input: "points = [[1,3],[-2,2]], k = 1", output: "[[-2,2]]", explanation: "The distance from (1, 3) to the origin is sqrt(10). The distance from (-2, 2) to the origin is sqrt(8). Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin."}],
    timeComplexity: "O(N log K)", spaceComplexity: "O(K)", edgeCases: ["k is the same as points length"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        minHeap = []
        for x, y in points:
            dist = (x**2) + (y**2)
            minHeap.append([dist, x, y])
            
        heapq.heapify(minHeap)
        res = []
        for _ in range(k):
            dist, x, y = heapq.heappop(minHeap)
            res.append([x, y])
        return res`,
        explanation: ["Compute the squared Euclidean distance `x^2 + y^2` for each point (avoiding `sqrt` to preserve precision and efficiency).", "Store points with their distances in a min-heap.", "Extract the top `k` elements from the heap.", "Return the extracted coordinates as the result."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        priority_queue<pair<int, int>> pq;
        for (int i = 0; i < points.size(); i++) {
            int dist = points[i][0] * points[i][0] + points[i][1] * points[i][1];
            pq.push({dist, i});
            if (pq.size() > k) pq.pop();
        }
        
        vector<vector<int>> res;
        while (!pq.empty()) {
            res.push_back(points[pq.top().second]);
            pq.pop();
        }
        return res;
    }
};`,
        explanation: ["Iteratively maintain a max-priority queue of size `k` to store the closest points discovered so far.", "By using a max-heap, the point currently 'farthest' among the top `k` candidates is at the top, making it easy to prune when a closer point is found.", "Each insertion/deletion is O(log k), making the total time O(n log k).", "Resulting list contains the `k` points with minimum origin distance."]
      },
      {
        language: "java",
        code: `class Solution {
    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> 
            (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1])
        );
        for (int[] p : points) {
            pq.add(p);
            if (pq.size() > k) pq.poll();
        }
        int[][] res = new int[k][2];
        while (k > 0) res[--k] = pq.poll();
        return res;
    }
}`,
        explanation: ["Initialize a max-heap using a custom comparator that calculates squared distances.", "Inserting all points into the max-heap while maintaining size `k` naturally filters out the most distant points.", "Java's `PriorityQueue` with a reverse comparison effectively acts as the max-heap for distance pruning.", "Final result conversion maps the heap contents to a 2D array."]
      }
    ]
  },
  "kth-largest-element-in-a-stream": {
    title: "Kth Largest Element in a Stream", difficulty: "Easy", topic: "Heap & Priority Queue", tags: ["tree", "design", "binary-search-tree", "heap-priority-queue", "binary-tree", "data-stream"],
    prompt: "Design a class to find the `k`th largest element in a stream. Note that it is the `k`th largest element in the sorted order, not the `k`th distinct element.\n\nImplement `KthLargest` class:\n- `KthLargest(int k, int[] nums)` Initializes the object with the integer `k` and the stream of integers `nums`.\n- `int add(int val)` Appends the integer `val` to the stream and returns the element representing the `k`th largest element in the stream.",
    constraints: ["1 <= k <= 10^4", "0 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4", "-10^4 <= val <= 10^4", "At most 10^4 calls will be made to add."],
    examples: [{input: "[\"KthLargest\", \"add\", \"add\", \"add\", \"add\", \"add\"]\n[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]", output: "[null, 4, 5, 5, 8, 8]"}],
    timeComplexity: "O(log K) for add, O(K) for initialization", spaceComplexity: "O(K)", edgeCases: ["Initialize with fewer than k elements"],
    solutions: [
      {
        language: "python",
        code: `class KthLargest:
    def __init__(self, k: int, nums: List[int]):
        self.minHeap = nums
        self.k = k
        heapq.heapify(self.minHeap)
        while len(self.minHeap) > k:
            heapq.heappop(self.minHeap)

    def add(self, val: int) -> int:
        heapq.heappush(self.minHeap, val)
        if len(self.minHeap) > self.k:
            heapq.heappop(self.minHeap)
        return self.minHeap[0]`,
        explanation: ["A min-heap is perfect for tracking 'top k' elements because the `k`th largest is strictly the smallest of the `k` largest items.", "Initialize by heapifying the input and pruning down to size `k`.", "The `add` method maintains this invariant by pushing the new value and potentially popping the new minimum.", "Returns the root of the min-heap in O(1) after O(log k) insertion."]
      },
      {
        language: "cpp",
        code: `class KthLargest {
    priority_queue<int, vector<int>, greater<int>> pq;
    int K;
public:
    KthLargest(int k, vector<int>& nums) {
        K = k;
        for (int n : nums) add(n);
    }
    
    int add(int val) {
        pq.push(val);
        if (pq.size() > K) pq.pop();
        return pq.top();
    }
};`,
        explanation: ["Use a min-priority queue to keep exactly `k` largest elements from the data stream.", "The `add` operation leverages the priority queue's ability to maintain order in logarithmic time.", "Size management ensures the smallest of the largest `k` (i.e., the `k`th largest) is always at the top.", "Constant space O(k) relative to the stream size."]
      },
      {
        language: "java",
        code: `class KthLargest {
    private PriorityQueue<Integer> pq;
    private int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        pq = new PriorityQueue<>();
        for (int n : nums) add(n);
    }
    
    public int add(int val) {
        pq.add(val);
        if (pq.size() > k) pq.poll();
        return pq.peek();
    }
}`,
        explanation: ["Implement the stream listener using a Java `PriorityQueue`.", "Initializing with existing numbers runs `add` iteratively to prime the heap.", "The `peek` operation on the min-heap directly reveals the `k`th largest value.", "Efficiently handles continuous stream updates without complete re-sorting."]
      }
    ]
  },
  "single-threaded-cpu": {
    title: "Single-Threaded CPU", difficulty: "Medium", topic: "Heap & Priority Queue", tags: ["array", "sorting", "heap-priority-queue"],
    prompt: "You are given `n` tasks, each with an enqueue time and a processing time. A single-threaded CPU can process only one task at a time and once it starts, it will process it until completion.\n\nWhen the CPU is idle, it will pick the task with the shortest processing time from the available tasks (already enqueued). If multiple tasks have the same shortest processing time, the CPU picks the one with the smallest index.\n\nReturn the order in which the CPU will process the tasks.",
    constraints: ["tasks.length == n", "1 <= n <= 10^5", "tasks[i].length == 2", "1 <= enqueueTime, processingTime <= 10^9"],
    examples: [{input: "tasks = [[1,2],[2,4],[3,2],[4,1]]", output: "[0,2,3,1]"}],
    timeComplexity: "O(N log N)", spaceComplexity: "O(N)", edgeCases: ["Tasks with identical times", "Large processing gaps"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def getOrder(self, tasks: List[List[int]]) -> List[int]:
        for i, t in enumerate(tasks):
            t.append(i)
        tasks.sort(key = lambda t: t[0])
        
        res, minHeap = [], []
        i, time = 0, tasks[0][0]
        
        while minHeap or i < len(tasks):
            while i < len(tasks) and tasks[i][0] <= time:
                heapq.heappush(minHeap, [tasks[i][1], tasks[i][2]])
                i += 1
            
            if not minHeap:
                time = tasks[i][0]
            else:
                procTime, index = heapq.heappop(minHeap)
                time += procTime
                res.append(index)
        return res`,
        explanation: ["Sort original tasks by enqueue time to handle arrival sequence.", "Use a min-heap to store 'available' tasks, ordered by processing time and then original index.", "Simulation loop: increment global `time`, add all newly available tasks to the heap, and execute the best candidate from the heap.", "Handle CPU idle time by jumping `time` forward to the next task's enqueue time if the heap is empty."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<int> getOrder(vector<vector<int>>& tasks) {
        int n = tasks.size();
        vector<vector<int>> sortedTasks(n, vector<int>(3));
        for (int i = 0; i < n; i++) {
            sortedTasks[i] = {tasks[i][0], tasks[i][1], i};
        }
        sort(sortedTasks.begin(), sortedTasks.end());
        
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        vector<int> res;
        long long time = 0;
        int i = 0;
        
        while (i < n || !pq.empty()) {
            if (pq.empty() && time < sortedTasks[i][0]) {
                time = sortedTasks[i][0];
            }
            while (i < n && sortedTasks[i][0] <= time) {
                pq.push({sortedTasks[i][1], sortedTasks[i][2]});
                i++;
            }
            auto [proc, idx] = pq.top(); pq.pop();
            time += proc;
            res.push_back(idx);
        }
        return res;
    }
};`,
        explanation: ["Apply greedy scheduling simulation with a custom-conditioned min-priority queue.", "Tasks are enqueued into the 'available' heap based on the current CPU timeline.", "The priority queue prioritizes shortest processing time, then smallest index.", "Use `long long` for `time` to prevent overflow on very long task sequences."]
      },
      {
        language: "java",
        code: `class Solution {
    public int[] getOrder(int[][] tasks) {
        int n = tasks.length;
        int[][] extendedTasks = new int[n][3];
        for (int i = 0; i < n; i++) extendedTasks[i] = new int[]{tasks[i][0], tasks[i][1], i};
        Arrays.sort(extendedTasks, (a, b) -> Integer.compare(a[0], b[0]));
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] == b[1] ? a[2] - b[2] : a[1] - b[1]);
        int[] res = new int[n];
        long time = 0;
        int i = 0, j = 0;
        
        while (i < n || !pq.isEmpty()) {
            if (pq.isEmpty() && time < extendedTasks[i][0]) time = extendedTasks[i][0];
            while (i < n && extendedTasks[i][0] <= time) {
                pq.add(extendedTasks[i++]);
            }
            int[] current = pq.poll();
            time += current[1];
            res[j++] = current[2];
        }
        return res;
    }
}`,
        explanation: ["Sort and simulate the CPU scheduling process.", "A `PriorityQueue` helps select the 'easiest' available task at any given time point.", "Proper handling of idle CPU gaps by jumping the `time` pointer to the next available enqueue window.", "Total operation takes O(N log N) dominated by sorting and heap maintenance."]
      }
    ]
  },
  "ipo": {
    title: "IPO", difficulty: "Hard", topic: "Heap & Priority Queue", tags: ["array", "greedy", "sorting", "heap-priority-queue"],
    prompt: "Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most `k` distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most `k` distinct projects.\n\nYou are given `n` projects where the `i`th project has a pure profit `profits[i]` and a minimum capital of `capital[i]` is needed to start it.\n\nInitially, you have `w` capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.\n\nPick a list of at most `k` distinct projects from given projects to maximize your final capital, and return the final maximized capital.",
    constraints: ["1 <= k <= 10^5", "0 <= w <= 10^9", "n == profits.length == capital.length", "1 <= n <= 10^5", "0 <= profits[i] <= 10^4", "0 <= capital[i] <= 10^9"],
    examples: [{input: "k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]", output: "4", explanation: "Start with w=0. Only project with cap=0 can be started (profit 1). w becomes 1. Now project with cap=1 can be started (profit 3). Total = 4."}],
    timeComplexity: "O(N log N + K log N)", spaceComplexity: "O(N)", edgeCases: ["No projects can be started", "k is larger than available projects"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
        maxProfit = [] # maxHeap
        minCapital = [] # minHeap (stores [capital, profit])
        
        for i in range(len(profits)):
            heapq.heappush(minCapital, [capital[i], profits[i]])
            
        for _ in range(k):
            while minCapital and minCapital[0][0] <= w:
                c, p = heapq.heappop(minCapital)
                heapq.heappush(maxProfit, -p)
                
            if not maxProfit:
                break
            w += -heapq.heappop(maxProfit)
        return w`,
        explanation: ["Use two heaps: a min-heap to sort projects by their required capital and a max-heap to select the most profitable available project.", "In each step, move all projects that the current capital `w` can afford into the max-profit heap.", "Select and execute the highest profit project from the max-heap to increase `w`.", "Repeat `k` times or until no more projects can be started."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {
        int n = profits.size();
        vector<pair<int, int>> projects;
        for (int i = 0; i < n; i++) projects.push_back({capital[i], profits[i]});
        sort(projects.begin(), projects.end());
        
        priority_queue<int> maxProfit;
        int i = 0;
        while (k--) {
            while (i < n && projects[i].first <= w) {
                maxProfit.push(projects[i].second);
                i++;
            }
            if (maxProfit.empty()) break;
            w += maxProfit.top();
            maxProfit.pop();
        }
        return w;
    }
};`,
        explanation: ["Sort projects by their required capital for systematic access.", "A max-priority queue stores profits of projects currently affordable with current capital.", "By picking the highest profit among available projects (Greedy), we maximize subsequent purchasing power.", "Logarithmic heap operations inside the loop provide an efficient O(N log N) total time complexity."]
      },
      {
        language: "java",
        code: `class Solution {
    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int n = profits.length;
        int[][] projects = new int[n][2];
        for (int i = 0; i < n; i++) projects[i] = new int[]{capital[i], profits[i]};
        Arrays.sort(projects, (a, b) -> a[0] - b[0]);
        
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        int i = 0;
        while (k > 0) {
            while (i < n && projects[i][0] <= w) {
                pq.add(projects[i++][1]);
            }
            if (pq.isEmpty()) break;
            w += pq.poll();
            k--;
        }
        return w;
    }
}`,
        explanation: ["Pair projects using a 2D array and sort primarily by capital requirements.", "A max-heap (`pq`) efficiently prioritizes the most profitable projects among those currently actionable.", "Gains in capital potentially unlock more expensive projects in the next iteration.", "Greedy selection ensures the final output capital is strictly maximized."]
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

console.log("Written heap problems part 3.");
