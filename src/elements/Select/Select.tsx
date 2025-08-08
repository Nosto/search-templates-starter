import { JSX } from "preact"
import styles from "./Select.module.css"

type Props = {
  options: { value: string | number; label: string }[]
  label?: string
} & JSX.IntrinsicElements["select"]

export default function Select({ value, onChange, className, options, label }: Props) {
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
