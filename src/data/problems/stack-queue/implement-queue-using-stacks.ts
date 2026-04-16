import { Problem } from '../../../types/problem';

export const implementQueueUsingStacks: Problem = {
  id: "implement-queue-using-stacks",
  title: "Implement Queue using Stacks",
  difficulty: "Easy",
  topic: "Stack & Queue",
  tags: ["stack","design"],
  prompt: "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).",
  constraints: ["1 <= x <= 9","At most 100 calls will be made to push, pop, peek, and empty."],
  examples: [
  {
    "input": "[\"MyQueue\", \"push\", \"push\", \"peek\", \"pop\", \"empty\"]\n[[], [1], [2], [], [], []]",
    "output": "[null, null, null, 1, 1, false]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class MyQueue:\n    def __init__(self):\n        self.s1 = []\n        self.s2 = []\n\n    def push(self, x: int) -> None:\n        self.s1.append(x)\n\n    def pop(self) -> int:\n        self.peek()\n        return self.s2.pop()\n\n    def peek(self) -> int:\n        if not self.s2:\n            while self.s1:\n                self.s2.append(self.s1.pop())\n        return self.s2[-1]\n\n    def empty(self) -> bool:\n        return not self.s1 and not self.s2",
    "explanation": [
      "Use two stacks: `s1` for Enqueue and `s2` for Dequeue.",
      "Push always appends to `s1` in O(1).",
      "Peek/Pop require the oldest element. If `s2` is empty, move all elements from `s1` to `s2`, reversing their order.",
      "This achieves Amortized O(1) time complexity for Pop/Peek operations."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <stack>\n\nclass MyQueue {\n    std::stack<int> s1, s2;\npublic:\n    MyQueue() {}\n    \n    void push(int x) {\n        s1.push(x);\n    }\n    \n    int pop() {\n        int val = peek();\n        s2.pop();\n        return val;\n    }\n    \n    int peek() {\n        if (s2.empty()) {\n            while (!s1.empty()) {\n                s2.push(s1.top());\n                s1.pop();\n            }\n        }\n        return s2.top();\n    }\n    \n    bool empty() {\n        return s1.empty() && s2.empty();\n    }\n};",
    "explanation": [
      "Maintain two standard library stacks.",
      "The `push` operation is simple: push onto `s1`.",
      "The `peek` operation ensures `s2` has elements. If it's empty, transfer everything from `s1` to `s2`.",
      "The `pop` operation uses `peek` to prepare `s2` and then pops from `s2`."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.Stack;\n\nclass MyQueue {\n    Stack<Integer> s1 = new Stack<>();\n    Stack<Integer> s2 = new Stack<>();\n\n    public MyQueue() {}\n    \n    public void push(int x) {\n        s1.push(x);\n    }\n    \n    public int pop() {\n        peek();\n        return s2.pop();\n    }\n    \n    public int peek() {\n        if (s2.isEmpty()) {\n            while (!s1.isEmpty()) {\n                s2.push(s1.pop());\n            }\n        }\n        return s2.peek();\n    }\n    \n    public boolean empty() {\n        return s1.isEmpty() && s2.isEmpty();\n    }\n}",
    "explanation": [
      "Declare two Java stacks. `s1` handles incoming elements, `s2` handles outgoing elements.",
      "To ensure FIFO behavior, elements are reversed when moving from `s1` to `s2`.",
      "Optimized to only transfer elements when `s2` is empty, making average time O(1).",
      "The queue is empty only if both stacks are completely barren."
    ]
  }
],
  timeComplexity: "Amortized O(1)",
  spaceComplexity: "O(N)",
  edgeCases: ["Popping multiple times consecutively"]
};
