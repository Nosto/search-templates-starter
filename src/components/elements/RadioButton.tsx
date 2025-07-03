export default function RadioButton({
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
    <label className={`ns-radio ns-color-black ns-d-flex ns-align-items-end ${className}`}>
      <input type="radio" checked={selected} onChange={onChange} />
      <span className="ns-mx-xs-1">{value}</span>
      <span className="ns-checkmark" />
    </label>
  )
}
