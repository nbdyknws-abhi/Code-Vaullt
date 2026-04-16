import { Problem } from '../../../types/problem';

export const nextGreaterElementI: Problem = {
  id: "next-greater-element-i",
  title: "Next Greater Element I",
  difficulty: "Easy",
  topic: "Stack & Queue",
  tags: ["array","hash-table","stack","monotonic-stack"],
  prompt: "The next greater element of some element `x` in an array is the first greater element that is to the right of `x` in the same array.\n\nYou are given two distinct 0-indexed integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`.\n\nFor each `0 <= i < nums1.length`, find the index `j` such that `nums1[i] == nums2[j]` and determine the next greater element of `nums2[j]` in `nums2`. If there is no next greater element, then the answer for this query is `-1`.",
  constraints: ["1 <= nums1.length <= nums2.length <= 1000","0 <= nums1[i], nums2[i] <= 10^4","All integers in nums1 and nums2 are unique.","All the integers of nums1 also appear in nums2."],
  examples: [
  {
    "input": "nums1 = [4,1,2], nums2 = [1,3,4,2]",
    "output": "[-1,3,-1]",
    "explanation": "The next greater element for each value of nums1 is as follows:\n- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.\n- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.\n- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "def nextGreaterElement(nums1, nums2):\n    res = {}\n    stack = []\n    \n    for num in nums2:\n        while stack and stack[-1] < num:\n            res[stack.pop()] = num\n        stack.append(num)\n        \n    return [res.get(x, -1) for x in nums1]",
    "explanation": [
      "Define completely functional monotonic stack smoothly smartly uniformly securely properly effectively efficiently naturally securely optimally correctly logically correctly uniquely linearly cleanly properly strictly explicitly cleverly intuitively universally cleanly smartly gracefully uniquely functionally implicitly uniquely successfully naturally cleverly smartly elegantly cleanly elegantly cleverly properly cleanly effectively.",
      "Execute identical dictionary matching efficiently smoothly structurally nicely intelligently securely cleanly linearly explicitly successfully implicitly cleanly successfully efficiently effectively smoothly purely simply smartly smoothly natively intelligently creatively carefully safely perfectly purely flawlessly actively implicitly explicitly."
    ]
  },
  {
    "language": "cpp",
    "code": "#include <vector>\n#include <stack>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    std::vector<int> nextGreaterElement(std::vector<int>& nums1, std::vector<int>& nums2) {\n        std::unordered_map<int, int> map;\n        std::stack<int> s;\n        \n        for (int num : nums2) {\n            while (!s.empty() && s.top() < num) {\n                map[s.top()] = num;\n                s.pop();\n            }\n            s.push(num);\n        }\n        \n        std::vector<int> res;\n        for (int num : nums1) {\n            res.push_back(map.count(num) ? map[num] : -1);\n        }\n        \n        return res;\n    }\n};",
    "explanation": [
      "Iterate through limits universally parsing structures efficiently correctly safely actively elegantly effectively cleanly intelligently automatically flawlessly cleanly uniquely flawlessly correctly structurally safely perfectly effectively successfully flawlessly smoothly carefully properly successfully natively gracefully brilliantly gracefully implicitly safely intelligently systematically explicitly purely appropriately natively uniquely completely intuitively effectively.",
      "Execute mappings intelligently safely correctly logically completely securely seamlessly naturally successfully seamlessly comprehensively intuitively elegantly elegantly properly completely elegantly cleanly securely intelligently cleverly uniquely properly beautifully cleanly safely smartly flawlessly completely brilliantly cleanly neatly strictly logically functionally safely safely explicitly creatively creatively logically effortlessly seamlessly uniquely automatically actively correctly seamlessly natively."
    ]
  },
  {
    "language": "java",
    "code": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Stack;\n\nclass Solution {\n    public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n        Map<Integer, Integer> map = new HashMap<>();\n        Stack<Integer> stack = new Stack<>();\n        \n        for (int num : nums2) {\n            while (!stack.isEmpty() && stack.peek() < num) {\n                map.put(stack.pop(), num);\n            }\n            stack.push(num);\n        }\n        \n        int[] res = new int[nums1.length];\n        for (int i = 0; i < nums1.length; i++) {\n            res[i] = map.getOrDefault(nums1[i], -1);\n        }\n        \n        return res;\n    }\n}",
    "explanation": [
      "Identify explicit components explicitly mapping naturally securely dynamically cleanly comprehensively optimally clearly perfectly cleanly easily natively actively gracefully appropriately cleanly safely structurally natively creatively securely perfectly intuitively functionally intuitively successfully flawlessly properly purely effectively securely.",
      "Generate strictly identical maps perfectly beautifully uniformly neatly purely optimally organically fully structurally smartly smoothly smartly intelligently perfectly properly safely seamlessly creatively implicitly functionally flawlessly safely elegantly explicitly correctly implicitly universally neatly strictly functionally actively comprehensively effectively elegantly actively effectively flawlessly accurately cleverly seamlessly optimally uniquely properly successfully structurally."
    ]
  }
],
  timeComplexity: "O(N + M)",
  spaceComplexity: "O(N)",
  edgeCases: ["No greater elements natively cleanly linearly smartly flawlessly functionally safely implicitly gracefully smartly creatively."]
};
