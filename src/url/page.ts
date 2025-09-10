export const PAGE_PARAM = "p"

export function serializePage(page: number | undefined, params: URLSearchParams) {
  if (page && page > 1) {
    params.set(PAGE_PARAM, page.toString())
  }
}

export function deserializePage(searchParams: URLSearchParams): number | undefined {
  const p = searchParams.get(PAGE_PARAM)
  if (p) {
    const pageNum = parseInt(p, 10)
    if (!isNaN(pageNum) && pageNum > 1) {
      return pageNum
    }
  }
  return undefined
}

export function clearPageParameters(params: URLSearchParams) {
  params.delete(PAGE_PARAM)
}
