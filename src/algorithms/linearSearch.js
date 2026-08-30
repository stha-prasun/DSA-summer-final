export const LINEAR_SEARCH_CODE = [
  'linearSearch(arr, target):',
  '  for i = 0 to n - 1:',
  '    if arr[i] == target:',
  '      return i',
  '  return -1',
]

export function generateLinearSearchSteps(initial, target) {
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
      activeRange: [0, n - 1],
      codeLine: null,
      vars: { i: null, target, found: false },
      ...patch,
    })

  frame({
    title: 'Welcome!',
    description: `Here is our array of ${n} elements. We want to find the target value ${target} using Linear Search. We will check each element one by one from left to right.`,
    codeLine: 0,
  })

  let foundIdx = -1
  for (let i = 0; i < n; i++) {
    frame({
      title: `Check index i = ${i} (value ${a[i]})`,
      description: `We compare the element at index ${i} (${a[i]}) with the target value ${target}.`,
      compare: [i],
      codeLine: 2,
      vars: { i, target, found: false },
    })

    if (a[i] === target) {
      foundIdx = i
      sortedState[i] = true
      frame({
        title: `Match found!`,
        description: `Found the target value ${target} at index ${i}!`,
        justSorted: i,
        codeLine: 3,
        vars: { i, target, found: true },
      })
      break
    } else {
      frame({
        title: `Not a match`,
        description: `The element ${a[i]} does not match the target ${target}. We proceed to the next element.`,
        noSwap: [i],
        codeLine: 1,
        vars: { i, target, found: false },
      })
    }
  }

  if (foundIdx === -1) {
    frame({
      title: 'Target not found',
      description: `We checked all elements in the array and did not find the target value ${target}. Returning -1.`,
      codeLine: 4,
      vars: { i: null, target, found: false },
    })
  } else {
    frame({
      title: 'Search Complete',
      description: `Linear search successfully completed. Target ${target} is located at index ${foundIdx}.`,
      codeLine: -1,
      vars: { i: foundIdx, target, found: true },
    })
  }

  return steps
}
