import { Problem } from '../../../types/problem';

export const wordLadder: Problem = {
  id: "word-ladder",
  title: "Word Ladder",
  difficulty: "Hard",
  topic: "Graphs",
  tags: ["hash-table","string","breadth-first-search","graph"],
  prompt: "A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:\n- Every adjacent pair of words differs by a single letter.\n- Every `si` for `1 <= i <= k` is in `wordList`.\n- `sk == endWord`.\n\nGiven two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord`, or 0 if no such sequence exists.",
  constraints: ["1 <= beginWord.length <= 10","endWord.length == beginWord.length","1 <= wordList.length <= 5000","wordList[i].length == beginWord.length","beginWord, endWord, and wordList[i] consist of lowercase English letters.","beginWord != endWord","All the words in wordList are unique."],
  examples: [
  {
    "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
    "output": "5"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:\n        if endWord not in wordList:\n            return 0\n            \n        nei = collections.defaultdict(list)\n        wordList.append(beginWord)\n        for word in wordList:\n            for j in range(len(word)):\n                pattern = word[:j] + \"*\" + word[j + 1:]\n                nei[pattern].append(word)\n                \n        visit = set([beginWord])\n        q = collections.deque([beginWord])\n        res = 1\n        while q:\n            for i in range(len(q)):\n                word = q.popleft()\n                if word == endWord:\n                    return res\n                for j in range(len(word)):\n                    pattern = word[:j] + \"*\" + word[j + 1:]\n                    for neighbor in nei[pattern]:\n                        if neighbor not in visit:\n                            visit.add(neighbor)\n                            q.append(neighbor)\n            res += 1\n        return 0",
    "explanation": [
      "The problem is finding the shortest path in an unweighted graph — use BFS.",
      "Pre-process words into patterns (e.g., 'hot' maps to '*ot', 'h*t', 'ho*') to quickly find all neighbor words that differ by one character.",
      "Add the `beginWord` to the queue and a `visit` set.",
      "Level by level, traverse the neighbors. The level number when `endWord` is reached is the answer."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        unordered_set<string> dict(wordList.begin(), wordList.end());\n        if (dict.find(endWord) == dict.end()) return 0;\n        \n        queue<string> q;\n        q.push(beginWord);\n        int ladder = 1;\n        \n        while (!q.empty()) {\n            int n = q.size();\n            for (int i = 0; i < n; i++) {\n                string word = q.front(); q.pop();\n                if (word == endWord) return ladder;\n                dict.erase(word);\n                for (int j = 0; j < word.size(); j++) {\n                    char c = word[j];\n                    for (int k = 0; k < 26; k++) {\n                        word[j] = 'a' + k;\n                        if (dict.find(word) != dict.end()) {\n                            q.push(word);\n                            dict.erase(word);\n                        }\n                    }\n                    word[j] = c;\n                }\n            }\n            ladder++;\n        }\n        return 0;\n    }\n};",
    "explanation": [
      "Use an unordered set for O(1) word lookups.",
      "Run a standard BFS from `beginWord`.",
      "For each popped word, generate all 1-character variations. If a variation is in the dictionary, add it to the queue and remove it from the dictionary (prevents visiting same word twice).",
      "This BFS guarantees finding the shortest transformation sequence efficiently."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        Set<String> set = new HashSet<>(wordList);\n        if (!set.contains(endWord)) return 0;\n        \n        Queue<String> queue = new LinkedList<>();\n        queue.add(beginWord);\n        int count = 1;\n        \n        while (!queue.isEmpty()) {\n            int size = queue.size();\n            for (int i = 0; i < size; i++) {\n                String word = queue.poll();\n                if (word.equals(endWord)) return count;\n                char[] chars = word.toCharArray();\n                for (int j = 0; j < chars.length; j++) {\n                    char old = chars[j];\n                    for (char c = 'a'; c <= 'z'; c++) {\n                        chars[j] = c;\n                        String next = new String(chars);\n                        if (set.contains(next)) {\n                            queue.add(next);\n                            set.remove(next);\n                        }\n                    }\n                    chars[j] = old;\n                }\n            }\n            count++;\n        }\n        return 0;\n    }\n}",
    "explanation": [
      " শর্টেস্ট পাথ খোঁজার জন্য BFS (Breadth-First Search) ব্যবহার করা হয়েছে কারণ এখানে সব এজের ওয়েট সমান।",
      "প্রতিটি শব্দের প্রতিটি লেটার 'a' থেকে 'z' পর্যন্ত পরিবর্তন করে চেক করা হয় সেটি ডিকশনারিতে আছে কি না।",
      "ডিকশনারি থেকে শব্দ রিমুভ করা হয় 'visited' ট্র্যাক রাখার জন্য, যা লুপ বা রিপিটেশন বন্ধ করে।",
      "লেডার লেন্থ প্রতিটি BFS লেভেলে এক করে ইনক্রিমেন্ট করা হয় যতক্ষণ না টার্গেট শব্দটি পাওয়া যাচ্ছে।"
    ]
  }
],
  timeComplexity: "O(N * M^2) where N is list size, M is word length",
  spaceComplexity: "O(N * M^2)",
  edgeCases: ["endWord not in wordList","No path exists"]
};
