import { useState } from 'react'
import { KeyRound, Lock, Unlock } from 'lucide-react'

interface VoucherGateProps {
  unlocked: boolean
  onUnlock: (code: string) => boolean
  onLock: () => void
}

export function VoucherGate({ unlocked, onUnlock, onLock }: VoucherGateProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleUnlock() {
    const ok = onUnlock(code)
    if (ok) {
      setError(null)
      setCode('')
      return
    }
    setError('바우처 코드가 올바르지 않습니다')
  }

  if (unlocked) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-[var(--ok)]">
          <Unlock size={16} />
          <span className="font-medium">바우처 인증 완료 · 프롬프트를 실행할 수 있습니다</span>
        </div>
        <button
          type="button"
          onClick={onLock}
          className="text-xs font-medium text-[var(--muted)] underline-offset-2 hover:text-[var(--ink)] hover:underline"
        >
          잠금
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-2 rounded-2xl border border-[var(--line)] bg-white/90 p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
        <Lock size={16} />
        <span className="tracking-wide uppercase">Voucher</span>
      </div>
      <p className="text-sm text-[var(--muted)]">
        프롬프트를 실행하려면 바우처 코드를 입력하세요.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <KeyRound
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[var(--muted)]"
          />
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              if (error) setError(null)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleUnlock()
              }
            }}
            placeholder="바우처 코드 입력"
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-xl border border-[var(--line)] bg-white py-2.5 pr-3 pl-10 text-sm text-[var(--ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <button
          type="button"
          onClick={handleUnlock}
          disabled={!code.trim()}
          className="inline-flex items-center justify-center rounded-xl bg-[var(--accent-deep)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          인증
        </button>
      </div>
      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
    </div>
  )
}
