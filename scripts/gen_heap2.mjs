import fs from 'fs';
import path from 'path';

const heapData = {
  "merge-k-sorted-lists": {
    title: "Merge K Sorted Lists", difficulty: "Hard", topic: "Heap & Priority Queue", tags: ["linked-list", "divide-and-conquer", "heap-priority-queue", "merge-sort"],
    prompt: "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
    constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500", "-10^4 <= lists[i][j] <= 10^4", "lists[i] is sorted in ascending order.", "The sum of lists[i].length will not exceed 10^4."],
    examples: [{input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]"}],
    timeComplexity: "O(N log K) where N is total nodes", spaceComplexity: "O(K)", edgeCases: ["Empty lists array", "Array with empty linked lists"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists or len(lists) == 0:
            return None
            
        while len(lists) > 1:
            mergedLists = []
            for i in range(0, len(lists), 2):
                l1 = lists[i]
                l2 = lists[i + 1] if (i + 1) < len(lists) else None
                mergedLists.append(self.mergeList(l1, l2))
            lists = mergedLists
            
        return lists[0]
        
    def mergeList(self, l1, l2):
        dummy = ListNode()
        tail = dummy
        
        while l1 and l2:
            if l1.val < l2.val:
                tail.next = l1
                l1 = l1.next
            else:
                tail.next = l2
                l2 = l2.next
            tail = tail.next
        if l1:
            tail.next = l1
        if l2:
            tail.next = l2
        return dummy.next`,
        explanation: ["Use a divide-and-conquer approach to merge lists in pairs.", "This is more efficient than merging lists one by one because each node is visited only O(log k) times.", "The merge process itself is the same as merging two sorted linked lists.", "Result is a single sorted list produced by repeated binary merges."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto compare = [](ListNode* a, ListNode* b) {
            return a->val > b->val;
        };
        priority_queue<ListNode*, vector<ListNode*>, decltype(compare)> minHeap(compare);
        
        for (auto list : lists) {
            if (list) minHeap.push(list);
        }
        
        ListNode dummy(0);
        ListNode* tail = &dummy;
        
        while (!minHeap.empty()) {
            ListNode* node = minHeap.top();
            minHeap.pop();
            tail->next = node;
            tail = tail->next;
            if (node->next) minHeap.push(node->next);
        }
        return dummy.next;
    }
};`,
        explanation: ["Use a min-priority queue to store the heads of all `k` linked lists.", "At each step, extract the smallest head, append it to the result, and push its successor from the same list back into the heap.", "Since the heap size is capped at `k`, each insertion and extraction takes O(log k) time.", "The O(N log k) total runtime is optimal for this problem."]
      },
      {
        language: "java",
        code: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
        for (ListNode list : lists) {
            if (list != null) pq.add(list);
        }
        
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        
        while (!pq.isEmpty()) {
            ListNode node = pq.poll();
            tail.next = node;
            tail = tail.next;
            if (node.next != null) pq.add(node.next);
        }
        return dummy.next;
    }
}`,
        explanation: ["Prioritize node selection using a min-heap initialized with all list heads.", "This algorithm effectively simulates a multi-way merge sort.", "By extracting the smallest node and immediately providing its replacement from the same source list, we maintain a consolidated sorted sequence.", "O(k) extra space is used for the priority queue pointers."]
      }
    ]
  },
  "task-scheduler": {
    title: "Task Scheduler", difficulty: "Medium", topic: "Heap & Priority Queue", tags: ["array", "hash-table", "greedy", "sorting", "heap-priority-queue", "counting"],
    prompt: "Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.\n\nHowever, there is a non-negative integer `n` that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least `n` units of time between any two same tasks.\n\nReturn the least number of units of time that the CPU will take to finish all the given tasks.",
    constraints: ["1 <= tasks.length <= 10^4", "tasks[i] is upper-case English letter.", "0 <= n <= 100"],
    examples: [{input: "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2", output: "8", explanation: "A -> B -> idle -> A -> B -> idle -> A -> B"}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["n=0", "Tasks can be finished without idle time"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        count = Counter(tasks)
        maxHeap = [-cnt for cnt in count.values()]
        heapq.heapify(maxHeap)
        
        time = 0
        q = deque() # pairs of [-cnt, idleTime]
        while maxHeap or q:
            time += 1
            if maxHeap:
                cnt = 1 + heapq.heappop(maxHeap)
                if cnt:
                    q.append([cnt, time + n])
            
            if q and q[0][1] == time:
                heapq.heappush(maxHeap, q.popleft()[0])
        return time`,
        explanation: ["Use a max-heap to consume the most frequent tasks first (Greedy approach).", "Maintain a wait queue `q` for tasks that are in their cooldown period.", "In each time unit, if a task is available in the max-heap, perform it and update its remaining count and cooldown end time.", "Return tasks from the queue to the max-heap as soon as their cooldown expires."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        unordered_map<char, int> counts;
        for (char t : tasks) counts[t]++;
        
        priority_queue<int> pq;
        for (auto& [t, cnt] : counts) pq.push(cnt);
        
        int time = 0;
        queue<pair<int, int>> q;
        while (!pq.empty() || !q.empty()) {
            time++;
            if (!pq.empty()) {
                int left = pq.top() - 1;
                pq.pop();
                if (left > 0) q.push({left, time + n});
            }
            if (!q.empty() && q.front().second == time) {
                pq.push(q.front().first);
                q.pop();
            }
        }
        return time;
    }
};`,
        explanation: ["Map task frequencies and utilize a max-priority queue to prioritize high-frequency tasks.", "A side queue manages tasks during their 'idle' or cooldown period.", "Each loop iteration represents a global time unit.", "Optimal task selection minimizes CPU idle time while strictly observing cooldown constraints."]
      },
      {
        language: "java",
        code: `class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] freqs = new int[26];
        for (char t : tasks) freqs[t - 'A']++;
        
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int f : freqs) if (f > 0) pq.add(f);
        
        int time = 0;
        Queue<int[]> q = new LinkedList<>();
        while (!pq.isEmpty() || !q.isEmpty()) {
            time++;
            if (!pq.isEmpty()) {
                int count = pq.poll() - 1;
                if (count > 0) q.add(new int[]{count, time + n});
            }
            if (!q.isEmpty() && q.peek()[1] == time) {
                pq.add(q.poll()[0]);
            }
        }
        return time;
    }
}`,
        explanation: ["Simulation using a max-heap for task priority and a queue for cooldown management.", "Calculates the absolute minimum units of time by always scheduling the most critical tasks first.", "Cooldown tasks are moved back to ready status (the heap) at the precise time unit they become available again.", "Universal approach handling all task distributions and `n` values."]
      }
    ]
  },
  "last-stone-weight": {
    title: "Last Stone Weight", difficulty: "Easy", topic: "Heap & Priority Queue", tags: ["array", "heap-priority-queue"],
    prompt: "You are given an array of integers `stones` where `stones[i]` is the weight of the `i`th stone.\n\nWe are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights `x` and `y` with `x <= y`. The result of this smash is:\n- If `x == y`, both stones are destroyed;\n- If `x != y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.\n\nAt the end of the game, there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return 0.",
    constraints: ["1 <= stones.length <= 30", "1 <= stones[i] <= 1000"],
    examples: [{input: "stones = [2,7,4,1,8,1]", output: "1"}],
    timeComplexity: "O(N log N)", spaceComplexity: "O(N)", edgeCases: ["All stones same weight", "Only one stone initially"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        stones = [-s for s in stones]
        heapq.heapify(stones)
        
        while len(stones) > 1:
            first = heapq.heappop(stones)
            second = heapq.heappop(stones)
            if first != second:
                heapq.heappush(stones, first - second)
                
        return -stones[0] if stones else 0`,
        explanation: ["Use a max-heap (negative values in Python) to always pick the two heaviest stones in O(log N) time.", "Continue the smashing process until fewer than two stones remain.", "If the two stones aren't identical, push the difference back into the heap.", "Return the last stone's weight or 0 if all were destroyed."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int> pq(stones.begin(), stones.end());
        while (pq.size() > 1) {
            int y = pq.top(); pq.pop();
            int x = pq.top(); pq.pop();
            if (x != y) pq.push(y - x);
        }
        return pq.empty() ? 0 : pq.top();
    }
};`,
        explanation: ["Standard max-priority queue simulation of the stone game.", "The heap automatically keeps the heaviest stones at the top after every insertion/removal.", "The loop continues efficiently until the game conditions for termination are met.", "O(N log N) total time for the demolition sequence."]
      },
      {
        language: "java",
        code: `class Solution {
    public int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int s : stones) pq.add(s);
        while (pq.size() > 1) {
            int y = pq.poll();
            int x = pq.poll();
            if (y > x) pq.add(y - x);
        }
        return pq.isEmpty() ? 0 : pq.peek();
    }
}`,
        explanation: ["Java `PriorityQueue` with `Collections.reverseOrder()` serves as an effective max-heap.", "Simulating the game by always polling the two largest elements.", "Efficiently updates the game state in O(log N) per smash.", "Handles small and large sets of stones with uniform complexity."]
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

console.log("Written heap problems part 2.");
