import styles from "./RadioButton.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = {
  value: string
  selected: boolean
  onChange: (e: Event) => void
  onClick?: (e: MouseEvent) => void
  className?: string
  name: string
}

export default function RadioButton({ value, selected, onChange, onClick, className, name }: Props) {
  return (
    <label className={cl(styles.radioButton, className)}>
      {value}
      <input type="radio" name={name} checked={selected} onChange={onChange} onClick={onClick} />
      <span className={styles.checkmark} />
    </label>
  )
}
