import { InputSearchTopLevelFilter, InputSearchSort } from "@nosto/nosto-js/client"

type SimpleFilter = Pick<InputSearchTopLevelFilter, "field" | "value" | "range">

export interface UrlQueryState {
  query?: string
  page?: number
  size?: number
  filter?: SimpleFilter[]
  sort?: InputSearchSort[]
}
