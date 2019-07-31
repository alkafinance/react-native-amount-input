import {toFixedSafe} from './toFixedSafe'

export function shiftDecimal(
  num: number,
  fractionDigits: number,
  exponent: number,
) {
  const numStr = toFixedSafe(num, fractionDigits)

  const [integerPart, fractionalPart = ''] = numStr.split('.')

  if (exponent > 0) {
    return Number(
      `${integerPart}${fractionalPart.slice(
        0,
        exponent,
      )}.${fractionalPart.slice(exponent) || '0'}`,
    )
  }
  if (exponent < 0) {
    return Number(
      `${integerPart.slice(0, exponent) || '0'}.${integerPart.slice(
        exponent,
      )}${fractionalPart}`,
    )
  }

  return Number(numStr)
}
