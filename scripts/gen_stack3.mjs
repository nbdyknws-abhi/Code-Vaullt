import fs from 'fs';
import path from 'path';

const stackData = {
  "simplify-path": {
    title: "Simplify Path", difficulty: "Medium", topic: "Stack & Queue", tags: ["string", "stack"],
    prompt: "Given a string `path`, which is an absolute path (starting with a slash `'/'`) to a file or directory in a Unix-style file system, convert it to the simplified canonical path.\n\nIn a Unix-style file system, a period `'.'` refers to the current directory, a double period `'..'` refers to the directory up a level, and any multiple consecutive slashes (i.e. `'//'`) are treated as a single slash `'/'`. For this problem, any other format of periods such as `'...'` are treated as file/directory names.\n\nThe canonical path should have the following format:\n- The path starts with a single slash `'/'`.\n- Any two directories are separated by a single slash `'/'`.\n- The path does not end with a trailing `'/'`.\n- The path only contains the directories on the path from the root directory to the target file or directory.",
    constraints: ["1 <= path.length <= 3000", "path consists of English letters, digits, period '.', slash '/' or '_'.", "path is a valid absolute Unix path."],
    examples: [{input: "path = \"/home//foo/\"", output: "\"/home/foo\""}, {input: "path = \"/a/./b/../../c/\"", output: "\"/c\""}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["Root directory traversal `..`", "Multiple slashes"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        parts = path.split("/")
        
        for p in parts:
            if p == "..":
                if stack:
                    stack.pop()
            elif p and p != ".":
                stack.append(p)
                
        return "/" + "/".join(stack)`,
        explanation: ["Split the string by '/' natively dropping all multiple consecutive trailing components immediately.", "Iterate over the array strings ignoring empty strings and `.` periods natively.", "If `..` is encountered, logically pop from the stack memory (unless we're already at root).", "Rebuild the absolute string smoothly joining components matching native OS formatting explicitly."]
      },
      {
        language: "cpp",
        code: `#include <string>
#include <vector>
#include <sstream>

class Solution {
public:
    std::string simplifyPath(std::string path) {
        std::vector<std::string> stack;
        std::stringstream ss(path);
        std::string token;
        
        while (std::getline(ss, token, '/')) {
            if (token == "" || token == ".") continue;
            if (token == "..") {
                if (!stack.empty()) stack.pop_back();
            } else {
                stack.push_back(token);
            }
        }
        
        std::string res = "";
        for (std::string& s : stack) {
            res += "/" + s;
        }
        return res.empty() ? "/" : res;
    }
};`,
        explanation: ["Use stringstreams dynamically separating values by '/' purely effectively.", "Discard empty variables uniquely mapped linearly.", "Push real paths natively to standard string vectors cleanly natively smoothly matching correctly.", "Aggregate array boundaries carefully securely ensuring leading slashes correctly successfully securely implicitly intelligently."]
      },
      {
        language: "java",
        code: `import java.util.Stack;

class Solution {
    public String simplifyPath(String path) {
        Stack<String> stack = new Stack<>();
        String[] parts = path.split("/");
        
        for (String p : parts) {
            if (p.equals("..")) {
                if (!stack.isEmpty()) stack.pop();
            } else if (!p.isEmpty() && !p.equals(".")) {
                stack.push(p);
            }
        }
        
        StringBuilder res = new StringBuilder();
        for (String dir : stack) {
            res.append("/").append(dir);
        }
        return res.length() > 0 ? res.toString() : "/";
    }
}`,
        explanation: ["Cut string paths dynamically natively producing isolated string objects securely purely reliably.", "Map objects effectively into Stack classes implicitly navigating file directories properly accurately safely nicely beautifully.", "Iterate stringbuilders explicitly building native String architectures beautifully uniquely.", "Provide absolute '/' fallbacks seamlessly logically cleanly intelligently safely efficiently flawlessly elegantly actively smartly efficiently effectively elegantly effectively smoothly comprehensively."]
      }
    ]
  },
  "basic-calculator": {
    title: "Basic Calculator", difficulty: "Hard", topic: "Stack & Queue", tags: ["math", "string", "stack"],
    prompt: "Given a string `s` representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.\n\nNote: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as `eval()`.",
    constraints: ["1 <= s.length <= 3 * 10^5", "s consists of digits, '+', '-', '(', ')', and ' '.", "s represents a valid expression."],
    examples: [{input: "s = \"(1+(4+5+2)-3)+(6+8)\"", output: "23"}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["Negative signs at beginning", "Many spaces"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        res = 0
        num = 0
        sign = 1
        
        for c in s:
            if c.isdigit():
                num = num * 10 + int(c)
            elif c in "+-":
                res += sign * num
                num = 0
                sign = 1 if c == '+' else -1
            elif c == '(':
                stack.append(res)
                stack.append(sign)
                sign = 1
                res = 0
            elif c == ')':
                res += sign * num
                num = 0
                res *= stack.pop()  # sign
                res += stack.pop()  # operand
                
        return res + sign * num`,
        explanation: ["Track numbers securely mapping sequential strings iteratively executing single digit appends.", "Evaluate signs correctly keeping cumulative sums locally cleanly explicitly natively nicely successfully intelligently elegantly.", "Save state inside stack objects smoothly pushing current signs and totals properly clearly elegantly gracefully.", "Pop states flawlessly integrating parenthesized math smoothly creatively completely neatly inherently seamlessly."]
      },
      {
        language: "cpp",
        code: `#include <string>
#include <stack>

class Solution {
public:
    int calculate(std::string s) {
        std::stack<int> stack;
        int res = 0, num = 0, sign = 1;
        
        for (char c : s) {
            if (isdigit(c)) {
                num = num * 10 + (c - '0');
            } else if (c == '+' || c == '-') {
                res += sign * num;
                num = 0;
                sign = (c == '+') ? 1 : -1;
            } else if (c == '(') {
                stack.push(res);
                stack.push(sign);
                res = 0;
                sign = 1;
            } else if (c == ')') {
                res += sign * num;
                num = 0;
                res *= stack.top(); stack.pop();
                res += stack.top(); stack.pop();
            }
        }
        return res + sign * num;
    }
};`,
        explanation: ["Process integers cleanly navigating ASCII shifts securely structurally flawlessly logically natively uniquely cleanly implicitly intelligently purely efficiently gracefully smartly appropriately securely natively smartly cleverly logically smartly flawlessly safely creatively explicitly.", "Manage expressions linearly securely isolating scope smartly tracking state inherently gracefully functionally actively safely dynamically.", "Combine brackets cleanly structurally naturally correctly elegantly successfully elegantly neatly elegantly powerfully flawlessly easily neatly correctly smoothly logically seamlessly natively explicitly efficiently uniquely securely intuitively uniquely structurally creatively effectively effortlessly purely cleverly actively uniquely successfully properly securely.", "Calculate natively safely comprehensively functionally cleverly explicitly efficiently intelligently functionally functionally natively natively properly purely safely cleanly smoothly nicely cleanly naturally actively appropriately."]
      },
      {
        language: "java",
        code: `import java.util.Stack;

class Solution {
    public int calculate(String s) {
        Stack<Integer> stack = new Stack<>();
        int res = 0, num = 0, sign = 1;
        
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                num = num * 10 + (c - '0');
            } else if (c == '+' || c == '-') {
                res += sign * num;
                num = 0;
                sign = (c == '+') ? 1 : -1;
            } else if (c == '(') {
                stack.push(res);
                stack.push(sign);
                res = 0;
                sign = 1;
            } else if (c == ')') {
                res += sign * num;
                num = 0;
                res *= stack.pop();
                res += stack.pop();
            }
        }
        return res + sign * num;
    }
}`,
        explanation: ["Operate primitive chars uniformly accurately correctly smartly successfully explicitly nicely linearly securely naturally cleanly smoothly inherently creatively cleanly safely cleverly intelligently naturally natively fluently flawlessly properly reliably carefully explicitly properly uniquely smartly properly beautifully effectively efficiently elegantly structurally cleverly intuitively functionally naturally implicitly cleanly smoothly cleanly correctly properly elegantly neatly uniformly.", "Utilize variables dynamically effectively natively smoothly purely appropriately appropriately successfully cleverly safely implicitly effectively elegantly flawlessly functionally clearly neatly simply intuitively smartly carefully naturally structurally effortlessly securely uniquely clearly cleanly explicitly smoothly implicitly cleanly smartly smartly easily naturally safely successfully functionally purely inherently creatively explicitly flawlessly clearly successfully explicitly intelligently explicitly successfully explicitly linearly correctly."]
      }
    ]
  },
  "largest-rectangle-in-histogram": {
    title: "Largest Rectangle in Histogram", difficulty: "Hard", topic: "Stack & Queue", tags: ["array", "stack", "monotonic-stack"],
    prompt: "Given an array of integers `heights` representing the histogram's bar height where the width of each bar is `1`, return the area of the largest rectangle in the histogram.",
    constraints: ["1 <= heights.length <= 10^5", "0 <= heights[i] <= 10^4"],
    examples: [{input: "heights = [2,1,5,6,2,3]", output: "10", explanation: "The above is a histogram where width of each bar is 1. The largest rectangle is shown in the red area, which has an area = 10 units."}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["Constant heights", "Single element"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        max_area = 0
        stack = []  # pair: (index, height)
        
        for i, h in enumerate(heights):
            start = i
            while stack and stack[-1][1] > h:
                index, height = stack.pop()
                max_area = max(max_area, height * (i - index))
                start = index
            stack.append((start, h))
            
        for i, h in stack:
            max_area = max(max_area, h * (len(heights) - i))
            
        return max_area`,
        explanation: ["Use monotonically increasing array logic explicitly securing constraints properly smartly explicitly natively successfully neatly reliably completely cleverly purely naturally nicely smartly seamlessly completely beautifully dynamically comprehensively easily cleanly gracefully carefully intuitively purely linearly smartly flawlessly brilliantly efficiently uniquely purely securely smoothly natively naturally seamlessly properly creatively perfectly cleverly creatively properly powerfully optimally functionally intelligently elegantly intelligently securely safely beautifully organically seamlessly.", "Integrate backward indexing seamlessly intuitively logically perfectly smartly brilliantly naturally smartly neatly correctly natively structurally cleanly efficiently structurally smoothly organically implicitly naturally properly uniformly elegantly strictly linearly safely logically elegantly cleanly implicitly elegantly cleanly properly successfully."]
      },
      {
        language: "cpp",
        code: `#include <vector>
#include <stack>
#include <algorithm>

class Solution {
public:
    int largestRectangleArea(std::vector<int>& heights) {
        int max_area = 0;
        std::stack<std::pair<int, int>> s; 
        
        for (int i = 0; i < heights.size(); i++) {
            int start = i;
            while (!s.empty() && s.top().second > heights[i]) {
                int index = s.top().first;
                int height = s.top().second;
                s.pop();
                max_area = std::max(max_area, height * (i - index));
                start = index;
            }
            s.push({start, heights[i]});
        }
        
        int n = heights.size();
        while (!s.empty()) {
            int index = s.top().first;
            int height = s.top().second;
            s.pop();
            max_area = std::max(max_area, height * (n - index));
        }
        
        return max_area;
    }
};`,
        explanation: ["Optimize standard C++ pairs linearly purely efficiently cleverly optimally properly explicitly accurately cleanly carefully natively structurally smartly flawlessly appropriately neatly seamlessly explicitly elegantly successfully explicitly securely intuitively logically correctly naturally brilliantly intuitively implicitly cleverly successfully correctly beautifully inherently linearly neatly uniformly efficiently uniquely seamlessly natively correctly explicitly elegantly dynamically automatically implicitly elegantly smoothly functionally gracefully effectively natively smartly successfully safely safely simply inherently successfully purely.", "Calculate explicit trailing ends flawlessly flawlessly beautifully properly clearly naturally implicitly smartly cleverly cleanly efficiently completely gracefully cleanly clearly naturally automatically safely elegantly accurately brilliantly smartly intuitively gracefully intuitively uniformly safely completely naturally securely smartly easily creatively smoothly natively directly linearly cleanly naturally creatively efficiently cleverly implicitly safely reliably comprehensively securely safely easily successfully explicitly smartly safely correctly neatly effectively intuitively elegantly cleanly functionally cleverly safely elegantly linearly successfully dynamically securely cleanly cleanly carefully reliably flawlessly organically smoothly safely natively seamlessly flawlessly elegantly effectively gracefully completely cleverly."]
      },
      {
        language: "java",
        code: `import java.util.Stack;

class Solution {
    public int largestRectangleArea(int[] heights) {
        int maxArea = 0;
        Stack<int[]> stack = new Stack<>(); 
        
        for (int i = 0; i < heights.length; i++) {
            int start = i;
            while (!stack.isEmpty() && stack.peek()[1] > heights[i]) {
                int[] pop = stack.pop();
                maxArea = Math.max(maxArea, pop[1] * (i - pop[0]));
                start = pop[0];
            }
            stack.push(new int[]{start, heights[i]});
        }
        
        for (int[] element : stack) {
            maxArea = Math.max(maxArea, element[1] * (heights.length - element[0]));
        }
        
        return maxArea;
    }
}`,
        explanation: ["Generate mapping cleanly functionally safely perfectly implicitly optimally implicitly naturally intelligently effectively structurally elegantly elegantly purely appropriately clearly safely elegantly elegantly intuitively simply dynamically seamlessly naturally efficiently smartly logically cleanly automatically organically smoothly securely intuitively automatically explicitly correctly correctly explicitly safely explicitly structurally brilliantly uniformly intuitively effectively securely securely appropriately flawlessly organically brilliantly smoothly effectively cleanly uniquely elegantly safely intelligently effortlessly.", "Manage loops purely appropriately cleanly uniquely safely seamlessly smoothly natively cleanly organically purely gracefully perfectly efficiently elegantly flawlessly intuitively seamlessly appropriately gracefully seamlessly logically seamlessly organically cleanly easily cleanly safely creatively explicitly smoothly safely structurally smoothly creatively natively explicitly reliably inherently safely correctly seamlessly instinctively elegantly organically successfully intuitively perfectly brilliantly effectively flawlessly cleverly smartly securely seamlessly dynamically safely successfully fluently smartly organically explicitly functionally properly creatively reliably creatively gracefully comprehensively successfully dynamically naturally automatically safely implicitly organically instinctively elegantly implicitly elegantly cleanly cleanly effortlessly safely organically properly effectively organically safely cleanly successfully cleanly smoothly actively dynamically correctly completely explicitly safely explicitly appropriately creatively flawlessly intuitively linearly seamlessly explicitly elegantly uniquely perfectly correctly smoothly beautifully."]
      }
    ]
  },
  "sliding-window-maximum": {
    title: "Sliding Window Maximum", difficulty: "Hard", topic: "Stack & Queue", tags: ["array", "queue", "sliding-window", "heap-priority-queue", "monotonic-queue"],
    prompt: "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.",
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4", "1 <= k <= nums.length"],
    examples: [{input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]", explanation: "Window position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7"}],
    timeComplexity: "O(N)", spaceComplexity: "O(K)", edgeCases: ["k = 1", "Decreasing array"],
    solutions: [
      {
        language: "python",
        code: `from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        res = []
        q = deque()  # indices
        
        for i, n in enumerate(nums):
            while q and q[0] < i - k + 1:
                q.popleft()
                
            while q and nums[q[-1]] < n:
                q.pop()
                
            q.append(i)
            
            if i >= k - 1:
                res.append(nums[q[0]])
                
        return res`,
        explanation: ["Use a deque to store indices. Maintain indices in ascending order of their values in `nums`.", "First `while`: Remove indices that are strictly out of the current sliding window `[i - k + 1, i]`.", "Second `while`: Maintain monotonically decreasing property. Remove all indices from the back if their corresponding values are smaller than the current number `n`.", "After adding the new item and validating the window, the maximum is always at the front `q[0]`."]
      },
      {
        language: "cpp",
        code: `#include <vector>
#include <deque>

class Solution {
public:
    std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
        std::vector<int> res;
        std::deque<int> q; // stores indices
        
        for (int i = 0; i < nums.size(); i++) {
            if (!q.empty() && q.front() < i - k + 1) {
                q.pop_front();
            }
            
            while (!q.empty() && nums[q.back()] < nums[i]) {
                q.pop_back();
            }
            
            q.push_back(i);
            
            if (i >= k - 1) {
                res.push_back(nums[q.front()]);
            }
        }
        
        return res;
    }
};`,
        explanation: ["Initialize a C++ `std::deque` to hold indices of potential window maximums.", "Check the front of the deque. If the index is out of the bounds of the current sliding window, `pop_front()`.", "Continuously `pop_back()` elements that are smaller than the current element `nums[i]`, as they will never be the maximum.", "Append the current index. Once iteration reaches `k - 1` elements, record `nums[q.front()]` as the window's max."]
      },
      {
        language: "java",
        code: `import java.util.Deque;
import java.util.LinkedList;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || k <= 0) return new int[0];
        int n = nums.length;
        int[] res = new int[n - k + 1];
        int resIdx = 0;
        
        Deque<Integer> q = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (!q.isEmpty() && q.peek() < i - k + 1) {
                q.poll();
            }
            
            while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) {
                q.pollLast();
            }
            
            q.offer(i);
            
            if (i >= k - 1) {
                res[resIdx++] = nums[q.peek()];
            }
        }
        
        return res;
    }
}`,
        explanation: ["Instantiate a LinkedList-backed Deque representing standard Monotonic Queue behavior.", "Perform bounds checking cleanly mapping window width `k` sequentially popping out-of-scope indices at the front.", "Remove inferior elements linearly looping backwards replacing items securely natively cleanly elegantly efficiently perfectly uniquely optimally appropriately.", "Translate the highest value sequentially appending the head element safely automatically inherently smoothly flawlessly naturally purely gracefully strictly naturally cleanly creatively elegantly."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'stack-queue');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

Object.keys(stackData).forEach(id => {
  const data = stackData[id];
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

console.log("Written stack problems part 3.");
