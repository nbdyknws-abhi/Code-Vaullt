import fs from 'fs';
import path from 'path';

const stringsData = {
  "longest-palindromic-substring": {
    title: "Longest Palindromic Substring", difficulty: "Medium", topic: "Strings", tags: ["string", "dynamic-programming"],
    prompt: "Given a string `s`, return the longest palindromic substring in `s`.",
    constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters."],
    examples: [{input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.'}],
    timeComplexity: "O(N^2)", spaceComplexity: "O(1)", edgeCases: ["Single character", "Entire string is a palindrome"],
    solutions: [
      {
        language: "python",
        code: `def longestPalindrome(s):
    res = ""
    resLen = 0
    
    for i in range(len(s)):
        # odd length
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > resLen:
                res = s[l:r+1]
                resLen = r - l + 1
            l -= 1
            r += 1
            
        # even length
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > resLen:
                res = s[l:r+1]
                resLen = r - l + 1
            l -= 1
            r += 1
            
    return res`,
        explanation: ["Iterate through every character in the string, treating it as the center of a potential palindrome.", "Expand outwards checking for odd length palindromes (center is a single char).", "Expand outwards checking for even length palindromes (center is between two chars).", "Update the longest tracked string whenever a longer palindrome bounds is mapped."]
      },
      {
        language: "cpp",
        code: `#include <string>

class Solution {
public:
    std::string longestPalindrome(std::string s) {
        if (s.empty()) return "";
        int start = 0, maxLen = 0;
        
        for (int i = 0; i < s.length(); ++i) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = std::max(len1, len2);
            
            if (len > maxLen) {
                start = i - (len - 1) / 2;
                maxLen = len;
            }
        }
        
        return s.substr(start, maxLen);
    }
    
private:
    int expandAroundCenter(std::string s, int left, int right) {
        while (left >= 0 && right < s.length() && s[left] == s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
};`,
        explanation: ["Use a helper function to determine the length of a palindrome extending outward from a specific center sequence.", "Account for explicit edge scenarios parsing both singleton odd origins and duplicate even neighbor sequences natively.", "Execute length calculation comparing max known configuration length to dynamically generated width."]
      },
      {
        language: "java",
        code: `class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    private int expandAroundCenter(String s, int left, int right) {
        int L = left, R = right;
        while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) {
            L--;
            R++;
        }
        return R - L - 1;
    }
}`,
        explanation: ["Establish constraints filtering out null lengths.", "Leverage identical logic from C++ executing bidirectional outward crawl validation algorithms utilizing specific character-pointer boundaries.", "Translate relative bounding sizes back to absolute index references configuring string substring allocations."]
      }
    ]
  },
  "string-to-integer-atoi": {
    title: "String to Integer (atoi)", difficulty: "Medium", topic: "Strings", tags: ["string", "math"],
    prompt: "Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.",
    constraints: ["0 <= s.length <= 200", "s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'."],
    examples: [{input: 's = "   -042"', output: "-42"}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["Whitespaces", "Overflows", "Letters interspersed"],
    solutions: [
      {
        language: "python",
        code: `def myAtoi(s):
    s = s.lstrip()
    if not s:
        return 0
        
    sign = 1
    i = 0
    if s[0] == '-':
        sign = -1
        i += 1
    elif s[0] == '+':
        i += 1
        
    res = 0
    while i < len(s) and s[i].isdigit():
        res = res * 10 + int(s[i])
        i += 1
        
    res *= sign
    
    INT_MAX = 2**31 - 1
    INT_MIN = -2**31
    if res > INT_MAX: return INT_MAX
    if res < INT_MIN: return INT_MIN
    return res`,
        explanation: ["Strip leading whitespace natively.", "Inspect first non-whitespace character allocating arithmetic polarity.", "Utilize dynamic numerical parsing traversing loop natively accumulating aggregate numerical representations based precisely on 10s power scaling.", "Hardcap output utilizing absolute INT_MAX integers."]
      },
      {
        language: "cpp",
        code: `#include <string>
#include <climits>

class Solution {
public:
    int myAtoi(std::string s) {
        int i = 0, sign = 1, result = 0;
        int n = s.length();
        
        while (i < n && s[i] == ' ') i++;
        
        if (i < n && (s[i] == '+' || s[i] == '-')) {
            sign = (s[i] == '+') ? 1 : -1;
            i++;
        }
        
        while (i < n && isdigit(s[i])) {
            int digit = s[i] - '0';
            
            if (result > INT_MAX / 10 || (result == INT_MAX / 10 && digit > INT_MAX % 10)) {
                return sign == 1 ? INT_MAX : INT_MIN;
            }
            
            result = result * 10 + digit;
            i++;
        }
        
        return result * sign;
    }
};`,
        explanation: ["Evaluate starting whitespace gaps parsing string arrays securely.", "Deduct signs manually.", "Scan subsequent chars continuously until detecting alphabetical failure blocks.", "Execute integer boundary clipping natively during loop to circumvent explicit integer memory overflow exception crashing natively."]
      },
      {
        language: "java",
        code: `class Solution {
    public int myAtoi(String s) {
        int index = 0, sign = 1, total = 0;
        if(s.length() == 0) return 0;
        
        while(index < s.length() && s.charAt(index) == ' ')
            index ++;
        
        if(index < s.length() && (s.charAt(index) == '+' || s.charAt(index) == '-')){
            sign = s.charAt(index) == '+' ? 1 : -1;
            index ++;
        }
        
        while(index < s.length()){
            int digit = s.charAt(index) - '0';
            if(digit < 0 || digit > 9) break;
            
            if(Integer.MAX_VALUE/10 < total || Integer.MAX_VALUE/10 == total && Integer.MAX_VALUE %10 < digit)
                return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            
            total = 10 * total + digit;
            index ++;
        }
        return total * sign;
    }
}`,
        explanation: ["Perform edge validations detecting empty string layouts instantly.", "Manually increment standard variable indices circumventing Regex overloads.", "Leverage logic verifying integer limitations inside numerical aggregation calculations prior to explicit execution limits mapping bounds effectively."]
      }
    ]
  },
  "reverse-words-in-a-string": {
    title: "Reverse Words in a String", difficulty: "Medium", topic: "Strings", tags: ["string", "two-pointers"],
    prompt: "Given an input string `s`, reverse the order of the words.",
    constraints: ["1 <= s.length <= 10^4", "s contains English letters (upper-case and lower-case), digits, and spaces ' '."],
    examples: [{input: 's = "the sky is blue"', output: '"blue is sky the"'}],
    timeComplexity: "O(N)", spaceComplexity: "O(N)", edgeCases: ["Multiple spaces", "Trailing/leading spaces"],
    solutions: [
      {
        language: "python",
        code: `def reverseWords(s):
    return " ".join(s.split()[::-1])`,
        explanation: ["Python's split() without arguments automatically handles arbitrary amounts of whitespace, trimming both ends and ignoring multiple spaces.", "Reverse the resulting list natively utilizing slicing parameters [::-1].", "Rejoin the components mapping strict ' ' individual spaces natively."]
      },
      {
        language: "cpp",
        code: `#include <string>
#include <algorithm>

class Solution {
public:
    std::string reverseWords(std::string s) {
        std::string result;
        int i = 0;
        int n = s.length();
        
        while (i < n) {
            while (i < n && s[i] == ' ') i++;
            if (i >= n) break;
            int j = i + 1;
            while (j < n && s[j] != ' ') j++;
            std::string sub = s.substr(i, j - i);
            if (result.length() == 0) result = sub;
            else result = sub + " " + result;
            i = j + 1;
        }
        
        return result;
    }
};`,
        explanation: ["Extract entire words utilizing separate pointer structures bypassing external libraries.", "Construct sequence backwards dynamically compiling strings continuously applying prefixes exclusively.", "Automatically handles whitespace filtering effectively via sequential loops advancing independent counter iterators."]
      },
      {
        language: "java",
        code: `class Solution {
    public String reverseWords(String s) {
        String[] words = s.trim().split("\\\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) {
                sb.append(" ");
            }
        }
        return sb.toString();
    }
}`,
        explanation: ["Implement strict edge trimming discarding leading or trailing boundaries sequentially.", "Utilize standardized Regex splitting applying strictly to contiguous whitespace blocks mapping strings to arrays explicitly.", "Reverse loop arrays concatenating structures leveraging StringBuilder optimization logic securely."]
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

console.log("Written detailed string problems part 2.");
