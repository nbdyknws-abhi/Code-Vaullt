import { Problem } from '../../../types/problem';

export const findEventualSafeStates: Problem = {
  id: "find-eventual-safe-states",
  title: "Find Eventual Safe States",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["depth-first-search","breadth-first-search","graph","topological-sort"],
  prompt: "There is a directed graph of `n` nodes with each node labeled from `0` to `n - 1`. The graph is represented by a 0-indexed 2D integer array `graph` where `graph[i]` is an integer array of nodes adjacent to node `i`, meaning there is an edge from node `i` to each node in `graph[i]`.\n\nA node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).\n\nReturn an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.",
  constraints: ["n == graph.length","1 <= n <= 10^4","0 <= graph[i].length <= n","0 <= graph[i][j] <= n - 1","graph[i] is sorted in a strictly increasing order.","The graph may contain self-loops."],
  examples: [
  {
    "input": "graph = [[1,2],[2,3],[5],[0],[5],[],[]]",
    "output": "[2,4,5,6]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:\n        n = len(graph)\n        safe = {}\n        \n        def dfs(i):\n            if i in safe:\n                return safe[i]\n            safe[i] = False\n            for nei in graph[i]:\n                if not dfs(nei):\n                    return False\n            safe[i] = True\n            return True\n            \n        res = []\n        for i in range(n):\n            if dfs(i):\n                res.append(i)\n        return res",
    "explanation": [
      "A node is safe if it is NOT part of a cycle and doesn't lead to one.",
      "Use DFS with memoization to track node states: currently visiting (False) or confirmed safe (True).",
      "If we revisit a node that's already 'visiting' but not yet 'safe', we found a cycle.",
      "Iterate through all nodes and collect those confirmed as safe."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {\n        int n = graph.size();\n        vector<int> color(n, 0); // 0: unvisited, 1: visiting, 2: safe\n        vector<int> res;\n        for (int i = 0; i < n; i++) {\n            if (isSafe(graph, color, i)) res.push_back(i);\n        }\n        return res;\n    }\nprivate:\n    bool isSafe(vector<vector<int>>& g, vector<int>& color, int node) {\n        if (color[node] > 0) return color[node] == 2;\n        color[node] = 1;\n        for (int neighbor : g[node]) {\n            if (!isSafe(g, color, neighbor)) return false;\n        }\n        color[node] = 2;\n        return true;\n    }\n};",
    "explanation": [
      "Apply 3-color DFS algorithm to detect cycles in a directed graph.",
      "Color 1 (Gray/Visiting) indicates a cycle if encountered again.",
      "Color 2 (Black/Safe) marks a node as processed and confirmed to lead only to terminal nodes.",
      "Recursive traversal identifies safe paths in O(V+E) time."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public List<Integer> eventualSafeNodes(int[][] graph) {\n        int n = graph.length;\n        int[] states = new int[n]; // 0: unvisited, 1: visiting, 2: safe\n        List<Integer> res = new ArrayList<>();\n        for (int i = 0; i < n; i++) {\n            if (dfs(graph, i, states)) res.add(i);\n        }\n        return res;\n    }\n    \n    private boolean dfs(int[][] g, int i, int[] states) {\n        if (states[i] > 0) return states[i] == 2;\n        states[i] = 1;\n        for (int neighbor : g[i]) {\n            if (!dfs(g, neighbor, states)) return false;\n        }\n        states[i] = 2;\n        return true;\n    }\n}",
    "explanation": [
      "Implement cycle detection to isolate nodes that terminate naturally.",
      "Using a state array (tri-color marking) avoids redundant traversals across graph branches.",
      "Nodes that don't trigger cycle detection during their recursive exploration are added to the safe list.",
      "Final list is naturally sorted by the order of calculation (0 to n-1)."
    ]
  }
],
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V)",
  edgeCases: ["Self-loops","All nodes in a cycle"]
};
