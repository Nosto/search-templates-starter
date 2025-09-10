import { getCurrentUrlState } from "./getCurrentUrlState"
import { getUrlFromState } from "./updateUrl"

export function getPageUrl(page: number) {
  const currentState = getCurrentUrlState()
  return getUrlFromState({
    ...currentState,
    page: page > 1 ? page : undefined
  })
}
