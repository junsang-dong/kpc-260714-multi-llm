export type ProviderId = 'gpt' | 'gemini' | 'claude' | 'perplexity'

export interface ChatResult {
  provider: ProviderId
  model: string
  response: string
  elapsed: number
  inputTokens: number
  outputTokens: number
  estimatedCost: number
}

export interface ChatErrorResult {
  provider: ProviderId
  model: string
  error: string
  elapsed: number
}

export type CompareItem = ChatResult | ChatErrorResult

export function isChatError(item: CompareItem): item is ChatErrorResult {
  return 'error' in item
}

export const PROVIDERS: ProviderId[] = ['gpt', 'gemini', 'claude', 'perplexity']

export const PROVIDER_LABELS: Record<ProviderId, string> = {
  gpt: 'GPT',
  gemini: 'Gemini',
  claude: 'Claude',
  perplexity: 'Perplexity',
}

export const DEFAULT_MODELS: Record<ProviderId, string> = {
  gpt: 'gpt-4o-mini',
  gemini: 'gemini-2.0-flash',
  claude: 'claude-3-5-haiku-latest',
  perplexity: 'sonar',
}
