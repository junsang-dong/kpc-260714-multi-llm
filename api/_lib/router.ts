import type { ChatResult, ProviderId } from './types'
import { DEFAULT_MODELS } from './types'
import { callOpenAI } from './providers/openai'
import { callGemini } from './providers/gemini'
import { callAnthropic } from './providers/anthropic'
import { callPerplexity } from './providers/perplexity'

const adapters: Record<
  ProviderId,
  (prompt: string, model?: string) => Promise<ChatResult>
> = {
  gpt: callOpenAI,
  gemini: callGemini,
  claude: callAnthropic,
  perplexity: callPerplexity,
}

export function isProviderId(value: unknown): value is ProviderId {
  return (
    value === 'gpt' ||
    value === 'gemini' ||
    value === 'claude' ||
    value === 'perplexity'
  )
}

export async function routeChat(
  provider: ProviderId,
  prompt: string,
  model?: string,
): Promise<ChatResult> {
  const adapter = adapters[provider]
  return adapter(prompt, model)
}

export function defaultModel(provider: ProviderId): string {
  return DEFAULT_MODELS[provider]
}
