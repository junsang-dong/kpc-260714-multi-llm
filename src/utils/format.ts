const USD_TO_KRW = 1400

export function formatUsd(amount: number): string {
  if (amount < 0.0001 && amount > 0) {
    return `$${amount.toFixed(6)}`
  }
  return `$${amount.toFixed(4)}`
}

export function formatKrw(usd: number): string {
  const krw = usd * USD_TO_KRW
  if (krw < 0.1 && krw > 0) {
    return `≈ ${krw.toFixed(3)}원`
  }
  return `≈ ${krw.toFixed(1)}원`
}

export function formatElapsed(sec: number): string {
  return `${sec.toFixed(1)} sec`
}
