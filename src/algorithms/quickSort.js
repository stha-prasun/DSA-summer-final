export const QUICK_SORT_CODE = [
  'quickSort(arr, low, high):',
  '  if low < high:',
  '    p = partition(arr, low, high)',
  '    quickSort(arr, low, p - 1)',
  '    quickSort(arr, p + 1, high)',
  '',
  'partition(arr, low, high):',
  '  pivot = arr[high]',
  '  i = low - 1',
  '  for j = low to high - 1:',
  '    if arr[j] < pivot:',
  '      i++',
  '      swap(arr[i], arr[j])',
  '  swap(arr[i + 1], arr[high])',
  '  return i + 1',
]

export function generateQuickSortSteps(initial) {
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
      vars: { low: null, high: null, pivot: null, i: null, j: null },
      ...patch,
    })

  frame({
    title: 'Welcome!',
    description: `Here is our unsorted array of ${n} elements. Quick Sort is a divide-and-conquer algorithm. It picks a pivot element and partitions the array such that smaller elements go left and larger elements go right, then repeats recursively.`,
    codeLine: 0,
  })

  function solve(low, high) {
    if (low < 0 || high < 0 || low >= n || high >= n) return

    if (low >= high) {
      if (low === high) {
        sortedState[low] = true
        frame({
          title: `Index ${low} is sorted`,
          description: `A single element subarray [${low}] is trivially sorted.`,
          codeLine: 1,
          vars: { low, high, pivot: null, i: null, j: null },
        })
      }
      return
    }

    // Partition
    const pivot = a[high]
    let i = low - 1

    frame({
      title: `Select Pivot = ${pivot}`,
      description: `We select the last element of the subarray, ${pivot} at index ${high}, as the pivot.`,
      compare: [high],
      activeRange: [low, high],
      codeLine: 7,
      vars: { low, high, pivot, i, j: null },
    })

    for (let j = low; j < high; j++) {
      frame({
        title: `Compare arr[j] = ${a[j]} with Pivot = ${pivot}`,
        description: `Is the current element ${a[j]} less than the pivot ${pivot}?`,
        compare: [j, high],
        activeRange: [low, high],
        codeLine: 10,
        vars: { low, high, pivot, i, j },
      })

      if (a[j] < pivot) {
        i++
        const temp = a[i]
        a[i] = a[j]
        a[j] = temp
        frame({
          title: `Swap arr[i] (${a[j]}) and arr[j] (${a[i]})`,
          description: `Yes, ${a[j]} is less than the pivot. We increment i to ${i} and swap them.`,
          swap: [i, j],
          activeRange: [low, high],
          codeLine: 12,
          vars: { low, high, pivot, i, j },
        })
      } else {
        frame({
          title: `No swap`,
          description: `No, ${a[j]} is not less than the pivot. We leave it where it is.`,
          noSwap: [j, high],
          activeRange: [low, high],
          codeLine: 10,
          vars: { low, high, pivot, i, j },
        })
      }
    }

    // Swap pivot to i+1
    const pIdx = i + 1
    const temp = a[pIdx]
    a[pIdx] = a[high]
    a[high] = temp

    frame({
      title: `Place Pivot ${pivot} at sorted index ${pIdx}`,
      description: `We place the pivot ${pivot} into its correct sorted position by swapping it with the element at index ${pIdx}.`,
      swap: [pIdx, high],
      activeRange: [low, high],
      codeLine: 13,
      vars: { low, high, pivot, i, j: high },
    })

    sortedState[pIdx] = true
    frame({
      title: `Pivot ${pivot} is now sorted`,
      description: `The pivot ${pivot} at index ${pIdx} is now locked into its final sorted position.`,
      justSorted: pIdx,
      activeRange: [low, high],
      codeLine: 14,
      vars: { low, high, pivot, i: pIdx, j: null },
    })

    solve(low, pIdx - 1)
    solve(pIdx + 1, high)
  }

  solve(0, n - 1)

  // Ensure everything is marked sorted at the end
  for (let idx = 0; idx < n; idx++) {
    sortedState[idx] = true
  }

  frame({
    title: 'Sorted!',
    description: 'Quick Sort partition recursion complete. The entire array is now fully sorted.',
    sorted: new Array(n).fill(true),
    activeRange: null,
    codeLine: -1,
    vars: { low: 0, high: n - 1, pivot: null, i: null, j: null },
  })

  return steps
}
