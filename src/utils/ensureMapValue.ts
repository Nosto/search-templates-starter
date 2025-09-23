// Utility function to ensure a map has a value for a given key, using fallback if missing
export function ensureMapValue<K, V>(map: Map<K, V>, key: K, fallback: V): V {
  if (!map.has(key)) {
    map.set(key, fallback)
  }
  return map.get(key)!
}
