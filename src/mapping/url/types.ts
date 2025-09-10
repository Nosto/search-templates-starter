import { InputSearchTopLevelFilter, InputSearchSort } from "@nosto/nosto-js/client"

export const QUERY_PARAM = "q"
export const PAGE_PARAM = "p"
export const SIZE_PARAM = "size"
export const FILTER_PREFIX = "filter."
export const SORT_PARAM = "sort"

export type SimpleFilter = Pick<InputSearchTopLevelFilter, "field" | "value" | "range">

export interface UrlQueryState {
  query?: string
  page?: number
  size?: number
  filter?: SimpleFilter[]
  sort?: InputSearchSort[]
}
