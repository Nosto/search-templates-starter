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

export function isMatchingSort(optionSort: InputSearchSort[], querySort: InputSearchSort[]) {
  if (optionSort.length !== querySort.length) {
    return false
  }
  return optionSort.every(v1 => querySort.find(v2 => v1.field === v2.field && v1.order === v2.order))
}
