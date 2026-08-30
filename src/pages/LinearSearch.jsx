import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Visualizer from '../components/Visualizer'
import { generateLinearSearchSteps, LINEAR_SEARCH_CODE } from '../algorithms/linearSearch'

const ARRAY = [29, 10, 14, 37, 13, 41, 5, 22]
const TARGET = 13

export default function LinearSearch() {
  const steps = useMemo(() => generateLinearSearchSteps(ARRAY, TARGET), [])

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
        subtitle="Examine each element from start to end until a match for the target is found."
        steps={steps}
        code={LINEAR_SEARCH_CODE}
      />
    </div>
  )
}
