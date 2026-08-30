import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Visualizer from '../components/Visualizer'
import { generateQuickSortSteps, QUICK_SORT_CODE } from '../algorithms/quickSort'

const ARRAY = [29, 10, 14, 37, 13, 41, 5, 22]

export default function QuickSort() {
  const steps = useMemo(() => generateQuickSortSteps(ARRAY), [])

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
        title="Quick Sort"
        subtitle="Partition the array around a pivot element such that smaller ones go left and larger ones go right."
        steps={steps}
        code={QUICK_SORT_CODE}
      />
    </div>
  )
}
