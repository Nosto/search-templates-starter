import { getCurrentUrlState } from "./getCurrentUrlState"
import { getUrlFromState } from "./getUrlFromState"

export function getPageUrl(page: number) {
  const currentState = getCurrentUrlState()
  return getUrlFromState({
    ...currentState,
    page: page > 1 ? page : undefined
  })
}
