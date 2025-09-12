import styles from "./Pill.module.css"
import { cl } from "@nosto/search-js/utils"
import { ComponentChildren } from "preact"

type Props = {
  children: ComponentChildren
  selected?: boolean
  onClick?: (e: Event) => void
}

export default function Pill({ children, selected = false, onClick }: Props) {
  return (
    <button className={cl(styles.pill, selected && styles.selected)} onClick={onClick} type="button">
      {children}
    </button>
  )
}
