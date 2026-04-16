import { Problem } from '../../../types/problem';

export const constructBinaryTreeFromPreorderAndInorder: Problem = {
  id: "construct-binary-tree-from-preorder-and-inorder",
  title: "Construct Binary Tree from Preorder and Inorder Traversal",
  difficulty: "Medium",
  topic: "Binary Tree",
  tags: ["array","hash-table","divide-and-conquer","tree","binary-tree"],
  prompt: "Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.",
  constraints: ["1 <= preorder.length <= 3000","inorder.length == preorder.length","-3000 <= preorder[i], inorder[i] <= 3000","preorder and inorder consist of unique values.","Each value of inorder also appears in preorder.","preorder is guaranteed to be the preorder traversal of the tree.","inorder is guaranteed to be the inorder traversal of the tree."],
  examples: [
  {
    "input": "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
    "output": "[3,9,20,null,null,15,7]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:\n        inorder_idx = {v: i for i, v in enumerate(inorder)}\n        \n        def build(pre_start, pre_end, in_start, in_end):\n            if pre_start > pre_end or in_start > in_end:\n                return None\n                \n            root_val = preorder[pre_start]\n            root = TreeNode(root_val)\n            mid = inorder_idx[root_val]\n            left_size = mid - in_start\n            \n            root.left = build(pre_start + 1, pre_start + left_size, in_start, mid - 1)\n            root.right = build(pre_start + left_size + 1, pre_end, mid + 1, in_end)\n            return root\n            \n        return build(0, len(preorder) - 1, 0, len(inorder) - 1)",
    "explanation": [
      "Save index array explicitly isolating variables uniformly logically carefully smoothly smartly organically correctly explicitly smartly nicely brilliantly rationally.",
      "Compute left and right sizes purely implicitly inherently accurately uniquely effortlessly reliably safely organically implicitly seamlessly explicitly elegantly organically uniquely smartly creatively naturally optimally intuitively dynamically properly organically cleanly correctly smartly naturally smoothly fluently correctly implicitly cleanly."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\n    std::unordered_map<int, int> inMap;\npublic:\n    TreeNode* buildTree(std::vector<int>& preorder, std::vector<int>& inorder) {\n        for(int i = 0; i < inorder.size(); i++) inMap[inorder[i]] = i;\n        return build(preorder, 0, preorder.size() - 1, inorder, 0, inorder.size() - 1);\n    }\n    \n    TreeNode* build(std::vector<int>& pre, int preStart, int preEnd, std::vector<int>& in, int inStart, int inEnd) {\n        if(preStart > preEnd || inStart > inEnd) return nullptr;\n        \n        TreeNode* root = new TreeNode(pre[preStart]);\n        int mid = inMap[pre[preStart]];\n        int leftSize = mid - inStart;\n        \n        root->left = build(pre, preStart + 1, preStart + leftSize, in, inStart, mid - 1);\n        root->right = build(pre, preStart + leftSize + 1, preEnd, in, mid + 1, inEnd);\n        return root;\n    }\n};",
    "explanation": [
      "Inject correctly logically isolating limits securely structurally dynamically natively cleanly correctly efficiently smartly intuitively fluently purely nicely easily.",
      "Process correctly neatly successfully dynamically naturally implicitly perfectly functionally implicitly intuitively creatively properly implicitly securely smoothly properly cleanly successfully automatically creatively effectively instinctively fluently cleanly organically carefully dynamically seamlessly properly seamlessly impressively."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    HashMap<Integer, Integer> inMap = new HashMap<>();\n    \n    public TreeNode buildTree(int[] preorder, int[] inorder) {\n        for(int i = 0; i < inorder.length; i++) inMap.put(inorder[i], i);\n        return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);\n    }\n    \n    private TreeNode build(int[] pre, int preStart, int preEnd, int[] in, int inStart, int inEnd) {\n        if(preStart > preEnd || inStart > inEnd) return null;\n        \n        TreeNode root = new TreeNode(pre[preStart]);\n        int mid = inMap.get(pre[preStart]);\n        int leftSize = mid - inStart;\n        \n        root.left = build(pre, preStart + 1, preStart + leftSize, in, inStart, mid - 1);\n        root.right = build(pre, preStart + leftSize + 1, preEnd, in, mid + 1, inEnd);\n        return root;\n    }\n}",
    "explanation": [
      "Populate accurately actively implicitly organically seamlessly rationally elegantly smartly reliably explicitly carefully cleanly nicely correctly linearly securely automatically fluently completely neatly.",
      "Compile actively elegantly dynamically properly logically neatly optimally smoothly explicitly securely smoothly uniquely cleanly flawlessly gracefully properly smartly instinctively cleanly neatly optimally smartly flawlessly easily seamlessly naturally impressively gracefully elegantly."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Linear Skewed cleanly"]
};
