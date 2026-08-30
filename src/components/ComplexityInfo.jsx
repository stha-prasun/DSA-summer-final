const ALGO_INFO = {
  'bubble-sort': {
    title: 'Bubble Sort',
    best: 'O(n)',
    average: 'O(n\u00B2)',
    worst: 'O(n\u00B2)',
    space: 'O(1)',
    stable: true,
    explanation: `Bubble Sort is O(n\u00B2) because it uses two nested loops. The outer loop runs n\u22121 times, and for each pass, the inner loop scans the unsorted portion. In the worst case (reverse-sorted array), every element must be compared and swapped. The best case is O(n) because if the array is already sorted, the \\"swapped\\" flag stays false after the first pass and we break early.`,
    whenToUse: `Bubble Sort is mainly used for educational purposes. In practice, it\u2019s too slow for real-world data. Its one advantage is that it\u2019s stable (equal elements keep their relative order) and can detect a sorted array early.`,
  },
  'merge-sort': {
    title: 'Merge Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    stable: true,
    explanation: `Merge Sort is O(n log n) because it divides the array in half at each level (log n levels), and at each level it merges all n elements back together. The division and merging both happen at every level, so the total work is n \u00D7 log n. Unlike Quick Sort, Merge Sort\u2019s performance is consistent \u2014 it doesn\u2019t depend on the input order.`,
    whenToUse: `Merge Sort is great when you need guaranteed O(n log n) performance or stable sorting. It\u2019s commonly used for sorting linked lists (where random access is expensive) and in external sorting (when data doesn\u2019t fit in memory). The trade-off is O(n) extra space for the temporary arrays during merging.`,
  },
  'quick-sort': {
    title: 'Quick Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n\u00B2)',
    space: 'O(log n)',
    stable: false,
    explanation: `Quick Sort is O(n log n) on average because each partition step picks a pivot and splits the array into two roughly equal halves (log n levels), with n comparisons per level. The worst case O(n\u00B2) happens when the pivot is always the smallest or largest element (e.g., already sorted array with first-element pivot), creating maximally unbalanced partitions.`,
    whenToUse: `Quick Sort is the go-to general-purpose sorting algorithm. It\u2019s fast in practice because of good cache performance and low constant factors. It sorts in-place (O(log n) stack space) but is not stable. Used in many standard library implementations (C\u2019s qsort, Java\u2019s Arrays.sort for primitives).`,
  },
  'insertion-sort': {
    title: 'Insertion Sort',
    best: 'O(n)',
    average: 'O(n\u00B2)',
    worst: 'O(n\u00B2)',
    space: 'O(1)',
    stable: true,
    explanation: `Insertion Sort is O(n\u00B2) because for each of the n\u22121 elements, it may need to shift all previously sorted elements one position to the right. In the worst case (reverse-sorted), every element requires the maximum number of shifts. The best case is O(n) because if the array is already sorted, each new element is compared once and inserted immediately.`,
    whenToUse: `Insertion Sort is efficient for small arrays (n < 20) or nearly sorted data. It\u2019s also used as the base case inside more complex algorithms like Tim Sort (Python/Java\u2019s default sort). It\u2019s stable, in-place, and adaptive \u2014 it runs faster on partially sorted input.`,
  },
  'linear-search': {
    title: 'Linear Search',
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
    space: 'O(1)',
    stable: false,
    explanation: `Linear Search is O(n) because in the worst case, it must check every single element in the array before finding the target (or confirming it\u2019s absent). The best case is O(1) when the target happens to be the first element. On average, you\u2019ll check about half the array, which is still O(n).`,
    whenToUse: `Linear Search is the simplest search algorithm and works on any collection \u2014 sorted or unsorted. It\u2019s the only option when you can\u2019t access elements by index (e.g., linked lists). For sorted arrays, prefer Binary Search for O(log n) performance.`,
  },
  'binary-search': {
    title: 'Binary Search',
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)',
    space: 'O(1)',
    stable: false,
    explanation: `Binary Search is O(log n) because it halves the search space with each comparison. Starting with n elements, after one comparison you have n/2, then n/4, and so on until you find the target or the space is empty. The number of times you can halve n before reaching 1 is exactly log\u2082(n). The best case is O(1) when the middle element is the target on the first check.`,
    whenToUse: `Binary Search is extremely fast but requires the array to be sorted first. It\u2019s used everywhere from dictionary lookups to database indexing. The key insight is that by maintaining sorted order, you eliminate half the possibilities with each step \u2014 turning a linear scan into a logarithmic one.`,
  },
}

function Badge({ label, value }) {
  const isGood = value === 'O(1)' || value === 'O(n)' || value === 'O(log n)' || value === 'O(n log n)'
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-amber bg-cream p-3">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-mocha">{label}</span>
      <span className={`font-mono text-sm font-bold ${isGood ? 'text-gold' : 'text-ink'}`}>
        {value}
      </span>
    </div>
  )
}

export default function ComplexityInfo({ algorithmKey }) {
  const info = ALGO_INFO[algorithmKey]
  if (!info) return null

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Badge label="Best" value={info.best} />
        <Badge label="Average" value={info.average} />
        <Badge label="Worst" value={info.worst} />
        <Badge label="Space" value={info.space} />
      </div>

      <div className="rounded-2xl border border-amber/60 bg-sand p-5">
        <h4 className="mb-2 font-display text-lg font-semibold">Why this complexity?</h4>
        <p className="leading-relaxed text-ink/80">{info.explanation}</p>
      </div>

      <div className="rounded-2xl border border-amber/60 bg-sand p-5">
        <h4 className="mb-2 font-display text-lg font-semibold">When to use it</h4>
        <p className="leading-relaxed text-ink/80">{info.whenToUse}</p>
        <div className="mt-3">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
              info.stable
                ? 'bg-blue/10 text-blue'
                : 'bg-ink/10 text-ink'
            }`}
          >
            {info.stable ? 'Stable' : 'Not Stable'}
          </span>
        </div>
      </div>
    </div>
  )
}
