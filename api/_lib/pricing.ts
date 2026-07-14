import type { ProviderId } from './types'
import { DEFAULT_MODELS } from './types'

/** USD per 1M tokens */
const PRICING: Record<
  string,
  { input: number; output: number }
> = {
  'gpt-4o-mini': { input: 0.15, output: 0.6 },
  'gemini-2.0-flash': { input: 0.1, output: 0.4 },
  'claude-3-5-haiku-latest': { input: 0.8, output: 4.0 },
  sonar: { input: 1.0, output: 1.0 },
}

export function estimateCost(
  model: string,
  inputTokens: number,
  outputTokens: number,
): number {
  const price = PRICING[model] ?? { input: 1, output: 1 }
  const cost =
    (inputTokens / 1_000_000) * price.input +
    (outputTokens / 1_000_000) * price.output
  return Math.round(cost * 1_000_000) / 1_000_000
}

export function modelFor(provider: ProviderId, override?: string): string {
  return override || DEFAULT_MODELS[provider]
}
