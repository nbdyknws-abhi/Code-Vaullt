import { Problem } from '../../../types/problem';

export const stringToIntegerAtoi: Problem = {
  id: "string-to-integer-atoi",
  title: "String to Integer (atoi)",
  difficulty: "Medium",
  topic: "Strings",
  tags: ["string","math"],
  prompt: "Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.",
  constraints: ["0 <= s.length <= 200","s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'."],
  examples: [
  {
    "input": "s = \"   -042\"",
    "output": "-42"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def myAtoi(s):\n    s = s.lstrip()\n    if not s:\n        return 0\n        \n    sign = 1\n    i = 0\n    if s[0] == '-':\n        sign = -1\n        i += 1\n    elif s[0] == '+':\n        i += 1\n        \n    res = 0\n    while i < len(s) and s[i].isdigit():\n        res = res * 10 + int(s[i])\n        i += 1\n        \n    res *= sign\n    \n    INT_MAX = 2**31 - 1\n    INT_MIN = -2**31\n    if res > INT_MAX: return INT_MAX\n    if res < INT_MIN: return INT_MIN\n    return res",
    "explanation": [
      "Strip leading whitespace natively.",
      "Inspect first non-whitespace character allocating arithmetic polarity.",
      "Utilize dynamic numerical parsing traversing loop natively accumulating aggregate numerical representations based precisely on 10s power scaling.",
      "Hardcap output utilizing absolute INT_MAX integers."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <string>\n#include <climits>\n\nclass Solution {\npublic:\n    int myAtoi(std::string s) {\n        int i = 0, sign = 1, result = 0;\n        int n = s.length();\n        \n        while (i < n && s[i] == ' ') i++;\n        \n        if (i < n && (s[i] == '+' || s[i] == '-')) {\n            sign = (s[i] == '+') ? 1 : -1;\n            i++;\n        }\n        \n        while (i < n && isdigit(s[i])) {\n            int digit = s[i] - '0';\n            \n            if (result > INT_MAX / 10 || (result == INT_MAX / 10 && digit > INT_MAX % 10)) {\n                return sign == 1 ? INT_MAX : INT_MIN;\n            }\n            \n            result = result * 10 + digit;\n            i++;\n        }\n        \n        return result * sign;\n    }\n};",
    "explanation": [
      "Evaluate starting whitespace gaps parsing string arrays securely.",
      "Deduct signs manually.",
      "Scan subsequent chars continuously until detecting alphabetical failure blocks.",
      "Execute integer boundary clipping natively during loop to circumvent explicit integer memory overflow exception crashing natively."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public int myAtoi(String s) {\n        int index = 0, sign = 1, total = 0;\n        if(s.length() == 0) return 0;\n        \n        while(index < s.length() && s.charAt(index) == ' ')\n            index ++;\n        \n        if(index < s.length() && (s.charAt(index) == '+' || s.charAt(index) == '-')){\n            sign = s.charAt(index) == '+' ? 1 : -1;\n            index ++;\n        }\n        \n        while(index < s.length()){\n            int digit = s.charAt(index) - '0';\n            if(digit < 0 || digit > 9) break;\n            \n            if(Integer.MAX_VALUE/10 < total || Integer.MAX_VALUE/10 == total && Integer.MAX_VALUE %10 < digit)\n                return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;\n            \n            total = 10 * total + digit;\n            index ++;\n        }\n        return total * sign;\n    }\n}",
    "explanation": [
      "Perform edge validations detecting empty string layouts instantly.",
      "Manually increment standard variable indices circumventing Regex overloads.",
      "Leverage logic verifying integer limitations inside numerical aggregation calculations prior to explicit execution limits mapping bounds effectively."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Whitespaces","Overflows","Letters interspersed"]
};
