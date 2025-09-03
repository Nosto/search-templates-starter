// Utility function to ensure a map has a value for a given key, using fallback if missing
export function ensureMapValue<K, V>(map: Map<K, V>, key: K, fallback: () => V): V {
  if (!map.has(key)) {
    map.set(key, fallback())
  }
  return map.get(key)!
}

// Utility function to append a value to an array in a map, creating the array if needed
export function appendMapArray<K>(map: Map<K, string[]>, key: K, value: string): void {
  const array = ensureMapValue(map, key, () => [])
  array.push(value)
}
