import { getEarlyUrlState } from "./getEarlyUrlState"

export function getInitialQuery() {
  const { query } = getEarlyUrlState()
  return query || ""
}
