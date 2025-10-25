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
  circle?: boolean
}

/**
 * A flexible icon component that displays CSS-based icons with various styling options.
 * Icons are implemented using CSS classes and can be customized with additional styling.
 *
 * @param name - The name of the icon to display (must be one of the predefined IconName types)
 * @param className - Additional CSS classes to apply to the icon
 * @param circle - Whether to apply circular background styling to the icon (defaults to false)
 * @returns An icon element styled according to the specified parameters
 */
export default function Icon({ name, className, circle = false }: Props) {
  return <i className={cl(styles.icon, styles[name], circle && styles.circle, className)}></i>
}
