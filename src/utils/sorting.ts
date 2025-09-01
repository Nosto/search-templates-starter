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

/**
 * Finds the sort option ID that matches the given sort array
 * @param sort Array of sort objects
 * @param options Available sort options
 * @returns Sort option ID or undefined if no match found
 */
export function findSortOptionId(sort: InputSearchSort[], options: SortOption[]): string | undefined {
  return options.find(option => isMatchingSort(option.value.sort, sort))?.id
}
