import { Problem } from '../../../types/problem';

export const groupAnagrams: Problem = {
  id: "group-anagrams",
  title: "Group Anagrams",
  difficulty: "Medium",
  topic: "Strings",
  tags: ["array","hash-table","string","sorting"],
  prompt: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
  constraints: ["1 <= strs.length <= 10^4","0 <= strs[i].length <= 100","strs[i] consists of lowercase English letters."],
  examples: [
  {
    "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
    "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "from collections import defaultdict\n\ndef groupAnagrams(strs):\n    ans = defaultdict(list)\n    for s in strs:\n        count = [0] * 26\n        for c in s:\n            count[ord(c) - ord('a')] += 1\n        ans[tuple(count)].append(s)\n    return list(ans.values())",
    "explanation": [
      "Use a defaultdict to map character counts to lists of anagrams.",
      "For each string, build a tuple representing the frequencies of all 26 letters.",
      "Use the tuple as a Dictionary key because Python tuples are hashable.",
      "Return the values of the dictionary."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\n\nclass Solution {\npublic:\n    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {\n        std::unordered_map<std::string, std::vector<std::string>> map;\n        for (const std::string& s : strs) {\n            std::string key = s;\n            std::sort(key.begin(), key.end());\n            map[key].push_back(s);\n        }\n        \n        std::vector<std::vector<std::string>> result;\n        for (auto& pair : map) {\n            result.push_back(pair.second);\n        }\n        return result;\n    }\n};",
    "explanation": [
      "Utilize an unordered map connecting sorted string strings to string vectors.",
      "Loop through array extracting distinct strings natively.",
      "Sort the individual string yielding a normalized key.",
      "Append the original un-sorted string into the mapped list.",
      "Collect the map arrays into the return matrix."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.*;\n\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] ca = s.toCharArray();\n            Arrays.sort(ca);\n            String key = String.valueOf(ca);\n            if (!map.containsKey(key)) {\n                map.put(key, new ArrayList<>());\n            }\n            map.get(key).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n}",
    "explanation": [
      "Generate mapping layout Strings -> String Lists.",
      "Convert element strings into primitive character arrays to unlock core sorting.",
      "Process Arrays.sort(). Convert mutated arrays back using String.valueOf() to retrieve mapping key.",
      "Push strings sequentially based upon parsed configuration key."
    ]
  }
],
  timeComplexity: "O(N * K)",
  spaceComplexity: "O(N * K)",
  edgeCases: ["Empty string array","Array of identical strings"]
};
