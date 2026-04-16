import { Problem } from '../../../types/problem';

export const ipo: Problem = {
  id: "ipo",
  title: "IPO",
  difficulty: "Hard",
  topic: "Heap & Priority Queue",
  tags: ["array","greedy","sorting","heap-priority-queue"],
  prompt: "Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most `k` distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most `k` distinct projects.\n\nYou are given `n` projects where the `i`th project has a pure profit `profits[i]` and a minimum capital of `capital[i]` is needed to start it.\n\nInitially, you have `w` capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.\n\nPick a list of at most `k` distinct projects from given projects to maximize your final capital, and return the final maximized capital.",
  constraints: ["1 <= k <= 10^5","0 <= w <= 10^9","n == profits.length == capital.length","1 <= n <= 10^5","0 <= profits[i] <= 10^4","0 <= capital[i] <= 10^9"],
  examples: [
  {
    "input": "k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]",
    "output": "4",
    "explanation": "Start with w=0. Only project with cap=0 can be started (profit 1). w becomes 1. Now project with cap=1 can be started (profit 3). Total = 4."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:\n        maxProfit = [] # maxHeap\n        minCapital = [] # minHeap (stores [capital, profit])\n        \n        for i in range(len(profits)):\n            heapq.heappush(minCapital, [capital[i], profits[i]])\n            \n        for _ in range(k):\n            while minCapital and minCapital[0][0] <= w:\n                c, p = heapq.heappop(minCapital)\n                heapq.heappush(maxProfit, -p)\n                \n            if not maxProfit:\n                break\n            w += -heapq.heappop(maxProfit)\n        return w",
    "explanation": [
      "Use two heaps: a min-heap to sort projects by their required capital and a max-heap to select the most profitable available project.",
      "In each step, move all projects that the current capital `w` can afford into the max-profit heap.",
      "Select and execute the highest profit project from the max-heap to increase `w`.",
      "Repeat `k` times or until no more projects can be started."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {\n        int n = profits.size();\n        vector<pair<int, int>> projects;\n        for (int i = 0; i < n; i++) projects.push_back({capital[i], profits[i]});\n        sort(projects.begin(), projects.end());\n        \n        priority_queue<int> maxProfit;\n        int i = 0;\n        while (k--) {\n            while (i < n && projects[i].first <= w) {\n                maxProfit.push(projects[i].second);\n                i++;\n            }\n            if (maxProfit.empty()) break;\n            w += maxProfit.top();\n            maxProfit.pop();\n        }\n        return w;\n    }\n};",
    "explanation": [
      "Sort projects by their required capital for systematic access.",
      "A max-priority queue stores profits of projects currently affordable with current capital.",
      "By picking the highest profit among available projects (Greedy), we maximize subsequent purchasing power.",
      "Logarithmic heap operations inside the loop provide an efficient O(N log N) total time complexity."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {\n        int n = profits.length;\n        int[][] projects = new int[n][2];\n        for (int i = 0; i < n; i++) projects[i] = new int[]{capital[i], profits[i]};\n        Arrays.sort(projects, (a, b) -> a[0] - b[0]);\n        \n        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());\n        int i = 0;\n        while (k > 0) {\n            while (i < n && projects[i][0] <= w) {\n                pq.add(projects[i++][1]);\n            }\n            if (pq.isEmpty()) break;\n            w += pq.poll();\n            k--;\n        }\n        return w;\n    }\n}",
    "explanation": [
      "Pair projects using a 2D array and sort primarily by capital requirements.",
      "A max-heap (`pq`) efficiently prioritizes the most profitable projects among those currently actionable.",
      "Gains in capital potentially unlock more expensive projects in the next iteration.",
      "Greedy selection ensures the final output capital is strictly maximized."
    ]
  }
],
  timeComplexity: "O(N log N + K log N)",
  spaceComplexity: "O(N)",
  edgeCases: ["No projects can be started","k is larger than available projects"]
};
