import { Problem } from '../../../types/problem';

export const removeNthNodeFromEndOfList: Problem = {
  id: "remove-nth-node-from-end-of-list",
  title: "Remove Nth Node From End of List",
  difficulty: "Medium",
  topic: "Linked List",
  tags: ["linked-list","two-pointers"],
  prompt: "Given the `head` of a linked list, remove the `n`th node from the end of the list and return its head.",
  constraints: ["The number of nodes in the list is sz.","1 <= sz <= 30","0 <= Node.val <= 100","1 <= n <= sz"],
  examples: [
  {
    "input": "head = [1,2,3,4,5], n = 2",
    "output": "[1,2,3,5]",
    "explanation": "The second node from the end is 4."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        dummy = ListNode(0, head)\n        left = dummy\n        right = head\n        \n        for _ in range(n):\n            right = right.next\n            \n        while right:\n            left = left.next\n            right = right.next\n            \n        left.next = left.next.next\n        return dummy.next",
    "explanation": [
      "Define a dummy node that points to head to handle edge cases like removing the single head.",
      "Space out the right pointer `n` steps ahead of the left pointer (which starts at dummy).",
      "Shift both pointers forward. When `right` reaches the end of the list, `left` will logically sit just before the target node.",
      "Skip the target directly linking `left.next` directly to `left.next.next`."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        ListNode dummy(0);\n        dummy.next = head;\n        ListNode* slow = &dummy;\n        ListNode* fast = &dummy;\n        \n        for (int i = 0; i <= n; i++) {\n            fast = fast->next;\n        }\n        \n        while (fast != nullptr) {\n            slow = slow->next;\n            fast = fast->next;\n        }\n        \n        ListNode* toDelete = slow->next;\n        slow->next = slow->next->next;\n        delete toDelete;\n        \n        return dummy.next;\n    }\n};",
    "explanation": [
      "Use two pointers starting at a dummy node initialized natively.",
      "Pace the `fast` pointer precisely `n + 1` steps ahead.",
      "Move iteratively inside bounds until `fast` triggers null terminators.",
      "Correctly mutate memory removing node and specifically executing native `delete` to prevent system leaks gracefully."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode first = dummy;\n        ListNode second = dummy;\n\n        for (int i = 1; i <= n + 1; i++) {\n            first = first.next;\n        }\n\n        while (first != null) {\n            first = first.next;\n            second = second.next;\n        }\n\n        second.next = second.next.next;\n        return dummy.next;\n    }\n}",
    "explanation": [
      "Initialize a `dummy` node setting next configuration to `head` safely wrapping list deletion edge cases.",
      "Displace a `first` pointer iteratively `n+1` times.",
      "Progress simultaneously across remaining list mapping sequence loop.",
      "Erase referencing logic exclusively letting native Garbage Collection map removed memory optimally."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Removing the head node itself (n=size)"]
};
