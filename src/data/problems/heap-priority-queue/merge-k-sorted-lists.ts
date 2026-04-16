import { Problem } from '../../../types/problem';

export const mergeKSortedLists: Problem = {
  id: "merge-k-sorted-lists",
  title: "Merge K Sorted Lists",
  difficulty: "Hard",
  topic: "Heap & Priority Queue",
  tags: ["linked-list","divide-and-conquer","heap-priority-queue","merge-sort"],
  prompt: "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
  constraints: ["k == lists.length","0 <= k <= 10^4","0 <= lists[i].length <= 500","-10^4 <= lists[i][j] <= 10^4","lists[i] is sorted in ascending order.","The sum of lists[i].length will not exceed 10^4."],
  examples: [
  {
    "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
    "output": "[1,1,2,3,4,4,5,6]"
  }
],
  solutions: [
  {
    "language": "python",
    "code": "class Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        if not lists or len(lists) == 0:\n            return None\n            \n        while len(lists) > 1:\n            mergedLists = []\n            for i in range(0, len(lists), 2):\n                l1 = lists[i]\n                l2 = lists[i + 1] if (i + 1) < len(lists) else None\n                mergedLists.append(self.mergeList(l1, l2))\n            lists = mergedLists\n            \n        return lists[0]\n        \n    def mergeList(self, l1, l2):\n        dummy = ListNode()\n        tail = dummy\n        \n        while l1 and l2:\n            if l1.val < l2.val:\n                tail.next = l1\n                l1 = l1.next\n            else:\n                tail.next = l2\n                l2 = l2.next\n            tail = tail.next\n        if l1:\n            tail.next = l1\n        if l2:\n            tail.next = l2\n        return dummy.next",
    "explanation": [
      "Use a divide-and-conquer approach to merge lists in pairs.",
      "This is more efficient than merging lists one by one because each node is visited only O(log k) times.",
      "The merge process itself is the same as merging two sorted linked lists.",
      "Result is a single sorted list produced by repeated binary merges."
    ]
  },
  {
    "language": "cpp",
    "code": "class Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        auto compare = [](ListNode* a, ListNode* b) {\n            return a->val > b->val;\n        };\n        priority_queue<ListNode*, vector<ListNode*>, decltype(compare)> minHeap(compare);\n        \n        for (auto list : lists) {\n            if (list) minHeap.push(list);\n        }\n        \n        ListNode dummy(0);\n        ListNode* tail = &dummy;\n        \n        while (!minHeap.empty()) {\n            ListNode* node = minHeap.top();\n            minHeap.pop();\n            tail->next = node;\n            tail = tail->next;\n            if (node->next) minHeap.push(node->next);\n        }\n        return dummy.next;\n    }\n};",
    "explanation": [
      "Use a min-priority queue to store the heads of all `k` linked lists.",
      "At each step, extract the smallest head, append it to the result, and push its successor from the same list back into the heap.",
      "Since the heap size is capped at `k`, each insertion and extraction takes O(log k) time.",
      "The O(N log k) total runtime is optimal for this problem."
    ]
  },
  {
    "language": "java",
    "code": "class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        if (lists == null || lists.length == 0) return null;\n        \n        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);\n        for (ListNode list : lists) {\n            if (list != null) pq.add(list);\n        }\n        \n        ListNode dummy = new ListNode(0);\n        ListNode tail = dummy;\n        \n        while (!pq.isEmpty()) {\n            ListNode node = pq.poll();\n            tail.next = node;\n            tail = tail.next;\n            if (node.next != null) pq.add(node.next);\n        }\n        return dummy.next;\n    }\n}",
    "explanation": [
      "Prioritize node selection using a min-heap initialized with all list heads.",
      "This algorithm effectively simulates a multi-way merge sort.",
      "By extracting the smallest node and immediately providing its replacement from the same source list, we maintain a consolidated sorted sequence.",
      "O(k) extra space is used for the priority queue pointers."
    ]
  }
],
  timeComplexity: "O(N log K) where N is total nodes",
  spaceComplexity: "O(K)",
  edgeCases: ["Empty lists array","Array with empty linked lists"]
};
