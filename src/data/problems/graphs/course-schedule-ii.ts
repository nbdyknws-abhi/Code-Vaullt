import { Problem } from '../../../types/problem';

export const courseScheduleIi: Problem = {
  id: "course-schedule-ii",
  title: "Course Schedule II",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["depth-first-search","breadth-first-search","graph","topological-sort"],
  prompt: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nReturn the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.",
  constraints: ["1 <= numCourses <= 2000","0 <= prerequisites.length <= numCourses * (numCourses - 1)","prerequisites[i].length == 2","0 <= ai, bi < numCourses","ai != bi","All the pairs [ai, bi] are distinct."],
  examples: [
  {
    "input": "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
    "output": "[0,2,1,3]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:\n        adj = {i: [] for i in range(numCourses)}\n        for crs, pre in prerequisites:\n            adj[crs].append(pre)\n            \n        output = []\n        visit, cycle = set(), set()\n        \n        def dfs(crs):\n            if crs in cycle: return False\n            if crs in visit: return True\n            \n            cycle.add(crs)\n            for pre in adj[crs]:\n                if not dfs(pre): return False\n            cycle.remove(crs)\n            visit.add(crs)\n            output.append(crs)\n            return True\n            \n        for c in range(numCourses):\n            if not dfs(c): return []\n        return output",
    "explanation": [
      "Implement topological sort using DFS.",
      "Maintain two sets: `visit` for nodes fully processed and `cycle` for nodes currently in the recursion stack.",
      "Append the course to the `output` list after all its prerequisites have been visited.",
      "If a cycle is detected, return an empty list immediately."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> indegree(numCourses, 0);\n        for (auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            indegree[p[0]]++;\n        }\n        \n        queue<int> q;\n        for (int i = 0; i < numCourses; i++) {\n            if (indegree[i] == 0) q.push(i);\n        }\n        \n        vector<int> order;\n        while (!q.empty()) {\n            int curr = q.front(); q.pop();\n            order.push_back(curr);\n            for (int neighbor : adj[curr]) {\n                if (--indegree[neighbor] == 0) q.push(neighbor);\n            }\n        }\n        return (order.size() == numCourses) ? order : vector<int>();\n    }\n};",
    "explanation": [
      "Utilize Kahn's algorithm for BFS-based topological sorting.",
      "Populate an integer queue with nodes having zero dependencies.",
      "As nodes are removed, add them to the result vector and update their neighbors.",
      "Check the final order size against the course count to validate the existence of a valid schedule."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int[] findOrder(int numCourses, int[][] prerequisites) {\n        ArrayList<Integer>[] adj = new ArrayList[numCourses];\n        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();\n        int[] inDegree = new int[numCourses];\n        for (int[] p : prerequisites) {\n            adj[p[1]].add(p[0]);\n            inDegree[p[0]]++;\n        }\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (inDegree[i] == 0) q.add(i);\n        }\n        int[] res = new int[numCourses];\n        int i = 0;\n        while (!q.isEmpty()) {\n            int curr = q.poll();\n            res[i++] = curr;\n            for (int next : adj[curr]) {\n                if (--inDegree[next] == 0) q.add(next);\n            }\n        }\n        return i == numCourses ? res : new int[0];\n    }\n}",
    "explanation": [
      "Determine the linear sequence of courses using a queue-based topological search strategy.",
      "Nodes are selected for the schedule once their dependency count reaches zero.",
      "Effective result accumulation in a fixed-size integer array.",
      "The final verification returns the array only if all courses were successfully ordered into a DAG."
    ]
  }
],
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V + E)",
  edgeCases: ["Disconnected components","Self-loops check"]
};
