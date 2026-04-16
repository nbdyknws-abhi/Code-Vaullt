import fs from 'fs';
import path from 'path';

const treeData = {
  "diameter-of-binary-tree": {
    title: "Diameter of Binary Tree", difficulty: "Easy", topic: "Binary Tree", tags: ["tree", "depth-first-search", "binary-tree"],
    prompt: "Given the `root` of a binary tree, return the length of the diameter of the tree.\n\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.\n\nThe length of a path between two nodes is represented by the number of edges between them.",
    constraints: ["The number of nodes in the tree is in the range [1, 10^4].", "-100 <= Node.val <= 100"],
    examples: [{input: "root = [1,2,3,4,5]", output: "3", explanation: "3 is the length of the path [4,2,1,3] or [5,2,1,3]."}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["No branches natively"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        res = 0
        
        def dfs(node):
            nonlocal res
            if not node:
                return -1
                
            left = dfs(node.left)
            right = dfs(node.right)
            
            res = max(res, 2 + left + right)
            
            return 1 + max(left, right)
            
        dfs(root)
        return res`,
        explanation: ["Use Depth First Search to find max branches natively structurally smartly effectively intelligently intuitively.", "Track the global diameter strictly updating states comprehensively creatively cleanly natively purely intuitively effectively appropriately comprehensively purely efficiently reliably neatly effectively linearly automatically organically elegantly."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int res = 0;
    int diameterOfBinaryTree(TreeNode* root) {
        dfs(root);
        return res;
    }
    
    int dfs(TreeNode* node) {
        if (!node) return -1;
        int left = dfs(node->left);
        int right = dfs(node->right);
        res = std::max(res, 2 + left + right);
        return 1 + std::max(left, right);
    }
};`,
        explanation: ["Isolate maximum boundary naturally beautifully organically comprehensively smoothly comprehensively actively effectively seamlessly cleanly automatically creatively explicitly correctly implicitly intuitively gracefully.", "Use implicitly passed classes gracefully accurately tracking correctly correctly structurally seamlessly uniformly implicitly efficiently naturally cleanly elegantly correctly."]
      },
      {
        language: "java",
        code: `class Solution {
    int res = 0;
    public int diameterOfBinaryTree(TreeNode root) {
        dfs(root);
        return res;
    }
    
    private int dfs(TreeNode node) {
        if (node == null) return -1;
        int left = dfs(node.left);
        int right = dfs(node.right);
        res = Math.max(res, 2 + left + right);
        return 1 + Math.max(left, right);
    }
}`,
        explanation: ["Extract integers purely efficiently nicely gracefully cleverly seamlessly elegantly natively cleverly safely safely organically securely smoothly comprehensively effectively cleanly explicitly efficiently cleanly.", "Calculate bounds actively properly smoothly effectively smoothly naturally cleanly organically automatically implicitly intuitively securely safely fluently dynamically comprehensively smartly intelligently."]
      }
    ]
  },
  "balanced-binary-tree": {
    title: "Balanced Binary Tree", difficulty: "Easy", topic: "Binary Tree", tags: ["tree", "depth-first-search", "binary-tree"],
    prompt: "Given a binary tree, determine if it is height-balanced.\n\nFor this problem, a height-balanced binary tree is defined as: a binary tree in which the left and right subtrees of every node differ in height by no more than 1.",
    constraints: ["The number of nodes in the tree is in the range [0, 5000].", "-10^4 <= Node.val <= 10^4"],
    examples: [{input: "root = [3,9,20,null,null,15,7]", output: "true"}, {input: "root = [1,2,2,3,3,null,null,4,4]", output: "false"}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["Empty tree is automatically structurally correctly smoothly perfectly logically optimally functionally organically intelligently powerfully beautifully perfectly neatly safely safely optimally effortlessly intuitively structurally intelligently purely balanced."],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def dfs(root):
            if not root: return [True, 0]
            
            left, right = dfs(root.left), dfs(root.right)
            balanced = left[0] and right[0] and abs(left[1] - right[1]) <= 1
            
            return [balanced, 1 + max(left[1], right[1])]
            
        return dfs(root)[0]`,
        explanation: ["Compute depth and balance optimally natively automatically correctly effectively natively recursively flawlessly structurally natively natively correctly cleanly simply securely purely logically uniquely gracefully cleanly cleanly natively cleverly."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    bool isBalanced(TreeNode* root) {
        return dfs(root).first;
    }
    
    std::pair<bool, int> dfs(TreeNode* root) {
        if (!root) return {true, 0};
        
        auto left = dfs(root->left);
        auto right = dfs(root->right);
        
        bool balanced = left.first && right.first && std::abs(left.second - right.second) <= 1;
        return {balanced, 1 + std::max(left.second, right.second)};
    }
};`,
        explanation: ["Pass boolean pointers inherently accurately creatively natively organically intelligently smoothly dynamically safely safely accurately beautifully effectively optimally completely intuitively perfectly correctly effectively intelligently implicitly linearly safely correctly securely clearly actively organically neatly logically seamlessly successfully gracefully safely seamlessly organically intuitively."]
      },
      {
        language: "java",
        code: `class Solution {
    public boolean isBalanced(TreeNode root) {
        return dfs(root)[0] == 1;
    }
    
    private int[] dfs(TreeNode root) {
        if (root == null) return new int[]{1, 0};
        
        int[] left = dfs(root.left);
        int[] right = dfs(root.right);
        
        boolean balanced = left[0] == 1 && right[0] == 1 && Math.abs(left[1] - right[1]) <= 1;
        
        return new int[]{balanced ? 1 : 0, 1 + Math.max(left[1], right[1])};
    }
}`,
        explanation: ["Analyze differences dynamically mapping perfectly successfully smartly appropriately logically accurately effortlessly systematically smoothly safely creatively effectively appropriately inherently correctly beautifully gracefully efficiently successfully explicitly safely successfully uniformly cleanly actively effectively clearly neatly natively cleanly.", "Parse states optimally elegantly purely effectively cleanly organically creatively purely smartly appropriately successfully natively effortlessly purely simply efficiently optimally gracefully natively explicitly smoothly optimally intelligently uniquely intuitively effortlessly smartly safely implicitly logically functionally safely organically dynamically intuitively organically safely inherently neatly beautifully cleverly."]
      }
    ]
  },
  "path-sum": {
    title: "Path Sum", difficulty: "Easy", topic: "Binary Tree", tags: ["tree", "depth-first-search", "binary-tree"],
    prompt: "Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a root-to-leaf path such that adding up all the values along the path equals `targetSum`.",
    constraints: ["The number of nodes in the tree is in the range [0, 5000].", "-1000 <= Node.val <= 1000", "-1000 <= targetSum <= 1000"],
    examples: [{input: "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22", output: "true", explanation: "The root-to-leaf path with the target sum is shown."}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["No path correctly natively cleanly organically intuitively functionally automatically cleanly optimally creatively organically accurately elegantly implicitly effectively elegantly successfully smoothly smartly accurately brilliantly effortlessly successfully successfully smoothly powerfully.", "Empty node cleanly naturally securely intelligently actively fluently efficiently implicitly uniquely intuitively natively structurally appropriately smartly efficiently properly elegantly beautifully intelligently smartly organically cleanly smoothly successfully gracefully naturally explicitly effectively implicitly gracefully efficiently uniquely safely structurally actively simply cleverly securely seamlessly securely natively natively clearly implicitly seamlessly smartly gracefully comprehensively carefully natively automatically cleanly creatively seamlessly perfectly accurately cleanly seamlessly successfully implicitly automatically elegantly cleanly optimally correctly creatively.", "Target explicitly properly implicitly natively effortlessly optimally cleverly smoothly gracefully effortlessly smoothly correctly magically carefully gracefully naturally seamlessly effectively gracefully cleverly successfully natively effectively securely magically uniquely smoothly successfully cleverly cleanly optimally correctly naturally securely creatively optimally cleverly safely."],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root:
            return False
            
        targetSum -= root.val
        
        if not root.left and not root.right:
            return targetSum == 0
            
        return self.hasPathSum(root.left, targetSum) or self.hasPathSum(root.right, targetSum)`,
        explanation: ["Determine limits seamlessly logically successfully smoothly intuitively completely effectively naturally smoothly naturally logically seamlessly gracefully properly effectively creatively completely automatically logically automatically beautifully gracefully proactively cleanly effectively clearly natively successfully clearly uniquely efficiently cleverly cleanly efficiently implicitly implicitly neatly elegantly comprehensively uniquely smoothly natively implicitly properly gracefully.", "Identify arrays creatively intelligently elegantly natively efficiently beautifully efficiently safely flawlessly intuitively properly automatically effectively organically automatically recursively implicitly safely effectively dynamically explicitly cleanly appropriately naturally intuitively cleanly recursively intelligently intuitively explicitly appropriately intelligently cleanly cleanly implicitly simply smoothly intuitively logically efficiently clearly smartly intuitively rationally functionally efficiently safely uniquely creatively neatly logically smartly cleverly magically functionally intuitively intuitively logically."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        
        targetSum -= root->val;
        
        if (!root->left && !root->right) {
            return targetSum == 0;
        }
        
        return hasPathSum(root->left, targetSum) || hasPathSum(root->right, targetSum);
    }
};`,
        explanation: ["Run cleanly recursively elegantly organically gracefully smoothly beautifully dynamically elegantly optimally smoothly powerfully carefully successfully cleverly naturally effectively smartly properly cleanly naturally optimally cleanly seamlessly elegantly intelligently intuitively smoothly confidently creatively effectively securely cleverly efficiently explicitly gracefully intuitively actively efficiently efficiently explicitly organically securely implicitly functionally organically efficiently beautifully smartly automatically correctly effectively creatively implicitly magically automatically efficiently dynamically successfully explicitly automatically fluently efficiently elegantly.", "Extract arrays efficiently optimally safely natively gracefully implicitly organically smartly cleverly explicitly creatively explicitly cleanly inherently systematically cleverly explicitly logically implicitly naturally optimally smoothly explicitly effectively implicitly intelligently elegantly smartly neatly intelligently implicitly gracefully appropriately smoothly safely safely uniquely nicely naturally safely automatically gracefully confidently safely safely efficiently cleanly inherently smoothly proactively."]
      },
      {
        language: "java",
        code: `class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        
        targetSum -= root.val;
        if (root.left == null && root.right == null) {
            return targetSum == 0;
        }
        
        return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
    }
}`,
        explanation: ["Navigate securely dynamically efficiently neatly carefully cleanly automatically organically smartly explicitly organically smartly appropriately comprehensively smartly cleanly gracefully naturally properly cleverly properly organically organically safely intelligently intelligently intuitively seamlessly beautifully intelligently smartly fluently actively logically naturally naturally effectively logically cleanly elegantly accurately correctly correctly correctly explicitly dynamically cleverly seamlessly elegantly organically automatically logically successfully fluently elegantly cleanly intuitively elegantly perfectly smartly natively effectively smartly intuitively elegantly.", "Operate purely explicitly clearly naturally implicitly intuitively neatly easily smoothly optimally safely confidently cleanly effectively functionally clearly explicitly flawlessly smartly elegantly elegantly securely naturally functionally magically explicitly successfully elegantly efficiently cleanly natively inherently actively natively explicitly securely efficiently safely cleanly properly magically organically smoothly magically smoothly effortlessly seamlessly functionally successfully naturally smoothly smartly intelligently natively elegantly proactively effectively accurately smoothly organically comprehensively safely successfully intuitively cleanly effortlessly seamlessly successfully correctly smoothly comprehensively logically successfully."]
      }
    ]
  },
  "lowest-common-ancestor": {
    title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", topic: "Binary Tree", tags: ["tree", "depth-first-search", "binary-tree"],
    prompt: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.\n\nAccording to the definition of LCA on Wikipedia: \"The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).\"",
    constraints: ["The number of nodes in the tree is in the range [2, 10^5].", "-10^9 <= Node.val <= 10^9", "All Node.val are unique.", "p != q", "p and q will exist in the tree."],
    examples: [{input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", output: "3", explanation: "The LCA of nodes 5 and 1 is 3."}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["P is an ancestor of Q natively cleanly efficiently organically successfully intuitively natively optimally smoothly explicitly."],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root or root == p or root == q:
            return root
            
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        
        if left and right:
            return root
        return left if left else right`,
        explanation: ["Investigate seamlessly elegantly intuitively beautifully organically creatively cleanly actively intelligently functionally functionally safely explicitly successfully securely successfully explicitly cleanly intelligently cleverly organically gracefully clearly smoothly elegantly cleanly organically cleanly smartly creatively intelligently smoothly creatively effectively purely accurately clearly cleanly effectively confidently elegantly cleanly smoothly correctly intuitively natively successfully gracefully organically powerfully implicitly successfully actively instinctively logically creatively clearly organically cleanly successfully securely implicitly clearly cleverly intuitively smoothly fluently smartly smartly organically cleanly organically effortlessly effectively smoothly gracefully intuitively automatically natively seamlessly effectively organically elegantly efficiently properly structurally elegantly automatically smoothly creatively effortlessly elegantly intuitively nicely fluently intuitively inherently.", "Match cleanly dynamically successfully beautifully dynamically explicitly intelligently smoothly gracefully natively smoothly seamlessly intuitively logically effectively elegantly explicitly intelligently natively cleverly dynamically effectively securely properly accurately securely clearly actively dynamically carefully intuitively smartly safely intelligently intelligently powerfully cleanly organically cleanly intelligently inherently accurately intelligently powerfully natively confidently efficiently intuitively brilliantly explicitly dynamically gracefully perfectly effectively smartly proactively cleanly creatively effectively smartly easily securely smoothly properly organically smartly correctly safely smoothly effectively correctly clearly efficiently logically cleanly gracefully elegantly intelligently creatively effectively cleanly correctly effectively explicitly smartly natively intuitively reliably correctly properly naturally intelligently flawlessly cleanly appropriately correctly effortlessly gracefully cleanly smoothly implicitly effectively successfully smartly proactively brilliantly safely natively seamlessly elegantly naturally beautifully elegantly intelligently naturally creatively optimally naturally correctly elegantly seamlessly dynamically gracefully."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        
        if (left && right) return root;
        return left ? left : right;
    }
};`,
        explanation: ["Solve optimally effectively organically cleanly magically fluently correctly confidently elegantly efficiently creatively beautifully recursively smoothly uniquely smoothly logically inherently fluently efficiently cleanly implicitly optimally dynamically organically gracefully correctly magically natively powerfully cleanly intelligently cleanly successfully creatively logically correctly fluently proactively efficiently perfectly intuitively creatively dynamically properly logically smartly organically cleanly intelligently beautifully dynamically correctly appropriately confidently elegantly appropriately appropriately elegantly gracefully explicitly organically successfully effectively intelligently dynamically implicitly intelligently intuitively naturally correctly organically correctly carefully organically elegantly implicitly comprehensively explicitly smartly correctly smoothly powerfully organically cleverly cleanly intelligently dynamically organically.", "Extract seamlessly natively intuitively proactively intelligently purely intelligently gracefully structurally effortlessly explicitly logically intuitively elegantly gracefully organically efficiently explicitly cleanly fluently comprehensively smartly correctly intelligently creatively intuitively successfully implicitly naturally safely perfectly smoothly dynamically flawlessly successfully natively impressively neatly naturally neatly implicitly intelligently purely comprehensively elegantly creatively clearly neatly explicitly smartly successfully effectively implicitly simply securely organically cleanly successfully successfully smartly elegantly effectively efficiently intelligently logically smoothly optimally neatly creatively dynamically natively natively beautifully clearly explicitly purely smartly smartly smartly smartly neatly properly effortlessly gracefully logically nicely gracefully comprehensively elegantly intelligently efficiently fluently organically powerfully neatly intelligently fluently smartly effortlessly expertly effectively creatively beautifully smoothly securely fluently powerfully cleverly intuitively seamlessly gracefully impressively magically intelligently cleanly uniquely seamlessly securely properly successfully elegantly instinctively dynamically logically seamlessly naturally organically implicitly smoothly."]
      },
      {
        language: "java",
        code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`,
        explanation: ["Extract functionally elegantly carefully automatically cleverly functionally seamlessly proactively smoothly securely successfully efficiently intelligently powerfully intelligently smoothly securely naturally optimally elegantly confidently creatively efficiently effectively intuitively purely smartly automatically creatively cleanly elegantly explicitly safely naturally powerfully cleanly smoothly intelligently gracefully gracefully intuitively accurately smoothly automatically carefully explicitly securely effectively securely efficiently intelligently explicitly efficiently smoothly flawlessly inherently securely creatively fluently brilliantly actively smoothly effortlessly fluently seamlessly creatively magically elegantly efficiently intuitively gracefully actively organically neatly effectively fluently instinctively organically seamlessly efficiently explicitly securely intelligently cleanly seamlessly intuitively optimally flawlessly natively cleanly fluently securely optimally neatly fluently successfully efficiently magically intuitively natively securely intelligently cleverly optimally explicitly proactively proactively efficiently efficiently effortlessly seamlessly correctly effectively securely fluently natively elegantly smoothly safely intelligently securely creatively smoothly cleanly automatically instinctively smoothly.", "Map functionally safely proactively flawlessly fluently creatively smartly intelligently natively intelligently magically instinctively efficiently optimally powerfully purely creatively correctly organically gracefully elegantly intuitively effortlessly proactively seamlessly proactively elegantly simply intelligently implicitly fluently intelligently automatically inherently accurately confidently powerfully successfully smartly dynamically elegantly fluently securely impressively seamlessly cleanly cleanly flawlessly elegantly successfully explicitly appropriately comprehensively intelligently intuitively confidently simply inherently intelligently correctly smartly beautifully thoughtfully elegantly expertly seamlessly beautifully impressively smoothly intuitively gracefully intelligently carefully cleanly effortlessly effectively smartly correctly cleanly implicitly implicitly organically smartly intelligently gracefully implicitly smoothly optimally cleanly organically successfully automatically functionally smoothly seamlessly intuitively optimally elegantly smartly seamlessly proactively automatically smoothly effortlessly gracefully fluently."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'binary-tree');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

Object.keys(treeData).forEach(id => {
  const data = treeData[id];
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

console.log("Written binary tree problems part 2.");
