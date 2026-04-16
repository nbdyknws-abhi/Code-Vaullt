import fs from 'fs';
import path from 'path';

const rawData = `
ARRAYS
1. Two Sum
2. Best Time to Buy and Sell Stock
3. Maximum Subarray (Kadane's Algorithm)
4. Merge Intervals
5. Product of Array Except Self
6. 3Sum
7. Container With Most Water
8. Set Matrix Zeroes
9. Rotate Array
10. Missing Number

Strings
1. Longest Substring Without Repeating Characters
2. Valid Anagram
3. Group Anagrams
4. Longest Palindromic Substring
5. String to Integer (atoi)
6. Reverse Words in a String
7. Valid Parentheses
8. Implement strStr()
9. Decode Ways
10. Count and Say

Linked List
1. Reverse Linked List
2. Merge Two Sorted Lists
3. Linked List Cycle
4. Remove Nth Node From End of List
5. Intersection of Two Linked Lists
6. Add Two Numbers
7. Palindrome Linked List
8. Copy List with Random Pointer
9. Reorder List
10. Flatten a Multilevel Doubly Linked List

Stack & Queue
1. Valid Parentheses
2. Min Stack
3. Next Greater Element I
4. Daily Temperatures
5. Evaluate Reverse Polish Notation
6. Implement Queue using Stacks
7. Simplify Path
8. Basic Calculator
9. Largest Rectangle in Histogram
10. Sliding Window Maximum

Binary Tree
1. Binary Tree Inorder Traversal
2. Maximum Depth of Binary Tree
3. Invert Binary Tree
4. Diameter of Binary Tree
5. Balanced Binary Tree
6. Path Sum
7. Lowest Common Ancestor
8. Serialize and Deserialize Binary Tree
9. Construct Binary Tree from Preorder and Inorder
10. Symmetric Tree

Binary Search Tree
1. Validate Binary Search Tree
2. Insert into a BST
3. Delete Node in a BST
4. Lowest Common Ancestor of a BST
5. Kth Smallest Element in a BST
6. BST Iterator
7. Convert Sorted Array to BST
8. Range Sum of BST
9. Trim a BST
10. Recover Binary Search Tree

Recursion & Backtracking
1. Subsets
2. Permutations
3. Combination Sum
4. Combination Sum II
5. Letter Combinations of a Phone Number
6. N-Queens
7. Word Search
8. Palindrome Partitioning
9. Generate Parentheses
10. Sudoku Solver

Dynamic Programming
1. Climbing Stairs
2. House Robber
3. Coin Change
4. Longest Increasing Subsequence
5. Unique Paths
6. Edit Distance
7. Maximum Product Subarray
8. Word Break
9. Decode Ways
10. Partition Equal Subset Sum

Graphs
1. Number of Islands
2. Clone Graph
3. Course Schedule
4. Pacific Atlantic Water Flow
5. Rotting Oranges
6. Word Ladder
7. Graph Valid Tree
8. Network Delay Time
9. Find Eventual Safe States
10. Number of Connected Components

Heap / Priority Queue
1. Kth Largest Element in an Array
2. Top K Frequent Elements
3. Merge K Sorted Lists
4. Find Median from Data Stream
5. Task Scheduler
6. Reorganize String
7. K Closest Points to Origin
8. Smallest Range Covering Elements from K Lists
9. Sliding Window Median
10. Ugly Number II
`;

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const blocks = rawData.trim().split(/\n\s*\n/);

const dataDir = path.join(process.cwd(), 'src', 'data', 'problems');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let allExports = [];

blocks.forEach(block => {
  const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
  let topic = lines[0];
  const problems = lines.slice(1);
  
  // Normalize topic string
  const topicDirName = slugify(topic);
  const topicPath = path.join(dataDir, topicDirName);
  
  if (!fs.existsSync(topicPath)) {
    fs.mkdirSync(topicPath, { recursive: true });
  }

  problems.forEach((pLine, idx) => {
    // "1. Two Sum" -> "Two Sum"
    const title = pLine.replace(/^\d+\.\s*/, '');
    let id = slugify(title);
    
    // Some random assignment for demo
    const difficulty = (idx % 3 === 0) ? 'Easy' : (idx % 3 === 1) ? 'Medium' : 'Hard';
    let varName = id.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
    if (/^[0-9]/.test(varName)) {
      varName = '_' + varName;
    }

    if (allExports.some(e => e.id === id)) {
      id = `${id}-${topicDirName}`;
      const safeSuffix = topicDirName.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
      varName = varName + safeSuffix.charAt(0).toUpperCase() + safeSuffix.slice(1);
    }
    
    allExports.push({ varName, id, path: "./" + topicDirName + "/" + id });

    // We build the code strings avoiding complex template literal nesting
    const pyCode = "def solve(input):\\n    # Your code here\\n    return result";
    const cppCode = "#include <iostream>\\n\\nclass Solution {\\npublic:\\n    int solve(int input) {\\n        // Your code here\\n        return 0;\\n    }\\n};";
    const javaCode = "class Solution {\\n    public int solve(int input) {\\n        // Your code here\\n        return 0;\\n    }\\n}";

    const content = `import { Problem } from '../../../types/problem';

export const ${varName}: Problem = {
  id: "${id}",
  title: "${title}",
  difficulty: "${difficulty}",
  topic: "${topic}",
  tags: ["${topicDirName}"],
  prompt: "\\n### Problem Statement\\n\\nYou are given a set of inputs. Process them and return the expected output.\\n\\n**Note**: This is a generated placeholder problem description.\\n",
  constraints: [
    "1 <= input.length <= 10^5",
    "It is guaranteed a solution exists."
  ],
  examples: [
    {
      input: "example_input",
      output: "example_output",
      explanation: "This explains why the output is correct."
    }
  ],
  solutions: [
    {
      language: "python",
      code: \`${pyCode}\`,
      explanation: ["Initialize variables", "Iterate over the input", "Return the final result"]
    },
    {
      language: "cpp",
      code: \`${cppCode}\`,
      explanation: ["Initialize variables", "Iterate over the input", "Return the final result"]
    },
    {
      language: "java",
      code: \`${javaCode}\`,
      explanation: ["Initialize variables", "Iterate over the input", "Return the final result"]
    }
  ],
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  edgeCases: ["Empty input array", "Inputs with negative numbers"]
};
`;

    fs.writeFileSync(path.join(topicPath, `${id}.ts`), content);
  });
});

let indexContent = "import { Problem } from '../../types/problem';\n\n";
allExports.forEach(e => {
  indexContent += `import { ${e.varName} } from '${e.path}';\n`;
});

indexContent += "\nexport const allProblems: Record<string, Problem> = {\n";
allExports.forEach(e => {
  indexContent += `  "${e.id}": ${e.varName},\n`;
});
indexContent += "};\n\nexport const problemsList: Problem[] = Object.values(allProblems);\n";

fs.writeFileSync(path.join(dataDir, 'index.ts'), indexContent);

console.log(`Generated 100 problems successfully in ${dataDir}`);
