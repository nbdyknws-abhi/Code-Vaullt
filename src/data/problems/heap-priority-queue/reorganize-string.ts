import { Problem } from '../../../types/problem';

export const reorganizeString: Problem = {
  id: "reorganize-string",
  title: "Reorganize String",
  difficulty: "Medium",
  topic: "Heap & Priority Queue",
  tags: ["hash-table","string","greedy","sorting","heap-priority-queue","counting"],
  prompt: "Given a string `s`, rearrange the characters of `s` so that any two adjacent characters are not the same.\n\nReturn any possible rearrangement of `s` or return an empty string `\"\"` if not possible.",
  constraints: ["1 <= s.length <= 500","s consists of lowercase English letters."],
  examples: [
  {
    "input": "s = \"aab\"",
    "output": "\"aba\""
  },
  {
    "input": "s = \"aaab\"",
    "output": "\"\""
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def reorganizeString(self, s: str) -> str:\n        count = Counter(s)\n        maxHeap = [[-cnt, char] for char, cnt in count.items()]\n        heapq.heapify(maxHeap)\n        \n        prev = None\n        res = \"\"\n        while maxHeap or prev:\n            if prev and not maxHeap:\n                return \"\"\n            \n            cnt, char = heapq.heappop(maxHeap)\n            res += char\n            cnt += 1\n            \n            if prev:\n                heapq.heappush(maxHeap, prev)\n                prev = None\n                \n            if cnt != 0:\n                prev = [cnt, char]\n                \n        return res",
    "explanation": [
      "Use a max-heap to prioritize characters with the highest frequency.",
      "At each step, pick the most frequent character that is NOT the same as the previously picked character.",
      "Store the previously picked character and push it back into the heap only after another char has been picked to ensure no two adjacent chars are the same.",
      "If at any point we need to pick a char but the heap is empty (and we have a pending char), it's impossible; return \"\"."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    string reorganizeString(string s) {\n        vector<int> counts(26, 0);\n        for (char c : s) counts[c - 'a']++;\n        \n        priority_queue<pair<int, char>> pq;\n        for (int i = 0; i < 26; i++) {\n            if (counts[i] > 0) pq.push({counts[i], (char)('a' + i)});\n        }\n        \n        string res = \"\";\n        pair<int, char> prev = {-1, '#'};\n        while (!pq.empty()) {\n            auto curr = pq.top(); pq.pop();\n            res += curr.second;\n            \n            if (prev.first > 0) pq.push(prev);\n            \n            curr.first--;\n            prev = curr;\n        }\n        return res.length() == s.length() ? res : \"\";\n    }\n};",
    "explanation": [
      "Implementation using a max-priority queue to store character frequencies.",
      "By always pulling the most frequent available character, we greedily reduce the risk of running out of padding characters.",
      "The `prev` variable holds the character used in the preceding step to prevent immediate re-use.",
      "Validation at the end ensures all characters were successfully placed without violations."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public String reorganizeString(String s) {\n        int[] counts = new int[26];\n        for (char c : s.toCharArray()) counts[c - 'a']++;\n        \n        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[1] - a[1]);\n        for (int i = 0; i < 26; i++) {\n            if (counts[i] > 0) pq.add(new int[]{i, counts[i]});\n        }\n        \n        StringBuilder sb = new StringBuilder();\n        int[] prev = null;\n        while (!pq.isEmpty()) {\n            int[] curr = pq.poll();\n            sb.append((char) (curr[0] + 'a'));\n            if (prev != null && prev[1] > 0) pq.add(prev);\n            curr[1]--;\n            prev = curr;\n        }\n        return sb.length() == s.length() ? sb.toString() : \"\";\n    }\n}",
    "explanation": [
      "Utilize a frequency map and a max-heap of character-count pairs.",
      "Greedy selection of characters with the highest remaining frequency while avoiding the immediate duplicate.",
      "The `StringBuilder` accumulates the result efficiently.",
      "Final check compares constructed string length to original length to handle impossible cases (e.g., 'aaa')."
    ]
  }
],
  timeComplexity: "O(N log A) where A is alphabet size",
  spaceComplexity: "O(A)",
  edgeCases: ["Impossible to rearrange","Single character string"]
};
