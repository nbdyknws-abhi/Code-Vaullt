import { Problem } from '../../../types/problem';

export const copyListWithRandomPointer: Problem = {
  id: "copy-list-with-random-pointer",
  title: "Copy List with Random Pointer",
  difficulty: "Medium",
  topic: "Linked List",
  tags: ["hash-table","linked-list"],
  prompt: "A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`.\n\nConstruct a deep copy of the list.",
  constraints: ["0 <= n <= 1000","-10^4 <= Node.val <= 10^4"],
  examples: [
  {
    "input": "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
    "output": "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
    "explanation": "Returns a deep complete object mapping identically cloned state values."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':\n        if not head:\n            return None\n            \n        curr = head\n        while curr:\n            new_node = Node(curr.val, curr.next)\n            curr.next = new_node\n            curr = new_node.next\n            \n        curr = head\n        while curr:\n            if curr.random:\n                curr.next.random = curr.random.next\n            curr = curr.next.next\n            \n        curr = head\n        dummy = Node(0)\n        copy_curr = dummy\n        while curr:\n            copy_curr.next = curr.next\n            curr.next = curr.next.next\n            copy_curr = copy_curr.next\n            curr = curr.next\n            \n        return dummy.next",
    "explanation": [
      "Inject explicit cloned nodes mapping logically interlaced elements cleanly.",
      "Correct completely mapped sequential object paths explicitly.",
      "Restore absolute references natively extracting independent chains dynamically bypassing object interference cleanly."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    Node* copyRandomList(Node* head) {\n        if (!head) return nullptr;\n        \n        Node* curr = head;\n        while (curr) {\n            Node* newNode = new Node(curr->val);\n            newNode->next = curr->next;\n            curr->next = newNode;\n            curr = newNode->next;\n        }\n        \n        curr = head;\n        while (curr) {\n            if (curr->random) {\n                curr->next->random = curr->random->next;\n            }\n            curr = curr->next->next;\n        }\n        \n        curr = head;\n        Node dummy(0);\n        Node* copyCurr = &dummy;\n        while (curr) {\n            copyCurr->next = curr->next;\n            curr->next = curr->next->next;\n            copyCurr = copyCurr->next;\n            curr = curr->next;\n        }\n        \n        return dummy.next;\n    }\n};",
    "explanation": [
      "Instantiate inline deep clone configurations natively.",
      "Leverage native pointers strictly parsing memory subsets linearly resolving explicitly.",
      "Return isolated explicit elements mapping correctly matching sequential states actively."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public Node copyRandomList(Node head) {\n        if (head == null) return null;\n        \n        Node curr = head;\n        while (curr != null) {\n            Node newNode = new Node(curr.val);\n            newNode.next = curr.next;\n            curr.next = newNode;\n            curr = newNode.next;\n        }\n        \n        curr = head;\n        while (curr != null) {\n            if (curr.random != null) {\n                curr.next.random = curr.random.next;\n            }\n            curr = curr.next.next;\n        }\n        \n        curr = head;\n        Node dummy = new Node(0);\n        Node copyCurr = dummy;\n        while (curr != null) {\n            copyCurr.next = curr.next;\n            curr.next = curr.next.next;\n            copyCurr = copyCurr.next;\n            curr = curr.next;\n        }\n        \n        return dummy.next;\n    }\n}",
    "explanation": [
      "Execute explicitly independent inline cloning algorithms securely.",
      "Manipulate deep object graphs accurately without independent arrays generating true inline resolution inherently mapped cleanly.",
      "Reconstitute distinct lists independently checking variables properly executing dynamically matched memory maps directly."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["No elements natively executing limits natively."]
};
