export const INSERTION_SORT_CODE = [
  'for i = 1 to n - 1:',
  '  key = arr[i]',
  '  j = i - 1',
  '  while j >= 0 and arr[j] > key:',
  '    arr[j + 1] = arr[j]',
  '    j = j - 1',
  '  arr[j + 1] = key',
]

export function generateInsertionSortSteps(initial) {
  const steps = []
  const a = [...initial]
  const n = a.length

  const frame = (patch) =>
    steps.push({
      array: [...a],
      compare: null,
      swap: null,
      noSwap: null,
      justSorted: null,
      sorted: new Array(n).fill(false),
      activeRange: [0, n - 1],
      codeLine: null,
      vars: { i: null, j: null, key: null },
      ...patch,
    })

  frame({
    title: 'Welcome!',
    description: `Here is our unsorted array of ${n} elements. Insertion Sort builds a sorted array section at the left side, inserting one new element at a time into its proper place.`,
    codeLine: 0,
  })

  for (let i = 1; i < n; i++) {
    const key = a[i]
    let j = i - 1

    frame({
      title: `Pick key = ${key} (index ${i})`,
      description: `We pick the next element, ${key}, to insert into the sorted sub-array to its left.`,
      compare: [i],
      codeLine: 1,
      vars: { i, j, key },
    })

    while (j >= 0) {
      const current = a[j]

      frame({
        title: `Compare ${current} and key = ${key}`,
        description: `We compare the sorted sub-array element ${current} at index ${j} with the key ${key}.`,
        compare: [j, j + 1],
        codeLine: 4,
        vars: { i, j, key },
      })

      if (current > key) {
        a[j + 1] = current
        frame({
          title: `Shift ${current} right`,
          description: `Since ${current} is greater than key ${key}, we shift it one index to the right.`,
          swap: [j, j + 1],
          codeLine: 5,
          vars: { i, j, key },
        })
        j--
      } else {
        frame({
          title: `No shift needed`,
          description: `Since ${current} is not greater than key ${key}, we have found the correct insertion spot.`,
          noSwap: [j, j + 1],
          codeLine: 4,
          vars: { i, j, key },
        })
        break
      }
    }

    a[j + 1] = key
    frame({
      title: `Insert key = ${key} at index ${j + 1}`,
      description: `We insert the key value ${key} into its final correct position at index ${j + 1}.`,
      swap: [j + 1],
      codeLine: 7,
      vars: { i, j, key },
    })
  }

  frame({
    title: 'Sorted!',
    description: 'All elements have been inserted. The entire array is now fully sorted.',
    sorted: new Array(n).fill(true),
    activeRange: null,
    codeLine: -1,
    vars: { i: n - 1, j: null, key: null },
  })

  return steps
}
