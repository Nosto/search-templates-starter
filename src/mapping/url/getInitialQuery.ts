import { getEarlyUrlState } from "./earlyUrlState"

export function getInitialQuery() {
  const urlState = getEarlyUrlState()
  return urlState.query || ""
}
