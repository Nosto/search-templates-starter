import { deserializeQueryState } from "./deserializeQueryState"

export function getCurrentUrlState() {
  const searchParams = new URLSearchParams(window.location.search)
  return deserializeQueryState(searchParams)
}
