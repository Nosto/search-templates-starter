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
 * Serializes sort array to URL format: [field]~[asc|desc] with multiple separated by comma
 * @param sort Array of sort objects
 * @returns URL-formatted sort string
 */
export function serializeSortToUrl(sort: InputSearchSort[]): string {
  return sort.map(s => `${s.field}~${s.order}`).join(",")
}

/**
 * Deserializes URL sort string to sort array
 * @param sortString URL-formatted sort string
 * @returns Array of sort objects
 */
export function deserializeSortFromUrl(sortString: string): InputSearchSort[] {
  if (!sortString.trim()) {
    return []
  }

  return sortString
    .split(",")
    .map(item => item.trim())
    .filter(item => item.includes("~"))
    .map(item => {
      const [field, order] = item.split("~")
      if (field && (order === "asc" || order === "desc")) {
        return { field: field.trim(), order }
      }
      return null
    })
    .filter((item): item is InputSearchSort => item !== null)
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
