export const BINARY_SEARCH_CODE = [
  'binarySearch(arr, target):',
  '  low = 0, high = n - 1',
  '  while low <= high:',
  '    mid = (low + high) / 2',
  '    if arr[mid] == target:',
  '      return mid',
  '    if arr[mid] < target:',
  '      low = mid + 1',
  '    else:',
  '      high = mid - 1',
  '  return -1',
]

export function generateBinarySearchSteps(initial, target) {
  const steps = []
  const a = [...initial] // Ensure this is sorted!
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
      vars: { low: null, high: null, mid: null, target, found: false },
      ...patch,
    })

  frame({
    title: 'Welcome!',
    description: `Here is our sorted array of ${n} elements. We want to find the target value ${target} using Binary Search. Binary Search continually halves the search space by inspecting the middle element.`,
    activeRange: [0, n - 1],
    codeLine: 0,
  })

  let low = 0
  let high = n - 1
  let foundIdx = -1

  frame({
    title: `Initialize low = ${low}, high = ${high}`,
    description: `We set low to the first index (0) and high to the last index (${high}).`,
    activeRange: [low, high],
    codeLine: 1,
    vars: { low, high, mid: null, target, found: false },
  })

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)

    frame({
      title: `Calculate mid = ${mid}`,
      description: `We calculate the middle index of our active search space: (low + high) / 2 = (${low} + ${high}) / 2 = ${mid}.`,
      activeRange: [low, high],
      compare: [mid],
      codeLine: 3,
      vars: { low, high, mid, target, found: false },
    })

    frame({
      title: `Compare arr[mid] = ${a[mid]} with target = ${target}`,
      description: `We check if the middle element ${a[mid]} matches our target ${target}.`,
      activeRange: [low, high],
      compare: [mid],
      codeLine: 4,
      vars: { low, high, mid, target, found: false },
    })

    if (a[mid] === target) {
      foundIdx = mid
      sortedState[mid] = true
      frame({
        title: `Match found!`,
        description: `Found the target value ${target} at middle index ${mid}!`,
        activeRange: [low, high],
        justSorted: mid,
        codeLine: 5,
        vars: { low, high, mid, target, found: true },
      })
      break
    }

    if (a[mid] < target) {
      const oldLow = low
      low = mid + 1
      frame({
        title: `arr[mid] < target: increase low`,
        description: `Since the middle element ${a[mid]} is less than the target ${target}, the target must be in the right half. We set low to mid + 1 = ${low}.`,
        activeRange: [oldLow, high],
        noSwap: [mid],
        codeLine: 7,
        vars: { low, high, mid, target, found: false },
      })
    } else {
      const oldHigh = high
      high = mid - 1
      frame({
        title: `arr[mid] > target: decrease high`,
        description: `Since the middle element ${a[mid]} is greater than the target ${target}, the target must be in the left half. We set high to mid - 1 = ${high}.`,
        activeRange: [low, oldHigh],
        noSwap: [mid],
        codeLine: 9,
        vars: { low, high, mid, target, found: false },
      })
    }
  }

  if (foundIdx === -1) {
    frame({
      title: 'Target not found',
      description: `The search space is empty (low > high). The target value ${target} is not in the array. Returning -1.`,
      activeRange: null,
      codeLine: 11,
      vars: { low, high, mid: null, target, found: false },
    })
  } else {
    frame({
      title: 'Search Complete',
      description: `Binary search successfully completed. Target ${target} is located at index ${foundIdx}.`,
      activeRange: null,
      codeLine: -1,
      vars: { low, high, mid: foundIdx, target, found: true },
    })
  }

  return steps
}
