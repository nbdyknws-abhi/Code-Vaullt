import fs from 'fs';
import path from 'path';

const bstData = {
  "convert-sorted-array-to-bst": {
    title: "Convert Sorted Array to Binary Search Tree", difficulty: "Easy", topic: "Binary Search Tree", tags: ["array", "divide-and-conquer", "tree", "binary-search-tree", "binary-tree"],
    prompt: "Given an integer array `nums` where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.",
    constraints: ["1 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4", "nums is sorted in strictly increasing order."],
    examples: [{input: "nums = [-10,-3,0,5,9]", output: "[0,-3,9,-10,null,5]", explanation: "[0,-10,5,null,-3,null,9] is also accepted."}],
    timeComplexity: "O(N)", spaceComplexity: "O(log N)", edgeCases: ["Single element array"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        def helper(l, r):
            if l > r:
                return None
            mid = (l + r) // 2
            root = TreeNode(nums[mid])
            root.left = helper(l, mid - 1)
            root.right = helper(mid + 1, r)
            return root
        return helper(0, len(nums) - 1)`,
        explanation: [
          "Always pick the middle element of the current subarray as the root node.",
          "This guarantees a balanced tree since the left and right halves are equal in size.",
          "Recursively apply the same logic to the left half (left subtree) and right half (right subtree).",
          "Base case: if left index exceeds right index, return None (empty subtree)."
        ]
      },
      {
        language: "cpp",
        code: `class Solution {
    TreeNode* helper(vector<int>& nums, int l, int r) {
        if (l > r) return nullptr;
        int mid = l + (r - l) / 2;
        TreeNode* node = new TreeNode(nums[mid]);
        node->left = helper(nums, l, mid - 1);
        node->right = helper(nums, mid + 1, r);
        return node;
    }
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return helper(nums, 0, nums.size() - 1);
    }
};`,
        explanation: [
          "Use `l + (r - l) / 2` instead of `(l + r) / 2` to prevent integer overflow for large inputs.",
          "Every recursive call halves the search space — O(log N) recursion depth.",
          "Each element is visited once — O(N) total time complexity.",
          "The balanced height guarantee comes naturally from always choosing the midpoint."
        ]
      },
      {
        language: "java",
        code: `class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return helper(nums, 0, nums.length - 1);
    }
    
    private TreeNode helper(int[] nums, int l, int r) {
        if (l > r) return null;
        int mid = l + (r - l) / 2;
        TreeNode node = new TreeNode(nums[mid]);
        node.left = helper(nums, l, mid - 1);
        node.right = helper(nums, mid + 1, r);
        return node;
    }
}`,
        explanation: [
          "Divide and conquer approach: the middle of a sorted array is the ideal BST root.",
          "This naturally balances the tree — left and right subtrees have at most 1 node difference.",
          "Recursively build subtrees from the left half `[l, mid-1]` and right half `[mid+1, r]`.",
          "Clean helper function separates the logic, making it easy to pass index bounds."
        ]
      }
    ]
  },
  "range-sum-of-bst": {
    title: "Range Sum of BST", difficulty: "Easy", topic: "Binary Search Tree", tags: ["tree", "depth-first-search", "binary-search-tree", "binary-tree"],
    prompt: "Given the `root` node of a binary search tree and two integers `low` and `high`, return the sum of values of all nodes with a value in the inclusive range `[low, high]`.",
    constraints: ["The number of nodes in the tree is in the range [1, 2 * 10^4].", "1 <= Node.val <= 10^5", "1 <= low <= high <= 10^5", "All Node.val are unique."],
    examples: [{input: "root = [10,5,15,3,7,null,18], low = 7, high = 15", output: "32", explanation: "Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32."}],
    timeComplexity: "O(N)", spaceComplexity: "O(H)", edgeCases: ["No nodes in range", "All nodes in range"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:
        if not root:
            return 0
        
        total = 0
        if low <= root.val <= high:
            total += root.val
        if root.val > low:
            total += self.rangeSumBST(root.left, low, high)
        if root.val < high:
            total += self.rangeSumBST(root.right, low, high)
        
        return total`,
        explanation: [
          "If the current node's value is within [low, high], add it to the sum.",
          "BST pruning: if the node value is greater than `low`, there may be valid nodes in the left subtree.",
          "If the node value is less than `high`, there may be valid nodes in the right subtree.",
          "This avoids visiting nodes outside the range, making the traversal more efficient than brute force."
        ]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int rangeSumBST(TreeNode* root, int low, int high) {
        if (!root) return 0;
        
        int sum = 0;
        if (root->val >= low && root->val <= high) {
            sum += root->val;
        }
        if (root->val > low) {
            sum += rangeSumBST(root->left, low, high);
        }
        if (root->val < high) {
            sum += rangeSumBST(root->right, low, high);
        }
        return sum;
    }
};`,
        explanation: [
          "Leverage BST ordering to prune entire subtrees we don't need to visit.",
          "Add the current node's value if it falls within the inclusive range [low, high].",
          "Only recurse left if the current value exceeds `low` (left subtree might have valid nodes).",
          "Only recurse right if the current value is below `high` (right subtree might have valid nodes)."
        ]
      },
      {
        language: "java",
        code: `class Solution {
    public int rangeSumBST(TreeNode root, int low, int high) {
        if (root == null) return 0;
        
        int sum = 0;
        if (root.val >= low && root.val <= high) {
            sum += root.val;
        }
        if (root.val > low) {
            sum += rangeSumBST(root.left, low, high);
        }
        if (root.val < high) {
            sum += rangeSumBST(root.right, low, high);
        }
        return sum;
    }
}`,
        explanation: [
          "This is a classic BST-optimized DFS that avoids unnecessary traversals.",
          "The key optimization: skip the left subtree if current val <= low, skip right if current val >= high.",
          "In the best case, this can prune O(N/2) nodes, significantly reducing work.",
          "In the worst case (all nodes in range), we visit every node — O(N)."
        ]
      }
    ]
  },
  "trim-a-bst": {
    title: "Trim a Binary Search Tree", difficulty: "Medium", topic: "Binary Search Tree", tags: ["tree", "depth-first-search", "binary-search-tree", "binary-tree"],
    prompt: "Given the `root` of a binary search tree and the lowest and highest boundaries as `low` and `high`, trim the tree so that all its element values are in the range `[low, high]`. Trimming the tree should not change the relative structure of the elements that will remain in the tree. Return the root of the trimmed binary search tree.",
    constraints: ["The number of nodes in the tree is in the range [1, 10^4].", "0 <= Node.val <= 10^4", "The value of each node in the tree is unique.", "root is guaranteed to be a valid binary search tree.", "0 <= low <= high <= 10^4"],
    examples: [{input: "root = [3,0,4,null,2,null,null,1], low = 1, high = 3", output: "[3,2,null,1]"}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["Root itself is out of range", "Entire tree trimmed"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def trimBST(self, root: Optional[TreeNode], low: int, high: int) -> Optional[TreeNode]:
        if not root:
            return None
            
        if root.val < low:
            return self.trimBST(root.right, low, high)
        if root.val > high:
            return self.trimBST(root.left, low, high)
            
        root.left = self.trimBST(root.left, low, high)
        root.right = self.trimBST(root.right, low, high)
        return root`,
        explanation: [
          "If the current node's value is below `low`, its entire left subtree is also too small — recurse into the right subtree only.",
          "If the current node's value is above `high`, its entire right subtree is also too large — recurse into the left subtree only.",
          "If the node is within range, trim both subtrees and reconnect them to the current node.",
          "BST ordering makes this highly efficient — entire subtrees can be discarded in O(1)."
        ]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    TreeNode* trimBST(TreeNode* root, int low, int high) {
        if (!root) return nullptr;
        
        if (root->val < low) return trimBST(root->right, low, high);
        if (root->val > high) return trimBST(root->left, low, high);
        
        root->left = trimBST(root->left, low, high);
        root->right = trimBST(root->right, low, high);
        return root;
    }
};`,
        explanation: [
          "The recursive approach elegantly handles all three cases: node too small, too large, or in range.",
          "When a node is too small (< low), its valid successor must be in its right subtree.",
          "When a node is too large (> high), its valid predecessor must be in its left subtree.",
          "This avoids explicit node deletion — we simply redirect pointers."
        ]
      },
      {
        language: "java",
        code: `class Solution {
    public TreeNode trimBST(TreeNode root, int low, int high) {
        if (root == null) return null;
        
        if (root.val < low) return trimBST(root.right, low, high);
        if (root.val > high) return trimBST(root.left, low, high);
        
        root.left = trimBST(root.left, low, high);
        root.right = trimBST(root.right, low, high);
        return root;
    }
}`,
        explanation: [
          "Clean recursion with three clear cases makes this solution highly readable.",
          "If val < low: the node and its entire left subtree are invalid. Jump to the right subtree.",
          "If val > high: the node and its entire right subtree are invalid. Jump to the left subtree.",
          "Otherwise: keep the node and recursively trim both children."
        ]
      }
    ]
  },
  "recover-binary-search-tree": {
    title: "Recover Binary Search Tree", difficulty: "Hard", topic: "Binary Search Tree", tags: ["tree", "depth-first-search", "binary-search-tree", "binary-tree"],
    prompt: "You are given the `root` of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.",
    constraints: ["The number of nodes in the tree is in the range [2, 1000].", "-2^31 <= Node.val <= 2^31 - 1"],
    examples: [{input: "root = [1,3,null,null,2]", output: "[3,1,null,null,2]", explanation: "3 and 1 are swapped. The correct tree is [3,1,null,null,2] → swap gives [1,3,null,null,2]. Wait, root [1,3] means 3 should be on left, so swap 1 and 3."}],
    timeComplexity: "O(N)", spaceComplexity: "O(1) Morris Traversal", edgeCases: ["Adjacent nodes swapped", "Non-adjacent nodes swapped"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        first = second = prev = None
        
        def inorder(node):
            nonlocal first, second, prev
            if not node:
                return
            inorder(node.left)
            if prev and prev.val > node.val:
                second = node
                if not first:
                    first = prev
            prev = node
            inorder(node.right)
            
        inorder(root)
        first.val, second.val = second.val, first.val`,
        explanation: [
          "Inorder traversal of a valid BST gives a strictly increasing sequence. A swap breaks this.",
          "Track `prev` (previously visited node). If prev.val > current.val, we found a violation.",
          "The `first` node is the prev at the first violation. The `second` node gets updated at each violation.",
          "For adjacent swapped nodes there is only one violation; for non-adjacent there are two. Swapping `first.val` and `second.val` fixes the BST."
        ]
      },
      {
        language: "cpp",
        code: `class Solution {
    TreeNode *first = nullptr, *second = nullptr, *prev = nullptr;
    
    void inorder(TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        if (prev && prev->val > node->val) {
            second = node;
            if (!first) first = prev;
        }
        prev = node;
        inorder(node->right);
    }
public:
    void recoverTree(TreeNode* root) {
        inorder(root);
        std::swap(first->val, second->val);
    }
};`,
        explanation: [
          "Use inorder DFS and three trackers: `first`, `second` (the two misplaced nodes), and `prev`.",
          "At each inorder step, if `prev->val > node->val`, a violation is detected.",
          "Set `first = prev` on the first violation. Continuously update `second = node`.",
          "After traversal, swap `first.val` and `second.val` to fix the BST in-place."
        ]
      },
      {
        language: "java",
        code: `class Solution {
    TreeNode first = null, second = null, prev = null;
    
    public void recoverTree(TreeNode root) {
        inorder(root);
        int temp = first.val;
        first.val = second.val;
        second.val = temp;
    }
    
    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (prev != null && prev.val > node.val) {
            second = node;
            if (first == null) first = prev;
        }
        prev = node;
        inorder(node.right);
    }
}`,
        explanation: [
          "The core idea: inorder traversal of a correct BST is sorted. Two swapped nodes break this.",
          "The `first` offender is the larger node in the first out-of-order pair (set to `prev`).",
          "The `second` offender is the smaller node — always updated at each violation (could be 1 or 2 violations).",
          "Swapping just the values (not the nodes themselves) fixes the tree without structural changes."
        ]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'binary-search-tree');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

Object.keys(bstData).forEach(id => {
  const data = bstData[id];
  let varName = id.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
  if (/^[0-9]/.test(varName)) varName = '_' + varName;

  const content = `import { Problem } from '../../../types/problem';

export const ${varName}: Problem = {
  id: "${id}",
  title: "${data.title}",
  difficulty: "${data.difficulty}",
  topic: "${data.topic}",
  tags: ${JSON.stringify(data.tags)},
  prompt: ${JSON.stringify(data.prompt)},
  constraints: ${JSON.stringify(data.constraints)},
  examples: ${JSON.stringify(data.examples, null, 2)},
  solutions: ${JSON.stringify(data.solutions, null, 2)},
  timeComplexity: "${data.timeComplexity}",
  spaceComplexity: "${data.spaceComplexity}",
  edgeCases: ${JSON.stringify(data.edgeCases)}
};
`;
  fs.writeFileSync(path.join(targetDir, `${id}.ts`), content);
});

console.log("Written BST problems part 3.");
