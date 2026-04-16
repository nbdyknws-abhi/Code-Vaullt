import { Problem } from '../../../types/problem';

export const singleThreadedCpu: Problem = {
  id: "single-threaded-cpu",
  title: "Single-Threaded CPU",
  difficulty: "Medium",
  topic: "Heap & Priority Queue",
  tags: ["array","sorting","heap-priority-queue"],
  prompt: "You are given `n` tasks, each with an enqueue time and a processing time. A single-threaded CPU can process only one task at a time and once it starts, it will process it until completion.\n\nWhen the CPU is idle, it will pick the task with the shortest processing time from the available tasks (already enqueued). If multiple tasks have the same shortest processing time, the CPU picks the one with the smallest index.\n\nReturn the order in which the CPU will process the tasks.",
  constraints: ["tasks.length == n","1 <= n <= 10^5","tasks[i].length == 2","1 <= enqueueTime, processingTime <= 10^9"],
  examples: [
  {
    "input": "tasks = [[1,2],[2,4],[3,2],[4,1]]",
    "output": "[0,2,3,1]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def getOrder(self, tasks: List[List[int]]) -> List[int]:\n        for i, t in enumerate(tasks):\n            t.append(i)\n        tasks.sort(key = lambda t: t[0])\n        \n        res, minHeap = [], []\n        i, time = 0, tasks[0][0]\n        \n        while minHeap or i < len(tasks):\n            while i < len(tasks) and tasks[i][0] <= time:\n                heapq.heappush(minHeap, [tasks[i][1], tasks[i][2]])\n                i += 1\n            \n            if not minHeap:\n                time = tasks[i][0]\n            else:\n                procTime, index = heapq.heappop(minHeap)\n                time += procTime\n                res.append(index)\n        return res",
    "explanation": [
      "Sort original tasks by enqueue time to handle arrival sequence.",
      "Use a min-heap to store 'available' tasks, ordered by processing time and then original index.",
      "Simulation loop: increment global `time`, add all newly available tasks to the heap, and execute the best candidate from the heap.",
      "Handle CPU idle time by jumping `time` forward to the next task's enqueue time if the heap is empty."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<int> getOrder(vector<vector<int>>& tasks) {\n        int n = tasks.size();\n        vector<vector<int>> sortedTasks(n, vector<int>(3));\n        for (int i = 0; i < n; i++) {\n            sortedTasks[i] = {tasks[i][0], tasks[i][1], i};\n        }\n        sort(sortedTasks.begin(), sortedTasks.end());\n        \n        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n        vector<int> res;\n        long long time = 0;\n        int i = 0;\n        \n        while (i < n || !pq.empty()) {\n            if (pq.empty() && time < sortedTasks[i][0]) {\n                time = sortedTasks[i][0];\n            }\n            while (i < n && sortedTasks[i][0] <= time) {\n                pq.push({sortedTasks[i][1], sortedTasks[i][2]});\n                i++;\n            }\n            auto [proc, idx] = pq.top(); pq.pop();\n            time += proc;\n            res.push_back(idx);\n        }\n        return res;\n    }\n};",
    "explanation": [
      "Apply greedy scheduling simulation with a custom-conditioned min-priority queue.",
      "Tasks are enqueued into the 'available' heap based on the current CPU timeline.",
      "The priority queue prioritizes shortest processing time, then smallest index.",
      "Use `long long` for `time` to prevent overflow on very long task sequences."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int[] getOrder(int[][] tasks) {\n        int n = tasks.length;\n        int[][] extendedTasks = new int[n][3];\n        for (int i = 0; i < n; i++) extendedTasks[i] = new int[]{tasks[i][0], tasks[i][1], i};\n        Arrays.sort(extendedTasks, (a, b) -> Integer.compare(a[0], b[0]));\n        \n        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] == b[1] ? a[2] - b[2] : a[1] - b[1]);\n        int[] res = new int[n];\n        long time = 0;\n        int i = 0, j = 0;\n        \n        while (i < n || !pq.isEmpty()) {\n            if (pq.isEmpty() && time < extendedTasks[i][0]) time = extendedTasks[i][0];\n            while (i < n && extendedTasks[i][0] <= time) {\n                pq.add(extendedTasks[i++]);\n            }\n            int[] current = pq.poll();\n            time += current[1];\n            res[j++] = current[2];\n        }\n        return res;\n    }\n}",
    "explanation": [
      "Sort and simulate the CPU scheduling process.",
      "A `PriorityQueue` helps select the 'easiest' available task at any given time point.",
      "Proper handling of idle CPU gaps by jumping the `time` pointer to the next available enqueue window.",
      "Total operation takes O(N log N) dominated by sorting and heap maintenance."
    ]
  }
],
  timeComplexity: "O(N log N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Tasks with identical times","Large processing gaps"]
};
