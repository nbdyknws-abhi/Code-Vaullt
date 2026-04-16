import { Problem } from '../../../types/problem';

export const recoverBinarySearchTree: Problem = {
  id: "recover-binary-search-tree",
  title: "Recover Binary Search Tree",
  difficulty: "Hard",
  topic: "Binary Search Tree",
  tags: ["tree","depth-first-search","binary-search-tree","binary-tree"],
  prompt: "You are given the `root` of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.",
  constraints: ["The number of nodes in the tree is in the range [2, 1000].","-2^31 <= Node.val <= 2^31 - 1"],
  examples: [
  {
    "input": "root = [1,3,null,null,2]",
    "output": "[3,1,null,null,2]",
    "explanation": "3 and 1 are swapped. The correct tree is [3,1,null,null,2] → swap gives [1,3,null,null,2]. Wait, root [1,3] means 3 should be on left, so swap 1 and 3."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def recoverTree(self, root: Optional[TreeNode]) -> None:\n        first = second = prev = None\n        \n        def inorder(node):\n            nonlocal first, second, prev\n            if not node:\n                return\n            inorder(node.left)\n            if prev and prev.val > node.val:\n                second = node\n                if not first:\n                    first = prev\n            prev = node\n            inorder(node.right)\n            \n        inorder(root)\n        first.val, second.val = second.val, first.val",
    "explanation": [
      "Inorder traversal of a valid BST gives a strictly increasing sequence. A swap breaks this.",
      "Track `prev` (previously visited node). If prev.val > current.val, we found a violation.",
      "The `first` node is the prev at the first violation. The `second` node gets updated at each violation.",
      "For adjacent swapped nodes there is only one violation; for non-adjacent there are two. Swapping `first.val` and `second.val` fixes the BST."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\n    TreeNode *first = nullptr, *second = nullptr, *prev = nullptr;\n    \n    void inorder(TreeNode* node) {\n        if (!node) return;\n        inorder(node->left);\n        if (prev && prev->val > node->val) {\n            second = node;\n            if (!first) first = prev;\n        }\n        prev = node;\n        inorder(node->right);\n    }\npublic:\n    void recoverTree(TreeNode* root) {\n        inorder(root);\n        std::swap(first->val, second->val);\n    }\n};",
    "explanation": [
      "Use inorder DFS and three trackers: `first`, `second` (the two misplaced nodes), and `prev`.",
      "At each inorder step, if `prev->val > node->val`, a violation is detected.",
      "Set `first = prev` on the first violation. Continuously update `second = node`.",
      "After traversal, swap `first.val` and `second.val` to fix the BST in-place."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    TreeNode first = null, second = null, prev = null;\n    \n    public void recoverTree(TreeNode root) {\n        inorder(root);\n        int temp = first.val;\n        first.val = second.val;\n        second.val = temp;\n    }\n    \n    private void inorder(TreeNode node) {\n        if (node == null) return;\n        inorder(node.left);\n        if (prev != null && prev.val > node.val) {\n            second = node;\n            if (first == null) first = prev;\n        }\n        prev = node;\n        inorder(node.right);\n    }\n}",
    "explanation": [
      "The core idea: inorder traversal of a correct BST is sorted. Two swapped nodes break this.",
      "The `first` offender is the larger node in the first out-of-order pair (set to `prev`).",
      "The `second` offender is the smaller node — always updated at each violation (could be 1 or 2 violations).",
      "Swapping just the values (not the nodes themselves) fixes the tree without structural changes."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1) Morris Traversal",
  edgeCases: ["Adjacent nodes swapped","Non-adjacent nodes swapped"]
};
