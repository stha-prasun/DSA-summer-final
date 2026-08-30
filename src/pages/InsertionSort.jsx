import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Visualizer from '../components/Visualizer'
import { generateInsertionSortSteps, INSERTION_SORT_CODE } from '../algorithms/insertionSort'

const ARRAY = [29, 10, 14, 37, 13, 41, 5, 22]

export default function InsertionSort() {
  const steps = useMemo(() => generateInsertionSortSteps(ARRAY), [])

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
        title="Insertion Sort"
        subtitle="Build a sorted array section by shifting larger elements out of the way of the key."
        steps={steps}
        code={INSERTION_SORT_CODE}
      />
    </div>
  )
}
