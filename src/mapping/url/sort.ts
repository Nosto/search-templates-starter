import { InputSearchSort } from "@nosto/nosto-js/client"

function encodeSortField(field: string) {
  return field.replace(/~/g, "%7E").replace(/,/g, "%2C")
}

function decodeSortField(field: string) {
  return field.replace(/%7E/g, "~").replace(/%2C/g, ",")
}

export function serializeSortToUrl(sort: InputSearchSort[]) {
  return sort.map(s => `${encodeSortField(s.field)}~${s.order}`).join(",")
}

export function deserializeSortFromUrl(sortString: string) {
  if (!sortString.trim()) {
    return []
  }

  return sortString
    .split(",")
    .map(item => item.trim())
    .map(item => {
      const parts = item.split("~")
      if (parts.length !== 2) return null
      const field = decodeSortField(parts[0])
      const order = parts[1]
      if (!field || !order) return null
      return { field, order } as InputSearchSort
    })
    .filter(item => item !== null)
}
