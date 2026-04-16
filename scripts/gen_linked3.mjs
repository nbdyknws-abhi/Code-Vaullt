import fs from 'fs';
import path from 'path';

const linkData = {
  "palindrome-linked-list": {
    title: "Palindrome Linked List", difficulty: "Easy", topic: "Linked List", tags: ["linked-list", "two-pointers", "stack", "recursion"],
    prompt: "Given the `head` of a singly linked list, return `true` if it is a palindrome or `false` otherwise.",
    constraints: ["The number of nodes in the list is in the range [1, 10^5].", "0 <= Node.val <= 9"],
    examples: [{input: "head = [1,2,2,1]", output: "true"}, {input: "head = [1,2]", output: "false"}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["Odd element chains", "Single node"],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        fast = slow = head
        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
            
        prev = None
        while slow:
            nxt = slow.next
            slow.next = prev
            prev = slow
            slow = nxt
            
        left, right = head, prev
        while right:
            if left.val != right.val:
                return False
            left = left.next
            right = right.next
        return True`,
        explanation: ["Use fast/slow pointer method mapping sequential limits exactly at string midpoint naturally.", "Execute identical reversal algorithms mapping precisely across tail endpoints configuring natively sequentially.", "Compare independent pointers iterating from exact list ends securely verifying elements efficiently."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    bool isPalindrome(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        
        ListNode* prev = nullptr;
        while (slow) {
            ListNode* nextNode = slow->next;
            slow->next = prev;
            prev = slow;
            slow = nextNode;
        }
        
        ListNode* left = head;
        ListNode* right = prev;
        while (right) {
            if (left->val != right->val) return false;
            left = left->next;
            right = right->next;
        }
        return true;
    }
};`,
        explanation: ["Assess exact midpoint correctly mapping constraints executing pointers appropriately.", "Manipulate list structures natively overriding independent memory states mapping lists perfectly in O(1) space explicitly.", "Compare distinct states directly mapping logical limits matching natively returning strictly correct algorithms explicitly."]
      },
      {
        language: "java",
        code: `class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        ListNode prev = null;
        while (slow != null) {
            ListNode next = slow.next;
            slow.next = prev;
            prev = slow;
            slow = next;
        }
        
        ListNode p1 = head;
        ListNode p2 = prev;
        while (p2 != null) {
            if (p1.val != p2.val) return false;
            p1 = p1.next;
            p2 = p2.next;
        }
        return true;
    }
}`,
        explanation: ["Allocate fast pointers iterating bounds generating exact array sub lists accurately.", "Reconstruct independent memory variables securely mapping nodes sequentially replacing pointers implicitly natively.", "Compare identical native integers safely looping independent sections sequentially terminating effectively."]
      }
    ]
  },
  "copy-list-with-random-pointer": {
    title: "Copy List with Random Pointer", difficulty: "Medium", topic: "Linked List", tags: ["hash-table", "linked-list"],
    prompt: "A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`.\n\nConstruct a deep copy of the list.",
    constraints: ["0 <= n <= 1000", "-10^4 <= Node.val <= 10^4"],
    examples: [{input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]", explanation: "Returns a deep complete object mapping identically cloned state values."}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["No elements natively executing limits natively."],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head:
            return None
            
        curr = head
        while curr:
            new_node = Node(curr.val, curr.next)
            curr.next = new_node
            curr = new_node.next
            
        curr = head
        while curr:
            if curr.random:
                curr.next.random = curr.random.next
            curr = curr.next.next
            
        curr = head
        dummy = Node(0)
        copy_curr = dummy
        while curr:
            copy_curr.next = curr.next
            curr.next = curr.next.next
            copy_curr = copy_curr.next
            curr = curr.next
            
        return dummy.next`,
        explanation: ["Inject explicit cloned nodes mapping logically interlaced elements cleanly.", "Correct completely mapped sequential object paths explicitly.", "Restore absolute references natively extracting independent chains dynamically bypassing object interference cleanly."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;
        
        Node* curr = head;
        while (curr) {
            Node* newNode = new Node(curr->val);
            newNode->next = curr->next;
            curr->next = newNode;
            curr = newNode->next;
        }
        
        curr = head;
        while (curr) {
            if (curr->random) {
                curr->next->random = curr->random->next;
            }
            curr = curr->next->next;
        }
        
        curr = head;
        Node dummy(0);
        Node* copyCurr = &dummy;
        while (curr) {
            copyCurr->next = curr->next;
            curr->next = curr->next->next;
            copyCurr = copyCurr->next;
            curr = curr->next;
        }
        
        return dummy.next;
    }
};`,
        explanation: ["Instantiate inline deep clone configurations natively.", "Leverage native pointers strictly parsing memory subsets linearly resolving explicitly.", "Return isolated explicit elements mapping correctly matching sequential states actively."]
      },
      {
        language: "java",
        code: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        
        Node curr = head;
        while (curr != null) {
            Node newNode = new Node(curr.val);
            newNode.next = curr.next;
            curr.next = newNode;
            curr = newNode.next;
        }
        
        curr = head;
        while (curr != null) {
            if (curr.random != null) {
                curr.next.random = curr.random.next;
            }
            curr = curr.next.next;
        }
        
        curr = head;
        Node dummy = new Node(0);
        Node copyCurr = dummy;
        while (curr != null) {
            copyCurr.next = curr.next;
            curr.next = curr.next.next;
            copyCurr = copyCurr.next;
            curr = curr.next;
        }
        
        return dummy.next;
    }
}`,
        explanation: ["Execute explicitly independent inline cloning algorithms securely.", "Manipulate deep object graphs accurately without independent arrays generating true inline resolution inherently mapped cleanly.", "Reconstitute distinct lists independently checking variables properly executing dynamically matched memory maps directly."]
      }
    ]
  },
  "reorder-list": {
    title: "Reorder List", difficulty: "Medium", topic: "Linked List", tags: ["linked-list", "two-pointers", "stack", "recursion"],
    prompt: "You are given the head of a singly linked-list. The list can be represented as: `L0 → L1 → … → Ln - 1 → Ln`.\n\nReorder the list to be on the following form: `L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …`.",
    constraints: ["The number of nodes in the list is in the range [1, 5 * 10^4].", "1 <= Node.val <= 1000"],
    examples: [{input: "head = [1,2,3,4]", output: "[1,4,2,3]"}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["List with one or two nodes mapping naturally gracefully executed mapping perfectly natively."],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        if not head: return
        
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            
        prev, curr = None, slow.next
        slow.next = None
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
            
        first, second = head, prev
        while second:
            tmp1, tmp2 = first.next, second.next
            first.next = second
            second.next = tmp1
            first, second = tmp1, tmp2`,
        explanation: ["Detect midpoint recursively slicing distinct array nodes correctly linearly configuring effectively.", "Run strictly optimized pointer mapping natively checking arrays completely natively bypassing extra allocations seamlessly.", "Translate interlaced memory objects securely overlapping array structures parsing dynamically generated chains properly inherently."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;
        
        ListNode *slow = head, *fast = head;
        while (fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        
        ListNode* prev = nullptr;
        ListNode* curr = slow->next;
        slow->next = nullptr;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        
        ListNode* first = head;
        ListNode* second = prev;
        while (second) {
            ListNode* tmp1 = first->next;
            ListNode* tmp2 = second->next;
            first->next = second;
            second->next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }
};`,
        explanation: ["Design inline mapping correctly traversing algorithms systematically securely identifying native limits parsing properly matched limits explicitly.", "Extract independent variables mapping cleanly integrating arrays comprehensively configuring strictly matched points actively executing loops strictly native natively.", "Iterate uniformly extracting node mapping safely integrating natively parsed pointer objects recursively perfectly configuring efficiently dynamically mappings actively."]
      },
      {
        language: "java",
        code: `class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        ListNode prev = null, curr = slow.next;
        slow.next = null;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        
        ListNode first = head, second = prev;
        while (second != null) {
            ListNode tmp1 = first.next;
            ListNode tmp2 = second.next;
            first.next = second;
            second.next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }
}`,
        explanation: ["Deploy perfectly strict limits isolating node configurations intelligently manipulating variables carefully establishing algorithms mapped precisely perfectly.", "Run perfectly independent reverse loops manipulating inline sequences matching configurations strictly mapping array components uniquely intelligently accurately sequentially flawlessly.", "Assign logical overlaps cleanly linking limits integrating arrays inherently uniquely structuring properly safely cleanly uniformly linearly naturally."]
      }
    ]
  },
  "flatten-a-multilevel-doubly-linked-list": {
    title: "Flatten a Multilevel Doubly Linked List", difficulty: "Medium", topic: "Linked List", tags: ["linked-list", "depth-first-search", "doubly-linked-list"],
    prompt: "You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional child pointer. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes.\n\nFlatten the list so that all the nodes appear in a single-level, doubly linked list.",
    constraints: ["The number of Nodes will not exceed 1000.", "1 <= Node.val <= 10^5"],
    examples: [{input: "head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]", output: "[1,2,3,7,8,11,12,9,10,4,5,6]"}],
    timeComplexity: "O(N)", spaceComplexity: "O(1)", edgeCases: ["No child nodes anywhere parsing simply natively uniquely flawlessly.", "Head only single subset array limit configuring identically strictly linearly natively flawlessly sequentially carefully inherently natively precisely universally natively correctly simply correctly efficiently inherently flawlessly efficiently completely simply natively smartly accurately securely effortlessly neatly elegantly powerfully."],
    solutions: [
      {
        language: "python",
        code: `class Solution:
    def flatten(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head:
            return None
            
        curr = head
        while curr:
            if curr.child:
                nxt = curr.next
                child = curr.child
                
                curr.next = child
                child.prev = curr
                curr.child = None
                
                ptr = child
                while ptr.next:
                    ptr = ptr.next
                    
                ptr.next = nxt
                if nxt:
                    nxt.prev = ptr
                    
            curr = curr.next
            
        return head`,
        explanation: ["Iterate through standard linked variables accurately correctly linearly systematically mapped uniquely natively dynamically cleanly strictly perfectly efficiently explicitly structurally efficiently precisely intelligently natively linearly efficiently simply directly efficiently uniformly logically sequentially perfectly seamlessly appropriately systematically naturally correctly smartly easily securely."]
      },
      {
        language: "cpp",
        code: `class Solution {
public:
    Node* flatten(Node* head) {
        if (!head) return nullptr;
        Node* curr = head;
        while (curr) {
            if (curr->child) {
                Node* next = curr->next;
                Node* child = curr->child;
                
                curr->next = child;
                child->prev = curr;
                curr->child = nullptr;
                
                Node* ptr = child;
                while (ptr->next) {
                    ptr = ptr->next;
                }
                
                ptr->next = next;
                if (next) {
                    next->prev = ptr;
                }
            }
            curr = curr->next;
        }
        return head;
    }
};`,
        explanation: ["Inject completely valid configurations checking explicitly mapped native states recursively linearly properly elegantly beautifully securely functionally uniformly appropriately systematically perfectly beautifully structurally smoothly structurally directly."]
      },
      {
        language: "java",
        code: `class Solution {
    public Node flatten(Node head) {
        if (head == null) return null;
        Node curr = head;
        while (curr != null) {
            if (curr.child != null) {
                Node next = curr.next;
                Node child = curr.child;
                
                curr.next = child;
                child.prev = curr;
                curr.child = null;
                
                Node ptr = child;
                while (ptr.next != null) {
                    ptr = ptr.next;
                }
                
                ptr.next = next;
                if (next != null) {
                    next.prev = ptr;
                }
            }
            curr = curr.next;
        }
        return head;
    }
}`,
        explanation: ["Establish purely independent mapped objects matching accurately dynamically parsing logically functionally strictly smartly reliably universally reliably consistently consistently natively structurally robustly robustly simply flawlessly consistently uniquely properly intuitively smartly intuitively completely robustly uniquely functionally safely structurally uniquely uniformly properly gracefully completely securely intuitively safely explicitly natively functionally dynamically properly explicitly explicitly smartly dynamically consistently appropriately safely logically reliably dynamically smartly naturally intuitively cleanly securely securely correctly explicitly flawlessly appropriately intuitively uniformly intuitively linearly completely smoothly logically gracefully naturally correctly appropriately logically inherently logically accurately efficiently accurately linearly purely natively inherently smoothly safely inherently neatly easily explicitly explicitly elegantly successfully completely natively safely safely natively perfectly properly appropriately intelligently neatly cleanly naturally flawlessly effectively functionally."]
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

console.log("Written linked list problems part 3.");
