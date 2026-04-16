import { Problem } from '../../../types/problem';

export const courseSchedule: Problem = {
  id: "course-schedule",
  title: "Course Schedule",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["depth-first-search","breadth-first-search","graph","topological-sort"],
  prompt: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.",
  constraints: ["1 <= numCourses <= 2000","0 <= prerequisites.length <= 5000","prerequisites[i].length == 2","0 <= ai, bi < numCourses","All the pairs prerequisites[i] are unique."],
  examples: [
  {
    "input": "numCourses = 2, prerequisites = [[1,0]]",
    "output": "true"
  },
  {
    "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
    "output": "false"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        preMap = {i: [] for i in range(numCourses)}\n        for crs, pre in prerequisites:\n            preMap[crs].append(pre)\n            \n        visiting = set()\n        \n        def dfs(crs):\n            if crs in visiting:\n                return False\n            if preMap[crs] == []:\n                return True\n                \n            visiting.add(crs)\n            for pre in preMap[crs]:\n                if not dfs(pre): return False\n            visiting.remove(crs)\n            preMap[crs] = []\n            return True\n            \n        for crs in range(numCourses):\n            if not dfs(crs): return False\n        return True",
    "explanation": [
      "Build an adjacency list (`preMap`) where each course points to its prerequisites.",
      "Use DFS to check for cycles in the dependency graph.",
      "A course is problematic if we encounter it while it's already in the `visiting` set (detecting a back-edge in DFS).",
      "Optimization: once a node is confirmed as part of a path that can be finished, empty its prerequisites in the map to skip re-processing."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> indegree(numCourses, 0);\n        for (auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            indegree[p[0]]++;\n        }\n        \n        queue<int> q;\n        for (int i = 0; i < numCourses; i++) {\n            if (indegree[i] == 0) q.push(i);\n        }\n        \n        int count = 0;\n        while (!q.empty()) {\n            int curr = q.front(); q.pop();\n            count++;\n            for (int next : adj[curr]) {\n                if (--indegree[next] == 0) q.push(next);\n            }\n        }\n        return count == numCourses;\n    }\n};",
    "explanation": [
      "Use Kahn's Algorithm (BFS-based Topological Sort) to find a valid ordering.",
      "Technically, if a Directed Acyclic Graph (DAG) exists, the sort should process all nodes.",
      "Courses with 0 in-degree (no prerequisites) are processed first.",
      "Decreasing the in-degree of neighbors as you process a node; if a neighbor's in-degree hits 0, add it to the queue."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        ArrayList<Integer>[] adj = new ArrayList[numCourses];\n        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();\n        int[] inDegree = new int[numCourses];\n        for (int[] p : prerequisites) {\n            adj[p[1]].add(p[0]);\n            inDegree[p[0]]++;\n        }\n        Queue<Integer> queue = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (inDegree[i] == 0) queue.add(i);\n        }\n        int count = 0;\n        while (!queue.isEmpty()) {\n            int curr = queue.poll();\n            count++;\n            for (int next : adj[curr]) {\n                if (--inDegree[next] == 0) queue.add(next);\n            }\n        }\n        return count == numCourses;\n    }\n}",
    "explanation": [
      "Apply Kahn's algorithm for topological sorting.",
      "The process mimics completing courses without pending prerequisites.",
      "If a cycle exists, some nodes will never have their in-degree reach zero.",
      "Comparison between the count of processed nodes and `numCourses` determines if a full schedule is possible."
    ]
  }
],
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V + E)",
  edgeCases: ["No prerequisites","Cyclic dependency"]
};
