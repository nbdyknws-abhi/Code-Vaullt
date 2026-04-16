import { Problem } from '../../../types/problem';

export const linkedListCycle: Problem = {
  id: "linked-list-cycle",
  title: "Linked List Cycle",
  difficulty: "Easy",
  topic: "Linked List",
  tags: ["hash-table","linked-list","two-pointers"],
  prompt: "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.",
  constraints: ["The number of the nodes in the list is in the range [0, 10^4].","-10^5 <= Node.val <= 10^5"],
  examples: [
  {
    "input": "head = [3,2,0,-4], pos = 1 (cycle exists)",
    "output": "true",
    "explanation": "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed)."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        slow, fast = head, head\n        \n        while fast and fast.next:\n            slow = slow.next\n            fast = fast.next.next\n            if slow == fast:\n                return True\n                \n        return False",
    "explanation": [
      "Initialize two pointers, `slow` and `fast`, to the head.",
      "Move `slow` one step and `fast` two steps at a time inside loop parameters.",
      "If there's a cycle, the `fast` pointer mapping correctly overlaps `slow` resulting identically validating loop cycles dynamically.",
      "If `fast` hits `None`, standard linear validation terminates establishing false correctness."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        ListNode* slow = head;\n        ListNode* fast = head;\n        \n        while (fast != NULL && fast->next != NULL) {\n            slow = slow->next;\n            fast = fast->next->next;\n            if (slow == fast) {\n                return true;\n            }\n        }\n        \n        return false;\n    }\n};",
    "explanation": [
      "Leverage Floyd's Cycle-Finding 'Tortoise and Hare' mathematical algorithm bounds.",
      "Check exact edge constraints preventing accidental memory leak faults explicitly utilizing standard NULL pointer bounds checking.",
      "Compare explicit memory addresses matching identity correctly determining linked overlap validity seamlessly."
    ]
  },
  {
    "language": "java",
    "code": "public class Solution {\n    public boolean hasCycle(ListNode head) {\n        if (head == null) return false;\n        ListNode slow = head;\n        ListNode fast = head;\n        \n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) {\n                return true;\n            }\n        }\n        return false;\n    }\n}",
    "explanation": [
      "Instantiate algorithm explicit edge limits validating initial mapping parameters correctly mapped bypassing loop constructs perfectly.",
      "Allocate independent variable references referencing explicit addresses natively.",
      "Evaluate boolean returns securely executing iterations terminating mapped correctly establishing linear versus cyclical boundary conditions."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Empty list","Single node no cycle"]
};
