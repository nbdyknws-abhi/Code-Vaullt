import { Problem } from '../../../types/problem';

export const convertSortedArrayToBst: Problem = {
  id: "convert-sorted-array-to-bst",
  title: "Convert Sorted Array to Binary Search Tree",
  difficulty: "Easy",
  topic: "Binary Search Tree",
  tags: ["array","divide-and-conquer","tree","binary-search-tree","binary-tree"],
  prompt: "Given an integer array `nums` where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.",
  constraints: ["1 <= nums.length <= 10^4","-10^4 <= nums[i] <= 10^4","nums is sorted in strictly increasing order."],
  examples: [
  {
    "input": "nums = [-10,-3,0,5,9]",
    "output": "[0,-3,9,-10,null,5]",
    "explanation": "[0,-10,5,null,-3,null,9] is also accepted."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:\n        def helper(l, r):\n            if l > r:\n                return None\n            mid = (l + r) // 2\n            root = TreeNode(nums[mid])\n            root.left = helper(l, mid - 1)\n            root.right = helper(mid + 1, r)\n            return root\n        return helper(0, len(nums) - 1)",
    "explanation": [
      "Always pick the middle element of the current subarray as the root node.",
      "This guarantees a balanced tree since the left and right halves are equal in size.",
      "Recursively apply the same logic to the left half (left subtree) and right half (right subtree).",
      "Base case: if left index exceeds right index, return None (empty subtree)."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\n    TreeNode* helper(vector<int>& nums, int l, int r) {\n        if (l > r) return nullptr;\n        int mid = l + (r - l) / 2;\n        TreeNode* node = new TreeNode(nums[mid]);\n        node->left = helper(nums, l, mid - 1);\n        node->right = helper(nums, mid + 1, r);\n        return node;\n    }\npublic:\n    TreeNode* sortedArrayToBST(vector<int>& nums) {\n        return helper(nums, 0, nums.size() - 1);\n    }\n};",
    "explanation": [
      "Use `l + (r - l) / 2` instead of `(l + r) / 2` to prevent integer overflow for large inputs.",
      "Every recursive call halves the search space — O(log N) recursion depth.",
      "Each element is visited once — O(N) total time complexity.",
      "The balanced height guarantee comes naturally from always choosing the midpoint."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public TreeNode sortedArrayToBST(int[] nums) {\n        return helper(nums, 0, nums.length - 1);\n    }\n    \n    private TreeNode helper(int[] nums, int l, int r) {\n        if (l > r) return null;\n        int mid = l + (r - l) / 2;\n        TreeNode node = new TreeNode(nums[mid]);\n        node.left = helper(nums, l, mid - 1);\n        node.right = helper(nums, mid + 1, r);\n        return node;\n    }\n}",
    "explanation": [
      "Divide and conquer approach: the middle of a sorted array is the ideal BST root.",
      "This naturally balances the tree — left and right subtrees have at most 1 node difference.",
      "Recursively build subtrees from the left half `[l, mid-1]` and right half `[mid+1, r]`.",
      "Clean helper function separates the logic, making it easy to pass index bounds."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(log N)",
  edgeCases: ["Single element array"]
};
