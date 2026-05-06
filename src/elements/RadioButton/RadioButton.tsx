import style from "./RadioButton.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = {
  value: string
  selected: boolean
  onClick: (e: MouseEvent) => void
  className?: string
  name: string
}

export default function RadioButton({ value, selected, onClick, className, name }: Props) {
  return (
    <label className={cl(style.radioButton, className)}>
      {value}
      <input type="radio" name={name} checked={selected} onClick={onClick} />
      <span className={style.checkmark} />
    </label>
  )
}
