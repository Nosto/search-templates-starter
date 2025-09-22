import { cl } from "@nosto/search-js/utils"
import styles from "./Icon.module.css"

export type IconName =
  | "close"
  | "arrow"
  | `arrow-${"left" | "right" | "up" | "down"}`
  | "search"
  | `page-${"prev" | "next"}`
  | "filter"
  | "star"

type Props = {
  name: IconName
  className?: string
  circle?: boolean
}

export default function Icon({ name, className, circle = false }: Props) {
  return <i className={cl(styles.icon, styles[name], circle && styles.circle, className)}></i>
}
