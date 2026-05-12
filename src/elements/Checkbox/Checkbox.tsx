import { styles } from "./styles"
import { cl } from "@nosto/search-js/utils"

type Props = {
  value: string
  selected: boolean
  onChange: (e: Event) => void
  className?: string
}

export default function Checkbox({ value, selected, onChange, className }: Props) {
  return (
    <label className={cl(styles.checkbox, className)}>
      {value}
      <input type="checkbox" checked={selected} onChange={onChange} />
      <span className={styles.checkmark} />
    </label>
  )
}
