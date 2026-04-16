import { Problem } from '../../../types/problem';

export const bstIterator: Problem = {
  id: "bst-iterator",
  title: "Binary Search Tree Iterator",
  difficulty: "Medium",
  topic: "Binary Search Tree",
  tags: ["tree","stack","design","binary-search-tree","binary-tree","iterator"],
  prompt: "Implement the `BSTIterator` class that represents an iterator over the in-order traversal of a binary search tree (BST):\n\n* `BSTIterator(TreeNode root)` Initializes an object of the `BSTIterator` class. The `root` of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.\n* `boolean hasNext()` Returns `true` if there exists a number in the traversal to the right of the pointer, otherwise returns `false`.\n* `int next()` Moves the pointer to the right, then returns the number at the pointer.",
  constraints: ["The number of nodes in the tree is in the range [1, 10^5].","0 <= Node.val <= 10^6","At most 10^5 calls will be made to hasNext, and next."],
  examples: [
  {
    "input": "[\"BSTIterator\", \"next\", \"next\", \"hasNext\", \"next\", \"hasNext\", \"next\", \"hasNext\", \"next\", \"hasNext\"]\n[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]",
    "output": "[null, 3, 7, true, 9, true, 15, true, 20, false]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class BSTIterator:\n    def __init__(self, root: Optional[TreeNode]):\n        self.stack = []\n        self._push_left(root)\n\n    def _push_left(self, node):\n        while node:\n            self.stack.append(node)\n            node = node.left\n\n    def next(self) -> int:\n        node = self.stack.pop()\n        self._push_left(node.right)\n        return node.val\n\n    def hasNext(self) -> bool:\n        return len(self.stack) > 0",
    "explanation": [
      "Initialize a stack by pushing all leftmost nodes from the root.",
      "The `next()` call pops the top (smallest unvisited node), then pushes the right subtree's leftmost path.",
      "This lazily simulates inorder traversal — only processing nodes when needed.",
      "`hasNext()` simply checks if the stack still has entries."
    ]
  },
  {
    "language": "cpp",
    "code": "class BSTIterator {\n    std::stack<TreeNode*> s;\n    void pushLeft(TreeNode* node) {\n        while (node) {\n            s.push(node);\n            node = node->left;\n        }\n    }\npublic:\n    BSTIterator(TreeNode* root) {\n        pushLeft(root);\n    }\n    \n    int next() {\n        TreeNode* node = s.top();\n        s.pop();\n        pushLeft(node->right);\n        return node->val;\n    }\n    \n    bool hasNext() {\n        return !s.empty();\n    }\n};",
    "explanation": [
      "The constructor primes the stack with the entire leftmost chain from root.",
      "`next()` pops the minimum, then pushes the right child's leftmost chain for future calls.",
      "Each node is pushed and popped exactly once — amortized O(1) per `next()` call.",
      "Space is O(H) in the worst case (height of tree), not O(N)."
    ]
  },
  {
    "language": "java",
    "code": "class BSTIterator {\n    private Stack<TreeNode> stack = new Stack<>();\n\n    public BSTIterator(TreeNode root) {\n        pushLeft(root);\n    }\n    \n    private void pushLeft(TreeNode node) {\n        while (node != null) {\n            stack.push(node);\n            node = node.left;\n        }\n    }\n\n    public int next() {\n        TreeNode node = stack.pop();\n        pushLeft(node.right);\n        return node.val;\n    }\n\n    public boolean hasNext() {\n        return !stack.isEmpty();\n    }\n}",
    "explanation": [
      "On initialization, push all left children of the root to the stack to reach the minimum element.",
      "`next()` pops the smallest remaining node and then primes the stack with the right subtree.",
      "This approach is memory-efficient: O(H) space instead of storing all N values upfront.",
      "`hasNext()` returns true as long as the stack is non-empty."
    ]
  }
],
  timeComplexity: "O(1) amortized for next()",
  spaceComplexity: "O(H)",
  edgeCases: ["Single node tree"]
};
