import {isNegativeZero} from './isNegativeZero'

/** Based on https://stackoverflow.com/a/11818658 */
export function toFixedSafe(num: number, fractionDigits: number) {
  const numRegexp = new RegExp(`^-?\\d+(?:.\\d{0,${fractionDigits || -1}})?`)
  const numStr = ((isNegativeZero(num) ? '-0' : num)
    .toString()
    .match(numRegexp) || [])[0]
  if (!numStr) return num.toFixed(fractionDigits)

  const [integerPart, fractionalPart = ''] = numStr.split('.')

  return `${integerPart}.${fractionalPart}${'0'.repeat(
    fractionDigits - fractionalPart.length,
  )}`
}
