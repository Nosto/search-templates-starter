import styles from "./Pill.module.css"
import { cl } from "@nosto/search-js/utils"
import { ComponentChildren } from "preact"

type Props = {
  children: ComponentChildren
  selected?: boolean
  onChange: (e: Event) => void
}

export default function Pill({ children, selected = false, onChange }: Props) {
  return (
    <button className={cl(styles.pill, selected && styles.selected)} onClick={onChange} type="button">
      {children}
    </button>
  )
}
