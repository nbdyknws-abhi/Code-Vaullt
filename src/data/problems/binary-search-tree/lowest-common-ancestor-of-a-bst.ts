import { Problem } from '../../../types/problem';

export const lowestCommonAncestorOfABst: Problem = {
  id: "lowest-common-ancestor-of-a-bst",
  title: "Lowest Common Ancestor of a Binary Search Tree",
  difficulty: "Medium",
  topic: "Binary Search Tree",
  tags: ["tree","depth-first-search","binary-search-tree","binary-tree"],
  prompt: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nThe lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).",
  constraints: ["The number of nodes in the tree is in the range [2, 10^5].","-10^9 <= Node.val <= 10^9","All Node.val are unique.","p != q","p and q will exist in the BST."],
  examples: [
  {
    "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
    "output": "6",
    "explanation": "The LCA of nodes 2 and 8 is 6."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n        cur = root\n        \n        while cur:\n            if p.val > cur.val and q.val > cur.val:\n                cur = cur.right\n            elif p.val < cur.val and q.val < cur.val:\n                cur = cur.left\n            else:\n                return cur",
    "explanation": [
      "Unlike a general binary tree, BST properties let us navigate without visiting every node.",
      "If both p and q are greater than the current node, the LCA must be in the right subtree.",
      "If both p and q are smaller, the LCA must be in the left subtree.",
      "Otherwise, the current node is the split point — it is the LCA. Return it."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        TreeNode* cur = root;\n        while (cur) {\n            if (p->val > cur->val && q->val > cur->val) {\n                cur = cur->right;\n            } else if (p->val < cur->val && q->val < cur->val) {\n                cur = cur->left;\n            } else {\n                return cur;\n            }\n        }\n        return nullptr;\n    }\n};",
    "explanation": [
      "Exploit BST ordering for an O(H) iterative approach — no recursion stack needed.",
      "Traverse right if both targets are greater than the current node's value.",
      "Traverse left if both are smaller.",
      "The moment they diverge (one on each side), the current node is the answer."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        TreeNode cur = root;\n        while (cur != null) {\n            if (p.val > cur.val && q.val > cur.val) {\n                cur = cur.right;\n            } else if (p.val < cur.val && q.val < cur.val) {\n                cur = cur.left;\n            } else {\n                return cur;\n            }\n        }\n        return null;\n    }\n}",
    "explanation": [
      "Key insight: in a BST, if p and q are both greater than the current node, LCA lies to the right.",
      "If both are smaller, LCA lies to the left.",
      "The first node where p and q go in different directions (or one equals the node) is the answer.",
      "This iterative approach runs in O(H) time and O(1) space — optimal for BSTs."
    ]
  }
],
  timeComplexity: "O(H)",
  spaceComplexity: "O(1)",
  edgeCases: ["p or q is the root","p is ancestor of q"]
};
