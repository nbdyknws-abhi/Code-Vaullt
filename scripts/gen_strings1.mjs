import fs from 'fs';
import path from 'path';

const stringsData = {
  "longest-substring-without-repeating-characters": {
    title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Strings", tags: ["hash-table", "string", "sliding-window"],
    prompt: "Given a string `s`, find the length of the longest substring without repeating characters.",
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    examples: [{input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.'}, {input: 's = "pwwkew"', output: "3", explanation: 'The answer is "wke", with the length of 3.'}],
    timeComplexity: "O(N)", spaceComplexity: "O(min(M, N))", edgeCases: ["Empty string", "String with all same characters"],
    solutions: [
      {
        language: "python",
        code: `def lengthOfLongestSubstring(s):
    char_map = {}
    max_len = 0
    left = 0
    
    for right in range(len(s)):
        if s[right] in char_map and char_map[s[right]] >= left:
            left = char_map[s[right]] + 1
        
        char_map[s[right]] = right
        max_len = max(max_len, right - left + 1)
        
    return max_len`,
        explanation: ["Use a sliding window approach with two pointers (left and right).", "Maintain a hash map to store the last seen index of each character.", "If a character is already in the map and its index is within the current window, move the left pointer past its last occurrence.", "Update the maximum length found so far."]
      },
      {
        language: "cpp",
        code: `#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        std::unordered_map<char, int> charMap;
        int maxLen = 0;
        int left = 0;
        
        for (int right = 0; right < s.length(); ++right) {
            if (charMap.find(s[right]) != charMap.end() && charMap[s[right]] >= left) {
                left = charMap[s[right]] + 1;
            }
            charMap[s[right]] = right;
            maxLen = std::max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
};`,
        explanation: ["Use an unordered_map to track character indices.", "Expand the window by moving the right pointer.", "If a duplicate character is found inside the current window window, shrink the window by moving left past the duplicate's index.", "Compute maximum substring length during each step."]
      },
      {
        language: "java",
        code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int maxLen = 0;
        int left = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
}`,
        explanation: ["Define a HashMap mapping Characters to Integers.", "Maintain absolute boundaries via right and left variables.", "Extract character. If the character's last position is at or ahead of 'left', bump 'left' to avoid repeating.", "Replace/Insert the character's newest index."]
      }
    ]
  },
  "valid-anagram": {
    title: "Valid Anagram", difficulty: "Easy", topic: "Strings", tags: ["hash-table", "string", "sorting"],
    prompt: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    constraints: ["1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters."],
    examples: [{input: 's = "anagram", t = "nagaram"', output: "true"}, {input: 's = "rat", t = "car"', output: "false"}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["Different lengths", "Empty strings"],
    solutions: [
      {
        language: "python",
        code: `def isAnagram(s, t):
    if len(s) != len(t):
        return False
        
    counts = [0] * 26
    for i in range(len(s)):
        counts[ord(s[i]) - ord('a')] += 1
        counts[ord(t[i]) - ord('a')] -= 1
        
    for count in counts:
        if count != 0:
            return False
            
    return True`,
        explanation: ["First check if the lengths are different; if so, they can't be anagrams.", "Use a fixed-size array of 26 integers to represent character frequencies.", "Increment the count for characters in s and decrement for characters in t.", "If all counts return back to 0, it's an anagram."]
      },
      {
        language: "cpp",
        code: `#include <string>
#include <vector>

class Solution {
public:
    bool isAnagram(std::string s, std::string t) {
        if (s.length() != t.length()) return false;
        
        std::vector<int> counts(26, 0);
        for (int i = 0; i < s.length(); i++) {
            counts[s[i] - 'a']++;
            counts[t[i] - 'a']--;
        }
        
        for (int count : counts) {
            if (count != 0) return false;
        }
        return true;
    }
};`,
        explanation: ["Reject strings of unequal lengths instantly.", "Create a frequency table corresponding to array positions 0-25 for standard alphabet.", "Iterate uniformly mapping the offset from 'a'. String s adds mapping, String t decreases mapping.", "Linear check across all 26 elements verifying zeroes."]
      },
      {
        language: "java",
        code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }
        
        for (int count : counts) {
            if (count != 0) return false;
        }
        return true;
    }
}`,
        explanation: ["Evaluate lengths.", "Initialize an integer array size 26 reflecting ASCII table constraints.", "Loop simultaneously across parallel strings pulling character integers.", "Scan array sequentially."]
      }
    ]
  },
  "group-anagrams": {
    title: "Group Anagrams", difficulty: "Medium", topic: "Strings", tags: ["array", "hash-table", "string", "sorting"],
    prompt: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
    constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100", "strs[i] consists of lowercase English letters."],
    examples: [{input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'}],
    timeComplexity: "O(N * K)", spaceComplexity: "O(N * K)", edgeCases: ["Empty string array", "Array of identical strings"],
    solutions: [
      {
        language: "python",
        code: `from collections import defaultdict

def groupAnagrams(strs):
    ans = defaultdict(list)
    for s in strs:
        count = [0] * 26
        for c in s:
            count[ord(c) - ord('a')] += 1
        ans[tuple(count)].append(s)
    return list(ans.values())`,
        explanation: ["Use a defaultdict to map character counts to lists of anagrams.", "For each string, build a tuple representing the frequencies of all 26 letters.", "Use the tuple as a Dictionary key because Python tuples are hashable.", "Return the values of the dictionary."]
      },
      {
        language: "cpp",
        code: `#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {
        std::unordered_map<std::string, std::vector<std::string>> map;
        for (const std::string& s : strs) {
            std::string key = s;
            std::sort(key.begin(), key.end());
            map[key].push_back(s);
        }
        
        std::vector<std::vector<std::string>> result;
        for (auto& pair : map) {
            result.push_back(pair.second);
        }
        return result;
    }
};`,
        explanation: ["Utilize an unordered map connecting sorted string strings to string vectors.", "Loop through array extracting distinct strings natively.", "Sort the individual string yielding a normalized key.", "Append the original un-sorted string into the mapped list.", "Collect the map arrays into the return matrix."]
      },
      {
        language: "java",
        code: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] ca = s.toCharArray();
            Arrays.sort(ca);
            String key = String.valueOf(ca);
            if (!map.containsKey(key)) {
                map.put(key, new ArrayList<>());
            }
            map.get(key).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`,
        explanation: ["Generate mapping layout Strings -> String Lists.", "Convert element strings into primitive character arrays to unlock core sorting.", "Process Arrays.sort(). Convert mutated arrays back using String.valueOf() to retrieve mapping key.", "Push strings sequentially based upon parsed configuration key."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'strings');

Object.keys(stringsData).forEach(id => {
  const data = stringsData[id];
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

console.log("Written detailed string problems part 1.");
