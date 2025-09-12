import { cl } from "@nosto/search-js/utils"
import styles from "./Icon.module.css"

export type IconName =
  | "close"
  | "arrow"
  | `arrow-${"left" | "right" | "up" | "down"}`
  | "search"
  | `page-${"prev" | "next"}`
  | "filter"

type Props = {
  name: IconName
  className?: string
  pill?: boolean
}

export default function Icon({ name, className, pill = false }: Props) {
  return <i className={cl(styles.icon, styles[name], pill && styles.pill, className)}></i>
}
