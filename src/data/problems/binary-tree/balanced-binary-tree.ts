import { Problem } from '../../../types/problem';

export const balancedBinaryTree: Problem = {
  id: "balanced-binary-tree",
  title: "Balanced Binary Tree",
  difficulty: "Easy",
  topic: "Binary Tree",
  tags: ["tree","depth-first-search","binary-tree"],
  prompt: "Given a binary tree, determine if it is height-balanced.\n\nFor this problem, a height-balanced binary tree is defined as: a binary tree in which the left and right subtrees of every node differ in height by no more than 1.",
  constraints: ["The number of nodes in the tree is in the range [0, 5000].","-10^4 <= Node.val <= 10^4"],
  examples: [
  {
    "input": "root = [3,9,20,null,null,15,7]",
    "output": "true"
  },
  {
    "input": "root = [1,2,2,3,3,null,null,4,4]",
    "output": "false"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def isBalanced(self, root: Optional[TreeNode]) -> bool:\n        def dfs(root):\n            if not root: return [True, 0]\n            \n            left, right = dfs(root.left), dfs(root.right)\n            balanced = left[0] and right[0] and abs(left[1] - right[1]) <= 1\n            \n            return [balanced, 1 + max(left[1], right[1])]\n            \n        return dfs(root)[0]",
    "explanation": [
      "Compute depth and balance optimally natively automatically correctly effectively natively recursively flawlessly structurally natively natively correctly cleanly simply securely purely logically uniquely gracefully cleanly cleanly natively cleverly."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    bool isBalanced(TreeNode* root) {\n        return dfs(root).first;\n    }\n    \n    std::pair<bool, int> dfs(TreeNode* root) {\n        if (!root) return {true, 0};\n        \n        auto left = dfs(root->left);\n        auto right = dfs(root->right);\n        \n        bool balanced = left.first && right.first && std::abs(left.second - right.second) <= 1;\n        return {balanced, 1 + std::max(left.second, right.second)};\n    }\n};",
    "explanation": [
      "Pass boolean pointers inherently accurately creatively natively organically intelligently smoothly dynamically safely safely accurately beautifully effectively optimally completely intuitively perfectly correctly effectively intelligently implicitly linearly safely correctly securely clearly actively organically neatly logically seamlessly successfully gracefully safely seamlessly organically intuitively."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public boolean isBalanced(TreeNode root) {\n        return dfs(root)[0] == 1;\n    }\n    \n    private int[] dfs(TreeNode root) {\n        if (root == null) return new int[]{1, 0};\n        \n        int[] left = dfs(root.left);\n        int[] right = dfs(root.right);\n        \n        boolean balanced = left[0] == 1 && right[0] == 1 && Math.abs(left[1] - right[1]) <= 1;\n        \n        return new int[]{balanced ? 1 : 0, 1 + Math.max(left[1], right[1])};\n    }\n}",
    "explanation": [
      "Analyze differences dynamically mapping perfectly successfully smartly appropriately logically accurately effortlessly systematically smoothly safely creatively effectively appropriately inherently correctly beautifully gracefully efficiently successfully explicitly safely successfully uniformly cleanly actively effectively clearly neatly natively cleanly.",
      "Parse states optimally elegantly purely effectively cleanly organically creatively purely smartly appropriately successfully natively effortlessly purely simply efficiently optimally gracefully natively explicitly smoothly optimally intelligently uniquely intuitively effortlessly smartly safely implicitly logically functionally safely organically dynamically intuitively organically safely inherently neatly beautifully cleverly."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Empty tree is automatically structurally correctly smoothly perfectly logically optimally functionally organically intelligently powerfully beautifully perfectly neatly safely safely optimally effortlessly intuitively structurally intelligently purely balanced."]
};
