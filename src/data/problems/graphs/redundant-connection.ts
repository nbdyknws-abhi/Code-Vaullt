import { Problem } from '../../../types/problem';

export const redundantConnection: Problem = {
  id: "redundant-connection",
  title: "Redundant Connection",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["tree","union-find","graph"],
  prompt: "In this problem, a tree is an undirected graph that is connected and has no cycles.\n\nYou are given a graph that started as a tree with `n` nodes faced with one additional edge added. The added edge has two different vertices chosen from `1` to `n`, and was not an edge that already existed. The graph is represented as an array `edges` of length `n` where `edges[i] = [ai, bi]` i indicates that there is an edge between nodes `ai` and `bi` in the graph.\n\nReturn an edge that can be removed so that the resulting graph is a tree of `n` nodes. If there are multiple answers, return the answer that occurs last in the input.",
  constraints: ["n == edges.length","3 <= n <= 1000","edges[i].length == 2","1 <= ai < bi <= edges.length","ai != bi","There are no repeated edges.","The given graph is connected."],
  examples: [
  {
    "input": "edges = [[1,2],[1,3],[2,3]]",
    "output": "[2,3]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:\n        parent = [i for i in range(len(edges) + 1)]\n        rank = [1] * (len(edges) + 1)\n        \n        def find(n):\n            p = parent[n]\n            while p != parent[p]:\n                parent[p] = parent[parent[p]]\n                p = parent[p]\n            return p\n            \n        def union(n1, n2):\n            p1, p2 = find(n1), find(n2)\n            if p1 == p2:\n                return False\n            if rank[p1] > rank[p2]:\n                parent[p2] = p1\n                rank[p1] += rank[p2]\n            else:\n                parent[p1] = p2\n                rank[p2] += rank[p1]\n            return True\n            \n        for n1, n2 in edges:\n            if not union(n1, n2):\n                return [n1, n2]",
    "explanation": [
      "Use the Union-Find (Disjoint Set Union) data structure to detect the first edge that connects two nodes already in the same component.",
      "The `find` function uses path compression to optimize future searches.",
      "The `union` function joins two components based on their rank to keep the tree balanced.",
      "The first edge for which `union` returns False is the one creating the cycle, and thus redundant."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\n    vector<int> parent;\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]);\n    }\npublic:\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\n        int n = edges.size();\n        parent.resize(n + 1);\n        for (int i = 1; i <= n; i++) parent[i] = i;\n        \n        for (auto& edge : edges) {\n            int root1 = find(edge[0]);\n            int root2 = find(edge[1]);\n            if (root1 == root2) return edge;\n            parent[root1] = root2;\n        }\n        return {};\n    }\n};",
    "explanation": [
      "Isolate the redundant edge using Disjoint Set Union (DSU) with path compression.",
      "Path compression optimizes the find implementation to nearly O(1) amortized time.",
      "Cycle detection: if two endpoints of an edge find the same root, the edge is a back-edge creating a cycle.",
      "Iterating through edges as provided ensures we find the 'last occurring' cycle edge as required."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int[] findRedundantConnection(int[][] edges) {\n        int[] parent = new int[edges.length + 1];\n        for (int i = 1; i <= edges.length; i++) parent[i] = i;\n        \n        for (int[] edge : edges) {\n            int p1 = find(parent, edge[0]);\n            int p2 = find(parent, edge[1]);\n            if (p1 == p2) return edge;\n            parent[p1] = p2;\n        }\n        return new int[0];\n    }\n    \n    private int find(int[] parent, int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent, parent[i]);\n    }\n}",
    "explanation": [
      "Apply the Union-Find algorithm with recursive path compression for efficient connectivity tracking.",
      "Every edge is processed exactly once; if both nodes already share a parent, the edge closes a loop.",
      "The array-based parent tracking provides O(n) space efficiency.",
      "Returns the first edge that would violate the tree property of the graph."
    ]
  }
],
  timeComplexity: "O(N * alpha(N))",
  spaceComplexity: "O(N)",
  edgeCases: ["Smallest cycle size 3"]
};
