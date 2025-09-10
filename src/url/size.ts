import { defaultConfig } from "@/config"

export const SIZE_PARAM = "size"

export function serializeSize(size: number | undefined, params: URLSearchParams) {
  if (size && size !== defaultConfig.serpSize) {
    params.set(SIZE_PARAM, size.toString())
  }
}

export function deserializeSize(searchParams: URLSearchParams): number | undefined {
  const size = searchParams.get(SIZE_PARAM)
  if (size) {
    const sizeNum = parseInt(size, 10)
    if (!isNaN(sizeNum) && sizeNum > 0) {
      return sizeNum
    }
  }
  return undefined
}

export function clearSizeParameters(params: URLSearchParams) {
  params.delete(SIZE_PARAM)
}
