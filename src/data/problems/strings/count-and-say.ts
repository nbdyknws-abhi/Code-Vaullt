import { Problem } from '../../../types/problem';

export const countAndSay: Problem = {
  id: "count-and-say",
  title: "Count and Say",
  difficulty: "Medium",
  topic: "Strings",
  tags: ["string"],
  prompt: "The count-and-say sequence is a sequence of digit strings defined by the recursive formula:\n`countAndSay(1) = 1`\n`countAndSay(n)` is the run-length encoding of `countAndSay(n - 1)`.",
  constraints: ["1 <= n <= 30"],
  examples: [
  {
    "input": "n = 4",
    "output": "\"1211\"",
    "explanation": "countAndSay(1) = '1'\ncountAndSay(2) = say '1' = one 1 = '11'\ncountAndSay(3) = say '11' = two 1's = '21'\ncountAndSay(4) = say '21' = one 2 + one 1 = '12' + '11' = '1211'"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def countAndSay(n):\n    res = \"1\"\n    for _ in range(n - 1):\n        temp = \"\"\n        count = 1\n        for i in range(1, len(res)):\n            if res[i] == res[i - 1]:\n                count += 1\n            else:\n                temp += str(count) + res[i - 1]\n                count = 1\n        temp += str(count) + res[-1]\n        res = temp\n    return res",
    "explanation": [
      "Seed starting combination strings '1' iteratively updating limits based exactly on N execution states.",
      "Run parallel index verifications checking previously parsed digit blocks.",
      "Translate aggregated counts dynamically concatenating values.",
      "Close active iterations looping sequences accurately resolving recursive properties."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <string>\n\nclass Solution {\npublic:\n    std::string countAndSay(int n) {\n        if (n == 1) return \"1\";\n        std::string prev = countAndSay(n - 1);\n        std::string res = \"\";\n        int count = 1;\n        for (int i = 0; i < prev.length(); i++) {\n            if (i == prev.length() - 1 || prev[i] != prev[i + 1]) {\n                res += std::to_string(count) + prev[i];\n                count = 1;\n            } else {\n                count++;\n            }\n        }\n        return res;\n    }\n};",
    "explanation": [
      "Employ a direct recursive call mapping limits dynamically to bounds.",
      "Resolve previous step structures continuously.",
      "Count concurrent index blocks linearly parsing standard loops matching neighbor characters.",
      "Concatenate values aggregating total characters back into sequence blocks."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public String countAndSay(int n) {\n        String s = \"1\";\n        for (int i = 1; i < n; i++) {\n            StringBuilder sb = new StringBuilder();\n            int count = 1;\n            for (int j = 1; j < s.length(); j++) {\n                if (s.charAt(j) == s.charAt(j - 1)) {\n                    count++;\n                } else {\n                    sb.append(count).append(s.charAt(j - 1));\n                    count = 1;\n                }\n            }\n            sb.append(count).append(s.charAt(s.length() - 1));\n            s = sb.toString();\n        }\n        return s;\n    }\n}",
    "explanation": [
      "Configure starting values explicitly bypassing recursion using loops mapping states securely.",
      "Optimize append actions configuring dynamic StringBuilders exclusively preventing memory issues.",
      "Evaluate internal array loops verifying consecutive digits.",
      "Execute final buffer appends explicitly mapping tail blocks correctly matching limits."
    ]
  }
],
  timeComplexity: "O(2^N) bounds",
  spaceComplexity: "O(2^N) bounds",
  edgeCases: ["Base cases 1 and 2"]
};
