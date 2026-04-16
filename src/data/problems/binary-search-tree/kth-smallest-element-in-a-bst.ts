import { Problem } from '../../../types/problem';

export const kthSmallestElementInABst: Problem = {
  id: "kth-smallest-element-in-a-bst",
  title: "Kth Smallest Element in a BST",
  difficulty: "Medium",
  topic: "Binary Search Tree",
  tags: ["tree","depth-first-search","binary-search-tree","binary-tree"],
  prompt: "Given the `root` of a binary search tree, and an integer `k`, return the `k`th smallest value (1-indexed) of all the values of the nodes in the tree.",
  constraints: ["The number of nodes in the tree is n.","1 <= k <= n <= 10^4","0 <= Node.val <= 10^4"],
  examples: [
  {
    "input": "root = [3,1,4,null,2], k = 1",
    "output": "1"
  },
  {
    "input": "root = [5,3,6,2,4,null,null,1], k = 3",
    "output": "3"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:\n        stack = []\n        curr = root\n        \n        while stack or curr:\n            while curr:\n                stack.append(curr)\n                curr = curr.left\n            curr = stack.pop()\n            k -= 1\n            if k == 0:\n                return curr.val\n            curr = curr.right",
    "explanation": [
      "Inorder traversal of a BST yields nodes in ascending order — perfect for finding the kth smallest.",
      "Use an iterative stack to avoid recursion overhead.",
      "Dive as far left as possible, pushing nodes onto the stack.",
      "Pop each node, decrement k. When k reaches 0, you've found the kth smallest value."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int kthSmallest(TreeNode* root, int k) {\n        std::stack<TreeNode*> s;\n        TreeNode* curr = root;\n        \n        while (!s.empty() || curr) {\n            while (curr) {\n                s.push(curr);\n                curr = curr->left;\n            }\n            curr = s.top();\n            s.pop();\n            if (--k == 0) return curr->val;\n            curr = curr->right;\n        }\n        return -1;\n    }\n};",
    "explanation": [
      "BST inorder traversal (left → root → right) produces sorted output.",
      "Push nodes leftward into a stack to simulate recursion iteratively.",
      "Pop from the stack and decrement k each time we visit a node.",
      "Return the node's value when k hits zero — that's the kth smallest."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int kthSmallest(TreeNode root, int k) {\n        Stack<TreeNode> stack = new Stack<>();\n        TreeNode curr = root;\n        \n        while (!stack.isEmpty() || curr != null) {\n            while (curr != null) {\n                stack.push(curr);\n                curr = curr.left;\n            }\n            curr = stack.pop();\n            if (--k == 0) return curr.val;\n            curr = curr.right;\n        }\n        return -1;\n    }\n}",
    "explanation": [
      "Inorder traversal is the key insight: a BST's inorder sequence is sorted in ascending order.",
      "Use an explicit stack to simulate the recursive call stack iteratively.",
      "At each iteration, go as left as possible first.",
      "Pop a node and check if it's the kth visited. If yes, return its value."
    ]
  }
],
  timeComplexity: "O(H + k)",
  spaceComplexity: "O(H)",
  edgeCases: ["k equals total nodes","Left-skewed tree"]
};
