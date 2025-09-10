export const QUERY_PARAM = "q"

export function serializeQuery(query: string | undefined, params: URLSearchParams) {
  if (query) {
    params.set(QUERY_PARAM, query)
  }
}

export function deserializeQuery(searchParams: URLSearchParams): string | undefined {
  const q = searchParams.get(QUERY_PARAM)
  if (q) {
    return q
  }
  return undefined
}

export function clearQueryParameters(params: URLSearchParams) {
  params.delete(QUERY_PARAM)
}
