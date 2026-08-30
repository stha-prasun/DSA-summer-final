import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    category: 'Sorting',
    blurb: 'Order arrays step by step.',
    items: [
      {
        name: 'Bubble Sort',
        desc: 'Swaps neighbouring pairs so the largest values bubble to the end.',
        complexity: 'O(n²)',
        to: '/sorting/bubble-sort',
        ready: true,
      },
      {
        name: 'Merge Sort',
        desc: 'Divide and conquer: split, sort, then merge the halves.',
        complexity: 'O(n log n)',
        to: '/sorting/merge-sort',
        ready: true,
      },
      {
        name: 'Quick Sort',
        desc: 'Partitions around a pivot, then recurses on each side.',
        complexity: 'O(n log n)',
        to: '/sorting/quick-sort',
        ready: true,
      },
      {
        name: 'Insertion Sort',
        desc: 'Builds the sorted array one element at a time.',
        complexity: 'O(n²)',
        to: '/sorting/insertion-sort',
        ready: true,
      },
    ],
  },
  {
    category: 'Searching',
    blurb: 'Find a target in a collection.',
    items: [
      {
        name: 'Linear Search',
        desc: 'Checks every element until the target is found.',
        complexity: 'O(n)',
        to: '/searching/linear-search',
        ready: true,
      },
      {
        name: 'Binary Search',
        desc: 'Repeatedly halves the search space on a sorted array.',
        complexity: 'O(log n)',
        to: '/searching/binary-search',
        ready: true,
      },
    ],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-5 pt-12 pb-24">
        <div className="mb-14 flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink font-display text-sm font-semibold text-cream">
            S
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Structura</span>
        </div>

        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-amber bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-widest text-ink">
            DSA Visualizer
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight">
            See algorithms <em className="text-gold">think</em>, step by step.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-mocha">
            Pick an algorithm and walk through every comparison, swap and pointer move. The diagram
            updates with each click of <span className="font-mono text-sm text-ink">Next</span>.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          {SECTIONS.map((section) => (
            <section key={section.category}>
              <div className="mb-4 flex items-baseline gap-3">
                <h2 className="font-display text-2xl font-semibold">{section.category}</h2>
                <span className="text-sm text-mocha">{section.blurb}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {section.items.map((item) =>
                  item.ready ? (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="group flex flex-col rounded-2xl border border-amber bg-sand p-5 transition duration-200 hover:-translate-y-0.5 hover:border-gold hover:shadow-lg hover:shadow-gold/15"
                    >
                      <span className="font-mono text-xs text-mocha">{item.complexity}</span>
                      <h3 className="mt-2 font-display text-xl font-semibold group-hover:text-gold">
                        {item.name}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-mocha">{item.desc}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                        Visualize
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <div
                      key={item.name}
                      className="flex flex-col rounded-2xl border border-dashed border-amber/70 bg-cream p-5 opacity-70"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-mocha">{item.complexity}</span>
                        <span className="rounded-full bg-amber/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink">
                          Soon
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold">{item.name}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-mocha">{item.desc}</p>
                    </div>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
