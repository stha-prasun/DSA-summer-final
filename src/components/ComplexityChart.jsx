import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = {
  comparisons: '#265cd9',
  swaps: '#57410f',
  grid: '#e0b652',
  text: '#7c6b3c',
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-xl border border-amber bg-sand p-3 font-mono text-sm shadow-lg">
      <p className="mb-1.5 font-sans font-semibold text-ink">n = {label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function ComplexityChart({ data, hasSwaps = true }) {
  const tickFormatter = (val) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `${(val / 1000).toFixed(0)}k`
    return val
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} strokeOpacity={0.4} />
          <XAxis
            dataKey="n"
            tick={{ fill: COLORS.text, fontSize: 12, fontFamily: 'JetBrains Mono' }}
            axisLine={{ stroke: COLORS.grid }}
            tickLine={{ stroke: COLORS.grid }}
            label={{
              value: 'Array size (n)',
              position: 'insideBottomRight',
              offset: -5,
              style: { fill: COLORS.text, fontSize: 12, fontFamily: 'Inter' },
            }}
          />
          <YAxis
            tick={{ fill: COLORS.text, fontSize: 12, fontFamily: 'JetBrains Mono' }}
            axisLine={{ stroke: COLORS.grid }}
            tickLine={{ stroke: COLORS.grid }}
            tickFormatter={tickFormatter}
            label={{
              value: 'Operations',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              style: { fill: COLORS.text, fontSize: 12, fontFamily: 'Inter' },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontFamily: 'Inter', fontSize: 13 }}
          />
          <Line
            type="monotone"
            dataKey="comparisons"
            name="Comparisons"
            stroke={COLORS.comparisons}
            strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.comparisons, strokeWidth: 0 }}
            activeDot={{ r: 6, stroke: COLORS.comparisons, strokeWidth: 2, fill: '#fff' }}
          />
          {hasSwaps && (
            <Line
              type="monotone"
              dataKey="swaps"
              name="Swaps"
              stroke={COLORS.swaps}
              strokeWidth={2.5}
              dot={{ r: 4, fill: COLORS.swaps, strokeWidth: 0 }}
              activeDot={{ r: 6, stroke: COLORS.swaps, strokeWidth: 2, fill: '#fff' }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
