export default function Controls({ atStart, atEnd, playing, onPrev, onNext, onTogglePlay, onReset }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <button type="button" onClick={onReset} disabled={atStart} className="btn">
        ↺ Reset
      </button>
      <button type="button" onClick={onPrev} disabled={atStart} className="btn">
        ← Prev
      </button>
      <button type="button" onClick={onTogglePlay} className="btn btn-primary">
        {playing ? 'Pause' : 'Play'}
      </button>
      <button type="button" onClick={onNext} disabled={atEnd} className="btn">
        Next →
      </button>
    </div>
  )
}
