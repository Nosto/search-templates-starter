import styles from "./Pill.module.css"
import { cl } from "@nosto/search-js/utils"
import { ComponentChildren } from "preact"

type Props = {
  children: ComponentChildren
  secondary?: ComponentChildren
  selected?: boolean
  onClick?: (e: Event) => void
}

/**
 * A pill-shaped button component commonly used for tags, filters, or selection elements.
 * Can display primary content with optional secondary information and supports selected state styling.
 *
 * @param children - The primary content to display in the pill
 * @param secondary - Optional secondary content displayed with different styling (typically smaller or muted)
 * @param selected - Whether the pill should display in selected state (defaults to false)
 * @param onClick - Optional click handler for interactive pills
 * @returns A styled pill button element that can be used for tags, filters, or selection
 */
export default function Pill({ children, secondary, selected = false, onClick }: Props) {
  return (
    <button className={cl(styles.pill, selected && styles.selected)} onClick={onClick} type="button">
      {children}
      {secondary && <span className={styles.secondary}>{secondary}</span>}
    </button>
  )
}
