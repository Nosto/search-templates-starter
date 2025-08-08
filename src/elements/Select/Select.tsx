import { JSX } from "preact"
import styles from "./Select.module.css"
import cl from "@/utils/cl"

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
        className={cl(styles.menu, className)}
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
