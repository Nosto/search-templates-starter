import { defaultConfig, infiniteScroll } from "@/config"

export function fromPageParameters(urlSize: number | undefined, page: number | undefined) {
  const size = urlSize ?? defaultConfig.serpSize
  if (infiniteScroll) {
    return {
      from: 0,
      size: (page ?? 1) * size
    }
  }
  return {
    from: page ? (page - 1) * size : 0,
    size
  }
}
