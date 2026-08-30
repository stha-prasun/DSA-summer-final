import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Visualizer from '../components/Visualizer'
import { generateBubbleSortSteps, BUBBLE_SORT_CODE } from '../algorithms/bubbleSort'

const ARRAY = [29, 10, 14, 37, 13, 41, 5, 22]

export default function BubbleSort() {
  const steps = useMemo(() => generateBubbleSortSteps(ARRAY), [])

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
        title="Bubble Sort"
        subtitle="Repeatedly compare neighbours and swap when the left one is bigger."
        steps={steps}
        code={BUBBLE_SORT_CODE}
      />
    </div>
  )
}
