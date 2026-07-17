import { Send } from 'lucide-react'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
  locked?: boolean
  placeholder?: string
}

export function PromptInput({
  value,
  onChange,
  onSubmit,
  disabled,
  locked,
  placeholder = 'Explain RAG simply.',
}: PromptInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="prompt"
        className="text-sm font-medium tracking-wide text-[var(--muted)] uppercase"
      >
        Prompt
      </label>
      <div className="relative">
        <textarea
          id="prompt"
          rows={4}
          value={value}
          disabled={disabled}
          placeholder={
            locked ? '바우처 인증 후 프롬프트를 입력할 수 있습니다.' : placeholder
          }
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault()
              if (!disabled) onSubmit()
            }
          }}
          className="w-full resize-y rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3 pr-14 text-base text-[var(--ink)] shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-sky-200 disabled:opacity-60"
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          aria-label="Send prompt"
          className="absolute right-3 bottom-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-deep)] text-white transition hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <Send size={18} />
        </button>
      </div>
      <p className="text-xs text-[var(--muted)]">
        {locked
          ? '바우처 코드를 인증하면 전송할 수 있습니다'
          : 'Ctrl/Cmd + Enter 로 전송'}
      </p>
    </div>
  )
}
