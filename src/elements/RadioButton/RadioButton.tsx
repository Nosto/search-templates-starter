import style from "./RadioButton.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = {
  value: string
  selected: boolean
  onChange: (e: Event) => void
  className?: string
  name: string
}

export default function RadioButton({ value, selected, onChange, className, name }: Props) {
  return (
    <label className={cl(style.radioButton, className)}>
      {value}
      <input type="radio" name={name} checked={selected} onChange={onChange} />
      <span className={style.checkmark} />
    </label>
  )
}
