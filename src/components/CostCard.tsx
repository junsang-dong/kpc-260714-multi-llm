import { DollarSign } from 'lucide-react'
import { formatKrw, formatUsd } from '../utils/format'

interface CostCardProps {
  inputTokens: number
  outputTokens: number
  estimatedCost: number
}

export function CostCard({
  inputTokens,
  outputTokens,
  estimatedCost,
}: CostCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white/90 p-4 text-left shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
        <DollarSign size={16} />
        Cost
      </div>
      <dl className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-[var(--muted)]">Input</dt>
          <dd className="font-[family-name:var(--mono)] font-medium">
            {inputTokens}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Output</dt>
          <dd className="font-[family-name:var(--mono)] font-medium">
            {outputTokens}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">USD</dt>
          <dd className="font-[family-name:var(--mono)] font-medium">
            {formatUsd(estimatedCost)}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">KRW</dt>
          <dd className="font-[family-name:var(--mono)] font-medium">
            {formatKrw(estimatedCost)}
          </dd>
        </div>
      </dl>
    </div>
  )
}
