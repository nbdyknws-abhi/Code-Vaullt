import { Problem } from '../../../types/problem';

export const networkDelayTime: Problem = {
  id: "network-delay-time",
  title: "Network Delay Time",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["depth-first-search","breadth-first-search","graph","shortest-path","heap-priority-queue"],
  prompt: "You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.\n\nWe will send a signal from a given node `k`. Return the minimum time it takes for all the `n` nodes to receive the signal. If it is impossible for all the `n` nodes to receive the signal, return -1.",
  constraints: ["1 <= k <= n <= 100","1 <= times.length <= 6000","target, source in [1, n]","0 <= weight <= 100"],
  examples: [
  {
    "input": "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
    "output": "2"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:\n        adj = collections.defaultdict(list)\n        for u, v, w in times:\n            adj[u].append((v, w))\n            \n        minHeap = [(0, k)]\n        visit = set()\n        t = 0\n        while minHeap:\n            w1, n1 = heapq.heappop(minHeap)\n            if n1 in visit:\n                continue\n            visit.add(n1)\n            t = max(t, w1)\n            \n            for n2, w2 in adj[n1]:\n                if n2 not in visit:\n                    heapq.heappush(minHeap, (w1 + w2, n2))\n                    \n        return t if len(visit) == n else -1",
    "explanation": [
      "This is a classic Single-Source Shortest Path problem — use Dijkstra's Algorithm.",
      "Maintain a min-heap of `(accumulated_time, node)` to always expand the node reachable with the minimum delay.",
      "Keep track of visited nodes to avoid redundant work.",
      "The answer is the largest of all shortest paths from node `k`. Return -1 if not all nodes were visited."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int networkDelayTime(vector<vector<int>>& times, int n, int k) {\n        vector<vector<pair<int, int>>> adj(n + 1);\n        for (auto& t : times) adj[t[0]].push_back({t[1], t[2]});\n        \n        vector<int> dist(n + 1, INT_MAX);\n        dist[k] = 0;\n        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n        pq.push({0, k});\n        \n        while (!pq.empty()) {\n            int d = pq.top().first;\n            int u = pq.top().second;\n            pq.pop();\n            if (d > dist[u]) continue;\n            for (auto& edge : adj[u]) {\n                int v = edge.first;\n                int w = edge.second;\n                if (dist[u] + w < dist[v]) {\n                    dist[v] = dist[u] + w;\n                    pq.push({dist[v], v});\n                }\n            }\n        }\n        \n        int res = 0;\n        for (int i = 1; i <= n; i++) {\n            if (dist[i] == INT_MAX) return -1;\n            res = max(res, dist[i]);\n        }\n        return res;\n    }\n};",
    "explanation": [
      "Implement Dijkstra's algorithm using a min-priority queue.",
      "Relax distances for each outgoing edge when a shorter path is discovered.",
      "Complexity is O(E log V) because each edge is added to the heap at most once.",
      "Check if any node remains unreachable by verifying its final recorded distance."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int networkDelayTime(int[][] times, int n, int k) {\n        Map<Integer, List<int[]>> adj = new HashMap<>();\n        for (int[] t : times) {\n            adj.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});\n        }\n        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);\n        pq.add(new int[]{0, k});\n        Map<Integer, Integer> dist = new HashMap<>();\n        \n        while (!pq.isEmpty()) {\n            int[] info = pq.poll();\n            int d = info[0], node = info[1];\n            if (dist.containsKey(node)) continue;\n            dist.put(node, d);\n            if (adj.containsKey(node)) {\n                for (int[] edge : adj.get(node)) {\n                    if (!dist.containsKey(edge[0])) {\n                        pq.add(new int[]{d + edge[1], edge[0]});\n                    }\n                }\n            }\n        }\n        if (dist.size() != n) return -1;\n        int max = 0;\n        for (int d : dist.values()) max = Math.max(max, d);\n        return max;\n    }\n}",
    "explanation": [
      "Execute Dijkstra's strategy to calculate network traversal costs from origin node `k`.",
      "HashMaps handle sparse graph representation efficiently.",
      "Result is valid only if the visited set size matches node count `n`.",
      "Extract the peak delay value from the map to determine total transmission time."
    ]
  }
],
  timeComplexity: "O(E log V)",
  spaceComplexity: "O(V + E)",
  edgeCases: ["Disconnected graph","Self-loops"]
};
