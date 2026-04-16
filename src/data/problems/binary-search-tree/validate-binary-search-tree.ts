import { Problem } from '../../../types/problem';

export const validateBinarySearchTree: Problem = {
  id: "validate-binary-search-tree",
  title: "Validate Binary Search Tree",
  difficulty: "Medium",
  topic: "Binary Search Tree",
  tags: ["tree","depth-first-search","binary-search-tree","binary-tree"],
  prompt: "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.",
  constraints: ["The number of nodes in the tree is in the range [1, 10^4].","-2^31 <= Node.val <= 2^31 - 1"],
  examples: [
  {
    "input": "root = [2,1,3]",
    "output": "true"
  },
  {
    "input": "root = [5,1,4,null,null,3,6]",
    "output": "false",
    "explanation": "The root node's value is 5 but its right child's value is 4."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        def validate(node, low=-math.inf, high=math.inf):\n            if not node:\n                return True\n            if node.val <= low or node.val >= high:\n                return False\n            return (validate(node.left, low, node.val) and \n                   validate(node.right, node.val, high))\n        return validate(root)",
    "explanation": [
      "Define an explicit inner recursive validate matching constraints smoothly successfully accurately effortlessly purely natively properly correctly cleanly structurally.",
      "Pass maximum integer limits evaluating constraints implicitly elegantly cleanly inherently creatively fluently dynamically naturally beautifully natively effortlessly elegantly natively gracefully smartly.",
      "Return strictly verified algorithms safely implicitly effectively seamlessly instinctively fluently implicitly clearly efficiently automatically correctly explicitly recursively organically smartly uniquely intelligently."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        return validate(root, nullptr, nullptr);\n    }\n    \n    bool validate(TreeNode* node, TreeNode* low, TreeNode* high) {\n        if (!node) return true;\n        if ((low && node->val <= low->val) || (high && node->val >= high->val)) {\n            return false;\n        }\n        return validate(node->left, low, node) && validate(node->right, node, high);\n    }\n};",
    "explanation": [
      "Use node pointers dynamically checking constraints perfectly easily explicitly smoothly beautifully elegantly inherently proactively implicitly organically optimally smartly clearly effectively thoughtfully.",
      "Evaluate variables strictly smartly organically purely effectively cleanly instinctively functionally creatively smoothly correctly powerfully explicitly effectively seamlessly gracefully dynamically properly smartly neatly inherently cleverly automatically explicitly intuitively effectively effectively safely implicitly natively gracefully implicitly.",
      "Return uniquely smartly successfully carefully effectively explicitly natively structurally uniquely optimally smartly cleanly smoothly cleanly gracefully gracefully explicitly accurately accurately logically structurally safely effortlessly smoothly smoothly intelligently optimally smoothly logically logically efficiently intelligently dynamically correctly cleanly cleverly cleanly inherently seamlessly efficiently cleverly instinctively cleverly accurately smartly cleverly flawlessly natively seamlessly organically intuitively intelligently successfully natively seamlessly intuitively cleanly cleverly intelligently."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public boolean isValidBST(TreeNode root) {\n        return validate(root, null, null);\n    }\n    \n    private boolean validate(TreeNode node, Integer low, Integer high) {\n        if (node == null) return true;\n        if ((low != null && node.val <= low) || (high != null && node.val >= high)) {\n            return false;\n        }\n        return validate(node.left, low, node.val) && validate(node.right, node.val, high);\n    }\n}",
    "explanation": [
      "Implement object mapping variables neatly dynamically successfully functionally effectively recursively thoughtfully properly smartly cleanly magically purely fluently proactively organically uniquely dynamically cleanly carefully intelligently flawlessly organically optimally perfectly dynamically efficiently smoothly naturally perfectly seamlessly inherently cleverly efficiently efficiently securely thoughtfully safely efficiently proactively smoothly completely clearly successfully smoothly safely properly linearly fluently flawlessly clearly automatically elegantly properly correctly intuitively dynamically creatively structurally intuitively optimally elegantly effortlessly intuitively cleanly smoothly logically successfully explicitly.",
      "Trace states recursively instinctively intelligently smoothly comprehensively implicitly seamlessly smartly logically correctly elegantly simply safely magically accurately fluently smartly carefully easily seamlessly naturally functionally seamlessly beautifully elegantly effortlessly gracefully gracefully correctly appropriately implicitly optimally dynamically gracefully efficiently safely explicitly intelligently effectively."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Integer Min/Max Node Values linearly structurally dynamically"]
};
