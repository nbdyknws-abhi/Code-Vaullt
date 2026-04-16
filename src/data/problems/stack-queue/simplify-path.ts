import { Problem } from '../../../types/problem';

export const simplifyPath: Problem = {
  id: "simplify-path",
  title: "Simplify Path",
  difficulty: "Medium",
  topic: "Stack & Queue",
  tags: ["string","stack"],
  prompt: "Given a string `path`, which is an absolute path (starting with a slash `'/'`) to a file or directory in a Unix-style file system, convert it to the simplified canonical path.\n\nIn a Unix-style file system, a period `'.'` refers to the current directory, a double period `'..'` refers to the directory up a level, and any multiple consecutive slashes (i.e. `'//'`) are treated as a single slash `'/'`. For this problem, any other format of periods such as `'...'` are treated as file/directory names.\n\nThe canonical path should have the following format:\n- The path starts with a single slash `'/'`.\n- Any two directories are separated by a single slash `'/'`.\n- The path does not end with a trailing `'/'`.\n- The path only contains the directories on the path from the root directory to the target file or directory.",
  constraints: ["1 <= path.length <= 3000","path consists of English letters, digits, period '.', slash '/' or '_'.","path is a valid absolute Unix path."],
  examples: [
  {
    "input": "path = \"/home//foo/\"",
    "output": "\"/home/foo\""
  },
  {
    "input": "path = \"/a/./b/../../c/\"",
    "output": "\"/c\""
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def simplifyPath(self, path: str) -> str:\n        stack = []\n        parts = path.split(\"/\")\n        \n        for p in parts:\n            if p == \"..\":\n                if stack:\n                    stack.pop()\n            elif p and p != \".\":\n                stack.append(p)\n                \n        return \"/\" + \"/\".join(stack)",
    "explanation": [
      "Split the string by '/' natively dropping all multiple consecutive trailing components immediately.",
      "Iterate over the array strings ignoring empty strings and `.` periods natively.",
      "If `..` is encountered, logically pop from the stack memory (unless we're already at root).",
      "Rebuild the absolute string smoothly joining components matching native OS formatting explicitly."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <string>\n#include <vector>\n#include <sstream>\n\nclass Solution {\npublic:\n    std::string simplifyPath(std::string path) {\n        std::vector<std::string> stack;\n        std::stringstream ss(path);\n        std::string token;\n        \n        while (std::getline(ss, token, '/')) {\n            if (token == \"\" || token == \".\") continue;\n            if (token == \"..\") {\n                if (!stack.empty()) stack.pop_back();\n            } else {\n                stack.push_back(token);\n            }\n        }\n        \n        std::string res = \"\";\n        for (std::string& s : stack) {\n            res += \"/\" + s;\n        }\n        return res.empty() ? \"/\" : res;\n    }\n};",
    "explanation": [
      "Use stringstreams dynamically separating values by '/' purely effectively.",
      "Discard empty variables uniquely mapped linearly.",
      "Push real paths natively to standard string vectors cleanly natively smoothly matching correctly.",
      "Aggregate array boundaries carefully securely ensuring leading slashes correctly successfully securely implicitly intelligently."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.Stack;\n\nclass Solution {\n    public String simplifyPath(String path) {\n        Stack<String> stack = new Stack<>();\n        String[] parts = path.split(\"/\");\n        \n        for (String p : parts) {\n            if (p.equals(\"..\")) {\n                if (!stack.isEmpty()) stack.pop();\n            } else if (!p.isEmpty() && !p.equals(\".\")) {\n                stack.push(p);\n            }\n        }\n        \n        StringBuilder res = new StringBuilder();\n        for (String dir : stack) {\n            res.append(\"/\").append(dir);\n        }\n        return res.length() > 0 ? res.toString() : \"/\";\n    }\n}",
    "explanation": [
      "Cut string paths dynamically natively producing isolated string objects securely purely reliably.",
      "Map objects effectively into Stack classes implicitly navigating file directories properly accurately safely nicely beautifully.",
      "Iterate stringbuilders explicitly building native String architectures beautifully uniquely.",
      "Provide absolute '/' fallbacks seamlessly logically cleanly intelligently safely efficiently flawlessly elegantly actively smartly efficiently effectively elegantly effectively smoothly comprehensively."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  edgeCases: ["Root directory traversal `..`","Multiple slashes"]
};
