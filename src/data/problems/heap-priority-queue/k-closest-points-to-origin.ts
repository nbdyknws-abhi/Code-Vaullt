import { Problem } from '../../../types/problem';

export const kClosestPointsToOrigin: Problem = {
  id: "k-closest-points-to-origin",
  title: "K Closest Points to Origin",
  difficulty: "Medium",
  topic: "Heap & Priority Queue",
  tags: ["array","math","divide-and-conquer","geometry","sorting","heap-priority-queue","quickselect"],
  prompt: "Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)`.\n\nThe distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)^2 + (y1 - y2)^2).\n\nYou may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).",
  constraints: ["1 <= k <= points.length <= 10^4","-10^4 <= xi, yi <= 10^4"],
  examples: [
  {
    "input": "points = [[1,3],[-2,2]], k = 1",
    "output": "[[-2,2]]",
    "explanation": "The distance from (1, 3) to the origin is sqrt(10). The distance from (-2, 2) to the origin is sqrt(8). Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:\n        minHeap = []\n        for x, y in points:\n            dist = (x**2) + (y**2)\n            minHeap.append([dist, x, y])\n            \n        heapq.heapify(minHeap)\n        res = []\n        for _ in range(k):\n            dist, x, y = heapq.heappop(minHeap)\n            res.append([x, y])\n        return res",
    "explanation": [
      "Compute the squared Euclidean distance `x^2 + y^2` for each point (avoiding `sqrt` to preserve precision and efficiency).",
      "Store points with their distances in a min-heap.",
      "Extract the top `k` elements from the heap.",
      "Return the extracted coordinates as the result."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {\n        priority_queue<pair<int, int>> pq;\n        for (int i = 0; i < points.size(); i++) {\n            int dist = points[i][0] * points[i][0] + points[i][1] * points[i][1];\n            pq.push({dist, i});\n            if (pq.size() > k) pq.pop();\n        }\n        \n        vector<vector<int>> res;\n        while (!pq.empty()) {\n            res.push_back(points[pq.top().second]);\n            pq.pop();\n        }\n        return res;\n    }\n};",
    "explanation": [
      "Iteratively maintain a max-priority queue of size `k` to store the closest points discovered so far.",
      "By using a max-heap, the point currently 'farthest' among the top `k` candidates is at the top, making it easy to prune when a closer point is found.",
      "Each insertion/deletion is O(log k), making the total time O(n log k).",
      "Resulting list contains the `k` points with minimum origin distance."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int[][] kClosest(int[][] points, int k) {\n        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> \n            (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1])\n        );\n        for (int[] p : points) {\n            pq.add(p);\n            if (pq.size() > k) pq.poll();\n        }\n        int[][] res = new int[k][2];\n        while (k > 0) res[--k] = pq.poll();\n        return res;\n    }\n}",
    "explanation": [
      "Initialize a max-heap using a custom comparator that calculates squared distances.",
      "Inserting all points into the max-heap while maintaining size `k` naturally filters out the most distant points.",
      "Java's `PriorityQueue` with a reverse comparison effectively acts as the max-heap for distance pruning.",
      "Final result conversion maps the heap contents to a 2D array."
    ]
  }
],
  timeComplexity: "O(N log K)",
  spaceComplexity: "O(K)",
  edgeCases: ["k is the same as points length"]
};
