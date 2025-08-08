import style from "./Checkbox.module.css"

type Props = {
  value: string
  selected: boolean
  onChange: (e: Event) => void
  className?: string
}

export default function Checkbox({ value, selected, onChange, className }: Props) {
  return (
    <label className={`${style.checkbox} ${className}`}>
      {value}
      <input type="checkbox" checked={selected} onChange={onChange} />
      <span className={style.checkmark} />
    </label>
  )
}
