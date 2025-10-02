import styles from "./Pill.module.css"
import { cl } from "@nosto/search-js/utils"
import { ComponentChildren } from "preact"

type Props = {
  children: ComponentChildren
  secondary?: ComponentChildren
  selected?: boolean
  onClick?: (e: Event) => void
}

export default function Pill({ children, secondary, selected = false, onClick }: Props) {
  return (
    <button className={cl(styles.pill, selected && styles.selected)} onClick={onClick} type="button">
      {children}
      {secondary && <span className={styles.secondary}>{secondary}</span>}
    </button>
  )
}
