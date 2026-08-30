import { useLayoutEffect, useRef } from 'react'

export default function BarChart({ array, compare, swap, noSwap, sorted, activeRange }) {
  const chartRef = useRef(null)
  const prevPositions = useRef(new Map())

  const n = array.length
  const max = Math.max(...array)
  const slot = 100 / n
  const usableHeight = 320 - 20 - 44

  useLayoutEffect(() => {
    const node = chartRef.current
    if (!node) return

    const nextPositions = new Map()
    node.querySelectorAll('[data-key]').forEach((el) => {
      nextPositions.set(el.getAttribute('data-key'), el.offsetLeft)
    })

    prevPositions.current.forEach((oldLeft, key) => {
      const el = node.querySelector(`[data-key="${key}"]`)
      if (el && oldLeft !== nextPositions.get(key)) {
        const delta = oldLeft - nextPositions.get(key)
        el.style.transition = 'none'
        el.style.transform = `translateX(${delta}px)`
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
            el.style.transform = ''
          })
        })
      }
    })

    prevPositions.current = nextPositions
  }, [array])

  return (
    <div className="chart" ref={chartRef}>
      {array.map((value, i) => {
        const isSwap = swap?.includes(i)
        const isCompare = compare?.includes(i) || noSwap?.includes(i)
        const isSorted = sorted?.[i]
        const isDim =
          !(activeRange === null || (i >= activeRange[0] && i <= activeRange[1])) && !isSorted

        let cls = 'bar'
        if (isSwap) cls += ' swap'
        else if (isCompare) cls += ' compare'
        else if (isSorted) cls += ' sorted'
        if (isDim) cls += ' dim'

        return (
          <div
            key={value}
            data-key={value}
            className={cls}
            style={{
              left: `${i * slot}%`,
              width: `${slot - 1.4}%`,
              height: `${(value / max) * usableHeight}px`,
            }}
          >
            <span className="bar-value">{value}</span>
            <span className="bar-index">{i}</span>
          </div>
        )
      })}
    </div>
  )
}
