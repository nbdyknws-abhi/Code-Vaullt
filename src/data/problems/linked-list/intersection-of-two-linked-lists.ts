import { Problem } from '../../../types/problem';

export const intersectionOfTwoLinkedLists: Problem = {
  id: "intersection-of-two-linked-lists",
  title: "Intersection of Two Linked Lists",
  difficulty: "Easy",
  topic: "Linked List",
  tags: ["hash-table","linked-list","two-pointers"],
  prompt: "Given the heads of two singly linked-lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return `null`.",
  constraints: ["The number of nodes of listA is in the m.","The number of nodes of listB is in the n.","1 <= m, n <= 3 * 10^4","1 <= Node.val <= 10^5","0 <= skipA < m","0 <= skipB < n"],
  examples: [
  {
    "input": "intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]",
    "output": "Intersected at '8'",
    "explanation": "The intersected node's value is 8 (note that this must not be 0 if the two lists intersect)."
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:\n        if not headA or not headB:\n            return None\n            \n        pa, pb = headA, headB\n        \n        while pa is not pb:\n            pa = headB if pa is None else pa.next\n            pb = headA if pb is None else pb.next\n            \n        return pa",
    "explanation": [
      "Set explicit pointers for each distinct list object natively.",
      "Loop recursively until matching exact intersection identical memory objects.",
      "Crucial Optimization: If a pointer reaches the end, map it identically to the other list's Head.",
      "This implicitly creates identical run distances mapped out guaranteeing overlapping objects natively."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\n        if (!headA || !headB) return nullptr;\n        ListNode *a = headA, *b = headB;\n        while (a != b) {\n            a = a ? a->next : headB;\n            b = b ? b->next : headA;\n        }\n        return a;\n    }\n};",
    "explanation": [
      "Validate baseline null headers restricting algorithm run states cleanly.",
      "Design linear loops explicitly verifying pointers mathematically.",
      "Reassign completed linked subsets traversing opposite arrays mitigating unbalanced length deviations natively.",
      "Return identical referenced variable natively mapped identical memory bounds."
    ]
  },
  {
    "language": "java",
    "code": "public class Solution {\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n        if (headA == null || headB == null) return null;\n        \n        ListNode a = headA;\n        ListNode b = headB;\n        \n        while (a != b) {\n            a = (a == null) ? headB : (a.next);\n            b = (b == null) ? headA : (b.next);\n        }\n        \n        return a;\n    }\n}",
    "explanation": [
      "Null parameters establish clean break cases instantly.",
      "Instantiate discrete tracing logic sequentially mapping memory objects iteratively.",
      "Translate independent list sizes natively running cross list traversals.",
      "Intersect precisely mapping identity instances exactly over mapped sequence limits."
    ]
  }
],
  timeComplexity: "O(N + M)",
  spaceComplexity: "O(1)",
  edgeCases: ["No intersection","One list traverses full subset"]
};
