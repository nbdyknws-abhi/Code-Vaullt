import fs from 'fs';
import path from 'path';

const stringsData = {
  "valid-parentheses": {
    title: "Valid Parentheses", difficulty: "Easy", topic: "Strings", tags: ["string", "stack"],
    prompt: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if: Open brackets must be closed by the same type of brackets, Open brackets must be closed in the correct order, and Every close bracket has a corresponding open bracket of the same type.",
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    examples: [{input: 's = "()"', output: "true"}, {input: 's = "()[]{}"', output: "true"}, {input: 's = "(]"', output: "false"}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["Odd length string", "Only closing brackets", "Only opening brackets"],
    solutions: [
      {
        language: "python",
        code: `def isValid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
            
    return not stack`,
        explanation: ["Use a stack to keep track of opening brackets.", "Use a dictionary (hash map) for constant-time lookups mapping closing brackets to their opening pairs.", "For each character, if it's an opening bracket, push it onto the stack.", "If it's a closing bracket, pop from the stack (or use dummy string if empty) and verify it matches the mapped opening pair.", "At the end, return true only if the stack is completely empty."]
      },
      {
        language: "cpp",
        code: `#include <string>
#include <stack>

class Solution {
public:
    bool isValid(std::string s) {
        std::stack<char> stack;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.empty()) return false;
                if (c == ')' && stack.top() != '(') return false;
                if (c == '}' && stack.top() != '{') return false;
                if (c == ']' && stack.top() != '[') return false;
                stack.pop();
            }
        }
        return stack.empty();
    }
};`,
        explanation: ["Initialize a C++ character stack.", "Loop through string characters pushing opening variants '(' '{' '[' natively.", "When encountering a closing variant, fail immediately if stack is currently missing elements.", "Compare top of stack explicitly against bracket types. If mismatch, fail immediately.", "Return boolean mapping to standard empty verification."]
      },
      {
        language: "java",
        code: `import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(')
                stack.push(')');
            else if (c == '{')
                stack.push('}');
            else if (c == '[')
                stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c)
                return false;
        }
        return stack.isEmpty();
    }
}`,
        explanation: ["Optimize by pushing the EXPECTED closing character into the stack instead of the opened character.", "Loop through the native character array.", "When evaluating a closing character, pop and directly compare to the loop character.", "Stack should be utterly empty upon completion representing complete pairs."]
      }
    ]
  },
  "implement-strstr": {
    title: "Find the Index of the First Occurrence in a String", difficulty: "Easy", topic: "Strings", tags: ["two-pointers", "string", "string-matching"],
    prompt: "Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.",
    constraints: ["1 <= haystack.length, needle.length <= 10^4", "haystack and needle consist of only lowercase English characters."],
    examples: [{input: 'haystack = "sadbutsad", needle = "sad"', output: "0", explanation: '"sad" occurs at index 0 and 6. The first occurrence is at index 0, so we return 0.'}, {input: 'haystack = "leetcode", needle = "leeto"', output: "-1", explanation: '"leeto" did not occur in "leetcode", so we return -1.'}],
    timeComplexity: "O(N * M)", spaceComplexity: "O(1)", edgeCases: ["needle > haystack", "Empty needle"],
    solutions: [
      {
        language: "python",
        code: `def strStr(haystack, needle):
    # Built-in solution
    return haystack.find(needle)`,
        explanation: ["Python strings provide a native robust C-optimized find() subroutine.", "Executes KMP string-matching pattern natively bypassing manual iteration.", "Simply returns exact first index or -1 explicitly."]
      },
      {
        language: "cpp",
        code: `#include <string>

class Solution {
public:
    int strStr(std::string haystack, std::string needle) {
        int m = haystack.length(), n = needle.length();
        for (int i = 0; i <= m - n; i++) {
            int j = 0;
            for (; j < n; j++) {
                if (haystack[i + j] != needle[j]) {
                    break;
                }
            }
            if (j == n) {
                return i;
            }
        }
        return -1;
    }
};`,
        explanation: ["Utilize two explicit sliding pointers running across substring possibilities linearly.", "Precompute window length limits determining execution cycles securely (m-n).", "Evaluate independent inner loop executing full string matches incrementally extending j indexes.", "If j successfully traverses the complete length of needle array n, matching confirmed."]
      },
      {
        language: "java",
        code: `class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.isEmpty()) return 0;
        int m = haystack.length();
        int n = needle.length();
        if (m < n) return -1;
        
        for (int i = 0; i <= m - n; ++i) {
            if (haystack.substring(i, i + n).equals(needle)) {
                return i;
            }
        }
        return -1;
    }
}`,
        explanation: ["Evaluate baseline lengths returning bounds errors bypassing loops explicitly.", "Sweep main Array sequentially.", "Instead of nested loops, use Java's secure string mapping subString and equals() object operations.", "Return exact initial iterator variable correlating to string start positions."]
      }
    ]
  },
  "decode-ways": {
    title: "Decode Ways", difficulty: "Medium", topic: "Strings", tags: ["string", "dynamic-programming"],
    prompt: "A message containing letters from `A-Z` can be encoded into numbers using mapping 'A' -> '1', 'B' -> '2' ... 'Z' -> '26'.\n\nGiven a string `s` containing only digits, return the number of ways to decode it.",
    constraints: ["1 <= s.length <= 100", "s contains only digits and may contain leading zero(s)."],
    examples: [{input: 's = "12"', output: "2", explanation: '"12" could be decoded as "AB" (1 2) or "L" (12).'}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["Leading zeroes", "Interspersed zeroes (e.g., '06')"],
    solutions: [
      {
        language: "python",
        code: `def numDecodings(s):
    if not s or s[0] == '0':
        return 0
        
    dp = [0] * (len(s) + 1)
    dp[0] = 1
    dp[1] = 1
    
    for i in range(2, len(s) + 1):
        if s[i-1] != '0':
            dp[i] += dp[i-1]
            
        two_digit = int(s[i-2:i])
        if 10 <= two_digit <= 26:
            dp[i] += dp[i-2]
            
    return dp[len(s)]`,
        explanation: ["Initialize a DP array where dp[i] equals distinct decoding ways up to position i.", "Validate explicit leading zeroes triggering absolute failures.", "A single character qualifies as a decode if it is not 0 (extending previous count dp[i-1]).", "Double characters qualify bridging previously registered values up to length 26 (extending count dp[i-2])."]
      },
      {
        language: "cpp",
        code: `#include <string>
#include <vector>

class Solution {
public:
    int numDecodings(std::string s) {
        if (s.empty() || s[0] == '0') return 0;
        int n = s.length();
        std::vector<int> dp(n + 1, 0);
        dp[0] = 1;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            int oneDigit = s[i - 1] - '0';
            int twoDigits = std::stoi(s.substr(i - 2, 2));
            
            if (oneDigit >= 1) {
                dp[i] += dp[i - 1];
            }
            if (twoDigits >= 10 && twoDigits <= 26) {
                dp[i] += dp[i - 2];
            }
        }
        return dp[n];
    }
};`,
        explanation: ["Prevent initial evaluation if character equals explicit 0.", "Allocate linear N array size for state recording DP configurations.", "Compute sequential individual offsets dynamically aggregating counts mapped at dp[i].", "Final Array index N natively resolves combinations."]
      },
      {
        language: "java",
        code: `class Solution {
    public int numDecodings(String s) {
        if (s == null || s.length() == 0 || s.charAt(0) == '0') {
            return 0;
        }
        int n = s.length();
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        
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
        explanation: ["Leverage primitive integer arrays executing DP evaluations.", "Extract substrings dynamically mapping character integers sequentially.", "Limit subsets exclusively connecting 1-9 blocks independent of 10-26 composite mappings.", "Aggregate linear dependencies inside active loops natively."]
      }
    ]
  },
  "count-and-say": {
    title: "Count and Say", difficulty: "Medium", topic: "Strings", tags: ["string"],
    prompt: "The count-and-say sequence is a sequence of digit strings defined by the recursive formula:\n`countAndSay(1) = 1`\n`countAndSay(n)` is the run-length encoding of `countAndSay(n - 1)`.",
    constraints: ["1 <= n <= 30"],
    examples: [{input: 'n = 4', output: '"1211"', explanation: "countAndSay(1) = '1'\ncountAndSay(2) = say '1' = one 1 = '11'\ncountAndSay(3) = say '11' = two 1's = '21'\ncountAndSay(4) = say '21' = one 2 + one 1 = '12' + '11' = '1211'"}],
    timeComplexity: "O(2^N) bounds", spaceComplexity: "O(2^N) bounds", edgeCases: ["Base cases 1 and 2"],
    solutions: [
      {
        language: "python",
        code: `def countAndSay(n):
    res = "1"
    for _ in range(n - 1):
        temp = ""
        count = 1
        for i in range(1, len(res)):
            if res[i] == res[i - 1]:
                count += 1
            else:
                temp += str(count) + res[i - 1]
                count = 1
        temp += str(count) + res[-1]
        res = temp
    return res`,
        explanation: ["Seed starting combination strings '1' iteratively updating limits based exactly on N execution states.", "Run parallel index verifications checking previously parsed digit blocks.", "Translate aggregated counts dynamically concatenating values.", "Close active iterations looping sequences accurately resolving recursive properties."]
      },
      {
        language: "cpp",
        code: `#include <string>

class Solution {
public:
    std::string countAndSay(int n) {
        if (n == 1) return "1";
        std::string prev = countAndSay(n - 1);
        std::string res = "";
        int count = 1;
        for (int i = 0; i < prev.length(); i++) {
            if (i == prev.length() - 1 || prev[i] != prev[i + 1]) {
                res += std::to_string(count) + prev[i];
                count = 1;
            } else {
                count++;
            }
        }
        return res;
    }
};`,
        explanation: ["Employ a direct recursive call mapping limits dynamically to bounds.", "Resolve previous step structures continuously.", "Count concurrent index blocks linearly parsing standard loops matching neighbor characters.", "Concatenate values aggregating total characters back into sequence blocks."]
      },
      {
        language: "java",
        code: `class Solution {
    public String countAndSay(int n) {
        String s = "1";
        for (int i = 1; i < n; i++) {
            StringBuilder sb = new StringBuilder();
            int count = 1;
            for (int j = 1; j < s.length(); j++) {
                if (s.charAt(j) == s.charAt(j - 1)) {
                    count++;
                } else {
                    sb.append(count).append(s.charAt(j - 1));
                    count = 1;
                }
            }
            sb.append(count).append(s.charAt(s.length() - 1));
            s = sb.toString();
        }
        return s;
    }
}`,
        explanation: ["Configure starting values explicitly bypassing recursion using loops mapping states securely.", "Optimize append actions configuring dynamic StringBuilders exclusively preventing memory issues.", "Evaluate internal array loops verifying consecutive digits.", "Execute final buffer appends explicitly mapping tail blocks correctly matching limits."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'strings');

Object.keys(stringsData).forEach(id => {
  const data = stringsData[id];
  let varName = id.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
  if (/^[0-9]/.test(varName)) varName = '_' + varName;

  // Overwrite existing stub
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

console.log("Written detailed string problems part 3.");
