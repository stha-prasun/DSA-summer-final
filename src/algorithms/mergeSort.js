export const MERGE_SORT_CODE = [
  'mergeSort(arr, l, r):',
  '  if l < r:',
  '    mid = (l + r) / 2',
  '    mergeSort(arr, l, mid)',
  '    mergeSort(arr, mid + 1, r)',
  '    merge(arr, l, mid, r)',
  '',
  'merge(arr, l, mid, r):',
  '  // compare and write elements back sorted'
]

export function generateMergeSortSteps(initial) {
  const steps = []
  const a = [...initial]
  const n = a.length
  const sortedState = new Array(n).fill(false)

  const frame = (patch) =>
    steps.push({
      array: [...a],
      compare: null,
      swap: null,
      noSwap: null,
      justSorted: null,
      sorted: [...sortedState],
      activeRange: null,
      codeLine: null,
      vars: { l: null, r: null, mid: null },
      ...patch,
    })

  frame({
    title: 'Welcome!',
    description: `Here is our unsorted array of ${n} elements. Merge Sort is a divide-and-conquer algorithm. It divides the array into halves, sorts each half recursively, and then merges the sorted halves back together.`,
    codeLine: 0,
  })

  function solve(l, r) {
    if (l >= r) return

    const mid = Math.floor((l + r) / 2)
    frame({
      title: `Divide range [${l}, ${r}]`,
      description: `We calculate the middle index mid = ${mid} to divide the subarray into two halves.`,
      activeRange: [l, r],
      codeLine: 2,
      vars: { l, r, mid },
    })

    solve(l, mid)
    solve(mid + 1, r)
    merge(l, mid, r)
  }

  function merge(l, mid, r) {
    const leftArr = a.slice(l, mid + 1)
    const rightArr = a.slice(mid + 1, r + 1)

    let i = 0
    let j = 0
    let k = l

    while (i < leftArr.length && j < rightArr.length) {
      const leftVal = leftArr[i]
      const rightVal = rightArr[j]

      // Determine where the compared elements currently reside in array 'a'
      // to highlight them correctly
      const leftIdxInA = l + i
      const rightIdxInA = mid + 1 + j

      frame({
        title: `Compare ${leftVal} and ${rightVal}`,
        description: `We compare the current element from the left sub-array (${leftVal}) with the current element from the right sub-array (${rightVal}).`,
        compare: [leftIdxInA, rightIdxInA],
        activeRange: [l, r],
        codeLine: 7,
        vars: { l, r, mid },
      })

      if (leftVal <= rightVal) {
        a[k] = leftVal
        frame({
          title: `Place ${leftVal} from left subarray`,
          description: `Since ${leftVal} is smaller or equal, we write it back to index ${k}.`,
          swap: [k],
          activeRange: [l, r],
          codeLine: 8,
          vars: { l, r, mid },
        })
        i++
      } else {
        a[k] = rightVal
        frame({
          title: `Place ${rightVal} from right subarray`,
          description: `Since ${rightVal} is smaller, we write it back to index ${k}.`,
          swap: [k],
          activeRange: [l, r],
          codeLine: 8,
          vars: { l, r, mid },
        })
        j++
      }
      k++
    }

    while (i < leftArr.length) {
      const val = leftArr[i]
      a[k] = val
      frame({
        title: `Copy remaining element ${val}`,
        description: `The right subarray is exhausted. Copy ${val} from the left subarray back to index ${k}.`,
        swap: [k],
        activeRange: [l, r],
        codeLine: 8,
        vars: { l, r, mid },
      })
      i++
      k++
    }

    while (j < rightArr.length) {
      const val = rightArr[j]
      a[k] = val
      frame({
        title: `Copy remaining element ${val}`,
        description: `The left subarray is exhausted. Copy ${val} from the right subarray back to index ${k}.`,
        swap: [k],
        activeRange: [l, r],
        codeLine: 8,
        vars: { l, r, mid },
      })
      j++
      k++
    }
  }

  solve(0, n - 1)

  // Mark all sorted at the end
  for (let idx = 0; idx < n; idx++) {
    sortedState[idx] = true
  }

  frame({
    title: 'Sorted!',
    description: 'Merge Sort division and merging complete. The entire array is now fully sorted.',
    sorted: new Array(n).fill(true),
    activeRange: null,
    codeLine: -1,
    vars: { l: 0, r: n - 1, mid: null },
  })

  return steps
}
