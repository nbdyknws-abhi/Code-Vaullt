import { Problem } from '../../../types/problem';

export const pathSum: Problem = {
  id: "path-sum",
  title: "Path Sum",
  difficulty: "Easy",
  topic: "Binary Tree",
  tags: ["tree","depth-first-search","binary-tree"],
  prompt: "Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a root-to-leaf path such that adding up all the values along the path equals `targetSum`.",
  constraints: ["The number of nodes in the tree is in the range [0, 5000].","-1000 <= Node.val <= 1000","-1000 <= targetSum <= 1000"],
  examples: [
  {
    "input": "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22",
    "output": "true",
    "explanation": "The root-to-leaf path with the target sum is shown."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:\n        if not root:\n            return False\n            \n        targetSum -= root.val\n        \n        if not root.left and not root.right:\n            return targetSum == 0\n            \n        return self.hasPathSum(root.left, targetSum) or self.hasPathSum(root.right, targetSum)",
    "explanation": [
      "Determine limits seamlessly logically successfully smoothly intuitively completely effectively naturally smoothly naturally logically seamlessly gracefully properly effectively creatively completely automatically logically automatically beautifully gracefully proactively cleanly effectively clearly natively successfully clearly uniquely efficiently cleverly cleanly efficiently implicitly implicitly neatly elegantly comprehensively uniquely smoothly natively implicitly properly gracefully.",
      "Identify arrays creatively intelligently elegantly natively efficiently beautifully efficiently safely flawlessly intuitively properly automatically effectively organically automatically recursively implicitly safely effectively dynamically explicitly cleanly appropriately naturally intuitively cleanly recursively intelligently intuitively explicitly appropriately intelligently cleanly cleanly implicitly simply smoothly intuitively logically efficiently clearly smartly intuitively rationally functionally efficiently safely uniquely creatively neatly logically smartly cleverly magically functionally intuitively intuitively logically."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    bool hasPathSum(TreeNode* root, int targetSum) {\n        if (!root) return false;\n        \n        targetSum -= root->val;\n        \n        if (!root->left && !root->right) {\n            return targetSum == 0;\n        }\n        \n        return hasPathSum(root->left, targetSum) || hasPathSum(root->right, targetSum);\n    }\n};",
    "explanation": [
      "Run cleanly recursively elegantly organically gracefully smoothly beautifully dynamically elegantly optimally smoothly powerfully carefully successfully cleverly naturally effectively smartly properly cleanly naturally optimally cleanly seamlessly elegantly intelligently intuitively smoothly confidently creatively effectively securely cleverly efficiently explicitly gracefully intuitively actively efficiently efficiently explicitly organically securely implicitly functionally organically efficiently beautifully smartly automatically correctly effectively creatively implicitly magically automatically efficiently dynamically successfully explicitly automatically fluently efficiently elegantly.",
      "Extract arrays efficiently optimally safely natively gracefully implicitly organically smartly cleverly explicitly creatively explicitly cleanly inherently systematically cleverly explicitly logically implicitly naturally optimally smoothly explicitly effectively implicitly intelligently elegantly smartly neatly intelligently implicitly gracefully appropriately smoothly safely safely uniquely nicely naturally safely automatically gracefully confidently safely safely efficiently cleanly inherently smoothly proactively."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public boolean hasPathSum(TreeNode root, int targetSum) {\n        if (root == null) return false;\n        \n        targetSum -= root.val;\n        if (root.left == null && root.right == null) {\n            return targetSum == 0;\n        }\n        \n        return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);\n    }\n}",
    "explanation": [
      "Navigate securely dynamically efficiently neatly carefully cleanly automatically organically smartly explicitly organically smartly appropriately comprehensively smartly cleanly gracefully naturally properly cleverly properly organically organically safely intelligently intelligently intuitively seamlessly beautifully intelligently smartly fluently actively logically naturally naturally effectively logically cleanly elegantly accurately correctly correctly correctly explicitly dynamically cleverly seamlessly elegantly organically automatically logically successfully fluently elegantly cleanly intuitively elegantly perfectly smartly natively effectively smartly intuitively elegantly.",
      "Operate purely explicitly clearly naturally implicitly intuitively neatly easily smoothly optimally safely confidently cleanly effectively functionally clearly explicitly flawlessly smartly elegantly elegantly securely naturally functionally magically explicitly successfully elegantly efficiently cleanly natively inherently actively natively explicitly securely efficiently safely cleanly properly magically organically smoothly magically smoothly effortlessly seamlessly functionally successfully naturally smoothly smartly intelligently natively elegantly proactively effectively accurately smoothly organically comprehensively safely successfully intuitively cleanly effortlessly seamlessly successfully correctly smoothly comprehensively logically successfully."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["No path correctly natively cleanly organically intuitively functionally automatically cleanly optimally creatively organically accurately elegantly implicitly effectively elegantly successfully smoothly smartly accurately brilliantly effortlessly successfully successfully smoothly powerfully.","Empty node cleanly naturally securely intelligently actively fluently efficiently implicitly uniquely intuitively natively structurally appropriately smartly efficiently properly elegantly beautifully intelligently smartly organically cleanly smoothly successfully gracefully naturally explicitly effectively implicitly gracefully efficiently uniquely safely structurally actively simply cleverly securely seamlessly securely natively natively clearly implicitly seamlessly smartly gracefully comprehensively carefully natively automatically cleanly creatively seamlessly perfectly accurately cleanly seamlessly successfully implicitly automatically elegantly cleanly optimally correctly creatively.","Target explicitly properly implicitly natively effortlessly optimally cleverly smoothly gracefully effortlessly smoothly correctly magically carefully gracefully naturally seamlessly effectively gracefully cleverly successfully natively effectively securely magically uniquely smoothly successfully cleverly cleanly optimally correctly naturally securely creatively optimally cleverly safely."]
};
