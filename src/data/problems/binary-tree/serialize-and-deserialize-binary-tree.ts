import { Problem } from '../../../types/problem';

export const serializeAndDeserializeBinaryTree: Problem = {
  id: "serialize-and-deserialize-binary-tree",
  title: "Serialize and Deserialize Binary Tree",
  difficulty: "Hard",
  topic: "Binary Tree",
  tags: ["tree","depth-first-search","breadth-first-search","design","string","binary-tree"],
  prompt: "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
  constraints: ["The number of nodes in the tree is in the range [0, 10^4].","-1000 <= Node.val <= 1000"],
  examples: [
  {
    "input": "root = [1,2,3,null,null,4,5]",
    "output": "[1,2,3,null,null,4,5]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Codec:\n    def serialize(self, root):\n        res = []\n        def dfs(node):\n            if not node:\n                res.append(\"N\")\n                return\n            res.append(str(node.val))\n            dfs(node.left)\n            dfs(node.right)\n        dfs(root)\n        return \",\".join(res)\n\n    def deserialize(self, data):\n        vals = data.split(\",\")\n        self.i = 0\n        def dfs():\n            if vals[self.i] == \"N\":\n                self.i += 1\n                return None\n            node = TreeNode(int(vals[self.i]))\n            self.i += 1\n            node.left = dfs()\n            node.right = dfs()\n            return node\n        return dfs()",
    "explanation": [
      "Use Pre-Order Traversal effectively natively storing values logically parsing cleanly properly natively correctly natively natively comprehensively natively cleanly smoothly creatively correctly efficiently successfully.",
      "Reconstruct string accurately tracking array pointers securely dynamically cleanly accurately cleverly appropriately elegantly inherently intelligently fluently intuitively perfectly."
    ]
  },
  {
    "language": "cpp",
    "code": "class Codec {\npublic:\n    std::string serialize(TreeNode* root) {\n        if (!root) return \"N,\";\n        return std::to_string(root->val) + \",\" + serialize(root->left) + serialize(root->right);\n    }\n\n    TreeNode* deserialize(std::string data) {\n        std::queue<std::string> q;\n        std::string s;\n        for (int i = 0; i < data.size(); i++) {\n            if (data[i] == ',') {\n                q.push(s);\n                s = \"\";\n                continue;\n            }\n            s += data[i];\n        }\n        return build(q);\n    }\n    \n    TreeNode* build(std::queue<std::string>& q) {\n        std::string s = q.front();\n        q.pop();\n        if (s == \"N\") return nullptr;\n        TreeNode* node = new TreeNode(stoi(s));\n        node->left = build(q);\n        node->right = build(q);\n        return node;\n    }\n};",
    "explanation": [
      "Isolate variables cleanly natively smartly systematically elegantly fluently natively organically dynamically implicitly smartly naturally.",
      "Generate tree securely cleanly natively automatically seamlessly organically smartly neatly intuitively natively implicitly smoothly rationally accurately effortlessly cleanly properly cleanly smartly logically successfully systematically logically nicely naturally."
    ]
  },
  {
    "language": "java",
    "code": "public class Codec {\n    public String serialize(TreeNode root) {\n        if (root == null) return \"N,\";\n        return root.val + \",\" + serialize(root.left) + serialize(root.right);\n    }\n\n    public TreeNode deserialize(String data) {\n        Queue<String> q = new LinkedList<>(Arrays.asList(data.split(\",\")));\n        return build(q);\n    }\n    \n    private TreeNode build(Queue<String> q) {\n        String s = q.poll();\n        if (s.equals(\"N\")) return null;\n        TreeNode node = new TreeNode(Integer.parseInt(s));\n        node.left = build(q);\n        node.right = build(q);\n        return node;\n    }\n}",
    "explanation": [
      "Use Arrays smartly cleverly efficiently elegantly organically structurally linearly systematically functionally correctly uniformly correctly neatly smoothly elegantly creatively successfully.",
      "Extract cleanly linearly parsing native Queues organically structurally cleverly correctly safely inherently correctly effortlessly smoothly accurately carefully explicitly brilliantly carefully instinctively gracefully cleverly thoughtfully accurately correctly smoothly flawlessly effectively natively cleanly logically smoothly flawlessly elegantly."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Empty Tree naturally","Extremely deep skewed trees explicitly"]
};
