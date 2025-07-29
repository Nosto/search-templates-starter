import { JSX } from "preact"
import styles from "../../styles/elements/select.module.css"

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
    <div className={styles.wrapper}>
      <select
        className={`${styles.menu} ${className}`}
        value={value || "placeholder"}
        onChange={onChange}
        aria-label={label || "Select"}
      >
        <option value="placeholder" disabled>
          {label || "Select an option"}
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
