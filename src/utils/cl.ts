/**
 * Joins class names, filtering out falsy values
 * @param classes - Array of class names (strings, numbers, booleans, etc.)
 * @returns Joined string of truthy class names separated by spaces
 */
export default function cl(...classes: unknown[]): string {
  return classes.filter(Boolean).join(" ")
}
