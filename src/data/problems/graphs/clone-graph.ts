import { Problem } from '../../../types/problem';

export const cloneGraph: Problem = {
  id: "clone-graph",
  title: "Clone Graph",
  difficulty: "Medium",
  topic: "Graphs",
  tags: ["hash-table","depth-first-search","breadth-first-search","graph"],
  prompt: "Given a reference of a node in a connected undirected graph.\n\nReturn a deep copy (clone) of the graph.\n\nEach node in the graph contains a value (int) and a list (List[Node]) of its neighbors.",
  constraints: ["The number of nodes in the graph is between 0 and 100.","1 <= Node.val <= 100","Node.val is unique for each node.","There are no repeated edges and no self-loops in the graph.","The Graph is connected and all nodes can be visited starting from the given node."],
  examples: [
  {
    "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
    "output": "[[2,4],[1,3],[2,4],[1,3]]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def cloneGraph(self, node: 'Node') -> 'Node':\n        oldToNew = {}\n        \n        def dfs(node):\n            if node in oldToNew:\n                return oldToNew[node]\n            \n            copy = Node(node.val)\n            oldToNew[node] = copy\n            for neighbor in node.neighbors:\n                copy.neighbors.append(dfs(neighbor))\n            return copy\n            \n        return dfs(node) if node else None",
    "explanation": [
      "Use a hash map to map original nodes to their freshly created clones.",
      "Implement DFS to traverse the graph. If a node has already been cloned, return its copy from the map.",
      "Otherwise, create the clone, store it in the map, and recursively clone all its neighbors.",
      "This handles cycles naturally as the map acts as a 'visited' set."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        if (!node) return nullptr;\n        if (clones.find(node) == clones.end()) {\n            clones[node] = new Node(node->val);\n            for (Node* neighbor : node->neighbors) {\n                clones[node]->neighbors.push_back(cloneGraph(neighbor));\n            }\n        }\n        return clones[node];\n    }\nprivate:\n    unordered_map<Node*, Node*> clones;\n};",
    "explanation": [
      "Deep copy a graph by maintaining a mapping from original pointers to new cloned pointers.",
      "Recursive DFS traversal ensures every node and edge is visited and mirrored exactly once.",
      "Base case handles null inputs and previously visited nodes to avoid infinite recursion in cyclic graphs.",
      "Total complexity proportional to graph size."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    private HashMap<Node, Node> map = new HashMap<>();\n    \n    public Node cloneGraph(Node node) {\n        if (node == null) return null;\n        if (map.containsKey(node)) return map.get(node);\n        \n        Node clone = new Node(node.val);\n        map.put(node, clone);\n        for (Node neighbor : node.neighbors) {\n            clone.neighbors.add(cloneGraph(neighbor));\n        }\n        return clone;\n    }\n}",
    "explanation": [
      "Leverage a HashMap to track clone instances to prevent redundant object creation.",
      "The recursion explores the neighbor list of each node, establishing deep connectivity in the new graph.",
      "Initial null-check and duplicate-lookup ensure robustness against empty graphs or circular dependencies.",
      "Effective O(V+E) traversal ensures all nodes are correctly instantiated and linked."
    ]
  }
],
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V)",
  edgeCases: ["Empty graph"]
};
