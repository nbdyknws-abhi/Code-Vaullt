import fs from 'fs';
import path from 'path';

const arraysData = {
  "3sum": {
    title: "3Sum", difficulty: "Medium", topic: "Arrays", tags: ["array", "two-pointers", "sorting"],
    prompt: "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    examples: [{input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "The distinct triplets are [-1,0,1] and [-1,-1,2]."}],
    timeComplexity: "O(N^2)", spaceComplexity: "O(1)", edgeCases: ["All zeros", "Fewer than 3 elements"],
    solutions: [
      {
        language: "python",
        code: `def threeSum(nums):
    res = []
    nums.sort()
    for i in range(len(nums)):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s > 0:
                r -= 1
            elif s < 0:
                l += 1
            else:
                res.append([nums[i], nums[l], nums[r]])
                l += 1
                while nums[l] == nums[l-1] and l < r:
                    l += 1
    return res`,
        explanation: ["Sort the array first to handle duplicates easily.", "Iterate fixed pointer i through the array.", "Use two pointers (l, r) to find pairs that sum to -nums[i].", "Skip duplicate values for i and l to avoid duplicate triplets."]
      },
      {
        language: "cpp",
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {
        std::vector<std::vector<int>> res;
        std::sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size(); i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum > 0) r--;
                else if (sum < 0) l++;
                else {
                    res.push_back({nums[i], nums[l], nums[r]});
                    l++;
                    while (nums[l] == nums[l - 1] && l < r) l++;
                }
            }
        }
        return res;
    }
};`,
        explanation: ["Sort the array to enable two-pointer search.", "Iterate using a standard loop, skipping adjacent duplicate heads.", "Use two pointers converging from ends of the remaining subset.", "Advance left pointer past duplicates upon finding a valid triplet."]
      },
      {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length && nums[i] <= 0; ++i) {
            if (i == 0 || nums[i - 1] != nums[i]) {
                int lo = i + 1, hi = nums.length - 1;
                while (lo < hi) {
                    int sum = nums[i] + nums[lo] + nums[hi];
                    if (sum < 0) {
                        lo++;
                    } else if (sum > 0) {
                        hi--;
                    } else {
                        res.add(Arrays.asList(nums[i], nums[lo++], nums[hi--]));
                        while (lo < hi && nums[lo] == nums[lo - 1])
                            ++lo;
                    }
                }
            }
        }
        return res;
    }
}`,
        explanation: ["Arrays.sort ensures duplicates group together and allows early stopping if nums[i] > 0.", "Iterate keeping track of the target as -nums[i].", "Use two pointers (lo, hi) searching for the inverse sums.", "Move pointers safely bypassing duplicates."]
      }
    ]
  },
  "container-with-most-water": {
    title: "Container With Most Water", difficulty: "Medium", topic: "Arrays", tags: ["array", "two-pointers"],
    prompt: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    examples: [{input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["Only 2 elements", "Flat heights"],
    solutions: [
      {
        language: "python",
        code: `def maxArea(height):
    l, r = 0, len(height) - 1
    res = 0
    while l < r:
        area = (r - l) * min(height[l], height[r])
        res = max(res, area)
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return res`,
        explanation: ["Use two pointers starting at the extremes of the array.", "Calculate the container area determined by the shorter building.", "Update max area.", "Move the pointer that has the shorter line inward."]
      },
      {
        language: "cpp",
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxArea(std::vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int maxArea = 0;
        while (l < r) {
            int currentArea = std::min(height[l], height[r]) * (r - l);
            maxArea = std::max(maxArea, currentArea);
            if (height[l] < height[r]) l++;
            else r--;
        }
        return maxArea;
    }
};`,
        explanation: ["Set left and right pointers at ends of height array.", "The area is limited by min(height[l], height[r]).", "Shift the pointer that represents the bottleneck (the shorter height) inward to seek a potentially higher line."]
      },
      {
        language: "java",
        code: `class Solution {
    public int maxArea(int[] height) {
        int maxarea = 0;
        int left = 0;
        int right = height.length - 1;
        while (left < right) {
            int width = right - left;
            maxarea = Math.max(maxarea, Math.min(height[left], height[right]) * width);
            if (height[left] <= height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxarea;
    }
}`,
        explanation: ["Initialize boundaries (left, right) and maxarea.", "Loop while left < right.", "Compute area using width * min height.", "Advance only the pointer sitting at the shorter bar."]
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

console.log("Written detailed array problems part 3.");
