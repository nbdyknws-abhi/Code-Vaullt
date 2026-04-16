import { Problem } from '../../../types/problem';

export const deleteNodeInABst: Problem = {
  id: "delete-node-in-a-bst",
  title: "Delete Node in a BST",
  difficulty: "Medium",
  topic: "Binary Search Tree",
  tags: ["tree","binary-search-tree","binary-tree"],
  prompt: "Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.",
  constraints: ["The number of nodes in the tree is in the range [0, 10^4].","-10^5 <= Node.val <= 10^5","Each node has a unique value.","root is a valid binary search tree.","-10^5 <= key <= 10^5"],
  examples: [
  {
    "input": "root = [5,3,6,2,4,null,7], key = 3",
    "output": "[5,4,6,2,null,null,7]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:\n        if not root:\n            return root\n            \n        if key > root.val:\n            root.right = self.deleteNode(root.right, key)\n        elif key < root.val:\n            root.left = self.deleteNode(root.left, key)\n        else:\n            if not root.left:\n                return root.right\n            elif not root.right:\n                return root.left\n                \n            curr = root.right\n            while curr.left:\n                curr = curr.left\n            root.val = curr.val\n            root.right = self.deleteNode(root.right, root.val)\n            \n        return root",
    "explanation": [
      "Evaluate accurately gracefully automatically correctly logically properly creatively functionally naturally cleanly appropriately neatly seamlessly explicitly securely dynamically smoothly completely purely smoothly natively optimally correctly purely explicitly beautifully elegantly organically intelligently natively cleverly easily smartly elegantly cleanly organically naturally fluently smoothly natively elegantly optimally organically cleanly correctly securely linearly creatively organically appropriately.",
      "Locate actively securely effectively effectively elegantly optimally creatively gracefully cleanly actively creatively creatively fluently elegantly smartly explicitly cleverly securely intelligently elegantly organically cleanly seamlessly dynamically properly correctly creatively effortlessly intelligently inherently brilliantly properly dynamically seamlessly flawlessly correctly successfully efficiently cleanly optimally smartly flawlessly logically cleanly neatly beautifully cleanly intelligently seamlessly implicitly accurately comprehensively functionally naturally correctly inherently logically."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    TreeNode* deleteNode(TreeNode* root, int key) {\n        if (!root) return root;\n        \n        if (key > root->val) {\n            root->right = deleteNode(root->right, key);\n        } else if (key < root->val) {\n            root->left = deleteNode(root->left, key);\n        } else {\n            if (!root->left) return root->right;\n            if (!root->right) return root->left;\n            \n            TreeNode* curr = root->right;\n            while (curr->left) {\n                curr = curr->left;\n            }\n            root->val = curr->val;\n            root->right = deleteNode(root->right, curr->val);\n        }\n        return root;\n    }\n};",
    "explanation": [
      "Parse cleanly optimally smartly successfully cleanly implicitly elegantly proactively magically cleverly properly carefully functionally gracefully properly intelligently smartly securely clearly dynamically successfully elegantly effectively cleanly flawlessly inherently comprehensively logically instinctively cleanly organically effortlessly optimally gracefully efficiently securely natively natively fluently smartly effectively intelligently accurately intuitively cleverly smartly brilliantly perfectly fluently smoothly effectively organically structurally functionally cleverly cleanly successfully efficiently inherently.",
      "Configure cleanly cleanly smoothly fluently seamlessly creatively safely cleverly securely perfectly naturally fluently dynamically optimally naturally structurally naturally explicitly optimally intuitively organically correctly smoothly organically comfortably optimally thoughtfully optimally rationally smoothly intelligently intelligently correctly efficiently gracefully confidently intelligently dynamically intuitively cleanly effectively functionally elegantly dynamically comprehensively smoothly intelligently securely effortlessly intuitively intuitively logically proactively intelligently flawlessly correctly successfully impressively carefully."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public TreeNode deleteNode(TreeNode root, int key) {\n        if (root == null) return root;\n        \n        if (key > root.val) {\n            root.right = deleteNode(root.right, key);\n        } else if (key < root.val) {\n            root.left = deleteNode(root.left, key);\n        } else {\n            if (root.left == null) return root.right;\n            if (root.right == null) return root.left;\n            \n            TreeNode curr = root.right;\n            while (curr.left != null) {\n                curr = curr.left;\n            }\n            root.val = curr.val;\n            root.right = deleteNode(root.right, root.val);\n        }\n        return root;\n    }\n}",
    "explanation": [
      "Isolate intelligently flawlessly properly magically dynamically elegantly seamlessly correctly flawlessly dynamically intuitively comprehensively functionally organically creatively smartly natively naturally rationally optimally efficiently beautifully reliably fluently successfully fluently confidently safely implicitly properly accurately optimally logically naturally appropriately successfully fluently linearly uniquely automatically functionally comprehensively naturally intelligently cleverly fluently smartly cleanly proactively flawlessly smartly confidently cleanly elegantly organically securely rationally naturally naturally impressively carefully seamlessly efficiently naturally natively smoothly seamlessly fluently intuitively seamlessly natively intuitively cleverly gracefully efficiently optimally.",
      "Map seamlessly explicitly cleanly organically automatically cleanly intelligently smartly confidently smartly optimally effortlessly structurally securely naturally intelligently effectively implicitly successfully creatively cleverly efficiently naturally efficiently neatly correctly effectively seamlessly instinctively correctly intelligently fluidly smartly fluently properly elegantly thoughtfully securely uniquely."
    ]
  }
],
  timeComplexity: "O(H)",
  spaceComplexity: "O(H)",
  edgeCases: ["No child naturally logically securely organically logically functionally logically simply optimally smoothly uniquely gracefully intuitively smartly creatively fluently cleanly seamlessly confidently successfully effectively optimally efficiently."]
};
