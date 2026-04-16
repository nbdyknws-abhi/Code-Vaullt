import fs from 'fs';
import path from 'path';

const dpData = {
  "word-break": {
    title: "Word Break", difficulty: "Medium", topic: "Dynamic Programming", tags: ["hash-table", "string", "dynamic-programming", "memoization"],
    prompt: "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.",
    constraints: ["1 <= s.length <= 300", "1 <= wordDict.length <= 1000", "1 <= wordDict[i].length <= 20", "s and wordDict[i] consist of only lowercase English letters.", "All the strings of wordDict are unique."],
    examples: [{input: "s = \"leetcode\", wordDict = [\"leet\", \"code\"]", output: "true"}],
    timeComplexity: "O(N^2 * M) or O(N^3)", spaceComplexity: "O(N)", edgeCases: ["Empty string", "Word used multiple times"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        dp = [False] * (len(s) + 1)
        dp[len(s)] = True
        
        for i in range(len(s) - 1, -1, -1):
            for w in wordDict:
                if (i + len(w)) <= len(s) and s[i : i + len(w)] == w:
                    dp[i] = dp[i + len(w)]
                if dp[i]:
                    break
                    
        return dp[0]`,
        explanation: ["Use a bottom-up DP array where `dp[i]` represents whether the substring `s[i:]` can be broken into valid words.", "Iterate backwards from the end of the string.", "For each position, try to match every word in the dictionary. If a match is found and the remaining substring is also valid (checked via lookahead in `dp`), mark the current position as valid.", "The result is `dp[0]`."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        vector<bool> dp(s.length() + 1, false);
        dp[0] = true;
        
        for (int i = 1; i <= s.length(); i++) {
            for (const string& w : wordDict) {
                int start = i - w.length();
                if (start >= 0 && dp[start] && s.substr(start, w.length()) == w) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
};`,
        explanation: ["Tabulation approach: `dp[i]` is true if the prefix `s[0...i]` can be segmented.", "For each ending position `i`, check if any word from the dictionary ends there and if the prefix before that word was also valid.", "The `dp[0]` base case represents an empty string being validly segmentable.", "Final answer is `dp[s.length()]`."]
      },
      {
        language: "java",
        code: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        boolean[] dp = new boolean[s.length() + 1];
        Set<String> set = new HashSet<>(wordDict);
        dp[0] = true;
        
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}`,
        explanation: ["Convert the dictionary to a HashSet for O(1) average lookup time.", "Apply DP: a string of length `i` is breakable if there exists a split point `j` such that the prefix `s[0...j]` is breakable and the substring `s[j...i]` is in the dictionary.", "Result is stored in the last element of the boolean array.", "Algorithm explores all potential split points for each prefix."]
      }
    ]
  },
  "decode-ways": {
    title: "Decode Ways", difficulty: "Medium", topic: "Dynamic Programming", tags: ["string", "dynamic-programming"],
    prompt: "A message containing letters from `A-Z` can be encoded into numbers using the following mapping:\n'A' -> \"1\", 'B' -> \"2\", ... 'Z' -> \"26\"\n\nTo decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, \"11106\" can be mapped into:\n- \"AAJF\" with the grouping (1 1 10 6)\n- \"KJF\" with the grouping (11 10 6)\n\nNote that the grouping (1 11 06) is invalid because \"06\" cannot be mapped into 'F' since \"6\" is different from \"06\". Given a string `s` containing only digits, return the number of ways to decode it.",
    constraints: ["1 <= s.length <= 100", "s contains only digits and may contain leading zero(s)."],
    examples: [{input: "s = \"226\"", output: "3", explanation: "\"226\" could be decoded as \"BZ\" (2 26), \"VF\" (22 6), or \"BBF\" (2 2 6)."}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["String with leading zero", "String with '30' or '0' internally"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def numDecodings(self, s: str) -> int:
        if not s or s[0] == "0":
            return 0
            
        dp = { len(s) : 1 }
        for i in range(len(s) - 1, -1, -1):
            if s[i] == "0":
                dp[i] = 0
            else:
                dp[i] = dp[i + 1]
                
            if (i + 1 < len(s) and (s[i] == "1" or 
                (s[i] == "2" and s[i + 1] in "0123456"))):
                dp[i] += dp[i + 2]
                
        return dp[0]`,
        explanation: ["Use dynamic programming to count decoding options from right to left.", "A single digit `s[i]` can be decoded if it's not '0'.", "A double digit `s[i:i+2]` can be decoded if it's between '10' and '26'.", "Base case is reached at the end of the string (1 way to decode empty string).", "Sum the ways from both valid paths for each index."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int numDecodings(string s) {
        if (s.empty() || s[0] == '0') return 0;
        int n = s.length();
        vector<int> dp(n + 1, 0);
        dp[0] = 1;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            if (s[i-1] != '0') dp[i] += dp[i-1];
            int twoDigit = stoi(s.substr(i-2, 2));
            if (twoDigit >= 10 && twoDigit <= 26) dp[i] += dp[i-2];
        }
        return dp[n];
    }
};`,
        explanation: ["Tabulate the number of ways to decode the prefix of length `i`.", "One-digit case: if `s[i-1]` is valid (not '0'), it contributes `dp[i-1]` ways.", "Two-digit case: if `s[i-2...i-1]` forms a number from 10 to 26, it contributes `dp[i-2]` ways.", "Linear time complexity ensures efficiency for maximum input length."]
      },
      {
        language: "java",
        code: `class Solution {
    public int numDecodings(String s) {
        int n = s.length();
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = s.charAt(0) == '0' ? 0 : 1;
        
        for (int i = 2; i <= n; i++) {
            int first = Integer.valueOf(s.substring(i - 1, i));
            int second = Integer.valueOf(s.substring(i - 2, i));
            if (first >= 1 && first <= 9) {
               dp[i] += dp[i - 1];
            }
            if (second >= 10 && second <= 26) {
                dp[i] += dp[i - 2];
            }
        }
        return dp[n];
    }
}`,
        explanation: ["Determine ways to decode by combining results from sub-problems of length `i-1` and `i-2`.", "String parsing logic correctly identifies valid encoding mappings (1-26).", "The algorithm gracefully handles failing states (e.g., '0' inputs) by adding 0 to the current `dp[i]` result.", "Space optimization is possible, but O(N) is standard for clarity."]
      }
    ]
  },
  "partition-equal-subset-sum": {
    title: "Partition Equal Subset Sum", difficulty: "Medium", topic: "Dynamic Programming", tags: ["array", "dynamic-programming"],
    prompt: "Given a non-empty array `nums` containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.",
    constraints: ["1 <= nums.length <= 200", "1 <= nums[i] <= 100"],
    examples: [{input: "nums = [1,5,11,5]", output: "true", explanation: "The array can be partitioned as [1, 5, 5] and [11]."}],
    timeComplexity: "O(N * Sum)", spaceComplexity: "O(Sum)", edgeCases: ["Sum is odd", "Single element"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        if sum(nums) % 2:
            return False
            
        target = sum(nums) // 2
        dp = set([0])
        
        for n in nums:
            nextDP = set()
            for t in dp:
                if t + n == target:
                    return True
                nextDP.add(t + n)
                nextDP.add(t)
            dp = nextDP
            
        return target in dp`,
        explanation: ["If the total sum is odd, it's impossible to partition into two equal integers.", "Goal is to find a subset that sums exactly to half of the total sum.", "Use a set of all possible sums generated so far starting from 0.", "Iterate through each number, creating new possible sums by adding it to existing ones.", "If the target sum is ever reached, return early."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int n : nums) sum += n;
        if (sum % 2 != 0) return false;
        
        int target = sum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        
        for (int n : nums) {
            for (int i = target; i >= n; i--) {
                if (dp[i - n]) dp[i] = true;
            }
        }
        return dp[target];
    }
};`,
        explanation: ["Translate problem to 0/1 Knapsack: can we pick items to get a total weight of `sum / 2`?", "Use a boolean array where `dp[i]` is true if sum `i` is possible.", "Inner loop runs backwards to ensure each number is used only once (preventing reuse logic flaws).", "Time complexity O(N * target), space O(target)."]
      },
      {
        language: "java",
        code: `class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int n : nums) sum += n;
        if (sum % 2 != 0) return false;
        
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        
        for (int num : nums) {
            for (int i = target; i >= num; i--) {
                if (dp[i - num]) {
                    dp[i] = true;
                }
            }
        }
        return dp[target];
    }
}`,
        explanation: ["Perform an existence check for a subset sum using dynamic programming.", "Calculating only for half-sum significantly reduces the state space of the algorithm.", "The backward traversal of the `dp` array is crucial for memory-efficient 0/1 knapsack implementation.", "Algorithm returns true immediately if the half-sum index in the boolean array is marked reachable."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'dynamic-programming');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

Object.keys(dpData).forEach(id => {
  const data = dpData[id];
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

console.log("Written DP problems part 3.");
