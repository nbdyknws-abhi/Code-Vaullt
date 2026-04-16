import fs from 'fs';
import path from 'path';

const linkData = {
  "reverse-linked-list": {
    title: "Reverse Linked List", difficulty: "Easy", topic: "Linked List", tags: ["linked-list", "recursion"],
    prompt: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"],
    examples: [{input: 'head = [1,2,3,4,5]', output: "[5,4,3,2,1]"}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["Empty list", "Single node"],
    solutions: [
      {
        language: "python",
        code: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        current = head
        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        return prev`,
        explanation: ["Use two pointers: `prev` initialized to None and `current` initialized to head.", "Iterate through the list. In each step, temporarily store the next node.", "Update the current node's next pointer to point backward to `prev`.", "Move both `prev` and `current` one step forward. `prev` becomes the new head at the end."]
      },
      {
        language: "cpp",
        code: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* current = head;
        while (current != nullptr) {
            ListNode* nextNode = current->next;
            current->next = prev;
            prev = current;
            current = nextNode;
        }
        return prev;
    }
};`,
        explanation: ["Define `prev` as a pointer to null and `current` pointing to the head.", "Traverse as long as current is not dynamically mapped to nullptr.", "Store `current->next` to prevent losing the chain.", "Redirect current's pointer towards `prev`, then increment `prev` and `current` sequentially."]
      },
      {
        language: "java",
        code: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        while (current != null) {
            ListNode nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }
        return prev;
    }
}`,
        explanation: ["Identify standard linked list node traversal architecture.", "Hold a temporary reference to the 'next' attribute to secure data retention iteratively.", "Flip object linkage sequentially moving nulls to tails and tail node configurations safely backward toward head return signatures.", "Return the `prev` reference marking the new head sequence."]
      }
    ]
  },
  "merge-two-sorted-lists": {
    title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Linked List", tags: ["linked-list", "recursion"],
    prompt: "You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
    constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 <= Node.val <= 100", "Both list1 and list2 are sorted in non-decreasing order."],
    examples: [{input: 'list1 = [1,2,4], list2 = [1,3,4]', output: "[1,1,2,3,4,4]"}],
    timeComplexity: "O(N + M)", spaceComplexity: "O(1)", edgeCases: ["One list empty", "Both lists empty"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        tail = dummy
        
        while list1 and list2:
            if list1.val < list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
            
        if list1:
            tail.next = list1
        elif list2:
            tail.next = list2
            
        return dummy.next`,
        explanation: ["Create a dummy object ensuring code simplifies natively bypassing edge node configuration logic mapping.", "Compare respective heads attaching strictly the lesser node.", "Advance strictly the selected node variable mapped inside current operational chain sequences.", "Attach remaining trailing node segment bypassing iteration implicitly."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy;
        ListNode* tail = &dummy;
        
        while (list1 != nullptr && list2 != nullptr) {
            if (list1->val < list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        
        if (list1 != nullptr) tail->next = list1;
        if (list2 != nullptr) tail->next = list2;
        
        return dummy.next;
    }
};`,
        explanation: ["Instantiate dummy as local stack memory mapping safely circumventing pointer allocation crashes.", "Retain active mutable tail pointer referencing back appending addresses mapping lesser integers explicitly.", "Push boundaries checking native integer primitives linearly inside bounded linked conditions.", "Append single tail pointer unconditionally mapped correctly linking memory boundaries directly."]
      },
      {
        language: "java",
        code: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(-1);
        ListNode current = dummy;
        
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }
        
        current.next = list1 == null ? list2 : list1;
        return dummy.next;
    }
}`,
        explanation: ["Initialize a `dummy` node allowing clean linked returns mapping sequence iterations.", "Execute pointer modifications assigning `current.next` explicitly mapping list origins mapped strictly evaluating smaller properties natively.", "Handle disjoint termination implicitly linking remaining array object reference correctly extending chains fully.", "Return offset dummy element securely resolving true sequence head natively."]
      }
    ]
  },
  "linked-list-cycle": {
    title: "Linked List Cycle", difficulty: "Easy", topic: "Linked List", tags: ["hash-table", "linked-list", "two-pointers"],
    prompt: "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.",
    constraints: ["The number of the nodes in the list is in the range [0, 10^4].", "-10^5 <= Node.val <= 10^5"],
    examples: [{input: 'head = [3,2,0,-4], pos = 1 (cycle exists)', output: "true", explanation: "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed)."}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["Empty list", "Single node no cycle"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow, fast = head, head
        
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
                
        return False`,
        explanation: ["Initialize two pointers, `slow` and `fast`, to the head.", "Move `slow` one step and `fast` two steps at a time inside loop parameters.", "If there's a cycle, the `fast` pointer mapping correctly overlaps `slow` resulting identically validating loop cycles dynamically.", "If `fast` hits `None`, standard linear validation terminates establishing false correctness."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode* slow = head;
        ListNode* fast = head;
        
        while (fast != NULL && fast->next != NULL) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                return true;
            }
        }
        
        return false;
    }
};`,
        explanation: ["Leverage Floyd's Cycle-Finding 'Tortoise and Hare' mathematical algorithm bounds.", "Check exact edge constraints preventing accidental memory leak faults explicitly utilizing standard NULL pointer bounds checking.", "Compare explicit memory addresses matching identity correctly determining linked overlap validity seamlessly."]
      },
      {
        language: "java",
        code: `public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slow = head;
        ListNode fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }
        return false;
    }
}`,
        explanation: ["Instantiate algorithm explicit edge limits validating initial mapping parameters correctly mapped bypassing loop constructs perfectly.", "Allocate independent variable references referencing explicit addresses natively.", "Evaluate boolean returns securely executing iterations terminating mapped correctly establishing linear versus cyclical boundary conditions."]
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

console.log("Written linked list problems part 1.");
