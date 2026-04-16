import { Problem } from '../../../types/problem';

export const reverseLinkedList: Problem = {
  id: "reverse-linked-list",
  title: "Reverse Linked List",
  difficulty: "Easy",
  topic: "Linked List",
  tags: ["linked-list","recursion"],
  prompt: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
  constraints: ["The number of nodes in the list is the range [0, 5000].","-5000 <= Node.val <= 5000"],
  examples: [
  {
    "input": "head = [1,2,3,4,5]",
    "output": "[5,4,3,2,1]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        prev = None\n        current = head\n        while current:\n            next_node = current.next\n            current.next = prev\n            prev = current\n            current = next_node\n        return prev",
    "explanation": [
      "Use two pointers: `prev` initialized to None and `current` initialized to head.",
      "Iterate through the list. In each step, temporarily store the next node.",
      "Update the current node's next pointer to point backward to `prev`.",
      "Move both `prev` and `current` one step forward. `prev` becomes the new head at the end."
    ]
  },
  {
    "language": "cpp",
    "code": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* current = head;\n        while (current != nullptr) {\n            ListNode* nextNode = current->next;\n            current->next = prev;\n            prev = current;\n            current = nextNode;\n        }\n        return prev;\n    }\n};",
    "explanation": [
      "Define `prev` as a pointer to null and `current` pointing to the head.",
      "Traverse as long as current is not dynamically mapped to nullptr.",
      "Store `current->next` to prevent losing the chain.",
      "Redirect current's pointer towards `prev`, then increment `prev` and `current` sequentially."
    ]
  },
  {
    "language": "java",
    "code": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode current = head;\n        while (current != null) {\n            ListNode nextTemp = current.next;\n            current.next = prev;\n            prev = current;\n            current = nextTemp;\n        }\n        return prev;\n    }\n}",
    "explanation": [
      "Identify standard linked list node traversal architecture.",
      "Hold a temporary reference to the 'next' attribute to secure data retention iteratively.",
      "Flip object linkage sequentially moving nulls to tails and tail node configurations safely backward toward head return signatures.",
      "Return the `prev` reference marking the new head sequence."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["Empty list","Single node"]
};
