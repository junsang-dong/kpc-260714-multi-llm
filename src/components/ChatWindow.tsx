import type { ChatResult } from '../types'
import { CostCard } from './CostCard'
import { ResponseCard } from './ResponseCard'
import { SpeedCard } from './SpeedCard'

interface ChatWindowProps {
  result: ChatResult | null
  loading: boolean
  error: string | null
}

export function ChatWindow({ result, loading, error }: ChatWindowProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-dashed border-sky-300 bg-sky-50/60 px-5 py-10 text-center text-[var(--muted)]">
        모델을 호출하는 중…
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

  if (!result) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--line)] bg-white/50 px-5 py-10 text-center text-[var(--muted)]">
        프롬프트를 입력하고 모델을 호출해 보세요.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <ResponseCard result={result} />
      <div className="grid gap-4 sm:grid-cols-2">
        <SpeedCard elapsed={result.elapsed} />
        <CostCard
          inputTokens={result.inputTokens}
          outputTokens={result.outputTokens}
          estimatedCost={result.estimatedCost}
        />
      </div>
    </div>
  )
}
