import { Problem } from '../../../types/problem';

export const uglyNumberIi: Problem = {
  id: "ugly-number-ii",
  title: "Ugly Number II",
  difficulty: "Medium",
  topic: "Heap & Priority Queue",
  tags: ["hash-table","math","dynamic-programming","heap-priority-queue"],
  prompt: "An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.\n\nGiven an integer `n`, return the `n`th ugly number.",
  constraints: ["1 <= n <= 1690"],
  examples: [
  {
    "input": "n = 10",
    "output": "12",
    "explanation": "[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def nthUglyNumber(self, n: int) -> int:\n        minHeap = [1]\n        visit = {1}\n        primes = [2, 3, 5]\n        \n        for i in range(n):\n            res = heapq.heappop(minHeap)\n            if i == n - 1:\n                return res\n            for p in primes:\n                if res * p not in visit:\n                    visit.add(res * p)\n                    heapq.heappush(minHeap, res * p)\n        return 0",
    "explanation": [
      "Generate ugly numbers by multiplying existing ugly numbers by 2, 3, and 5.",
      "Use a min-heap to always extract the smallest newly generated ugly number.",
      "Use a 'visit' set to ensure each ugly number is added to the heap only once.",
      "After `n` pops, the last popped number is the result."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int nthUglyNumber(int n) {\n        priority_queue<long, vector<long>, greater<long>> pq;\n        unordered_set<long> seen;\n        pq.push(1);\n        seen.insert(1);\n        \n        long curr = 1;\n        for (int i = 0; i < n; i++) {\n            curr = pq.top(); pq.pop();\n            for (int factor : {2, 3, 5}) {\n                long next = curr * factor;\n                if (seen.find(next) == seen.end()) {\n                    pq.push(next);\n                    seen.insert(next);\n                }\n            }\n        }\n        return (int)curr;\n    }\n};",
    "explanation": [
      "Systematically generate sequence elements using a priority queue to maintain order.",
      "The factors 2, 3, and 5 are applied to every discovered ugly number to breed the next set.",
      "The unique constraint is handled by a hash set to prune duplicates from the heap.",
      "Returns the $n$-th extracted value, ensuring sequence correctness."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int nthUglyNumber(int n) {\n        PriorityQueue<Long> pq = new PriorityQueue<>();\n        Set<Long> seen = new HashSet<>();\n        pq.add(1L);\n        seen.add(1L);\n        long res = 1;\n        for (int i = 0; i < n; i++) {\n            res = pq.poll();\n            for (int p : new int[]{2, 3, 5}) {\n                if (!seen.contains(res * p)) {\n                    pq.add(res * p);\n                    seen.add(res * p);\n                }\n            }\n        }\n        return (int)res;\n    }\n}",
    "explanation": [
      "Leverage a Long-based PriorityQueue to avoid overflow during generation of large ugly numbers.",
      "Each iteration computes potential successors, adding them to the priority queue if they haven't been visited.",
      "By processing in ascending order, we guarantee the sequence is built correctly until the target index is reached.",
      "Effective O(N log N) solution for generating sequence values under constraints."
    ]
  }
],
  timeComplexity: "O(N log N)",
  spaceComplexity: "O(N)",
  edgeCases: ["n=1","n is very large"]
};
