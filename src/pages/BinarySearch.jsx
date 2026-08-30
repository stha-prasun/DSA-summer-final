import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Visualizer from '../components/Visualizer'
import ComplexityChart from '../components/ComplexityChart'
import ComplexityInfo from '../components/ComplexityInfo'
import { generateBinarySearchSteps, BINARY_SEARCH_CODE } from '../algorithms/binarySearch'
import { measureBinarySearch } from '../utils/measureOperations'

// Binary search requires a sorted array
const ARRAY = [5, 10, 13, 14, 22, 29, 37, 41]
const TARGET = 29

export default function BinarySearch() {
  const steps = useMemo(() => generateBinarySearchSteps(ARRAY, TARGET), [])
  const chartData = useMemo(() => measureBinarySearch(), [])

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
        title="Binary Search"
        subtitle="Repeatedly divide the active search space in half until the target is found."
        steps={steps}
        code={BINARY_SEARCH_CODE}
      />
      <div className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mt-10 space-y-6">
          <div>
            <h2 className="font-display text-2xl font-semibold">Time Complexity Explorer</h2>
            <p className="mt-1 text-mocha">
              See how comparisons grow as the array gets bigger. The chart below uses sorted arrays
              measured at each size.
            </p>
          </div>
          <div className="rounded-2xl border border-amber/60 bg-sand p-5">
            <ComplexityChart data={chartData} hasSwaps={false} />
          </div>
          <ComplexityInfo algorithmKey="binary-search" />
        </div>
      </div>
    </div>
  )
}
