import { Problem } from '../../../types/problem';

export const numberOfConnectedComponents: Problem = {
  id: "number-of-connected-components",
  title: "Number of Connected Components",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["depth-first-search","breadth-first-search","graph","union-find"],
  prompt: "You have a graph of `n` nodes. You are given an integer `n` and an array `edges` where `edges[i] = [ai, bi]` indicates that there is an edge between `ai` and `bi` in the graph.\n\nReturn the number of connected components in the graph.",
  constraints: ["1 <= n <= 2000","0 <= edges.length <= 5000","edges[i].length == 2","0 <= ai <= bi < n","ai != bi","There are no repeated edges."],
  examples: [
  {
    "input": "n = 5, edges = [[0,1],[1,2],[3,4]]",
    "output": "2"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def countComponents(self, n: int, edges: List[List[int]]) -> int:\n        parent = [i for i in range(n)]\n        rank = [1] * n\n        \n        def find(n1):\n            res = n1\n            while res != parent[res]:\n                parent[res] = parent[parent[res]]\n                res = parent[res]\n            return res\n            \n        def union(n1, n2):\n            p1, p2 = find(n1), find(n2)\n            if p1 == p2:\n                return 0\n            if rank[p1] > rank[p2]:\n                parent[p2] = p1\n                rank[p1] += rank[p2]\n            else:\n                parent[p1] = p2\n                rank[p2] += rank[p1]\n            return 1\n            \n        res = n\n        for n1, n2 in edges:\n            res -= union(n1, n2)\n        return res",
    "explanation": [
      "Use Union-Find to group connected nodes.",
      "Initially assume there are `n` separate components.",
      "For every edge connecting two previously separate components, decrement the component count.",
      "Union-Find with path compression and union-by-rank ensures high performance."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int countComponents(int n, vector<vector<int>>& edges) {\n        vector<int> parent(n);\n        iota(parent.begin(), parent.end(), 0);\n        int components = n;\n        for (auto& edge : edges) {\n            int r1 = find(parent, edge[0]);\n            int r2 = find(parent, edge[1]);\n            if (r1 != r2) {\n                parent[r1] = r2;\n                components--;\n            }\n        }\n        return components;\n    }\nprivate:\n    int find(vector<int>& p, int i) {\n        if (p[i] == i) return i;\n        return p[i] = find(p, p[i]);\n    }\n};",
    "explanation": [
      "Track the number of separate sets using Disjoint Set Union.",
      "Merging two sets reduces the total component tally by exactly 1.",
      "Efficiency is bolstered by recursive path compression in the `find` helper function.",
      "Initial state of $n$ disconnected nodes is gradually bridged by the provided edges."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int countComponents(int n, int[][] edges) {\n        int[] parent = new int[n];\n        for (int i = 0; i < n; i++) parent[i] = i;\n        int res = n;\n        for (int[] edge : edges) {\n            int p1 = find(parent, edge[0]);\n            int p2 = find(parent, edge[1]);\n            if (p1 != p2) {\n                parent[p1] = p2;\n                res--;\n            }\n        }\n        return res;\n    }\n    \n    private int find(int[] parent, int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent, parent[i]);\n    }\n}",
    "explanation": [
      "Compute graph connectivity by merging node components based on edges.",
      "A decrement in the result variable occurs whenever a new bridge is established between disjoint sets.",
      "Union-Find provides sub-linear complexity for large-scale node connectivity checks.",
      "Algorithm reliably returns isolated node count if no edges are present."
    ]
  }
],
  timeComplexity: "O(V + E * alpha(V))",
  spaceComplexity: "O(V)",
  edgeCases: ["No edges","All isolated nodes"]
};
