import { Problem } from '../../../types/problem';

export const graphValidTree: Problem = {
  id: "graph-valid-tree",
  title: "Graph Valid Tree",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["depth-first-search","breadth-first-search","graph","union-find"],
  prompt: "Given `n` nodes labeled from `0` to `n - 1` and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.",
  constraints: ["1 <= n <= 2000","0 <= edges.length <= 5000"],
  examples: [
  {
    "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
    "output": "true"
  },
  {
    "input": "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
    "output": "false"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def validTree(self, n: int, edges: List[List[int]]) -> bool:\n        if not n:\n            return True\n        adj = {i: [] for i in range(n)}\n        for n1, n2 in edges:\n            adj[n1].append(n2)\n            adj[n2].append(n1)\n            \n        visit = set()\n        def dfs(i, prev):\n            if i in visit:\n                return False\n            \n            visit.add(i)\n            for nei in adj[i]:\n                if nei == prev:\n                    continue\n                if not dfs(nei, i):\n                    return False\n            return True\n            \n        return dfs(0, -1) and n == len(visit)",
    "explanation": [
      "A graph is a tree if it is connected and has no cycles.",
      "Use DFS to detect cycles: if a neighbor has already been visited and is NOT the parent/previous node, a cycle exists.",
      "After the DFS, check if the number of visited nodes equals `n` to ensure connectivity."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    bool validTree(int n, vector<vector<int>>& edges) {\n        if (edges.size() != n - 1) return false;\n        vector<int> parent(n);\n        for (int i = 0; i < n; i++) parent[i] = i;\n        \n        for (auto& edge : edges) {\n            int r1 = find(parent, edge[0]);\n            int r2 = find(parent, edge[1]);\n            if (r1 == r2) return false;\n            parent[r1] = r2;\n        }\n        return true;\n    }\nprivate:\n    int find(vector<int>& p, int i) {\n        if (p[i] == i) return i;\n        return p[i] = find(p, p[i]);\n    }\n};",
    "explanation": [
      "Apply Union-Find (Disjoint Set Union) for efficiency.",
      "Property: a valid tree of `n` nodes must have exactly `n-1` edges. If not, return false immediately.",
      "While processing edges, if any two nodes already share the same root, an additional edge would create a cycle.",
      "Path compression optimizes the find operation to near-constant time."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public boolean validTree(int n, int[][] edges) {\n        if (edges.length != n - 1) return false;\n        int[] parent = new int[n];\n        for (int i = 0; i < n; i++) parent[i] = i;\n        for (int[] edge : edges) {\n            int root1 = find(parent, edge[0]);\n            int root2 = find(parent, edge[1]);\n            if (root1 == root2) return false;\n            parent[root1] = root2;\n        }\n        return true;\n    }\n    \n    private int find(int[] parent, int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent, parent[i]);\n    }\n}",
    "explanation": [
      "Utilize the mathematical property that a tree with `V` vertices must have `V-1` edges.",
      "Union-Find with path compression identifies if any edge creates a loop.",
      "If no loops are found and edge count is correct, the graph is guaranteed to be a valid connected tree.",
      "Handles large input sizes gracefully with efficient memory usage."
    ]
  }
],
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V + E)",
  edgeCases: ["Empty graph","Disconnected graph"]
};
