import styles from "./Pill.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = {
  value: string
  count: number
  selected: boolean
  onChange: (e: Event) => void
}

export default function Pill({ value, count, selected, onChange }: Props) {
  return (
    <button className={cl(styles.pill, selected && styles.selected)} onClick={onChange} type="button">
      {value} ({count})
    </button>
  )
}
