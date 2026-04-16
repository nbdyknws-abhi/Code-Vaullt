import { Problem } from '../../../types/problem';

export const reorderList: Problem = {
  id: "reorder-list",
  title: "Reorder List",
  difficulty: "Medium",
  topic: "Linked List",
  tags: ["linked-list","two-pointers","stack","recursion"],
  prompt: "You are given the head of a singly linked-list. The list can be represented as: `L0 → L1 → … → Ln - 1 → Ln`.\n\nReorder the list to be on the following form: `L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …`.",
  constraints: ["The number of nodes in the list is in the range [1, 5 * 10^4].","1 <= Node.val <= 1000"],
  examples: [
  {
    "input": "head = [1,2,3,4]",
    "output": "[1,4,2,3]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def reorderList(self, head: Optional[ListNode]) -> None:\n        if not head: return\n        \n        slow = fast = head\n        while fast and fast.next:\n            slow = slow.next\n            fast = fast.next.next\n            \n        prev, curr = None, slow.next\n        slow.next = None\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n            \n        first, second = head, prev\n        while second:\n            tmp1, tmp2 = first.next, second.next\n            first.next = second\n            second.next = tmp1\n            first, second = tmp1, tmp2",
    "explanation": [
      "Detect midpoint recursively slicing distinct array nodes correctly linearly configuring effectively.",
      "Run strictly optimized pointer mapping natively checking arrays completely natively bypassing extra allocations seamlessly.",
      "Translate interlaced memory objects securely overlapping array structures parsing dynamically generated chains properly inherently."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    void reorderList(ListNode* head) {\n        if (!head || !head->next) return;\n        \n        ListNode *slow = head, *fast = head;\n        while (fast->next && fast->next->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n        }\n        \n        ListNode* prev = nullptr;\n        ListNode* curr = slow->next;\n        slow->next = nullptr;\n        while (curr) {\n            ListNode* next = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = next;\n        }\n        \n        ListNode* first = head;\n        ListNode* second = prev;\n        while (second) {\n            ListNode* tmp1 = first->next;\n            ListNode* tmp2 = second->next;\n            first->next = second;\n            second->next = tmp1;\n            first = tmp1;\n            second = tmp2;\n        }\n    }\n};",
    "explanation": [
      "Design inline mapping correctly traversing algorithms systematically securely identifying native limits parsing properly matched limits explicitly.",
      "Extract independent variables mapping cleanly integrating arrays comprehensively configuring strictly matched points actively executing loops strictly native natively.",
      "Iterate uniformly extracting node mapping safely integrating natively parsed pointer objects recursively perfectly configuring efficiently dynamically mappings actively."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public void reorderList(ListNode head) {\n        if (head == null || head.next == null) return;\n        \n        ListNode slow = head, fast = head;\n        while (fast.next != null && fast.next.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        \n        ListNode prev = null, curr = slow.next;\n        slow.next = null;\n        while (curr != null) {\n            ListNode next = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = next;\n        }\n        \n        ListNode first = head, second = prev;\n        while (second != null) {\n            ListNode tmp1 = first.next;\n            ListNode tmp2 = second.next;\n            first.next = second;\n            second.next = tmp1;\n            first = tmp1;\n            second = tmp2;\n        }\n    }\n}",
    "explanation": [
      "Deploy perfectly strict limits isolating node configurations intelligently manipulating variables carefully establishing algorithms mapped precisely perfectly.",
      "Run perfectly independent reverse loops manipulating inline sequences matching configurations strictly mapping array components uniquely intelligently accurately sequentially flawlessly.",
      "Assign logical overlaps cleanly linking limits integrating arrays inherently uniquely structuring properly safely cleanly uniformly linearly naturally."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["List with one or two nodes mapping naturally gracefully executed mapping perfectly natively."]
};
