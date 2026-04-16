import { Problem } from '../../../types/problem';

export const lastStoneWeight: Problem = {
  id: "last-stone-weight",
  title: "Last Stone Weight",
  difficulty: "Easy",
  topic: "Heap & Priority Queue",
  tags: ["array","heap-priority-queue"],
  prompt: "You are given an array of integers `stones` where `stones[i]` is the weight of the `i`th stone.\n\nWe are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights `x` and `y` with `x <= y`. The result of this smash is:\n- If `x == y`, both stones are destroyed;\n- If `x != y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.\n\nAt the end of the game, there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return 0.",
  constraints: ["1 <= stones.length <= 30","1 <= stones[i] <= 1000"],
  examples: [
  {
    "input": "stones = [2,7,4,1,8,1]",
    "output": "1"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def lastStoneWeight(self, stones: List[int]) -> int:\n        stones = [-s for s in stones]\n        heapq.heapify(stones)\n        \n        while len(stones) > 1:\n            first = heapq.heappop(stones)\n            second = heapq.heappop(stones)\n            if first != second:\n                heapq.heappush(stones, first - second)\n                \n        return -stones[0] if stones else 0",
    "explanation": [
      "Use a max-heap (negative values in Python) to always pick the two heaviest stones in O(log N) time.",
      "Continue the smashing process until fewer than two stones remain.",
      "If the two stones aren't identical, push the difference back into the heap.",
      "Return the last stone's weight or 0 if all were destroyed."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int lastStoneWeight(vector<int>& stones) {\n        priority_queue<int> pq(stones.begin(), stones.end());\n        while (pq.size() > 1) {\n            int y = pq.top(); pq.pop();\n            int x = pq.top(); pq.pop();\n            if (x != y) pq.push(y - x);\n        }\n        return pq.empty() ? 0 : pq.top();\n    }\n};",
    "explanation": [
      "Standard max-priority queue simulation of the stone game.",
      "The heap automatically keeps the heaviest stones at the top after every insertion/removal.",
      "The loop continues efficiently until the game conditions for termination are met.",
      "O(N log N) total time for the demolition sequence."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int lastStoneWeight(int[] stones) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());\n        for (int s : stones) pq.add(s);\n        while (pq.size() > 1) {\n            int y = pq.poll();\n            int x = pq.poll();\n            if (y > x) pq.add(y - x);\n        }\n        return pq.isEmpty() ? 0 : pq.peek();\n    }\n}",
    "explanation": [
      "Java `PriorityQueue` with `Collections.reverseOrder()` serves as an effective max-heap.",
      "Simulating the game by always polling the two largest elements.",
      "Efficiently updates the game state in O(log N) per smash.",
      "Handles small and large sets of stones with uniform complexity."
    ]
  }
],
  timeComplexity: "O(N log N)",
  spaceComplexity: "O(N)",
  edgeCases: ["All stones same weight","Only one stone initially"]
};
