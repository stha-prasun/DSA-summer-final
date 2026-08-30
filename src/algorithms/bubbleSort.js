export const BUBBLE_SORT_CODE = [
  'for i = 0 to n - 2:',
  '  swapped = false',
  '  for j = 0 to n - 2 - i:',
  '    if arr[j] > arr[j + 1]:',
  '      swap(arr[j], arr[j + 1])',
  '      swapped = true',
  '  if swapped is false: break',
]

export function generateBubbleSortSteps(initial) {
  const steps = []
  const a = [...initial]
  const n = a.length
  let sortedCount = 0

  const frame = (patch) =>
    steps.push({
      array: [...a],
      compare: null,
      swap: null,
      noSwap: null,
      justSorted: null,
      sorted: new Array(n).fill(false).map((_, idx) => idx >= n - sortedCount),
      activeRange: [0, Math.max(0, n - sortedCount - 1)],
      codeLine: null,
      vars: { i: null, j: null, swapped: null },
      ...patch,
    })

  frame({
    title: 'Welcome!',
    description: `Here is our unsorted array of ${n} numbers. Bubble sort repeatedly compares neighbouring pairs and swaps them whenever the left one is bigger. The larger values "bubble up" to the right, one pass at a time.`,
    codeLine: 0,
  })

  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    for (let j = 0; j < n - 1 - i; j++) {
      const left = a[j]
      const right = a[j + 1]

      frame({
        title: `Compare ${left} and ${right}`,
        description: `We look at the pair at positions ${j} and ${j + 1}. Is ${left} greater than ${right}?`,
        compare: [j, j + 1],
        codeLine: 3,
        vars: { i, j, swapped },
      })

      if (left > right) {
        a[j] = right
        a[j + 1] = left
        swapped = true
        frame({
          title: `${left} is bigger, swap!`,
          description: `Yes, ${left} is greater than ${right}, so they are out of order. We swap them: ${left} moves one step right and ${right} moves one step left.`,
          swap: [j, j + 1],
          codeLine: 4,
          vars: { i, j, swapped },
        })
      } else {
        frame({
          title: `${left} is not bigger, no swap`,
          description: `No, ${left} is not greater than ${right}, so they are already in the correct relative order. We leave them exactly where they are.`,
          noSwap: [j, j + 1],
          codeLine: 3,
          vars: { i, j, swapped },
        })
      }
    }

    sortedCount++
    frame({
      title: `Pass ${i + 1} done, ${a[n - sortedCount]} locked in`,
      description: `After this full pass, the largest remaining value, ${a[n - sortedCount]}, has bubbled all the way to position ${n - sortedCount}. That slot is now final and gets locked in green.`,
      justSorted: n - sortedCount,
      codeLine: 6,
      vars: { i, j: n - 1 - i, swapped },
    })
  }

  frame({
    title: 'Sorted!',
    description: 'All passes are complete. Every value has bubbled to its final position, so the array is now fully sorted from smallest to largest.',
    sorted: new Array(n).fill(true),
    activeRange: null,
    codeLine: -1,
    vars: { i: n - 1, j: null, swapped: false },
  })

  return steps
}
