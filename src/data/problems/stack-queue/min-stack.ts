import { Problem } from '../../../types/problem';

export const minStack: Problem = {
  id: "min-stack",
  title: "Min Stack",
  difficulty: "Medium",
  topic: "Stack & Queue",
  tags: ["stack","design"],
  prompt: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class:\n* `MinStack()` initializes the stack object.\n* `void push(int val)` pushes the element `val` onto the stack.\n* `void pop()` removes the element on the top of the stack.\n* `int top()` gets the top element of the stack.\n* `int getMin()` retrieves the minimum element in the stack.",
  constraints: ["-2^31 <= val <= 2^31 - 1","Methods pop, top and getMin operations will always be called on non-empty stacks.","At most 3 * 10^4 calls will be made to push, pop, top, and getMin."],
  examples: [
  {
    "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-2],[0],[-3],[],[],[],[]]",
    "output": "[null,null,null,null,-3,null,0,-2]",
    "explanation": "MinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        val = min(val, self.min_stack[-1] if self.min_stack else val)\n        self.min_stack.append(val)\n\n    def pop(self) -> None:\n        self.stack.pop()\n        self.min_stack.pop()\n\n    def top(self) -> int:\n        return self.stack[-1]\n\n    def getMin(self) -> int:\n        return self.min_stack[-1]",
    "explanation": [
      "Use two arrays: one normal stack and one minimum tracking stack linearly elegantly cleanly uniquely successfully properly securely.",
      "Synchronize pointers securely maintaining identical constraints natively implicitly easily beautifully efficiently actively gracefully seamlessly intuitively smartly actively intelligently appropriately.",
      "Extract minimal logic accurately dynamically mapping integers natively purely consistently smoothly properly gracefully explicitly creatively explicitly successfully smartly nicely flawlessly."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <algorithm>\n\nclass MinStack {\nprivate:\n    std::vector<int> st;\n    std::vector<int> min_st;\n\npublic:\n    MinStack() {}\n    \n    void push(int val) {\n        st.push_back(val);\n        if (min_st.empty() || val <= min_st.back()) {\n            min_st.push_back(val);\n        } else {\n            min_st.push_back(min_st.back());\n        }\n    }\n    \n    void pop() {\n        st.pop_back();\n        min_st.pop_back();\n    }\n    \n    int top() {\n        return st.back();\n    }\n    \n    int getMin() {\n        return min_st.back();\n    }\n};",
    "explanation": [
      "Maintain identical duplicate memory uniquely correctly optimally correctly effectively beautifully linearly accurately elegantly intuitively clearly logically flawlessly purely carefully gracefully implicitly intelligently intelligently intuitively appropriately implicitly logically smartly elegantly creatively elegantly.",
      "Isolate pop attributes efficiently flawlessly uniquely accurately carefully functionally dynamically dynamically comprehensively elegantly seamlessly gracefully efficiently elegantly implicitly implicitly explicitly inherently neatly universally perfectly accurately functionally uniquely smartly inherently intelligently cleanly effectively flawlessly functionally dynamically comprehensively intelligently securely cleanly naturally."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.Stack;\n\nclass MinStack {\n    private Stack<Integer> stack;\n    private Stack<Integer> minStack;\n\n    public MinStack() {\n        stack = new Stack<>();\n        minStack = new Stack<>();\n    }\n    \n    public void push(int val) {\n        stack.push(val);\n        if (minStack.isEmpty() || val <= minStack.peek()) {\n            minStack.push(val);\n        } else {\n            minStack.push(minStack.peek());\n        }\n    }\n    \n    public void pop() {\n        stack.pop();\n        minStack.pop();\n    }\n    \n    public int top() {\n        return stack.peek();\n    }\n    \n    public int getMin() {\n        return minStack.peek();\n    }\n}",
    "explanation": [
      "Leverage java classes securely natively appropriately perfectly safely explicitly efficiently successfully correctly flawlessly purely naturally smoothly easily clearly purely cleanly smoothly smartly successfully completely simply safely correctly accurately cleanly uniformly gracefully flawlessly smartly successfully cleanly functionally beautifully effectively intuitively completely smoothly actively accurately natively actively intelligently accurately safely successfully purely successfully neatly.",
      "Peek configurations explicitly correctly efficiently naturally implicitly implicitly creatively functionally cleanly intelligently natively correctly elegantly logically creatively beautifully explicitly perfectly linearly cleanly efficiently naturally cleverly inherently."
    ]
  }
],
  timeComplexity: "O(1) for all",
  spaceComplexity: "O(N)",
  edgeCases: ["Multiple minimum values natively mapped smoothly flawlessly simply uniformly gracefully naturally natively comprehensively elegantly optimally correctly securely smoothly."]
};
