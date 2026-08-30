import { generateBubbleSortSteps } from '../algorithms/bubbleSort'
import { generateMergeSortSteps } from '../algorithms/mergeSort'
import { generateQuickSortSteps } from '../algorithms/quickSort'
import { generateInsertionSortSteps } from '../algorithms/insertionSort'
import { generateLinearSearchSteps } from '../algorithms/linearSearch'
import { generateBinarySearchSteps } from '../algorithms/binarySearch'

const SIZES = [4, 8, 16, 32, 64, 128, 256, 512]

function randomArray(n) {
  const arr = []
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * 1000) + 1)
  }
  return arr
}

function sortedArray(n) {
  const arr = []
  for (let i = 0; i < n; i++) {
    arr.push(i + 1)
  }
  return arr
}

function countOps(steps) {
  let comparisons = 0
  let swaps = 0
  for (const step of steps) {
    if (step.compare) comparisons++
    if (step.swap) swaps++
  }
  return { comparisons, swaps }
}

function countSearchOps(steps) {
  let comparisons = 0
  for (const step of steps) {
    if (step.compare) comparisons++
  }
  return { comparisons }
}

export function measureBubbleSort() {
  return SIZES.map((n) => {
    const arr = randomArray(n)
    const steps = generateBubbleSortSteps(arr)
    const { comparisons, swaps } = countOps(steps)
    return { n, comparisons, swaps }
  })
}

export function measureMergeSort() {
  return SIZES.map((n) => {
    const arr = randomArray(n)
    const steps = generateMergeSortSteps(arr)
    const { comparisons, swaps } = countOps(steps)
    return { n, comparisons, swaps }
  })
}

export function measureQuickSort() {
  return SIZES.map((n) => {
    const arr = randomArray(n)
    const steps = generateQuickSortSteps(arr)
    const { comparisons, swaps } = countOps(steps)
    return { n, comparisons, swaps }
  })
}

export function measureInsertionSort() {
  return SIZES.map((n) => {
    const arr = randomArray(n)
    const steps = generateInsertionSortSteps(arr)
    const { comparisons, swaps } = countOps(steps)
    return { n, comparisons, swaps }
  })
}

export function measureLinearSearch() {
  return SIZES.map((n) => {
    const arr = randomArray(n)
    const target = arr[Math.floor(Math.random() * n)]
    const steps = generateLinearSearchSteps(arr, target)
    const { comparisons } = countSearchOps(steps)
    return { n, comparisons }
  })
}

export function measureBinarySearch() {
  return SIZES.map((n) => {
    const arr = sortedArray(n)
    const target = arr[Math.floor(Math.random() * n)]
    const steps = generateBinarySearchSteps(arr, target)
    const { comparisons } = countSearchOps(steps)
    return { n, comparisons }
  })
}
