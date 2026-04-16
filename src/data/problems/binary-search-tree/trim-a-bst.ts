import { Problem } from '../../../types/problem';

export const trimABst: Problem = {
  id: "trim-a-bst",
  title: "Trim a Binary Search Tree",
  difficulty: "Medium",
  topic: "Binary Search Tree",
  tags: ["tree","depth-first-search","binary-search-tree","binary-tree"],
  prompt: "Given the `root` of a binary search tree and the lowest and highest boundaries as `low` and `high`, trim the tree so that all its element values are in the range `[low, high]`. Trimming the tree should not change the relative structure of the elements that will remain in the tree. Return the root of the trimmed binary search tree.",
  constraints: ["The number of nodes in the tree is in the range [1, 10^4].","0 <= Node.val <= 10^4","The value of each node in the tree is unique.","root is guaranteed to be a valid binary search tree.","0 <= low <= high <= 10^4"],
  examples: [
  {
    "input": "root = [3,0,4,null,2,null,null,1], low = 1, high = 3",
    "output": "[3,2,null,1]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def trimBST(self, root: Optional[TreeNode], low: int, high: int) -> Optional[TreeNode]:\n        if not root:\n            return None\n            \n        if root.val < low:\n            return self.trimBST(root.right, low, high)\n        if root.val > high:\n            return self.trimBST(root.left, low, high)\n            \n        root.left = self.trimBST(root.left, low, high)\n        root.right = self.trimBST(root.right, low, high)\n        return root",
    "explanation": [
      "If the current node's value is below `low`, its entire left subtree is also too small — recurse into the right subtree only.",
      "If the current node's value is above `high`, its entire right subtree is also too large — recurse into the left subtree only.",
      "If the node is within range, trim both subtrees and reconnect them to the current node.",
      "BST ordering makes this highly efficient — entire subtrees can be discarded in O(1)."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    TreeNode* trimBST(TreeNode* root, int low, int high) {\n        if (!root) return nullptr;\n        \n        if (root->val < low) return trimBST(root->right, low, high);\n        if (root->val > high) return trimBST(root->left, low, high);\n        \n        root->left = trimBST(root->left, low, high);\n        root->right = trimBST(root->right, low, high);\n        return root;\n    }\n};",
    "explanation": [
      "The recursive approach elegantly handles all three cases: node too small, too large, or in range.",
      "When a node is too small (< low), its valid successor must be in its right subtree.",
      "When a node is too large (> high), its valid predecessor must be in its left subtree.",
      "This avoids explicit node deletion — we simply redirect pointers."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public TreeNode trimBST(TreeNode root, int low, int high) {\n        if (root == null) return null;\n        \n        if (root.val < low) return trimBST(root.right, low, high);\n        if (root.val > high) return trimBST(root.left, low, high);\n        \n        root.left = trimBST(root.left, low, high);\n        root.right = trimBST(root.right, low, high);\n        return root;\n    }\n}",
    "explanation": [
      "Clean recursion with three clear cases makes this solution highly readable.",
      "If val < low: the node and its entire left subtree are invalid. Jump to the right subtree.",
      "If val > high: the node and its entire right subtree are invalid. Jump to the left subtree.",
      "Otherwise: keep the node and recursively trim both children."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Root itself is out of range","Entire tree trimmed"]
};
