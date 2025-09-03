// Utility function to ensure a map has an array for a given key
export function ensureMapArray<K, V>(map: Map<K, V[]>, key: K): V[] {
  if (!map.has(key)) {
    map.set(key, [])
  }
  return map.get(key)!
}

// Utility function to ensure a map has an object for a given key
export function ensureMapObject<K, V extends Record<string, string>>(map: Map<K, V>, key: K): V {
  if (!map.has(key)) {
    map.set(key, {} as V)
  }
  return map.get(key)!
}
