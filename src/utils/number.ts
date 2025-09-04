/**
 * Parse a string as a positive int > minValue, return undefined if invalid
 */
export function parsePositiveInt(value: string | null, minValue: number) {
  if (!value) {
    return undefined
  }
  const parsedNum = parseInt(value, 10)
  if (!isNaN(parsedNum) && parsedNum > minValue) {
    return parsedNum
  }
  return undefined
}
