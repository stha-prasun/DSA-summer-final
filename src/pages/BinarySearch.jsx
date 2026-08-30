import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Visualizer from '../components/Visualizer'
import { generateBinarySearchSteps, BINARY_SEARCH_CODE } from '../algorithms/binarySearch'

// Binary search requires a sorted array
const ARRAY = [5, 10, 13, 14, 22, 29, 37, 41]
const TARGET = 29

export default function BinarySearch() {
  const steps = useMemo(() => generateBinarySearchSteps(ARRAY, TARGET), [])

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
    </div>
  )
}
