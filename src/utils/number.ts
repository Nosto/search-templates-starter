/**
 * Parse a string as a positive int > minValue, return undefined if invalid
 */
export function parsePositiveInt(minValue: number, value?: string) {
  if (!value) {
    return undefined
  }
  const parsedNum = parseInt(value, 10)
  if (!isNaN(parsedNum) && parsedNum > minValue) {
    return parsedNum
  }
  return undefined
}
