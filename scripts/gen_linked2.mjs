import fs from 'fs';
import path from 'path';

const linkData = {
  "remove-nth-node-from-end-of-list": {
    title: "Remove Nth Node From End of List", difficulty: "Medium", topic: "Linked List", tags: ["linked-list", "two-pointers"],
    prompt: "Given the `head` of a linked list, remove the `n`th node from the end of the list and return its head.",
    constraints: ["The number of nodes in the list is sz.", "1 <= sz <= 30", "0 <= Node.val <= 100", "1 <= n <= sz"],
    examples: [{input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]", explanation: "The second node from the end is 4."}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["Removing the head node itself (n=size)"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        left = dummy
        right = head
        
        for _ in range(n):
            right = right.next
            
        while right:
            left = left.next
            right = right.next
            
        left.next = left.next.next
        return dummy.next`,
        explanation: ["Define a dummy node that points to head to handle edge cases like removing the single head.", "Space out the right pointer `n` steps ahead of the left pointer (which starts at dummy).", "Shift both pointers forward. When `right` reaches the end of the list, `left` will logically sit just before the target node.", "Skip the target directly linking `left.next` directly to `left.next.next`."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* slow = &dummy;
        ListNode* fast = &dummy;
        
        for (int i = 0; i <= n; i++) {
            fast = fast->next;
        }
        
        while (fast != nullptr) {
            slow = slow->next;
            fast = fast->next;
        }
        
        ListNode* toDelete = slow->next;
        slow->next = slow->next->next;
        delete toDelete;
        
        return dummy.next;
    }
};`,
        explanation: ["Use two pointers starting at a dummy node initialized natively.", "Pace the `fast` pointer precisely `n + 1` steps ahead.", "Move iteratively inside bounds until `fast` triggers null terminators.", "Correctly mutate memory removing node and specifically executing native `delete` to prevent system leaks gracefully."]
      },
      {
        language: "java",
        code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode first = dummy;
        ListNode second = dummy;

        for (int i = 1; i <= n + 1; i++) {
            first = first.next;
        }

        while (first != null) {
            first = first.next;
            second = second.next;
        }

        second.next = second.next.next;
        return dummy.next;
    }
}`,
        explanation: ["Initialize a `dummy` node setting next configuration to `head` safely wrapping list deletion edge cases.", "Displace a `first` pointer iteratively `n+1` times.", "Progress simultaneously across remaining list mapping sequence loop.", "Erase referencing logic exclusively letting native Garbage Collection map removed memory optimally."]
      }
    ]
  },
  "intersection-of-two-linked-lists": {
    title: "Intersection of Two Linked Lists", difficulty: "Easy", topic: "Linked List", tags: ["hash-table", "linked-list", "two-pointers"],
    prompt: "Given the heads of two singly linked-lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return `null`.",
    constraints: ["The number of nodes of listA is in the m.", "The number of nodes of listB is in the n.", "1 <= m, n <= 3 * 10^4", "1 <= Node.val <= 10^5", "0 <= skipA < m", "0 <= skipB < n"],
    examples: [{input: "intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]", output: "Intersected at '8'", explanation: "The intersected node's value is 8 (note that this must not be 0 if the two lists intersect)."}],
    timeComplexity: "O(N + M)", spaceComplexity: "O(1)", edgeCases: ["No intersection", "One list traverses full subset"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        if not headA or not headB:
            return None
            
        pa, pb = headA, headB
        
        while pa is not pb:
            pa = headB if pa is None else pa.next
            pb = headA if pb is None else pb.next
            
        return pa`,
        explanation: ["Set explicit pointers for each distinct list object natively.", "Loop recursively until matching exact intersection identical memory objects.", "Crucial Optimization: If a pointer reaches the end, map it identically to the other list's Head.", "This implicitly creates identical run distances mapped out guaranteeing overlapping objects natively."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (!headA || !headB) return nullptr;
        ListNode *a = headA, *b = headB;
        while (a != b) {
            a = a ? a->next : headB;
            b = b ? b->next : headA;
        }
        return a;
    }
};`,
        explanation: ["Validate baseline null headers restricting algorithm run states cleanly.", "Design linear loops explicitly verifying pointers mathematically.", "Reassign completed linked subsets traversing opposite arrays mitigating unbalanced length deviations natively.", "Return identical referenced variable natively mapped identical memory bounds."]
      },
      {
        language: "java",
        code: `public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;
        
        ListNode a = headA;
        ListNode b = headB;
        
        while (a != b) {
            a = (a == null) ? headB : (a.next);
            b = (b == null) ? headA : (b.next);
        }
        
        return a;
    }
}`,
        explanation: ["Null parameters establish clean break cases instantly.", "Instantiate discrete tracing logic sequentially mapping memory objects iteratively.", "Translate independent list sizes natively running cross list traversals.", "Intersect precisely mapping identity instances exactly over mapped sequence limits."]
      }
    ]
  },
  "add-two-numbers": {
    title: "Add Two Numbers", difficulty: "Medium", topic: "Linked List", tags: ["linked-list", "math"],
    prompt: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    constraints: ["The number of nodes in each linked list is in the range [1, 100].", "0 <= Node.val <= 9", "It is guaranteed that the list represents a number that does not have leading zeros."],
    examples: [{input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807."}],
    timeComplexity: "O(max(N, M))", spaceComplexity: "O(max(N, M))", edgeCases: ["Unequal lengths", "Final carry"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        curr = dummy
        carry = 0
        
        while l1 or l2 or carry:
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0
            
            total = val1 + val2 + carry
            carry = total // 10
            val = total % 10
            
            curr.next = ListNode(val)
            curr = curr.next
            
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
            
        return dummy.next`,
        explanation: ["Construct dummy nodes simplifying start references mapped explicitly.", "Iterate uniformly extracting node integer states dynamically providing fallback zero arrays natively.", "Calculate internal arithmetic aggregating carries tracking native floor divisions natively.", "Push generated single digits resolving mapped list nodes cleanly appending results iteratively."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* current = &dummy;
        int carry = 0;
        
        while (l1 != nullptr || l2 != nullptr || carry != 0) {
            int val1 = (l1 != nullptr) ? l1->val : 0;
            int val2 = (l2 != nullptr) ? l2->val : 0;
            
            int sum = val1 + val2 + carry;
            carry = sum / 10;
            current->next = new ListNode(sum % 10);
            
            current = current->next;
            if (l1 != nullptr) l1 = l1->next;
            if (l2 != nullptr) l2 = l2->next;
        }
        
        return dummy.next;
    }
};`,
        explanation: ["Execute logic parsing native linked blocks aggregating memory sequences correctly mapped natively.", "Loop until total structure and arithmetic carry configurations are comprehensively verified linearly.", "Calculate module constraints binding sequence primitives accurately tracking state transfers.", "Generate runtime mapped node memory effectively capturing array configurations properly mapped statically."]
      },
      {
        language: "java",
        code: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummyHead = new ListNode(0);
        ListNode current = dummyHead;
        int carry = 0;
        
        while (l1 != null || l2 != null || carry != 0) {
            int x = (l1 != null) ? l1.val : 0;
            int y = (l2 != null) ? l2.val : 0;
            int sum = carry + x + y;
            carry = sum / 10;
            current.next = new ListNode(sum % 10);
            current = current.next;
            
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        
        return dummyHead.next;
    }
}`,
        explanation: ["Deploy mapped list configurations mapping sequential operations directly using objects inherently.", "Configure arithmetic limits sequentially bypassing loop discrepancies tracking object allocations securely.", "Sum integers executing simple division offsets binding next arrays structurally integrating mapping.", "Validate loop constraints appending state natively resolving mapped elements efficiently."]
      }
    ]
  }
};

const targetDir = path.join(process.cwd(), 'src', 'data', 'problems', 'linked-list');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

Object.keys(linkData).forEach(id => {
  const data = linkData[id];
  let varName = id.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
  if (/^[0-9]/.test(varName)) varName = '_' + varName;

  const content = `import { Problem } from '../../../types/problem';

export const ${varName}: Problem = {
  id: "${id}",
  title: "${data.title}",
  difficulty: "${data.difficulty}",
  topic: "${data.topic}",
  tags: ${JSON.stringify(data.tags)},
  prompt: ${JSON.stringify(data.prompt)},
  constraints: ${JSON.stringify(data.constraints)},
  examples: ${JSON.stringify(data.examples, null, 2)},
  solutions: ${JSON.stringify(data.solutions, null, 2)},
  timeComplexity: "${data.timeComplexity}",
  spaceComplexity: "${data.spaceComplexity}",
  edgeCases: ${JSON.stringify(data.edgeCases)}
};
`;
  fs.writeFileSync(path.join(targetDir, `${id}.ts`), content);
});

console.log("Written linked list problems part 2.");
