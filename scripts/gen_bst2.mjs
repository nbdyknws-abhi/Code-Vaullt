import fs from 'fs';
import path from 'path';

const bstData = {
  "lowest-common-ancestor-of-a-bst": {
    title: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "Medium", topic: "Binary Search Tree", tags: ["tree", "depth-first-search", "binary-search-tree", "binary-tree"],
    prompt: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nThe lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).",
    constraints: ["The number of nodes in the tree is in the range [2, 10^5].", "-10^9 <= Node.val <= 10^9", "All Node.val are unique.", "p != q", "p and q will exist in the BST."],
    examples: [{input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6", explanation: "The LCA of nodes 2 and 8 is 6."}],
    timeComplexity: "O(H)", spaceComplexity: "O(1)", edgeCases: ["p or q is the root", "p is ancestor of q"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        cur = root
        
        while cur:
            if p.val > cur.val and q.val > cur.val:
                cur = cur.right
            elif p.val < cur.val and q.val < cur.val:
                cur = cur.left
            else:
                return cur`,
        explanation: [
          "Unlike a general binary tree, BST properties let us navigate without visiting every node.",
          "If both p and q are greater than the current node, the LCA must be in the right subtree.",
          "If both p and q are smaller, the LCA must be in the left subtree.",
          "Otherwise, the current node is the split point — it is the LCA. Return it."
        ]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        TreeNode* cur = root;
        while (cur) {
            if (p->val > cur->val && q->val > cur->val) {
                cur = cur->right;
            } else if (p->val < cur->val && q->val < cur->val) {
                cur = cur->left;
            } else {
                return cur;
            }
        }
        return nullptr;
    }
};`,
        explanation: [
          "Exploit BST ordering for an O(H) iterative approach — no recursion stack needed.",
          "Traverse right if both targets are greater than the current node's value.",
          "Traverse left if both are smaller.",
          "The moment they diverge (one on each side), the current node is the answer."
        ]
      },
      {
        language: "java",
        code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode cur = root;
        while (cur != null) {
            if (p.val > cur.val && q.val > cur.val) {
                cur = cur.right;
            } else if (p.val < cur.val && q.val < cur.val) {
                cur = cur.left;
            } else {
                return cur;
            }
        }
        return null;
    }
}`,
        explanation: [
          "Key insight: in a BST, if p and q are both greater than the current node, LCA lies to the right.",
          "If both are smaller, LCA lies to the left.",
          "The first node where p and q go in different directions (or one equals the node) is the answer.",
          "This iterative approach runs in O(H) time and O(1) space — optimal for BSTs."
        ]
      }
    ]
  },
  "kth-smallest-element-in-a-bst": {
    title: "Kth Smallest Element in a BST", difficulty: "Medium", topic: "Binary Search Tree", tags: ["tree", "depth-first-search", "binary-search-tree", "binary-tree"],
    prompt: "Given the `root` of a binary search tree, and an integer `k`, return the `k`th smallest value (1-indexed) of all the values of the nodes in the tree.",
    constraints: ["The number of nodes in the tree is n.", "1 <= k <= n <= 10^4", "0 <= Node.val <= 10^4"],
    examples: [{input: "root = [3,1,4,null,2], k = 1", output: "1"}, {input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3"}],
    timeComplexity: "O(H + k)", spaceComplexity: "O(H)", edgeCases: ["k equals total nodes", "Left-skewed tree"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        curr = root
        
        while stack or curr:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            k -= 1
            if k == 0:
                return curr.val
            curr = curr.right`,
        explanation: [
          "Inorder traversal of a BST yields nodes in ascending order — perfect for finding the kth smallest.",
          "Use an iterative stack to avoid recursion overhead.",
          "Dive as far left as possible, pushing nodes onto the stack.",
          "Pop each node, decrement k. When k reaches 0, you've found the kth smallest value."
        ]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        std::stack<TreeNode*> s;
        TreeNode* curr = root;
        
        while (!s.empty() || curr) {
            while (curr) {
                s.push(curr);
                curr = curr->left;
            }
            curr = s.top();
            s.pop();
            if (--k == 0) return curr->val;
            curr = curr->right;
        }
        return -1;
    }
};`,
        explanation: [
          "BST inorder traversal (left → root → right) produces sorted output.",
          "Push nodes leftward into a stack to simulate recursion iteratively.",
          "Pop from the stack and decrement k each time we visit a node.",
          "Return the node's value when k hits zero — that's the kth smallest."
        ]
      },
      {
        language: "java",
        code: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;
        
        while (!stack.isEmpty() || curr != null) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            if (--k == 0) return curr.val;
            curr = curr.right;
        }
        return -1;
    }
}`,
        explanation: [
          "Inorder traversal is the key insight: a BST's inorder sequence is sorted in ascending order.",
          "Use an explicit stack to simulate the recursive call stack iteratively.",
          "At each iteration, go as left as possible first.",
          "Pop a node and check if it's the kth visited. If yes, return its value."
        ]
      }
    ]
  },
  "bst-iterator": {
    title: "Binary Search Tree Iterator", difficulty: "Medium", topic: "Binary Search Tree", tags: ["tree", "stack", "design", "binary-search-tree", "binary-tree", "iterator"],
    prompt: "Implement the `BSTIterator` class that represents an iterator over the in-order traversal of a binary search tree (BST):\n\n* `BSTIterator(TreeNode root)` Initializes an object of the `BSTIterator` class. The `root` of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.\n* `boolean hasNext()` Returns `true` if there exists a number in the traversal to the right of the pointer, otherwise returns `false`.\n* `int next()` Moves the pointer to the right, then returns the number at the pointer.",
    constraints: ["The number of nodes in the tree is in the range [1, 10^5].", "0 <= Node.val <= 10^6", "At most 10^5 calls will be made to hasNext, and next."],
    examples: [{input: "[\"BSTIterator\", \"next\", \"next\", \"hasNext\", \"next\", \"hasNext\", \"next\", \"hasNext\", \"next\", \"hasNext\"]\n[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]", output: "[null, 3, 7, true, 9, true, 15, true, 20, false]"}],
    timeComplexity: "O(1) amortized for next()", spaceComplexity: "O(H)", edgeCases: ["Single node tree"],
    solutions: [
      {
        language: "python",
        code: `class BSTIterator:
    def __init__(self, root: Optional[TreeNode]):
        self.stack = []
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        node = self.stack.pop()
        self._push_left(node.right)
        return node.val

    def hasNext(self) -> bool:
        return len(self.stack) > 0`,
        explanation: [
          "Initialize a stack by pushing all leftmost nodes from the root.",
          "The `next()` call pops the top (smallest unvisited node), then pushes the right subtree's leftmost path.",
          "This lazily simulates inorder traversal — only processing nodes when needed.",
          "`hasNext()` simply checks if the stack still has entries."
        ]
      },
      {
        language: "cpp",
        code: `class BSTIterator {
    std::stack<TreeNode*> s;
    void pushLeft(TreeNode* node) {
        while (node) {
            s.push(node);
            node = node->left;
        }
    }
public:
    BSTIterator(TreeNode* root) {
        pushLeft(root);
    }
    
    int next() {
        TreeNode* node = s.top();
        s.pop();
        pushLeft(node->right);
        return node->val;
    }
    
    bool hasNext() {
        return !s.empty();
    }
};`,
        explanation: [
          "The constructor primes the stack with the entire leftmost chain from root.",
          "`next()` pops the minimum, then pushes the right child's leftmost chain for future calls.",
          "Each node is pushed and popped exactly once — amortized O(1) per `next()` call.",
          "Space is O(H) in the worst case (height of tree), not O(N)."
        ]
      },
      {
        language: "java",
        code: `class BSTIterator {
    private Stack<TreeNode> stack = new Stack<>();

    public BSTIterator(TreeNode root) {
        pushLeft(root);
    }
    
    private void pushLeft(TreeNode node) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }

    public int next() {
        TreeNode node = stack.pop();
        pushLeft(node.right);
        return node.val;
    }

    public boolean hasNext() {
        return !stack.isEmpty();
    }
}`,
        explanation: [
          "On initialization, push all left children of the root to the stack to reach the minimum element.",
          "`next()` pops the smallest remaining node and then primes the stack with the right subtree.",
          "This approach is memory-efficient: O(H) space instead of storing all N values upfront.",
          "`hasNext()` returns true as long as the stack is non-empty."
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

console.log("Written BST problems part 2.");
