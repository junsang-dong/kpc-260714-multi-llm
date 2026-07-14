import type { CompareItem } from '../types'
import { isChatError, PROVIDER_LABELS } from '../types'
import { formatElapsed, formatKrw, formatUsd } from '../utils/format'
import { qualityScore, stars } from '../utils/qualityScore'

interface CompareViewProps {
  prompt: string
  items: CompareItem[] | null
  loading: boolean
  error: string | null
}

export function CompareView({ prompt, items, loading, error }: CompareViewProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-dashed border-sky-300 bg-sky-50/60 px-5 py-10 text-center text-[var(--muted)]">
        4개 모델을 병렬 호출하는 중…
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-left text-red-700">
        {error}
      </div>
    )
  }

  if (!items) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--line)] bg-white/50 px-5 py-10 text-center text-[var(--muted)]">
        Compare 모드에서 동일 프롬프트를 모든 모델에 보냅니다.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[var(--line)] bg-white/80 px-5 py-4 text-left">
        <p className="text-xs font-medium tracking-wide text-[var(--muted)] uppercase">
          Prompt
        </p>
        <p className="mt-1 text-base text-[var(--ink)]">{prompt}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => {
          if (isChatError(item)) {
            return (
              <article
                key={item.provider}
                className="rounded-2xl border border-red-200 bg-red-50/80 p-5 text-left"
              >
                <h3 className="font-[family-name:var(--display)] text-lg font-semibold">
                  {PROVIDER_LABELS[item.provider]}
                </h3>
                <p className="mt-2 text-sm text-red-700">{item.error}</p>
                <p className="mt-3 font-[family-name:var(--mono)] text-xs text-[var(--muted)]">
                  {formatElapsed(item.elapsed)}
                </p>
              </article>
            )
          }

          const score = qualityScore(item.response)
          return (
            <article
              key={item.provider}
              className="rounded-2xl border border-[var(--line)] bg-white/90 p-5 text-left shadow-sm"
            >
              <header className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-[family-name:var(--display)] text-lg font-semibold">
                  {PROVIDER_LABELS[item.provider]}
                </h3>
                <span className="font-[family-name:var(--mono)] text-sm text-amber-600">
                  {stars(score)}
                </span>
              </header>
              <div className="mb-3 flex flex-wrap gap-3 font-[family-name:var(--mono)] text-xs text-[var(--muted)]">
                <span>{formatElapsed(item.elapsed)}</span>
                <span>{formatUsd(item.estimatedCost)}</span>
                <span>{formatKrw(item.estimatedCost)}</span>
                <span>
                  {item.inputTokens} → {item.outputTokens} tok
                </span>
              </div>
              <div className="max-h-64 overflow-auto whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                {item.response}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
