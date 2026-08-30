import { useCallback, useEffect, useState } from 'react'
import BarChart from './BarChart'
import CodePanel from './CodePanel'
import Controls from './Controls'

const PLAY_MS = 1100

export default function Visualizer({ title, subtitle, steps, code }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  const total = steps.length
  const step = steps[index]

  const stepNext = useCallback(() => {
    setPlaying(false)
    setIndex((i) => Math.min(i + 1, total - 1))
  }, [total])

  const stepPrev = useCallback(() => {
    setPlaying(false)
    setIndex((i) => Math.max(i - 1, 0))
  }, [])

  const reset = () => {
    setPlaying(false)
    setIndex(0)
  }

  const togglePlay = () => {
    if (index === total - 1) setIndex(0)
    setPlaying((p) => !p)
  }

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setIndex((prev) => {
        if (prev >= total - 1) {
          setPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, PLAY_MS)
    return () => clearInterval(id)
  }, [playing, total])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') stepNext()
      else if (e.key === 'ArrowLeft') stepPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stepNext, stepPrev])

  const vars = step.vars || {}

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="min-h-14">
          <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-mocha">{subtitle}</p>
        </div>
        <span className="shrink-0 rounded-full border border-amber bg-sand px-3.5 py-1.5 font-mono text-sm text-mocha">
          Step <span className="font-semibold text-gold">{index + 1}</span> / {total}
        </span>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="overflow-hidden rounded-2xl border border-amber/60 bg-sand shadow-sm">
          <div className="p-3 sm:p-4">
            <div className="rounded-xl bg-cream p-3 sm:p-4">
              <BarChart {...step} />
            </div>
          </div>

          <div className="px-5 pb-5 sm:px-6">
            <div className="min-h-36">
              <h2 className="font-display text-xl font-semibold leading-snug">{step.title}</h2>
              <p className="mt-1.5 min-h-[4.5rem] leading-relaxed text-ink/80">
                {step.description}
              </p>
            </div>
            <div className="mt-3 flex min-h-7 flex-wrap gap-2 font-mono text-xs">
              {Object.entries(vars).map(([key, val]) => {
                const displayVal = val === null ? '-' : String(val)
                const isBool = typeof val === 'boolean'
                const ringClass = isBool
                  ? val
                    ? 'bg-blue/10 text-blue ring-blue/30'
                    : 'bg-gold/10 text-gold ring-gold/30'
                  : 'bg-cream text-ink ring-1 ring-amber/70'

                return (
                  <span
                    key={key}
                    className={`rounded-full px-2.5 py-1 font-semibold ${ringClass}`}
                  >
                    {key} = {displayVal}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="border-t border-amber/40 px-4 py-4 sm:px-6">
            <Controls
              atStart={index === 0}
              atEnd={index === total - 1}
              playing={playing}
              onPrev={stepPrev}
              onNext={stepNext}
              onTogglePlay={togglePlay}
              onReset={reset}
            />
          </div>

          <div className="h-1.5 bg-amber/40">
            <div
              className="h-full bg-gold transition-[width] duration-300 ease-out"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-amber/60 bg-sand p-5 lg:sticky lg:top-6">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-mocha">
            Pseudocode
          </h3>
          <CodePanel code={code} currentLine={step.codeLine} />
          <div className="mt-5 space-y-2.5 border-t border-amber/40 pt-4">
            <LegendRow swatch="bg-[#265cd9]" label="Comparing" />
            <LegendRow swatch="bg-[#57410f]" label="Swapping" />
            <LegendRow swatch="bar-sorted-swatch" label="Sorted" />
          </div>
        </aside>
      </div>
    </main>
  )
}

function LegendRow({ swatch, label }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-ink/80">
      <span className={`h-3.5 w-3.5 rounded ${swatch}`} />
      {label}
    </div>
  )
}
