import fs from 'fs';
import path from 'path';

const graphData = {
  "number-of-islands": {
    title: "Number of Islands", difficulty: "Medium", topic: "Graphs", tags: ["array", "depth-first-search", "breadth-first-search", "union-find", "matrix"],
    prompt: "Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
    examples: [{input: "grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]", output: "1"}],
    timeComplexity: "O(M * N)", spaceComplexity: "O(M * N)", edgeCases: ["No islands", "Grid full of islands"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0
            
        rows, cols = len(grid), len(grid[0])
        visit = set()
        islands = 0
        
        def bfs(r, c):
            q = collections.deque()
            visit.add((r, c))
            q.append((r, c))
            
            while q:
                row, col = q.popleft()
                directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
                
                for dr, dc in directions:
                    nr, nc = row + dr, col + dc
                    if (nr in range(rows) and 
                        nc in range(cols) and 
                        grid[nr][nc] == "1" and 
                        (nr, nc) not in visit):
                        q.append((nr, nc))
                        visit.add((nr, nc))
                        
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1" and (r, c) not in visit:
                    bfs(r, c)
                    islands += 1
        return islands`,
        explanation: ["Traverse every cell in the grid.", "If a land cell ('1') is found and it hasn't been visited, it marks the start of a new island.", "Use BFS (or DFS) to visit all connected land cells of that island and mark them as visited.", "The number of times BFS is triggered equals the number of islands."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int res = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    res++;
                    dfs(grid, i, j);
                }
            }
        }
        return res;
    }
    
private:
    void dfs(vector<vector<char>>& grid, int r, int c) {
        if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] == '0') return;
        grid[r][c] = '0'; // mark as visited in-place
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
};`,
        explanation: ["Scanning the grid linearly, initiate a DFS whenever '1' is encountered.", "The DFS sinks the entire island by changing '1's to '0's (in-place marking to save memory).", "This prevents the same island from being counted twice.", "Standard graph traversal algorithm with linear time complexity relative to the number of cells."]
      },
      {
        language: "java",
        code: `class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    dfs(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }

    private void dfs(char[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == '0') return;
        grid[i][j] = '0';
        dfs(grid, i + 1, j);
        dfs(grid, i - 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i, j - 1);
    }
}`,
        explanation: ["Execute a grid-wide scan for land cells.", "Once detected, use recursion to perform a flood fill, identifying all adjacent land components.", "The visited state is tracked by overwriting land cells with water cells.", "Each flood fill completion increment the total island tally."]
      }
    ]
  },
  "clone-graph": {
    title: "Clone Graph", difficulty: "Medium", topic: "Graphs", tags: ["hash-table", "depth-first-search", "breadth-first-search", "graph"],
    prompt: "Given a reference of a node in a connected undirected graph.\n\nReturn a deep copy (clone) of the graph.\n\nEach node in the graph contains a value (int) and a list (List[Node]) of its neighbors.",
    constraints: ["The number of nodes in the graph is between 0 and 100.", "1 <= Node.val <= 100", "Node.val is unique for each node.", "There are no repeated edges and no self-loops in the graph.", "The Graph is connected and all nodes can be visited starting from the given node."],
    examples: [{input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]"}],
    timeComplexity: "O(V + E)", spaceComplexity: "O(V)", edgeCases: ["Empty graph"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        oldToNew = {}
        
        def dfs(node):
            if node in oldToNew:
                return oldToNew[node]
            
            copy = Node(node.val)
            oldToNew[node] = copy
            for neighbor in node.neighbors:
                copy.neighbors.append(dfs(neighbor))
            return copy
            
        return dfs(node) if node else None`,
        explanation: ["Use a hash map to map original nodes to their freshly created clones.", "Implement DFS to traverse the graph. If a node has already been cloned, return its copy from the map.", "Otherwise, create the clone, store it in the map, and recursively clone all its neighbors.", "This handles cycles naturally as the map acts as a 'visited' set."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        if (clones.find(node) == clones.end()) {
            clones[node] = new Node(node->val);
            for (Node* neighbor : node->neighbors) {
                clones[node]->neighbors.push_back(cloneGraph(neighbor));
            }
        }
        return clones[node];
    }
private:
    unordered_map<Node*, Node*> clones;
};`,
        explanation: ["Deep copy a graph by maintaining a mapping from original pointers to new cloned pointers.", "Recursive DFS traversal ensures every node and edge is visited and mirrored exactly once.", "Base case handles null inputs and previously visited nodes to avoid infinite recursion in cyclic graphs.", "Total complexity proportional to graph size."]
      },
      {
        language: "java",
        code: `class Solution {
    private HashMap<Node, Node> map = new HashMap<>();
    
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        if (map.containsKey(node)) return map.get(node);
        
        Node clone = new Node(node.val);
        map.put(node, clone);
        for (Node neighbor : node.neighbors) {
            clone.neighbors.add(cloneGraph(neighbor));
        }
        return clone;
    }
}`,
        explanation: ["Leverage a HashMap to track clone instances to prevent redundant object creation.", "The recursion explores the neighbor list of each node, establishing deep connectivity in the new graph.", "Initial null-check and duplicate-lookup ensure robustness against empty graphs or circular dependencies.", "Effective O(V+E) traversal ensures all nodes are correctly instantiated and linked."]
      }
    ]
  },
  "max-area-of-island": {
    title: "Max Area of Island", difficulty: "Medium", topic: "Graphs", tags: ["array", "depth-first-search", "breadth-first-search", "union-find", "matrix"],
    prompt: "You are given an `m x n` binary matrix `grid`. An island is a group of '1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.\n\nThe area of an island is the number of cells with a value 1 in the island. Return the maximum area of an island in the grid. If there is no island, return 0.",
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 50", "grid[i][j] is '0' or '1'."],
    examples: [{input: "grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],...]", output: "6"}],
    timeComplexity: "O(M * N)", spaceComplexity: "O(M * N)", edgeCases: ["No islands", "Single large island"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        visit = set()
        
        def dfs(r, c):
            if (r < 0 or r == ROWS or c < 0 or c == COLS or
                grid[r][c] == 0 or (r, c) in visit):
                return 0
            visit.add((r, c))
            return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)
        
        area = 0
        for r in range(ROWS):
            for c in range(COLS):
                area = max(area, dfs(r, c))
        return area`,
        explanation: ["Traverse every cell and start a DFS when an unvisited land cell is reached.", "The DFS returns the total count of cells connected for that specific island (area).", "Recursive accumulation: `1 + sum(dfs(neighbors))`.", "Update the global maximum area during the traversal."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int maxArea = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    maxArea = max(maxArea, getArea(grid, i, j));
                }
            }
        }
        return maxArea;
    }
    
private:
    int getArea(vector<vector<int>>& grid, int r, int c) {
        if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] == 0) return 0;
        grid[r][c] = 0; // mark as visited
        return 1 + getArea(grid, r + 1, c) + getArea(grid, r - 1, c) + getArea(grid, r, c + 1) + getArea(grid, r, c - 1);
    }
};`,
        explanation: ["Apply flood fill logic starting at each '1' in the grid.", "Instead of an explicit visited set, modify the grid in-place by turning '1's into '0's.", "Accumulate size by summing the return values of four-way recursive calls.", "The O(M*N) complexity ensures we visit each cell exactly twice: once for the scan and once for the DFS sink."]
      },
      {
        language: "java",
        code: `class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int max = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) {
                    max = Math.max(max, dfs(grid, i, j));
                }
            }
        }
        return max;
    }

    private int dfs(int[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == 0) return 0;
        grid[i][j] = 0;
        return 1 + dfs(grid, i + 1, j) + dfs(grid, i - 1, j) + dfs(grid, i, j + 1) + dfs(grid, i, j - 1);
    }
}`,
        explanation: ["Count island components by recursively sinking them after counting each cell.", "The base cases handle board boundaries and water/visited cells.", "Using a simple DFS maximizes the area discovery for every isolated component.", "O(MN) complexity makes it highly efficient for grid sizes within constraints."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'graphs');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

Object.keys(graphData).forEach(id => {
  const data = graphData[id];
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

console.log("Written graph problems part 1.");
