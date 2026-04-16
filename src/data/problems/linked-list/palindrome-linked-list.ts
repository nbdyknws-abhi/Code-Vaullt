import { Problem } from '../../../types/problem';

export const palindromeLinkedList: Problem = {
  id: "palindrome-linked-list",
  title: "Palindrome Linked List",
  difficulty: "Easy",
  topic: "Linked List",
  tags: ["linked-list","two-pointers","stack","recursion"],
  prompt: "Given the `head` of a singly linked list, return `true` if it is a palindrome or `false` otherwise.",
  constraints: ["The number of nodes in the list is in the range [1, 10^5].","0 <= Node.val <= 9"],
  examples: [
  {
    "input": "head = [1,2,2,1]",
    "output": "true"
  },
  {
    "input": "head = [1,2]",
    "output": "false"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def isPalindrome(self, head: Optional[ListNode]) -> bool:\n        fast = slow = head\n        while fast and fast.next:\n            fast = fast.next.next\n            slow = slow.next\n            \n        prev = None\n        while slow:\n            nxt = slow.next\n            slow.next = prev\n            prev = slow\n            slow = nxt\n            \n        left, right = head, prev\n        while right:\n            if left.val != right.val:\n                return False\n            left = left.next\n            right = right.next\n        return True",
    "explanation": [
      "Use fast/slow pointer method mapping sequential limits exactly at string midpoint naturally.",
      "Execute identical reversal algorithms mapping precisely across tail endpoints configuring natively sequentially.",
      "Compare independent pointers iterating from exact list ends securely verifying elements efficiently."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n        }\n        \n        ListNode* prev = nullptr;\n        while (slow) {\n            ListNode* nextNode = slow->next;\n            slow->next = prev;\n            prev = slow;\n            slow = nextNode;\n        }\n        \n        ListNode* left = head;\n        ListNode* right = prev;\n        while (right) {\n            if (left->val != right->val) return false;\n            left = left->next;\n            right = right->next;\n        }\n        return true;\n    }\n};",
    "explanation": [
      "Assess exact midpoint correctly mapping constraints executing pointers appropriately.",
      "Manipulate list structures natively overriding independent memory states mapping lists perfectly in O(1) space explicitly.",
      "Compare distinct states directly mapping logical limits matching natively returning strictly correct algorithms explicitly."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public boolean isPalindrome(ListNode head) {\n        ListNode slow = head;\n        ListNode fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        \n        ListNode prev = null;\n        while (slow != null) {\n            ListNode next = slow.next;\n            slow.next = prev;\n            prev = slow;\n            slow = next;\n        }\n        \n        ListNode p1 = head;\n        ListNode p2 = prev;\n        while (p2 != null) {\n            if (p1.val != p2.val) return false;\n            p1 = p1.next;\n            p2 = p2.next;\n        }\n        return true;\n    }\n}",
    "explanation": [
      "Allocate fast pointers iterating bounds generating exact array sub lists accurately.",
      "Reconstruct independent memory variables securely mapping nodes sequentially replacing pointers implicitly natively.",
      "Compare identical native integers safely looping independent sections sequentially terminating effectively."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Odd element chains","Single node"]
};
