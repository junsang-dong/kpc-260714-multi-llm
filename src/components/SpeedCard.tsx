import { Timer } from 'lucide-react'
import { formatElapsed } from '../utils/format'

interface SpeedCardProps {
  elapsed: number
}

export function SpeedCard({ elapsed }: SpeedCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white/90 p-4 text-left shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
        <Timer size={16} />
        Speed
      </div>
      <p className="font-[family-name:var(--display)] text-2xl font-semibold text-[var(--ink)]">
        {formatElapsed(elapsed)}
      </p>
    </div>
  )
}
