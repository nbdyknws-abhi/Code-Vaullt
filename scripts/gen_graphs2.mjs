import fs from 'fs';
import path from 'path';

const graphData = {
  "pacific-atlantic-water-flow": {
    title: "Pacific Atlantic Water Flow", difficulty: "Medium", topic: "Graphs", tags: ["array", "depth-first-search", "breadth-first-search", "matrix"],
    prompt: "There is an `m x n` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.\n\nThe island is partitioned into a grid of square cells. You are given an `m x n` integer matrix `heights` where `heights[r][c]` represents the height above sea level of the cell at coordinate `(r, c)`.\n\nRain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.\n\nReturn a 2D list of grid coordinates `result` where `result[i] = [ri, ci]` denotes that rain water can flow from cell `(ri, ci)` to both the Pacific and Atlantic oceans.",
    constraints: ["m == heights.length", "n == heights[r].length", "1 <= m, n <= 200", "0 <= heights[r][c] <= 10^5"],
    examples: [{input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]"}],
    timeComplexity: "O(M * N)", spaceComplexity: "O(M * N)", edgeCases: ["Single cell grid", "Grid with all same heights"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(heights), len(heights[0])
        pac, atl = set(), set()
        
        def dfs(r, c, visit, prevHeight):
            if ((r, c) in visit or
                r < 0 or c < 0 or r == ROWS or c == COLS or
                heights[r][c] < prevHeight):
                return
            visit.add((r, c))
            dfs(r + 1, c, visit, heights[r][c])
            dfs(r - 1, c, visit, heights[r][c])
            dfs(r, c + 1, visit, heights[r][c])
            dfs(r, c - 1, visit, heights[r][c])
            
        for c in range(COLS):
            dfs(0, c, pac, heights[0][c])
            dfs(ROWS - 1, c, atl, heights[ROWS - 1][c])
            
        for r in range(ROWS):
            dfs(r, 0, pac, heights[r][0])
            dfs(r, COLS - 1, atl, heights[r][COLS - 1])
            
        res = []
        for r in range(ROWS):
            for c in range(COLS):
                if (r, c) in pac and (r, c) in atl:
                    res.append([r, c])
        return res`,
        explanation: ["Reverse the problem: find all cells from which water can flow 'up' to the oceans.", "Perform DFS starting from all edge cells (top/left for Pacific, bottom/right for Atlantic).", "Maintain two sets, `pac` and `atl`, to store coordinates reachable from each ocean.", "The intersection of the two sets contains the cells that can flow to both oceans."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<bool>> pac(m, vector<bool>(n, false));
        vector<vector<bool>> atl(m, vector<bool>(n, false));
        
        for (int i = 0; i < m; i++) {
            dfs(heights, pac, i, 0, heights[i][0]);
            dfs(heights, atl, i, n - 1, heights[i][n - 1]);
        }
        for (int j = 0; j < n; j++) {
            dfs(heights, pac, 0, j, heights[0][j]);
            dfs(heights, atl, m - 1, j, heights[m - 1][j]);
        }
        
        vector<vector<int>> res;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (pac[i][j] && atl[i][j]) res.push_back({i, j});
            }
        }
        return res;
    }
    
private:
    void dfs(vector<vector<int>>& h, vector<vector<bool>>& ocean, int r, int c, int prev) {
        if (r < 0 || r >= h.size() || c < 0 || c >= h[0].size() || ocean[r][c] || h[r][c] < prev) return;
        ocean[r][c] = true;
        dfs(h, ocean, r + 1, c, h[r][c]);
        dfs(h, ocean, r - 1, c, h[r][c]);
        dfs(h, ocean, r, c + 1, h[r][c]);
        dfs(h, ocean, r, c - 1, h[r][c]);
    }
};`,
        explanation: ["Initialize two boolean matrices to track reachability from Pacific and Atlantic oceans.", "Start DFS from all cells adjacent to either ocean, moving 'uphill' to reachable cells.", "A valid flow path exists if a cell is marked true in both matrices.", "Standard O(M*N) path discovery using recursion."]
      },
      {
        language: "java",
        code: `class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        int rows = heights.length, cols = heights[0].length;
        boolean[][] pac = new boolean[rows][cols];
        boolean[][] atl = new boolean[rows][cols];
        
        for (int i = 0; i < rows; i++) {
            dfs(heights, pac, i, 0);
            dfs(heights, atl, i, cols - 1);
        }
        for (int j = 0; j < cols; j++) {
            dfs(heights, pac, 0, j);
            dfs(heights, atl, rows - 1, j);
        }
        
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (pac[i][j] && atl[i][j]) {
                    res.add(Arrays.asList(i, j));
                }
            }
        }
        return res;
    }

    private void dfs(int[][] h, boolean[][] ocean, int r, int c) {
        ocean[r][c] = true;
        int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < h.length && nc >= 0 && nc < h[0].length && 
                !ocean[nr][nc] && h[nr][nc] >= h[r][c]) {
                dfs(h, ocean, nr, nc);
            }
        }
    }
}`,
        explanation: ["Compute oceanic reachability using a 'reverse flood fill' uphill from the coasts.", "Two separate boolean arrays capture cells that can connect to the Pacific and Atlantic respectively.", "Final list is constructed by finding all shared reachable cells.", "The uphill flow condition `h[nr][nc] >= h[r][c]` is equivalent to downhill flow in the problem description."]
      }
    ]
  },
  "surrounded-regions": {
    title: "Surrounded Regions", difficulty: "Medium", topic: "Graphs", tags: ["array", "depth-first-search", "breadth-first-search", "union-find", "matrix"],
    prompt: "Given an `m x n` matrix `board` containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.\n\nA region is captured by flipping all 'O's into 'X's in that surrounded region.",
    constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 200", "board[i][j] is 'X' or 'O'."],
    examples: [{input: "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]", output: "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]"}],
    timeComplexity: "O(M * N)", spaceComplexity: "O(M * N)", edgeCases: ["Board with no 'O's", "Board with only 'O's"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def solve(self, board: List[List[str]]) -> None:
        ROWS, COLS = len(board), len(board[0])
        
        def capture(r, c):
            if (r < 0 or c < 0 or r == ROWS or c == COLS or
                board[r][c] != "O"):
                return
            board[r][c] = "T"
            capture(r + 1, c)
            capture(r - 1, c)
            capture(r, c + 1)
            capture(r, c - 1)
            
        # 1. Capture unsurrounded regions (O -> T)
        for r in range(ROWS):
            for c in range(COLS):
                if (board[r][c] == "O" and 
                    (r in [0, ROWS - 1] or c in [0, COLS - 1])):
                    capture(r, c)
                    
        # 2. Capture surrounded regions (O -> X)
        for r in range(ROWS):
            for c in range(COLS):
                if board[r][c] == "O":
                    board[r][c] = "X"
                    
        # 3. Uncapture unsurrounded regions (T -> O)
        for r in range(ROWS):
            for c in range(COLS):
                if board[r][c] == "T":
                    board[r][c] = "O"`,
        explanation: ["The key observation is that an 'O' region is UNSURROUNDED if and only if at least one of its 'O's is on the border.", "Start DFS from every 'O' on the border to mark all connected 'O's as temporary ('T').", "After the edge cases are marked, all remaining 'O's in the board must be entirely surrounded by 'X's; flip them to 'X'.", "Finally, flip all 'T's back to 'O's."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    void solve(vector<vector<char>>& board) {
        int m = board.size(), n = board[0].size();
        for (int i = 0; i < m; i++) {
            dfs(board, i, 0);
            dfs(board, i, n - 1);
        }
        for (int j = 0; j < n; j++) {
            dfs(board, 0, j);
            dfs(board, m - 1, j);
        }
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') board[i][j] = 'X';
                else if (board[i][j] == '#') board[i][j] = 'O';
            }
        }
    }
    
private:
    void dfs(vector<vector<char>>& b, int r, int c) {
        if (r < 0 || r >= b.size() || c < 0 || c >= b[0].size() || b[r][c] != 'O') return;
        b[r][c] = '#';
        dfs(b, r + 1, c);
        dfs(b, r - 1, c);
        dfs(b, r, c + 1);
        dfs(b, r, c - 1);
    }
};`,
        explanation: ["Isolate border 'O's and all their connected neighbors by temporarily renaming them to '#'.", "Any remaining 'O' in the board's interior is effectively surrounded and can be safely flipped to 'X'.", "The renamed '#' characters are then restored to their original 'O' state.", "Linear time complexity O(M*N) as each cell is processed the same number of times."]
      },
      {
        language: "java",
        code: `class Solution {
    public void solve(char[][] board) {
        int m = board.length, n = board[0].length;
        for (int i = 0; i < m; i++) {
            dfs(board, i, 0);
            dfs(board, i, n - 1);
        }
        for (int j = 0; j < n; j++) {
            dfs(board, 0, j);
            dfs(board, m - 1, j);
        }
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') board[i][j] = 'X';
                else if (board[i][j] == 'T') board[i][j] = 'O';
            }
        }
    }

    private void dfs(char[][] b, int i, int j) {
        if (i < 0 || i >= b.length || j < 0 || j >= b[0].length || b[i][j] != 'O') return;
        b[i][j] = 'T';
        dfs(b, i + 1, j);
        dfs(b, i - 1, j);
        dfs(b, i, j + 1);
        dfs(b, i, j - 1);
    }
}`,
        explanation: ["Utilize a three-step process: identify border-connected regions, flip surrounded regions, and cleanup markers.", "The 'T' marker distinguishes 'O's that should remain from those that should be captured.", "DFS ensures all connected 'unsurrounded' components are correctly identified and skipped from capturing.", "In-place modification minimizes additional space usage beyond the recursive stack."]
      }
    ]
  },
  "rotting-oranges": {
    title: "Rotting Oranges", difficulty: "Medium", topic: "Graphs", tags: ["array", "breadth-first-search", "matrix"],
    prompt: "You are given an `m x n` grid where each cell can have one of three values:\n0 representing an empty cell,\n1 representing a fresh orange, or\n2 representing a rotten orange.\nEvery minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.\n\nReturn the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 10", "grid[i][j] is 0, 1, or 2."],
    examples: [{input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4"}],
    timeComplexity: "O(M * N)", spaceComplexity: "O(M * N)", edgeCases: ["No fresh oranges", "Island of fresh oranges"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        q = collections.deque()
        time, fresh = 0, 0
        
        ROWS, COLS = len(grid), len(grid[0])
        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 1:
                    fresh += 1
                if grid[r][c] == 2:
                    q.append([r, c])
                    
        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        while q and fresh > 0:
            for i in range(len(q)):
                r, c = q.popleft()
                for dr, dc in directions:
                    row, col = dr + r, dc + c
                    if (row in range(ROWS) and col in range(COLS) and
                        grid[row][col] == 1):
                        grid[row][col] = 2
                        q.append([row, col])
                        fresh -= 1
            time += 1
            
        return time if fresh == 0 else -1`,
        explanation: ["Use Multi-source BFS to simulate the spreading decay process.", "Initialize a queue with all starting rotten oranges and count all fresh ones.", "At each minute, process all oranges currently in the queue, infecting their fresh neighbors and adding them to the queue for the next minute.", "Return the elapsed time if all fresh oranges were infected, or -1 if some remained unreachable."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int, int>> q;
        int fresh = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) q.push({i, j});
                else if (grid[i][j] == 1) fresh++;
            }
        }
        
        if (fresh == 0) return 0;
        int minutes = -1;
        vector<pair<int, int>> dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
        
        while (!q.empty()) {
            minutes++;
            int size = q.size();
            for (int i = 0; i < size; i++) {
                auto [r, c] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int nr = r + d.first, nc = c + d.second;
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        q.push({nr, nc});
                        fresh--;
                    }
                }
            }
        }
        return fresh == 0 ? minutes : -1;
    }
};`,
        explanation: ["Implement multi-source Breadth-First Search to track simultaneous rot spreading.", "The queue ensures we process oranges level by level (minute by minute).", "Fresh oranges act as unreachable nodes until adjacent to a rotten source.", "If the queue empties but fresh count is still positive, it's impossible to rot everything."]
      },
      {
        language: "java",
        code: `class Solution {
    public int orangesRotting(int[][] grid) {
        Queue<int[]> queue = new LinkedList<>();
        int fresh = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 2) queue.add(new int[]{i, j});
                else if (grid[i][j] == 1) fresh++;
            }
        }
        if (fresh == 0) return 0;
        int count = 0;
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                int[] point = queue.poll();
                for (int[] d : dirs) {
                    int r = point[0] + d[0], c = point[1] + d[1];
                    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != 1) continue;
                    grid[r][c] = 2;
                    queue.add(new int[]{r, c});
                    fresh--;
                }
            }
            if (!queue.isEmpty()) count++;
        }
        return fresh == 0 ? count : -1;
    }
}`,
        explanation: ["Model the infection as a level-order traversal problem in a graph.", "Each level represents one minute of time passing.", "BFS is used because it naturally explores neighbors in a 'wave' pattern, perfect for uniform distance spread.", "The fresh orange counter allows for a final validation of reachability."]
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

console.log("Written graph problems part 2.");
