export function isNegativeZero(num: number) {
  return num === 0 && 1 / num === -Infinity
}
