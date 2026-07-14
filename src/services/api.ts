import type { ChatResult, CompareItem, ProviderId } from '../types'

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text()
  let data: unknown

  try {
    data = text ? JSON.parse(text) : null
  } catch {
    throw new Error(
      text.trim().slice(0, 200) || `HTTP ${res.status}: invalid response`,
    )
  }

  if (!res.ok) {
    const message =
      typeof data === 'object' && data && 'error' in data
        ? String((data as { error: unknown }).error)
        : `HTTP ${res.status}`
    throw new Error(message)
  }

  return data as T
}

export async function chat(provider: ProviderId, prompt: string): Promise<ChatResult> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, prompt }),
  })
  return parseJson<ChatResult>(res)
}

export async function compare(prompt: string): Promise<CompareItem[]> {
  const res = await fetch('/api/compare', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })
  return parseJson<CompareItem[]>(res)
}
