import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Visualizer from '../components/Visualizer'
import ComplexityChart from '../components/ComplexityChart'
import ComplexityInfo from '../components/ComplexityInfo'
import { generateQuickSortSteps, QUICK_SORT_CODE } from '../algorithms/quickSort'
import { measureQuickSort } from '../utils/measureOperations'

const ARRAY = [29, 10, 14, 37, 13, 41, 5, 22]

export default function QuickSort() {
  const steps = useMemo(() => generateQuickSortSteps(ARRAY), [])
  const chartData = useMemo(() => measureQuickSort(), [])

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
        subtitle="Partitions around a pivot, then recurses on each side."
        steps={steps}
        code={QUICK_SORT_CODE}
      />
      <div className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mt-10 space-y-6">
          <div>
            <h2 className="font-display text-2xl font-semibold">Time Complexity Explorer</h2>
            <p className="mt-1 text-mocha">
              See how comparisons and swaps grow as the array gets bigger. The chart below uses
              randomly generated arrays measured at each size.
            </p>
          </div>
          <div className="rounded-2xl border border-amber/60 bg-sand p-5">
            <ComplexityChart data={chartData} />
          </div>
          <ComplexityInfo algorithmKey="quick-sort" />
        </div>
      </div>
    </div>
  )
}
