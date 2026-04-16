import { Problem } from '../../../types/problem';

export const rangeSumOfBst: Problem = {
  id: "range-sum-of-bst",
  title: "Range Sum of BST",
  difficulty: "Easy",
  topic: "Binary Search Tree",
  tags: ["tree","depth-first-search","binary-search-tree","binary-tree"],
  prompt: "Given the `root` node of a binary search tree and two integers `low` and `high`, return the sum of values of all nodes with a value in the inclusive range `[low, high]`.",
  constraints: ["The number of nodes in the tree is in the range [1, 2 * 10^4].","1 <= Node.val <= 10^5","1 <= low <= high <= 10^5","All Node.val are unique."],
  examples: [
  {
    "input": "root = [10,5,15,3,7,null,18], low = 7, high = 15",
    "output": "32",
    "explanation": "Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:\n        if not root:\n            return 0\n        \n        total = 0\n        if low <= root.val <= high:\n            total += root.val\n        if root.val > low:\n            total += self.rangeSumBST(root.left, low, high)\n        if root.val < high:\n            total += self.rangeSumBST(root.right, low, high)\n        \n        return total",
    "explanation": [
      "If the current node's value is within [low, high], add it to the sum.",
      "BST pruning: if the node value is greater than `low`, there may be valid nodes in the left subtree.",
      "If the node value is less than `high`, there may be valid nodes in the right subtree.",
      "This avoids visiting nodes outside the range, making the traversal more efficient than brute force."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int rangeSumBST(TreeNode* root, int low, int high) {\n        if (!root) return 0;\n        \n        int sum = 0;\n        if (root->val >= low && root->val <= high) {\n            sum += root->val;\n        }\n        if (root->val > low) {\n            sum += rangeSumBST(root->left, low, high);\n        }\n        if (root->val < high) {\n            sum += rangeSumBST(root->right, low, high);\n        }\n        return sum;\n    }\n};",
    "explanation": [
      "Leverage BST ordering to prune entire subtrees we don't need to visit.",
      "Add the current node's value if it falls within the inclusive range [low, high].",
      "Only recurse left if the current value exceeds `low` (left subtree might have valid nodes).",
      "Only recurse right if the current value is below `high` (right subtree might have valid nodes)."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int rangeSumBST(TreeNode root, int low, int high) {\n        if (root == null) return 0;\n        \n        int sum = 0;\n        if (root.val >= low && root.val <= high) {\n            sum += root.val;\n        }\n        if (root.val > low) {\n            sum += rangeSumBST(root.left, low, high);\n        }\n        if (root.val < high) {\n            sum += rangeSumBST(root.right, low, high);\n        }\n        return sum;\n    }\n}",
    "explanation": [
      "This is a classic BST-optimized DFS that avoids unnecessary traversals.",
      "The key optimization: skip the left subtree if current val <= low, skip right if current val >= high.",
      "In the best case, this can prune O(N/2) nodes, significantly reducing work.",
      "In the worst case (all nodes in range), we visit every node — O(N)."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(H)",
  edgeCases: ["No nodes in range","All nodes in range"]
};
