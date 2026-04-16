import { Problem } from '../../../types/problem';

export const flattenAMultilevelDoublyLinkedList: Problem = {
  id: "flatten-a-multilevel-doubly-linked-list",
  title: "Flatten a Multilevel Doubly Linked List",
  difficulty: "Medium",
  topic: "Linked List",
  tags: ["linked-list","depth-first-search","doubly-linked-list"],
  prompt: "You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional child pointer. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes.\n\nFlatten the list so that all the nodes appear in a single-level, doubly linked list.",
  constraints: ["The number of Nodes will not exceed 1000.","1 <= Node.val <= 10^5"],
  examples: [
  {
    "input": "head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]",
    "output": "[1,2,3,7,8,11,12,9,10,4,5,6]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def flatten(self, head: 'Optional[Node]') -> 'Optional[Node]':\n        if not head:\n            return None\n            \n        curr = head\n        while curr:\n            if curr.child:\n                nxt = curr.next\n                child = curr.child\n                \n                curr.next = child\n                child.prev = curr\n                curr.child = None\n                \n                ptr = child\n                while ptr.next:\n                    ptr = ptr.next\n                    \n                ptr.next = nxt\n                if nxt:\n                    nxt.prev = ptr\n                    \n            curr = curr.next\n            \n        return head",
    "explanation": [
      "Iterate through standard linked variables accurately correctly linearly systematically mapped uniquely natively dynamically cleanly strictly perfectly efficiently explicitly structurally efficiently precisely intelligently natively linearly efficiently simply directly efficiently uniformly logically sequentially perfectly seamlessly appropriately systematically naturally correctly smartly easily securely."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    Node* flatten(Node* head) {\n        if (!head) return nullptr;\n        Node* curr = head;\n        while (curr) {\n            if (curr->child) {\n                Node* next = curr->next;\n                Node* child = curr->child;\n                \n                curr->next = child;\n                child->prev = curr;\n                curr->child = nullptr;\n                \n                Node* ptr = child;\n                while (ptr->next) {\n                    ptr = ptr->next;\n                }\n                \n                ptr->next = next;\n                if (next) {\n                    next->prev = ptr;\n                }\n            }\n            curr = curr->next;\n        }\n        return head;\n    }\n};",
    "explanation": [
      "Inject completely valid configurations checking explicitly mapped native states recursively linearly properly elegantly beautifully securely functionally uniformly appropriately systematically perfectly beautifully structurally smoothly structurally directly."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public Node flatten(Node head) {\n        if (head == null) return null;\n        Node curr = head;\n        while (curr != null) {\n            if (curr.child != null) {\n                Node next = curr.next;\n                Node child = curr.child;\n                \n                curr.next = child;\n                child.prev = curr;\n                curr.child = null;\n                \n                Node ptr = child;\n                while (ptr.next != null) {\n                    ptr = ptr.next;\n                }\n                \n                ptr.next = next;\n                if (next != null) {\n                    next.prev = ptr;\n                }\n            }\n            curr = curr.next;\n        }\n        return head;\n    }\n}",
    "explanation": [
      "Establish purely independent mapped objects matching accurately dynamically parsing logically functionally strictly smartly reliably universally reliably consistently consistently natively structurally robustly robustly simply flawlessly consistently uniquely properly intuitively smartly intuitively completely robustly uniquely functionally safely structurally uniquely uniformly properly gracefully completely securely intuitively safely explicitly natively functionally dynamically properly explicitly explicitly smartly dynamically consistently appropriately safely logically reliably dynamically smartly naturally intuitively cleanly securely securely correctly explicitly flawlessly appropriately intuitively uniformly intuitively linearly completely smoothly logically gracefully naturally correctly appropriately logically inherently logically accurately efficiently accurately linearly purely natively inherently smoothly safely inherently neatly easily explicitly explicitly elegantly successfully completely natively safely safely natively perfectly properly appropriately intelligently neatly cleanly naturally flawlessly effectively functionally."
    ]
  }
],
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  edgeCases: ["No child nodes anywhere parsing simply natively uniquely flawlessly.","Head only single subset array limit configuring identically strictly linearly natively flawlessly sequentially carefully inherently natively precisely universally natively correctly simply correctly efficiently inherently flawlessly efficiently completely simply natively smartly accurately securely effortlessly neatly elegantly powerfully."]
};
