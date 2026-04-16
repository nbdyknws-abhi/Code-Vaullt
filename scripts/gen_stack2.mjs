import fs from 'fs';
import path from 'path';

const stackData = {
  "daily-temperatures": {
    title: "Daily Temperatures", difficulty: "Medium", topic: "Stack & Queue", tags: ["array", "stack", "monotonic-stack"],
    prompt: "Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.",
    constraints: ["1 <= temperatures.length <= 10^5", "30 <= temperatures[i] <= 100"],
    examples: [{input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]"}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["Constantly decreasing temperatures", "All same temperatures"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        res = [0] * len(temperatures)
        stack = []  # pair: [temp, index]
        
        for i, t in enumerate(temperatures):
            while stack and t > stack[-1][0]:
                stackT, stackInd = stack.pop()
                res[stackInd] = i - stackInd
            stack.append([t, i])
            
        return res`,
        explanation: ["Use a monotonic decreasing stack to store temperatures and their indices.", "Iterate through the array. If the current temperature is greater than the temperature at the top of the stack, we found a warmer day.", "Pop from the stack and calculate the difference in indices.", "Store the difference in the result array."]
      },
      {
        language: "cpp",
        code: `#include <vector>
#include <stack>

class Solution {
public:
    std::vector<int> dailyTemperatures(std::vector<int>& temperatures) {
        int n = temperatures.size();
        std::vector<int> res(n, 0);
        std::stack<int> s; // stores indices
        
        for (int i = 0; i < n; i++) {
            while (!s.empty() && temperatures[i] > temperatures[s.top()]) {
                res[s.top()] = i - s.top();
                s.pop();
            }
            s.push(i);
        }
        
        return res;
    }
};`,
        explanation: ["Initialize a result vector with zeros and a stack to store indices.", "Iterate through the temperatures. While the stack is not empty and the current temperature is strictly greater than the temperature at the index stored at the top of the stack.", "Update the result array at the popped index with the difference `i - popped_index`.", "Push the current index onto the stack."]
      },
      {
        language: "java",
        code: `import java.util.Stack;

class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] res = new int[n];
        Stack<Integer> stack = new Stack<>();
        
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int idx = stack.pop();
                res[idx] = i - idx;
            }
            stack.push(i);
        }
        
        return res;
    }
}`,
        explanation: ["Create a result array and a stack to store indices.", "Loop through the temperatures array.", "If the current temperature is higher than the temperature at the index on top of the stack, pop the stack and calculate the day difference.", "Push the current index to the stack to be resolved later."]
      }
    ]
  },
  "evaluate-reverse-polish-notation": {
    title: "Evaluate Reverse Polish Notation", difficulty: "Medium", topic: "Stack & Queue", tags: ["array", "math", "stack"],
    prompt: "You are given an array of strings `tokens` that represents an arithmetic expression in a Reverse Polish Notation.\n\nEvaluate the expression. Return an integer that represents the value of the expression.",
    constraints: ["1 <= tokens.length <= 10^4", "tokens[i] is either an operator: \"+\", \"-\", \"*\", or \"/\", or an integer in the range [-200, 200]."],
    examples: [{input: "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]", output: "9", explanation: "((2 + 1) * 3) = 9"}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["Single token", "Division truncating towards zero"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for c in tokens:
            if c == "+":
                stack.append(stack.pop() + stack.pop())
            elif c == "-":
                a, b = stack.pop(), stack.pop()
                stack.append(b - a)
            elif c == "*":
                stack.append(stack.pop() * stack.pop())
            elif c == "/":
                a, b = stack.pop(), stack.pop()
                stack.append(int(b / a))
            else:
                stack.append(int(c))
        return stack[0]`,
        explanation: ["Use a stack to keep track of numbers.", "When encountering an operator, pop the top two numbers, apply the operator, and push the result back.", "Be careful with division in Python (`int(b / a)`) to truncate towards zero as required by the problem.", "If it's a number, push it onto the stack."]
      },
      {
        language: "cpp",
        code: `#include <vector>
#include <string>
#include <stack>

class Solution {
public:
    int evalRPN(std::vector<std::string>& tokens) {
        std::stack<int> s;
        for (std::string& t : tokens) {
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                int op2 = s.top(); s.pop();
                int op1 = s.top(); s.pop();
                if (t == "+") s.push(op1 + op2);
                else if (t == "-") s.push(op1 - op2);
                else if (t == "*") s.push(op1 * op2);
                else if (t == "/") s.push(op1 / op2);
            } else {
                s.push(std::stoi(t));
            }
        }
        return s.top();
    }
};`,
        explanation: ["Use a stack of integers.", "Iterate through tokens. If the token is an operator, pop two operands (note: the first popped is the right operand).", "Perform integer arithmetic (C++ division truncates towards zero by default).", "Push the result back onto the stack; otherwise, parse the string to an integer and push it."]
      },
      {
        language: "java",
        code: `import java.util.Stack;

class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (String t : tokens) {
            if ("+-*/".contains(t)) {
                int b = stack.pop();
                int a = stack.pop();
                if (t.equals("+")) stack.push(a + b);
                else if (t.equals("-")) stack.push(a - b);
                else if (t.equals("*")) stack.push(a * b);
                else if (t.equals("/")) stack.push(a / b);
            } else {
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.pop();
    }
}`,
        explanation: ["Initialize a Stack of Integers.", "Iterate over the token array. Check if the token is one of the four operators.", "Pop two elements (right and left operands), compute the result, and push it.", "Convert numeric strings to integers and push them onto the stack."]
      }
    ]
  },
  "implement-queue-using-stacks": {
    title: "Implement Queue using Stacks", difficulty: "Easy", topic: "Stack & Queue", tags: ["stack", "design"],
    prompt: "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).",
    constraints: ["1 <= x <= 9", "At most 100 calls will be made to push, pop, peek, and empty."],
    examples: [{input: "[\"MyQueue\", \"push\", \"push\", \"peek\", \"pop\", \"empty\"]\n[[], [1], [2], [], [], []]", output: "[null, null, null, 1, 1, false]"}],
    timeComplexity: "Amortized O(1)", spaceComplexity: "O(N)", edgeCases: ["Popping multiple times consecutively"],
    solutions: [
      {
        language: "python",
        code: `class MyQueue:
    def __init__(self):
        self.s1 = []
        self.s2 = []

    def push(self, x: int) -> None:
        self.s1.append(x)

    def pop(self) -> int:
        self.peek()
        return self.s2.pop()

    def peek(self) -> int:
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2[-1]

    def empty(self) -> bool:
        return not self.s1 and not self.s2`,
        explanation: ["Use two stacks: `s1` for Enqueue and `s2` for Dequeue.", "Push always appends to `s1` in O(1).", "Peek/Pop require the oldest element. If `s2` is empty, move all elements from `s1` to `s2`, reversing their order.", "This achieves Amortized O(1) time complexity for Pop/Peek operations."]
      },
      {
        language: "cpp",
        code: `#include <stack>

class MyQueue {
    std::stack<int> s1, s2;
public:
    MyQueue() {}
    
    void push(int x) {
        s1.push(x);
    }
    
    int pop() {
        int val = peek();
        s2.pop();
        return val;
    }
    
    int peek() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        return s2.top();
    }
    
    bool empty() {
        return s1.empty() && s2.empty();
    }
};`,
        explanation: ["Maintain two standard library stacks.", "The `push` operation is simple: push onto `s1`.", "The `peek` operation ensures `s2` has elements. If it's empty, transfer everything from `s1` to `s2`.", "The `pop` operation uses `peek` to prepare `s2` and then pops from `s2`."]
      },
      {
        language: "java",
        code: `import java.util.Stack;

class MyQueue {
    Stack<Integer> s1 = new Stack<>();
    Stack<Integer> s2 = new Stack<>();

    public MyQueue() {}
    
    public void push(int x) {
        s1.push(x);
    }
    
    public int pop() {
        peek();
        return s2.pop();
    }
    
    public int peek() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
        return s2.peek();
    }
    
    public boolean empty() {
        return s1.isEmpty() && s2.isEmpty();
    }
}`,
        explanation: ["Declare two Java stacks. `s1` handles incoming elements, `s2` handles outgoing elements.", "To ensure FIFO behavior, elements are reversed when moving from `s1` to `s2`.", "Optimized to only transfer elements when `s2` is empty, making average time O(1).", "The queue is empty only if both stacks are completely barren."]
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

console.log("Written stack problems part 2.");
