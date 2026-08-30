import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Visualizer from '../components/Visualizer'
import { generateMergeSortSteps, MERGE_SORT_CODE } from '../algorithms/mergeSort'

const ARRAY = [29, 10, 14, 37, 13, 41, 5, 22]

export default function MergeSort() {
  const steps = useMemo(() => generateMergeSortSteps(ARRAY), [])

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-5 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue transition-colors hover:text-gold"
        >
          ← All algorithms
        </Link>
      </div>
      <Visualizer
        title="Merge Sort"
        subtitle="Recursively divide the array into halves, sort them, and merge them back together."
        steps={steps}
        code={MERGE_SORT_CODE}
      />
    </div>
  )
}
