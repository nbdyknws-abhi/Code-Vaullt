import fs from 'fs';
import path from 'path';

const graphData = {
  "course-schedule": {
    title: "Course Schedule", difficulty: "Medium", topic: "Graphs", tags: ["depth-first-search", "breadth-first-search", "graph", "topological-sort"],
    prompt: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.",
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000", "prerequisites[i].length == 2", "0 <= ai, bi < numCourses", "All the pairs prerequisites[i] are unique."],
    examples: [{input: "numCourses = 2, prerequisites = [[1,0]]", output: "true"}, {input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false"}],
    timeComplexity: "O(V + E)", spaceComplexity: "O(V + E)", edgeCases: ["No prerequisites", "Cyclic dependency"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        preMap = {i: [] for i in range(numCourses)}
        for crs, pre in prerequisites:
            preMap[crs].append(pre)
            
        visiting = set()
        
        def dfs(crs):
            if crs in visiting:
                return False
            if preMap[crs] == []:
                return True
                
            visiting.add(crs)
            for pre in preMap[crs]:
                if not dfs(pre): return False
            visiting.remove(crs)
            preMap[crs] = []
            return True
            
        for crs in range(numCourses):
            if not dfs(crs): return False
        return True`,
        explanation: ["Build an adjacency list (`preMap`) where each course points to its prerequisites.", "Use DFS to check for cycles in the dependency graph.", "A course is problematic if we encounter it while it's already in the `visiting` set (detecting a back-edge in DFS).", "Optimization: once a node is confirmed as part of a path that can be finished, empty its prerequisites in the map to skip re-processing."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indegree(numCourses, 0);
        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.push(i);
        }
        
        int count = 0;
        while (!q.empty()) {
            int curr = q.front(); q.pop();
            count++;
            for (int next : adj[curr]) {
                if (--indegree[next] == 0) q.push(next);
            }
        }
        return count == numCourses;
    }
};`,
        explanation: ["Use Kahn's Algorithm (BFS-based Topological Sort) to find a valid ordering.", "Technically, if a Directed Acyclic Graph (DAG) exists, the sort should process all nodes.", "Courses with 0 in-degree (no prerequisites) are processed first.", "Decreasing the in-degree of neighbors as you process a node; if a neighbor's in-degree hits 0, add it to the queue."]
      },
      {
        language: "java",
        code: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        ArrayList<Integer>[] adj = new ArrayList[numCourses];
        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();
        int[] inDegree = new int[numCourses];
        for (int[] p : prerequisites) {
            adj[p[1]].add(p[0]);
            inDegree[p[0]]++;
        }
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) queue.add(i);
        }
        int count = 0;
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            count++;
            for (int next : adj[curr]) {
                if (--inDegree[next] == 0) queue.add(next);
            }
        }
        return count == numCourses;
    }
}`,
        explanation: ["Apply Kahn's algorithm for topological sorting.", "The process mimics completing courses without pending prerequisites.", "If a cycle exists, some nodes will never have their in-degree reach zero.", "Comparison between the count of processed nodes and `numCourses` determines if a full schedule is possible."]
      }
    ]
  },
  "course-schedule-ii": {
    title: "Course Schedule II", difficulty: "Medium", topic: "Graphs", tags: ["depth-first-search", "breadth-first-search", "graph", "topological-sort"],
    prompt: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nReturn the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.",
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= numCourses * (numCourses - 1)", "prerequisites[i].length == 2", "0 <= ai, bi < numCourses", "ai != bi", "All the pairs [ai, bi] are distinct."],
    examples: [{input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]", output: "[0,2,1,3]"}],
    timeComplexity: "O(V + E)", spaceComplexity: "O(V + E)", edgeCases: ["Disconnected components", "Self-loops check"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        adj = {i: [] for i in range(numCourses)}
        for crs, pre in prerequisites:
            adj[crs].append(pre)
            
        output = []
        visit, cycle = set(), set()
        
        def dfs(crs):
            if crs in cycle: return False
            if crs in visit: return True
            
            cycle.add(crs)
            for pre in adj[crs]:
                if not dfs(pre): return False
            cycle.remove(crs)
            visit.add(crs)
            output.append(crs)
            return True
            
        for c in range(numCourses):
            if not dfs(c): return []
        return output`,
        explanation: ["Implement topological sort using DFS.", "Maintain two sets: `visit` for nodes fully processed and `cycle` for nodes currently in the recursion stack.", "Append the course to the `output` list after all its prerequisites have been visited.", "If a cycle is detected, return an empty list immediately."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indegree(numCourses, 0);
        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.push(i);
        }
        
        vector<int> order;
        while (!q.empty()) {
            int curr = q.front(); q.pop();
            order.push_back(curr);
            for (int neighbor : adj[curr]) {
                if (--indegree[neighbor] == 0) q.push(neighbor);
            }
        }
        return (order.size() == numCourses) ? order : vector<int>();
    }
};`,
        explanation: ["Utilize Kahn's algorithm for BFS-based topological sorting.", "Populate an integer queue with nodes having zero dependencies.", "As nodes are removed, add them to the result vector and update their neighbors.", "Check the final order size against the course count to validate the existence of a valid schedule."]
      },
      {
        language: "java",
        code: `class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        ArrayList<Integer>[] adj = new ArrayList[numCourses];
        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();
        int[] inDegree = new int[numCourses];
        for (int[] p : prerequisites) {
            adj[p[1]].add(p[0]);
            inDegree[p[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.add(i);
        }
        int[] res = new int[numCourses];
        int i = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            res[i++] = curr;
            for (int next : adj[curr]) {
                if (--inDegree[next] == 0) q.add(next);
            }
        }
        return i == numCourses ? res : new int[0];
    }
}`,
        explanation: ["Determine the linear sequence of courses using a queue-based topological search strategy.", "Nodes are selected for the schedule once their dependency count reaches zero.", "Effective result accumulation in a fixed-size integer array.", "The final verification returns the array only if all courses were successfully ordered into a DAG."]
      }
    ]
  },
  "redundant-connection": {
    title: "Redundant Connection", difficulty: "Medium", topic: "Graphs", tags: ["tree", "union-find", "graph"],
    prompt: "In this problem, a tree is an undirected graph that is connected and has no cycles.\n\nYou are given a graph that started as a tree with `n` nodes faced with one additional edge added. The added edge has two different vertices chosen from `1` to `n`, and was not an edge that already existed. The graph is represented as an array `edges` of length `n` where `edges[i] = [ai, bi]` i indicates that there is an edge between nodes `ai` and `bi` in the graph.\n\nReturn an edge that can be removed so that the resulting graph is a tree of `n` nodes. If there are multiple answers, return the answer that occurs last in the input.",
    constraints: ["n == edges.length", "3 <= n <= 1000", "edges[i].length == 2", "1 <= ai < bi <= edges.length", "ai != bi", "There are no repeated edges.", "The given graph is connected."],
    examples: [{input: "edges = [[1,2],[1,3],[2,3]]", output: "[2,3]"}],
    timeComplexity: "O(N * alpha(N))", spaceComplexity: "O(N)", edgeCases: ["Smallest cycle size 3"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        parent = [i for i in range(len(edges) + 1)]
        rank = [1] * (len(edges) + 1)
        
        def find(n):
            p = parent[n]
            while p != parent[p]:
                parent[p] = parent[parent[p]]
                p = parent[p]
            return p
            
        def union(n1, n2):
            p1, p2 = find(n1), find(n2)
            if p1 == p2:
                return False
            if rank[p1] > rank[p2]:
                parent[p2] = p1
                rank[p1] += rank[p2]
            else:
                parent[p1] = p2
                rank[p2] += rank[p1]
            return True
            
        for n1, n2 in edges:
            if not union(n1, n2):
                return [n1, n2]`,
        explanation: ["Use the Union-Find (Disjoint Set Union) data structure to detect the first edge that connects two nodes already in the same component.", "The `find` function uses path compression to optimize future searches.", "The `union` function joins two components based on their rank to keep the tree balanced.", "The first edge for which `union` returns False is the one creating the cycle, and thus redundant."]
      },
      {
        language: "cpp",
        code: `class Solution {
    vector<int> parent;
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        parent.resize(n + 1);
        for (int i = 1; i <= n; i++) parent[i] = i;
        
        for (auto& edge : edges) {
            int root1 = find(edge[0]);
            int root2 = find(edge[1]);
            if (root1 == root2) return edge;
            parent[root1] = root2;
        }
        return {};
    }
};`,
        explanation: ["Isolate the redundant edge using Disjoint Set Union (DSU) with path compression.", "Path compression optimizes the find implementation to nearly O(1) amortized time.", "Cycle detection: if two endpoints of an edge find the same root, the edge is a back-edge creating a cycle.", "Iterating through edges as provided ensures we find the 'last occurring' cycle edge as required."]
      },
      {
        language: "java",
        code: `class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int[] parent = new int[edges.length + 1];
        for (int i = 1; i <= edges.length; i++) parent[i] = i;
        
        for (int[] edge : edges) {
            int p1 = find(parent, edge[0]);
            int p2 = find(parent, edge[1]);
            if (p1 == p2) return edge;
            parent[p1] = p2;
        }
        return new int[0];
    }
    
    private int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }
}`,
        explanation: ["Apply the Union-Find algorithm with recursive path compression for efficient connectivity tracking.", "Every edge is processed exactly once; if both nodes already share a parent, the edge closes a loop.", "The array-based parent tracking provides O(n) space efficiency.", "Returns the first edge that would violate the tree property of the graph."]
      }
    ]
  },
  "word-ladder": {
    title: "Word Ladder", difficulty: "Hard", topic: "Graphs", tags: ["hash-table", "string", "breadth-first-search", "graph"],
    prompt: "A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:\n- Every adjacent pair of words differs by a single letter.\n- Every `si` for `1 <= i <= k` is in `wordList`.\n- `sk == endWord`.\n\nGiven two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord`, or 0 if no such sequence exists.",
    constraints: ["1 <= beginWord.length <= 10", "endWord.length == beginWord.length", "1 <= wordList.length <= 5000", "wordList[i].length == beginWord.length", "beginWord, endWord, and wordList[i] consist of lowercase English letters.", "beginWord != endWord", "All the words in wordList are unique."],
    examples: [{input: "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", output: "5"}],
    timeComplexity: "O(N * M^2) where N is list size, M is word length", spaceComplexity: "O(N * M^2)", edgeCases: ["endWord not in wordList", "No path exists"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        if endWord not in wordList:
            return 0
            
        nei = collections.defaultdict(list)
        wordList.append(beginWord)
        for word in wordList:
            for j in range(len(word)):
                pattern = word[:j] + "*" + word[j + 1:]
                nei[pattern].append(word)
                
        visit = set([beginWord])
        q = collections.deque([beginWord])
        res = 1
        while q:
            for i in range(len(q)):
                word = q.popleft()
                if word == endWord:
                    return res
                for j in range(len(word)):
                    pattern = word[:j] + "*" + word[j + 1:]
                    for neighbor in nei[pattern]:
                        if neighbor not in visit:
                            visit.add(neighbor)
                            q.append(neighbor)
            res += 1
        return 0`,
        explanation: ["The problem is finding the shortest path in an unweighted graph — use BFS.", "Pre-process words into patterns (e.g., 'hot' maps to '*ot', 'h*t', 'ho*') to quickly find all neighbor words that differ by one character.", "Add the `beginWord` to the queue and a `visit` set.", "Level by level, traverse the neighbors. The level number when `endWord` is reached is the answer."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (dict.find(endWord) == dict.end()) return 0;
        
        queue<string> q;
        q.push(beginWord);
        int ladder = 1;
        
        while (!q.empty()) {
            int n = q.size();
            for (int i = 0; i < n; i++) {
                string word = q.front(); q.pop();
                if (word == endWord) return ladder;
                dict.erase(word);
                for (int j = 0; j < word.size(); j++) {
                    char c = word[j];
                    for (int k = 0; k < 26; k++) {
                        word[j] = 'a' + k;
                        if (dict.find(word) != dict.end()) {
                            q.push(word);
                            dict.erase(word);
                        }
                    }
                    word[j] = c;
                }
            }
            ladder++;
        }
        return 0;
    }
};`,
        explanation: ["Use an unordered set for O(1) word lookups.", "Run a standard BFS from `beginWord`.", "For each popped word, generate all 1-character variations. If a variation is in the dictionary, add it to the queue and remove it from the dictionary (prevents visiting same word twice).", "This BFS guarantees finding the shortest transformation sequence efficiently."]
      },
      {
        language: "java",
        code: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList);
        if (!set.contains(endWord)) return 0;
        
        Queue<String> queue = new LinkedList<>();
        queue.add(beginWord);
        int count = 1;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String word = queue.poll();
                if (word.equals(endWord)) return count;
                char[] chars = word.toCharArray();
                for (int j = 0; j < chars.length; j++) {
                    char old = chars[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        chars[j] = c;
                        String next = new String(chars);
                        if (set.contains(next)) {
                            queue.add(next);
                            set.remove(next);
                        }
                    }
                    chars[j] = old;
                }
            }
            count++;
        }
        return 0;
    }
}`,
        explanation: [" শর্টেস্ট পাথ খোঁজার জন্য BFS (Breadth-First Search) ব্যবহার করা হয়েছে কারণ এখানে সব এজের ওয়েট সমান।", "প্রতিটি শব্দের প্রতিটি লেটার 'a' থেকে 'z' পর্যন্ত পরিবর্তন করে চেক করা হয় সেটি ডিকশনারিতে আছে কি না।", "ডিকশনারি থেকে শব্দ রিমুভ করা হয় 'visited' ট্র্যাক রাখার জন্য, যা লুপ বা রিপিটেশন বন্ধ করে।", "লেডার লেন্থ প্রতিটি BFS লেভেলে এক করে ইনক্রিমেন্ট করা হয় যতক্ষণ না টার্গেট শব্দটি পাওয়া যাচ্ছে।"]
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

console.log("Written graph problems part 3.");
