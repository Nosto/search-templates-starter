import { getCurrentUrlState } from "./getCurrentUrlState"

const initialUrlState = getCurrentUrlState()

export function getInitialQuery() {
  return initialUrlState.query || ""
}
