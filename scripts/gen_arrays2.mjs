import fs from 'fs';
import path from 'path';

const arraysData = {
  "merge-intervals": {
    title: "Merge Intervals", difficulty: "Medium", topic: "Arrays", tags: ["array", "sorting"],
    prompt: "Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= starti <= endi <= 10^4"],
    examples: [{input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."}],
    timeComplexity: "O(N log N)", spaceComplexity: "O(N)", edgeCases: ["Empty intervals", "Fully nested intervals"],
    solutions: [
      {
        language: "python",
        code: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for interval in intervals:
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
    return merged`,
        explanation: ["Sort the intervals based on the starting value.", "Create an empty array to store merged intervals.", "Iterate through the intervals. If the list of merged intervals is empty or if the current interval does not overlap with the previous, append it.", "Otherwise, there is overlap, so we merge the current and previous intervals."]
      },
      {
        language: "cpp",
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
        std::sort(intervals.begin(), intervals.end());
        std::vector<std::vector<int>> merged;
        for (auto interval : intervals) {
            if (merged.empty() || merged.back()[1] < interval[0]) {
                merged.push_back(interval);
            } else {
                merged.back()[1] = std::max(merged.back()[1], interval[1]);
            }
        }
        return merged;
    }
};`,
        explanation: ["Sort intervals by their starting points.", "Iterate over them, keeping track of the merged intervals in a new vector.", "Compare the end of the last merged interval with the start of the current interval.", "Update the end time if they overlap."]
      },
      {
        language: "java",
        code: `import java.util.Arrays;
import java.util.LinkedList;

class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        LinkedList<int[]> merged = new LinkedList<>();
        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.getLast()[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.getLast()[1] = Math.max(merged.getLast()[1], interval[1]);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`,
        explanation: ["Use Arrays.sort with a custom comparator to sort by start coordinate.", "Use a LinkedList for fast appends and access to the last element.", "Merge if overlapping, otherwise append the new interval.", "Convert LinkedList back to a 2D array."]
      }
    ]
  },
  "product-of-array-except-self": {
    title: "Product of Array Except Self", difficulty: "Medium", topic: "Arrays", tags: ["array", "prefix-sum"],
    prompt: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.",
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"],
    examples: [{input: "nums = [1,2,3,4]", output: "[24,12,8,6]", explanation: "For i=0: 2*3*4 = 24. For i=1: 1*3*4 = 12, etc."}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["Array with zeros", "Negative values"],
    solutions: [
      {
        language: "python",
        code: `def productExceptSelf(nums):
    n = len(nums)
    res = [1] * n
    
    left = 1
    for i in range(n):
        res[i] = left
        left *= nums[i]
        
    right = 1
    for i in range(n - 1, -1, -1):
        res[i] *= right
        right *= nums[i]
        
    return res`,
        explanation: ["Initialize a result array with 1s.", "First pass (forward): calculate the running prefix product (excluding current cell) and store it.", "Second pass (backward): calculate the running suffix product and multiply it by the existing prefix product in the result array."]
      },
      {
        language: "cpp",
        code: `#include <vector>

class Solution {
public:
    std::vector<int> productExceptSelf(std::vector<int>& nums) {
        int n = nums.size();
        std::vector<int> res(n, 1);
        int left = 1;
        for (int i = 0; i < n; i++) {
            res[i] = left;
            left *= nums[i];
        }
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
};`,
        explanation: ["Use the output array to gather left running products.", "Then iterate backwards through the array while maintaining a right running product.", "Multiply the right product directly into the answer array for O(1) extra space outside the answer array."]
      },
      {
        language: "java",
        code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
}`,
        explanation: ["Instantiate the result array and populate it with prefix aggregates in one pass.", "Start a right accumulator at 1.", "Walk the array backwards, multiplying the right accumulator into the result at that index and updating the right accumulator."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'arrays');

Object.keys(arraysData).forEach(id => {
  const data = arraysData[id];
  let varName = id.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
  if (/^[0-9]/.test(varName)) varName = '_' + varName;

  const content = `import { Problem } from '../../../types/problem';

export const ${varName}: Problem = {
  id: "${id}",
  title: "${data.title}",
  difficulty: "${data.difficulty}",
  topic: "${data.topic}",
  tags: ${JSON.stringify(data.tags)},
  prompt: ${JSON.stringify(data.prompt)},
  constraints: ${JSON.stringify(data.constraints)},
  examples: ${JSON.stringify(data.examples, null, 2)},
  solutions: ${JSON.stringify(data.solutions, null, 2)},
  timeComplexity: "${data.timeComplexity}",
  spaceComplexity: "${data.spaceComplexity}",
  edgeCases: ${JSON.stringify(data.edgeCases)}
};
`;
  fs.writeFileSync(path.join(targetDir, `${id}.ts`), content);
});

console.log("Written detailed array problems part 2.");
