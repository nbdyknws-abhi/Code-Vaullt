import fs from 'fs';
import path from 'path';

const recursionData = {
  "subsets": {
    title: "Subsets", difficulty: "Medium", topic: "Recursion & Backtracking", tags: ["array", "backtracking", "bit-manipulation"],
    prompt: "Given an integer array `nums` of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All the numbers of nums are unique."],
    examples: [{input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"}],
    timeComplexity: "O(2^N * N)", spaceComplexity: "O(N)", edgeCases: ["Empty array", "Single element array"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []
        subset = []
        
        def backtrack(i):
            if i >= len(nums):
                res.append(subset.copy())
                return
            
            # Decision to include nums[i]
            subset.append(nums[i])
            backtrack(i + 1)
            
            # Decision NOT to include nums[i]
            subset.pop()
            backtrack(i + 1)
            
        backtrack(0)
        return res`,
        explanation: ["Use a backtracking approach to explore all possible combinations.", "At each index, you have two choices: include the current number in the subset or exclude it.", "Recursively call the function for the next index for both choices.", "The base case is when the index reaches the length of the input array, at which point the current subset is added to the results."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> current;
        backtrack(nums, 0, current, res);
        return res;
    }
    
private:
    void backtrack(vector<int>& nums, int index, vector<int>& current, vector<vector<int>>& res) {
        res.push_back(current);
        for (int i = index; i < nums.size(); ++i) {
            current.push_back(nums[i]);
            backtrack(nums, i + 1, current, res);
            current.pop_back();
        }
    }
};`,
        explanation: ["Use a recursive backtracking function to generate all possible subsets.", "In each call, add the current subset to the result list.", "Iterate from the current index to the end of the array, adding each element to the subset and recursing.", "After the recursive call, remove the last added element (backtrack) to explore other possibilities."]
      },
      {
        language: "java",
        code: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(res, new ArrayList<>(), nums, 0);
        return res;
    }

    private void backtrack(List<List<Integer>> res, List<Integer> tempList, int[] nums, int start) {
        res.add(new ArrayList<>(tempList));
        for (int i = start; i < nums.length; i++) {
            tempList.add(nums[i]);
            backtrack(res, tempList, nums, i + 1);
            tempList.remove(tempList.size() - 1);
        }
    }
}`,
        explanation: ["Utilize a recursive backtracking method to explore the entire search space.", "The recursion explores subsets of increasing length starting from each element.", "The `tempList` holds the current state, which is copied into the result list at every step.", "Removing the last element (backtracking) allows the algorithm to explore other branches of the decision tree."]
      }
    ]
  },
  "permutations": {
    title: "Permutations", difficulty: "Medium", topic: "Recursion & Backtracking", tags: ["array", "backtracking"],
    prompt: "Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.",
    constraints: ["1 <= nums.length <= 6", "-10 <= nums[i] <= 10", "All the integers of nums are unique."],
    examples: [{input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"}],
    timeComplexity: "O(N! * N)", spaceComplexity: "O(N)", edgeCases: ["Single element array"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []
        
        def backtrack(start):
            if start == len(nums):
                res.append(nums[:])
                return
            
            for i in range(start, len(nums)):
                nums[start], nums[i] = nums[i], nums[start]
                backtrack(start + 1)
                nums[start], nums[i] = nums[i], nums[start]
                
        backtrack(0)
        return res`,
        explanation: ["Generate permutations by swapping elements within the input array.", "The `backtrack` function fixes one element at the `start` position and recurses to permute the rest.", "The swap back is the 'backtracking' step that restores the array for the next iteration of the loop.", "Base case occurs when `start` reaches the end of the array, meaning one complete permutation has been formed."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        backtrack(nums, 0, res);
        return res;
    }

private:
    void backtrack(vector<int>& nums, int start, vector<vector<int>>& res) {
        if (start == nums.size()) {
            res.push_back(nums);
            return;
        }
        for (int i = start; i < nums.size(); ++i) {
            swap(nums[start], nums[i]);
            backtrack(nums, start + 1, res);
            swap(nums[start], nums[i]);
        }
    }
};`,
        explanation: ["Implement a recursive backtracking algorithm using in-place swaps.", "The `start` parameter indicates the current position being fixed.", "Iterate through all possible candidates for the current position by swapping.", "A second swap (backtrack) restores original ordering to ensure all branches are explored correctly."]
      },
      {
        language: "java",
        code: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> list = new ArrayList<>();
        backtrack(list, new ArrayList<>(), nums);
        return list;
    }

    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] nums){
        if(tempList.size() == nums.length){
            list.add(new ArrayList<>(tempList));
        } else{
            for(int i = 0; i < nums.length; i++){ 
                if(tempList.contains(nums[i])) continue; // element already exists, skip
                tempList.add(nums[i]);
                backtrack(list, tempList, nums);
                tempList.remove(tempList.size() - 1);
            }
        }
    }
}`,
        explanation: ["Use a recursive approach to build permutations element by element.", "The `tempList` keeps track of the current permutation being built.", "Check if an element is already in the `tempList` to handle the 'distinct integers' requirement without extra space indices.", "Removing the last element (backtracking) resets the state for searching the next permutation branch."]
      }
    ]
  },
  "combination-sum": {
    title: "Combination Sum", difficulty: "Medium", topic: "Recursion & Backtracking", tags: ["array", "backtracking"],
    prompt: "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order.\n\nThe same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.",
    constraints: ["1 <= candidates.length <= 30", "1 <= candidates[i] <= 200", "All elements of candidates are distinct.", "1 <= target <= 500"],
    examples: [{input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]"}],
    timeComplexity: "O(N^(T/M)) where T is target, M is min value", spaceComplexity: "O(T/M)", edgeCases: ["No combinations possible"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []
        
        def backtrack(i, cur, total):
            if total == target:
                res.append(cur.copy())
                return
            if i >= len(candidates) or total > target:
                return
            
            # Decision to include candidates[i]
            cur.append(candidates[i])
            backtrack(i, cur, total + candidates[i])
            
            # Decision NOT to include candidates[i]
            cur.pop()
            backtrack(i + 1, cur, total)
            
        backtrack(0, [], 0)
        return res`,
        explanation: ["Apply a binary choice backtracking pattern at each element.", "Choose to include the current candidate (can be repeated, so index `i` remains the same) or skip it (index `i` moves to `i+1`).", "Prune the search if the current sum exceeds the target.", "Base cases include hitting the target sum (save result) or exhausting options."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> current;
        backtrack(candidates, target, 0, current, res);
        return res;
    }
    
private:
    void backtrack(vector<int>& candidates, int target, int index, vector<int>& current, vector<vector<int>>& res) {
        if (target == 0) {
            res.push_back(current);
            return;
        }
        for (int i = index; i < candidates.size(); ++i) {
            if (candidates[i] <= target) {
                current.push_back(candidates[i]);
                backtrack(candidates, target - candidates[i], i, current, res);
                current.pop_back();
            }
        }
    }
};`,
        explanation: ["Use a recursive search that subtracts candidates from the target value.", "By passing the current index `i` into the next recursive call, we allow reusing the same candidate multiple times.", "The loop ensures we explore all candidates starting from the current index.", "The condition `candidates[i] <= target` helps prune invalid path branches."]
      },
      {
        language: "java",
        code: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> list = new ArrayList<>();
        Arrays.sort(candidates);
        backtrack(list, new ArrayList<>(), candidates, target, 0);
        return list;
    }

    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] nums, int remain, int start){
        if(remain < 0) return;
        else if(remain == 0) list.add(new ArrayList<>(tempList));
        else{ 
            for(int i = start; i < nums.length; i++){
                tempList.add(nums[i]);
                backtrack(list, tempList, nums, remain - nums[i], i); // not i + 1 because we can reuse same elements
                tempList.remove(tempList.size() - 1);
            }
        }
    }
}`,
        explanation: ["The algorithm uses recursion to explore all paths where the sum equals the target.", "Sorting the candidates initially allows for more effective pruning if needed (though not strictly required for this logic).", "The `remain` parameter tracks the remaining sum needed to be zero.", "Reusing the index `i` in the recursive call enables multiple choices of the same candidate."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'recursion-backtracking');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

Object.keys(recursionData).forEach(id => {
  const data = recursionData[id];
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

console.log("Written recursion problems part 1.");
