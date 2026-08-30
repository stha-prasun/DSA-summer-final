export default function CodePanel({ code, currentLine }) {
  return (
    <div className="font-mono text-[13px] leading-7">
      {code.map((line, i) => (
        <div
          key={i}
          className={`-mx-2 rounded-r-md border-l-[3px] whitespace-pre px-3 py-0.5 transition-colors ${
            i === currentLine
              ? 'border-gold bg-gold/10 font-semibold text-ink'
              : 'border-transparent text-mocha'
          }`}
        >
          {line || '\u00a0'}
        </div>
      ))}
    </div>
  )
}
