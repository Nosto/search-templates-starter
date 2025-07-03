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
    <label className={`ns-checkbox ns-d-block ns-color-black ${className}`}>
      {value}
      <input type="checkbox" checked={selected} onChange={onChange} />
      <span className="ns-checkmark" />
    </label>
  )
}
