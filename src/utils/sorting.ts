import type { InputSearchSort } from "@nosto/nosto-js/client"

export interface SortOption {
  id: string
  value: {
    name: string
    sort: InputSearchSort[]
  }
}

export function createSortOption(id: string, name: string, ...sort: InputSearchSort[]) {
  return { id, value: { name, sort } }
}
