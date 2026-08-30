import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Visualizer from '../components/Visualizer'
import ComplexityChart from '../components/ComplexityChart'
import ComplexityInfo from '../components/ComplexityInfo'
import { generateLinearSearchSteps, LINEAR_SEARCH_CODE } from '../algorithms/linearSearch'
import { measureLinearSearch } from '../utils/measureOperations'

const ARRAY = [29, 10, 14, 37, 13, 41, 5, 22]
const TARGET = 13

export default function LinearSearch() {
  const steps = useMemo(() => generateLinearSearchSteps(ARRAY, TARGET), [])
  const chartData = useMemo(() => measureLinearSearch(), [])

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
        title="Linear Search"
        subtitle="Check every element one by one until the target is found."
        steps={steps}
        code={LINEAR_SEARCH_CODE}
      />
      <div className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mt-10 space-y-6">
          <div>
            <h2 className="font-display text-2xl font-semibold">Time Complexity Explorer</h2>
            <p className="mt-1 text-mocha">
              See how comparisons grow as the array gets bigger. The chart below uses randomly
              generated arrays measured at each size.
            </p>
          </div>
          <div className="rounded-2xl border border-amber/60 bg-sand p-5">
            <ComplexityChart data={chartData} hasSwaps={false} />
          </div>
          <ComplexityInfo algorithmKey="linear-search" />
        </div>
      </div>
    </div>
  )
}
