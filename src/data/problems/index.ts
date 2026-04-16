import { Problem } from '../../types/problem';

import { twoSum } from './arrays/two-sum';
import { bestTimeToBuyAndSellStock } from './arrays/best-time-to-buy-and-sell-stock';
import { maximumSubarrayKadanesAlgorithm } from './arrays/maximum-subarray-kadanes-algorithm';
import { mergeIntervals } from './arrays/merge-intervals';
import { productOfArrayExceptSelf } from './arrays/product-of-array-except-self';
import { _3sum } from './arrays/3sum';
import { containerWithMostWater } from './arrays/container-with-most-water';
import { setMatrixZeroes } from './arrays/set-matrix-zeroes';
import { rotateArray } from './arrays/rotate-array';
import { missingNumber } from './arrays/missing-number';
import { longestSubstringWithoutRepeatingCharacters } from './strings/longest-substring-without-repeating-characters';
import { validAnagram } from './strings/valid-anagram';
import { groupAnagrams } from './strings/group-anagrams';
import { longestPalindromicSubstring } from './strings/longest-palindromic-substring';
import { stringToIntegerAtoi } from './strings/string-to-integer-atoi';
import { reverseWordsInAString } from './strings/reverse-words-in-a-string';
import { validParentheses } from './strings/valid-parentheses';
import { implementStrstr } from './strings/implement-strstr';
import { decodeWays } from './strings/decode-ways';
import { countAndSay } from './strings/count-and-say';
import { reverseLinkedList } from './linked-list/reverse-linked-list';
import { mergeTwoSortedLists } from './linked-list/merge-two-sorted-lists';
import { linkedListCycle } from './linked-list/linked-list-cycle';
import { removeNthNodeFromEndOfList } from './linked-list/remove-nth-node-from-end-of-list';
import { intersectionOfTwoLinkedLists } from './linked-list/intersection-of-two-linked-lists';
import { addTwoNumbers } from './linked-list/add-two-numbers';
import { palindromeLinkedList } from './linked-list/palindrome-linked-list';
import { copyListWithRandomPointer } from './linked-list/copy-list-with-random-pointer';
import { reorderList } from './linked-list/reorder-list';
import { flattenAMultilevelDoublyLinkedList } from './linked-list/flatten-a-multilevel-doubly-linked-list';
import { validParenthesesStackQueue } from './stack-queue/valid-parentheses-stack-queue';
import { minStack } from './stack-queue/min-stack';
import { nextGreaterElementI } from './stack-queue/next-greater-element-i';
import { dailyTemperatures } from './stack-queue/daily-temperatures';
import { evaluateReversePolishNotation } from './stack-queue/evaluate-reverse-polish-notation';
import { implementQueueUsingStacks } from './stack-queue/implement-queue-using-stacks';
import { simplifyPath } from './stack-queue/simplify-path';
import { basicCalculator } from './stack-queue/basic-calculator';
import { largestRectangleInHistogram } from './stack-queue/largest-rectangle-in-histogram';
import { slidingWindowMaximum } from './stack-queue/sliding-window-maximum';
import { binaryTreeInorderTraversal } from './binary-tree/binary-tree-inorder-traversal';
import { maximumDepthOfBinaryTree } from './binary-tree/maximum-depth-of-binary-tree';
import { invertBinaryTree } from './binary-tree/invert-binary-tree';
import { diameterOfBinaryTree } from './binary-tree/diameter-of-binary-tree';
import { balancedBinaryTree } from './binary-tree/balanced-binary-tree';
import { pathSum } from './binary-tree/path-sum';
import { lowestCommonAncestor } from './binary-tree/lowest-common-ancestor';
import { serializeAndDeserializeBinaryTree } from './binary-tree/serialize-and-deserialize-binary-tree';
import { constructBinaryTreeFromPreorderAndInorder } from './binary-tree/construct-binary-tree-from-preorder-and-inorder';
import { symmetricTree } from './binary-tree/symmetric-tree';
import { validateBinarySearchTree } from './binary-search-tree/validate-binary-search-tree';
import { insertIntoABst } from './binary-search-tree/insert-into-a-bst';
import { deleteNodeInABst } from './binary-search-tree/delete-node-in-a-bst';
import { lowestCommonAncestorOfABst } from './binary-search-tree/lowest-common-ancestor-of-a-bst';
import { kthSmallestElementInABst } from './binary-search-tree/kth-smallest-element-in-a-bst';
import { bstIterator } from './binary-search-tree/bst-iterator';
import { convertSortedArrayToBst } from './binary-search-tree/convert-sorted-array-to-bst';
import { rangeSumOfBst } from './binary-search-tree/range-sum-of-bst';
import { trimABst } from './binary-search-tree/trim-a-bst';
import { recoverBinarySearchTree } from './binary-search-tree/recover-binary-search-tree';
import { subsets } from './recursion-backtracking/subsets';
import { permutations } from './recursion-backtracking/permutations';
import { combinationSum } from './recursion-backtracking/combination-sum';
import { combinationSumIi } from './recursion-backtracking/combination-sum-ii';
import { letterCombinationsOfAPhoneNumber } from './recursion-backtracking/letter-combinations-of-a-phone-number';
import { nQueens } from './recursion-backtracking/n-queens';
import { wordSearch } from './recursion-backtracking/word-search';
import { palindromePartitioning } from './recursion-backtracking/palindrome-partitioning';
import { generateParentheses } from './recursion-backtracking/generate-parentheses';
import { sudokuSolver } from './recursion-backtracking/sudoku-solver';
import { climbingStairs } from './dynamic-programming/climbing-stairs';
import { houseRobber } from './dynamic-programming/house-robber';
import { coinChange } from './dynamic-programming/coin-change';
import { longestIncreasingSubsequence } from './dynamic-programming/longest-increasing-subsequence';
import { uniquePaths } from './dynamic-programming/unique-paths';
import { editDistance } from './dynamic-programming/edit-distance';
import { maximumProductSubarray } from './dynamic-programming/maximum-product-subarray';
import { wordBreak } from './dynamic-programming/word-break';
import { decodeWaysDynamicProgramming } from './dynamic-programming/decode-ways-dynamic-programming';
import { partitionEqualSubsetSum } from './dynamic-programming/partition-equal-subset-sum';
import { numberOfIslands } from './graphs/number-of-islands';
import { cloneGraph } from './graphs/clone-graph';
import { courseSchedule } from './graphs/course-schedule';
import { pacificAtlanticWaterFlow } from './graphs/pacific-atlantic-water-flow';
import { rottingOranges } from './graphs/rotting-oranges';
import { wordLadder } from './graphs/word-ladder';
import { graphValidTree } from './graphs/graph-valid-tree';
import { networkDelayTime } from './graphs/network-delay-time';
import { findEventualSafeStates } from './graphs/find-eventual-safe-states';
import { numberOfConnectedComponents } from './graphs/number-of-connected-components';
import { kthLargestElementInAnArray } from './heap-priority-queue/kth-largest-element-in-an-array';
import { topKFrequentElements } from './heap-priority-queue/top-k-frequent-elements';
import { mergeKSortedLists } from './heap-priority-queue/merge-k-sorted-lists';
import { findMedianFromDataStream } from './heap-priority-queue/find-median-from-data-stream';
import { taskScheduler } from './heap-priority-queue/task-scheduler';
import { reorganizeString } from './heap-priority-queue/reorganize-string';
import { kClosestPointsToOrigin } from './heap-priority-queue/k-closest-points-to-origin';
import { smallestRangeCoveringElementsFromKLists } from './heap-priority-queue/smallest-range-covering-elements-from-k-lists';
import { slidingWindowMedian } from './heap-priority-queue/sliding-window-median';
import { uglyNumberIi } from './heap-priority-queue/ugly-number-ii';

export const allProblems: Record<string, Problem> = {
  "two-sum": twoSum,
  "best-time-to-buy-and-sell-stock": bestTimeToBuyAndSellStock,
  "maximum-subarray-kadanes-algorithm": maximumSubarrayKadanesAlgorithm,
  "merge-intervals": mergeIntervals,
  "product-of-array-except-self": productOfArrayExceptSelf,
  "3sum": _3sum,
  "container-with-most-water": containerWithMostWater,
  "set-matrix-zeroes": setMatrixZeroes,
  "rotate-array": rotateArray,
  "missing-number": missingNumber,
  "longest-substring-without-repeating-characters": longestSubstringWithoutRepeatingCharacters,
  "valid-anagram": validAnagram,
  "group-anagrams": groupAnagrams,
  "longest-palindromic-substring": longestPalindromicSubstring,
  "string-to-integer-atoi": stringToIntegerAtoi,
  "reverse-words-in-a-string": reverseWordsInAString,
  "valid-parentheses": validParentheses,
  "implement-strstr": implementStrstr,
  "decode-ways": decodeWays,
  "count-and-say": countAndSay,
  "reverse-linked-list": reverseLinkedList,
  "merge-two-sorted-lists": mergeTwoSortedLists,
  "linked-list-cycle": linkedListCycle,
  "remove-nth-node-from-end-of-list": removeNthNodeFromEndOfList,
  "intersection-of-two-linked-lists": intersectionOfTwoLinkedLists,
  "add-two-numbers": addTwoNumbers,
  "palindrome-linked-list": palindromeLinkedList,
  "copy-list-with-random-pointer": copyListWithRandomPointer,
  "reorder-list": reorderList,
  "flatten-a-multilevel-doubly-linked-list": flattenAMultilevelDoublyLinkedList,
  "valid-parentheses-stack-queue": validParenthesesStackQueue,
  "min-stack": minStack,
  "next-greater-element-i": nextGreaterElementI,
  "daily-temperatures": dailyTemperatures,
  "evaluate-reverse-polish-notation": evaluateReversePolishNotation,
  "implement-queue-using-stacks": implementQueueUsingStacks,
  "simplify-path": simplifyPath,
  "basic-calculator": basicCalculator,
  "largest-rectangle-in-histogram": largestRectangleInHistogram,
  "sliding-window-maximum": slidingWindowMaximum,
  "binary-tree-inorder-traversal": binaryTreeInorderTraversal,
  "maximum-depth-of-binary-tree": maximumDepthOfBinaryTree,
  "invert-binary-tree": invertBinaryTree,
  "diameter-of-binary-tree": diameterOfBinaryTree,
  "balanced-binary-tree": balancedBinaryTree,
  "path-sum": pathSum,
  "lowest-common-ancestor": lowestCommonAncestor,
  "serialize-and-deserialize-binary-tree": serializeAndDeserializeBinaryTree,
  "construct-binary-tree-from-preorder-and-inorder": constructBinaryTreeFromPreorderAndInorder,
  "symmetric-tree": symmetricTree,
  "validate-binary-search-tree": validateBinarySearchTree,
  "insert-into-a-bst": insertIntoABst,
  "delete-node-in-a-bst": deleteNodeInABst,
  "lowest-common-ancestor-of-a-bst": lowestCommonAncestorOfABst,
  "kth-smallest-element-in-a-bst": kthSmallestElementInABst,
  "bst-iterator": bstIterator,
  "convert-sorted-array-to-bst": convertSortedArrayToBst,
  "range-sum-of-bst": rangeSumOfBst,
  "trim-a-bst": trimABst,
  "recover-binary-search-tree": recoverBinarySearchTree,
  "subsets": subsets,
  "permutations": permutations,
  "combination-sum": combinationSum,
  "combination-sum-ii": combinationSumIi,
  "letter-combinations-of-a-phone-number": letterCombinationsOfAPhoneNumber,
  "n-queens": nQueens,
  "word-search": wordSearch,
  "palindrome-partitioning": palindromePartitioning,
  "generate-parentheses": generateParentheses,
  "sudoku-solver": sudokuSolver,
  "climbing-stairs": climbingStairs,
  "house-robber": houseRobber,
  "coin-change": coinChange,
  "longest-increasing-subsequence": longestIncreasingSubsequence,
  "unique-paths": uniquePaths,
  "edit-distance": editDistance,
  "maximum-product-subarray": maximumProductSubarray,
  "word-break": wordBreak,
  "decode-ways-dynamic-programming": decodeWaysDynamicProgramming,
  "partition-equal-subset-sum": partitionEqualSubsetSum,
  "number-of-islands": numberOfIslands,
  "clone-graph": cloneGraph,
  "course-schedule": courseSchedule,
  "pacific-atlantic-water-flow": pacificAtlanticWaterFlow,
  "rotting-oranges": rottingOranges,
  "word-ladder": wordLadder,
  "graph-valid-tree": graphValidTree,
  "network-delay-time": networkDelayTime,
  "find-eventual-safe-states": findEventualSafeStates,
  "number-of-connected-components": numberOfConnectedComponents,
  "kth-largest-element-in-an-array": kthLargestElementInAnArray,
  "top-k-frequent-elements": topKFrequentElements,
  "merge-k-sorted-lists": mergeKSortedLists,
  "find-median-from-data-stream": findMedianFromDataStream,
  "task-scheduler": taskScheduler,
  "reorganize-string": reorganizeString,
  "k-closest-points-to-origin": kClosestPointsToOrigin,
  "smallest-range-covering-elements-from-k-lists": smallestRangeCoveringElementsFromKLists,
  "sliding-window-median": slidingWindowMedian,
  "ugly-number-ii": uglyNumberIi,
};

export const problemsList: Problem[] = Object.values(allProblems);
