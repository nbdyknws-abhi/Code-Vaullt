import { Problem } from '../../../types/problem';

export const maximumDepthOfBinaryTree: Problem = {
  id: "maximum-depth-of-binary-tree",
  title: "Maximum Depth of Binary Tree",
  difficulty: "Easy",
  topic: "Binary Tree",
  tags: ["tree","depth-first-search","breadth-first-search","binary-tree"],
  prompt: "Given the `root` of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
  constraints: ["The number of nodes in the tree is in the range [0, 10^4].","-100 <= Node.val <= 100"],
  examples: [
  {
    "input": "root = [3,9,20,null,null,15,7]",
    "output": "3"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        if not root:\n            return 0\n        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))",
    "explanation": [
      "Handle the base case: If the root is None, return a depth of 0 natively.",
      "Recursively calculate the maximum depth of the left branch.",
      "Recursively calculate the maximum depth of the right branch.",
      "Return 1 plus the maximum of the two calculated values cleanly and functionally."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (root == nullptr) return 0;\n        \n        int leftDepth = maxDepth(root->left);\n        int rightDepth = maxDepth(root->right);\n        \n        return 1 + std::max(leftDepth, rightDepth);\n    }\n};",
    "explanation": [
      "Inject structural bounds tracking explicitly preventing segmentation faults uniquely.",
      "Allocate variables storing recursively discovered depths across memory.",
      "Return mapped combinations generating valid limits seamlessly securely."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int maxDepth(TreeNode root) {\n        if (root == null) {\n            return 0;\n        }\n        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;\n    }\n}",
    "explanation": [
      "Leverage Java Math operators optimizing node comparisons directly matching functionally safely cleanly effectively efficiently natively smartly successfully purely correctly intuitively successfully nicely appropriately functionally cleverly elegantly smoothly completely."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N) (worst case)",
  edgeCases: ["Empty tree","Skewed tree (requires O(N) space)"]
};
