import { Problem } from '../../../types/problem';

export const containerWithMostWater: Problem = {
  id: "container-with-most-water",
  title: "Container With Most Water",
  difficulty: "Medium",
  topic: "Arrays",
  tags: ["array","two-pointers"],
  prompt: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
  constraints: ["n == height.length","2 <= n <= 10^5","0 <= height[i] <= 10^4"],
  examples: [
  {
    "input": "height = [1,8,6,2,5,4,8,3,7]",
    "output": "49",
    "explanation": "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def maxArea(height):\n    l, r = 0, len(height) - 1\n    res = 0\n    while l < r:\n        area = (r - l) * min(height[l], height[r])\n        res = max(res, area)\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    return res",
    "explanation": [
      "Use two pointers starting at the extremes of the array.",
      "Calculate the container area determined by the shorter building.",
      "Update max area.",
      "Move the pointer that has the shorter line inward."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <algorithm>\n\nclass Solution {\npublic:\n    int maxArea(std::vector<int>& height) {\n        int l = 0, r = height.size() - 1;\n        int maxArea = 0;\n        while (l < r) {\n            int currentArea = std::min(height[l], height[r]) * (r - l);\n            maxArea = std::max(maxArea, currentArea);\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxArea;\n    }\n};",
    "explanation": [
      "Set left and right pointers at ends of height array.",
      "The area is limited by min(height[l], height[r]).",
      "Shift the pointer that represents the bottleneck (the shorter height) inward to seek a potentially higher line."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int maxArea(int[] height) {\n        int maxarea = 0;\n        int left = 0;\n        int right = height.length - 1;\n        while (left < right) {\n            int width = right - left;\n            maxarea = Math.max(maxarea, Math.min(height[left], height[right]) * width);\n            if (height[left] <= height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return maxarea;\n    }\n}",
    "explanation": [
      "Initialize boundaries (left, right) and maxarea.",
      "Loop while left < right.",
      "Compute area using width * min height.",
      "Advance only the pointer sitting at the shorter bar."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Only 2 elements","Flat heights"]
};
