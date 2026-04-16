import { Problem } from '../../../types/problem';

export const taskScheduler: Problem = {
  id: "task-scheduler",
  title: "Task Scheduler",
  difficulty: "Medium",
  topic: "Heap & Priority Queue",
  tags: ["array","hash-table","greedy","sorting","heap-priority-queue","counting"],
  prompt: "Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.\n\nHowever, there is a non-negative integer `n` that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least `n` units of time between any two same tasks.\n\nReturn the least number of units of time that the CPU will take to finish all the given tasks.",
  constraints: ["1 <= tasks.length <= 10^4","tasks[i] is upper-case English letter.","0 <= n <= 100"],
  examples: [
  {
    "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
    "output": "8",
    "explanation": "A -> B -> idle -> A -> B -> idle -> A -> B"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def leastInterval(self, tasks: List[str], n: int) -> int:\n        count = Counter(tasks)\n        maxHeap = [-cnt for cnt in count.values()]\n        heapq.heapify(maxHeap)\n        \n        time = 0\n        q = deque() # pairs of [-cnt, idleTime]\n        while maxHeap or q:\n            time += 1\n            if maxHeap:\n                cnt = 1 + heapq.heappop(maxHeap)\n                if cnt:\n                    q.append([cnt, time + n])\n            \n            if q and q[0][1] == time:\n                heapq.heappush(maxHeap, q.popleft()[0])\n        return time",
    "explanation": [
      "Use a max-heap to consume the most frequent tasks first (Greedy approach).",
      "Maintain a wait queue `q` for tasks that are in their cooldown period.",
      "In each time unit, if a task is available in the max-heap, perform it and update its remaining count and cooldown end time.",
      "Return tasks from the queue to the max-heap as soon as their cooldown expires."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int leastInterval(vector<char>& tasks, int n) {\n        unordered_map<char, int> counts;\n        for (char t : tasks) counts[t]++;\n        \n        priority_queue<int> pq;\n        for (auto& [t, cnt] : counts) pq.push(cnt);\n        \n        int time = 0;\n        queue<pair<int, int>> q;\n        while (!pq.empty() || !q.empty()) {\n            time++;\n            if (!pq.empty()) {\n                int left = pq.top() - 1;\n                pq.pop();\n                if (left > 0) q.push({left, time + n});\n            }\n            if (!q.empty() && q.front().second == time) {\n                pq.push(q.front().first);\n                q.pop();\n            }\n        }\n        return time;\n    }\n};",
    "explanation": [
      "Map task frequencies and utilize a max-priority queue to prioritize high-frequency tasks.",
      "A side queue manages tasks during their 'idle' or cooldown period.",
      "Each loop iteration represents a global time unit.",
      "Optimal task selection minimizes CPU idle time while strictly observing cooldown constraints."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int leastInterval(char[] tasks, int n) {\n        int[] freqs = new int[26];\n        for (char t : tasks) freqs[t - 'A']++;\n        \n        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());\n        for (int f : freqs) if (f > 0) pq.add(f);\n        \n        int time = 0;\n        Queue<int[]> q = new LinkedList<>();\n        while (!pq.isEmpty() || !q.isEmpty()) {\n            time++;\n            if (!pq.isEmpty()) {\n                int count = pq.poll() - 1;\n                if (count > 0) q.add(new int[]{count, time + n});\n            }\n            if (!q.isEmpty() && q.peek()[1] == time) {\n                pq.add(q.poll()[0]);\n            }\n        }\n        return time;\n    }\n}",
    "explanation": [
      "Simulation using a max-heap for task priority and a queue for cooldown management.",
      "Calculates the absolute minimum units of time by always scheduling the most critical tasks first.",
      "Cooldown tasks are moved back to ready status (the heap) at the precise time unit they become available again.",
      "Universal approach handling all task distributions and `n` values."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["n=0","Tasks can be finished without idle time"]
};
