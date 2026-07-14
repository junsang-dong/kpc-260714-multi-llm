/** Heuristic 1–5 star score for educational comparison (not LLM Judge). */
export function qualityScore(text: string): number {
  if (!text.trim()) return 1

  let score = 2
  const length = text.trim().length

  if (length > 80) score += 1
  if (length > 280) score += 1
  if (/```/.test(text) || /^\s*[-*]\s/m.test(text) || /^\s*\d+\./m.test(text)) {
    score += 1
  }
  if (/\n\n/.test(text) && length > 120) {
    score += 1
  }

  return Math.min(5, Math.max(1, score))
}

export function stars(score: number): string {
  return '★'.repeat(score) + '☆'.repeat(5 - score)
}
