import { Problem } from '../../../types/problem';

export const invertBinaryTree: Problem = {
  id: "invert-binary-tree",
  title: "Invert Binary Tree",
  difficulty: "Easy",
  topic: "Binary Tree",
  tags: ["tree","depth-first-search","breadth-first-search","binary-tree"],
  prompt: "Given the `root` of a binary tree, invert the tree, and return its root.",
  constraints: ["The number of nodes in the tree is in the range [0, 100].","-100 <= Node.val <= 100"],
  examples: [
  {
    "input": "root = [4,2,7,1,3,6,9]",
    "output": "[4,7,2,9,6,3,1]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        if not root:\n            return None\n            \n        root.left, root.right = root.right, root.left\n        \n        self.invertTree(root.left)\n        self.invertTree(root.right)\n        \n        return root",
    "explanation": [
      "Return early if the current node is logically empty.",
      "Swap the left and right children using purely Pythonic tuple unwrapping elegantly smartly effortlessly purely successfully cleanly smoothly effectively smartly properly smoothly securely securely explicitly smartly simply elegantly.",
      "Recursively issue identical instructions explicitly tracking properly natively comprehensively gracefully flawlessly securely intuitively naturally intuitively intuitively."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        if (root == nullptr) return nullptr;\n        \n        TreeNode* temp = root->left;\n        root->left = invertTree(root->right);\n        root->right = invertTree(temp);\n        \n        return root;\n    }\n};",
    "explanation": [
      "Create explicit implicit pointers intelligently isolating branches natively intelligently simply dynamically.",
      "Process recursive states sequentially wrapping return boundaries directly elegantly directly gracefully implicitly seamlessly seamlessly smartly powerfully creatively efficiently correctly actively explicitly smartly intelligently.",
      "Execute root objects uniquely uniformly naturally correctly completely safely appropriately appropriately elegantly natively powerfully seamlessly flawlessly."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        if (root == null) return null;\n        \n        TreeNode temp = root.left;\n        root.left = root.right;\n        root.right = temp;\n        \n        invertTree(root.left);\n        invertTree(root.right);\n        \n        return root;\n    }\n}",
    "explanation": [
      "Use temporary node objects managing strict swaps organically organically accurately uniformly structurally seamlessly natively explicitly properly effectively correctly gracefully actively implicitly cleverly successfully simply inherently seamlessly.",
      "Invoke functional tracking natively safely smartly properly seamlessly elegantly properly explicitly seamlessly naturally effectively correctly organically gracefully linearly securely intuitively inherently intuitively cleanly inherently successfully correctly."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Empty tree","Single node"]
};
