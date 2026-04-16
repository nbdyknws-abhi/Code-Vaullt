import { Problem } from '../../../types/problem';

export const mergeTwoSortedLists: Problem = {
  id: "merge-two-sorted-lists",
  title: "Merge Two Sorted Lists",
  difficulty: "Easy",
  topic: "Linked List",
  tags: ["linked-list","recursion"],
  prompt: "You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
  constraints: ["The number of nodes in both lists is in the range [0, 50].","-100 <= Node.val <= 100","Both list1 and list2 are sorted in non-decreasing order."],
  examples: [
  {
    "input": "list1 = [1,2,4], list2 = [1,3,4]",
    "output": "[1,1,2,3,4,4]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = ListNode()\n        tail = dummy\n        \n        while list1 and list2:\n            if list1.val < list2.val:\n                tail.next = list1\n                list1 = list1.next\n            else:\n                tail.next = list2\n                list2 = list2.next\n            tail = tail.next\n            \n        if list1:\n            tail.next = list1\n        elif list2:\n            tail.next = list2\n            \n        return dummy.next",
    "explanation": [
      "Create a dummy object ensuring code simplifies natively bypassing edge node configuration logic mapping.",
      "Compare respective heads attaching strictly the lesser node.",
      "Advance strictly the selected node variable mapped inside current operational chain sequences.",
      "Attach remaining trailing node segment bypassing iteration implicitly."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        ListNode dummy;\n        ListNode* tail = &dummy;\n        \n        while (list1 != nullptr && list2 != nullptr) {\n            if (list1->val < list2->val) {\n                tail->next = list1;\n                list1 = list1->next;\n            } else {\n                tail->next = list2;\n                list2 = list2->next;\n            }\n            tail = tail->next;\n        }\n        \n        if (list1 != nullptr) tail->next = list1;\n        if (list2 != nullptr) tail->next = list2;\n        \n        return dummy.next;\n    }\n};",
    "explanation": [
      "Instantiate dummy as local stack memory mapping safely circumventing pointer allocation crashes.",
      "Retain active mutable tail pointer referencing back appending addresses mapping lesser integers explicitly.",
      "Push boundaries checking native integer primitives linearly inside bounded linked conditions.",
      "Append single tail pointer unconditionally mapped correctly linking memory boundaries directly."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(-1);\n        ListNode current = dummy;\n        \n        while (list1 != null && list2 != null) {\n            if (list1.val <= list2.val) {\n                current.next = list1;\n                list1 = list1.next;\n            } else {\n                current.next = list2;\n                list2 = list2.next;\n            }\n            current = current.next;\n        }\n        \n        current.next = list1 == null ? list2 : list1;\n        return dummy.next;\n    }\n}",
    "explanation": [
      "Initialize a `dummy` node allowing clean linked returns mapping sequence iterations.",
      "Execute pointer modifications assigning `current.next` explicitly mapping list origins mapped strictly evaluating smaller properties natively.",
      "Handle disjoint termination implicitly linking remaining array object reference correctly extending chains fully.",
      "Return offset dummy element securely resolving true sequence head natively."
    ]
  }
],
  timeComplexity: "O(N + M)",
  spaceComplexity: "O(1)",
  edgeCases: ["One list empty","Both lists empty"]
};
