import { defaultConfig, infiniteScroll } from "@/config"

export function toPageParameters(from: number | undefined, size: number) {
  if (infiniteScroll) {
    return {
      page: Math.floor(size / defaultConfig.serpSize)
    }
  }
  return {
    page: from ? Math.floor(from / size) + 1 : 1,
    size
  }
}
