import type { ChatResult } from '../types'
import { PROVIDER_LABELS } from '../types'
import { qualityScore, stars } from '../utils/qualityScore'

interface ResponseCardProps {
  result: ChatResult
}

export function ResponseCard({ result }: ResponseCardProps) {
  const score = qualityScore(result.response)

  return (
    <section className="rounded-2xl border border-[var(--line)] bg-white/90 p-5 text-left shadow-sm">
      <header className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-[family-name:var(--display)] text-xl font-semibold">
          {PROVIDER_LABELS[result.provider]}
        </h3>
        <span className="font-[family-name:var(--mono)] text-sm text-amber-600">
          {stars(score)}
        </span>
      </header>
      <p className="mb-2 font-[family-name:var(--mono)] text-xs text-[var(--muted)]">
        {result.model}
      </p>
      <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800">
        {result.response}
      </div>
    </section>
  )
}
