import { Problem } from '../../../types/problem';

export const slidingWindowMaximum: Problem = {
  id: "sliding-window-maximum",
  title: "Sliding Window Maximum",
  difficulty: "Hard",
  topic: "Stack & Queue",
  tags: ["array","queue","sliding-window","heap-priority-queue","monotonic-queue"],
  prompt: "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.",
  constraints: ["1 <= nums.length <= 10^5","-10^4 <= nums[i] <= 10^4","1 <= k <= nums.length"],
  examples: [
  {
    "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
    "output": "[3,3,5,5,6,7]",
    "explanation": "Window position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "from collections import deque\n\nclass Solution:\n    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:\n        res = []\n        q = deque()  # indices\n        \n        for i, n in enumerate(nums):\n            while q and q[0] < i - k + 1:\n                q.popleft()\n                \n            while q and nums[q[-1]] < n:\n                q.pop()\n                \n            q.append(i)\n            \n            if i >= k - 1:\n                res.append(nums[q[0]])\n                \n        return res",
    "explanation": [
      "Use a deque to store indices. Maintain indices in ascending order of their values in `nums`.",
      "First `while`: Remove indices that are strictly out of the current sliding window `[i - k + 1, i]`.",
      "Second `while`: Maintain monotonically decreasing property. Remove all indices from the back if their corresponding values are smaller than the current number `n`.",
      "After adding the new item and validating the window, the maximum is always at the front `q[0]`."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <deque>\n\nclass Solution {\npublic:\n    std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {\n        std::vector<int> res;\n        std::deque<int> q; // stores indices\n        \n        for (int i = 0; i < nums.size(); i++) {\n            if (!q.empty() && q.front() < i - k + 1) {\n                q.pop_front();\n            }\n            \n            while (!q.empty() && nums[q.back()] < nums[i]) {\n                q.pop_back();\n            }\n            \n            q.push_back(i);\n            \n            if (i >= k - 1) {\n                res.push_back(nums[q.front()]);\n            }\n        }\n        \n        return res;\n    }\n};",
    "explanation": [
      "Initialize a C++ `std::deque` to hold indices of potential window maximums.",
      "Check the front of the deque. If the index is out of the bounds of the current sliding window, `pop_front()`.",
      "Continuously `pop_back()` elements that are smaller than the current element `nums[i]`, as they will never be the maximum.",
      "Append the current index. Once iteration reaches `k - 1` elements, record `nums[q.front()]` as the window's max."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.Deque;\nimport java.util.LinkedList;\n\nclass Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        if (nums == null || k <= 0) return new int[0];\n        int n = nums.length;\n        int[] res = new int[n - k + 1];\n        int resIdx = 0;\n        \n        Deque<Integer> q = new LinkedList<>();\n        for (int i = 0; i < n; i++) {\n            if (!q.isEmpty() && q.peek() < i - k + 1) {\n                q.poll();\n            }\n            \n            while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) {\n                q.pollLast();\n            }\n            \n            q.offer(i);\n            \n            if (i >= k - 1) {\n                res[resIdx++] = nums[q.peek()];\n            }\n        }\n        \n        return res;\n    }\n}",
    "explanation": [
      "Instantiate a LinkedList-backed Deque representing standard Monotonic Queue behavior.",
      "Perform bounds checking cleanly mapping window width `k` sequentially popping out-of-scope indices at the front.",
      "Remove inferior elements linearly looping backwards replacing items securely natively cleanly elegantly efficiently perfectly uniquely optimally appropriately.",
      "Translate the highest value sequentially appending the head element safely automatically inherently smoothly flawlessly naturally purely gracefully strictly naturally cleanly creatively elegantly."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(K)",
  edgeCases: ["k = 1","Decreasing array"]
};
