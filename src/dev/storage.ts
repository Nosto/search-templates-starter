export function readSession(key: string) {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeSession(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    console.warn(`[Dev] Unable to persist ${key}`)
  }
}
