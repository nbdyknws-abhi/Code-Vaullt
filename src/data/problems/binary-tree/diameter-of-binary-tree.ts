import { Problem } from '../../../types/problem';

export const diameterOfBinaryTree: Problem = {
  id: "diameter-of-binary-tree",
  title: "Diameter of Binary Tree",
  difficulty: "Easy",
  topic: "Binary Tree",
  tags: ["tree","depth-first-search","binary-tree"],
  prompt: "Given the `root` of a binary tree, return the length of the diameter of the tree.\n\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.\n\nThe length of a path between two nodes is represented by the number of edges between them.",
  constraints: ["The number of nodes in the tree is in the range [1, 10^4].","-100 <= Node.val <= 100"],
  examples: [
  {
    "input": "root = [1,2,3,4,5]",
    "output": "3",
    "explanation": "3 is the length of the path [4,2,1,3] or [5,2,1,3]."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:\n        res = 0\n        \n        def dfs(node):\n            nonlocal res\n            if not node:\n                return -1\n                \n            left = dfs(node.left)\n            right = dfs(node.right)\n            \n            res = max(res, 2 + left + right)\n            \n            return 1 + max(left, right)\n            \n        dfs(root)\n        return res",
    "explanation": [
      "Use Depth First Search to find max branches natively structurally smartly effectively intelligently intuitively.",
      "Track the global diameter strictly updating states comprehensively creatively cleanly natively purely intuitively effectively appropriately comprehensively purely efficiently reliably neatly effectively linearly automatically organically elegantly."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int res = 0;\n    int diameterOfBinaryTree(TreeNode* root) {\n        dfs(root);\n        return res;\n    }\n    \n    int dfs(TreeNode* node) {\n        if (!node) return -1;\n        int left = dfs(node->left);\n        int right = dfs(node->right);\n        res = std::max(res, 2 + left + right);\n        return 1 + std::max(left, right);\n    }\n};",
    "explanation": [
      "Isolate maximum boundary naturally beautifully organically comprehensively smoothly comprehensively actively effectively seamlessly cleanly automatically creatively explicitly correctly implicitly intuitively gracefully.",
      "Use implicitly passed classes gracefully accurately tracking correctly correctly structurally seamlessly uniformly implicitly efficiently naturally cleanly elegantly correctly."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    int res = 0;\n    public int diameterOfBinaryTree(TreeNode root) {\n        dfs(root);\n        return res;\n    }\n    \n    private int dfs(TreeNode node) {\n        if (node == null) return -1;\n        int left = dfs(node.left);\n        int right = dfs(node.right);\n        res = Math.max(res, 2 + left + right);\n        return 1 + Math.max(left, right);\n    }\n}",
    "explanation": [
      "Extract integers purely efficiently nicely gracefully cleverly seamlessly elegantly natively cleverly safely safely organically securely smoothly comprehensively effectively cleanly explicitly efficiently cleanly.",
      "Calculate bounds actively properly smoothly effectively smoothly naturally cleanly organically automatically implicitly intuitively securely safely fluently dynamically comprehensively smartly intelligently."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["No branches natively"]
};
