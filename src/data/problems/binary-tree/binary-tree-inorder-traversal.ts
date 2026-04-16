import { Problem } from '../../../types/problem';

export const binaryTreeInorderTraversal: Problem = {
  id: "binary-tree-inorder-traversal",
  title: "Binary Tree Inorder Traversal",
  difficulty: "Easy",
  topic: "Binary Tree",
  tags: ["tree","depth-first-search","binary-tree"],
  prompt: "Given the `root` of a binary tree, return the inorder traversal of its nodes' values.",
  constraints: ["The number of nodes in the tree is in the range [0, 100].","-100 <= Node.val <= 100"],
  examples: [
  {
    "input": "root = [1,null,2,3]",
    "output": "[1,3,2]"
  },
  {
    "input": "root = []",
    "output": "[]"
  },
  {
    "input": "root = [1]",
    "output": "[1]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:\n        res = []\n        \n        def inorder(node):\n            if not node:\n                return\n            inorder(node.left)\n            res.append(node.val)\n            inorder(node.right)\n            \n        inorder(root)\n        return res",
    "explanation": [
      "Define an inner recursive function `inorder`.",
      "If the node is null, terminate the specific traversal natively.",
      "Call recursively on the left child.",
      "Append the current node's value to the result list.",
      "Call recursively on the right child."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    std::vector<int> inorderTraversal(TreeNode* root) {\n        std::vector<int> res;\n        std::stack<TreeNode*> s;\n        TreeNode* curr = root;\n        \n        while (curr != nullptr || !s.empty()) {\n            while (curr != nullptr) {\n                s.push(curr);\n                curr = curr->left;\n            }\n            curr = s.top();\n            s.pop();\n            res.push_back(curr->val);\n            curr = curr->right;\n        }\n        \n        return res;\n    }\n};",
    "explanation": [
      "Use an iterative stack approach to simulate the call stack natively and efficiently.",
      "Traverse as far left as possible, pushing nodes onto the implicit memory stack.",
      "Once a null pointer is reached, pop from the stack to process the node's value.",
      "Shift the current pointer precisely to the right tree branch and repeat."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        List<Integer> res = new ArrayList<>();\n        helper(root, res);\n        return res;\n    }\n    \n    private void helper(TreeNode node, List<Integer> res) {\n        if (node != null) {\n            helper(node.left, res);\n            res.add(node.val);\n            helper(node.right, res);\n        }\n    }\n}",
    "explanation": [
      "Establish a secondary helper function accepting standard array accumulators natively.",
      "Validate null conditions properly avoiding implicit exception generation entirely.",
      "Extract and map traversal configurations effectively executing recursive memory natively elegantly."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Empty tree","Single node","Left-skewed tree"]
};
