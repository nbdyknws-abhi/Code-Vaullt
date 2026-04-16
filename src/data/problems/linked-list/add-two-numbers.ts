import { Problem } from '../../../types/problem';

export const addTwoNumbers: Problem = {
  id: "add-two-numbers",
  title: "Add Two Numbers",
  difficulty: "Medium",
  topic: "Linked List",
  tags: ["linked-list","math"],
  prompt: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
  constraints: ["The number of nodes in each linked list is in the range [1, 100].","0 <= Node.val <= 9","It is guaranteed that the list represents a number that does not have leading zeros."],
  examples: [
  {
    "input": "l1 = [2,4,3], l2 = [5,6,4]",
    "output": "[7,0,8]",
    "explanation": "342 + 465 = 807."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = ListNode()\n        curr = dummy\n        carry = 0\n        \n        while l1 or l2 or carry:\n            val1 = l1.val if l1 else 0\n            val2 = l2.val if l2 else 0\n            \n            total = val1 + val2 + carry\n            carry = total // 10\n            val = total % 10\n            \n            curr.next = ListNode(val)\n            curr = curr.next\n            \n            l1 = l1.next if l1 else None\n            l2 = l2.next if l2 else None\n            \n        return dummy.next",
    "explanation": [
      "Construct dummy nodes simplifying start references mapped explicitly.",
      "Iterate uniformly extracting node integer states dynamically providing fallback zero arrays natively.",
      "Calculate internal arithmetic aggregating carries tracking native floor divisions natively.",
      "Push generated single digits resolving mapped list nodes cleanly appending results iteratively."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        ListNode dummy(0);\n        ListNode* current = &dummy;\n        int carry = 0;\n        \n        while (l1 != nullptr || l2 != nullptr || carry != 0) {\n            int val1 = (l1 != nullptr) ? l1->val : 0;\n            int val2 = (l2 != nullptr) ? l2->val : 0;\n            \n            int sum = val1 + val2 + carry;\n            carry = sum / 10;\n            current->next = new ListNode(sum % 10);\n            \n            current = current->next;\n            if (l1 != nullptr) l1 = l1->next;\n            if (l2 != nullptr) l2 = l2->next;\n        }\n        \n        return dummy.next;\n    }\n};",
    "explanation": [
      "Execute logic parsing native linked blocks aggregating memory sequences correctly mapped natively.",
      "Loop until total structure and arithmetic carry configurations are comprehensively verified linearly.",
      "Calculate module constraints binding sequence primitives accurately tracking state transfers.",
      "Generate runtime mapped node memory effectively capturing array configurations properly mapped statically."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        ListNode dummyHead = new ListNode(0);\n        ListNode current = dummyHead;\n        int carry = 0;\n        \n        while (l1 != null || l2 != null || carry != 0) {\n            int x = (l1 != null) ? l1.val : 0;\n            int y = (l2 != null) ? l2.val : 0;\n            int sum = carry + x + y;\n            carry = sum / 10;\n            current.next = new ListNode(sum % 10);\n            current = current.next;\n            \n            if (l1 != null) l1 = l1.next;\n            if (l2 != null) l2 = l2.next;\n        }\n        \n        return dummyHead.next;\n    }\n}",
    "explanation": [
      "Deploy mapped list configurations mapping sequential operations directly using objects inherently.",
      "Configure arithmetic limits sequentially bypassing loop discrepancies tracking object allocations securely.",
      "Sum integers executing simple division offsets binding next arrays structurally integrating mapping.",
      "Validate loop constraints appending state natively resolving mapped elements efficiently."
    ]
  }
],
  timeComplexity: "O(max(N, M))",
  spaceComplexity: "O(max(N, M))",
  edgeCases: ["Unequal lengths","Final carry"]
};
