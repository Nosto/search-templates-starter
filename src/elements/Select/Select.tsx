import { JSX } from "preact"
import styles from "./Select.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = {
  options: { value: string | number; label: string }[]
  label?: string
} & JSX.IntrinsicElements["select"]

/**
 * A styled select dropdown component with accessible labeling and placeholder support.
 * Provides a consistent appearance for form select elements throughout the application.
 *
 * @param value - The currently selected value
 * @param onChange - Callback function triggered when selection changes
 * @param className - Additional CSS classes to apply to the select element
 * @param options - Array of options with value and label properties to populate the dropdown
 * @param label - Optional label text for accessibility and placeholder display
 * @returns A styled select element with the provided options and proper accessibility attributes
 */
export default function Select({ value, onChange, className, options, label }: Props) {
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
