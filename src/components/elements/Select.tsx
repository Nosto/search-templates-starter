import { JSX } from "preact"

export default function Select({
  value,
  onChange,
  className,
  options,
  label
}: JSX.IntrinsicElements["select"] & {
  options: { value: string | number; label: string }[]
  label?: string
}) {
  return (
    <div className="ns-relative">
      <select
        className={`ns-selection-dropdown-menu ns-text-align-left ${className}`}
        value={value}
        onChange={onChange}
        aria-label={label || "Select"}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
