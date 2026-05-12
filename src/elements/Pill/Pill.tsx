import { pillStyles as styles } from "@/styles/classNames"
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
    <button className={cl(styles.pill, "group", selected && styles.selected)} onClick={onClick} type="button">
      {children}
      {secondary && <span className={cl(styles.secondary, selected && styles.selectedSecondary)}>{secondary}</span>}
    </button>
  )
}
