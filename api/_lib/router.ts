import type { ChatResult, ProviderId } from './types.js'
import { DEFAULT_MODELS } from './types.js'
import { callOpenAI } from './providers/openai.js'
import { callGemini } from './providers/gemini.js'
import { callAnthropic } from './providers/anthropic.js'
import { callPerplexity } from './providers/perplexity.js'

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
