import style from "../../styles/elements/checkbox.module.css"

export default function Checkbox({
  value,
  selected,
  onChange,
  className
}: {
  value: string
  selected: boolean
  onChange: (e: Event) => void
  className?: string
}) {
  return (
    <label className={`${style.checkbox} ${className}`}>
      {value}
      <input type="checkbox" checked={selected} onChange={onChange} />
      <span className={style.checkmark} />
    </label>
  )
}
