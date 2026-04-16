import { Problem } from '../../../types/problem';

export const mergeIntervals: Problem = {
  id: "merge-intervals",
  title: "Merge Intervals",
  difficulty: "Medium",
  topic: "Arrays",
  tags: ["array","sorting"],
  prompt: "Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
  constraints: ["1 <= intervals.length <= 10^4","intervals[i].length == 2","0 <= starti <= endi <= 10^4"],
  examples: [
  {
    "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
    "output": "[[1,6],[8,10],[15,18]]",
    "explanation": "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = []\n    for interval in intervals:\n        if not merged or merged[-1][1] < interval[0]:\n            merged.append(interval)\n        else:\n            merged[-1][1] = max(merged[-1][1], interval[1])\n    return merged",
    "explanation": [
      "Sort the intervals based on the starting value.",
      "Create an empty array to store merged intervals.",
      "Iterate through the intervals. If the list of merged intervals is empty or if the current interval does not overlap with the previous, append it.",
      "Otherwise, there is overlap, so we merge the current and previous intervals."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <algorithm>\n\nclass Solution {\npublic:\n    std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {\n        std::sort(intervals.begin(), intervals.end());\n        std::vector<std::vector<int>> merged;\n        for (auto interval : intervals) {\n            if (merged.empty() || merged.back()[1] < interval[0]) {\n                merged.push_back(interval);\n            } else {\n                merged.back()[1] = std::max(merged.back()[1], interval[1]);\n            }\n        }\n        return merged;\n    }\n};",
    "explanation": [
      "Sort intervals by their starting points.",
      "Iterate over them, keeping track of the merged intervals in a new vector.",
      "Compare the end of the last merged interval with the start of the current interval.",
      "Update the end time if they overlap."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.Arrays;\nimport java.util.LinkedList;\n\nclass Solution {\n    public int[][] merge(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        LinkedList<int[]> merged = new LinkedList<>();\n        for (int[] interval : intervals) {\n            if (merged.isEmpty() || merged.getLast()[1] < interval[0]) {\n                merged.add(interval);\n            } else {\n                merged.getLast()[1] = Math.max(merged.getLast()[1], interval[1]);\n            }\n        }\n        return merged.toArray(new int[merged.size()][]);\n    }\n}",
    "explanation": [
      "Use Arrays.sort with a custom comparator to sort by start coordinate.",
      "Use a LinkedList for fast appends and access to the last element.",
      "Merge if overlapping, otherwise append the new interval.",
      "Convert LinkedList back to a 2D array."
    ]
  }
],
  timeComplexity: "O(N log N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Empty intervals","Fully nested intervals"]
};
