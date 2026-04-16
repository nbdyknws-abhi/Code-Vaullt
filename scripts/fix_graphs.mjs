import fs from 'fs';
import path from 'path';

const graphData = {
  "graph-valid-tree": {
    title: "Graph Valid Tree", difficulty: "Medium", topic: "Graphs", tags: ["depth-first-search", "breadth-first-search", "graph", "union-find"],
    prompt: "Given `n` nodes labeled from `0` to `n - 1` and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.",
    constraints: ["1 <= n <= 2000", "0 <= edges.length <= 5000"],
    examples: [{input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", output: "true"}, {input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]", output: "false"}],
    timeComplexity: "O(V + E)", spaceComplexity: "O(V + E)", edgeCases: ["Empty graph", "Disconnected graph"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        if not n:
            return True
        adj = {i: [] for i in range(n)}
        for n1, n2 in edges:
            adj[n1].append(n2)
            adj[n2].append(n1)
            
        visit = set()
        def dfs(i, prev):
            if i in visit:
                return False
            
            visit.add(i)
            for nei in adj[i]:
                if nei == prev:
                    continue
                if not dfs(nei, i):
                    return False
            return True
            
        return dfs(0, -1) and n == len(visit)`,
        explanation: ["A graph is a tree if it is connected and has no cycles.", "Use DFS to detect cycles: if a neighbor has already been visited and is NOT the parent/previous node, a cycle exists.", "After the DFS, check if the number of visited nodes equals `n` to ensure connectivity."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if (edges.size() != n - 1) return false;
        vector<int> parent(n);
        for (int i = 0; i < n; i++) parent[i] = i;
        
        for (auto& edge : edges) {
            int r1 = find(parent, edge[0]);
            int r2 = find(parent, edge[1]);
            if (r1 == r2) return false;
            parent[r1] = r2;
        }
        return true;
    }
private:
    int find(vector<int>& p, int i) {
        if (p[i] == i) return i;
        return p[i] = find(p, p[i]);
    }
};`,
        explanation: ["Apply Union-Find (Disjoint Set Union) for efficiency.", "Property: a valid tree of `n` nodes must have exactly `n-1` edges. If not, return false immediately.", "While processing edges, if any two nodes already share the same root, an additional edge would create a cycle.", "Path compression optimizes the find operation to near-constant time."]
      },
      {
        language: "java",
        code: `class Solution {
    public boolean validTree(int n, int[][] edges) {
        if (edges.length != n - 1) return false;
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        for (int[] edge : edges) {
            int root1 = find(parent, edge[0]);
            int root2 = find(parent, edge[1]);
            if (root1 == root2) return false;
            parent[root1] = root2;
        }
        return true;
    }
    
    private int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }
}`,
        explanation: ["Utilize the mathematical property that a tree with `V` vertices must have `V-1` edges.", "Union-Find with path compression identifies if any edge creates a loop.", "If no loops are found and edge count is correct, the graph is guaranteed to be a valid connected tree.", "Handles large input sizes gracefully with efficient memory usage."]
      }
    ]
  },
  "network-delay-time": {
    title: "Network Delay Time", difficulty: "Medium", topic: "Graphs", tags: ["depth-first-search", "breadth-first-search", "graph", "shortest-path", "heap-priority-queue"],
    prompt: "You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.\n\nWe will send a signal from a given node `k`. Return the minimum time it takes for all the `n` nodes to receive the signal. If it is impossible for all the `n` nodes to receive the signal, return -1.",
    constraints: ["1 <= k <= n <= 100", "1 <= times.length <= 6000", "target, source in [1, n]", "0 <= weight <= 100"],
    examples: [{input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2", output: "2"}],
    timeComplexity: "O(E log V)", spaceComplexity: "O(V + E)", edgeCases: ["Disconnected graph", "Self-loops"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        adj = collections.defaultdict(list)
        for u, v, w in times:
            adj[u].append((v, w))
            
        minHeap = [(0, k)]
        visit = set()
        t = 0
        while minHeap:
            w1, n1 = heapq.heappop(minHeap)
            if n1 in visit:
                continue
            visit.add(n1)
            t = max(t, w1)
            
            for n2, w2 in adj[n1]:
                if n2 not in visit:
                    heapq.heappush(minHeap, (w1 + w2, n2))
                    
        return t if len(visit) == n else -1`,
        explanation: ["This is a classic Single-Source Shortest Path problem — use Dijkstra's Algorithm.", "Maintain a min-heap of `(accumulated_time, node)` to always expand the node reachable with the minimum delay.", "Keep track of visited nodes to avoid redundant work.", "The answer is the largest of all shortest paths from node `k`. Return -1 if not all nodes were visited."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int, int>>> adj(n + 1);
        for (auto& t : times) adj[t[0]].push_back({t[1], t[2]});
        
        vector<int> dist(n + 1, INT_MAX);
        dist[k] = 0;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        pq.push({0, k});
        
        while (!pq.empty()) {
            int d = pq.top().first;
            int u = pq.top().second;
            pq.pop();
            if (d > dist[u]) continue;
            for (auto& edge : adj[u]) {
                int v = edge.first;
                int w = edge.second;
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }
        
        int res = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == INT_MAX) return -1;
            res = max(res, dist[i]);
        }
        return res;
    }
};`,
        explanation: ["Implement Dijkstra's algorithm using a min-priority queue.", "Relax distances for each outgoing edge when a shorter path is discovered.", "Complexity is O(E log V) because each edge is added to the heap at most once.", "Check if any node remains unreachable by verifying its final recorded distance."]
      },
      {
        language: "java",
        code: `class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        Map<Integer, List<int[]>> adj = new HashMap<>();
        for (int[] t : times) {
            adj.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});
        }
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.add(new int[]{0, k});
        Map<Integer, Integer> dist = new HashMap<>();
        
        while (!pq.isEmpty()) {
            int[] info = pq.poll();
            int d = info[0], node = info[1];
            if (dist.containsKey(node)) continue;
            dist.put(node, d);
            if (adj.containsKey(node)) {
                for (int[] edge : adj.get(node)) {
                    if (!dist.containsKey(edge[0])) {
                        pq.add(new int[]{d + edge[1], edge[0]});
                    }
                }
            }
        }
        if (dist.size() != n) return -1;
        int max = 0;
        for (int d : dist.values()) max = Math.max(max, d);
        return max;
    }
}`,
        explanation: ["Execute Dijkstra's strategy to calculate network traversal costs from origin node `k`.", "HashMaps handle sparse graph representation efficiently.", "Result is valid only if the visited set size matches node count `n`.", "Extract the peak delay value from the map to determine total transmission time."]
      }
    ]
  },
  "find-eventual-safe-states": {
    title: "Find Eventual Safe States", difficulty: "Medium", topic: "Graphs", tags: ["depth-first-search", "breadth-first-search", "graph", "topological-sort"],
    prompt: "There is a directed graph of `n` nodes with each node labeled from `0` to `n - 1`. The graph is represented by a 0-indexed 2D integer array `graph` where `graph[i]` is an integer array of nodes adjacent to node `i`, meaning there is an edge from node `i` to each node in `graph[i]`.\n\nA node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).\n\nReturn an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.",
    constraints: ["n == graph.length", "1 <= n <= 10^4", "0 <= graph[i].length <= n", "0 <= graph[i][j] <= n - 1", "graph[i] is sorted in a strictly increasing order.", "The graph may contain self-loops."],
    examples: [{input: "graph = [[1,2],[2,3],[5],[0],[5],[],[]]", output: "[2,4,5,6]"}],
    timeComplexity: "O(V + E)", spaceComplexity: "O(V)", edgeCases: ["Self-loops", "All nodes in a cycle"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
        n = len(graph)
        safe = {}
        
        def dfs(i):
            if i in safe:
                return safe[i]
            safe[i] = False
            for nei in graph[i]:
                if not dfs(nei):
                    return False
            safe[i] = True
            return True
            
        res = []
        for i in range(n):
            if dfs(i):
                res.append(i)
        return res`,
        explanation: ["A node is safe if it is NOT part of a cycle and doesn't lead to one.", "Use DFS with memoization to track node states: currently visiting (False) or confirmed safe (True).", "If we revisit a node that's already 'visiting' but not yet 'safe', we found a cycle.", "Iterate through all nodes and collect those confirmed as safe."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, 0); // 0: unvisited, 1: visiting, 2: safe
        vector<int> res;
        for (int i = 0; i < n; i++) {
            if (isSafe(graph, color, i)) res.push_back(i);
        }
        return res;
    }
private:
    bool isSafe(vector<vector<int>>& g, vector<int>& color, int node) {
        if (color[node] > 0) return color[node] == 2;
        color[node] = 1;
        for (int neighbor : g[node]) {
            if (!isSafe(g, color, neighbor)) return false;
        }
        color[node] = 2;
        return true;
    }
};`,
        explanation: ["Apply 3-color DFS algorithm to detect cycles in a directed graph.", "Color 1 (Gray/Visiting) indicates a cycle if encountered again.", "Color 2 (Black/Safe) marks a node as processed and confirmed to lead only to terminal nodes.", "Recursive traversal identifies safe paths in O(V+E) time."]
      },
      {
        language: "java",
        code: `class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        int[] states = new int[n]; // 0: unvisited, 1: visiting, 2: safe
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (dfs(graph, i, states)) res.add(i);
        }
        return res;
    }
    
    private boolean dfs(int[][] g, int i, int[] states) {
        if (states[i] > 0) return states[i] == 2;
        states[i] = 1;
        for (int neighbor : g[i]) {
            if (!dfs(g, neighbor, states)) return false;
        }
        states[i] = 2;
        return true;
    }
}`,
        explanation: ["Implement cycle detection to isolate nodes that terminate naturally.", "Using a state array (tri-color marking) avoids redundant traversals across graph branches.", "Nodes that don't trigger cycle detection during their recursive exploration are added to the safe list.", "Final list is naturally sorted by the order of calculation (0 to n-1)."]
      }
    ]
  },
  "number-of-connected-components": {
    title: "Number of Connected Components", difficulty: "Medium", topic: "Graphs", tags: ["depth-first-search", "breadth-first-search", "graph", "union-find"],
    prompt: "You have a graph of `n` nodes. You are given an integer `n` and an array `edges` where `edges[i] = [ai, bi]` indicates that there is an edge between `ai` and `bi` in the graph.\n\nReturn the number of connected components in the graph.",
    constraints: ["1 <= n <= 2000", "0 <= edges.length <= 5000", "edges[i].length == 2", "0 <= ai <= bi < n", "ai != bi", "There are no repeated edges."],
    examples: [{input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2"}],
    timeComplexity: "O(V + E * alpha(V))", spaceComplexity: "O(V)", edgeCases: ["No edges", "All isolated nodes"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        parent = [i for i in range(n)]
        rank = [1] * n
        
        def find(n1):
            res = n1
            while res != parent[res]:
                parent[res] = parent[parent[res]]
                res = parent[res]
            return res
            
        def union(n1, n2):
            p1, p2 = find(n1), find(n2)
            if p1 == p2:
                return 0
            if rank[p1] > rank[p2]:
                parent[p2] = p1
                rank[p1] += rank[p2]
            else:
                parent[p1] = p2
                rank[p2] += rank[p1]
            return 1
            
        res = n
        for n1, n2 in edges:
            res -= union(n1, n2)
        return res`,
        explanation: ["Use Union-Find to group connected nodes.", "Initially assume there are `n` separate components.", "For every edge connecting two previously separate components, decrement the component count.", "Union-Find with path compression and union-by-rank ensures high performance."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        vector<int> parent(n);
        iota(parent.begin(), parent.end(), 0);
        int components = n;
        for (auto& edge : edges) {
            int r1 = find(parent, edge[0]);
            int r2 = find(parent, edge[1]);
            if (r1 != r2) {
                parent[r1] = r2;
                components--;
            }
        }
        return components;
    }
private:
    int find(vector<int>& p, int i) {
        if (p[i] == i) return i;
        return p[i] = find(p, p[i]);
    }
};`,
        explanation: ["Track the number of separate sets using Disjoint Set Union.", "Merging two sets reduces the total component tally by exactly 1.", "Efficiency is bolstered by recursive path compression in the `find` helper function.", "Initial state of $n$ disconnected nodes is gradually bridged by the provided edges."]
      },
      {
        language: "java",
        code: `class Solution {
    public int countComponents(int n, int[][] edges) {
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        int res = n;
        for (int[] edge : edges) {
            int p1 = find(parent, edge[0]);
            int p2 = find(parent, edge[1]);
            if (p1 != p2) {
                parent[p1] = p2;
                res--;
            }
        }
        return res;
    }
    
    private int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }
}`,
        explanation: ["Compute graph connectivity by merging node components based on edges.", "A decrement in the result variable occurs whenever a new bridge is established between disjoint sets.", "Union-Find provides sub-linear complexity for large-scale node connectivity checks.", "Algorithm reliably returns isolated node count if no edges are present."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'graphs');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

Object.keys(graphData).forEach(id => {
  const data = graphData[id];
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

console.log("Updated Graphs fixed placeholders.");
