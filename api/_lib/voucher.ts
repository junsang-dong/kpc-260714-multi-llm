export function getExpectedVoucher(): string {
  return process.env.VOUCHER_CODE?.trim() ?? ''
}

export function isValidVoucher(voucher: unknown): boolean {
  const expected = getExpectedVoucher()
  if (!expected) return false
  return typeof voucher === 'string' && voucher.trim() === expected
}

export function voucherError(voucher: unknown): string | null {
  if (!getExpectedVoucher()) {
    return 'VOUCHER_CODE is not configured'
  }
  if (!isValidVoucher(voucher)) {
    return '유효한 바우처 코드를 입력해주세요'
  }
  return null
}
